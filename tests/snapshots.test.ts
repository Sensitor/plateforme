import { describe, expect, it } from "vitest";
import { buildAssetRows, buildMarketRow, MIN_SNAPSHOT_POINTS, rangeStartDay, snapshotDay, totalMarketCapSeries, type SnapshotInputs } from "@/lib/market/snapshots-core";
import type { DataResult } from "@/lib/market/types";

const src = (name: string) => ({ name, url: "https://example.com" });
const ok = <T,>(data: T, name: string, asOf = "2026-11-21T23:40:05.000Z"): DataResult<T> => ({ status: "ok", data, source: src(name), asOf });
const down = <T,>(): DataResult<T> => ({ status: "unavailable", data: null, source: null, asOf: null, note: "down" });

const quote = (price: number | null, marketCap: number | null) => ({
  coingeckoId: "x", symbol: "X", name: "X", image: null, price, change24h: 1.5, change7d: null, change30d: null, marketCap, fdv: null,
  volume24h: 10, circulatingSupply: null, totalSupply: null, maxSupply: null, rank: 1, ath: null, athChangePct: null, sparkline7d: null,
  lastUpdated: "2026-11-21T23:39:00.000Z",
});

function inputs(over: Partial<SnapshotInputs> = {}): SnapshotInputs {
  return {
    now: new Date("2026-11-21T23:40:00Z"),
    quotes: ok({ bitcoin: quote(90_000, 1.8e12), ethereum: quote(null, null) }, "CoinGecko"),
    tvl: ok({ bitcoin: null, ethereum: 6e10 }, "DefiLlama"),
    global: ok({ totalMarketCap: 3.1e12, totalVolume24h: 1.2e11, marketCapChange24h: 0.4, btcDominance: 58.2, ethDominance: 11.1, activeCryptocurrencies: 18000 }, "CoinGecko"),
    defi: ok({ totalTvl: 1.1e11, change30dPct: 2, series: [], topChains: [] }, "DefiLlama"),
    stablecoins: ok({ totalCirculating: 3.0e11, change30dPct: 1, top: [], series: [] }, "DefiLlama"),
    fearGreed: ok([{ value: 41.6, classification: "Fear", t: 0 }], "Alternative.me"),
    ...over,
  };
}

describe("daily market snapshots", () => {
  it("uses the UTC calendar day", () => {
    expect(snapshotDay(new Date("2026-11-21T23:59:59Z"))).toBe("2026-11-21");
    expect(snapshotDay(new Date("2026-11-22T00:00:01+02:00"))).toBe("2026-11-21");
  });

  it("records every market-wide figure with its provider and observation time", () => {
    const row = buildMarketRow(inputs())!;
    expect(row.day).toBe("2026-11-21");
    expect(row.observed_at).toBe("2026-11-21T23:40:05.000Z");
    expect(row.total_market_cap_usd).toBe(3.1e12);
    expect(row.fear_greed).toBe(42);
    expect(row.sources).toEqual({ global: "CoinGecko", defi: "DefiLlama", stablecoins: "DefiLlama", sentiment: "Alternative.me" });
  });

  it("never invents a value when a provider is down", () => {
    const row = buildMarketRow(inputs({ global: down(), fearGreed: down() }))!;
    expect(row.total_market_cap_usd).toBeNull();
    expect(row.btc_dominance).toBeNull();
    expect(row.fear_greed).toBeNull();
    expect(row.sources).toEqual({ defi: "DefiLlama", stablecoins: "DefiLlama" });
    expect(buildMarketRow(inputs({ global: down(), defi: down(), stablecoins: down(), fearGreed: down() }))).toBeNull();
  });

  it("keeps one row per asset with at least one observed figure, sources attached only to present values", () => {
    const rows = buildAssetRows(inputs(), ["bitcoin", "ethereum", "solana"]);
    expect(rows.map((r) => r.slug)).toEqual(["bitcoin", "ethereum"]);
    const [btc, eth] = rows;
    expect([btc.price_usd, btc.tvl_usd, btc.quote_source, btc.tvl_source]).toEqual([90_000, null, "CoinGecko", null]);
    expect([eth.price_usd, eth.tvl_usd, eth.tvl_source]).toEqual([null, 6e10, "DefiLlama"]);
    expect(buildAssetRows(inputs({ quotes: down(), tvl: down() }), ["bitcoin"])).toEqual([]);
  });

  it("builds a sorted total market cap series and needs two points to draw it", () => {
    const series = totalMarketCapSeries([
      { observed_at: "2026-11-21T23:40:00Z", total_market_cap_usd: 3.1e12 },
      { observed_at: "2026-11-19T23:40:00Z", total_market_cap_usd: 3.0e12 },
      { observed_at: "2026-11-20T23:40:00Z", total_market_cap_usd: null },
    ]);
    expect(series.map((p) => p.v)).toEqual([3.0e12, 3.1e12]);
    expect(series.length).toBeGreaterThanOrEqual(MIN_SNAPSHOT_POINTS);
  });

  it("maps chart ranges to a first day", () => {
    const now = new Date("2026-11-21T12:00:00Z");
    expect(rangeStartDay("7D", now)).toBe("2026-11-14");
    expect(rangeStartDay("1Y", now)).toBe("2025-11-21");
    expect(rangeStartDay("ALL", now)).toBeNull();
  });
});
