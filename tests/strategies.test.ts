import { describe, expect, it } from "vitest";
import { belowPeriods, halvingCycles, movingAverageSeries, simulateDca, wmaSnapshot } from "@/lib/strategies/calc";

const WEEK = 7 * 86_400_000;
const T0 = Date.UTC(2020, 0, 6);
const weekly = (values: number[]) => values.map((v, i) => ({ t: T0 + i * WEEK, v }));

describe("moving averages", () => {
  it("averages the last window of points, aligned on the window's last point", () => {
    const ma = movingAverageSeries(weekly([1, 2, 3, 4, 5]), 3);
    expect(ma.map((p) => p.v)).toEqual([2, 3, 4]);
    expect(ma[0].t).toBe(T0 + 2 * WEEK);
    expect(movingAverageSeries(weekly([1, 2]), 3)).toEqual([]);
  });

  it("finds runs below the average, with their depth, and an ongoing run", () => {
    const pts = weekly([10, 10, 10, 10, 7, 6, 12, 12, 5]);
    const ma = movingAverageSeries(pts, 4);
    const periods = belowPeriods(pts, ma);
    expect(periods).toHaveLength(2);
    expect(periods[0]).toMatchObject({ start: T0 + 4 * WEEK, end: T0 + 5 * WEEK, weeks: 2 });
    expect(periods[0].deepestPct).toBeCloseTo((6 / 8.25 - 1) * 100, 5);
    expect(periods[1]).toMatchObject({ start: T0 + 8 * WEEK, end: null, weeks: 1 });
  });

  it("summarises the current position and the share of weeks spent below", () => {
    const pts = weekly([10, 10, 10, 10, 7, 6, 12, 12, 5]);
    const s = wmaSnapshot(pts, 4, 4.5)!;
    expect(s.price).toBe(4.5);
    expect(s.below).toBe(true);
    expect(s.distancePct).toBeCloseTo((4.5 / s.ma - 1) * 100, 8);
    expect(s.weeksWithAverage).toBe(6);
    expect(s.shareBelowPct).toBeCloseTo((3 / 6) * 100, 8);
    expect(wmaSnapshot(weekly([1, 2]), 4)).toBeNull();
  });
});

describe("dollar-cost averaging", () => {
  it("buys a fixed amount at each close and tracks invested, value and average cost", () => {
    const r = simulateDca(weekly([100, 50, 100]), { amount: 100, startT: T0, frequency: "weekly" })!;
    expect(r.buys).toBe(3);
    expect(r.invested).toBe(300);
    expect(r.units).toBeCloseTo(1 + 2 + 1, 10);
    expect(r.value).toBeCloseTo(400, 10);
    expect(r.averageCost).toBeCloseTo(75, 10);
    expect(r.returnPct).toBeCloseTo((400 / 300 - 1) * 100, 10);
    // Same total in one go at the start: 3 units, worth 300 at the end.
    expect(r.lumpSumValue).toBeCloseTo(300, 10);
    // Worst moment: after the second buy, 150 held for 200 invested.
    expect(r.worstReturnPct).toBeCloseTo((150 / 200 - 1) * 100, 10);
    expect(r.worstT).toBe(T0 + WEEK);
    expect(r.series.map((p) => p.invested)).toEqual([100, 200, 300]);
  });

  it("buys once per calendar month on the monthly schedule and starts at the chosen date", () => {
    const pts = weekly(Array.from({ length: 13 }, () => 10));
    const r = simulateDca(pts, { amount: 50, startT: T0 + WEEK, frequency: "monthly" })!;
    const months = new Set(pts.filter((p) => p.t >= T0 + WEEK).map((p) => new Date(p.t).toISOString().slice(0, 7)));
    expect(r.buys).toBe(months.size);
    expect(r.series[0].t).toBe(T0 + WEEK);
    expect(simulateDca(pts, { amount: 0, startT: T0, frequency: "weekly" })).toBeNull();
  });

  it("values the position at the latest price when one is given", () => {
    const r = simulateDca(weekly([100, 100]), { amount: 100, startT: T0, frequency: "weekly", endPrice: 150 })!;
    expect(r.value).toBeCloseTo(300, 10);
  });
});

describe("halving cycles", () => {
  it("aligns each cycle on its halving date and finds its peak", () => {
    const pts = weekly([10, 20, 40, 30, 60, 90, 45]);
    const halving = new Date(T0 + 2 * WEEK).toISOString().slice(0, 10);
    const [c] = halvingCycles(pts, [halving], 28);
    expect(c.startPrice).toBe(40);
    expect(c.points[0]).toEqual({ day: 0, multiple: 1 });
    expect(c.points.map((p) => p.day)).toEqual([0, 7, 14, 21, 28]);
    expect(c.peak).toEqual({ day: 21, multiple: 90 / 40 });
  });

  it("skips halvings outside the data", () => {
    expect(halvingCycles(weekly([1, 2, 3]), ["2010-01-01", "2030-01-01"], 100)).toEqual([]);
  });
});
