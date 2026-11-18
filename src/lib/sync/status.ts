"use client";

import { useSyncExternalStore } from "react";

/** "local": guest, data stays in this browser. "cloud": mirrored to the account. */
export type SyncStatus = "local" | "syncing" | "cloud" | "error";

let status: SyncStatus = "local";
const listeners = new Set<() => void>();

export function setSyncStatus(next: SyncStatus) {
  if (next === status) return;
  status = next;
  listeners.forEach((l) => l());
}

export function useSyncStatus(): SyncStatus {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => status,
    () => "local" as SyncStatus,
  );
}
