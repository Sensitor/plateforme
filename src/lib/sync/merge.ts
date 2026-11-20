import type { Transaction } from "@/lib/portfolio/engine";
import { isBetter, isValidResult, type Progress, type QuizResult } from "@/lib/academy/results";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (s: string) => UUID.test(s);

export interface RemoteTransaction {
  id: string;
  trade_date: string;
  asset: string;
  side: "buy" | "sell";
  quantity: number | string;
  price: number | string;
  fee: number | string;
}

export const fromRemote = (r: RemoteTransaction): Transaction => ({
  id: r.id,
  date: r.trade_date,
  asset: r.asset,
  side: r.side,
  quantity: Number(r.quantity),
  price: Number(r.price),
  fee: Number(r.fee),
});

export const toRemote = (t: Transaction, userId: string) => ({
  id: t.id,
  user_id: userId,
  trade_date: t.date,
  asset: t.asset,
  side: t.side,
  quantity: t.quantity,
  price: t.price,
  fee: t.fee,
});

/**
 * First sync after sign-in. Guest data (no previous owner) is adopted into the
 * account; data left by another account on this browser is discarded.
 */
export function mergeWatchlist(local: string[], remote: string[], adoptLocal: boolean, limit: number) {
  const merged = [...new Set([...remote, ...(adoptLocal ? local : [])])].slice(0, Math.max(limit, remote.length));
  return { merged, toInsert: merged.filter((s) => !remote.includes(s)) };
}

export function mergeTransactions(local: Transaction[], localIsExample: boolean, remote: Transaction[], adoptLocal: boolean, newId: () => string) {
  const remoteIds = new Set(remote.map((t) => t.id));
  const adopt = adoptLocal && !localIsExample ? local : [];
  // Ids must be UUIDs in the database; very old browsers produced other ids.
  const fresh = adopt.filter((t) => !remoteIds.has(t.id)).map((t) => (isUuid(t.id) ? t : { ...t, id: newId() }));
  const merged = [...remote, ...fresh].sort((a, b) => a.date.localeCompare(b.date));
  return { merged, toInsert: fresh, keepExample: localIsExample && remote.length === 0 && adoptLocal };
}

/** Diff between the last state known to be in the cloud and the current local state. */
export function diffIds<T>(previous: Map<string, T>, current: Map<string, T>) {
  return {
    added: [...current.keys()].filter((k) => !previous.has(k)),
    removed: [...previous.keys()].filter((k) => !current.has(k)),
  };
}

export interface RemoteAcademyRow {
  concept_slug: string;
  score: number;
  total: number;
  achieved_at: string;
}

export const academyFromRemote = (rows: RemoteAcademyRow[]): Progress =>
  Object.fromEntries(rows.map((r) => [r.concept_slug, { score: Number(r.score), total: Number(r.total), at: r.achieved_at }]));

export const academyToRemote = (slug: string, r: QuizResult, userId: string) => ({
  user_id: userId,
  concept_slug: slug,
  score: r.score,
  total: r.total,
  achieved_at: r.at,
});

const SLUG = /^[a-z0-9-]{1,80}$/;

/**
 * First Academy sync after sign-in: the best result per lesson wins. Guest
 * progress is adopted into the account; progress left by another account on
 * this browser is discarded.
 */
export function mergeAcademy(local: Progress, remote: Progress, adoptLocal: boolean) {
  const merged: Progress = { ...remote };
  const toUpsert: string[] = [];
  if (adoptLocal) {
    for (const [slug, r] of Object.entries(local)) {
      if (!SLUG.test(slug) || !isValidResult(r)) continue;
      if (isBetter(r, merged[slug])) {
        merged[slug] = r;
        toUpsert.push(slug);
      }
    }
  }
  return { merged, toUpsert };
}

/** Lessons whose local result is better than the last result known to be in the cloud. */
export function academyChanges(cloud: Progress, current: Progress): string[] {
  return Object.entries(current)
    .filter(([slug, r]) => SLUG.test(slug) && isValidResult(r) && isBetter(r, cloud[slug]))
    .map(([slug]) => slug);
}
