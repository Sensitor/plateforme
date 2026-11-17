import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PROJECTS } from "@/content/projects";
import { getCoverageQuotes } from "@/lib/market/service";
import { SECTOR_BY_ID } from "@/lib/research/taxonomy";
import { PageHeader } from "@/components/ui/section-heading";
import { CardSkeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { WatchlistTable, type WatchRow } from "@/components/watchlist-table";

export const metadata: Metadata = { title: "Watchlist" };

export default function WatchlistPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Manage"
        title="Watchlist"
        description="Projects you follow. In guest mode your watchlist is stored in this browser only; it will sync to your account once sign-in is enabled."
      />
      <Suspense fallback={<CardSkeleton lines={6} />}>
        <WatchlistData />
      </Suspense>
    </div>
  );
}

async function WatchlistData() {
  await connection(); // market data is request-time: never fetched at build
  const quotes = await getCoverageQuotes();
  const rows: WatchRow[] = PROJECTS.map((p) => {
    const q = quotes.data?.[p.slug];
    return {
      slug: p.slug,
      name: p.name,
      ticker: p.ticker,
      logo: p.logo,
      sector: SECTOR_BY_ID[p.sector].label,
      price: q?.price ?? null,
      change24h: q?.change24h ?? null,
      change7d: q?.change7d ?? null,
      marketCap: q?.marketCap ?? null,
      sparkline: q?.sparkline7d ?? null,
    };
  });
  return (
    <>
      <WatchlistTable rows={rows} />
      <SourceTag result={quotes} />
    </>
  );
}
