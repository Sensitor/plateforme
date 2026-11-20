import { connection } from "next/server";
import Link from "@/i18n/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import { getCoverageQuotes } from "@/lib/market/service";
import { readableAccent, tint } from "@/lib/brand";
import { formatPrice } from "@/lib/format";
import { featuredDossierFor } from "@/lib/research/editorial";
import { SparkArea } from "@/components/charts/spark-area";
import { Delta } from "@/components/ui/delta";
import { SectorBadge } from "@/components/ui/sector-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { TokenLogo } from "@/components/ui/token-logo";
import { WatchlistButton } from "@/components/watchlist-button";

/** Selected projects: featured dossiers (minus today's lead) topped up by market cap. */
export async function ProjectTiles({ count = 4 }: { count?: number }) {
  await connection();
  const quotes = await getCoverageQuotes();
  const lead = featuredDossierFor(new Date()).slug;
  const cap = (slug: string) => quotes.data?.[slug]?.marketCap ?? 0;
  const featured = PROJECTS.filter((p) => p.featured && p.slug !== lead);
  const others = PROJECTS.filter((p) => !p.featured && p.slug !== lead).sort((a, b) => cap(b.slug) - cap(a.slug));
  const selection = [...featured, ...others].slice(0, count).sort((a, b) => cap(b.slug) - cap(a.slug));

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {selection.map((p) => {
          const q = quotes.data?.[p.slug];
          const color = readableAccent(p.accent);
          return (
            <div key={p.slug} className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-line-strong">
              <div className="relative h-[116px]" style={{ backgroundColor: tint(color, 0.07) }}>
                <div className="absolute inset-x-4 top-3.5 flex items-center justify-between">
                  <TokenLogo src={p.logo} name={p.name} size={30} />
                  <span className="num pr-8 text-[10px] uppercase tracking-wider text-subtle">{q?.sparkline7d ? "7d" : "7d n/a"}</span>
                </div>
                <SparkArea values={q?.sparkline7d} color={color} className="absolute inset-x-0 bottom-0 h-[58px] w-full" label={`${p.ticker} 7-day price trend`} />
              </div>
              <div className="absolute right-2 top-2.5 z-10">
                <WatchlistButton slug={p.slug} name={p.name} />
              </div>
              <Link href={`/projects/${p.slug}`} className="flex flex-1 flex-col p-4 after:absolute after:inset-0">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[15px] font-medium text-fg">{p.name}</span>
                  <span className="num text-[12px] text-muted">{p.ticker}</span>
                </span>
                <span className="mt-2">
                  <SectorBadge sector={p.sector} />
                </span>
                <span className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
                  <span className="num text-[16px] text-fg">{formatPrice(q?.price)}</span>
                  <span className="text-[12px] text-subtle">
                    <Delta value={q?.change24h} className="text-[12.5px]" /> 24h
                  </span>
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-fg-2 group-hover:text-accent-strong">
                  Read the dossier <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      <SourceTag result={quotes} className="mt-3" />
    </>
  );
}

export function ProjectTilesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-line">
          <Skeleton className="h-[116px] w-full rounded-none" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
