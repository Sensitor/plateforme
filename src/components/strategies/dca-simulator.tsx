"use client";

import { useId, useMemo, useState } from "react";
import { useLocale, useT } from "@/i18n/client";
import { formatDate, formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import { simulateDca, type DcaFrequency } from "@/lib/strategies/calc";
import { tint } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { LegendItem, PLOT_W, PlotFrame, linearScale, linearTicks, pathOf } from "./plot";

export interface DcaAssetData {
  key: "bitcoin" | "ethereum";
  label: string;
  color: string;
  /** Weekly closes as [ms, price]. */
  weekly: [number, number][];
  latest: [number, number] | null;
}

const H = 300;
const PRESETS = [50, 100, 250, 500];
const INVESTED = "#9299A8";
const LUMP = "#3DBFA0";

/** Dollar-cost averaging on real weekly closes, with the result for a single purchase on day one. */
export function DcaSimulator({ assets, defaultStartYear = 2018 }: { assets: DcaAssetData[]; defaultStartYear?: number }) {
  const t = useT().strategies.dca;
  const locale = useLocale();
  const ids = { amount: useId(), start: useId() };
  const [assetKey, setAssetKey] = useState(assets[0].key);
  const [amount, setAmount] = useState(100);
  const [frequency, setFrequency] = useState<DcaFrequency>("monthly");
  const asset = assets.find((a) => a.key === assetKey) ?? assets[0];
  const firstYear = new Date(asset.weekly[0][0]).getUTCFullYear() + 1;
  const lastYear = new Date((asset.latest ?? asset.weekly[asset.weekly.length - 1])[0]).getUTCFullYear() - 1;
  const years = Array.from({ length: Math.max(0, lastYear - firstYear + 1) }, (_, i) => firstYear + i);
  const [startYear, setStartYear] = useState(defaultStartYear);
  const year = Math.min(Math.max(startYear, firstYear), lastYear);

  const points = useMemo(() => {
    const pts = asset.weekly.map(([tt, v]) => ({ t: tt, v }));
    if (asset.latest && asset.latest[0] > pts[pts.length - 1].t) pts.push({ t: asset.latest[0], v: asset.latest[1] });
    return pts;
  }, [asset]);
  const result = useMemo(() => simulateDca(points, { amount, startT: Date.UTC(year, 0, 1), frequency }), [points, amount, year, frequency]);
  const today = points[points.length - 1].v;

  return (
    <div className="rounded-xl border border-line p-4 md:p-5">
      <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto_auto] md:items-end">
        <Segmented label={t.asset} value={assetKey} onChange={setAssetKey} options={assets.map((a) => ({ value: a.key, label: a.label }))} />
        <div>
          <label htmlFor={ids.amount} className="mb-1.5 block text-[12px] text-muted">
            {t.amount}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id={ids.amount}
              type="number"
              min={1}
              step={10}
              value={amount}
              onChange={(e) => setAmount(Math.max(1, Number(e.target.value) || 1))}
              className="num h-9 w-24 rounded-lg border border-line bg-bg-elevated px-3 text-[13.5px] text-fg focus:border-accent/50 focus:outline-none"
            />
            {PRESETS.map((p) => (
              <button key={p} type="button" onClick={() => setAmount(p)} className={cn("num rounded-md border px-2 py-1 text-[12px]", amount === p ? "border-accent/50 text-fg" : "border-line text-muted hover:text-fg-2")}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <Segmented
          label={t.frequency}
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: "monthly", label: t.monthly },
            { value: "weekly", label: t.weekly },
          ]}
        />
        <div>
          <label htmlFor={ids.start} className="mb-1.5 block text-[12px] text-muted">
            {t.start}
          </label>
          <select id={ids.start} value={year} onChange={(e) => setStartYear(Number(e.target.value))} className="num h-9 rounded-lg border border-line bg-bg-elevated px-2.5 text-[13.5px] text-fg focus:border-accent/50 focus:outline-none">
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result ? (
        <>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-4 md:grid-cols-5">
            <Tile label={t.invested} value={formatUsdCompact(result.invested)} sub={t.buys(result.buys)} />
            <Tile label={t.value} value={formatUsdCompact(result.value)} />
            <Tile label={t.return} value={formatPercent(result.returnPct, { digits: 0 })} tone={result.returnPct >= 0 ? "text-positive" : "text-negative"} />
            <Tile label={t.averageCost} value={formatPrice(result.averageCost)} sub={t.vsToday(formatPrice(today))} />
            <Tile label={t.worst} value={formatPercent(result.worstReturnPct, { digits: 0 })} sub={t.worstOn(formatDate(result.worstT, locale))} tone={result.worstReturnPct < 0 ? "text-negative" : undefined} />
          </dl>
          <DcaChart series={result.series} color={asset.color} aria={t.aria} />
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
            <LegendItem color={asset.color} label={t.legend.value} kind="block" />
            <LegendItem color={INVESTED} label={t.legend.invested} kind="dashed" />
            <LegendItem color={LUMP} label={t.legend.lumpSum} />
          </div>
          <p className="mt-3 text-[13px] text-fg-2">
            {t.lumpSum} {t.lumpSumNote(formatUsdCompact(result.lumpSumValue), formatPercent(result.lumpSumReturnPct, { digits: 0 }))}
          </p>
        </>
      ) : null}
    </div>
  );
}

function DcaChart({ series, color, aria }: { series: { t: number; invested: number; value: number; lumpSum: number }[]; color: string; aria: string }) {
  const t0 = series[0].t;
  const t1 = series[series.length - 1].t;
  const x = (tt: number) => ((tt - t0) / (t1 - t0 || 1)) * PLOT_W;
  const ticks = linearTicks(Math.max(...series.map((p) => Math.max(p.value, p.invested, p.lumpSum))) * 1.04);
  const y = linearScale(0, ticks[ticks.length - 1], H);
  const value = pathOf(series.map((p) => [x(p.t), y(p.value)]));
  const invested = pathOf(series.map((p) => [x(p.t), y(p.invested)]));
  const lump = pathOf(series.map((p) => [x(p.t), y(p.lumpSum)]));
  const yTicks = ticks.map((v) => ({ pct: (y(v) / H) * 100, label: formatUsdCompact(v) }));
  const y0 = new Date(t0).getUTCFullYear() + 1;
  const y1 = new Date(t1).getUTCFullYear();
  const span = y1 - y0 + 1;
  const step = span > 8 ? 2 : 1;
  const xTicks = Array.from({ length: Math.max(0, span) }, (_, i) => y0 + i)
    .filter((yr) => (yr - y0) % step === 0)
    .map((yr) => ({ pct: (x(Date.UTC(yr, 0, 1)) / PLOT_W) * 100, label: String(yr) }));
  return (
    <div className="mt-5">
      <PlotFrame height={260} viewHeight={H} yTicks={yTicks} xTicks={xTicks} ariaLabel={aria}>
        <path d={`${value}L${PLOT_W},${H}L0,${H}Z`} fill={tint(color, 0.18)} />
        <path d={value} fill="none" stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        <path d={lump} fill="none" stroke={LUMP} strokeWidth={1.5} strokeOpacity={0.9} vectorEffect="non-scaling-stroke" />
        <path d={invested} fill="none" stroke={INVESTED} strokeWidth={1.75} strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
      </PlotFrame>
    </div>
  );
}

function Segmented<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div role="group" aria-label={label}>
      <div className="mb-1.5 text-[12px] text-muted">{label}</div>
      <div className="inline-flex rounded-lg border border-line bg-bg-elevated p-0.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn("rounded-md px-3 py-1.5 text-[12.5px] transition-colors", value === o.value ? "bg-surface-3 text-fg" : "text-muted hover:text-fg-2")}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Tile({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11.5px] text-muted">{label}</dt>
      <dd className={cn("num mt-1 text-[19px] text-fg", tone)}>{value}</dd>
      {sub ? <dd className="text-[11.5px] leading-snug text-subtle">{sub}</dd> : null}
    </div>
  );
}
