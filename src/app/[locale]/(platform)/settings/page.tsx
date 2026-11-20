import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getCoverageQuotes, getFearGreed, getGlobalMarket, getStablecoinOverview, totalMarketCapHistoryAvailable } from "@/lib/market/service";
import { PageHeader } from "@/components/ui/section-heading";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TimeAgo } from "@/components/ui/time-ago";
import { LocalDataControls } from "@/components/local-data-controls";
import { StorageNote } from "@/components/storage-note";
import { LanguageSwitcher } from "@/components/shell/language-switcher";
import { getLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALE_NAMES } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("settings", "/settings");
}

export default async function SettingsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale).settings;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Card>
        <CardHeader title={t.display.title} subtitle={t.display.subtitle} />
        <CardBody className="space-y-3 text-[13.5px]">
          <div className="flex items-center justify-between">
            <span className="text-fg-2">{t.display.theme}</span>
            <Badge tone="neutral">{t.display.dark}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-2">{t.display.currency}</span>
            <Badge tone="neutral">USD</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-2">{t.display.language}</span>
            <span className="flex items-center gap-2">
              <Badge tone="neutral">{LOCALE_NAMES[locale]}</Badge>
              <LanguageSwitcher className="h-7" />
            </span>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title={t.data.title} subtitle={<StorageNote variant="long" />} />
        <CardBody>
          <LocalDataControls />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title={t.providers.title} subtitle={t.providers.subtitle} />
        <CardBody>
          <Suspense fallback={<Skeleton className="h-28 w-full" />}>
            <ProviderStatus />
          </Suspense>
        </CardBody>
      </Card>
    </div>
  );
}

async function ProviderStatus() {
  await connection(); // market data is request-time: never fetched at build
  const [quotes, global, fng, stables] = await Promise.all([getCoverageQuotes(), getGlobalMarket(), getFearGreed(), getStablecoinOverview()]);
  const t = getDictionary(await getLocale()).settings.providers;
  const rows = [
    { label: t.rows.quotes, r: quotes },
    { label: t.rows.global, r: global },
    { label: t.rows.sentiment, r: fng },
    { label: t.rows.defi, r: stables },
  ];
  return (
    <ul className="divide-y divide-line text-[13.5px]">
      {rows.map(({ label, r }) => (
        <li key={label} className="flex items-center justify-between gap-3 py-2.5">
          <span className="text-fg-2">{label}</span>
          <span className="flex items-center gap-2 text-[12px] text-muted">
            {r.source?.name ?? "n/a"}
            {r.asOf ? <TimeAgo iso={r.asOf} /> : null}
            <Badge tone={r.status === "ok" ? "positive" : r.status === "partial" ? "warning" : "negative"}>{t.status[r.status] ?? r.status}</Badge>
          </span>
        </li>
      ))}
      <li className="flex items-center justify-between gap-3 py-2.5">
        <span className="text-fg-2">{t.history}</span>
        <Badge tone={totalMarketCapHistoryAvailable() ? "positive" : "outline"}>{totalMarketCapHistoryAvailable() ? t.enabled : t.requiresPro}</Badge>
      </li>
    </ul>
  );
}
