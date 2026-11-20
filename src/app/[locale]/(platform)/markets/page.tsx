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
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("markets", "/markets");
}

export default async function MarketsPage() {
  const t = (await getT()).markets;
  return (
    <div className="space-y-14">
      <header>
        <h1 className="serif-display text-[38px] leading-none text-fg md:text-[44px]">{t.title}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-2">{t.intro}</p>
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
  const t = (await getT()).markets.strip;
  const d = g.data;
  const turnover = d?.totalVolume24h != null && d.totalMarketCap ? (d.totalVolume24h / d.totalMarketCap) * 100 : null;
  return (
    <div className="space-y-2">
      <DataNotice result={g} />
      <StatStrip columns={5}>
        <Stat label={t.totalCap} value={formatUsdCompact(d?.totalMarketCap)}>
          <Delta value={d?.marketCapChange24h} className="text-[12.5px]" /> 24h
        </Stat>
        <Stat label={t.volume} value={formatUsdCompact(d?.totalVolume24h)}>
          {turnover != null ? t.ofCap(formatPercent(turnover, { signed: false, digits: 1 })) : "n/a"}
        </Stat>
        <Stat label={t.btcDominance} value={formatPercent(d?.btcDominance, { signed: false, digits: 1 })}>
          {t.share}
        </Stat>
        <Stat label={t.ethDominance} value={formatPercent(d?.ethDominance, { signed: false, digits: 1 })}>
          {t.share}
        </Stat>
        <Stat label={t.tracked} value={formatNumber(d?.activeCryptocurrencies)}>
          {t.listed}
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
  const t = (await getT()).markets.chart;
  const assets: ChartAsset[] = [
    ...(pro ? [{ key: "total-mcap", label: t.totalCap, format: "usd-compact" as const }] : []),
    { key: "bitcoin", label: "Bitcoin", format: "price" },
    { key: "ethereum", label: "Ethereum", format: "price" },
    { key: "solana", label: "Solana", format: "price" },
  ];
  const initial = pro ? await getTotalMarketCapHistory("1Y") : await getPriceHistory("bitcoin", "1Y");
  return (
    <div>
      <PriceChartCard assets={assets} initialAsset={assets[0].key} initialData={initial} height={280} />
      {!pro ? <p className="mt-2 text-[11px] text-subtle">{t.proNote}</p> : null}
    </div>
  );
}

async function Sentiment() {
  await connection(); // market data is request-time: never fetched at build
  const fng = await getFearGreed();
  const dict = await getT();
  const t = dict.markets.sentiment;
  const now = fng.data?.[0];
  const ago = (n: number) => fng.data?.[n];
  return (
    <section id="sentiment" className="scroll-mt-24">
      <SectionHeader title={t.title} href="/academy/concepts/fear-and-greed" linkLabel={dict.markets.lesson} />
      <p className="-mt-2 mb-5 text-[13px] text-muted">{t.intro}</p>
      <div>
        {fng.data ? (
          <>
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex items-end gap-3">
                <Gauge value={now!.value} size={84} label={t.gauge(now!.value)} />
                <div>
                  <div className="num text-3xl leading-none text-fg">{now!.value}</div>
                  <div className="mt-1 text-[13px] text-fg-2">{dict.ui.fearGreed[now!.classification] ?? now!.classification}</div>
                </div>
              </div>
              <dl className="grid grid-cols-3 gap-5 text-[12px]">
                {[
                  [t.yesterday, ago(1)],
                  [t.lastWeek, ago(7)],
                  [t.lastMonth, ago(30)],
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
              {t.scale}
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
  const dict = await getT();
  const t = dict.markets.regime;
  const d = r.data;
  return (
    <section id="regime" className="scroll-mt-24">
      <SectionHeader title={t.title} href="/academy/concepts/market-cycles" linkLabel={dict.markets.lesson} />
      <p className="-mt-2 mb-5 text-[13px] text-muted">{t.intro}</p>
      <div>
        {d ? (
          <>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className={cn("text-lg font-medium", d.regime === "above-200d" ? "text-positive" : "text-negative")}>
                {d.regime === "above-200d" ? t.above : t.below}
              </span>
              <span className="text-[13px] text-muted">
                {t.price} <span className="num text-fg-2">{formatPrice(d.price)}</span> · MA200 <span className="num text-fg-2">{formatPrice(d.ma200)}</span> · MA50{" "}
                <span className="num text-fg-2">{formatPrice(d.ma50)}</span>
              </span>
            </div>
            <div className="mt-4">
              <RegimeChart price={d.series} ma={d.maSeries} />
            </div>
            <p className="mt-2 text-[11.5px] text-subtle">{t.note}</p>
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
  const dict = await getT();
  const t = dict.markets.sectors;
  const rows = quotes.data ? sectorPerformance(quotes.data) : [];
  return (
    <section id="sectors" className="scroll-mt-24">
      <SectionHeader title={t.title} href="/explore" linkLabel={t.link} />
      <p className="-mt-2 mb-5 text-[13px] text-muted">{t.intro}</p>
      <DataNotice result={quotes} className="mb-3" />
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[640px] border-y border-line text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-[10.5px] uppercase tracking-[0.1em] text-subtle">
                <th scope="col" className="py-2.5 font-medium">{t.sector}</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.covered}</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.cap}</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">24h</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">7d</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">30d</th>
                <th scope="col" className="py-2.5 pl-6 font-medium">{t.best}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sector} className="border-b border-line/60 last:border-0 hover:bg-surface/70">
                  <td className="py-2.5">
                    <Link href={`/explore?sector=${r.sector}`} className="inline-flex items-center gap-2 text-fg hover:text-accent-strong">
                      <span className="size-2 rounded-full" style={{ backgroundColor: SECTOR_COLORS[r.sector] }} aria-hidden />
                      {dict.labels.sectors[r.sector].label}
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
  const dict = await getT();
  const t = dict.markets.stablecoins;
  const d = s.data;
  return (
    <section id="stablecoins" className="scroll-mt-24">
      <SectionHeader title={t.title} href="/academy/concepts/stablecoins" linkLabel={dict.markets.lesson} />
      <p className="-mt-2 mb-5 text-[13px] text-muted">{t.intro}</p>
      <div>
        {d ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="num text-2xl text-fg">{formatUsdCompact(d.totalCirculating)}</span>
              <Delta value={d.change30dPct} />
              <span className="text-xs text-subtle">30d</span>
            </div>
            <div className="mt-3">
              <CompactUsdArea data={d.series} label={t.chartLabel} id="stables-full" height={170} showAxes />
            </div>
            <table className="mt-4 w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-subtle">
                  <th scope="col" className="pb-2 font-medium">{t.name}</th>
                  <th scope="col" className="pb-2 font-medium">{t.mechanism}</th>
                  <th scope="col" className="pb-2 text-right font-medium">{t.supply}</th>
                  <th scope="col" className="pb-2 text-right font-medium">{t.share}</th>
                </tr>
              </thead>
              <tbody>
                {d.top.map((coin) => (
                  <tr key={coin.symbol} className="border-t border-line/70">
                    <td className="py-2 text-fg">
                      {coin.name} <span className="text-subtle">{coin.symbol}</span>
                    </td>
                    <td className="py-2 text-muted">{coin.pegMechanism ?? "n/a"}</td>
                    <td className="num py-2 text-right text-fg-2">{formatUsdCompact(coin.circulating)}</td>
                    <td className="num py-2 text-right text-muted">{formatPercent((coin.circulating / d.totalCirculating) * 100, { signed: false, digits: 1 })}</td>
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
  const dict = await getT();
  const t = dict.markets.defi;
  const d = r.data;
  return (
    <section id="defi" className="scroll-mt-24">
      <SectionHeader title={t.title} href="/academy/concepts/tvl" linkLabel={dict.markets.lesson} />
      <p className="-mt-2 mb-5 text-[13px] text-muted">{t.intro}</p>
      <div>
        {d ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="num text-2xl text-fg">{formatUsdCompact(d.totalTvl)}</span>
              <Delta value={d.change30dPct} />
              <span className="text-xs text-subtle">30d</span>
            </div>
            <div className="mt-3">
              <CompactUsdArea data={d.series} label={t.chartLabel} id="defi-full" height={170} showAxes />
            </div>
            <h3 className="mb-3 mt-5 text-[12px] font-medium uppercase tracking-[0.1em] text-muted">{t.byChain}</h3>
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

/** Supply schedules from the dossiers, and the data sets not covered yet. */
async function SupplyCalendar() {
  const dict = await getT();
  const t = dict.markets.calendar;
  return (
    <section>
      <SectionHeader title={t.title} href="/academy/concepts/token-unlocks" linkLabel={dict.markets.lesson} />
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
                    <span className="text-[11.5px] text-subtle">{dict.overview.calendar.kinds[d.kind]}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-[11.5px] text-subtle">{t.note}</p>
        </div>
        <aside>
          <h3 className="border-b border-line pb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{t.notCovered}</h3>
          <dl className="divide-y divide-line/70">
            {[t.derivatives, t.events].map(([title, text]) => (
              <div key={title} className="py-3.5">
                <dt className="text-[13.5px] text-fg">{title}</dt>
                <dd className="mt-1 text-[12.5px] leading-relaxed text-muted">{text}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
