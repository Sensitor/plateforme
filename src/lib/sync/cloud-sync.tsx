"use client";

import { useEffect } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "@/lib/auth/auth-provider";
import { getWatchlist, replaceWatchlist, setWatchlistLimit, subscribeWatchlist, WATCHLIST_FREE_LIMIT, WATCHLIST_PAID_LIMIT } from "@/lib/watchlist/store";
import { getPortfolio, newId, replacePortfolio, subscribePortfolio } from "@/lib/portfolio/store";
import type { Transaction } from "@/lib/portfolio/engine";
import { getAcademyProgress, replaceAcademyProgress, setAcademySync, subscribeAcademy, type Progress } from "@/lib/academy/progress";
import { academyChanges, academyFromRemote, academyToRemote, diffIds, fromRemote, mergeAcademy, mergeTransactions, mergeWatchlist, toRemote, type RemoteAcademyRow, type RemoteTransaction } from "./merge";
import { setSyncStatus } from "./status";

const OWNER_KEY = "sensitor.sync.owner";
/** Separate owner for Academy progress: its table (0003) may be installed later than the others. */
const ACADEMY_OWNER_KEY = "sensitor.academy.owner";

function getOwner(key = OWNER_KEY): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function setOwner(id: string | null, key = OWNER_KEY) {
  try {
    if (id) window.localStorage.setItem(key, id);
    else window.localStorage.removeItem(key);
  } catch {
    // storage unavailable
  }
}

async function startSync(supabase: SupabaseClient, userId: string, paid: boolean, isCancelled: () => boolean) {
  setSyncStatus("syncing");
  const [w, p] = await Promise.all([
    supabase.from("watchlist_items").select("project_slug, added_at").order("added_at", { ascending: true }),
    supabase.from("portfolio_transactions").select("id, trade_date, asset, side, quantity, price, fee"),
  ]);
  if (isCancelled()) return null;
  if (w.error || p.error) {
    setSyncStatus("error");
    return null;
  }

  const owner = getOwner();
  const adopt = owner === null || owner === userId;
  const limit = paid ? WATCHLIST_PAID_LIMIT : WATCHLIST_FREE_LIMIT;
  setWatchlistLimit(limit);

  // Watchlist
  const remoteSlugs = (w.data ?? []).map((r) => r.project_slug as string);
  const wm = mergeWatchlist(getWatchlist(), remoteSlugs, adopt, limit);
  if (wm.toInsert.length) await supabase.from("watchlist_items").upsert(wm.toInsert.map((project_slug) => ({ user_id: userId, project_slug })), { ignoreDuplicates: true });
  if (isCancelled()) return null;
  replaceWatchlist(wm.merged);

  // Portfolio
  const local = getPortfolio();
  const remoteTx = ((p.data ?? []) as RemoteTransaction[]).map(fromRemote);
  const pm = mergeTransactions(local.transactions, local.example, remoteTx, adopt, newId);
  if (pm.toInsert.length) {
    const { error } = await supabase.from("portfolio_transactions").upsert(pm.toInsert.map((t) => toRemote(t, userId)), { ignoreDuplicates: true });
    if (error) setSyncStatus("error");
  }
  if (isCancelled()) return null;
  replacePortfolio(pm.keepExample ? local : { transactions: pm.merged, example: false });
  setOwner(userId);
  setSyncStatus("cloud");

  // Mirror later changes. The last state known to be in the cloud is tracked per store.
  let cloudSlugs = new Map(wm.merged.map((s) => [s, true]));
  let cloudTx = new Map<string, Transaction>(pm.merged.map((t) => [t.id, t]));

  const unsubW = subscribeWatchlist(() => {
    const current = new Map(getWatchlist().map((s) => [s, true]));
    const { added, removed } = diffIds(cloudSlugs, current);
    cloudSlugs = current;
    if (added.length) void supabase.from("watchlist_items").upsert(added.map((project_slug) => ({ user_id: userId, project_slug })), { ignoreDuplicates: true }).then(({ error }) => error && setSyncStatus("error"));
    if (removed.length) void supabase.from("watchlist_items").delete().in("project_slug", removed).then(({ error }) => error && setSyncStatus("error"));
  });
  const unsubP = subscribePortfolio(() => {
    const state = getPortfolio();
    if (state.example) return; // the example portfolio is never uploaded
    const current = new Map(state.transactions.map((t) => [t.id, t]));
    const { added, removed } = diffIds(cloudTx, current);
    cloudTx = current;
    if (added.length) void supabase.from("portfolio_transactions").upsert(added.map((id) => toRemote(current.get(id)!, userId)), { ignoreDuplicates: true }).then(({ error }) => error && setSyncStatus("error"));
    if (removed.length) void supabase.from("portfolio_transactions").delete().in("id", removed).then(({ error }) => error && setSyncStatus("error"));
  });
  return () => {
    unsubW();
    unsubP();
  };
}

async function startAcademySync(supabase: SupabaseClient, userId: string, isCancelled: () => boolean) {
  const { data, error } = await supabase.from("academy_progress").select("concept_slug, score, total, achieved_at");
  if (isCancelled()) return null;
  if (error) {
    // Typically: 0003_academy.sql not applied yet. Progress stays in this browser.
    setAcademySync("unavailable");
    return null;
  }
  const owner = getOwner(ACADEMY_OWNER_KEY);
  const { merged, toUpsert } = mergeAcademy(getAcademyProgress(), academyFromRemote((data ?? []) as RemoteAcademyRow[]), owner === null || owner === userId);
  if (toUpsert.length) {
    const { error: upErr } = await supabase.from("academy_progress").upsert(toUpsert.map((slug) => academyToRemote(slug, merged[slug], userId)));
    if (upErr) {
      setAcademySync("unavailable");
      return null;
    }
  }
  if (isCancelled()) return null;
  replaceAcademyProgress(merged);
  setOwner(userId, ACADEMY_OWNER_KEY);
  setAcademySync("cloud");

  let cloud: Progress = merged;
  return subscribeAcademy(() => {
    const current = getAcademyProgress();
    const changed = academyChanges(cloud, current);
    cloud = current;
    if (changed.length) void supabase.from("academy_progress").upsert(changed.map((slug) => academyToRemote(slug, current[slug], userId))).then(({ error: e }) => e && setAcademySync("unavailable"));
  });
}

/**
 * Keeps the offline-first watchlist, portfolio and Academy progress in step
 * with the signed-in account. On sign-out the local copy is cleared, so the next person using
 * this browser does not see the previous account's data.
 */
export function CloudSync() {
  const { supabase, user, profile, loading } = useAuth();
  const userId = user?.id ?? null;
  const paid = Boolean(profile && profile.tier !== "free");

  useEffect(() => {
    if (loading || !supabase) return;
    if (!userId) {
      setSyncStatus("local");
      setWatchlistLimit(WATCHLIST_FREE_LIMIT);
      setAcademySync("local");
      if (getOwner()) {
        // Signed out (or session expired): the data lives in the account.
        replaceWatchlist([]);
        replacePortfolio({ transactions: [], example: false });
        setOwner(null);
      }
      if (getOwner(ACADEMY_OWNER_KEY)) {
        replaceAcademyProgress({});
        setOwner(null, ACADEMY_OWNER_KEY);
      }
      return;
    }
    let cancelled = false;
    let stop: (() => void) | null = null;
    let stopAcademy: (() => void) | null = null;
    void startSync(supabase, userId, paid, () => cancelled).then((fn) => {
      if (cancelled) fn?.();
      else stop = fn;
    });
    void startAcademySync(supabase, userId, () => cancelled).then((fn) => {
      if (cancelled) fn?.();
      else stopAcademy = fn;
    });
    return () => {
      cancelled = true;
      stop?.();
      stopAcademy?.();
    };
  }, [supabase, userId, paid, loading]);

  return null;
}
