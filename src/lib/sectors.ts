import { PROJECTS } from "@/content/projects";
import { SECTOR_BY_ID } from "@/lib/research/taxonomy";
import type { SectorId } from "@/lib/research/types";
import type { Quote } from "@/lib/market/types";

export interface SectorPerformance {
  sector: SectorId;
  label: string;
  count: number;
  marketCap: number;
  change24h: number | null;
  change7d: number | null;
  change30d: number | null;
  leader: { slug: string; name: string; change7d: number | null } | null;
}

/** Market-cap-weighted change of covered projects; null when no data. */
function weighted(items: { cap: number; chg: number | null }[]): number | null {
  const valid = items.filter((i) => i.chg != null && i.cap > 0);
  const total = valid.reduce((s, i) => s + i.cap, 0);
  if (!total) return null;
  return valid.reduce((s, i) => s + i.cap * (i.chg as number), 0) / total;
}

/**
 * Sector performance across the Sensitor coverage universe (not the whole
 * market). Labelled as such wherever it is displayed.
 */
export function sectorPerformance(quotes: Record<string, Quote>): SectorPerformance[] {
  const bySector = new Map<SectorId, { slug: string; name: string; q: Quote }[]>();
  for (const p of PROJECTS) {
    const q = quotes[p.slug];
    if (!q?.marketCap) continue;
    const list = bySector.get(p.sector) ?? [];
    list.push({ slug: p.slug, name: p.name, q });
    bySector.set(p.sector, list);
  }
  return [...bySector.entries()]
    .map(([sector, list]) => {
      const sorted = [...list].sort((a, b) => (b.q.change7d ?? -Infinity) - (a.q.change7d ?? -Infinity));
      return {
        sector,
        label: SECTOR_BY_ID[sector].label,
        count: list.length,
        marketCap: list.reduce((s, x) => s + (x.q.marketCap ?? 0), 0),
        change24h: weighted(list.map((x) => ({ cap: x.q.marketCap ?? 0, chg: x.q.change24h }))),
        change7d: weighted(list.map((x) => ({ cap: x.q.marketCap ?? 0, chg: x.q.change7d }))),
        change30d: weighted(list.map((x) => ({ cap: x.q.marketCap ?? 0, chg: x.q.change30d }))),
        leader: sorted[0] ? { slug: sorted[0].slug, name: sorted[0].name, change7d: sorted[0].q.change7d } : null,
      };
    })
    .sort((a, b) => (b.change7d ?? -Infinity) - (a.change7d ?? -Infinity));
}
