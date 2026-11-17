import { tint } from "@/lib/brand";
import { SectorBadge } from "@/components/ui/sector-badge";
import { connection } from "next/server";
import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { getCoverageQuotes } from "@/lib/market/service";
import { formatPrice } from "@/lib/format";
import { Delta } from "@/components/ui/delta";
import { TokenLogo } from "@/components/ui/token-logo";
import { WatchlistButton } from "@/components/watchlist-button";
import { SourceTag } from "@/components/ui/source-tag";
import { Skeleton } from "@/components/ui/skeleton";

function Artwork({ accent, seed }: { accent: string; seed: number }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute -right-6 -top-4 h-[170px] w-[240px] opacity-[0.35] transition-opacity duration-300 group-hover:opacity-50" viewBox="0 0 240 170" fill="none">
      {Array.from({ length: 11 }).map((_, i) => (
        <path
          key={i}
          d={`M ${20 + i * 14} 170 C ${90 + i * 6 + seed * 4} ${120 - i * 7}, ${150 + i * 4} ${70 - i * 4}, 240 ${12 + i * 7 + seed}`}
          stroke={accent}
          strokeWidth="1"
          opacity={1 - i * 0.07}
        />
      ))}
    </svg>
  );
}

export async function FeaturedProjects() {
  await connection(); // market data is request-time: never fetched at build
  const quotes = await getCoverageQuotes();
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {featured.map((p, i) => {
          const q = quotes.data?.[p.slug];
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group relative overflow-hidden rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
              style={{ backgroundImage: `radial-gradient(120% 90% at 100% 0%, ${tint(p.accent, 0.16)}, transparent 60%)` }}
            >
              <Artwork accent={p.accent} seed={i} />
              <div className="relative flex items-start justify-between">
                <TokenLogo src={p.logo} name={p.name} size={40} />
                <WatchlistButton slug={p.slug} name={p.name} className="bg-surface/60 backdrop-blur" />
              </div>
              <div className="relative mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[17px] font-semibold text-fg">{p.name}</span>
                  <span className="text-[13px] text-muted">{p.ticker}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2 truncate text-[12.5px] text-muted">
                  <SectorBadge sector={p.sector} />
                  <span className="truncate">{p.tags[0]}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="num text-xl text-fg">{formatPrice(q?.price)}</span>
                  <Delta value={q?.change24h} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <SourceTag result={quotes} className="mt-2" />
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-[168px] rounded-xl border border-line bg-surface p-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="mt-6 h-4 w-28" />
          <Skeleton className="mt-3 h-6 w-24" />
        </div>
      ))}
    </div>
  );
}
