/**
 * Shared market-data types. Every payload that reaches the UI is wrapped in a
 * `DataResult` so components always know where a number came from, when it was
 * observed, and whether it is available at all. We never substitute demo data
 * for real market data: an unavailable source renders as "unavailable".
 */

export interface DataSourceRef {
  name: string;
  url: string;
}

export type DataStatus = "ok" | "partial" | "unavailable";

export interface DataResult<T> {
  status: DataStatus;
  data: T | null;
  source: DataSourceRef | null;
  /** ISO timestamp of the observation (provider timestamp when available). */
  asOf: string | null;
  /** Human-readable reason when status !== "ok". */
  note?: string;
}

export interface Quote {
  coingeckoId: string;
  symbol: string;
  name: string;
  image: string | null;
  price: number | null;
  change24h: number | null;
  change7d: number | null;
  change30d: number | null;
  marketCap: number | null;
  fdv: number | null;
  volume24h: number | null;
  circulatingSupply: number | null;
  totalSupply: number | null;
  maxSupply: number | null;
  rank: number | null;
  ath: number | null;
  athChangePct: number | null;
  sparkline7d: number[] | null;
  lastUpdated: string | null;
}

export interface GlobalMarket {
  totalMarketCap: number;
  totalVolume24h: number | null;
  marketCapChange24h: number | null;
  btcDominance: number | null;
  ethDominance: number | null;
  activeCryptocurrencies: number | null;
}

export interface SeriesPoint {
  /** Unix epoch milliseconds */
  t: number;
  v: number;
}

export type ChartRange = "1D" | "7D" | "1M" | "3M" | "1Y" | "ALL";
export const CHART_RANGES: ChartRange[] = ["1D", "7D", "1M", "3M", "1Y", "ALL"];

export interface FearGreedPoint {
  value: number;
  classification: string;
  t: number;
}

export interface ProjectFundamentals {
  tvl: number | null;
  tvlScope: "protocol" | "chain" | null;
  fees24h: number | null;
  fees30d: number | null;
  fees1y: number | null;
  revenue30d: number | null;
  revenue1y: number | null;
  feesChange30d: number | null;
}

export interface StablecoinOverview {
  totalCirculating: number;
  change30dPct: number | null;
  top: { name: string; symbol: string; circulating: number; pegMechanism: string | null }[];
  series: SeriesPoint[];
}

export interface DefiOverview {
  totalTvl: number;
  change30dPct: number | null;
  series: SeriesPoint[];
  topChains: { name: string; tvl: number }[];
}

export interface MarketRegime {
  price: number;
  ma200: number;
  ma50: number;
  distancePct: number;
  regime: "above-200d" | "below-200d";
  series: SeriesPoint[];
  /** Rolling 200-day moving average aligned with `series`. */
  maSeries: SeriesPoint[];
}

export interface AltcoinBreadth {
  outperformers: number;
  sample: number;
  btcChange30d: number;
  excluded: number;
}
