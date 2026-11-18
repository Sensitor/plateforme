import { SectorBadge } from "@/components/ui/sector-badge";
import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Percent } from "lucide-react";
import {
  getCoverageQuotes,
  getDefiOverview,
  getFearGreed,
  getGlobalMarket,
  getMarketRegime,
  getPriceHistory,
  getStablecoinOverview,
  getTotalMarketCapHistory,
  totalMarketCapHistoryAvailable,
} from "@/lib/market/service";
import { sectorPerformance } from "@/lib/sectors";
import { formatNumber, formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { PageHeader, SectionTitle } from "@/components/ui/section-heading";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { Delta } from "@/components/ui/delta";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { Badge } from "@/components/ui/badge";
import { BarList } from "@/components/charts/bar-list";
import { PriceChartCard, type ChartAsset } from "@/components/charts/price-chart-card";
import { CompactUsdArea } from "@/components/overview/compact-area";
import { Gauge } from "@/components/overview/gauge";
import { RegimeChart } from "@/components/markets/regime-chart";
import { FearGreedChart } from "@/components/markets/fear-greed-chart";
import { KeyDatesCard } from "@/components/overview/key-dates-card";

export const metadata: Metadata = { title: "Markets", description: "Market intelligence: capitalisation, dominance, sentiment, sectors, stablecoins and DeFi." };

export default function MarketsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Discover"
        title="Market Intelligence"
        description="The state of the digital-asset market from open data sources. Indicators describe the current environment, they are not forecasts."
      />
      <Suspense fallback={<CardSkeleton lines={2} />}>
        <GlobalStrip />
      </Suspense>
      <Suspense fallback={<CardSkeleton className="h-[360px]" lines={6} />}>
        <MarketChart />
      </Suspense>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Suspense fallback={<CardSkeleton lines={6} />}>
          <Sentiment />
        </Suspense>
        <Suspense fallback={<CardSkeleton lines={6} />}>
          <Regime />
        </Suspense>
      </div>
      <Suspense fallback={<CardSkeleton lines={8} />}>
        <SectorIntelligence />
      </Suspense>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Suspense fallback={<CardSkeleton lines={6} />}>
          <Stablecoins />
        </Suspense>
        <Suspense fallback={<CardSkeleton lines={6} />}>
          <Defi />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <NotYetAvailable
          icon={<Percent className="size-4" />}
          title="Funding rates & derivatives"
          text="Perpetual funding rates, open interest and liquidations require a derivatives data provider. Planned for Phase 2 (Intelligence)."
        />
        <NotYetAvailable
          icon={<CalendarDays className="size-4" />}
          title="Economic & crypto events calendar"
          text="Macro releases (CPI, FOMC) and protocol events need a licensed calendar feed. Planned for Phase 2. Known supply schedules from our dossiers are listed alongside."
        />
        <KeyDatesCard />
      </div>
    </div>
  );
}

async function GlobalStrip() {
  await connection(); // market data is request-time: never fetched at build
  const g = await getGlobalMarket();
  const d = g.data;
  const items = [
    { label: "Total market cap", value: formatUsdCompact(d?.totalMarketCap), sub: <Delta value={d?.marketCapChange24h} className="text-[12px]" /> },
    { label: "24h volume", value: formatUsdCompact(d?.totalVolume24h) },
    { label: "BTC dominance", value: formatPercent(d?.btcDominance, { signed: false, digits: 1 }) },
    { label: "ETH dominance", value: formatPercent(d?.ethDominance, { signed: false, digits: 1 }) },
    { label: "Tracked assets", value: formatNumber(d?.activeCryptocurrencies) },
  ];
  return (
    <div className="space-y-2">
      <DataNotice result={g} />
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-5">
        {items.map((i) => (
          <div key={i.label} className="bg-surface px-4 py-3.5">
            <div className="text-[12px] text-muted">{i.label}</div>
            <div className="num mt-1 text-xl text-fg">{i.value}</div>
            {i.sub ? <div className="mt-0.5">{i.sub} <span className="text-[11px] text-subtle">24h</span></div> : null}
          </div>
        ))}
      </div>
      <SourceTag result={g} />
    </div>
  );
}

async function MarketChart() {
  await connection(); // market data is request-time: never fetched at build
  const pro = totalMarketCapHistoryAvailable();
  const assets: ChartAsset[] = [
    ...(pro ? [{ key: "total-mcap", label: "Total market cap", format: "usd-compact" as const }] : []),
    { key: "bitcoin", label: "Bitcoin", format: "price" },
    { key: "ethereum", label: "Ethereum", format: "price" },
    { key: "solana", label: "Solana", format: "price" },
  ];
  const initial = pro ? await getTotalMarketCapHistory("1Y") : await getPriceHistory("bitcoin", "1Y");
  return (
    <Card className="p-5">
      <PriceChartCard assets={assets} initialAsset={assets[0].key} initialData={initial} height={280} />
      {!pro ? <p className="mt-2 text-[11px] text-subtle">Historical total market cap requires a CoinGecko Pro plan (set COINGECKO_PRO_API_KEY).</p> : null}
    </Card>
  );
}

async function Sentiment() {
  await connection(); // market data is request-time: never fetched at build
  const fng = await getFearGreed();
  const now = fng.data?.[0];
  const ago = (n: number) => fng.data?.[n];
  return (
    <Card id="sentiment" className="scroll-mt-24">
      <CardHeader title="Market sentiment" subtitle="Crypto Fear & Greed Index, 90 days" />
      <CardBody>
        {fng.data ? (
          <>
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex items-end gap-3">
                <Gauge value={now!.value} size={84} label={`Fear and Greed ${now!.value}`} />
                <div>
                  <div className="num text-3xl leading-none text-fg">{now!.value}</div>
                  <div className="mt-1 text-[13px] text-fg-2">{now!.classification}</div>
                </div>
              </div>
              <dl className="grid grid-cols-3 gap-5 text-[12px]">
                {[
                  ["Yesterday", ago(1)],
                  ["Last week", ago(7)],
                  ["Last month", ago(30)],
                ].map(([l, p]) => (
                  <div key={l as string}>
                    <dt className="text-subtle">{l as string}</dt>
                    <dd className="num text-fg-2">{(p as { value: number } | undefined)?.value ?? "n/a"}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-5">
              <FearGreedChart points={fng.data} />
            </div>
            <p className="mt-2 text-[11.5px] text-subtle">
              0-24 extreme fear · 25-49 fear · 50-74 greed · 75-100 extreme greed. Sentiment can stay extreme for long periods.{" "}
              <Link href="/academy/concepts/fear-and-greed" className="text-accent hover:text-accent-strong">
                Learn more
              </Link>
            </p>
          </>
        ) : (
          <DataNotice result={fng} />
        )}
        <SourceTag result={fng} className="mt-2" />
      </CardBody>
    </Card>
  );
}

async function Regime() {
  await connection(); // market data is request-time: never fetched at build
  const r = await getMarketRegime();
  const d = r.data;
  return (
    <Card id="regime" className="scroll-mt-24">
      <CardHeader title="Market regime" subtitle="Bitcoin vs its 200-day moving average" />
      <CardBody>
        {d ? (
          <>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className={cn("text-lg font-medium", d.regime === "above-200d" ? "text-positive" : "text-negative")}>
                {d.regime === "above-200d" ? "Above the 200-day MA" : "Below the 200-day MA"}
              </span>
              <span className="text-[13px] text-muted">
                Price <span className="num text-fg-2">{formatPrice(d.price)}</span> · MA200 <span className="num text-fg-2">{formatPrice(d.ma200)}</span> · MA50{" "}
                <span className="num text-fg-2">{formatPrice(d.ma50)}</span>
              </span>
            </div>
            <div className="mt-4">
              <RegimeChart price={d.series} ma={d.maSeries} />
            </div>
            <p className="mt-2 text-[11.5px] text-subtle">A widely used trend filter: it describes the regime, it does not predict it. Daily closes from DefiLlama.</p>
          </>
        ) : (
          <DataNotice result={r} />
        )}
        <SourceTag result={r} className="mt-2" />
      </CardBody>
    </Card>
  );
}

async function SectorIntelligence() {
  await connection(); // market data is request-time: never fetched at build
  const quotes = await getCoverageQuotes();
  const rows = quotes.data ? sectorPerformance(quotes.data) : [];
  return (
    <section id="sectors" className="scroll-mt-24">
      <SectionTitle title="Sector intelligence" description="Market-cap-weighted performance of the projects covered by Sensitor in each sector, not the whole sector." />
      <DataNotice result={quotes} className="mb-3" />
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[640px] text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-[11px] uppercase tracking-wide text-subtle">
                <th scope="col" className="py-2.5 pl-4 font-medium">Sector</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Covered</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Market cap</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">24h</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">7d</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">30d</th>
                <th scope="col" className="px-3 py-2.5 pr-4 font-medium">Best 7d in coverage</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sector} className="border-b border-line/70 last:border-0 hover:bg-surface-2">
                  <td className="py-3 pl-4">
                    <SectorBadge sector={r.sector} href={`/explore?sector=${r.sector}`} size="md" />
                  </td>
                  <td className="num px-3 py-3 text-right text-muted">{r.count}</td>
                  <td className="num px-3 py-3 text-right text-fg-2">{formatUsdCompact(r.marketCap)}</td>
                  <td className="px-3 py-3 text-right"><Delta value={r.change24h} /></td>
                  <td className="px-3 py-3 text-right"><Delta value={r.change7d} /></td>
                  <td className="px-3 py-3 text-right"><Delta value={r.change30d} /></td>
                  <td className="px-3 py-3 pr-4">
                    {r.leader ? (
                      <Link href={`/projects/${r.leader.slug}`} className="text-fg-2 hover:text-fg">
                        {r.leader.name} <Delta value={r.leader.change7d} className="ml-1 text-[12px]" />
                      </Link>
                    ) : (
                      "n/a"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SourceTag result={quotes} className="mt-2" />
    </section>
  );
}

async function Stablecoins() {
  await connection(); // market data is request-time: never fetched at build
  const s = await getStablecoinOverview();
  const d = s.data;
  return (
    <Card id="stablecoins" className="scroll-mt-24">
      <CardHeader title="Stablecoin market" subtitle="USD-pegged supply, 3 years" />
      <CardBody>
        {d ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="num text-2xl text-fg">{formatUsdCompact(d.totalCirculating)}</span>
              <Delta value={d.change30dPct} />
              <span className="text-xs text-subtle">30d</span>
            </div>
            <div className="mt-3">
              <CompactUsdArea data={d.series} label="Stablecoin supply, 3 years" id="stables-full" height={170} showAxes />
            </div>
            <table className="mt-4 w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-subtle">
                  <th scope="col" className="pb-2 font-medium">Stablecoin</th>
                  <th scope="col" className="pb-2 font-medium">Mechanism</th>
                  <th scope="col" className="pb-2 text-right font-medium">Supply</th>
                  <th scope="col" className="pb-2 text-right font-medium">Share</th>
                </tr>
              </thead>
              <tbody>
                {d.top.map((t) => (
                  <tr key={t.symbol} className="border-t border-line/70">
                    <td className="py-2 text-fg">
                      {t.name} <span className="text-subtle">{t.symbol}</span>
                    </td>
                    <td className="py-2">
                      <Badge tone="outline">{t.pegMechanism ?? "n/a"}</Badge>
                    </td>
                    <td className="num py-2 text-right text-fg-2">{formatUsdCompact(t.circulating)}</td>
                    <td className="num py-2 text-right text-muted">{formatPercent((t.circulating / d.totalCirculating) * 100, { signed: false, digits: 1 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <DataNotice result={s} />
        )}
        <SourceTag result={s} className="mt-3" />
      </CardBody>
    </Card>
  );
}

async function Defi() {
  await connection(); // market data is request-time: never fetched at build
  const r = await getDefiOverview();
  const d = r.data;
  return (
    <Card id="defi" className="scroll-mt-24">
      <CardHeader title="DeFi market" subtitle="Total value locked, 3 years" />
      <CardBody>
        {d ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="num text-2xl text-fg">{formatUsdCompact(d.totalTvl)}</span>
              <Delta value={d.change30dPct} />
              <span className="text-xs text-subtle">30d</span>
            </div>
            <div className="mt-3">
              <CompactUsdArea data={d.series} label="DeFi TVL, 3 years" id="defi-full" height={170} showAxes />
            </div>
            <h3 className="mb-3 mt-5 text-[12px] font-medium uppercase tracking-[0.1em] text-muted">TVL by chain</h3>
            <BarList format={formatUsdCompact} items={d.topChains.map((c) => ({ key: c.name, label: c.name, value: c.tvl }))} />
          </>
        ) : (
          <DataNotice result={r} />
        )}
        <SourceTag result={r} className="mt-3" />
      </CardBody>
    </Card>
  );
}

function NotYetAvailable({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <Card className="border-dashed">
      <CardHeader title={title} icon={icon} action={<Badge tone="outline">Phase 2</Badge>} />
      <CardBody>
        <p className="text-[13px] leading-relaxed text-muted">{text}</p>
      </CardBody>
    </Card>
  );
}
