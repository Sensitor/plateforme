import type { SeriesPoint } from "@/lib/market/types";

/**
 * Pure calculations behind the Strategies page and the investing lessons.
 * Inputs are real price series (weekly closes); nothing here forecasts a
 * price. Every result describes what the data shows, not what to do.
 */

const DAY = 86_400_000;

/** Simple moving average over `window` points, aligned on the last point of each window. */
export function movingAverageSeries(points: SeriesPoint[], window: number): SeriesPoint[] {
  if (window <= 0 || points.length < window) return [];
  const out: SeriesPoint[] = [];
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    sum += points[i].v;
    if (i >= window) sum -= points[i - window].v;
    if (i >= window - 1) out.push({ t: points[i].t, v: sum / window });
  }
  return out;
}

export interface BelowPeriod {
  start: number;
  /** Last week below the average, or null when the period is still running. */
  end: number | null;
  weeks: number;
  /** Deepest close below the average, in percent (negative). */
  deepestPct: number;
}

/** Consecutive runs of closes below the moving average. */
export function belowPeriods(points: SeriesPoint[], ma: SeriesPoint[]): BelowPeriod[] {
  const maAt = new Map(ma.map((p) => [p.t, p.v]));
  const periods: BelowPeriod[] = [];
  let current: BelowPeriod | null = null;
  let lastT = 0;
  for (const p of points) {
    const m = maAt.get(p.t);
    if (m == null) continue;
    const dist = (p.v / m - 1) * 100;
    if (dist < 0) {
      if (!current) current = { start: p.t, end: null, weeks: 0, deepestPct: 0 };
      current.weeks += 1;
      current.deepestPct = Math.min(current.deepestPct, dist);
    } else if (current) {
      periods.push({ ...current, end: lastT });
      current = null;
    }
    lastT = p.t;
  }
  if (current) periods.push(current);
  return periods;
}

export interface WmaSnapshot {
  price: number;
  ma: number;
  distancePct: number;
  below: boolean;
  /** Share of all weeks with an average where the close was below it. */
  shareBelowPct: number;
  weeksWithAverage: number;
  periods: BelowPeriod[];
}

/** Current position against the 200-week (or any) moving average, plus its history. */
export function wmaSnapshot(points: SeriesPoint[], window: number, latestPrice?: number | null): WmaSnapshot | null {
  const ma = movingAverageSeries(points, window);
  if (!ma.length) return null;
  const periods = belowPeriods(points, ma);
  const price = latestPrice ?? points[points.length - 1].v;
  const last = ma[ma.length - 1].v;
  const weeksBelow = periods.reduce((s, p) => s + p.weeks, 0);
  return {
    price,
    ma: last,
    distancePct: (price / last - 1) * 100,
    below: price < last,
    shareBelowPct: (weeksBelow / ma.length) * 100,
    weeksWithAverage: ma.length,
    periods,
  };
}

export type DcaFrequency = "weekly" | "monthly";

export interface DcaPoint {
  t: number;
  invested: number;
  value: number;
  /** Value of the same total, invested in one go at the start (for comparison). */
  lumpSum: number;
}

export interface DcaResult {
  buys: number;
  invested: number;
  units: number;
  value: number;
  /** Average price paid per unit. */
  averageCost: number;
  returnPct: number;
  lumpSumValue: number;
  lumpSumReturnPct: number;
  /** Worst moment for the investor: lowest value compared with the amount invested so far, in percent. */
  worstReturnPct: number;
  worstT: number;
  series: DcaPoint[];
}

/**
 * Buys a fixed amount on a schedule from `startT`, at the weekly close.
 * Monthly buys happen on the first weekly close of each calendar month.
 * Fees, spreads and taxes are ignored: the result is an upper bound, stated as such in the UI.
 */
export function simulateDca(points: SeriesPoint[], opts: { amount: number; startT: number; frequency: DcaFrequency; endPrice?: number | null }): DcaResult | null {
  const pts = points.filter((p) => p.t >= opts.startT && p.v > 0);
  if (pts.length < 2 || opts.amount <= 0) return null;
  let invested = 0;
  let units = 0;
  let buys = 0;
  let lastMonth = "";
  const firstPrice = pts[0].v;
  const raw: { t: number; invested: number; units: number; price: number }[] = [];
  for (const p of pts) {
    const month = new Date(p.t).toISOString().slice(0, 7);
    const buy = opts.frequency === "weekly" || month !== lastMonth;
    if (buy) {
      invested += opts.amount;
      units += opts.amount / p.v;
      buys += 1;
      lastMonth = month;
    }
    raw.push({ t: p.t, invested, units, price: p.v });
  }
  const totalInvested = invested;
  const lumpUnits = totalInvested / firstPrice;
  let worst = Infinity;
  let worstT = raw[0].t;
  const series = raw.map((r) => {
    const value = r.units * r.price;
    const ret = (value / r.invested - 1) * 100;
    if (ret < worst) {
      worst = ret;
      worstT = r.t;
    }
    return { t: r.t, invested: r.invested, value, lumpSum: lumpUnits * r.price };
  });
  const endPrice = opts.endPrice ?? pts[pts.length - 1].v;
  const value = units * endPrice;
  const lumpSumValue = lumpUnits * endPrice;
  return {
    buys,
    invested: totalInvested,
    units,
    value,
    averageCost: totalInvested / units,
    returnPct: (value / totalInvested - 1) * 100,
    lumpSumValue,
    lumpSumReturnPct: (lumpSumValue / totalInvested - 1) * 100,
    worstReturnPct: worst,
    worstT,
    series,
  };
}

export interface CyclePoint {
  day: number;
  /** Price divided by the price on the halving date. */
  multiple: number;
}

export interface HalvingCycle {
  halving: string;
  startPrice: number;
  points: CyclePoint[];
  /** Highest multiple reached in the window, and on which day. */
  peak: CyclePoint;
}

/** Aligns each cycle on its halving date: day 0 is the first close on or after the halving. */
export function halvingCycles(points: SeriesPoint[], halvings: string[], horizonDays: number): HalvingCycle[] {
  const out: HalvingCycle[] = [];
  for (const h of halvings) {
    const t0 = Date.parse(h);
    const startIdx = points.findIndex((p) => p.t >= t0);
    if (startIdx < 0 || points[startIdx].t - t0 > 14 * DAY) continue;
    const start = points[startIdx];
    const cyclePoints: CyclePoint[] = [];
    for (let i = startIdx; i < points.length; i++) {
      const day = Math.round((points[i].t - t0) / DAY);
      if (day > horizonDays) break;
      cyclePoints.push({ day, multiple: points[i].v / start.v });
    }
    if (cyclePoints.length < 2) continue;
    const peak = cyclePoints.reduce((a, b) => (b.multiple > a.multiple ? b : a));
    out.push({ halving: h, startPrice: start.v, points: cyclePoints, peak });
  }
  return out;
}
