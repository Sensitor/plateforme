import type { ChartRange, DataResult, DefiOverview, FearGreedPoint, GlobalMarket, Quote, SeriesPoint, StablecoinOverview } from "./types";

/**
 * Daily market snapshots: pure helpers shared by the cron job that writes them
 * and the pages that read them. Every row keeps its provider and the exact
 * observation time; nothing here invents or interpolates a value.
 */

export interface MarketDailyRow {
  day: string;
  observed_at: string;
  total_market_cap_usd: number | null;
  total_volume_usd: number | null;
  btc_dominance: number | null;
  eth_dominance: number | null;
  defi_tvl_usd: number | null;
  stablecoin_supply_usd: number | null;
  fear_greed: number | null;
  fear_greed_label: string | null;
  sources: Record<string, string>;
}

export interface AssetDailyRow {
  day: string;
  slug: string;
  observed_at: string;
  price_usd: number | null;
  market_cap_usd: number | null;
  fdv_usd: number | null;
  volume_24h_usd: number | null;
  change_24h_pct: number | null;
  tvl_usd: number | null;
  quote_source: string | null;
  tvl_source: string | null;
}

export interface SnapshotInputs {
  now: Date;
  quotes: DataResult<Record<string, Quote>>;
  tvl: DataResult<Record<string, number | null>>;
  global: DataResult<GlobalMarket>;
  defi: DataResult<DefiOverview>;
  stablecoins: DataResult<StablecoinOverview>;
  fearGreed: DataResult<FearGreedPoint[]>;
}

/** UTC calendar day of an instant, as YYYY-MM-DD. */
export function snapshotDay(at: Date): string {
  return at.toISOString().slice(0, 10);
}

const finite = (v: number | null | undefined) => (typeof v === "number" && Number.isFinite(v) ? v : null);
const okData = <T>(r: DataResult<T>) => (r.status === "unavailable" ? null : r.data);

/** Market-wide row for the day, or null when no market-wide figure is available. */
export function buildMarketRow(input: SnapshotInputs): MarketDailyRow | null {
  const g = okData(input.global);
  const defi = okData(input.defi);
  const stable = okData(input.stablecoins);
  const fng = okData(input.fearGreed)?.[0] ?? null;
  const sources: Record<string, string> = {};
  if (g && input.global.source) sources.global = input.global.source.name;
  if (defi && input.defi.source) sources.defi = input.defi.source.name;
  if (stable && input.stablecoins.source) sources.stablecoins = input.stablecoins.source.name;
  if (fng && input.fearGreed.source) sources.sentiment = input.fearGreed.source.name;
  if (!Object.keys(sources).length) return null;
  return {
    day: snapshotDay(input.now),
    observed_at: input.global.asOf ?? input.now.toISOString(),
    total_market_cap_usd: finite(g?.totalMarketCap),
    total_volume_usd: finite(g?.totalVolume24h),
    btc_dominance: finite(g?.btcDominance),
    eth_dominance: finite(g?.ethDominance),
    defi_tvl_usd: finite(defi?.totalTvl),
    stablecoin_supply_usd: finite(stable?.totalCirculating),
    fear_greed: fng ? Math.round(fng.value) : null,
    fear_greed_label: fng?.classification ?? null,
    sources,
  };
}

/** One row per covered asset that has at least one observed figure. */
export function buildAssetRows(input: SnapshotInputs, slugs: string[]): AssetDailyRow[] {
  const quotes = okData(input.quotes);
  const tvl = okData(input.tvl);
  const day = snapshotDay(input.now);
  const quoteSource = input.quotes.source?.name ?? null;
  const tvlSource = input.tvl.source?.name ?? null;
  const rows: AssetDailyRow[] = [];
  for (const slug of slugs) {
    const q = quotes?.[slug];
    const t = finite(tvl?.[slug]);
    const row: AssetDailyRow = {
      day,
      slug,
      observed_at: q?.lastUpdated ?? input.quotes.asOf ?? input.now.toISOString(),
      price_usd: finite(q?.price),
      market_cap_usd: finite(q?.marketCap),
      fdv_usd: finite(q?.fdv),
      volume_24h_usd: finite(q?.volume24h),
      change_24h_pct: finite(q?.change24h),
      tvl_usd: t,
      quote_source: q ? quoteSource : null,
      tvl_source: t != null ? tvlSource : null,
    };
    if (row.price_usd != null || row.market_cap_usd != null || row.tvl_usd != null) rows.push(row);
  }
  return rows;
}

const RANGE_DAYS: Record<ChartRange, number | null> = { "1D": 1, "7D": 7, "1M": 30, "3M": 90, "1Y": 365, ALL: null };

/** First UTC day included in a chart range, or null for the whole history. */
export function rangeStartDay(range: ChartRange, now: Date): string | null {
  const days = RANGE_DAYS[range];
  if (days == null) return null;
  return snapshotDay(new Date(now.getTime() - days * 86_400_000));
}

/** Total market cap series from daily rows, oldest first, skipping days without a value. */
export function totalMarketCapSeries(rows: Pick<MarketDailyRow, "observed_at" | "total_market_cap_usd">[]): SeriesPoint[] {
  return rows
    .filter((r) => r.total_market_cap_usd != null)
    .map((r) => ({ t: Date.parse(r.observed_at), v: Number(r.total_market_cap_usd) }))
    .filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v))
    .sort((a, b) => a.t - b.t);
}

/** A chart needs at least two daily points to draw a line. */
export const MIN_SNAPSHOT_POINTS = 2;
