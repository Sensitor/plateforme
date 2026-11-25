"use client";

import { useId, useMemo, useState } from "react";
import { useT } from "@/i18n/client";
import { tint } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { LegendItem, PLOT_W, PlotFrame, linearScale, linearTicks, pathOf, rangeTicks, type Tick } from "@/components/strategies/plot";

/**
 * Interactive visuals of the "Learn to invest" track. Every input is
 * illustrative and labelled as such: these teach mechanisms, they are not
 * market data and not forecasts. Amounts are currency-neutral.
 */

const GREY = "#9299A8";
const RED = "#E36B75";
const BLUE = "#7896FF";
const H = 300;

const nf = (v: number, max = 0) => new Intl.NumberFormat("en-US", { maximumFractionDigits: max }).format(v);
const pct = (v: number, digits = 1, signed = false) => `${signed && v > 0 ? "+" : ""}${nf(v, digits)}%`;
const compact = (v: number) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v);

function Slider({ label, value, min, max, step, onChange, format, color }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string; color: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex items-center justify-between gap-3 text-[12.5px] text-muted">
        <span>{label}</span>
        <span className="num text-[13.5px] text-fg">{format(value)}</span>
      </label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1.5 w-full" style={{ accentColor: color }} />
    </div>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11.5px] leading-snug text-muted">{label}</dt>
      <dd className={cn("num mt-1 text-[18px] text-fg", tone)}>{value}</dd>
      {sub ? <dd className="text-[11.5px] leading-snug text-subtle">{sub}</dd> : null}
    </div>
  );
}

function Shell({ children, note }: { children: React.ReactNode; note: string }) {
  return (
    <div className="rounded-xl border border-line p-4 md:p-5">
      {children}
      <p className="mt-3 text-[11.5px] leading-relaxed text-subtle">{note}</p>
    </div>
  );
}

function Stats({ children, cols = 4 }: { children: React.ReactNode; cols?: 3 | 4 }) {
  return <dl className={cn("mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-4", cols === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>{children}</dl>;
}

function yTicksFor(values: number[], y: (v: number) => number, label: (v: number) => string): Tick[] {
  return values.map((v) => ({ pct: (y(v) / H) * 100, label: label(v) }));
}

function yearTicks(years: number, x: (yr: number) => number, label: (n: number) => string): Tick[] {
  const step = years <= 12 ? 2 : years <= 25 ? 5 : 10;
  const out: number[] = [];
  for (let yr = 0; yr <= years; yr += step) out.push(yr);
  if (out[out.length - 1] !== years && years - out[out.length - 1] >= step / 2) out.push(years);
  return out.map((yr) => ({ pct: (x(yr) / PLOT_W) * 100, label: yr === 0 ? "0" : label(yr) }));
}

/** Area under a path down to the bottom of the plot. */
const area = (path: string) => `${path}L${PLOT_W},${H}L0,${H}Z`;

/* ------------------------------------------------------------------ */

/** Compound growth of a starting amount plus monthly contributions. */
export function CompoundSimulator({ color }: { color: string }) {
  const T = useT().investing;
  const t = T.compound;
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(30);
  const series = useMemo(() => {
    const out = [{ year: 0, contributed: initial, value: initial }];
    let v = initial;
    let contributed = initial;
    for (let m = 1; m <= years * 12; m++) {
      v = v * (1 + rate / 100 / 12) + monthly;
      contributed += monthly;
      if (m % 12 === 0) out.push({ year: m / 12, contributed, value: v });
    }
    return out;
  }, [initial, monthly, rate, years]);
  const last = series[series.length - 1];
  const growth = last.value - last.contributed;
  const ticks = linearTicks(Math.max(last.value, 1) * 1.04);
  const y = linearScale(0, ticks[ticks.length - 1], H);
  const x = (yr: number) => (yr / years) * PLOT_W;
  const value = pathOf(series.map((p) => [x(p.year), y(p.value)]));
  const contributed = pathOf(series.map((p) => [x(p.year), y(p.contributed)]));

  return (
    <Shell note={`${t.note} ${T.common.anyCurrency}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label={t.initial} value={initial} min={0} max={50000} step={500} onChange={setInitial} format={(v) => nf(v)} color={color} />
        <Slider label={t.monthly} value={monthly} min={0} max={2000} step={25} onChange={setMonthly} format={(v) => nf(v)} color={color} />
        <Slider label={t.rate} value={rate} min={0} max={12} step={0.5} onChange={setRate} format={(v) => pct(v)} color={color} />
        <Slider label={t.years} value={years} min={1} max={50} step={1} onChange={setYears} format={(v) => T.common.years(v)} color={color} />
      </div>
      <Stats>
        <Stat label={t.final} value={nf(last.value)} />
        <Stat label={t.contributed} value={nf(last.contributed)} />
        <Stat label={t.growth} value={nf(growth)} sub={t.growthShare(pct(last.value > 0 ? (growth / last.value) * 100 : 0, 0))} tone="text-positive" />
        <Stat label={t.doubling} value={rate > 0 ? t.doublingValue(nf(72 / rate, 1)) : T.common.na} />
      </Stats>
      <div className="mt-5">
        <PlotFrame height={240} viewHeight={H} yTicks={yTicksFor(ticks, y, compact)} xTicks={yearTicks(years, x, T.common.yearsShort)} ariaLabel={t.aria}>
          <path d={area(value)} fill={tint(color, 0.24)} />
          <path d={area(contributed)} fill={tint(GREY, 0.42)} />
          <path d={value} fill="none" stroke={color} strokeWidth={2.25} vectorEffect="non-scaling-stroke" />
          <path d={contributed} fill="none" stroke={GREY} strokeWidth={1.5} strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
        </PlotFrame>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
          <LegendItem color={tint(GREY, 0.7)} label={t.legend.contributed} kind="block" />
          <LegendItem color={color} label={t.legend.growth} kind="block" />
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

const DRAG_YEARS = 20;

/** Two paths with the same simple average: steady versus alternating swings. */
export function VolatilityDragChart({ color }: { color: string }) {
  const T = useT().investing;
  const t = T.drag;
  const [mean, setMean] = useState(8);
  const [swing, setSwing] = useState(25);
  const up = mean + swing;
  const down = mean - swing;
  const steady = Array.from({ length: DRAG_YEARS + 1 }, (_, i) => 100 * (1 + mean / 100) ** i);
  const volatile = [100];
  for (let i = 1; i <= DRAG_YEARS; i++) volatile.push(volatile[i - 1] * (1 + (i % 2 ? up : down) / 100));
  const geo = (Math.sqrt((1 + up / 100) * (1 + down / 100)) - 1) * 100;
  const ticks = linearTicks(Math.max(...steady, ...volatile) * 1.04);
  const y = linearScale(0, ticks[ticks.length - 1], H);
  const x = (i: number) => (i / DRAG_YEARS) * PLOT_W;
  const finalSteady = steady[DRAG_YEARS] / 100;
  const finalVolatile = volatile[DRAG_YEARS] / 100;

  return (
    <Shell note={t.note}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label={t.mean} value={mean} min={0} max={15} step={1} onChange={setMean} format={(v) => pct(v, 0, true)} color={color} />
        <Slider label={t.swing} value={swing} min={0} max={50} step={1} onChange={setSwing} format={(v) => t.swingValue(pct(v, 0))} color={color} />
      </div>
      <Stats>
        <Stat label={t.finalSteady} value={t.times(nf(finalSteady, 2))} />
        <Stat label={t.finalVolatile} value={t.times(nf(finalVolatile, 2))} tone={finalVolatile < 1 ? "text-negative" : undefined} />
        <Stat label={t.compound} value={pct(geo, 1, true)} sub={t.vsAverage(pct(mean, 0, true))} />
        <Stat label={t.dragLabel} value={t.dragValue(pct(mean - geo, 1))} tone={mean - geo > 0.05 ? "text-negative" : undefined} />
      </Stats>
      <div className="mt-5">
        <PlotFrame height={240} viewHeight={H} yTicks={yTicksFor(ticks, y, (v) => nf(v))} xTicks={yearTicks(DRAG_YEARS, x, T.common.yearsShort)} ariaLabel={t.aria}>
          <line x1={0} x2={PLOT_W} y1={y(100)} y2={y(100)} stroke={GREY} strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
          <path d={pathOf(volatile.map((v, i) => [x(i), y(v)]))} fill="none" stroke={BLUE} strokeWidth={1.75} vectorEffect="non-scaling-stroke" />
          <path d={pathOf(steady.map((v, i) => [x(i), y(v)]))} fill="none" stroke={color} strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
        </PlotFrame>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
          <LegendItem color={color} label={t.legend.steady(pct(mean, 0, true))} />
          <LegendItem color={BLUE} label={t.legend.volatile(pct(up, 0, true), pct(down, 0, true))} />
          <LegendItem color={GREY} label={t.legend.start} kind="dashed" />
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

/** Standard normal cumulative distribution (Abramowitz and Stegun 7.1.26). */
function normalCdf(z: number): number {
  const s = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const k = 1 / (1 + 0.3275911 * x);
  const erf = 1 - ((((1.061405429 * k - 1.453152027) * k + 1.421413741) * k - 0.284496736) * k + 0.254829592) * k * Math.exp(-x * x);
  return 0.5 * (1 + s * erf);
}

const MAX_HORIZON = 30;
const Z90 = 1.645;

/** Range of average yearly returns by holding period, under a simple log-normal model. */
export function HorizonFunnel({ color }: { color: string }) {
  const T = useT().investing;
  const t = T.horizon;
  const [median, setMedian] = useState(6);
  const [vol, setVol] = useState(16);
  const [hold, setHold] = useState(10);
  const g = Math.log(1 + median / 100);
  const s = vol / 100;
  const band = (n: number) => ({ lo: (Math.exp(g - (Z90 * s) / Math.sqrt(n)) - 1) * 100, hi: (Math.exp(g + (Z90 * s) / Math.sqrt(n)) - 1) * 100 });
  const pLoss = (n: number) => normalCdf(-g / (s / Math.sqrt(n))) * 100;
  const years = Array.from({ length: MAX_HORIZON }, (_, i) => i + 1);
  const first = band(1);
  const ticks = rangeTicks(Math.min(first.lo, -5), Math.min(first.hi, 150));
  const y = linearScale(ticks[0], ticks[ticks.length - 1], H);
  const x = (n: number) => ((n - 1) / (MAX_HORIZON - 1)) * PLOT_W;
  const upper = years.map((n) => [x(n), y(band(n).hi)] as [number, number]);
  const lower = years.map((n) => [x(n), y(band(n).lo)] as [number, number]).reverse();
  const at = band(hold);
  const xTicks = [1, 5, 10, 15, 20, 25, 30].map((n) => ({ pct: (x(n) / PLOT_W) * 100, label: T.common.yearsShort(n) }));
  const presets: [keyof typeof t.presets, number][] = [
    ["low", 6],
    ["medium", 16],
    ["high", 60],
  ];

  return (
    <Shell note={t.note}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label={t.median} value={median} min={0} max={12} step={0.5} onChange={setMedian} format={(v) => pct(v, 1, true)} color={color} />
        <div>
          <Slider label={t.vol} value={vol} min={2} max={80} step={1} onChange={setVol} format={(v) => pct(v, 0)} color={color} />
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {presets.map(([key, v]) => (
              <button key={key} type="button" onClick={() => setVol(v)} className={cn("rounded-md border px-2 py-0.5 text-[11.5px]", vol === v ? "border-accent/50 text-fg" : "border-line text-muted hover:text-fg-2")}>
                {t.presets[key]} <span className="num">{v}%</span>
              </button>
            ))}
          </div>
        </div>
        <Slider label={t.hold} value={hold} min={1} max={MAX_HORIZON} step={1} onChange={setHold} format={(v) => T.common.years(v)} color={color} />
      </div>
      <Stats cols={3}>
        <Stat label={t.range} value={t.rangeValue(pct(at.lo, 1, true), pct(at.hi, 1, true))} sub={t.rangeSub(T.common.years(hold))} />
        <Stat label={t.medianStat} value={pct(median, 1, true)} />
        <Stat label={t.loss} value={pct(pLoss(hold), pLoss(hold) < 1 ? 1 : 0)} tone={pLoss(hold) >= 10 ? "text-negative" : undefined} sub={t.lossFirst(pct(pLoss(1), 0))} />
      </Stats>
      <div className="mt-5">
        <PlotFrame
          height={240}
          viewHeight={H}
          yTicks={yTicksFor(ticks, y, (v) => pct(v, 0, true))}
          xTicks={xTicks}
          ariaLabel={t.aria}
          overlay={<span className="absolute inset-y-0 w-px bg-line-strong" style={{ left: `${(x(hold) / PLOT_W) * 100}%` }} aria-hidden />}
        >
          <path d={`${pathOf(upper)}${pathOf(lower).replace(/^M/, "L")}Z`} fill={tint(color, 0.26)} />
          <line x1={0} x2={PLOT_W} y1={y(0)} y2={y(0)} stroke={RED} strokeOpacity={0.7} strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
          <line x1={0} x2={PLOT_W} y1={y(median)} y2={y(median)} stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </PlotFrame>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
          <LegendItem color={tint(color, 0.5)} label={t.legend.band} kind="block" />
          <LegendItem color={color} label={t.legend.median} />
          <LegendItem color={RED} label={t.legend.zero} kind="dashed" />
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

function WaterfallBar({ label, from, to, scale, color, strong }: { label: string; from: number; to: number; scale: { lo: number; hi: number }; color: string; strong?: boolean }) {
  const pos = (v: number) => ((v - scale.lo) / (scale.hi - scale.lo)) * 100;
  const v = Math.abs(to - from) < 0.005 ? 0 : to - from;
  const left = pos(Math.min(from, to));
  const width = Math.max(0.6, Math.abs(pos(to) - pos(from)));
  return (
    <div className="grid grid-cols-[minmax(0,130px)_minmax(0,1fr)_64px] items-center gap-3 sm:grid-cols-[170px_minmax(0,1fr)_72px]">
      <span className={cn("text-[12.5px]", strong ? "font-medium text-fg" : "text-fg-2")}>{label}</span>
      <div className="relative h-6 rounded bg-surface-3/60">
        <span className="absolute inset-y-0 w-px bg-line-strong" style={{ left: `${pos(0)}%` }} aria-hidden />
        <span className="absolute inset-y-1 rounded-sm" style={{ left: `${left}%`, width: `${width}%`, backgroundColor: v < 0 ? RED : strong ? color : tint(color, 0.6) }} aria-hidden />
      </div>
      <span className={cn("num text-right text-[13px]", v < 0 ? "text-negative" : "text-fg")}>{pct(v, 1, true)}</span>
    </div>
  );
}

/** A stock's yearly return built from dividends, profit growth and the change in valuation. */
export function StockReturnBuilder({ color }: { color: string }) {
  const T = useT().investing;
  const t = T.stock;
  const [dividend, setDividend] = useState(2);
  const [growth, setGrowth] = useState(6);
  const [peStart, setPeStart] = useState(20);
  const [peEnd, setPeEnd] = useState(20);
  const [years, setYears] = useState(10);
  const multipleChange = ((peEnd / peStart) ** (1 / years) - 1) * 100;
  const priceReturn = ((1 + growth / 100) * (1 + multipleChange / 100) - 1) * 100;
  const valuation = priceReturn - growth;
  const total = dividend + priceReturn;
  const endValue = 100 * (1 + total / 100) ** years;
  const parts: { label: string; value: number }[] = [
    { label: t.parts.dividend, value: dividend },
    { label: t.parts.growth, value: growth },
    { label: t.parts.valuation, value: valuation },
  ];
  let run = 0;
  const steps = parts.map((p) => {
    const from = run;
    run += p.value;
    return { ...p, from, to: run };
  });
  const lo = Math.min(0, ...steps.map((s) => Math.min(s.from, s.to)));
  const hi = Math.max(0.5, ...steps.map((s) => Math.max(s.from, s.to)));
  const scale = { lo, hi };

  return (
    <Shell note={t.note}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label={t.dividend} value={dividend} min={0} max={6} step={0.5} onChange={setDividend} format={(v) => pct(v)} color={color} />
        <Slider label={t.growth} value={growth} min={-5} max={15} step={0.5} onChange={setGrowth} format={(v) => pct(v, 1, true)} color={color} />
        <Slider label={t.peStart} value={peStart} min={5} max={50} step={1} onChange={setPeStart} format={(v) => `${v}x`} color={color} />
        <Slider label={t.peEnd} value={peEnd} min={5} max={50} step={1} onChange={setPeEnd} format={(v) => `${v}x`} color={color} />
        <Slider label={t.years} value={years} min={1} max={30} step={1} onChange={setYears} format={(v) => T.common.years(v)} color={color} />
      </div>
      <div className="mt-5 space-y-2 border-t border-line pt-4" role="img" aria-label={t.aria}>
        {steps.map((s) => (
          <WaterfallBar key={s.label} label={s.label} from={s.from} to={s.to} scale={scale} color={color} />
        ))}
        <div className="border-t border-dashed border-line pt-2">
          <WaterfallBar label={t.parts.total} from={0} to={total} scale={scale} color={color} strong />
        </div>
      </div>
      <p className="mt-4 text-[13.5px] text-fg-2">{t.result(years, nf(endValue))}</p>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

function bondPrice(coupon: number, years: number, yieldPct: number): number {
  const y = yieldPct / 100;
  let p = 0;
  for (let k = 1; k <= years; k++) p += coupon / (1 + y) ** k;
  return p + 100 / (1 + y) ** years;
}

function modifiedDuration(coupon: number, years: number, yieldPct: number): number {
  const y = yieldPct / 100;
  let weighted = 0;
  for (let k = 1; k <= years; k++) weighted += (k * (coupon + (k === years ? 100 : 0))) / (1 + y) ** k;
  return weighted / bondPrice(coupon, years, yieldPct) / (1 + y);
}

const SHORT_BOND = 2;
const YIELD_MAX = 10;

/** Price of a fixed-rate bond as market yields move, for its maturity and for a short bond. */
export function BondPriceSimulator({ color }: { color: string }) {
  const T = useT().investing;
  const t = T.bond;
  const [coupon, setCoupon] = useState(3);
  const [maturity, setMaturity] = useState(10);
  const [yld, setYld] = useState(4);
  const price = bondPrice(coupon, maturity, yld);
  const duration = modifiedDuration(coupon, maturity, yld);
  const rise = (bondPrice(coupon, maturity, yld + 1) / price - 1) * 100;
  const grid = Array.from({ length: 41 }, (_, i) => (i / 40) * YIELD_MAX);
  const curve = (n: number) => grid.map((r) => bondPrice(coupon, n, r));
  const main = curve(maturity);
  const short = curve(SHORT_BOND);
  const ticks = rangeTicks(Math.min(...main, ...short, 100) * 0.95, Math.max(...main, ...short, 100) * 1.03);
  const y = linearScale(ticks[0], ticks[ticks.length - 1], H);
  const x = (r: number) => (r / YIELD_MAX) * PLOT_W;
  const state = Math.abs(yld - coupon) < 0.01 ? t.state.par : yld < coupon ? t.state.premium : t.state.discount;

  return (
    <Shell note={t.note}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label={t.coupon} value={coupon} min={0} max={10} step={0.25} onChange={setCoupon} format={(v) => pct(v, 2)} color={color} />
        <Slider label={t.maturity} value={maturity} min={1} max={30} step={1} onChange={setMaturity} format={(v) => T.common.years(v)} color={color} />
        <Slider label={t.yield} value={yld} min={0} max={YIELD_MAX} step={0.25} onChange={setYld} format={(v) => pct(v, 2)} color={color} />
      </div>
      <Stats>
        <Stat label={t.price} value={nf(price, 2)} sub={state} />
        <Stat label={t.duration} value={t.durationValue(nf(duration, 1))} />
        <Stat label={t.rise} value={pct(rise, 1, true)} tone="text-negative" />
        <Stat label={t.fall} value={pct((bondPrice(coupon, maturity, Math.max(0, yld - 1)) / price - 1) * 100, 1, true)} tone="text-positive" />
      </Stats>
      <div className="mt-5">
        <PlotFrame
          height={240}
          viewHeight={H}
          yTicks={yTicksFor(ticks, y, (v) => nf(v))}
          xTicks={[0, 2, 4, 6, 8, 10].map((r) => ({ pct: (x(r) / PLOT_W) * 100, label: `${r}%` }))}
          ariaLabel={t.aria}
          overlay={
            <span
              className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-bg"
              style={{ left: `${(x(yld) / PLOT_W) * 100}%`, top: `${(y(price) / H) * 100}%`, backgroundColor: color }}
              aria-hidden
            />
          }
        >
          <line x1={0} x2={PLOT_W} y1={y(100)} y2={y(100)} stroke={GREY} strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
          {maturity !== SHORT_BOND ? <path d={pathOf(short.map((p, i) => [x(grid[i]), y(p)]))} fill="none" stroke={GREY} strokeWidth={1.75} vectorEffect="non-scaling-stroke" /> : null}
          <path d={pathOf(main.map((p, i) => [x(grid[i]), y(p)]))} fill="none" stroke={color} strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
        </PlotFrame>
        <div className="mt-1 text-right text-[11px] text-subtle">{t.xAxis}</div>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
          <LegendItem color={color} label={t.legend.main(maturity)} />
          {maturity !== SHORT_BOND ? <LegendItem color={GREY} label={t.legend.short(SHORT_BOND)} /> : null}
          <LegendItem color={GREY} label={t.legend.par} kind="dashed" />
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

/** Two funds with the same holdings and different yearly fees. */
export function EtfFeeComparison({ color }: { color: string }) {
  const T = useT().investing;
  const t = T.fees;
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(100);
  const [gross, setGross] = useState(6);
  const [feeA, setFeeA] = useState(0.2);
  const [feeB, setFeeB] = useState(1.8);
  const [years, setYears] = useState(30);
  const series = useMemo(() => {
    const out = [{ year: 0, a: initial, b: initial, contributed: initial }];
    let a = initial;
    let b = initial;
    let contributed = initial;
    for (let m = 1; m <= years * 12; m++) {
      a = a * (1 + (gross - feeA) / 100 / 12) + monthly;
      b = b * (1 + (gross - feeB) / 100 / 12) + monthly;
      contributed += monthly;
      if (m % 12 === 0) out.push({ year: m / 12, a, b, contributed });
    }
    return out;
  }, [initial, monthly, gross, feeA, feeB, years]);
  const last = series[series.length - 1];
  const cheap = Math.max(last.a, last.b);
  const dear = Math.min(last.a, last.b);
  const ticks = linearTicks(Math.max(cheap, 1) * 1.04);
  const y = linearScale(0, ticks[ticks.length - 1], H);
  const x = (yr: number) => (yr / years) * PLOT_W;
  const pa = series.map((p) => [x(p.year), y(p.a)] as [number, number]);
  const pb = series.map((p) => [x(p.year), y(p.b)] as [number, number]);
  const gap = `${pathOf(pa)}${pathOf([...pb].reverse()).replace(/^M/, "L")}Z`;

  return (
    <Shell note={`${t.note} ${T.common.anyCurrency}`}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label={t.initial} value={initial} min={0} max={100000} step={1000} onChange={setInitial} format={(v) => nf(v)} color={color} />
        <Slider label={t.monthly} value={monthly} min={0} max={2000} step={25} onChange={setMonthly} format={(v) => nf(v)} color={color} />
        <Slider label={t.gross} value={gross} min={0} max={10} step={0.5} onChange={setGross} format={(v) => pct(v)} color={color} />
        <Slider label={t.feeA} value={feeA} min={0} max={2.5} step={0.05} onChange={setFeeA} format={(v) => pct(v, 2)} color={color} />
        <Slider label={t.feeB} value={feeB} min={0} max={2.5} step={0.05} onChange={setFeeB} format={(v) => pct(v, 2)} color={BLUE} />
        <Slider label={t.years} value={years} min={1} max={40} step={1} onChange={setYears} format={(v) => T.common.years(v)} color={color} />
      </div>
      <Stats>
        <Stat label={t.fundA(pct(feeA, 2))} value={nf(last.a)} />
        <Stat label={t.fundB(pct(feeB, 2))} value={nf(last.b)} />
        <Stat label={t.cost} value={nf(cheap - dear)} sub={t.costShare(pct(cheap > 0 ? ((cheap - dear) / cheap) * 100 : 0, 0))} tone={cheap - dear > 0 ? "text-negative" : undefined} />
        <Stat label={t.contributed} value={nf(last.contributed)} />
      </Stats>
      <div className="mt-5">
        <PlotFrame height={240} viewHeight={H} yTicks={yTicksFor(ticks, y, compact)} xTicks={yearTicks(years, x, T.common.yearsShort)} ariaLabel={t.aria}>
          <path d={gap} fill={tint(RED, 0.22)} />
          <path d={pathOf(pb)} fill="none" stroke={BLUE} strokeWidth={2} vectorEffect="non-scaling-stroke" />
          <path d={pathOf(pa)} fill="none" stroke={color} strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
        </PlotFrame>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
          <LegendItem color={color} label={t.fundA(pct(feeA, 2))} />
          <LegendItem color={BLUE} label={t.fundB(pct(feeB, 2))} />
          <LegendItem color={tint(RED, 0.6)} label={t.legend.gap} kind="block" />
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

type AssetKey = "stocks" | "bonds" | "cash" | "crypto";

/** Illustrative long-run assumptions (return and volatility, % a year), shown to the reader. */
const ASSUME: Record<AssetKey, { r: number; v: number; color: string }> = {
  stocks: { r: 7, v: 16, color: "#7896FF" },
  bonds: { r: 3, v: 6, color: "#3DBFA0" },
  cash: { r: 2, v: 1, color: "#9299A8" },
  crypto: { r: 7, v: 60, color: "#F7931A" },
};
const KEYS: AssetKey[] = ["stocks", "bonds", "cash", "crypto"];
const CORR: Partial<Record<`${AssetKey}-${AssetKey}`, number>> = { "stocks-bonds": 0.1, "stocks-crypto": 0.4 };
const corr = (a: AssetKey, b: AssetKey) => (a === b ? 1 : (CORR[`${a}-${b}`] ?? CORR[`${b}-${a}`] ?? 0));

function Stack({ title, values }: { title: string; values: Record<AssetKey, number> }) {
  return (
    <div>
      <div className="mb-1.5 text-[12px] text-muted">{title}</div>
      <div className="flex h-8 overflow-hidden rounded-md bg-surface-3" aria-hidden>
        {KEYS.filter((k) => values[k] > 0.05).map((k) => (
          <span key={k} className="num flex items-center justify-center overflow-hidden text-[11px] font-medium text-bg" style={{ width: `${values[k]}%`, backgroundColor: ASSUME[k].color }}>
            {values[k] >= 7 ? `${nf(values[k], 0)}%` : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Share of money versus share of risk for a simple multi-asset mix. */
export function AllocationExplorer() {
  const T = useT().investing;
  const t = T.allocation;
  const [w, setW] = useState({ stocks: 60, bonds: 35, crypto: 0 });
  const cash = Math.max(0, 100 - w.stocks - w.bonds - w.crypto);
  const weights: Record<AssetKey, number> = { stocks: w.stocks, bonds: w.bonds, cash, crypto: w.crypto };
  const set = (key: "stocks" | "bonds" | "crypto", v: number) => {
    const next = { ...w, [key]: v };
    let over = next.stocks + next.bonds + next.crypto - 100;
    for (const k of ["bonds", "stocks", "crypto"] as const) {
      if (over <= 0 || k === key) continue;
      const cut = Math.min(over, next[k]);
      next[k] -= cut;
      over -= cut;
    }
    setW(next);
  };
  const frac = (k: AssetKey) => weights[k] / 100;
  const expected = KEYS.reduce((s, k) => s + frac(k) * ASSUME[k].r, 0);
  const cov = (a: AssetKey, b: AssetKey) => ASSUME[a].v * ASSUME[b].v * corr(a, b);
  const variance = KEYS.reduce((s, a) => s + KEYS.reduce((u, b) => u + frac(a) * frac(b) * cov(a, b), 0), 0);
  const vol = Math.sqrt(variance);
  const risk = Object.fromEntries(KEYS.map((a) => [a, variance > 0 ? ((frac(a) * KEYS.reduce((u, b) => u + frac(b) * cov(a, b), 0)) / variance) * 100 : 0])) as Record<AssetKey, number>;
  const presets: [keyof typeof t.presets, { stocks: number; bonds: number; crypto: number }][] = [
    ["cautious", { stocks: 20, bonds: 60, crypto: 0 }],
    ["balanced", { stocks: 60, bonds: 40, crypto: 0 }],
    ["growth", { stocks: 90, bonds: 10, crypto: 0 }],
    ["crypto", { stocks: 55, bonds: 40, crypto: 5 }],
  ];


  return (
    <Shell note={t.note}>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {presets.map(([key, mix]) => (
          <button
            key={key}
            type="button"
            onClick={() => setW(mix)}
            className={cn("rounded-md border px-2.5 py-1 text-[12px]", w.stocks === mix.stocks && w.bonds === mix.bonds && w.crypto === mix.crypto ? "border-accent/50 text-fg" : "border-line text-muted hover:text-fg-2")}
          >
            {t.presets[key]}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label={t.assets.stocks} value={w.stocks} min={0} max={100} step={5} onChange={(v) => set("stocks", v)} format={(v) => `${v}%`} color={ASSUME.stocks.color} />
        <Slider label={t.assets.bonds} value={w.bonds} min={0} max={100} step={5} onChange={(v) => set("bonds", v)} format={(v) => `${v}%`} color={ASSUME.bonds.color} />
        <Slider label={t.assets.crypto} value={w.crypto} min={0} max={20} step={1} onChange={(v) => set("crypto", v)} format={(v) => `${v}%`} color={ASSUME.crypto.color} />
      </div>
      <p className="mt-2 text-[12px] text-muted">{t.cashRest(`${cash}%`)}</p>
      <div className="mt-5 space-y-3 border-t border-line pt-4" role="img" aria-label={t.aria}>
        <Stack title={t.money} values={weights} />
        <Stack title={t.risk} values={risk} />
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-1 text-[12px] text-muted">
          {KEYS.map((k) => (
            <LegendItem key={k} color={ASSUME[k].color} label={t.legendItem(t.assets[k], `${nf(weights[k], 0)}%`, `${nf(risk[k], 0)}%`)} kind="block" />
          ))}
        </div>
      </div>
      <Stats cols={3}>
        <Stat label={t.expected} value={pct(expected, 1, true)} />
        <Stat label={t.volatility} value={pct(vol, 1)} />
        <Stat label={t.bad} value={pct(expected - Z90 * vol, 1, true)} tone="text-negative" sub={t.badSub} />
      </Stats>
      <p className="mt-4 text-[11.5px] leading-relaxed text-subtle">{t.assumptions}</p>
      <div className="mt-1.5 overflow-x-auto">
        <table className="w-full min-w-[300px] text-left text-[11px] text-muted">
          <thead>
            <tr>
              <th scope="col" className="py-1 pr-3 font-medium" />
              {KEYS.map((k) => (
                <th key={k} scope="col" className="py-1 pr-2 font-medium text-fg-2">
                  {t.assets[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="num">
            <tr className="border-t border-line">
              <th scope="row" className="py-1 pr-3 font-normal">{t.assumedReturn}</th>
              {KEYS.map((k) => (
                <td key={k} className="py-1 pr-2">{pct(ASSUME[k].r, 0)}</td>
              ))}
            </tr>
            <tr className="border-t border-line">
              <th scope="row" className="py-1 pr-3 font-normal">{t.assumedVol}</th>
              {KEYS.map((k) => (
                <td key={k} className="py-1 pr-2">{pct(ASSUME[k].v, 0)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
