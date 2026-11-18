"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Transaction } from "./engine";

/**
 * Portfolio ledger stored in this browser only (localStorage). Nothing is
 * sent to a server. When accounts are enabled, the same ledger will sync to
 * the `portfolio_transactions` table protected by row-level security.
 */

const KEY = "sensitor.portfolio.v1";

export interface PortfolioState {
  transactions: Transaction[];
  /** True while the example portfolio is loaded. */
  example: boolean;
}

const EMPTY: PortfolioState = { transactions: [], example: false };
const listeners = new Set<() => void>();
let cache: PortfolioState | null = null;

function read(): PortfolioState {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    cache = parsed && Array.isArray(parsed.transactions) ? { transactions: parsed.transactions, example: Boolean(parsed.example) } : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: PortfolioState) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage unavailable: keep the state for this session only
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

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

export function usePortfolio() {
  const state = useSyncExternalStore(subscribe, read, () => EMPTY);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const add = useCallback((rows: Omit<Transaction, "id">[]) => {
    const cur = read();
    // Adding real transactions replaces the example portfolio
    const base = cur.example ? [] : cur.transactions;
    write({ transactions: [...base, ...rows.map((r) => ({ ...r, id: newId() }))], example: false });
  }, []);
  const remove = useCallback((id: string) => {
    const cur = read();
    write({ ...cur, transactions: cur.transactions.filter((t) => t.id !== id) });
  }, []);
  const clear = useCallback(() => write(EMPTY), []);
  const setExample = useCallback((rows: Omit<Transaction, "id">[]) => write({ transactions: rows.map((r) => ({ ...r, id: newId() })), example: true }), []);
  return { ...state, ready, add, remove, clear, setExample };
}
