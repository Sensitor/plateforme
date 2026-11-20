import type { Dictionary } from "@/i18n/dictionaries";

/** Subscription tiers (indicative prices; Stripe integration planned for Phase 4). Wording lives in the dictionaries (`plans`). */
export const PLANS = [
  { id: "free", price: "0 €", available: true },
  { id: "pro", price: "29 €", available: false, highlight: true },
  { id: "club", price: "79 €", available: false },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

/** Plans with their name, tagline, features and status in the interface language. */
export function localizedPlans(t: Dictionary) {
  return PLANS.map((p) => ({
    ...p,
    highlight: "highlight" in p ? p.highlight : false,
    ...t.plans.items[p.id],
    status: p.available ? t.plans.available : t.plans.planned,
  }));
}
