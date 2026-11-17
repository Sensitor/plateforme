import { cn } from "@/lib/utils";

/**
 * Horizontal bar list (pure HTML): label, bar, value. Supports signed values
 * (diverging around zero) for performance comparisons.
 */
export function BarList({
  items,
  format,
  signed = false,
  className,
}: {
  items: { label: React.ReactNode; value: number; key: string; hint?: string }[];
  format: (v: number) => string;
  signed?: boolean;
  className?: string;
}) {
  const maxAbs = Math.max(...items.map((i) => Math.abs(i.value)), 1e-9);
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => {
        const pct = (Math.abs(item.value) / maxAbs) * 100;
        const negative = item.value < 0;
        return (
          <li key={item.key} className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-3 text-[13px]" title={item.hint}>
            <span className="truncate text-fg-2">{item.label}</span>
            {signed ? (
              <span className="relative h-2 rounded-full bg-surface-3">
                <span className="absolute inset-y-0 left-1/2 w-px bg-line-strong" aria-hidden />
                <span
                  className={cn("absolute inset-y-0 rounded-full", negative ? "right-1/2 bg-negative/80" : "left-1/2 bg-positive/80")}
                  style={{ width: `${pct / 2}%` }}
                />
              </span>
            ) : (
              <span className="h-2 rounded-full bg-surface-3">
                <span className="block h-full rounded-full bg-accent/80" style={{ width: `${Math.max(pct, 1.5)}%` }} />
              </span>
            )}
            <span className={cn("num w-20 text-right", signed ? (negative ? "text-negative" : item.value > 0 ? "text-positive" : "text-muted") : "text-fg")}>
              {format(item.value)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
