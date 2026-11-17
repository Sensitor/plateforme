import type { ChainId, Maturity, RiskLevel, SectorId } from "@/lib/research/types";
import type { CoverageLevel } from "@/lib/research/framework";
import { RISK_LEVELS } from "@/lib/research/taxonomy";

/** One row of the Explore table: static research metadata + live market data. */
export interface ExploreRow {
  slug: string;
  name: string;
  ticker: string;
  logo: string;
  oneLiner: string;
  sector: SectorId;
  sectorLabel: string;
  chains: ChainId[];
  chainLabel: string;
  riskLevel: RiskLevel;
  maturity: Maturity;
  coverage: CoverageLevel;
  score: number | null;
  scoreNote: string | null;
  editorialStatus: "draft" | "reviewed";
  price: number | null;
  change24h: number | null;
  change7d: number | null;
  marketCap: number | null;
  fdv: number | null;
  volume24h: number | null;
  tvl: number | null;
  sparkline: number[] | null;
}

export type McapBucket = "all" | "mega" | "large" | "mid" | "small";
export type VolumeBucket = "all" | "high" | "mid" | "low";
export type PerfFilter = "all" | "up24h" | "down24h" | "up7d" | "down7d";

export interface ExploreFilters {
  q: string;
  sector: SectorId | "all";
  chain: ChainId | "all";
  mcap: McapBucket;
  volume: VolumeBucket;
  perf: PerfFilter;
  risk: RiskLevel | "all";
  coverage: CoverageLevel | "all";
  maturity: Maturity | "all";
  watchlistOnly: boolean;
}

export const DEFAULT_FILTERS: ExploreFilters = {
  q: "",
  sector: "all",
  chain: "all",
  mcap: "all",
  volume: "all",
  perf: "all",
  risk: "all",
  coverage: "all",
  maturity: "all",
  watchlistOnly: false,
};

export const MCAP_BUCKETS: Record<Exclude<McapBucket, "all">, { label: string; min: number; max: number }> = {
  mega: { label: "> $50B", min: 50e9, max: Infinity },
  large: { label: "$5B to $50B", min: 5e9, max: 50e9 },
  mid: { label: "$500M to $5B", min: 500e6, max: 5e9 },
  small: { label: "< $500M", min: 0, max: 500e6 },
};

export const VOLUME_BUCKETS: Record<Exclude<VolumeBucket, "all">, { label: string; min: number; max: number }> = {
  high: { label: "> $1B / 24h", min: 1e9, max: Infinity },
  mid: { label: "$50M to $1B", min: 50e6, max: 1e9 },
  low: { label: "< $50M", min: 0, max: 50e6 },
};

export type SortKey = "default" | "name" | "price" | "change24h" | "change7d" | "marketCap" | "fdv" | "tvl" | "volume24h" | "score" | "risk";
export type SortDir = "asc" | "desc";

const inBucket = (v: number | null, b: { min: number; max: number }) => v != null && v >= b.min && v < b.max;

export function filterRows(rows: ExploreRow[], f: ExploreFilters, watchlist: string[] = []): ExploreRow[] {
  const q = f.q.trim().toLowerCase();
  return rows.filter((r) => {
    if (q && !`${r.name} ${r.ticker} ${r.sectorLabel} ${r.oneLiner}`.toLowerCase().includes(q)) return false;
    if (f.sector !== "all" && r.sector !== f.sector) return false;
    if (f.chain !== "all" && !r.chains.includes(f.chain)) return false;
    if (f.mcap !== "all" && !inBucket(r.marketCap, MCAP_BUCKETS[f.mcap])) return false;
    if (f.volume !== "all" && !inBucket(r.volume24h, VOLUME_BUCKETS[f.volume])) return false;
    if (f.perf === "up24h" && !(r.change24h != null && r.change24h > 0)) return false;
    if (f.perf === "down24h" && !(r.change24h != null && r.change24h < 0)) return false;
    if (f.perf === "up7d" && !(r.change7d != null && r.change7d > 0)) return false;
    if (f.perf === "down7d" && !(r.change7d != null && r.change7d < 0)) return false;
    if (f.risk !== "all" && r.riskLevel !== f.risk) return false;
    if (f.coverage !== "all" && r.coverage !== f.coverage) return false;
    if (f.maturity !== "all" && r.maturity !== f.maturity) return false;
    if (f.watchlistOnly && !watchlist.includes(r.slug)) return false;
    return true;
  });
}

/** Sort rows; missing values always go last regardless of direction. */
export function sortRows(rows: ExploreRow[], key: SortKey, dir: SortDir): ExploreRow[] {
  if (key === "default") return rows;
  const factor = dir === "asc" ? 1 : -1;
  const value = (r: ExploreRow): number | string | null => {
    if (key === "name") return r.name.toLowerCase();
    if (key === "risk") return RISK_LEVELS[r.riskLevel].rank;
    return r[key];
  };
  return [...rows].sort((a, b) => {
    const va = value(a);
    const vb = value(b);
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === "string" && typeof vb === "string") return va.localeCompare(vb) * factor;
    return ((va as number) - (vb as number)) * factor;
  });
}

export function activeFilterCount(f: ExploreFilters): number {
  return (Object.keys(DEFAULT_FILTERS) as (keyof ExploreFilters)[]).filter((k) => k !== "q" && k !== "sector" && f[k] !== DEFAULT_FILTERS[k]).length;
}
