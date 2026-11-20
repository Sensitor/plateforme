import { Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/brand";
import type { Badge } from "@/lib/academy/badges";

/** Round medal for a badge. Colour is decorative: the label always sits next to it. */
export function BadgeMedal({ badge, size = "md" }: { badge: Badge; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "size-7" : "size-10";
  const icon = size === "sm" ? "size-3.5" : "size-[18px]";
  return badge.earned ? (
    <span className={cn("flex shrink-0 items-center justify-center rounded-full", dim)} style={{ backgroundColor: tint(badge.color, 0.16), color: badge.color, boxShadow: `inset 0 0 0 1px ${tint(badge.color, 0.45)}` }} aria-hidden>
      <Award className={icon} />
    </span>
  ) : (
    <span className={cn("flex shrink-0 items-center justify-center rounded-full border border-dashed border-line-strong text-subtle", dim)} aria-hidden>
      <Award className={icon} />
    </span>
  );
}

/** Badge with its label and progress: used on the Academy page. */
export function BadgeRow({ badge }: { badge: Badge }) {
  const pct = badge.total ? Math.round((badge.done / badge.total) * 100) : 0;
  return (
    <li className="flex items-start gap-3.5">
      <BadgeMedal badge={badge} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className={cn("truncate text-[14px] font-medium", badge.earned ? "text-fg" : "text-fg-2")}>{badge.label}</span>
          <span className="num shrink-0 text-[12px] text-muted">
            {badge.earned ? "Earned" : `${badge.done}/${badge.total}`}
          </span>
        </div>
        <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{badge.description}</p>
        <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-surface-3" role="progressbar" aria-label={`${badge.label} progress`} aria-valuemin={0} aria-valuemax={badge.total} aria-valuenow={badge.done}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: badge.color, opacity: badge.earned ? 1 : 0.55 }} />
        </div>
      </div>
    </li>
  );
}
