import type { SeriesPoint } from "./types";

/** Keep at most `target` points, always preserving the last observation. */
export function downsampleSeries(series: SeriesPoint[], target: number): SeriesPoint[] {
  if (series.length <= target) return series;
  const step = series.length / target;
  const out: SeriesPoint[] = [];
  for (let i = 0; i < target; i++) out.push(series[Math.floor(i * step)]);
  const last = series[series.length - 1];
  if (out[out.length - 1] !== last) out.push(last);
  return out;
}

/** Simple moving average of the last `window` values, or null if not enough data. */
export function movingAverage(values: number[], window: number): number | null {
  if (values.length < window || window <= 0) return null;
  let sum = 0;
  for (let i = values.length - window; i < values.length; i++) sum += values[i];
  return sum / window;
}

/** % change between the last point and the point closest to `days` earlier. */
export function changeOverWindow(series: SeriesPoint[], days: number): number | null {
  if (series.length < 2) return null;
  const last = series[series.length - 1];
  const target = last.t - days * 86400_000;
  let ref: SeriesPoint | null = null;
  for (const p of series) {
    if (p.t <= target) ref = p;
    else break;
  }
  if (!ref || ref.v === 0) return null;
  return (last.v / ref.v - 1) * 100;
}

/** % change between first and last value of a series. */
export function seriesChange(series: SeriesPoint[]): number | null {
  if (series.length < 2 || series[0].v === 0) return null;
  return (series[series.length - 1].v / series[0].v - 1) * 100;
}

/** Drawdown from the running peak, in percent (0 at a new high, negative below it). */
export function drawdownSeries(series: SeriesPoint[]): SeriesPoint[] {
  const out: SeriesPoint[] = [];
  let peak = -Infinity;
  for (const p of series) {
    peak = Math.max(peak, p.v);
    out.push({ t: p.t, v: peak > 0 ? (p.v / peak - 1) * 100 : 0 });
  }
  return out;
}
