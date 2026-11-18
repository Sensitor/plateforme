"use client";

import { useSyncExternalStore } from "react";

/**
 * Academy quiz progress, stored in this browser (no account needed).
 * { [conceptSlug]: { score, total, at } }
 */
export interface QuizResult {
  score: number;
  total: number;
  at: string;
}
export type Progress = Record<string, QuizResult>;

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

export function saveQuizResult(slug: string, score: number, total: number) {
  const prev = read()[slug];
  // Keep the best score.
  if (prev && prev.score >= score) return;
  cache = { ...read(), [slug]: { score, total, at: new Date().toISOString() } };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // storage unavailable: keep for this session
  }
  listeners.forEach((l) => l());
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

/** A concept counts as completed when its quiz was passed (at least two thirds right). */
export const isCompleted = (r: QuizResult | undefined) => Boolean(r && r.score / r.total >= 2 / 3);
