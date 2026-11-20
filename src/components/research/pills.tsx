"use client";

import { cn } from "@/lib/utils";
import type { ClaimKind, Confidence, RiskLevel } from "@/lib/research/types";
import type { CoverageLevel } from "@/lib/research/framework";
import { RISK_LEVELS } from "@/lib/research/taxonomy";
import { useT } from "@/i18n/client";
import { CLAIM_STYLE } from "./claim-style";

/** Composite research score, or an explicit "withheld" marker with the reason. */
export function ScorePill({ score, note, size = "sm" }: { score: number | null; note?: string | null; size?: "sm" | "lg" }) {
  const t = useT().ui.score;
  if (score == null) {
    return (
      <span
        title={note ?? t.withheld}
        className={cn("num inline-flex items-center rounded-md border border-dashed border-line-strong text-subtle", size === "lg" ? "px-2.5 py-1 text-sm" : "px-1.5 py-0.5 text-[11.5px]")}
      >
        n/a
      </span>
    );
  }
  const tone = score >= 4 ? "text-positive border-positive/30" : score >= 3 ? "text-accent-strong border-accent/30" : "text-warning border-warning/30";
  return (
    <span
      title={t.title}
      className={cn("num inline-flex items-baseline gap-0.5 rounded-md border bg-surface-2", tone, size === "lg" ? "px-2.5 py-1 text-lg" : "px-1.5 py-0.5 text-[12px]")}
    >
      {score.toFixed(1)}
      <span className="text-[0.75em] text-subtle">/5</span>
    </span>
  );
}

const RISK_TONE: Record<RiskLevel, string> = {
  lower: "bg-positive-soft text-positive",
  moderate: "bg-accent-soft text-accent-strong",
  elevated: "bg-warning-soft text-warning",
  high: "bg-negative-soft text-negative",
};

export function RiskPill({ level, compact = false }: { level: RiskLevel; compact?: boolean }) {
  const t = useT();
  const label = t.labels.riskLevels[level];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11.5px] font-medium", RISK_TONE[level])}>
      <span className="flex gap-[2px]" aria-hidden>
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={cn("h-2.5 w-[3px] rounded-full", i <= RISK_LEVELS[level].rank ? "bg-current" : "bg-current opacity-25")} />
        ))}
      </span>
      {compact ? <span className="sr-only">{label}</span> : t.ui.risk(label)}
    </span>
  );
}

const COVERAGE_STYLE: Record<CoverageLevel, string> = { full: "bg-violet-soft text-violet", partial: "bg-surface-3 text-fg-2", limited: "bg-surface-3 text-muted" };

export function CoveragePill({ level }: { level: CoverageLevel }) {
  const label = useT().ui.coverage[level];
  const cls = COVERAGE_STYLE[level];
  return <span className={cn("inline-flex rounded-md px-1.5 py-0.5 text-[11.5px] font-medium", cls)}>{label}</span>;
}

export function ClaimKindBadge({ kind, className }: { kind: ClaimKind; className?: string }) {
  const m = { ...CLAIM_STYLE[kind], ...useT().ui.claims[kind] };
  return (
    <span
      title={m.label}
      className={cn("inline-flex shrink-0 items-center justify-center self-start rounded border px-1.5 text-[10px] font-medium uppercase leading-[18px] tracking-wide", m.className, className)}
    >
      {m.short}
    </span>
  );
}

export function ConfidenceMeter({ confidence }: { confidence: Confidence }) {
  const t = useT();
  const n = confidence === "high" ? 3 : confidence === "medium" ? 2 : 1;
  return (
    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-muted" title={t.labels.confidence[confidence]}>
      <span className="flex gap-[2px]" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span key={i} className={cn("h-1.5 w-3 rounded-full", i <= n ? "bg-fg-2" : "bg-line-strong")} />
        ))}
      </span>
      <span>{t.ui.confidenceShort[confidence]}</span>
    </span>
  );
}
