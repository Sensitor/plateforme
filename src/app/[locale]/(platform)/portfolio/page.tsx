import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { PROJECTS } from "@/content/projects";
import { ECOSYSTEMS } from "@/content/relationships";
import { getCoverageQuotes } from "@/lib/market/service";
import { CHAINS } from "@/lib/research/taxonomy";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { STABLE_ASSET } from "@/lib/portfolio/engine";
import { PageHeader } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { PortfolioApp } from "@/components/portfolio/portfolio-app";
import type { AssetMeta } from "@/components/portfolio/types";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("portfolio", "/portfolio");
}

export default async function PortfolioPage() {
  const t = (await getT()).portfolio;
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <PortfolioData />
      </Suspense>
      <p className="text-[12px] leading-relaxed text-subtle">{t.footnote}</p>
    </div>
  );
}

async function PortfolioData() {
  await connection(); // live prices and today's date are request-time values
  const quotes = await getCoverageQuotes();
  const dict = await getT();
  const ecoOf = new Map<string, string>();
  for (const e of ECOSYSTEMS) for (const m of e.members) ecoOf.set(m, e.id);
  const assets: AssetMeta[] = [
    ...PROJECTS.map((p) => {
      const q = quotes.data?.[p.slug];
      return {
        slug: p.slug,
        name: p.name,
        ticker: p.ticker,
        logo: p.logo,
        sector: p.sector,
        sectorLabel: dict.labels.sectors[p.sector].label,
        chainLabel: CHAINS[p.chains[0]].label,
        ecosystem: ecoOf.get(p.slug) ?? null,
        riskLevel: p.riskLevel,
        price: q?.price ?? null,
        change24h: q?.change24h ?? null,
        volume24h: q?.volume24h ?? null,
      };
    }),
    { slug: STABLE_ASSET, name: dict.portfolio.stablecoinsUsd, ticker: "USD", logo: null, sector: null, sectorLabel: null, chainLabel: null, ecosystem: null, riskLevel: null, price: 1, change24h: 0, volume24h: null },
  ];
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <DataNotice result={quotes} />
      <PortfolioApp assets={assets} today={today} quoteSource={<SourceTag result={quotes} label={dict.ui.sources.prices} />} />
    </>
  );
}
