import { connection } from "next/server";
import Link from "@/i18n/link";
import { PROJECTS } from "@/content/projects";
import { SECTOR_COLORS } from "@/lib/brand";
import { formatUsdCompact } from "@/lib/format";
import { buildDevelopments } from "@/lib/overview";
import { sectorPerformance } from "@/lib/sectors";
import {
  getAltcoinBreadth,
  getCoverageQuotes,
  getDefiOverview,
  getFearGreed,
  getMarketRegime,
  getPriceHistory,
  getStablecoinOverview,
  getTotalMarketCapHistory,
  totalMarketCapHistoryAvailable,
} from "@/lib/market/service";
import { PriceChartCard, type ChartAsset } from "@/components/charts/price-chart-card";
import { Delta } from "@/components/ui/delta";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { TimeAgo } from "@/components/ui/time-ago";
import { PanelLabel } from "./section-header";

/** Compact history chart: total market cap with a CoinGecko Pro key, otherwise BTC and ETH. */
export async function MarketChart() {
  await connection();
  const proTotal = totalMarketCapHistoryAvailable();
  const assets: ChartAsset[] = [
    ...(proTotal ? [{ key: "total-mcap", label: "Total market cap", format: "usd-compact" as const }] : []),
    { key: "bitcoin", label: "BTC", format: "price" },
    { key: "ethereum", label: "ETH", format: "price" },
    { key: "solana", label: "SOL", format: "price" },
  ];
  const initial = proTotal ? await getTotalMarketCapHistory("3M") : await getPriceHistory("bitcoin", "3M");
  return (
    <div>
      <PriceChartCard assets={assets} initialAsset={assets[0].key} initialRange="3M" initialData={initial} height={200} />
      {!proTotal ? <p className="mt-1 text-[11px] text-subtle">Total market cap history is a CoinGecko Pro dataset, so asset prices are shown.</p> : null}
    </div>
  );
}

/** Sector performance across the Sensitor coverage, as a table. */
export async function SectorTable({ limit = 8 }: { limit?: number }) {
  await connection();
  const quotes = await getCoverageQuotes();
  const rows = quotes.data ? sectorPerformance(quotes.data).slice(0, limit) : [];
  return (
    <div>
      <div className="flex items-end justify-between gap-3 border-b border-line pb-3">
        <PanelLabel>Sector performance</PanelLabel>
        <span className="text-[11px] text-subtle">Market-cap weighted, {PROJECTS.length} covered projects</span>
      </div>
      {rows.length ? (
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-[13px]">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-[0.1em] text-subtle">
                <th scope="col" className="py-2.5 font-medium">Sector</th>
                <th scope="col" className="py-2.5 text-right font-medium">Mkt cap</th>
                <th scope="col" className="py-2.5 text-right font-medium">24h</th>
                <th scope="col" className="py-2.5 text-right font-medium">7d</th>
                <th scope="col" className="py-2.5 text-right font-medium">30d</th>
                <th scope="col" className="hidden py-2.5 pl-6 font-medium md:table-cell">Best 7d</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70">
              {rows.map((r) => (
                <tr key={r.sector}>
                  <td className="py-2.5">
                    <Link href={`/explore?sector=${r.sector}`} className="inline-flex items-center gap-2 text-fg hover:text-accent-strong">
                      <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: SECTOR_COLORS[r.sector] }} aria-hidden />
                      {r.label}
                      <span className="num text-[11px] text-subtle">{r.count}</span>
                    </Link>
                  </td>
                  <td className="num py-2.5 text-right text-fg-2">{formatUsdCompact(r.marketCap)}</td>
                  <td className="py-2.5 text-right">
                    <Delta value={r.change24h} digits={1} className="text-[12.5px]" />
                  </td>
                  <td className="py-2.5 text-right">
                    <Delta value={r.change7d} digits={1} className="text-[12.5px]" />
                  </td>
                  <td className="py-2.5 text-right">
                    <Delta value={r.change30d} digits={1} className="text-[12.5px]" />
                  </td>
                  <td className="hidden truncate py-2.5 pl-6 text-fg-2 md:table-cell">
                    {r.leader ? (
                      <Link href={`/projects/${r.leader.slug}`} className="hover:text-fg">
                        {r.leader.name}
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
      ) : (
        <p className="py-6 text-[13px] text-muted">{quotes.note ?? "Sector data unavailable right now."}</p>
      )}
      <SourceTag result={quotes} className="mt-2" />
    </div>
  );
}

/** Market developments computed from live data, each with its source and time. */
export async function Developments() {
  await connection();
  const [regime, breadth, fng, stables, defi, quotes] = await Promise.all([getMarketRegime(), getAltcoinBreadth(), getFearGreed(), getStablecoinOverview(), getDefiOverview(), getCoverageQuotes()]);
  const names = Object.fromEntries(PROJECTS.map((p) => [p.slug, p.name]));
  const items = buildDevelopments({ regime, breadth, fng, stables, defi, quotes, names });
  return (
    <div>
      <div className="border-b border-line pb-3">
        <PanelLabel>Developments</PanelLabel>
      </div>
      {items.length ? (
        <ol className="divide-y divide-line/70">
          {items.map((d) => (
            <li key={d.id} className="py-3.5">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="font-medium uppercase tracking-[0.12em] text-accent">{d.topic}</span>
                <span className="text-subtle">
                  {d.source ? (
                    <a href={d.source.url} target="_blank" rel="noopener noreferrer" className="hover:text-muted">
                      {d.source.name}
                    </a>
                  ) : null}
                  {d.asOf ? (
                    <>
                      {" · "}
                      <TimeAgo iso={d.asOf} />
                    </>
                  ) : null}
                </span>
              </div>
              <Link href={d.href} className="mt-1.5 block text-[13.5px] leading-relaxed text-fg-2 hover:text-fg">
                {d.text}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="py-6 text-[13px] text-muted">Market data providers are unavailable right now.</p>
      )}
      <p className="mt-1 text-[11px] leading-relaxed text-subtle">Computed automatically from provider data. Descriptive, never a forecast or a recommendation.</p>
    </div>
  );
}

export function PanelSkeleton({ rows = 6, chart = false }: { rows?: number; chart?: boolean }) {
  return (
    <div>
      {chart ? <Skeleton className="h-[260px] w-full rounded-lg" /> : <Skeleton className="h-3 w-32" />}
      {!chart ? (
        <div className="mt-4 space-y-3.5">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
