import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { PROJECTS } from "@/content/projects";
import { getCoverageQuotes } from "@/lib/market/service";
import { PageHeader } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { AlertsApp, type AlertAsset } from "@/components/alerts/alerts-app";

export const metadata: Metadata = { title: "Alerts", description: "Price and volatility alerts on the projects Sensitor covers, in-app and by email." };

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Manage"
        title="Alerts"
        description="Get told when a covered project crosses a price level or moves sharply in 24 hours. In-app notifications, plus email if you opt in."
      />
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <AlertsData />
      </Suspense>
      <p className="text-[12px] leading-relaxed text-subtle">
        Alerts are informative. They never recommend buying or selling. A scheduled job checks prices from our market data providers (CoinGecko, with CoinPaprika as fallback) every few minutes, so a short spike
        between two checks can be missed and a notification can arrive a few minutes after the move.
      </p>
    </div>
  );
}

async function AlertsData() {
  await connection();
  const quotes = await getCoverageQuotes();
  const assets: AlertAsset[] = PROJECTS.map((p) => ({
    slug: p.slug,
    name: p.name,
    ticker: p.ticker,
    logo: p.logo,
    price: quotes.data?.[p.slug]?.price ?? null,
    change24h: quotes.data?.[p.slug]?.change24h ?? null,
  })).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <DataNotice result={quotes} />
      <AlertsApp assets={assets} quoteSource={<SourceTag result={quotes} label="Prices" />} />
    </>
  );
}
