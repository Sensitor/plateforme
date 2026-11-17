import { describe, expect, it } from "vitest";
import { DEFAULT_FILTERS, activeFilterCount, filterRows, sortRows, type ExploreRow } from "@/lib/explore";

const row = (over: Partial<ExploreRow>): ExploreRow => ({
  slug: "x",
  name: "X",
  ticker: "X",
  logo: "",
  oneLiner: "",
  sector: "layer-1",
  sectorLabel: "Layer 1",
  chains: ["ethereum"],
  chainLabel: "Ethereum",
  riskLevel: "moderate",
  maturity: "established",
  coverage: "full",
  score: 3,
  scoreNote: null,
  editorialStatus: "draft",
  price: 1,
  change24h: 0,
  change7d: 0,
  marketCap: 1e9,
  fdv: 1e9,
  volume24h: 1e8,
  tvl: null,
  sparkline: null,
  ...over,
});

const rows = [
  row({ slug: "a", name: "Alpha", ticker: "ALP", marketCap: 80e9, change24h: 2, sector: "layer-1" }),
  row({ slug: "b", name: "Beta", ticker: "BET", marketCap: 2e9, change24h: -3, sector: "defi", chains: ["solana"] }),
  row({ slug: "c", name: "Gamma", ticker: "GAM", marketCap: null, change24h: null, sector: "defi", riskLevel: "high" }),
];

describe("explore filters", () => {
  it("filters by text on name and ticker", () => {
    expect(filterRows(rows, { ...DEFAULT_FILTERS, q: "bet" }).map((r) => r.slug)).toEqual(["b"]);
    expect(filterRows(rows, { ...DEFAULT_FILTERS, q: "GAM" }).map((r) => r.slug)).toEqual(["c"]);
  });

  it("combines sector, chain, risk and market cap filters", () => {
    expect(filterRows(rows, { ...DEFAULT_FILTERS, sector: "defi" }).length).toBe(2);
    expect(filterRows(rows, { ...DEFAULT_FILTERS, chain: "solana" }).map((r) => r.slug)).toEqual(["b"]);
    expect(filterRows(rows, { ...DEFAULT_FILTERS, risk: "high" }).map((r) => r.slug)).toEqual(["c"]);
    expect(filterRows(rows, { ...DEFAULT_FILTERS, mcap: "mega" }).map((r) => r.slug)).toEqual(["a"]);
  });

  it("excludes rows without data from value-based filters", () => {
    expect(filterRows(rows, { ...DEFAULT_FILTERS, perf: "down24h" }).map((r) => r.slug)).toEqual(["b"]);
  });

  it("filters to the watchlist", () => {
    expect(filterRows(rows, { ...DEFAULT_FILTERS, watchlistOnly: true }, ["c"]).map((r) => r.slug)).toEqual(["c"]);
  });

  it("counts active advanced filters (not search or sector)", () => {
    expect(activeFilterCount({ ...DEFAULT_FILTERS, q: "x", sector: "defi" })).toBe(0);
    expect(activeFilterCount({ ...DEFAULT_FILTERS, risk: "high", mcap: "mid" })).toBe(2);
  });
});

describe("explore sorting", () => {
  it("sorts descending with missing values last", () => {
    expect(sortRows(rows, "marketCap", "desc").map((r) => r.slug)).toEqual(["a", "b", "c"]);
    expect(sortRows(rows, "marketCap", "asc").map((r) => r.slug)).toEqual(["b", "a", "c"]);
  });

  it("sorts names alphabetically", () => {
    expect(sortRows(rows, "name", "asc").map((r) => r.name)).toEqual(["Alpha", "Beta", "Gamma"]);
  });
});
