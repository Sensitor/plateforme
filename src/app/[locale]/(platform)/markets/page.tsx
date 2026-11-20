import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "@/i18n/link";
import { KEY_DATES } from "@/content/key-dates";
import { PROJECT_BY_SLUG } from "@/content/projects";
import { SECTOR_COLORS } from "@/lib/brand";
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
import { CardSkeleton, Skeleton } from "@/components/ui/skeleton";
import { Stat, StatStrip } from "@/components/ui/stat-strip";
import { TokenLogo } from "@/components/ui/token-logo";
import { SectionHeader } from "@/components/overview/section-header";
import { Delta } from "@/components/ui/delta";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { BarList } from "@/components/charts/bar-list";
import { PriceChartCard, type ChartAsset } from "@/components/charts/price-chart-card";
import { CompactUsdArea } from "@/components/overview/compact-area";
import { Gauge } from "@/components/overview/gauge";
import { RegimeChart } from "@/components/markets/regime-chart";
import { FearGreedChart } from "@/components/markets/fear-greed-chart";

export const metadata: Metadata = { title: "Markets", description: "Market intelligence: capitalisation, dominance, sentiment, sectors, stablecoins and DeFi." };

export default function MarketsPage() {
  return (
    <div className="space-y-14">
      <header>
        <h1 className="serif-display text-[38px] leading-none text-fg md:text-[44px]">Market intelligence</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-2">
          The state of the digital-asset market from open data sources. Every indicator describes the current environment; none of them is a forecast.
        </p>
        <div className="mt-6">
          <Suspense fallback={<StripSkeleton />}>
            <GlobalStrip />
          </Suspense>
        </div>
      </header>

      <Suspense fallback={<Skeleton className="h-[340px] w-full rounded-lg" />}>
        <MarketChart />
      </Suspense>

      <div className="grid grid-cols-1 gap-x-10 gap-y-14 xl:grid-cols-2">
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

      <div className="grid grid-cols-1 gap-x-10 gap-y-14 xl:grid-cols-2">
        <Suspense fallback={<CardSkeleton lines={6} />}>
          <Stablecoins />
        </Suspense>
        <Suspense fallback={<CardSkeleton lines={6} />}>
          <Defi />
        </Suspense>
      </div>

      <SupplyCalendar />
    </div>
  );
}

function StripSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 border-y border-line py-5 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-7 w-28" />
        </div>
      ))}
    </div>
  );
}

async function GlobalStrip() {
  await connection(); // market data is request-time: never fetched at build
  const g = await getGlobalMarket();
  const d = g.data;
  const turnover = d?.totalVolume24h != null && d.totalMarketCap ? (d.totalVolume24h / d.totalMarketCap) * 100 : null;
  return (
    <div className="space-y-2">
      <DataNotice result={g} />
      <StatStrip columns={5}>
        <Stat label="Total market cap" value={formatUsdCompact(d?.totalMarketCap)}>
          <Delta value={d?.marketCapChange24h} className="text-[12.5px]" /> 24h
        </Stat>
        <Stat label="24h volume" value={formatUsdCompact(d?.totalVolume24h)}>
          {turnover != null ? `${formatPercent(turnover, { signed: false, digits: 1 })} of market cap` : "n/a"}
        </Stat>
        <Stat label="BTC dominance" value={formatPercent(d?.btcDominance, { signed: false, digits: 1 })}>
          Share of total market cap
        </Stat>
        <Stat label="ETH dominance" value={formatPercent(d?.ethDominance, { signed: false, digits: 1 })}>
          Share of total market cap
        </Stat>
        <Stat label="Tracked assets" value={formatNumber(d?.activeCryptocurrencies)}>
          Listed by CoinGecko
        </Stat>
      </StatStrip>
      <div className="flex justify-end">
        <SourceTag result={g} />
      </div>
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
    <div>
      <PriceChartCard assets={assets} initialAsset={assets[0].key} initialData={initial} height={280} />
      {!pro ? <p className="mt-2 text-[11px] text-subtle">Total market cap history is a CoinGecko Pro dataset, so asset prices are shown.</p> : null}
    </div>
  );
}

async function Sentiment() {
  await connection(); // market data is request-time: never fetched at build
  const fng = await getFearGreed();
  const now = fng.data?.[0];
  const ago = (n: number) => fng.data?.[n];
  return (
    <section id="sentiment" className="scroll-mt-24">
      <SectionHeader title="Sentiment" href="/academy/concepts/fear-and-greed" linkLabel="Lesson" />
      <p className="-mt-2 mb-5 text-[13px] text-muted">Crypto Fear & Greed Index, last 90 days.</p>
      <div>
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
              0-24 extreme fear · 25-49 fear · 50-74 greed · 75-100 extreme greed. Sentiment can stay extreme for long periods.
            </p>
          </>
        ) : (
          <DataNotice result={fng} />
        )}
        <SourceTag result={fng} className="mt-2" />
      </div>
    </section>
  );
}

async function Regime() {
  await connection(); // market data is request-time: never fetched at build
  const r = await getMarketRegime();
  const d = r.data;
  return (
    <section id="regime" className="scroll-mt-24">
      <SectionHeader title="Market regime" href="/academy/concepts/market-cycles" linkLabel="Lesson" />
      <p className="-mt-2 mb-5 text-[13px] text-muted">Bitcoin versus its 200-day moving average.</p>
      <div>
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
      </div>
    </section>
  );
}

async function SectorIntelligence() {
  await connection(); // market data is request-time: never fetched at build
  const quotes = await getCoverageQuotes();
  const rows = quotes.data ? sectorPerformance(quotes.data) : [];
  return (
    <section id="sectors" className="scroll-mt-24">
      <SectionHeader title="Sector intelligence" href="/explore" linkLabel="Explore projects" />
      <p className="-mt-2 mb-5 text-[13px] text-muted">Market-cap-weighted performance of the projects covered by Sensitor in each sector, not the whole sector.</p>
      <DataNotice result={quotes} className="mb-3" />
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[640px] border-y border-line text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-[10.5px] uppercase tracking-[0.1em] text-subtle">
                <th scope="col" className="py-2.5 font-medium">Sector</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Covered</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Market cap</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">24h</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">7d</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">30d</th>
                <th scope="col" className="py-2.5 pl-6 font-medium">Best 7d in coverage</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sector} className="border-b border-line/60 last:border-0 hover:bg-surface/70">
                  <td className="py-2.5">
                    <Link href={`/explore?sector=${r.sector}`} className="inline-flex items-center gap-2 text-fg hover:text-accent-strong">
                      <span className="size-2 rounded-full" style={{ backgroundColor: SECTOR_COLORS[r.sector] }} aria-hidden />
                      {r.label}
                    </Link>
                  </td>
                  <td className="num px-3 py-2.5 text-right text-muted">{r.count}</td>
                  <td className="num px-3 py-2.5 text-right text-fg-2">{formatUsdCompact(r.marketCap)}</td>
                  <td className="px-3 py-2.5 text-right"><Delta value={r.change24h} digits={1} /></td>
                  <td className="px-3 py-2.5 text-right"><Delta value={r.change7d} digits={1} /></td>
                  <td className="px-3 py-2.5 text-right"><Delta value={r.change30d} digits={1} /></td>
                  <td className="py-2.5 pl-6">
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
    <section id="stablecoins" className="scroll-mt-24">
      <SectionHeader title="Stablecoins" href="/academy/concepts/stablecoins" linkLabel="Lesson" />
      <p className="-mt-2 mb-5 text-[13px] text-muted">USD-pegged supply over three years.</p>
      <div>
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
                    <td className="py-2 text-muted">{t.pegMechanism ?? "n/a"}</td>
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
      </div>
    </section>
  );
}

async function Defi() {
  await connection(); // market data is request-time: never fetched at build
  const r = await getDefiOverview();
  const d = r.data;
  return (
    <section id="defi" className="scroll-mt-24">
      <SectionHeader title="DeFi" href="/academy/concepts/tvl" linkLabel="Lesson" />
      <p className="-mt-2 mb-5 text-[13px] text-muted">Total value locked over three years, and by chain.</p>
      <div>
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
      </div>
    </section>
  );
}

const KIND = { unlock: "Unlock", halving: "Halving", "vesting-end": "Vesting end" } as const;

/** Supply schedules from the dossiers, and the data sets not covered yet. */
function SupplyCalendar() {
  return (
    <section>
      <SectionHeader title="Supply calendar" href="/academy/concepts/token-unlocks" linkLabel="Lesson" />
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {KEY_DATES.map((d) => {
              const p = PROJECT_BY_SLUG[d.slug];
              return (
                <li key={`${d.slug}-${d.title}`}>
                  <Link href={`/projects/${d.slug}#tokenomics`} className="group grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-3 py-3">
                    <TokenLogo src={p?.logo} name={p?.name ?? d.slug} size={22} />
                    <span className="min-w-0">
                      <span className="block truncate text-[13.5px] text-fg group-hover:text-accent-strong">
                        {p?.name}: {d.title}
                      </span>
                      <span className="block text-[12px] text-muted">{d.when}</span>
                    </span>
                    <span className="text-[11.5px] text-subtle">{KIND[d.kind]}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-[11.5px] text-subtle">Schedules documented in the dossiers. Exact amounts per event require a licensed data feed.</p>
        </div>
        <aside>
          <h3 className="border-b border-line pb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Not covered yet</h3>
          <dl className="divide-y divide-line/70">
            <div className="py-3.5">
              <dt className="text-[13.5px] text-fg">Funding rates and derivatives</dt>
              <dd className="mt-1 text-[12.5px] leading-relaxed text-muted">Perpetual funding, open interest and liquidations need a derivatives data provider. Planned for Phase 2.</dd>
            </div>
            <div className="py-3.5">
              <dt className="text-[13.5px] text-fg">Economic and crypto events</dt>
              <dd className="mt-1 text-[12.5px] leading-relaxed text-muted">Macro releases and protocol events need a licensed calendar feed. Planned for Phase 2.</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
