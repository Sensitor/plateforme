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
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("alerts", "/alerts");
}

export default async function AlertsPage() {
  const t = (await getT()).alerts;
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <AlertsData />
      </Suspense>
      <p className="text-[12px] leading-relaxed text-subtle">{t.footnote}</p>
    </div>
  );
}

async function AlertsData() {
  await connection();
  const quotes = await getCoverageQuotes();
  const dict = await getT();
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
      <AlertsApp assets={assets} quoteSource={<SourceTag result={quotes} label={dict.ui.sources.prices} />} />
    </>
  );
}
