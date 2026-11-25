import "server-only";
import { cacheLife } from "next/cache";
import { DEFILLAMA_SOURCE, llamaPriceChart, llamaWeeklyHistory } from "@/lib/market/providers/defillama";
import type { DataResult, SeriesPoint } from "@/lib/market/types";

export interface WeeklyHistory {
  weekly: SeriesPoint[];
  /** Most recent daily close, so "today" is current between weekly closes. */
  latest: SeriesPoint | null;
}

export type StrategyAsset = "bitcoin" | "ethereum";

/** First date with reliable price history for each asset (unix seconds). */
const HISTORY_START: Record<StrategyAsset, number> = {
  bitcoin: 1367366400, // 1 May 2013
  ethereum: 1438905600, // 7 Aug 2015
};

/** Weekly closes since the start of each asset's history, from DefiLlama (keyed by CoinGecko id). */
export async function getWeeklyHistory(asset: StrategyAsset): Promise<DataResult<WeeklyHistory>> {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 21600, expire: 43200 });
  try {
    const weekly = await llamaWeeklyHistory(asset, HISTORY_START[asset]);
    const recent = await llamaPriceChart(asset, { span: 2, period: "1d" }).catch(() => [] as SeriesPoint[]);
    const latest = recent.length ? recent[recent.length - 1] : null;
    const last = latest && latest.t > weekly[weekly.length - 1].t ? latest : weekly[weekly.length - 1];
    return { status: "ok", data: { weekly, latest }, source: DEFILLAMA_SOURCE, asOf: new Date(last.t).toISOString() };
  } catch (err) {
    console.warn(`[market] weekly/${asset}:`, err instanceof Error ? err.message : err);
    return { status: "unavailable", data: null, source: null, asOf: null, note: "Price history is temporarily unavailable." };
  }
}
