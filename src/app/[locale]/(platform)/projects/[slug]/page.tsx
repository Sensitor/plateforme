import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import { BookOpen, ChevronRight, CodeXml, ExternalLink, FileText, Globe, MessagesSquare, Scale, SearchCode } from "lucide-react";
import { PROJECTS, getProject } from "@/content/projects";
import { ACADEMY_CATEGORIES, CONCEPT_BY_SLUG } from "@/content/concepts";
import { ACADEMY_COLORS, SECTOR_COLORS } from "@/lib/brand";
import { getPriceHistory } from "@/lib/market/service";
import { claimStats, dossierCoverage } from "@/lib/research/framework";
import { CHAINS, MATURITY, SECTOR_BY_ID, TECH_TOPICS } from "@/lib/research/taxonomy";
import { formatDate } from "@/lib/format";
import { readingMinutes } from "@/lib/research/editorial";
import type { Project } from "@/lib/research/types";
import { ButtonLink } from "@/components/ui/button";
import { TokenLogo } from "@/components/ui/token-logo";
import { Skeleton } from "@/components/ui/skeleton";
import { WatchlistButton } from "@/components/watchlist-button";
import { PriceChartCard } from "@/components/charts/price-chart-card";
import { ClaimGroup, ClaimList } from "@/components/research/claim-list";
import { DossierSection } from "@/components/research/dossier-section";
import { Toc } from "@/components/research/toc";
import { KeyMetrics, KeyMetricsSkeleton } from "@/components/research/key-metrics";
import { TokenomicsSection } from "@/components/research/tokenomics-section";
import { FrameworkPanel } from "@/components/research/framework-panel";
import { RiskGrid } from "@/components/research/risk-grid";
import { ThesisSection } from "@/components/research/thesis-section";
import { SourcesTable } from "@/components/research/sources-table";
import { CompetitorsSection } from "@/components/research/competitors-section";
import { CoveragePill, RiskPill } from "@/components/research/pills";
import { ClaimKicker } from "@/components/research/claim-kicker";
import { FundamentalsPanel } from "@/components/research/fundamentals-panel";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.name} (${project.ticker}) research`, description: project.oneLiner };
}

const TOC = [
  { id: "overview", letter: "A", label: "Overview" },
  { id: "technology", letter: "B", label: "Technology" },
  { id: "tokenomics", letter: "C", label: "Tokenomics" },
  { id: "adoption", letter: "D", label: "Adoption" },
  { id: "financials", letter: "E", label: "Financials" },
  { id: "onchain", letter: "F", label: "On-chain" },
  { id: "competitors", letter: "G", label: "Competitors" },
  { id: "risks", letter: "H", label: "Risks" },
  { id: "thesis", letter: "I", label: "Research thesis" },
  { id: "framework", label: "Framework scores" },
  { id: "learn", label: "Learn by research" },
  { id: "sources", letter: "J", label: "Sources" },
];

export default function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

function ProjectPageSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading dossier">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-[200px] w-full rounded-2xl" />
      <KeyMetricsSkeleton />
      <Skeleton className="h-[300px] w-full rounded-xl" />
    </div>
  );
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const d = project.dossier;
  const sector = SECTOR_BY_ID[project.sector];
  const coverage = dossierCoverage(project);
  const stats = claimStats(project);
  const sectorColor = SECTOR_COLORS[project.sector];
  const headline = project.editorial.headline;
  const rawQuestion = headline && headline.includes(": ") ? headline.slice(headline.indexOf(": ") + 2) : null;
  const question = rawQuestion ? rawQuestion.charAt(0).toUpperCase() + rawQuestion.slice(1) : null;

  return (
    <article className="space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-muted">
        <Link href="/explore" className="hover:text-fg">
          Explore
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link href={`/explore?sector=${sector.id}`} className="hover:text-fg">
          {sector.label}
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="text-fg-2">{project.name}</span>
      </nav>

      {/* Masthead */}
      <header>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <TokenLogo src={project.logo} name={project.name} size={40} />
              <div className="flex flex-wrap items-center gap-x-2 text-[11.5px] font-medium uppercase tracking-[0.14em]">
                <span className="text-accent">Research dossier</span>
                <span className="text-line-strong" aria-hidden>
                  /
                </span>
                <Link href={`/explore?sector=${project.sector}`} className="inline-flex items-center gap-1.5 text-fg-2 hover:text-fg">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: sectorColor }} aria-hidden />
                  {sector.label}
                </Link>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="serif-display text-[46px] leading-none text-fg md:text-[56px]">{project.name}</h1>
              <span className="num text-lg text-muted">{project.ticker}</span>
            </div>
            {question ? <p className="serif-display mt-3 max-w-3xl text-[24px] leading-snug text-fg-2 md:text-[28px]">{question}</p> : null}
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{project.oneLiner}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <WatchlistButton slug={project.slug} name={project.name} variant="button" />
            <ButtonLink href={`/compare?p=${[project.slug, ...d.competitors.columns.filter((c) => c.slug && c.slug !== project.slug).map((c) => c.slug)].slice(0, 4).join(",")}`} variant="secondary">
              <Scale className="size-4" aria-hidden /> Compare
            </ButtonLink>
            <ButtonLink href={`/copilot?mode=analyze&project=${project.slug}`} variant="secondary">
              <MessagesSquare className="size-4" aria-hidden /> Ask the Copilot
            </ButtonLink>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted">
          <span>{project.chains.map((c) => CHAINS[c].label).join(", ")}</span>
          <span className="text-line-strong" aria-hidden>
            ·
          </span>
          <span>{MATURITY[project.maturity]}</span>
          <span className="text-line-strong" aria-hidden>
            ·
          </span>
          <span>Since {project.launched.slice(0, 4)}</span>
          <RiskPill level={project.riskLevel} />
          <CoveragePill level={coverage.level} />
        </div>
        <div className="mt-4 flex flex-col gap-2.5 border-t border-line pt-4 text-[13px]">
          <Byline project={project} stats={stats} />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <ExtLink href={project.links.website} icon={Globe} label="Website" />
            {project.links.whitepaper ? <ExtLink href={project.links.whitepaper} icon={FileText} label="Whitepaper" /> : null}
            {project.links.docs ? <ExtLink href={project.links.docs} icon={BookOpen} label="Docs" /> : null}
            {project.links.github ? <ExtLink href={project.links.github} icon={CodeXml} label="GitHub" /> : null}
            {project.links.explorer ? <ExtLink href={project.links.explorer} icon={SearchCode} label="Explorer" /> : null}
          </div>
        </div>
      </header>

      <Suspense fallback={<KeyMetricsSkeleton />}>
        <KeyMetrics project={project} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
        <ProjectChart project={project} />
      </Suspense>

      <div className="grid grid-cols-1 gap-10 pt-4 xl:grid-cols-[190px_minmax(0,1fr)] xl:gap-14">
        <aside>
          <Toc items={TOC} />
        </aside>
        <div className="min-w-0 space-y-16">
          <DossierSection id="overview" letter="A" title="Project overview">
            <p className="max-w-3xl border-l-2 pl-5 text-[18px] leading-[1.65] text-fg" style={{ borderColor: sectorColor }}>
              {d.overview.summary}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-2">
              <ClaimGroup title="Problem addressed" claims={d.overview.problem} sources={d.sources} compact />
              <ClaimGroup title="Value proposition" claims={d.overview.valueProposition} sources={d.sources} compact />
              <ClaimGroup title="Positioning in its sector" claims={d.overview.positioning} sources={d.sources} compact />
              <ClaimGroup title="Founders & team" claims={d.overview.team} sources={d.sources} compact />
            </div>
          </DossierSection>

          <DossierSection id="technology" letter="B" title="Technology & architecture">
            <dl className="divide-y divide-line border-y border-line">
              {d.technology.blocks.map((b) => (
                <div key={b.topic} className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[190px_1fr] md:gap-8">
                  <dt className="serif-display text-[22px] leading-tight text-fg">{TECH_TOPICS[b.topic]}</dt>
                  <dd>
                    <ClaimList claims={b.claims} sources={d.sources} compact />
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 rounded-xl bg-bg-elevated p-5">
              <ClaimGroup title="Technological limitations" claims={d.technology.limitations} sources={d.sources} compact />
            </div>
          </DossierSection>

          <DossierSection id="tokenomics" letter="C" title="Tokenomics" intro="Protocol rules and allocation. Live supply figures are shown in the metrics strip above.">
            <TokenomicsSection project={project} />
          </DossierSection>

          <DossierSection id="adoption" letter="D" title="Adoption & ecosystem">
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <ClaimList claims={d.adoption.claims} sources={d.sources} />
              <MetricsToWatch items={d.adoption.metricsToWatch} />
            </div>
          </DossierSection>

          <DossierSection id="financials" letter="E" title="Financial fundamentals" intro="Metrics are adapted to the project's business model, a Layer 1, a DeFi protocol and a stablecoin are not analysed the same way.">
            <FundamentalsPanel project={project} />
          </DossierSection>

          <DossierSection id="onchain" letter="F" title="On-chain analysis">
            <ClaimList claims={d.onchain.claims} sources={d.sources} />
            <p className="mt-6 border-l-2 border-line-strong pl-4 text-[13px] italic leading-relaxed text-muted">{d.onchain.dataAvailability}</p>
          </DossierSection>

          <DossierSection
            id="competitors"
            letter="G"
            title="Competitors"
            intro={
              <>
                Direct alternatives and how they compare.{" "}
                <Link href={`/graph?focus=${project.slug}`} className="text-accent hover:text-accent-strong">
                  See {project.name} in the Knowledge Graph
                </Link>
              </>
            }
          >
            <CompetitorsSection project={project} />
          </DossierSection>

          <DossierSection id="risks" letter="H" title="Risks" intro="Risk levels are Sensitor assessments relative to the broader digital-asset universe.">
            <RiskGrid project={project} />
          </DossierSection>

          <DossierSection id="thesis" letter="I" title="Sensitor research thesis" intro="Scenarios, not recommendations. Each case states its assumptions and what would invalidate it.">
            <ThesisSection project={project} />
          </DossierSection>

          <DossierSection id="framework" title="Sensitor Research Framework" intro={<>Seven pillars rated separately. <Link href="/research/methodology" className="text-accent hover:text-accent-strong">Read the methodology →</Link></>}>
            <FrameworkPanel project={project} />
          </DossierSection>

          <DossierSection id="learn" title="Learn by research" intro="Concepts used in this dossier, explained in the Academy.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {d.concepts
                .map((c) => CONCEPT_BY_SLUG[c])
                .filter(Boolean)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/academy/concepts/${c.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-line bg-surface p-4 pt-5 transition-colors hover:border-line-strong"
                  >
                    <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: ACADEMY_COLORS[c.category] }} aria-hidden />
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: ACADEMY_COLORS[c.category] }}>
                      {ACADEMY_CATEGORIES.find((x) => x.id === c.category)?.label}
                    </div>
                    <div className="mt-1.5 serif-display text-[21px] leading-tight text-fg">{c.title}</div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{c.summary}</p>
                  </Link>
                ))}
            </div>
          </DossierSection>

          <DossierSection id="sources" letter="J" title="Research sources" intro={`${d.sources.length} sources · dossier last updated ${formatDate(project.editorial.lastUpdated)} (version ${project.editorial.version}).`}>
            <SourcesTable project={project} />
          </DossierSection>

          <p className="border-t border-line pt-6 text-[12px] leading-relaxed text-subtle">
            This dossier is educational research. It is not investment advice and does not recommend buying or selling {project.ticker}. Facts are linked to their
            sources; interpretations and hypotheses reflect the analyst&apos;s view at the date of the last update and may be wrong.
          </p>
        </div>
      </div>
    </article>
  );
}

async function ProjectChart({ project }: { project: Project }) {
  await connection(); // market data is request-time: never fetched at build
  const initial = await getPriceHistory(project.data.coingeckoId, "1Y");
  return <PriceChartCard assets={[{ key: project.slug, label: `${project.ticker} price`, format: "price" }]} initialData={initial} title={`${project.ticker} / USD`} height={260} />;
}

function Byline({ project, stats }: { project: Project; stats: ReturnType<typeof claimStats> }) {
  const draft = project.editorial.status === "draft";
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-muted">
      <span className="text-fg-2">{project.editorial.author}</span>
      <span>{readingMinutes(project)} min read</span>
      <span className={draft ? "text-warning" : "text-positive"} title={draft ? "Prepared from public documentation; pending editorial review." : undefined}>
        {draft ? "Draft" : "Reviewed"} v{project.editorial.version}
      </span>
      <span>Updated {formatDate(project.editorial.lastUpdated)}</span>
      <span className="flex items-center gap-3">
        {(["fact", "interpretation", "hypothesis"] as const).map((k) => (
          <span key={k} className="inline-flex items-baseline gap-1.5">
            <span className="num text-fg-2">{k === "fact" ? stats.facts : k === "interpretation" ? stats.interpretations : stats.hypotheses}</span>
            <ClaimKicker kind={k} />
          </span>
        ))}
      </span>
      <span>
        {stats.sourcedFacts}/{stats.facts} facts sourced
      </span>
    </div>
  );
}

function MetricsToWatch({ items }: { items: string[] }) {
  return (
    <div className="border-t-2 border-accent/60 pt-4">
      <h3 className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">Metrics to watch</h3>
      <ol className="space-y-2.5 text-[14px] text-fg-2">
        {items.map((m, i) => (
          <li key={m} className="flex gap-3">
            <span className="num w-5 shrink-0 text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
            {m}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ExtLink({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
      <Icon className="size-3.5" aria-hidden /> {label} <ExternalLink className="size-3 opacity-60" aria-hidden />
    </a>
  );
}
