import { connection } from "next/server";
import { getT } from "@/i18n/server";
import { formatPrice } from "@/lib/format";
import { halvingCycles } from "@/lib/strategies/calc";
import { getWeeklyHistory } from "@/lib/strategies/data";
import { ClaimKicker } from "@/components/research/claim-kicker";
import { SourceTag } from "@/components/ui/source-tag";
import { PLOT_W, PlotFrame, logScale, pathOf } from "./plot";

/** Halvings covered by the price history (the 2012 cycle starts before it). */
const HALVINGS = ["2016-07-09", "2020-05-11", "2024-04-20"];
const COLORS = ["#9C83E8", "#7896FF", "#F7931A"];
const HORIZON = 1460;
const H = 300;

const multiple = (v: number) => `${v >= 10 ? v.toFixed(0) : v.toFixed(1)}x`;

/** Each Bitcoin halving cycle, aligned on its halving day and expressed as a multiple of that day's price. */
export async function CyclesSection() {
  await connection(); // market data is request-time: never fetched at build
  const [hist, dict] = await Promise.all([getWeeklyHistory("bitcoin"), getT()]);
  const t = dict.strategies;
  const c = t.cycles;
  if (!hist.data) return <p className="text-[13px] text-muted">{hist.note ?? t.unavailable}</p>;
  const { weekly, latest } = hist.data;
  const points = latest && latest.t > weekly[weekly.length - 1].t ? [...weekly, latest] : weekly;
  const cycles = halvingCycles(points, HALVINGS, HORIZON);
  if (!cycles.length) return <p className="text-[13px] text-muted">{t.unavailable}</p>;

  const all = cycles.flatMap((cy) => cy.points.map((p) => p.multiple));
  const lo = Math.min(0.5, ...all) * 0.9;
  const hi = Math.max(...all) * 1.2;
  const y = logScale(lo, hi, H);
  const x = (day: number) => (day / HORIZON) * PLOT_W;
  const yTicks = [0.5, 1, 2, 5, 10, 20, 50].filter((v) => v >= lo && v <= hi).map((v) => ({ pct: (y(v) / H) * 100, label: `${v}x` }));
  const xTicks = [0, 365, 730, 1095, 1460].map((d, i) => ({ pct: (x(d) / PLOT_W) * 100, label: i === 0 ? c.halving : c.year(i) }));
  const current = cycles[cycles.length - 1];
  const now = current.points[current.points.length - 1];

  return (
    <div className="space-y-5">
      <div>
        <PlotFrame
          height={300}
          viewHeight={H}
          yTicks={yTicks}
          xTicks={xTicks}
          ariaLabel={c.aria}
          overlay={
            <>
              <span className="absolute inset-y-0 w-px bg-line-strong" style={{ left: `${(x(0) / PLOT_W) * 100}%` }} aria-hidden />
              <span
                className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-bg"
                style={{ left: `${(x(now.day) / PLOT_W) * 100}%`, top: `${(y(now.multiple) / H) * 100}%`, backgroundColor: COLORS[cycles.length - 1] }}
                aria-hidden
              />
              <span
                className="absolute -translate-y-[160%] whitespace-nowrap rounded bg-bg/80 px-1.5 text-[11px] text-fg-2"
                style={{ left: `${(x(now.day) / PLOT_W) * 100}%`, top: `${(y(now.multiple) / H) * 100}%` }}
              >
                {c.today} · {multiple(now.multiple)}
              </span>
            </>
          }
        >
          <line x1={0} x2={PLOT_W} y1={y(1)} y2={y(1)} stroke="#9299A8" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
          {cycles.map((cy, i) => (
            <path key={cy.halving} d={pathOf(cy.points.map((p) => [x(p.day), y(p.multiple)]))} fill="none" stroke={COLORS[i]} strokeWidth={i === cycles.length - 1 ? 2.5 : 1.75} strokeOpacity={i === cycles.length - 1 ? 1 : 0.85} vectorEffect="non-scaling-stroke" />
          ))}
        </PlotFrame>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3">
        {cycles.map((cy, i) => (
          <li key={cy.halving} className="rounded-xl border border-line bg-surface p-3.5">
            <div className="flex items-center gap-2 text-[13px] font-medium text-fg">
              <span className="h-0.5 w-5 rounded" style={{ backgroundColor: COLORS[i] }} aria-hidden />
              {c.halving} {cy.halving.slice(0, 4)}
            </div>
            <div className="num mt-1.5 text-[12px] text-muted">{c.startPrice(formatPrice(cy.startPrice))}</div>
            <div className="num mt-0.5 text-[12.5px] text-fg-2">{c.peak(multiple(cy.peak.multiple), cy.peak.day)}</div>
          </li>
        ))}
      </ul>

      {c.reading.map(([kind, text]) => (
        <p key={text} className="text-[13.5px] leading-relaxed text-fg-2">
          <ClaimKicker kind={kind} />
          {text}
        </p>
      ))}

      <div>
        <SourceTag result={hist} label={dict.ui.sources.prices} />
        <p className="mt-1 text-[11px] text-subtle">{c.note}</p>
      </div>
    </div>
  );
}
