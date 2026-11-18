import { connection } from "next/server";
import { PROJECTS } from "@/content/projects";
import { getCoverageQuotes } from "@/lib/market/service";
import { SourceTag } from "@/components/ui/source-tag";
import { Skeleton } from "@/components/ui/skeleton";
import { MarketWatchPanel, type WatchRow } from "./market-watch-panel";

/** Leading covered assets by market cap, with a tab for the user's watchlist. */
export async function MarketWatch({ leaders = 9 }: { leaders?: number }) {
  await connection();
  const quotes = await getCoverageQuotes();
  const rows: WatchRow[] = PROJECTS.map((p) => {
    const q = quotes.data?.[p.slug];
    return { slug: p.slug, name: p.name, ticker: p.ticker, logo: p.logo, price: q?.price ?? null, change24h: q?.change24h ?? null, marketCap: q?.marketCap ?? null, spark: q?.sparkline7d ?? null };
  });
  const order = [...rows].filter((r) => r.marketCap != null).sort((a, b) => b.marketCap! - a.marketCap!).slice(0, leaders).map((r) => r.slug);
  return (
    <MarketWatchPanel
      rows={rows}
      leaders={order}
      unavailable={quotes.status === "unavailable" ? (quotes.note ?? "Market data unavailable right now.") : null}
      source={<SourceTag result={quotes} />}
    />
  );
}

export function MarketWatchSkeleton() {
  return (
    <div>
      <Skeleton className="h-3 w-28" />
      <div className="mt-5 space-y-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
