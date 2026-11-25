import { connection } from "next/server";
import { getLocale, getT } from "@/i18n/server";
import { formatDate, formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import { movingAverageSeries, wmaSnapshot } from "@/lib/strategies/calc";
import { getWeeklyHistory } from "@/lib/strategies/data";
import { ClaimKicker } from "@/components/research/claim-kicker";
import { SourceTag } from "@/components/ui/source-tag";
import { cn } from "@/lib/utils";
import { LegendItem, PLOT_W, PlotFrame, logScale, logTicks, pathOf } from "./plot";

const BTC = "#F7931A";
const MA = "#7896FF";
const BELOW = "#E36B75";
const H = 300;
const HALF_WEEK = 3.5 * 86_400_000;

/** Bitcoin weekly closes against their 200-week moving average, from real price history. */
export async function WmaSection({ compact = false }: { compact?: boolean }) {
  await connection(); // market data is request-time: never fetched at build
  const [hist, dict, locale] = await Promise.all([getWeeklyHistory("bitcoin"), getT(), getLocale()]);
  const t = dict.strategies;
  const w = t.wma;
  if (!hist.data) return <p className="text-[13px] text-muted">{hist.note ?? t.unavailable}</p>;
  const { weekly, latest } = hist.data;
  const snap = wmaSnapshot(weekly, 200, latest?.v);
  const ma = movingAverageSeries(weekly, 200);
  if (!snap || !ma.length) return <p className="text-[13px] text-muted">{t.unavailable}</p>;

  const lastT = Math.max(latest?.t ?? 0, weekly[weekly.length - 1].t);
  const t0 = weekly[0].t;
  const x = (tt: number) => ((tt - t0) / (lastT - t0)) * PLOT_W;
  const prices = weekly.map((p) => p.v);
  const lo = Math.min(...prices) * 0.8;
  const hi = Math.max(...prices, snap.price) * 1.25;
  const y = logScale(lo, hi, H);
  const pricePath = pathOf([...weekly.map((p) => [x(p.t), y(p.v)] as [number, number]), ...(latest && latest.t > weekly[weekly.length - 1].t ? [[x(latest.t), y(latest.v)] as [number, number]] : [])]);
  const maPath = pathOf(ma.map((p) => [x(p.t), y(p.v)]));
  const yTicks = logTicks(lo, hi).map((v) => ({ pct: (y(v) / H) * 100, label: formatUsdCompact(v) }));
  const firstYear = new Date(t0).getUTCFullYear() + 1;
  const lastYear = new Date(lastT).getUTCFullYear();
  const xTicks = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i)
    .filter((yr) => yr % 2 === 0)
    .map((yr) => ({ pct: (x(Date.UTC(yr, 0, 1)) / PLOT_W) * 100, label: String(yr) }));
  const running = snap.periods.at(-1)?.end === null ? snap.periods.at(-1) : undefined;
  const tone = snap.below ? "text-negative" : "text-positive";

  return (
    <div className="space-y-5">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-line bg-surface p-4 md:grid-cols-5">
        <Stat label={w.price} value={formatPrice(snap.price)} />
        <Stat label={w.ma} value={formatPrice(snap.ma)} />
        <Stat label={w.distance} value={formatPercent(snap.distancePct, { digits: 1 })} sub={snap.below ? w.below : w.above} className={tone} />
        <Stat label={w.share(formatDate(ma[0].t, locale))} value={formatPercent(snap.shareBelowPct, { signed: false, digits: 1 })} />
        <Stat label={w.run} value={running ? w.weeks(running.weeks) : w.runAbove} className={running ? "text-negative" : undefined} />
      </dl>

      <div>
        <PlotFrame
          height={compact ? 240 : 320}
          viewHeight={H}
          yTicks={yTicks}
          xTicks={xTicks}
          ariaLabel={w.aria}
          overlay={
            <span
              className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-bg"
              style={{ left: `${(x(lastT) / PLOT_W) * 100}%`, top: `${(y(snap.price) / H) * 100}%`, backgroundColor: BTC }}
              aria-hidden
            />
          }
        >
          {snap.periods.map((p) => (
            <rect key={p.start} x={x(p.start - HALF_WEEK)} y={0} width={Math.max(2, x((p.end ?? lastT) + HALF_WEEK) - x(p.start - HALF_WEEK))} height={H} fill={BELOW} fillOpacity={0.22} />
          ))}
          <path d={pricePath} fill="none" stroke={BTC} strokeWidth={1.75} vectorEffect="non-scaling-stroke" />
          <path d={maPath} fill="none" stroke={MA} strokeWidth={2.25} vectorEffect="non-scaling-stroke" />
        </PlotFrame>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
          <LegendItem color={BTC} label={w.legend.price} />
          <LegendItem color={MA} label={w.legend.ma} />
          <LegendItem color={BELOW} label={w.legend.below} kind="block" />
        </div>
      </div>

      {compact ? null : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">{w.periodsTitle}</h3>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[360px] text-left text-[12.5px]">
                <thead className="bg-bg-elevated text-[10.5px] uppercase tracking-[0.1em] text-subtle">
                  <tr>
                    <th scope="col" className="px-3.5 py-2 font-medium">{w.cols.start}</th>
                    <th scope="col" className="px-3.5 py-2 font-medium">{w.cols.end}</th>
                    <th scope="col" className="px-3.5 py-2 text-right font-medium">{w.cols.weeks}</th>
                    <th scope="col" className="px-3.5 py-2 text-right font-medium">{w.cols.deepest}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {[...snap.periods].reverse().map((p) => (
                    <tr key={p.start}>
                      <td className="num px-3.5 py-2 text-fg-2">{formatDate(p.start, locale)}</td>
                      <td className={cn("num px-3.5 py-2", p.end ? "text-fg-2" : "text-negative")}>{p.end ? formatDate(p.end, locale) : w.ongoing}</td>
                      <td className="num px-3.5 py-2 text-right text-fg-2">{p.weeks}</td>
                      <td className="num px-3.5 py-2 text-right text-negative">{formatPercent(p.deepestPct, { digits: 1 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ul className="space-y-3 self-start">
            {w.reading.map(([kind, text]) => (
              <li key={text} className="text-[13.5px] leading-relaxed text-fg-2">
                <ClaimKicker kind={kind} />
                {text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <SourceTag result={hist} label={dict.ui.sources.prices} />
        <p className="mt-1 text-[11px] text-subtle">{w.note}</p>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, className }: { label: string; value: string; sub?: string; className?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11.5px] leading-snug text-muted">{label}</dt>
      <dd className={cn("num mt-1 text-[19px] text-fg", className)}>{value}</dd>
      {sub ? <dd className={cn("text-[11.5px]", className)}>{sub}</dd> : null}
    </div>
  );
}
