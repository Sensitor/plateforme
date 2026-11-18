"use client";

import { useEffect } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "@/lib/auth/auth-provider";
import { getWatchlist, replaceWatchlist, setWatchlistLimit, subscribeWatchlist, WATCHLIST_FREE_LIMIT, WATCHLIST_PAID_LIMIT } from "@/lib/watchlist/store";
import { getPortfolio, newId, replacePortfolio, subscribePortfolio } from "@/lib/portfolio/store";
import type { Transaction } from "@/lib/portfolio/engine";
import { diffIds, fromRemote, mergeTransactions, mergeWatchlist, toRemote, type RemoteTransaction } from "./merge";
import { setSyncStatus } from "./status";

const OWNER_KEY = "sensitor.sync.owner";

function getOwner(): string | null {
  try {
    return window.localStorage.getItem(OWNER_KEY);
  } catch {
    return null;
  }
}
function setOwner(id: string | null) {
  try {
    if (id) window.localStorage.setItem(OWNER_KEY, id);
    else window.localStorage.removeItem(OWNER_KEY);
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

/**
 * Keeps the offline-first watchlist and portfolio in step with the signed-in
 * account. On sign-out the local copy is cleared, so the next person using
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
      if (getOwner()) {
        // Signed out (or session expired): the data lives in the account.
        replaceWatchlist([]);
        replacePortfolio({ transactions: [], example: false });
        setOwner(null);
      }
      return;
    }
    let cancelled = false;
    let stop: (() => void) | null = null;
    void startSync(supabase, userId, paid, () => cancelled).then((fn) => {
      if (cancelled) fn?.();
      else stop = fn;
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [supabase, userId, paid, loading]);

  return null;
}
