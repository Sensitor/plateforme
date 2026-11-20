"use client";

import { useSyncExternalStore } from "react";
import { isBetter, type Progress, type QuizResult } from "./results";

export { isBetter, isCompleted, isPerfect, type Progress, type QuizResult } from "./results";

/**
 * Academy quiz progress, stored in this browser (no account needed). For
 * signed-in users CloudSync mirrors it to the `academy_progress` table.
 * { [conceptSlug]: { score, total, at } }
 */
const KEY = "sensitor.academy.v1";
const EMPTY: Progress = {};
const listeners = new Set<() => void>();
let cache: Progress | null = null;

function read(): Progress {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    cache = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Progress) : {};
  } catch {
    cache = {};
  }
  return cache;
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

function write(next: Progress) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage unavailable: keep for this session
  }
  listeners.forEach((l) => l());
}

export function saveQuizResult(slug: string, score: number, total: number) {
  const next: QuizResult = { score, total, at: new Date().toISOString() };
  // Keep the best score.
  if (!isBetter(next, read()[slug])) return;
  write({ ...read(), [slug]: next });
}

export function useAcademyProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return { progress, ready };
}

/* Primitives for cloud sync (src/lib/sync/cloud-sync.tsx). */
export const getAcademyProgress = () => read();
export const replaceAcademyProgress = (next: Progress) => write(next);
export const subscribeAcademy = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** "local": kept in this browser. "cloud": mirrored to the account. "unavailable": signed in, but the table is not installed. */
export type AcademySync = "local" | "cloud" | "unavailable";
let syncState: AcademySync = "local";
const syncListeners = new Set<() => void>();
export function setAcademySync(next: AcademySync) {
  if (next === syncState) return;
  syncState = next;
  syncListeners.forEach((l) => l());
}
export function useAcademySync(): AcademySync {
  return useSyncExternalStore(
    (l) => {
      syncListeners.add(l);
      return () => syncListeners.delete(l);
    },
    () => syncState,
    () => "local" as AcademySync,
  );
}
