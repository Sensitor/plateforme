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

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow="Settings" title="Settings" description="Preferences, your data and the status of our data providers." />
      <Card>
        <CardHeader title="Display" subtitle="Interface preferences" />
        <CardBody className="space-y-3 text-[13.5px]">
          <div className="flex items-center justify-between">
            <span className="text-fg-2">Theme</span>
            <Badge tone="neutral">Dark (native)</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-2">Reference currency</span>
            <Badge tone="neutral">USD</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-2">Language</span>
            <Badge tone="neutral">English · French planned</Badge>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Your data" subtitle={<StorageNote variant="long" />} />
        <CardBody>
          <LocalDataControls />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Data providers" subtitle="Live status of the sources powering Sensitor" />
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
  const rows = [
    { label: "Project prices", r: quotes },
    { label: "Global market", r: global },
    { label: "Sentiment", r: fng },
    { label: "DeFi & stablecoins", r: stables },
  ];
  return (
    <ul className="divide-y divide-line text-[13.5px]">
      {rows.map(({ label, r }) => (
        <li key={label} className="flex items-center justify-between gap-3 py-2.5">
          <span className="text-fg-2">{label}</span>
          <span className="flex items-center gap-2 text-[12px] text-muted">
            {r.source?.name ?? "n/a"}
            {r.asOf ? <TimeAgo iso={r.asOf} /> : null}
            <Badge tone={r.status === "ok" ? "positive" : r.status === "partial" ? "warning" : "negative"}>{r.status}</Badge>
          </span>
        </li>
      ))}
      <li className="flex items-center justify-between gap-3 py-2.5">
        <span className="text-fg-2">Total market cap history</span>
        <Badge tone={totalMarketCapHistoryAvailable() ? "positive" : "outline"}>{totalMarketCapHistoryAvailable() ? "enabled" : "requires CoinGecko Pro"}</Badge>
      </li>
    </ul>
  );
}
