import type { AcademyCategory } from "@/content/concepts";
import { ACADEMY_COLORS, tint } from "@/lib/brand";

/**
 * Small geometric illustration per Academy track, drawn in the track colour.
 * Pure SVG: crisp at any size, no image assets.
 */
export function TrackArt({ category, className }: { category: AcademyCategory; className?: string }) {
  const c = ACADEMY_COLORS[category];
  const soft = tint(c, 0.35);
  const faint = tint(c, 0.16);
  const art: Record<AcademyCategory, React.ReactNode> = {
    foundations: (
      <g>
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].slice(0, 4 - row).map((col) => (
            <rect key={`${row}-${col}`} x={40 + col * 34 + row * 17} y={92 - row * 26} width="30" height="22" rx="4" fill={row === 2 ? c : row === 1 ? soft : faint} stroke={c} strokeOpacity="0.5" />
          )),
        )}
      </g>
    ),
    technology: (
      <g stroke={c} strokeOpacity="0.55">
        {[
          [60, 40, 110, 70],
          [110, 70, 170, 45],
          [110, 70, 100, 110],
          [170, 45, 200, 95],
          [100, 110, 200, 95],
          [60, 40, 45, 95],
          [45, 95, 100, 110],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
        {[
          [60, 40, 7],
          [110, 70, 10],
          [170, 45, 7],
          [100, 110, 6],
          [200, 95, 8],
          [45, 95, 5],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i === 1 ? c : soft} stroke="none" />
        ))}
      </g>
    ),
    defi: (
      <g fill="none" stroke={c} strokeWidth="2">
        <circle cx="95" cy="75" r="34" strokeOpacity="0.9" />
        <circle cx="140" cy="75" r="34" strokeOpacity="0.6" />
        <circle cx="117" cy="40" r="34" strokeOpacity="0.35" />
        <circle cx="117" cy="64" r="8" fill={c} stroke="none" />
      </g>
    ),
    tokenomics: (
      <g>
        <circle cx="120" cy="72" r="44" fill={faint} />
        <path d="M120 72 L120 28 A44 44 0 0 1 162 84 Z" fill={c} />
        <path d="M120 72 L162 84 A44 44 0 0 1 96 109 Z" fill={soft} />
        <circle cx="120" cy="72" r="18" fill="var(--surface)" />
      </g>
    ),
    research: (
      <g>
        {[30, 52, 40, 70, 58, 86].map((h, i) => (
          <rect key={i} x={50 + i * 22} y={115 - h} width="14" height={h} rx="3" fill={i === 5 ? c : soft} />
        ))}
        <circle cx="170" cy="45" r="18" fill="none" stroke={c} strokeWidth="3" />
        <line x1="183" y1="58" x2="198" y2="73" stroke={c} strokeWidth="3" strokeLinecap="round" />
      </g>
    ),
    portfolio: (
      <g fill="none" strokeWidth="14">
        <circle cx="120" cy="72" r="38" stroke={faint} />
        <circle cx="120" cy="72" r="38" stroke={c} strokeDasharray="110 240" transform="rotate(-90 120 72)" />
        <circle cx="120" cy="72" r="38" stroke={soft} strokeDasharray="60 240" strokeDashoffset="-116" transform="rotate(-90 120 72)" />
      </g>
    ),
    risk: (
      <g fill="none">
        <path d="M30 50 C 60 45, 75 40, 95 48 S 120 105, 140 108 S 175 70, 210 62" stroke={c} strokeWidth="3" strokeLinecap="round" />
        <path d="M30 50 C 60 45, 75 40, 95 48 S 120 105, 140 108 S 175 70, 210 62 L210 130 L30 130 Z" fill={faint} />
        <line x1="140" y1="40" x2="140" y2="108" stroke={c} strokeDasharray="3 4" strokeOpacity="0.7" />
      </g>
    ),
    psychology: (
      <g fill="none" strokeLinecap="round">
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M30 ${70 + i * 12} C 70 ${30 + i * 12}, 100 ${110 + i * 12}, 140 ${70 + i * 12} S 200 ${40 + i * 12}, 215 ${70 + i * 12}`} stroke={c} strokeOpacity={1 - i * 0.3} strokeWidth="2.5" />
        ))}
      </g>
    ),
    investing: (
      <g>
        {[14, 18, 24, 31, 40, 52, 68].map((h, i) => (
          <rect key={i} x={46 + i * 22} y={118 - h} width="14" height={h} rx="3" fill={i === 6 ? c : i >= 4 ? soft : faint} />
        ))}
        <path d="M40 98 C 90 96, 130 86, 160 66 S 196 30, 206 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />
        <path d="M196 20 L208 23 L201 33" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden>
      {art[category]}
    </svg>
  );
}
