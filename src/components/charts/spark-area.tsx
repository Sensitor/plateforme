/**
 * Responsive area sparkline (server-renderable). Stretches to its box; the
 * stroke keeps a constant width. Used for image-led tiles and covers.
 */
export function SparkArea({
  values,
  color,
  className,
  fillOpacity = 0.12,
  strokeWidth = 1.5,
  label,
}: {
  values: number[] | null | undefined;
  color: string;
  className?: string;
  fillOpacity?: number;
  strokeWidth?: number;
  label?: string;
}) {
  if (!values || values.length < 2) return null;
  const W = 1000;
  const H = 300;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = W / (values.length - 1);
  const pts = values.map((v, i) => [i * step, H - 8 - ((v - min) / range) * (H - 24)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
  const area = `${line}L${W},${H}L0,${H}Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <path d={area} fill={color} fillOpacity={fillOpacity} />
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}
