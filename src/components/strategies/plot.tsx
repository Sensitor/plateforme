import { cn } from "@/lib/utils";

/**
 * Chart frame shared by server charts and client simulators: an SVG drawing
 * area (viewBox 0 0 1000 H, stretched) with HTML tick labels so text stays crisp.
 * Pure component, no hooks and no server-only imports.
 */
export interface Tick {
  /** Position from the top (y) or the left (x), in percent. */
  pct: number;
  label: string;
}

export const PLOT_W = 1000;

export function PlotFrame({
  height = 260,
  yTicks,
  xTicks,
  children,
  overlay,
  ariaLabel,
  viewHeight = 300,
}: {
  height?: number;
  yTicks: Tick[];
  xTicks: Tick[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  ariaLabel: string;
  viewHeight?: number;
}) {
  return (
    <div className="flex gap-2">
      <div className="num relative w-12 shrink-0 text-right text-[10.5px] text-subtle" style={{ height }} aria-hidden>
        {yTicks.map((t) => (
          <span key={t.label} className="absolute right-0 -translate-y-1/2 whitespace-nowrap" style={{ top: `${t.pct}%` }}>
            {t.label}
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative overflow-hidden rounded-md border border-line bg-bg-elevated" style={{ height }}>
          <div className="absolute inset-0" aria-hidden>
            {yTicks.map((t) => (
              <span key={t.label} className="absolute inset-x-0 h-px bg-line/50" style={{ top: `${t.pct}%` }} />
            ))}
          </div>
          <svg viewBox={`0 0 ${PLOT_W} ${viewHeight}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label={ariaLabel}>
            {children}
          </svg>
          {overlay}
        </div>
        <div className="relative mt-1.5 h-4" aria-hidden>
          {xTicks.map((t) => (
            <span
              key={t.label}
              className={cn("num absolute whitespace-nowrap text-[10.5px] text-subtle", t.pct >= 94 ? "-translate-x-full" : t.pct <= 3 ? "" : "-translate-x-1/2")}
              style={{ left: `${t.pct}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Log-scale mapper between [min, max] and [height, 0]. */
export function logScale(min: number, max: number, height: number) {
  const lo = Math.log10(min);
  const hi = Math.log10(max);
  return (v: number) => height - ((Math.log10(Math.max(v, min)) - lo) / (hi - lo)) * height;
}

/** Linear mapper between [min, max] and [height, 0]. */
export function linearScale(min: number, max: number, height: number) {
  return (v: number) => height - ((v - min) / (max - min || 1)) * height;
}

/** Round ticks from 0 up to the first step at or above max (steps of 1, 2, 2.5 or 5 times a power of ten). */
export function linearTicks(max: number, target = 4): number[] {
  if (!(max > 0)) return [0, 1];
  const raw = max / target;
  const p = 10 ** Math.floor(Math.log10(raw));
  const m = raw / p;
  const step = (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
  const out: number[] = [];
  for (let v = 0; v < max + step; v += step) out.push(v);
  return out;
}

/** Polyline path for points already in SVG coordinates. */
export function pathOf(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
}

/** Powers of ten (and their 3x) between min and max, for log-scale ticks. */
export function logTicks(min: number, max: number): number[] {
  const out: number[] = [];
  for (let e = Math.floor(Math.log10(min)); e <= Math.ceil(Math.log10(max)); e++) {
    for (const m of [1, 3]) {
      const v = m * 10 ** e;
      if (v >= min && v <= max) out.push(v);
    }
  }
  return out;
}

/** Legend item: a short line or swatch with its label (colour always comes with text). */
export function LegendItem({ color, label, kind = "line" }: { color: string; label: string; kind?: "line" | "dashed" | "block" | "dot" }) {
  return (
    <span className="inline-flex items-center gap-2">
      {kind === "block" ? (
        <span className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: color }} aria-hidden />
      ) : kind === "dot" ? (
        <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      ) : (
        <span className={cn("w-4", kind === "dashed" ? "border-t-2 border-dashed" : "h-0.5")} style={kind === "dashed" ? { borderColor: color } : { backgroundColor: color }} aria-hidden />
      )}
      {label}
    </span>
  );
}
