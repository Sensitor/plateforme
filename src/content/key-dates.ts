import type { Locale } from "@/i18n/config";
import { KEY_DATES_FR } from "./fr/key-dates";

/**
 * Schedule-level supply events taken from Sensitor dossiers. These are
 * protocol or issuer schedules, not exact unlock amounts: a licensed unlock
 * data feed is planned for Phase 2. Keep in sync with the dossiers.
 */
export interface KeyDate {
  slug: string;
  title: string;
  when: string;
  kind: "unlock" | "halving" | "vesting-end";
}

export const KEY_DATES: KeyDate[] = [
  { slug: "arbitrum", title: "Team & investor monthly unlocks", when: "Monthly until Mar 2027", kind: "unlock" },
  { slug: "ethena", title: "Core contributor & investor vesting", when: "Monthly until Mar 2028", kind: "unlock" },
  { slug: "ondo", title: "Annual unlock tranche", when: "Every January", kind: "unlock" },
  { slug: "hyperliquid", title: "Core contributor vesting", when: "Ongoing since Nov 2025", kind: "unlock" },
  { slug: "celestia", title: "Initial insider vesting completes", when: "Late 2026", kind: "vesting-end" },
  { slug: "bitcoin", title: "Next halving (block 1,050,000)", when: "Expected ~2028", kind: "halving" },
];

/** Key dates with their text in the interface language (same order and data). */
export function keyDatesFor(locale: Locale): KeyDate[] {
  if (locale === "en") return KEY_DATES;
  return KEY_DATES.map((d, i) => ({ ...d, ...KEY_DATES_FR[i] }));
}
