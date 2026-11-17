import { cn } from "@/lib/utils";
import { deltaTone, formatPercent } from "@/lib/format";

/** Signed percentage change, coloured by direction. Neutral when unavailable. */
export function Delta({ value, className, digits = 2 }: { value: number | null | undefined; className?: string; digits?: number }) {
  const tone = deltaTone(value);
  return (
    <span
      className={cn(
        "num text-[13px]",
        tone === "positive" && "text-positive",
        tone === "negative" && "text-negative",
        tone === "neutral" && "text-muted",
        className,
      )}
    >
      {formatPercent(value, { digits })}
    </span>
  );
}
