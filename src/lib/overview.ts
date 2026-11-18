/**
 * Overview helpers: a factual one-line market context and a list of market
 * developments derived from live data. Every statement is computed from a
 * provider payload and carries that payload's source and timestamp; nothing
 * is written by hand or forecast.
 */
import { formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import type { AltcoinBreadth, DataResult, DataSourceRef, DefiOverview, FearGreedPoint, GlobalMarket, MarketRegime, Quote, StablecoinOverview } from "@/lib/market/types";

export function marketContext(global: GlobalMarket | null, regime: MarketRegime | null, fng: FearGreedPoint | null): string | null {
  const parts: string[] = [];
  if (global) {
    const c = global.marketCapChange24h;
    parts.push(
      c == null
        ? `Total crypto market cap ${formatUsdCompact(global.totalMarketCap)}.`
        : `Total crypto market cap ${formatUsdCompact(global.totalMarketCap)}, ${c >= 0 ? "up" : "down"} ${formatPercent(Math.abs(c), { signed: false, digits: 1 })} over 24 hours.`,
    );
  }
  if (regime) parts.push(`Bitcoin trades ${formatPercent(Math.abs(regime.distancePct), { signed: false, digits: 1 })} ${regime.distancePct >= 0 ? "above" : "below"} its 200-day average.`);
  if (fng) parts.push(`Sentiment: ${fng.classification} (${fng.value}).`);
  return parts.length ? parts.join(" ") : null;
}

export interface Development {
  id: string;
  topic: string;
  text: string;
  href: string;
  source: DataSourceRef | null;
  asOf: string | null;
}

interface Inputs {
  regime: DataResult<MarketRegime>;
  breadth: DataResult<AltcoinBreadth>;
  fng: DataResult<FearGreedPoint[]>;
  stables: DataResult<StablecoinOverview>;
  defi: DataResult<DefiOverview>;
  quotes: DataResult<Record<string, Quote>>;
  names: Record<string, string>;
}

const pct1 = (v: number) => formatPercent(Math.abs(v), { signed: false, digits: 1 });

export function buildDevelopments({ regime, breadth, fng, stables, defi, quotes, names }: Inputs): Development[] {
  const out: Development[] = [];
  const meta = (r: DataResult<unknown>) => ({ source: r.source, asOf: r.asOf });

  if (regime.data) {
    const r = regime.data;
    out.push({ id: "regime", topic: "Trend", href: "/markets#regime", text: `Bitcoin at ${formatPrice(r.price)} is ${pct1(r.distancePct)} ${r.distancePct >= 0 ? "above" : "below"} its 200-day average (${formatPrice(r.ma200)}).`, ...meta(regime) });
  }
  const f = fng.data?.[0];
  const f7 = fng.data?.[7];
  if (f) {
    const shift = f7 ? (f7.classification === f.classification ? `, unchanged in zone from ${f7.value} a week ago` : `, from ${f7.classification} (${f7.value}) a week ago`) : "";
    out.push({ id: "fng", topic: "Sentiment", href: "/markets#sentiment", text: `Fear & Greed at ${f.value}, ${f.classification}${shift}.`, ...meta(fng) });
  }
  if (breadth.data) {
    const b = breadth.data;
    out.push({ id: "breadth", topic: "Breadth", href: "/markets", text: `${b.outperformers} of ${b.sample} large altcoins beat Bitcoin over 30 days (BTC ${formatPercent(b.btcChange30d, { digits: 1 })}).`, ...meta(breadth) });
  }
  if (stables.data?.change30dPct != null) {
    const s = stables.data;
    out.push({ id: "stables", topic: "Liquidity", href: "/markets#stablecoins", text: `Stablecoin supply ${s.change30dPct! >= 0 ? "grew" : "shrank"} ${pct1(s.change30dPct!)} over 30 days to ${formatUsdCompact(s.totalCirculating)}.`, ...meta(stables) });
  }
  if (defi.data?.change30dPct != null) {
    const d = defi.data;
    out.push({ id: "defi", topic: "DeFi", href: "/markets", text: `Value locked in DeFi is ${formatUsdCompact(d.totalTvl)}, ${d.change30dPct! >= 0 ? "up" : "down"} ${pct1(d.change30dPct!)} over 30 days.`, ...meta(defi) });
  }
  if (quotes.data) {
    const movers = Object.entries(quotes.data)
      .filter(([, q]) => q.change24h != null)
      .sort((a, b) => Math.abs(b[1].change24h!) - Math.abs(a[1].change24h!));
    const [slug, q] = movers[0] ?? [];
    if (slug && q) out.push({ id: "mover", topic: "Movers", href: `/projects/${slug}`, text: `${names[slug] ?? slug} is the largest 24h mover in Sensitor coverage, ${formatPercent(q.change24h, { digits: 1 })}.`, ...meta(quotes) });
  }
  return out;
}
