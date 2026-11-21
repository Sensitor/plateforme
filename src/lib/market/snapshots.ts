import "server-only";
import { cacheLife } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseConfigured } from "@/lib/supabase/config";
import { COINGECKO_SOURCE } from "./providers/coingecko";
import { COINPAPRIKA_SOURCE } from "./providers/coinpaprika";
import { MIN_SNAPSHOT_POINTS, rangeStartDay, totalMarketCapSeries, type MarketDailyRow } from "./snapshots-core";
import type { ChartRange, DataResult, DataSourceRef, SeriesPoint } from "./types";

/**
 * Reads the daily snapshots written by /api/cron/snapshots. Public data, read
 * with the publishable key (no cookies, so the result can be cached). When the
 * table does not exist yet or holds too few days, callers fall back to what the
 * providers offer for free.
 */

const PROVIDERS: Record<string, DataSourceRef> = { CoinGecko: COINGECKO_SOURCE, CoinPaprika: COINPAPRIKA_SOURCE };

function publicClient() {
  if (!supabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
}

export interface SnapshotCoverage {
  /** Days with a total market cap value. */
  points: number;
  firstDay: string | null;
}

/** How much total market cap history the snapshots hold. */
export async function getSnapshotCoverage(): Promise<SnapshotCoverage> {
  "use cache";
  cacheLife({ stale: 600, revalidate: 3600, expire: 7200 });
  const db = publicClient();
  if (!db) return { points: 0, firstDay: null };
  const { data, count, error } = await db
    .from("market_daily")
    .select("day", { count: "exact" })
    .not("total_market_cap_usd", "is", null)
    .order("day", { ascending: true })
    .limit(1);
  if (error) return { points: 0, firstDay: null };
  return { points: count ?? 0, firstDay: data?.[0]?.day ?? null };
}

export async function snapshotHistoryAvailable(): Promise<boolean> {
  return (await getSnapshotCoverage()).points >= MIN_SNAPSHOT_POINTS;
}

/** Total market cap from the daily snapshots, labelled with the provider that supplied the latest day. */
export async function getSnapshotTotalMarketCap(range: ChartRange): Promise<DataResult<SeriesPoint[]>> {
  "use cache";
  cacheLife({ stale: 600, revalidate: 3600, expire: 7200 });
  const db = publicClient();
  if (!db) return { status: "unavailable", data: null, source: null, asOf: null, note: "Supabase is not configured." };
  const start = rangeStartDay(range, new Date());
  let query = db.from("market_daily").select("day, observed_at, total_market_cap_usd, sources").order("day", { ascending: true }).limit(3000);
  if (start) query = query.gte("day", start);
  const { data, error } = await query;
  if (error) return { status: "unavailable", data: null, source: null, asOf: null, note: "Daily snapshots are not available yet." };
  const rows = (data ?? []) as Pick<MarketDailyRow, "day" | "observed_at" | "total_market_cap_usd" | "sources">[];
  const series = totalMarketCapSeries(rows);
  if (series.length < MIN_SNAPSHOT_POINTS) {
    return { status: "unavailable", data: null, source: null, asOf: null, note: "Daily snapshots need a few more days to draw a history." };
  }
  const latest = rows.filter((r) => r.total_market_cap_usd != null).at(-1);
  const provider = PROVIDERS[latest?.sources?.global ?? ""] ?? COINGECKO_SOURCE;
  return {
    status: "ok",
    data: series,
    source: { name: `${provider.name} (Sensitor daily snapshots)`, url: provider.url },
    asOf: latest?.observed_at ?? null,
  };
}
