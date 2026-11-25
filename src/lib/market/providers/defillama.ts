import "server-only";
import { fetchJson } from "../http";
import type { SeriesPoint } from "../types";

/**
 * DefiLlama, open data for TVL, fees/revenue, stablecoins and historical
 * prices. Free and keyless (https://defillama.com/docs/api).
 */

export const DEFILLAMA_SOURCE = { name: "DefiLlama", url: "https://defillama.com" };

export async function llamaProtocolTvl(slug: string): Promise<number> {
  const v = await fetchJson<number>("defillama", `https://api.llama.fi/tvl/${slug}`);
  if (typeof v !== "number") throw new Error("unexpected TVL payload");
  return v;
}

export interface LlamaChain {
  name: string;
  tvl: number;
  gecko_id: string | null;
  tokenSymbol: string | null;
}

export async function llamaChains(): Promise<LlamaChain[]> {
  return fetchJson<LlamaChain[]>("defillama", "https://api.llama.fi/v2/chains");
}

export async function llamaHistoricalTvl(): Promise<SeriesPoint[]> {
  const rows = await fetchJson<{ date: number; tvl: number }[]>("defillama", "https://api.llama.fi/v2/historicalChainTvl");
  return rows.filter((r) => r.tvl > 0).map((r) => ({ t: r.date * 1000, v: r.tvl }));
}

export interface LlamaFeesSummary {
  total24h: number | null;
  total7d: number | null;
  total30d: number | null;
  total1y: number | null;
  change_30dover30d?: number | null;
}

export async function llamaFees(slug: string, dataType: "dailyFees" | "dailyRevenue"): Promise<LlamaFeesSummary> {
  return fetchJson<LlamaFeesSummary>(
    "defillama",
    `https://api.llama.fi/summary/fees/${slug}?dataType=${dataType}&excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true`,
    { timeoutMs: 12000 },
  );
}

interface LlamaStable {
  name: string;
  symbol: string;
  pegType: string;
  pegMechanism: string | null;
  circulating: Record<string, number>;
}

export async function llamaStablecoins(): Promise<LlamaStable[]> {
  const res = await fetchJson<{ peggedAssets: LlamaStable[] }>(
    "defillama",
    "https://stablecoins.llama.fi/stablecoins?includePrices=false",
  );
  return res.peggedAssets;
}

export async function llamaStablecoinChart(): Promise<SeriesPoint[]> {
  const rows = await fetchJson<{ date: string; totalCirculatingUSD: Record<string, number> }[]>(
    "defillama",
    "https://stablecoins.llama.fi/stablecoincharts/all",
    { timeoutMs: 15000 },
  );
  return rows.map((r) => ({
    t: Number(r.date) * 1000,
    v: Object.values(r.totalCirculatingUSD ?? {}).reduce((a, b) => a + (b || 0), 0),
  }));
}

/** Historical USD prices keyed by CoinGecko id (DefiLlama coins API). */
export async function llamaPriceChart(
  coingeckoId: string,
  opts: { span: number; period: string; start?: number },
): Promise<SeriesPoint[]> {
  const params = new URLSearchParams({ span: String(opts.span), period: opts.period });
  if (opts.start) params.set("start", String(opts.start));
  const key = `coingecko:${coingeckoId}`;
  const res = await fetchJson<{ coins: Record<string, { prices: { timestamp: number; price: number }[] }> }>(
    "defillama",
    `https://coins.llama.fi/chart/${key}?${params.toString()}`,
    { timeoutMs: 12000 },
  );
  const prices = res.coins?.[key]?.prices;
  if (!prices?.length) throw new Error("no price history returned");
  return prices.map((p) => ({ t: p.timestamp * 1000, v: p.price }));
}

/** Full weekly close history from `start` (unix seconds), fetched in 499-week chunks (the API caps a span at 500). */
export async function llamaWeeklyHistory(coingeckoId: string, start: number): Promise<SeriesPoint[]> {
  const WEEK = 7 * 86400;
  const out: SeriesPoint[] = [];
  let from = start;
  for (let i = 0; i < 4; i++) {
    const chunk = await llamaPriceChart(coingeckoId, { start: from, span: 499, period: "1w" });
    for (const p of chunk) if (!out.length || p.t > out[out.length - 1].t) out.push(p);
    const lastSec = Math.floor(out[out.length - 1].t / 1000);
    // Stop once the history reaches the last two weeks (the API may return slightly fewer points than asked).
    if (lastSec + 2 * WEEK > Date.now() / 1000) break;
    from = lastSec + WEEK;
  }
  return out;
}
