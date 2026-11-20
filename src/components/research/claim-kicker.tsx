"use client";

import { cn } from "@/lib/utils";
import type { Claim } from "@/lib/research/types";
import { useT } from "@/i18n/client";
import { CLAIM_STYLE } from "./claim-style";

/** Coloured kicker opening a typed claim (Fact, Analysis, Hypothesis). */
export function ClaimKicker({ kind }: { kind: Claim["kind"] }) {
  const label = useT().ui.claims[kind];
  return (
    <span className={cn("mr-2 inline-block align-[1px] text-[10.5px] font-semibold uppercase tracking-[0.12em]", CLAIM_STYLE[kind].text)} title={label.label}>
      {label.short}
    </span>
  );
}

/** Marks a fact that has no source yet. */
export function SourcePending() {
  const t = useT().ui;
  return (
    <span className="ml-1.5 whitespace-nowrap text-[11px] italic text-warning" title={t.sourcePendingTitle}>
      {t.sourcePending}
    </span>
  );
}
