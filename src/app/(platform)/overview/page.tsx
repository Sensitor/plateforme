import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import { getCoverageQuotes } from "@/lib/market/service";
import { ButtonLink } from "@/components/ui/button";
import { CardSkeleton } from "@/components/ui/skeleton";
import { SectionTitle } from "@/components/ui/section-heading";
import { MarketHero } from "@/components/overview/market-hero";
import { IndicatorTiles, IndicatorTilesSkeleton } from "@/components/overview/indicator-tiles";
import { FeaturedProjects, FeaturedSkeleton } from "@/components/overview/featured-projects";
import { SectorCard } from "@/components/overview/sector-card";
import { LatestResearch } from "@/components/overview/latest-research";
import { KeyDatesCard } from "@/components/overview/key-dates-card";
import { LiquidityCards } from "@/components/overview/liquidity-cards";
import { WatchlistCard, type WatchItem } from "@/components/overview/watchlist-card";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:items-stretch">
        <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-line bg-surface px-6 py-8 md:px-8">
          <HeroArtwork />
          <div className="relative">
            <p className="text-[13px] font-medium text-accent">Welcome to Sensitor</p>
            <h1 className="serif-display mt-3 text-[40px] leading-[1.02] text-fg md:text-[54px]">
              Understand digital assets.
              <br />
              <span className="italic text-violet">Research.</span> <span className="text-accent-strong">Invest with method.</span>
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
              In-depth research, live market data and education to build your own judgement. We never tell you what to buy. We give you the tools to understand
              what you own.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/explore" variant="primary" size="lg">
                Explore {PROJECTS.length} projects <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/academy" variant="outline" size="lg">
                Discover the Academy
              </ButtonLink>
            </div>
          </div>
        </div>
        <Suspense fallback={<CardSkeleton className="min-h-[380px]" lines={6} />}>
          <MarketHero />
        </Suspense>
      </section>

      <Suspense fallback={<IndicatorTilesSkeleton />}>
        <IndicatorTiles />
      </Suspense>

      <section aria-labelledby="featured-title">
        <SectionTitle
          id="featured-title"
          title="Projects in focus"
          description="A selection of projects to analyse in depth."
          action={
            <Link href="/explore" className="text-[13px] text-accent hover:text-accent-strong">
              All projects →
            </Link>
          }
        />
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedProjects />
        </Suspense>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        <LatestResearch />
        <Suspense fallback={<CardSkeleton lines={6} />}>
          <SectorCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton lines={5} />}>
          <WatchlistSection />
        </Suspense>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Suspense fallback={<CardSkeleton lines={6} />}>
          <LiquidityCards />
        </Suspense>
        <KeyDatesCard />
      </section>
    </div>
  );
}

async function WatchlistSection() {
  await connection(); // market data is request-time: never fetched at build
  const quotes = await getCoverageQuotes();
  const items: Record<string, WatchItem> = Object.fromEntries(
    PROJECTS.map((p) => {
      const q = quotes.data?.[p.slug];
      return [p.slug, { slug: p.slug, name: p.name, ticker: p.ticker, logo: p.logo, price: q?.price ?? null, change24h: q?.change24h ?? null, change7d: q?.change7d ?? null }];
    }),
  );
  return <WatchlistCard items={items} />;
}

function HeroArtwork() {
  return (
    <svg aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[420px] opacity-60" viewBox="0 0 420 420" fill="none">
      <defs>
        <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7896ff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#7896ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="210" r="210" fill="url(#hero-glow)" />
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={i} cx="210" cy="210" r={60 + i * 24} stroke="#9c83e8" strokeOpacity={0.22 - i * 0.025} strokeWidth="1" />
      ))}
    </svg>
  );
}
