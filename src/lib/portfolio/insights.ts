import { RELATIONSHIPS, RELATION_META } from "@/content/relationships";
import { KEY_DATES } from "@/content/key-dates";
import { concentrationLevel, STABLE_ASSET } from "./engine";

/**
 * Informative portfolio insights. They describe exposures and link to the
 * Academy; they never tell the user to buy or sell anything.
 */

export interface HoldingView {
  asset: string;
  name: string;
  value: number;
  sectorLabel: string | null;
  ecosystem: string | null;
  riskLevel: "lower" | "moderate" | "elevated" | "high" | null;
  volume24h: number | null;
}

export interface Insight {
  id: string;
  tone: "info" | "watch";
  title: string;
  detail: string;
  concept?: string;
}

const pct = (x: number) => `${(x * 100).toFixed(0)}%`;
const DEPENDENCY_KINDS = new Set(["settles-on", "deployed-on", "stakes", "uses-oracle", "bridge", "uses-stack"]);

export function buildInsights(holdings: HoldingView[], names: Record<string, string>): Insight[] {
  const total = holdings.reduce((s, h) => s + h.value, 0);
  if (total <= 0) return [];
  const out: Insight[] = [];
  const sorted = [...holdings].sort((a, b) => b.value - a.value);

  // Concentration
  const level = concentrationLevel(holdings.map((h) => h.value));
  const top = sorted[0];
  const topW = top.value / total;
  if (level === "concentrated") {
    out.push({ id: "concentration", tone: "watch", title: `${top.name} is ${pct(topW)} of your portfolio`, detail: "A single position dominates: its drawdowns will drive the whole portfolio. Check that this matches your intended risk.", concept: "diversification" });
  } else {
    const top3 = sorted.slice(0, 3).reduce((s, h) => s + h.value, 0) / total;
    out.push({ id: "concentration", tone: "info", title: `Top 3 positions: ${pct(top3)} of value`, detail: level === "moderate" ? "Moderately concentrated. Crypto assets are highly correlated, so the effective diversification is usually lower than the number of positions suggests." : "Spread across several positions. Remember that crypto assets tend to fall together in sell-offs.", concept: "diversification" });
  }

  // Stablecoin buffer
  const stable = holdings.filter((h) => h.asset === STABLE_ASSET).reduce((s, h) => s + h.value, 0) / total;
  out.push(
    stable === 0
      ? { id: "stables", tone: "info", title: "No stablecoin allocation", detail: "The whole portfolio is exposed to crypto price moves. Some investors keep a stablecoin share as dry powder or to dampen volatility.", concept: "stablecoins" }
      : { id: "stables", tone: "info", title: `Stablecoins: ${pct(stable)} of value`, detail: "Valued at $1.00 (peg assumption). Stablecoins carry issuer, custody and de-peg risks of their own.", concept: "stablecoins" },
  );

  // Sector exposure
  const bySector = new Map<string, number>();
  for (const h of holdings) if (h.sectorLabel) bySector.set(h.sectorLabel, (bySector.get(h.sectorLabel) ?? 0) + h.value);
  const [topSector, topSectorValue] = [...bySector.entries()].sort((a, b) => b[1] - a[1])[0] ?? [null, 0];
  if (topSector && topSectorValue / total > 0.5) {
    out.push({ id: "sector", tone: "watch", title: `${pct(topSectorValue / total)} in ${topSector}`, detail: `Your exposure is dominated by one sector. Sector-wide events (regulation, a failed upgrade, a narrative shift) would affect most of the portfolio at once.`, concept: "diversification" });
  }

  // Ecosystem dependency
  const eth = holdings.filter((h) => h.ecosystem === "ethereum").reduce((s, h) => s + h.value, 0) / total;
  if (eth > 0.6) {
    out.push({ id: "ecosystem", tone: "watch", title: `${pct(eth)} tied to the Ethereum ecosystem`, detail: "Many of your assets share the same base layer. A problem on Ethereum (outage, critical bug, fee spike) would hit several positions together.", concept: "layer-2-rollups" });
  }

  // Shared dependencies from the Knowledge Graph
  const held = new Set(holdings.map((h) => h.asset));
  const dependents = new Map<string, string[]>();
  for (const r of RELATIONSHIPS) {
    if (!DEPENDENCY_KINDS.has(r.kind) || !held.has(r.from)) continue;
    dependents.set(r.to, [...(dependents.get(r.to) ?? []), r.from]);
  }
  for (const [target, froms] of [...dependents.entries()].sort((a, b) => b[1].length - a[1].length)) {
    if (froms.length < 2) continue;
    const list = froms.map((f) => names[f] ?? f);
    out.push({
      id: `dep-${target}`,
      tone: froms.length >= 3 ? "watch" : "info",
      title: `${list.length} position${list.length > 1 ? "s" : ""} depend${list.length > 1 ? "" : "s"} on ${names[target] ?? target}`,
      detail: `${list.join(", ")} rel${list.length > 1 ? "y" : "ies"} on ${names[target] ?? target}${held.has(target) ? ", which you also hold directly" : ""}. See the Knowledge Graph for the nature of each link.`,
      concept: "interoperability",
    });
    if (out.filter((i) => i.id.startsWith("dep-")).length >= 3) break;
  }
  const oracle = RELATIONSHIPS.filter((r) => r.kind === "uses-oracle" && held.has(r.from));
  for (const r of oracle) {
    out.push({ id: `oracle-${r.from}`, tone: "info", title: `${names[r.from]} relies on ${names[r.to]} price feeds`, detail: `${RELATION_META[r.kind].label}: a failure or manipulation of these feeds could trigger wrongful liquidations.`, concept: "oracles" });
  }

  // Scheduled supply events
  const EVENT_DETAIL: Record<string, string> = {
    unlock: "New supply entering circulation can weigh on price if demand does not keep up.",
    halving: "The block subsidy halves: new issuance drops by half, and miner economics change.",
    "vesting-end": "After this date, the initial insider allocations no longer add new supply.",
  };
  for (const d of KEY_DATES.filter((k) => held.has(k.slug))) {
    out.push({
      id: `event-${d.slug}-${d.kind}`,
      tone: d.kind === "unlock" ? "watch" : "info",
      title: `${names[d.slug]}: ${d.title.charAt(0).toLowerCase()}${d.title.slice(1)}`,
      detail: `${d.when}. ${EVENT_DETAIL[d.kind]}`,
      concept: d.kind === "halving" ? "halving" : "token-unlocks",
    });
  }

  // Liquidity
  const thin = holdings.filter((h) => h.asset !== STABLE_ASSET && h.volume24h != null && h.volume24h < 50e6);
  if (thin.length) {
    out.push({ id: "liquidity", tone: "watch", title: `Thinner liquidity: ${thin.map((h) => h.name).join(", ")}`, detail: "Less than $50M traded in 24h. Large orders move the price more and exits can be harder in stressed markets.", concept: "drawdowns" });
  }

  // Risk profile
  const risky = holdings.filter((h) => h.riskLevel === "elevated" || h.riskLevel === "high").reduce((s, h) => s + h.value, 0) / total;
  if (risky > 0.5) {
    out.push({ id: "risk", tone: "watch", title: `${pct(risky)} in assets rated elevated or high risk`, detail: "Based on Sensitor dossier risk levels. Size positions so that a deep drawdown remains tolerable.", concept: "drawdowns" });
  }

  return out;
}
