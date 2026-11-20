import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import { BookOpen, ChevronRight, CodeXml, ExternalLink, FileText, Globe, MessagesSquare, Scale, SearchCode } from "lucide-react";
import { PROJECTS, getProject } from "@/content/projects";
import { CONCEPT_BY_SLUG } from "@/content/concepts";
import { ACADEMY_COLORS, SECTOR_COLORS } from "@/lib/brand";
import { getPriceHistory } from "@/lib/market/service";
import { claimStats, dossierCoverage } from "@/lib/research/framework";
import { CHAINS } from "@/lib/research/taxonomy";
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
import { ContentLanguageNote } from "@/components/ui/content-language-note";
import { getLocale } from "@/i18n/server";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/i18n/metadata";
import type { Locale } from "@/i18n/config";

type DossierT = Dictionary["dossier"];

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const locale = await getLocale();
  const t = getDictionary(locale).dossier;
  if (!project) return { title: t.notFound };
  return { title: t.metaTitle(project.name, project.ticker), description: project.oneLiner, alternates: alternatesFor(`/projects/${slug}`, locale) };
}

const TOC_ITEMS = [
  { id: "overview", letter: "A" },
  { id: "technology", letter: "B" },
  { id: "tokenomics", letter: "C" },
  { id: "adoption", letter: "D" },
  { id: "financials", letter: "E" },
  { id: "onchain", letter: "F" },
  { id: "competitors", letter: "G" },
  { id: "risks", letter: "H" },
  { id: "thesis", letter: "I" },
  { id: "framework" },
  { id: "learn" },
  { id: "sources", letter: "J" },
] as const;

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const t = getDictionary(await getLocale()).dossier;
  return (
    <Suspense fallback={<ProjectPageSkeleton label={t.loading} />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

function ProjectPageSkeleton({ label }: { label: string }) {
  return (
    <div className="space-y-6" role="status" aria-label={label}>
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
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.dossier;
  const S = t.sections;
  const toc = TOC_ITEMS.map((i) => ({ ...i, label: t.toc.items[i.id] }));
  const sector = { id: project.sector, label: dict.labels.sectors[project.sector].label };
  const coverage = dossierCoverage(project);
  const stats = claimStats(project);
  const sectorColor = SECTOR_COLORS[project.sector];
  const headline = project.editorial.headline;
  const rawQuestion = headline && headline.includes(": ") ? headline.slice(headline.indexOf(": ") + 2) : null;
  const question = rawQuestion ? rawQuestion.charAt(0).toUpperCase() + rawQuestion.slice(1) : null;

  return (
    <article className="space-y-6">
      <nav aria-label={t.breadcrumb} className="flex items-center gap-1.5 text-[13px] text-muted">
        <Link href="/explore" className="hover:text-fg">
          {t.explore}
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
                <span className="text-accent">{t.kicker}</span>
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
              <Scale className="size-4" aria-hidden /> {t.compare}
            </ButtonLink>
            <ButtonLink href={`/copilot?mode=analyze&project=${project.slug}`} variant="secondary">
              <MessagesSquare className="size-4" aria-hidden /> {t.ask}
            </ButtonLink>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted">
          <span>{project.chains.map((c) => CHAINS[c].label).join(", ")}</span>
          <span className="text-line-strong" aria-hidden>
            ·
          </span>
          <span>{dict.labels.maturity[project.maturity]}</span>
          <span className="text-line-strong" aria-hidden>
            ·
          </span>
          <span>{t.since(project.launched.slice(0, 4))}</span>
          <RiskPill level={project.riskLevel} />
          <CoveragePill level={coverage.level} />
        </div>
        <div className="mt-4 flex flex-col gap-2.5 border-t border-line pt-4 text-[13px]">
          <Byline project={project} stats={stats} t={t} locale={locale} />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <ExtLink href={project.links.website} icon={Globe} label={t.links.website} />
            {project.links.whitepaper ? <ExtLink href={project.links.whitepaper} icon={FileText} label={t.links.whitepaper} /> : null}
            {project.links.docs ? <ExtLink href={project.links.docs} icon={BookOpen} label={t.links.docs} /> : null}
            {project.links.github ? <ExtLink href={project.links.github} icon={CodeXml} label={t.links.github} /> : null}
            {project.links.explorer ? <ExtLink href={project.links.explorer} icon={SearchCode} label={t.links.explorer} /> : null}
          </div>
        </div>
        <ContentLanguageNote className="mt-4" />
      </header>

      <Suspense fallback={<KeyMetricsSkeleton />}>
        <KeyMetrics project={project} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
        <ProjectChart project={project} />
      </Suspense>

      <div className="grid grid-cols-1 gap-10 pt-4 xl:grid-cols-[190px_minmax(0,1fr)] xl:gap-14">
        <aside>
          <Toc items={toc} title={t.toc.title} />
        </aside>
        <div className="min-w-0 space-y-16">
          <DossierSection id="overview" letter="A" title={S.overview}>
            <p className="max-w-3xl border-l-2 pl-5 text-[18px] leading-[1.65] text-fg" style={{ borderColor: sectorColor }}>
              {d.overview.summary}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-2">
              <ClaimGroup title={S.problem} claims={d.overview.problem} sources={d.sources} compact />
              <ClaimGroup title={S.value} claims={d.overview.valueProposition} sources={d.sources} compact />
              <ClaimGroup title={S.positioning} claims={d.overview.positioning} sources={d.sources} compact />
              <ClaimGroup title={S.team} claims={d.overview.team} sources={d.sources} compact />
            </div>
          </DossierSection>

          <DossierSection id="technology" letter="B" title={S.technology}>
            <dl className="divide-y divide-line border-y border-line">
              {d.technology.blocks.map((b) => (
                <div key={b.topic} className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[190px_1fr] md:gap-8">
                  <dt className="serif-display text-[22px] leading-tight text-fg">{dict.labels.techTopics[b.topic]}</dt>
                  <dd>
                    <ClaimList claims={b.claims} sources={d.sources} compact />
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 rounded-xl bg-bg-elevated p-5">
              <ClaimGroup title={S.limitations} claims={d.technology.limitations} sources={d.sources} compact />
            </div>
          </DossierSection>

          <DossierSection id="tokenomics" letter="C" title={S.tokenomics} intro={S.tokenomicsIntro}>
            <TokenomicsSection project={project} />
          </DossierSection>

          <DossierSection id="adoption" letter="D" title={S.adoption}>
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <ClaimList claims={d.adoption.claims} sources={d.sources} />
              <MetricsToWatch items={d.adoption.metricsToWatch} title={S.metricsToWatch} />
            </div>
          </DossierSection>

          <DossierSection id="financials" letter="E" title={S.financials} intro={S.financialsIntro}>
            <FundamentalsPanel project={project} />
          </DossierSection>

          <DossierSection id="onchain" letter="F" title={S.onchain}>
            <ClaimList claims={d.onchain.claims} sources={d.sources} />
            <p className="mt-6 border-l-2 border-line-strong pl-4 text-[13px] italic leading-relaxed text-muted">{d.onchain.dataAvailability}</p>
          </DossierSection>

          <DossierSection
            id="competitors"
            letter="G"
            title={S.competitors}
            intro={
              <>
                {S.competitorsIntro}{" "}
                <Link href={`/graph?focus=${project.slug}`} className="text-accent hover:text-accent-strong">
                  {S.inGraph(project.name)}
                </Link>
              </>
            }
          >
            <CompetitorsSection project={project} />
          </DossierSection>

          <DossierSection id="risks" letter="H" title={S.risks} intro={S.risksIntro}>
            <RiskGrid project={project} />
          </DossierSection>

          <DossierSection id="thesis" letter="I" title={S.thesis} intro={S.thesisIntro}>
            <ThesisSection project={project} />
          </DossierSection>

          <DossierSection id="framework" title={S.framework} intro={<>{S.frameworkIntro} <Link href="/research/methodology" className="text-accent hover:text-accent-strong">{S.readMethodology}</Link></>}>
            <FrameworkPanel project={project} />
          </DossierSection>

          <DossierSection id="learn" title={S.learn} intro={S.learnIntro}>
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
                      {dict.labels.academyTracks[c.category].label}
                    </div>
                    <div className="mt-1.5 serif-display text-[21px] leading-tight text-fg">{c.title}</div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{c.summary}</p>
                  </Link>
                ))}
            </div>
          </DossierSection>

          <DossierSection id="sources" letter="J" title={S.sources} intro={S.sourcesIntro(d.sources.length, formatDate(project.editorial.lastUpdated, locale), project.editorial.version)}>
            <SourcesTable project={project} />
          </DossierSection>

          <p className="border-t border-line pt-6 text-[12px] leading-relaxed text-subtle">
            {S.disclaimer(project.ticker)}
          </p>
        </div>
      </div>
    </article>
  );
}

async function ProjectChart({ project }: { project: Project }) {
  await connection(); // market data is request-time: never fetched at build
  const initial = await getPriceHistory(project.data.coingeckoId, "1Y");
  const t = getDictionary(await getLocale()).dossier;
  return <PriceChartCard assets={[{ key: project.slug, label: t.chart.price(project.ticker), format: "price" }]} initialData={initial} title={`${project.ticker} / USD`} height={260} />;
}

function Byline({ project, stats, t, locale }: { project: Project; stats: ReturnType<typeof claimStats>; t: DossierT; locale: Locale }) {
  const draft = project.editorial.status === "draft";
  const b = t.byline;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-muted">
      <span className="text-fg-2">{project.editorial.author}</span>
      <span>{b.minRead(readingMinutes(project))}</span>
      <span className={draft ? "text-warning" : "text-positive"} title={draft ? b.draftTitle : undefined}>
        {draft ? b.draft : b.reviewed} v{project.editorial.version}
      </span>
      <span>{b.updated(formatDate(project.editorial.lastUpdated, locale))}</span>
      <span className="flex items-center gap-3">
        {(["fact", "interpretation", "hypothesis"] as const).map((k) => (
          <span key={k} className="inline-flex items-baseline gap-1.5">
            <span className="num text-fg-2">{k === "fact" ? stats.facts : k === "interpretation" ? stats.interpretations : stats.hypotheses}</span>
            <ClaimKicker kind={k} />
          </span>
        ))}
      </span>
      <span>{b.sourced(stats.sourcedFacts, stats.facts)}</span>
    </div>
  );
}

function MetricsToWatch({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="border-t-2 border-accent/60 pt-4">
      <h3 className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">{title}</h3>
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
