import type { Transaction } from "@/lib/portfolio/engine";

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
