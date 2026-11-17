import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-surface-3 text-fg-2 border-transparent",
  outline: "bg-transparent text-muted border-line-strong",
  accent: "bg-accent-soft text-accent-strong border-transparent",
  violet: "bg-violet-soft text-violet border-transparent",
  positive: "bg-positive-soft text-positive border-transparent",
  negative: "bg-negative-soft text-negative border-transparent",
  warning: "bg-warning-soft text-warning border-transparent",
} as const;

export type BadgeTone = keyof typeof tones;

export function Badge({
  tone = "neutral",
  className,
  children,
  title,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-4",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
