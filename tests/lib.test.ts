import { describe, expect, it } from "vitest";
import { formatPercent, formatPrice, formatRelative, formatUsdCompact } from "@/lib/format";
import { changeOverWindow, downsampleSeries, movingAverage } from "@/lib/market/series";
import { disinflationRates, modelSupplyCurve } from "@/lib/research/issuance";
import { searchEntries, type SearchEntry } from "@/lib/search-index";

describe("format", () => {
  it("formats compact USD deterministically", () => {
    expect(formatUsdCompact(2_680_000_000_000)).toBe("$2.68T");
    expect(formatUsdCompact(220_400_000_000)).toBe("$220.4B");
    expect(formatUsdCompact(37_020_000_000)).toBe("$37.02B");
    expect(formatUsdCompact(1_500_000)).toBe("$1.5M");
    expect(formatUsdCompact(null)).toBe("n/a");
  });
  it("adapts price precision to magnitude", () => {
    expect(formatPrice(64263)).toBe("$64,263.00");
    expect(formatPrice(0.1234567)).toBe("$0.1235");
  });
  it("signs percentages", () => {
    expect(formatPercent(2.345)).toBe("+2.35%");
    expect(formatPercent(-1)).toBe("-1.00%");
  });
  it("renders relative times", () => {
    const now = Date.parse("2026-01-01T12:00:00Z");
    expect(formatRelative("2026-01-01T11:58:00Z", now)).toBe("2 min ago");
  });
});

describe("series", () => {
  const s = Array.from({ length: 300 }, (_, i) => ({ t: i * 86400_000, v: i + 1 }));
  it("computes moving averages", () => {
    expect(movingAverage([1, 2, 3, 4], 2)).toBe(3.5);
    expect(movingAverage([1], 2)).toBeNull();
  });
  it("downsamples while keeping the last point", () => {
    const d = downsampleSeries(s, 50);
    expect(d.length).toBeLessThanOrEqual(51);
    expect(d.at(-1)).toEqual(s.at(-1));
  });
  it("computes change over a window", () => {
    expect(changeOverWindow(s, 30)).toBeCloseTo((300 / 270 - 1) * 100, 5);
  });
});

describe("issuance models", () => {
  it("converges to the Bitcoin cap", () => {
    const curve = modelSupplyCurve({ kind: "halving", genesisDate: "2009-01-03", initialReward: 50, blocksPerHalving: 210_000, blockTimeSec: 600, maxSupply: 21_000_000, untilYear: 2140 });
    expect(curve.at(-1)!.v).toBeGreaterThan(20_990_000);
    expect(curve.at(-1)!.v).toBeLessThanOrEqual(21_000_000);
  });
  it("respects the terminal inflation rate", () => {
    const rates = disinflationRates({ kind: "disinflation", startDate: "2021-01-01", startSupply: 100, initialRate: 8, decayPerYear: 0.15, terminalRate: 1.5, years: 20 });
    expect(rates[0]).toBe(8);
    expect(rates.at(-1)).toBe(1.5);
  });
});

describe("search", () => {
  const entries: SearchEntry[] = [
    { id: "1", type: "project", title: "Ethereum", subtitle: "ETH · Layer 1", href: "/projects/ethereum", keywords: "smart contracts" },
    { id: "2", type: "project", title: "Ethena", subtitle: "ENA · Stablecoins", href: "/projects/ethena", keywords: "synthetic dollar" },
    { id: "3", type: "concept", title: "Smart contracts", href: "/academy/concepts/smart-contracts", keywords: "programs" },
  ];
  it("ranks exact ticker matches first", () => {
    expect(searchEntries(entries, "eth")[0].title).toBe("Ethereum");
    expect(searchEntries(entries, "ena")[0].title).toBe("Ethena");
  });
  it("matches keywords", () => {
    expect(searchEntries(entries, "synthetic").map((e) => e.id)).toEqual(["2"]);
  });
});
