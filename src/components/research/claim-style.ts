import type { ClaimKind } from "@/lib/research/types";

/** Colours of each claim type. Labels live in the dictionaries (`ui.claims`). */
export const CLAIM_STYLE: Record<ClaimKind, { className: string; dot: string; text: string }> = {
  fact: { className: "text-positive border-positive/30 bg-positive-soft", dot: "bg-positive", text: "text-positive" },
  interpretation: { className: "text-accent-strong border-accent/30 bg-accent-soft", dot: "bg-accent", text: "text-accent-strong" },
  hypothesis: { className: "text-warning border-warning/30 bg-warning-soft", dot: "bg-warning", text: "text-warning" },
};
