"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Guest watchlist persisted in localStorage (per browser).
 * When authentication is enabled, the same hook will sync with the
 * `watchlist_items` table (see supabase/migrations). The UI states clearly
 * that guest watchlists live on this device only.
 */

const KEY = "sensitor.watchlist.v1";
export const WATCHLIST_FREE_LIMIT = 10;

const listeners = new Set<() => void>();
let cache: string[] | null = null;
const EMPTY: string[] = [];

function read(): string[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode, quota): keep in-memory state for this session.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export type ToggleResult = "added" | "removed" | "limit";

export function useWatchlist() {
  const slugs = useSyncExternalStore(subscribe, read, () => EMPTY);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const toggle = useCallback((slug: string): ToggleResult => {
    const current = read();
    if (current.includes(slug)) {
      write(current.filter((s) => s !== slug));
      return "removed";
    }
    if (current.length >= WATCHLIST_FREE_LIMIT) return "limit";
    write([...current, slug]);
    return "added";
  }, []);

  const remove = useCallback((slug: string) => write(read().filter((s) => s !== slug)), []);

  return { slugs, ready, has: (slug: string) => slugs.includes(slug), toggle, remove, limit: WATCHLIST_FREE_LIMIT };
}
