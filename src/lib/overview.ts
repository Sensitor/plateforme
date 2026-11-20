/**
 * Overview helpers: a factual one-line market context and a list of market
 * developments derived from live data. Every statement is computed from a
 * provider payload and carries that payload's source and timestamp; nothing
 * is written by hand or forecast.
 */
import { formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import type { AltcoinBreadth, DataResult, DataSourceRef, DefiOverview, FearGreedPoint, GlobalMarket, MarketRegime, Quote, StablecoinOverview } from "@/lib/market/types";

export function marketContext(global: GlobalMarket | null, regime: MarketRegime | null, fng: FearGreedPoint | null, dict: Dictionary = getDictionary("en")): string | null {
  const t = dict.overview.context;
  const parts: string[] = [];
  if (global) {
    const c = global.marketCapChange24h;
    const cap = formatUsdCompact(global.totalMarketCap);
    parts.push(c == null ? t.cap(cap) : t.capChange(cap, c >= 0, formatPercent(Math.abs(c), { signed: false, digits: 1 })));
  }
  if (regime) parts.push(t.regime(formatPercent(Math.abs(regime.distancePct), { signed: false, digits: 1 }), regime.distancePct >= 0));
  if (fng) parts.push(t.sentiment(dict.ui.fearGreed[fng.classification] ?? fng.classification, fng.value));
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
  dict?: Dictionary;
}

const pct1 = (v: number) => formatPercent(Math.abs(v), { signed: false, digits: 1 });

export function buildDevelopments({ regime, breadth, fng, stables, defi, quotes, names, dict = getDictionary("en") }: Inputs): Development[] {
  const t = dict.overview.developments;
  const zone = (label: string) => dict.ui.fearGreed[label] ?? label;
  const out: Development[] = [];
  const meta = (r: DataResult<unknown>) => ({ source: r.source, asOf: r.asOf });

  if (regime.data) {
    const r = regime.data;
    out.push({ id: "regime", topic: t.topics.regime, href: "/markets#regime", text: t.regime(formatPrice(r.price), pct1(r.distancePct), r.distancePct >= 0, formatPrice(r.ma200)), ...meta(regime) });
  }
  const f = fng.data?.[0];
  const f7 = fng.data?.[7];
  if (f) {
    const text = !f7 ? t.fng(f.value, zone(f.classification)) : f7.classification === f.classification ? t.fngSame(f.value, zone(f.classification), f7.value) : t.fngShift(f.value, zone(f.classification), zone(f7.classification), f7.value);
    out.push({ id: "fng", topic: t.topics.fng, href: "/markets#sentiment", text, ...meta(fng) });
  }
  if (breadth.data) {
    const b = breadth.data;
    out.push({ id: "breadth", topic: t.topics.breadth, href: "/markets", text: t.breadth(b.outperformers, b.sample, formatPercent(b.btcChange30d, { digits: 1 })), ...meta(breadth) });
  }
  if (stables.data?.change30dPct != null) {
    const s = stables.data;
    out.push({ id: "stables", topic: t.topics.stables, href: "/markets#stablecoins", text: t.stables(s.change30dPct! >= 0, pct1(s.change30dPct!), formatUsdCompact(s.totalCirculating)), ...meta(stables) });
  }
  if (defi.data?.change30dPct != null) {
    const d = defi.data;
    out.push({ id: "defi", topic: t.topics.defi, href: "/markets", text: t.defi(formatUsdCompact(d.totalTvl), d.change30dPct! >= 0, pct1(d.change30dPct!)), ...meta(defi) });
  }
  if (quotes.data) {
    const movers = Object.entries(quotes.data)
      .filter(([, q]) => q.change24h != null)
      .sort((a, b) => Math.abs(b[1].change24h!) - Math.abs(a[1].change24h!));
    const [slug, q] = movers[0] ?? [];
    if (slug && q) out.push({ id: "mover", topic: t.topics.mover, href: `/projects/${slug}`, text: t.mover(names[slug] ?? slug, formatPercent(q.change24h, { digits: 1 })), ...meta(quotes) });
  }
  return out;
}
