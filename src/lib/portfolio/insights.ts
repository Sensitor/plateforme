import { RELATIONSHIPS, RELATION_META } from "@/content/relationships";
import { KEY_DATES } from "@/content/key-dates";
import { concentrationLevel, STABLE_ASSET } from "./engine";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";

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

export function buildInsights(holdings: HoldingView[], names: Record<string, string>, dict: Dictionary = getDictionary("en")): Insight[] {
  const t = dict.portfolio.insights;
  const total = holdings.reduce((s, h) => s + h.value, 0);
  if (total <= 0) return [];
  const out: Insight[] = [];
  const sorted = [...holdings].sort((a, b) => b.value - a.value);

  // Concentration
  const level = concentrationLevel(holdings.map((h) => h.value));
  const top = sorted[0];
  const topW = top.value / total;
  if (level === "concentrated") {
    out.push({ id: "concentration", tone: "watch", title: t.concentrated(top.name, pct(topW)), detail: t.concentratedDetail, concept: "diversification" });
  } else {
    const top3 = sorted.slice(0, 3).reduce((s, h) => s + h.value, 0) / total;
    out.push({ id: "concentration", tone: "info", title: t.top3(pct(top3)), detail: level === "moderate" ? t.moderate : t.spread, concept: "diversification" });
  }

  // Stablecoin buffer
  const stable = holdings.filter((h) => h.asset === STABLE_ASSET).reduce((s, h) => s + h.value, 0) / total;
  out.push(
    stable === 0
      ? { id: "stables", tone: "info", title: t.noStables, detail: t.noStablesDetail, concept: "stablecoins" }
      : { id: "stables", tone: "info", title: t.stables(pct(stable)), detail: t.stablesDetail, concept: "stablecoins" },
  );

  // Sector exposure
  const bySector = new Map<string, number>();
  for (const h of holdings) if (h.sectorLabel) bySector.set(h.sectorLabel, (bySector.get(h.sectorLabel) ?? 0) + h.value);
  const [topSector, topSectorValue] = [...bySector.entries()].sort((a, b) => b[1] - a[1])[0] ?? [null, 0];
  if (topSector && topSectorValue / total > 0.5) {
    out.push({ id: "sector", tone: "watch", title: t.sector(pct(topSectorValue / total), topSector), detail: t.sectorDetail, concept: "diversification" });
  }

  // Ecosystem dependency
  const eth = holdings.filter((h) => h.ecosystem === "ethereum").reduce((s, h) => s + h.value, 0) / total;
  if (eth > 0.6) {
    out.push({ id: "ecosystem", tone: "watch", title: t.ethereum(pct(eth)), detail: t.ethereumDetail, concept: "layer-2-rollups" });
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
      title: t.dependency(list.length, names[target] ?? target),
      detail: t.dependencyDetail(list.join(", "), list.length, names[target] ?? target, held.has(target)),
      concept: "interoperability",
    });
    if (out.filter((i) => i.id.startsWith("dep-")).length >= 3) break;
  }
  const oracle = RELATIONSHIPS.filter((r) => r.kind === "uses-oracle" && held.has(r.from));
  for (const r of oracle) {
    const relationLabel = dict.graph.relations[r.kind]?.[0] ?? RELATION_META[r.kind].label;
    out.push({ id: `oracle-${r.from}`, tone: "info", title: t.oracle(names[r.from], names[r.to]), detail: t.oracleDetail(relationLabel), concept: "oracles" });
  }

  // Scheduled supply events
  const EVENT_DETAIL = t.events;
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
    out.push({ id: "liquidity", tone: "watch", title: t.liquidity(thin.map((h) => h.name).join(", ")), detail: t.liquidityDetail, concept: "drawdowns" });
  }

  // Risk profile
  const risky = holdings.filter((h) => h.riskLevel === "elevated" || h.riskLevel === "high").reduce((s, h) => s + h.value, 0) / total;
  if (risky > 0.5) {
    out.push({ id: "risk", tone: "watch", title: t.risk(pct(risky)), detail: t.riskDetail, concept: "drawdowns" });
  }

  return out;
}
