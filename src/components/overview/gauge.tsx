/** Colour of a Fear & Greed reading: red (fear) through orange and lime to green (greed). */
export function zoneColor(value: number) {
  if (value < 25) return "#E36B75";
  if (value < 50) return "#F08A4B";
  if (value < 75) return "#B5D65A";
  return "#45B997";
}

/** Semicircular 0 to 100 gauge (server-rendered SVG). */
export function Gauge({ value, size = 64, label }: { value: number; size?: number; label: string }) {
  const r = 26;
  const c = Math.PI * r;
  const pct = Math.max(0, Math.min(100, value)) / 100;
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 64 38" role="img" aria-label={label}>
      <path d="M6 34 A26 26 0 0 1 58 34" fill="none" stroke="var(--surface-3)" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M6 34 A26 26 0 0 1 58 34"
        fill="none"
        stroke={zoneColor(value)}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`}
      />
    </svg>
  );
}
