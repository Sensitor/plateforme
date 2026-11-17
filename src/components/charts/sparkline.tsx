import { CHART } from "./palette";

/** Tiny inline SVG trend line (server-renderable, used in tables and cards). */
export function Sparkline({ values, width = 96, height = 28, className }: { values: number[] | null | undefined; width?: number; height?: number; className?: string }) {
  if (!values || values.length < 2) return <span className="text-xs text-subtle">n/a</span>;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const pts = values.map((v, i) => `${(i * step).toFixed(1)},${(height - 2 - ((v - min) / range) * (height - 4)).toFixed(1)}`);
  const up = values[values.length - 1] >= values[0];
  const color = up ? CHART.positive : CHART.negative;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label={`7-day trend ${up ? "up" : "down"}`}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
