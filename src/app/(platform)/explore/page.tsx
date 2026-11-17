import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import { BookOpenCheck, Scale } from "lucide-react";
import { PageHeader } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { DataNotice } from "@/components/ui/data-notice";
import { SourceTag } from "@/components/ui/source-tag";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectsExplorer } from "@/components/explore/projects-explorer";
import { getCoverageQuotes, getCoverageTvl } from "@/lib/market/service";
import { buildExploreRows } from "@/lib/projects-view";
import { PROJECTS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Explore Projects",
  description: "A documented library of crypto projects organised by sector, technology and blockchain.",
};

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Discover"
        title="Explore Projects"
        description={`A documented library of ${PROJECTS.length} reference projects. Live market data, sector classification and Sensitor research dossiers with sources.`}
        actions={
          <>
            <ButtonLink href="/research/methodology" variant="ghost" size="sm">
              <BookOpenCheck className="size-4" aria-hidden /> Methodology
            </ButtonLink>
            <ButtonLink href="/compare" variant="secondary" size="sm">
              <Scale className="size-4" aria-hidden /> Compare
            </ButtonLink>
          </>
        }
      />
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
  return (
    <>
      <DataNotice result={quotes} />
      <ProjectsExplorer rows={rows} marketAvailable={quotes.status !== "unavailable"} />
      <div className="flex flex-wrap gap-x-4">
        <SourceTag result={quotes} label="Prices" />
        <SourceTag result={tvl} label="TVL" />
      </div>
    </>
  );
}

function ExplorerSkeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading projects">
      <div className="flex gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="rounded-xl border border-line bg-surface p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-line/60 py-3 last:border-0">
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="ml-auto h-4 w-20" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="hidden h-4 w-20 md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
