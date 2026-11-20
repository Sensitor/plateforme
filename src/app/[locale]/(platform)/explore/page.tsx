import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "@/i18n/link";
import { BookOpenCheck, Scale } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { DataNotice } from "@/components/ui/data-notice";
import { Delta } from "@/components/ui/delta";
import { SourceTag } from "@/components/ui/source-tag";
import { Skeleton } from "@/components/ui/skeleton";
import { Stat, StatStrip } from "@/components/ui/stat-strip";
import { ProjectsExplorer } from "@/components/explore/projects-explorer";
import { getCoverageQuotes, getCoverageTvl } from "@/lib/market/service";
import { buildExploreRows } from "@/lib/projects-view";
import { coverageSummary } from "@/lib/explore";
import { formatPercent, formatUsdCompact } from "@/lib/format";
import { PROJECTS } from "@/content/projects";
import { SECTORS } from "@/lib/research/taxonomy";

export const metadata: Metadata = {
  title: "Explore Projects",
  description: "A documented library of crypto projects organised by sector, technology and blockchain.",
};

export default function ExplorePage() {
  const sectors = new Set(PROJECTS.map((p) => p.sector)).size;
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="serif-display text-[38px] leading-none text-fg md:text-[44px]">Explore projects</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-2">
            {PROJECTS.length} reference projects across {sectors === SECTORS.length ? `all ${sectors}` : `${sectors} of ${SECTORS.length}`} sectors, each with a sourced research
            dossier. Filter, sort and select up to four to compare.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <ButtonLink href="/research/methodology" variant="ghost" size="sm">
            <BookOpenCheck className="size-4" aria-hidden /> Methodology
          </ButtonLink>
          <ButtonLink href="/compare" variant="secondary" size="sm">
            <Scale className="size-4" aria-hidden /> Compare
          </ButtonLink>
        </div>
      </header>
      <Suspense fallback={<ExplorerSkeleton />}>
        <ExplorerData />
      </Suspense>
    </div>
  );
}

async function ExplorerData() {
  await connection(); // market data is request-time: never fetched at build
  const [quotes, tvl] = await Promise.all([getCoverageQuotes(), getCoverageTvl()]);
  const rows = buildExploreRows(quotes.data, tvl.data);
  const s = coverageSummary(rows);
  return (
    <>
      <DataNotice result={quotes} />
      <div>
        <StatStrip>
          <Stat label="Coverage market cap" tip="Sum of the market capitalisation of the projects covered by Sensitor, not the whole market." value={formatUsdCompact(s.totalMarketCap)}>
            <Delta value={s.weightedChange24h} className="text-[12.5px]" /> 24h, cap-weighted
          </Stat>
          <Stat label="Breadth 24h" tip="How many covered projects rose or fell over the last 24 hours." value={`${s.up} / ${s.count}`}>
            up, <span className="num text-fg-2">{s.down}</span> down
          </Stat>
          <Stat label="Best 24h" value={s.best ? formatPercent(s.best.change, { digits: 1 }) : "n/a"}>
            {s.best ? (
              <Link href={`/projects/${s.best.slug}`} className="text-fg-2 hover:text-fg">
                {s.best.name}
              </Link>
            ) : (
              "n/a"
            )}
          </Stat>
          <Stat label="Worst 24h" value={s.worst ? formatPercent(s.worst.change, { digits: 1 }) : "n/a"}>
            {s.worst ? (
              <Link href={`/projects/${s.worst.slug}`} className="text-fg-2 hover:text-fg">
                {s.worst.name}
              </Link>
            ) : (
              "n/a"
            )}
          </Stat>
        </StatStrip>
        <div className="mt-2 flex flex-wrap justify-end gap-x-4">
          <SourceTag result={quotes} label="Prices" />
          <SourceTag result={tvl} label="TVL" />
        </div>
      </div>
      <ProjectsExplorer rows={rows} marketAvailable={quotes.status !== "unavailable"} />
    </>
  );
}

function ExplorerSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading projects">
      <div className="grid grid-cols-2 gap-6 border-y border-line py-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-7 w-28" />
          </div>
        ))}
      </div>
      <Skeleton className="h-9 w-full" />
      <div className="divide-y divide-line border-y border-line">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3">
            <Skeleton className="size-7 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="ml-auto h-4 w-20" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="hidden h-4 w-20 md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
