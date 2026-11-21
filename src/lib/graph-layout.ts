import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY, type SimulationLinkDatum, type SimulationNodeDatum } from "d3-force";
import { ECOSYSTEMS, RELATIONSHIPS, type RelationKind } from "@/content/relationships";
import { PROJECTS } from "@/content/projects";
import { localizedProjects } from "@/lib/research/localized";
import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import type { SectorId } from "@/lib/research/types";

export const GRAPH_WIDTH = 1000;
export const GRAPH_HEIGHT = 660;

export interface GraphNode {
  slug: string;
  name: string;
  ticker: string;
  logo: string;
  sector: SectorId;
  sectorLabel: string;
  oneLiner: string;
  ecosystem: string;
  marketCap: number | null;
  price: number | null;
  change24h: number | null;
  r: number;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  kind: RelationKind;
  note: string;
  evidence: string;
}

/** Ecosystem zone: drawn as the union of soft discs around its members. */
export interface GraphHalo {
  id: string;
  label: string;
  color: string;
  discs: { x: number; y: number; r: number }[];
}

const CENTERS: Record<string, { x: number; y: number; strength: number }> = {
  ethereum: { x: 400, y: 350, strength: 0.06 },
  solana: { x: 830, y: 300, strength: 0.1 },
  independent: { x: 620, y: 330, strength: 0.02 },
};

/** Node radius from market cap (log scale), so larger networks read as larger. */
export function radiusFor(marketCap: number | null): number {
  if (!marketCap || marketCap <= 0) return 20;
  const t = (Math.log10(marketCap) - 7.5) / (12.3 - 7.5);
  return Math.round(15 + Math.min(1, Math.max(0, t)) * 21);
}

type SimNode = SimulationNodeDatum & { id: string; r: number; eco: string };

/**
 * Deterministic force layout (d3-force uses a seeded random source), computed
 * on the server so the client renders exactly the same positions.
 */
export function buildGraph(market: Record<string, { marketCap: number | null; price: number | null; change24h: number | null }> | null, dict: Dictionary = getDictionary("en"), locale: Locale = "en") {
  const text = localizedProjects(locale);
  const ecoOf = new Map<string, string>();
  for (const e of ECOSYSTEMS) for (const m of e.members) ecoOf.set(m, e.id);

  const simNodes: SimNode[] = PROJECTS.map((p) => ({ id: p.slug, r: radiusFor(market?.[p.slug]?.marketCap ?? null), eco: ecoOf.get(p.slug) ?? "independent" }));
  const links: (SimulationLinkDatum<SimNode> & { kind: RelationKind })[] = RELATIONSHIPS.map((r) => ({ source: r.from, target: r.to, kind: r.kind }));

  const sim = forceSimulation<SimNode>(simNodes)
    .force(
      "link",
      forceLink<SimNode, SimulationLinkDatum<SimNode> & { kind: RelationKind }>(links)
        .id((d) => d.id)
        .distance((l) => (l.kind === "competitor" ? 220 : 140))
        .strength((l) => (l.kind === "competitor" ? 0.08 : 0.45)),
    )
    .force("charge", forceManyBody<SimNode>().strength(-700))
    .force("collide", forceCollide<SimNode>((d) => d.r + 40).strength(1))
    .force("x", forceX<SimNode>((d) => CENTERS[d.eco].x).strength((d) => CENTERS[d.eco].strength))
    .force("y", forceY<SimNode>((d) => CENTERS[d.eco].y).strength((d) => CENTERS[d.eco].strength))
    .stop();
  // Keep every node (and its label) inside the canvas at each step, so no
  // final rescaling is needed and collision spacing is preserved.
  const pad = 46;
  for (let i = 0; i < 480; i++) {
    sim.tick();
    for (const n of simNodes) {
      n.x = Math.min(GRAPH_WIDTH - pad - n.r, Math.max(pad + n.r, n.x ?? 0));
      // extra room at the bottom for the legend and labels
      n.y = Math.min(GRAPH_HEIGHT - pad - n.r - 34, Math.max(pad + n.r - 10, n.y ?? 0));
    }
  }

  const nodes: GraphNode[] = PROJECTS.map((p, i) => {
    const s = simNodes[i];
    const m = market?.[p.slug];
    return {
      slug: p.slug,
      name: p.name,
      ticker: p.ticker,
      logo: p.logo,
      sector: p.sector,
      sectorLabel: dict.labels.sectors[p.sector].label,
      oneLiner: text[i].oneLiner,
      ecosystem: s.eco,
      marketCap: m?.marketCap ?? null,
      price: m?.price ?? null,
      change24h: m?.change24h ?? null,
      r: s.r,
      x: Math.round((s.x ?? 0) * 10) / 10,
      y: Math.round((s.y ?? 0) * 10) / 10,
    };
  });

  const HALO_COLORS: Record<string, string> = { ethereum: "#7C93FF", solana: "#9C6BFF" };
  const halos: GraphHalo[] = ECOSYSTEMS.filter((e) => e.id !== "independent").map((e) => ({
    id: e.id,
    label: e.label,
    color: HALO_COLORS[e.id] ?? "#94A3B8",
    discs: nodes.filter((n) => n.ecosystem === e.id).map((n) => ({ x: n.x, y: n.y, r: n.r + 34 })),
  }));

  const edges: GraphEdge[] = RELATIONSHIPS.map((r) => ({ ...r }));
  return { nodes, edges, halos };
}
