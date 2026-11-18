/**
 * Portfolio engine: pure functions, no I/O. Positions are derived from a
 * transaction ledger with the weighted average cost method (the method most
 * retail tax regimes and trackers use). Prices always come from live market
 * data passed in by the caller; nothing here invents a price.
 */

export const STABLE_ASSET = "usd";

export type Side = "buy" | "sell";

export interface Transaction {
  id: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  /** Project slug, or "usd" for stablecoins / cash held on-chain */
  asset: string;
  side: Side;
  quantity: number;
  /** Price per unit in USD */
  price: number;
  /** Fees in USD */
  fee: number;
}

export interface Position {
  asset: string;
  quantity: number;
  costBasis: number;
  avgCost: number;
  realizedPnl: number;
  invested: number;
  firstDate: string | null;
}

export interface LedgerIssue {
  id: string;
  message: string;
}

/** Sorts by date then insertion order, replays the ledger and returns positions. */
export function computePositions(transactions: Transaction[]): { positions: Map<string, Position>; issues: LedgerIssue[] } {
  const positions = new Map<string, Position>();
  const issues: LedgerIssue[] = [];
  const sorted = [...transactions].map((t, i) => ({ t, i })).sort((a, b) => a.t.date.localeCompare(b.t.date) || a.i - b.i);
  for (const { t } of sorted) {
    const p = positions.get(t.asset) ?? { asset: t.asset, quantity: 0, costBasis: 0, avgCost: 0, realizedPnl: 0, invested: 0, firstDate: null };
    if (t.side === "buy") {
      p.quantity += t.quantity;
      p.costBasis += t.quantity * t.price + t.fee;
      p.invested += t.quantity * t.price + t.fee;
      p.firstDate = p.firstDate ?? t.date;
    } else {
      const qty = Math.min(t.quantity, p.quantity);
      if (t.quantity > p.quantity + 1e-12) {
        issues.push({ id: t.id, message: `Sell of ${t.quantity} exceeds the ${p.quantity} held on ${t.date}; only ${qty} counted.` });
      }
      const avg = p.quantity > 0 ? p.costBasis / p.quantity : 0;
      p.realizedPnl += qty * t.price - t.fee - qty * avg;
      p.costBasis -= qty * avg;
      p.quantity -= qty;
      if (p.quantity < 1e-12) {
        p.quantity = 0;
        p.costBasis = 0;
      }
    }
    p.avgCost = p.quantity > 0 ? p.costBasis / p.quantity : 0;
    positions.set(t.asset, p);
  }
  return { positions, issues };
}

/** Quantity held of each asset at the end of a given day. */
export function holdingsAt(transactions: Transaction[], day: string): Map<string, number> {
  const out = new Map<string, number>();
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  for (const t of sorted) {
    if (t.date > day) break;
    const q = out.get(t.asset) ?? 0;
    out.set(t.asset, Math.max(0, q + (t.side === "buy" ? t.quantity : -t.quantity)));
  }
  return out;
}

/** Herfindahl-Hirschman index of weights (0..1). 1 = everything in one asset. */
export function hhi(weights: number[]): number {
  const total = weights.reduce((a, b) => a + b, 0);
  if (!total) return 0;
  return weights.reduce((s, w) => s + (w / total) ** 2, 0);
}

export type ConcentrationLevel = "diversified" | "moderate" | "concentrated";

export function concentrationLevel(weights: number[]): ConcentrationLevel {
  const h = hhi(weights);
  if (h >= 0.4) return "concentrated";
  if (h >= 0.2) return "moderate";
  return "diversified";
}

/** Pearson correlation of daily log returns, aligned by UTC day. Null when fewer than 20 shared days. */
export function returnCorrelation(a: { t: number; v: number }[], b: { t: number; v: number }[]): number | null {
  const day = (t: number) => new Date(t).toISOString().slice(0, 10);
  const mapB = new Map(b.map((p) => [day(p.t), p.v]));
  const pairs: [number, number][] = [];
  for (const p of a) {
    const v = mapB.get(day(p.t));
    if (v != null && v > 0 && p.v > 0) pairs.push([p.v, v]);
  }
  const ra: number[] = [];
  const rb: number[] = [];
  for (let i = 1; i < pairs.length; i++) {
    ra.push(Math.log(pairs[i][0] / pairs[i - 1][0]));
    rb.push(Math.log(pairs[i][1] / pairs[i - 1][1]));
  }
  if (ra.length < 20) return null;
  const mean = (x: number[]) => x.reduce((s, v) => s + v, 0) / x.length;
  const ma = mean(ra);
  const mb = mean(rb);
  let cov = 0;
  let va = 0;
  let vb = 0;
  for (let i = 0; i < ra.length; i++) {
    cov += (ra[i] - ma) * (rb[i] - mb);
    va += (ra[i] - ma) ** 2;
    vb += (rb[i] - mb) ** 2;
  }
  if (!va || !vb) return null;
  return cov / Math.sqrt(va * vb);
}

/* ------------------------------------------------------------------ */
/* CSV import / export                                                */
/* ------------------------------------------------------------------ */

export const CSV_HEADER = "date,asset,side,quantity,price,fee";

export interface CsvResult {
  rows: Omit<Transaction, "id">[];
  errors: { line: number; message: string }[];
}

/**
 * Parses a transactions CSV. Accepts comma or semicolon separators (French
 * spreadsheet exports use semicolons and decimal commas), headers in any order
 * and case, and assets given as a ticker (ETH) or a slug (ethereum).
 */
export function parseCsv(text: string, resolveAsset: (raw: string) => string | null): CsvResult {
  const lines = text.replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim().length);
  const errors: CsvResult["errors"] = [];
  const rows: CsvResult["rows"] = [];
  if (!lines.length) return { rows, errors: [{ line: 0, message: "The file is empty." }] };
  const sep = lines[0].includes(";") && !lines[0].includes(",") ? ";" : ",";
  const header = lines[0].split(sep).map((h) => h.trim().toLowerCase());
  const col = (name: string, alts: string[] = []) => [name, ...alts].map((n) => header.indexOf(n)).find((i) => i >= 0) ?? -1;
  const idx = {
    date: col("date"),
    asset: col("asset", ["ticker", "symbol", "coin"]),
    side: col("side", ["type", "action"]),
    quantity: col("quantity", ["qty", "amount"]),
    price: col("price", ["price_usd", "unit_price"]),
    fee: col("fee", ["fees", "fee_usd"]),
  };
  const missing = (["date", "asset", "side", "quantity", "price"] as const).filter((k) => idx[k] < 0);
  if (missing.length) return { rows, errors: [{ line: 1, message: `Missing column(s): ${missing.join(", ")}. Expected header: ${CSV_HEADER}` }] };
  const num = (raw: string | undefined) => {
    if (raw == null || raw.trim() === "") return NaN;
    const cleaned = sep === ";" ? raw.replace(/\s/g, "").replace(",", ".") : raw.replace(/\s/g, "");
    return Number(cleaned);
  };
  lines.slice(1).forEach((line, i) => {
    const lineNo = i + 2;
    const cells = line.split(sep).map((c) => c.trim());
    const date = cells[idx.date];
    const asset = resolveAsset(cells[idx.asset] ?? "");
    const sideRaw = (cells[idx.side] ?? "").toLowerCase();
    const side: Side | null = ["buy", "achat", "b"].includes(sideRaw) ? "buy" : ["sell", "vente", "s"].includes(sideRaw) ? "sell" : null;
    const quantity = num(cells[idx.quantity]);
    const price = num(cells[idx.price]);
    const fee = idx.fee >= 0 ? num(cells[idx.fee]) : 0;
    const problems: string[] = [];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? "") || Number.isNaN(Date.parse(date))) problems.push("date must be YYYY-MM-DD");
    if (!asset) problems.push(`unknown asset "${cells[idx.asset] ?? ""}"`);
    if (!side) problems.push(`side must be buy or sell`);
    if (!(quantity > 0)) problems.push("quantity must be positive");
    if (!(price >= 0)) problems.push("price must be a number");
    if (Number.isNaN(fee) || fee < 0) problems.push("fee must be zero or positive");
    if (problems.length) errors.push({ line: lineNo, message: problems.join("; ") });
    else rows.push({ date, asset: asset!, side: side!, quantity, price, fee: Number.isNaN(fee) ? 0 : fee });
  });
  return { rows, errors };
}

export function toCsv(transactions: Transaction[], label: (asset: string) => string): string {
  const lines = [...transactions].sort((a, b) => a.date.localeCompare(b.date)).map((t) => [t.date, label(t.asset), t.side, t.quantity, t.price, t.fee].join(","));
  return [CSV_HEADER, ...lines].join("\n") + "\n";
}
