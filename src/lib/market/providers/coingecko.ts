import "server-only";
import { fetchJson } from "../http";
import type { GlobalMarket, Quote, SeriesPoint } from "../types";

/**
 * CoinGecko, primary source for prices, market caps, FDV and supply.
 * Works keyless (public rate limits). Set COINGECKO_DEMO_API_KEY or
 * COINGECKO_PRO_API_KEY to raise limits; the Pro key also unlocks the
 * historical total-market-cap chart.
 * Terms: https://www.coingecko.com/en/api_terms, attribution required.
 */

export const COINGECKO_SOURCE = { name: "CoinGecko", url: "https://www.coingecko.com" };

function config() {
  const pro = process.env.COINGECKO_PRO_API_KEY;
  const demo = process.env.COINGECKO_DEMO_API_KEY;
  if (pro) return { base: "https://pro-api.coingecko.com/api/v3", headers: { "x-cg-pro-api-key": pro }, pro: true };
  if (demo) return { base: "https://api.coingecko.com/api/v3", headers: { "x-cg-demo-api-key": demo }, pro: false };
  return { base: "https://api.coingecko.com/api/v3", headers: {} as Record<string, string>, pro: false };
}

export function hasCoinGeckoPro() {
  return Boolean(process.env.COINGECKO_PRO_API_KEY);
}

interface CgMarket {
  id: string;
  symbol: string;
  name: string;
  image: string | null;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  last_updated: string | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  price_change_percentage_30d_in_currency?: number | null;
  sparkline_in_7d?: { price: number[] } | null;
}

function toQuote(m: CgMarket): Quote {
  return {
    coingeckoId: m.id,
    symbol: m.symbol.toUpperCase(),
    name: m.name,
    image: m.image,
    price: m.current_price,
    change24h: m.price_change_percentage_24h_in_currency ?? null,
    change7d: m.price_change_percentage_7d_in_currency ?? null,
    change30d: m.price_change_percentage_30d_in_currency ?? null,
    marketCap: m.market_cap || null,
    fdv: m.fully_diluted_valuation || null,
    volume24h: m.total_volume,
    circulatingSupply: m.circulating_supply,
    totalSupply: m.total_supply,
    maxSupply: m.max_supply,
    rank: m.market_cap_rank,
    ath: m.ath,
    athChangePct: m.ath_change_percentage,
    sparkline7d: m.sparkline_in_7d?.price?.length ? downsample(m.sparkline_in_7d.price, 56) : null,
    lastUpdated: m.last_updated,
  };
}

function downsample(values: number[], target: number): number[] {
  if (values.length <= target) return values;
  const step = values.length / target;
  const out: number[] = [];
  for (let i = 0; i < target; i++) out.push(values[Math.floor(i * step)]);
  out.push(values[values.length - 1]);
  return out;
}

export async function cgMarkets(ids: string[]): Promise<Quote[]> {
  const { base, headers } = config();
  const url =
    `${base}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(ids.join(","))}` +
    `&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h,7d,30d`;
  const data = await fetchJson<CgMarket[]>("coingecko", url, { headers });
  return data.map(toQuote);
}

export async function cgTopMarkets(limit = 100): Promise<Quote[]> {
  const { base, headers } = config();
  const url =
    `${base}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1` +
    `&sparkline=false&price_change_percentage=24h,7d,30d`;
  const data = await fetchJson<CgMarket[]>("coingecko", url, { headers });
  return data.map(toQuote);
}

interface CgGlobal {
  data: {
    active_cryptocurrencies: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export async function cgGlobal(): Promise<{ data: GlobalMarket; asOf: string }> {
  const { base, headers } = config();
  const res = await fetchJson<CgGlobal>("coingecko", `${base}/global`, { headers });
  const d = res.data;
  return {
    data: {
      totalMarketCap: d.total_market_cap.usd,
      totalVolume24h: d.total_volume.usd ?? null,
      marketCapChange24h: d.market_cap_change_percentage_24h_usd ?? null,
      btcDominance: d.market_cap_percentage.btc ?? null,
      ethDominance: d.market_cap_percentage.eth ?? null,
      activeCryptocurrencies: d.active_cryptocurrencies ?? null,
    },
    asOf: new Date(d.updated_at * 1000).toISOString(),
  };
}

/** Historical total market cap, CoinGecko Pro plan only. */
export async function cgGlobalMarketCapChart(days: number | "max"): Promise<SeriesPoint[]> {
  const { base, headers, pro } = config();
  if (!pro) throw new Error("CoinGecko Pro API key required for total market cap history");
  const res = await fetchJson<{ market_cap_chart: { market_cap: [number, number][] } }>(
    "coingecko",
    `${base}/global/market_cap_chart?days=${days}`,
    { headers },
  );
  return res.market_cap_chart.market_cap.map(([t, v]) => ({ t, v }));
}
