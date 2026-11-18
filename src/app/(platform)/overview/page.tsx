import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { SECTOR_COLORS } from "@/lib/brand";
import { SECTORS } from "@/lib/research/taxonomy";
import { MarketPulse, MarketPulseSkeleton } from "@/components/overview/market-pulse";
import { FeaturedResearch, FeaturedResearchSkeleton } from "@/components/overview/featured-research";
import { MarketWatch, MarketWatchSkeleton } from "@/components/overview/market-watch";
import { ProjectTiles, ProjectTilesSkeleton } from "@/components/overview/project-tiles";
import { ResearchList, ResearchListSkeleton } from "@/components/overview/research-list";
import { AskResearch, KeyDatesList } from "@/components/overview/ask-research";
import { Developments, MarketChart, PanelSkeleton, SectorTable } from "@/components/overview/market-intel";
import { SectionHeader } from "@/components/overview/section-header";

export const metadata: Metadata = { title: "Overview" };

const QUICK_SECTORS = ["layer-1", "layer-2", "defi", "oracles", "rwa", "ai"] as const;

export default function OverviewPage() {
  const sectorsWithCoverage = SECTORS.filter((s) => QUICK_SECTORS.includes(s.id as (typeof QUICK_SECTORS)[number]) && PROJECTS.some((p) => p.sector === s.id));
  return (
    <div className="space-y-14">
      {/* 1. Market overview */}
      <header>
        <h1 className="serif-display text-[38px] leading-none text-fg md:text-[44px]">Market overview</h1>
        <Suspense fallback={<MarketPulseSkeleton />}>
          <MarketPulse />
        </Suspense>
      </header>

      {/* 2. Editorial feature + market watch */}
      <section className="grid grid-cols-1 gap-y-10 xl:grid-cols-12 xl:gap-x-10" aria-label="Featured research and market watch">
        <div className="xl:col-span-8">
          <Suspense fallback={<FeaturedResearchSkeleton />}>
            <FeaturedResearch />
          </Suspense>
        </div>
        <aside className="xl:col-span-4">
          <Suspense fallback={<MarketWatchSkeleton />}>
            <MarketWatch />
          </Suspense>
        </aside>
      </section>

      {/* 3. Explore projects */}
      <section aria-labelledby="explore-title">
        <SectionHeader id="explore-title" title="Explore projects" href="/explore" linkLabel={`All ${PROJECTS.length} projects`}>
          <nav aria-label="Browse by sector" className="hidden flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-muted md:flex">
            {sectorsWithCoverage.map((s) => (
              <Link key={s.id} href={`/explore?sector=${s.id}`} className="inline-flex items-center gap-1.5 hover:text-fg">
                <span className="size-1.5 rounded-full" style={{ backgroundColor: SECTOR_COLORS[s.id] }} aria-hidden />
                {s.label}
              </Link>
            ))}
          </nav>
        </SectionHeader>
        <Suspense fallback={<ProjectTilesSkeleton />}>
          <ProjectTiles />
        </Suspense>
      </section>

      {/* 4. Latest research + ask */}
      <section className="grid grid-cols-1 gap-y-10 xl:grid-cols-12 xl:gap-x-10">
        <div className="xl:col-span-8">
          <SectionHeader title="Latest research" href="/research" linkLabel="Research library" />
          <Suspense fallback={<ResearchListSkeleton />}>
            <ResearchList />
          </Suspense>
        </div>
        <aside className="xl:col-span-4">
          <SectionHeader title="Ask the research" href="/copilot" linkLabel="Copilot" />
          <AskResearch />
          <KeyDatesList />
        </aside>
      </section>

      {/* 5. Market intelligence */}
      <section aria-labelledby="intel-title">
        <SectionHeader id="intel-title" title="Market intelligence" href="/markets" linkLabel="Open Markets" />
        <div className="grid grid-cols-1 gap-y-10 xl:grid-cols-12 xl:gap-x-10">
          <div className="space-y-10 xl:col-span-8">
            <Suspense fallback={<PanelSkeleton chart />}>
              <MarketChart />
            </Suspense>
            <Suspense fallback={<PanelSkeleton rows={8} />}>
              <SectorTable />
            </Suspense>
          </div>
          <aside className="xl:col-span-4">
            <Suspense fallback={<PanelSkeleton rows={6} />}>
              <Developments />
            </Suspense>
          </aside>
        </div>
      </section>
    </div>
  );
}
