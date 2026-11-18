import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { PROJECTS } from "@/content/projects";
import { ECOSYSTEMS } from "@/content/relationships";
import { getCoverageQuotes } from "@/lib/market/service";
import { CHAINS, SECTOR_BY_ID } from "@/lib/research/taxonomy";
import { STABLE_ASSET } from "@/lib/portfolio/engine";
import { PageHeader } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { PortfolioApp } from "@/components/portfolio/portfolio-app";
import type { AssetMeta } from "@/components/portfolio/types";

export const metadata: Metadata = { title: "Portfolio", description: "Track your crypto positions and understand your exposures." };

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Manage"
        title="Portfolio Intelligence"
        description="Track your positions with live prices and understand what you are really exposed to: concentration, sectors, ecosystems, shared dependencies, correlations and unlocks."
      />
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <PortfolioData />
      </Suspense>
      <p className="text-[12px] leading-relaxed text-subtle">
        Portfolio Intelligence is an educational tracking tool. It does not provide investment advice, does not execute transactions and does not connect to wallets or
        exchanges. As a guest your data stays in this browser and clearing site data deletes it; signed in, it syncs to your account. Export a CSV backup regularly either way.
      </p>
    </div>
  );
}

async function PortfolioData() {
  await connection(); // live prices and today's date are request-time values
  const quotes = await getCoverageQuotes();
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
        sectorLabel: SECTOR_BY_ID[p.sector].label,
        chainLabel: CHAINS[p.chains[0]].label,
        ecosystem: ecoOf.get(p.slug) ?? null,
        riskLevel: p.riskLevel,
        price: q?.price ?? null,
        change24h: q?.change24h ?? null,
        volume24h: q?.volume24h ?? null,
      };
    }),
    { slug: STABLE_ASSET, name: "Stablecoins (USD)", ticker: "USD", logo: null, sector: null, sectorLabel: null, chainLabel: null, ecosystem: null, riskLevel: null, price: 1, change24h: 0, volume24h: null },
  ];
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <DataNotice result={quotes} />
      <PortfolioApp assets={assets} today={today} quoteSource={<SourceTag result={quotes} label="Prices" />} />
    </>
  );
}
