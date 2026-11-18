"use client";

import useSWR from "swr";
import type { ChartRange, DataResult, SeriesPoint } from "@/lib/market/types";

async function fetchAll(slugs: string[], range: ChartRange): Promise<Record<string, SeriesPoint[] | null>> {
  const entries = await Promise.all(
    slugs.map(async (slug): Promise<[string, SeriesPoint[] | null]> => {
      try {
        const res = await fetch(`/api/history?asset=${slug}&range=${range}`);
        if (!res.ok) return [slug, null];
        const json = (await res.json()) as DataResult<SeriesPoint[]>;
        return [slug, json.data];
      } catch {
        return [slug, null];
      }
    }),
  );
  return Object.fromEntries(entries);
}

/** Price histories (DefiLlama via /api/history) for a set of covered assets. */
export function useHistories(slugs: string[], range: ChartRange) {
  const key = slugs.length ? ["histories", range, ...[...slugs].sort()] : null;
  return useSWR(key, () => fetchAll(slugs, range), { revalidateOnFocus: false, keepPreviousData: true });
}

export { fetchAll as fetchHistories };
