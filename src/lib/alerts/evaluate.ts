import { formatPercent, formatPrice } from "@/lib/format";
import type { AlertKind } from "./types";

export interface AlertQuote {
  price: number | null;
  change24h: number | null;
}

export interface Evaluation {
  triggered: boolean;
  /** The observed value that triggered (price in USD, or 24h change in %). */
  value: number | null;
}

/**
 * Pure alert rule. Price alerts compare the latest price with the threshold;
 * move alerts compare the absolute 24h change (in %) with the threshold.
 * Missing data never triggers.
 */
export function evaluateAlert(kind: AlertKind, threshold: number, quote: AlertQuote | null | undefined): Evaluation {
  if (!quote || !(threshold > 0)) return { triggered: false, value: null };
  if (kind === "move_24h") {
    const c = quote.change24h;
    if (c == null || !Number.isFinite(c)) return { triggered: false, value: null };
    return { triggered: Math.abs(c) >= threshold, value: c };
  }
  const p = quote.price;
  if (p == null || !Number.isFinite(p)) return { triggered: false, value: null };
  return { triggered: kind === "price_above" ? p >= threshold : p <= threshold, value: p };
}

export type Locale = "en" | "fr";

/** Human description of an alert rule, e.g. "ETH above $3,000.00" / "ETH au-dessus de $3,000.00". */
export function describeRule(ticker: string, kind: AlertKind, threshold: number, locale: Locale = "en"): string {
  const pct = formatPercent(threshold, { signed: false, digits: threshold % 1 ? 1 : 0 });
  if (locale === "fr") {
    if (kind === "move_24h") return `${ticker} varie de plus de ${pct} en 24 h`;
    return `${ticker} ${kind === "price_above" ? "au-dessus de" : "en dessous de"} ${formatPrice(threshold)}`;
  }
  if (kind === "move_24h") return `${ticker} moves more than ${pct} in 24h`;
  return `${ticker} ${kind === "price_above" ? "above" : "below"} ${formatPrice(threshold)}`;
}

/** Notification copy for a triggered alert. Informative only, never a recommendation. */
export function triggeredCopy(
  name: string,
  ticker: string,
  kind: AlertKind,
  threshold: number,
  value: number,
  source: string,
  asOf: string | null,
  locale: Locale = "en",
) {
  const when = asOf ? new Date(asOf).toISOString().slice(0, 16).replace("T", " ") + " UTC" : "n/a";
  const pct = (v: number, signed = true) => formatPercent(v, { signed, digits: Math.abs(v) % 1 ? 1 : 0 });
  const fr = locale === "fr";
  if (kind === "move_24h") {
    return {
      title: fr ? `${ticker} a varié de ${formatPercent(value)} en 24 h` : `${ticker} moved ${formatPercent(value)} in 24h`,
      body: fr
        ? `${name} a varié de ${formatPercent(value)} sur 24 heures, au-delà de votre seuil de ${pct(threshold, false)}. Source : ${source}, ${when}.`
        : `${name} changed ${formatPercent(value)} over 24 hours, beyond your ${pct(threshold, false)} threshold. Source: ${source}, ${when}.`,
    };
  }
  const above = kind === "price_above";
  if (fr) {
    const dir = above ? "est passé au-dessus de" : "est passé sous";
    return {
      title: `${ticker} ${dir} ${formatPrice(threshold)}`,
      body: `${name} s'échangeait à ${formatPrice(value)}, ce qui franchit votre seuil de ${formatPrice(threshold)}. Source : ${source}, ${when}.`,
    };
  }
  const dir = above ? "rose above" : "fell below";
  return {
    title: `${ticker} ${dir} ${formatPrice(threshold)}`,
    body: `${name} traded at ${formatPrice(value)}, which ${dir} your ${formatPrice(threshold)} threshold. Source: ${source}, ${when}.`,
  };
}
