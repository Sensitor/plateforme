import "server-only";
import { localizedProjects } from "@/lib/research/localized";
import type { Locale } from "@/i18n/config";
import { compositeScore, dossierCoverage } from "@/lib/research/framework";
import { CHAINS } from "@/lib/research/taxonomy";
import type { Quote } from "@/lib/market/types";
import type { ExploreRow } from "@/lib/explore";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";

/** Combine research metadata with live quotes and TVL into table rows. */
export function buildExploreRows(quotes: Record<string, Quote> | null, tvl: Record<string, number | null> | null, dict: Dictionary = getDictionary("en"), locale: Locale = "en"): ExploreRow[] {
  return localizedProjects(locale).map((p) => {
    const q = quotes?.[p.slug];
    const composite = compositeScore(p.dossier.framework);
    return {
      slug: p.slug,
      name: p.name,
      ticker: p.ticker,
      logo: p.logo,
      oneLiner: p.oneLiner,
      sector: p.sector,
      sectorLabel: dict.labels.sectors[p.sector].label,
      chains: p.chains,
      chainLabel: CHAINS[p.chains[0]].label,
      riskLevel: p.riskLevel,
      maturity: p.maturity,
      coverage: dossierCoverage(p).level,
      score: composite.score,
      scoreNote: composite.withheldReason,
      editorialStatus: p.editorial.status,
      price: q?.price ?? null,
      change24h: q?.change24h ?? null,
      change7d: q?.change7d ?? null,
      marketCap: q?.marketCap ?? null,
      fdv: q?.fdv ?? null,
      volume24h: q?.volume24h ?? null,
      tvl: tvl?.[p.slug] ?? null,
      sparkline: q?.sparkline7d ?? null,
    };
  });
}
