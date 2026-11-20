import type { Metadata } from "next";
import Link from "@/i18n/link";
import { BookOpenCheck } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import { SECTOR_COLORS } from "@/lib/brand";
import { claimStats, compositeScore, dossierCoverage } from "@/lib/research/framework";
import { dossierTitle, readingMinutes } from "@/lib/research/editorial";
import { SECTORS } from "@/lib/research/taxonomy";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Stat, StatStrip } from "@/components/ui/stat-strip";
import { TokenLogo } from "@/components/ui/token-logo";
import { CoveragePill, ScorePill } from "@/components/research/pills";
import { SectionHeader } from "@/components/overview/section-header";
import { getLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("research", "/research");
}

export default async function ResearchPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.research;
  const FORMATS = t.formats.map(([title, text, phase]) => ({ title, text, phase }));
  const totals = PROJECTS.reduce(
    (acc, p) => {
      const s = claimStats(p);
      acc.claims += s.total;
      acc.facts += s.facts;
      acc.sourced += s.sourcedFacts;
      acc.sources += p.dossier.sources.length;
      return acc;
    },
    { claims: 0, facts: 0, sourced: 0, sources: 0 },
  );
  const bySector = SECTORS.map((s) => ({ sector: s, projects: PROJECTS.filter((p) => p.sector === s.id) })).filter((g) => g.projects.length);

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <PageHeader
          title={t.title}
          description={t.description}
          actions={
            <ButtonLink href="/research/methodology" variant="secondary" size="sm">
              <BookOpenCheck className="size-4" aria-hidden /> {t.methodology}
            </ButtonLink>
          }
        />
        <StatStrip>
          <Stat label={t.stats.dossiers} value={PROJECTS.length}>
            {t.stats.across(bySector.length)}
          </Stat>
          <Stat label={t.stats.claims} value={totals.claims}>
            {t.stats.claimsNote}
          </Stat>
          <Stat label={t.stats.sourced} value={`${totals.sourced} / ${totals.facts}`}>
            {t.stats.sourcedNote}
          </Stat>
          <Stat label={t.stats.sources} value={totals.sources}>
            {t.stats.sourcesNote}
          </Stat>
        </StatStrip>
        <p className="flex items-start gap-2.5 text-[13px] leading-relaxed text-fg-2">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" aria-hidden />
          <span>
            <span className="font-medium text-warning">{t.draftsLead}</span> {t.draftsText}
          </span>
        </p>
      </div>

      <section aria-label={t.bySector} className="divide-y divide-line border-y border-line">
        {bySector.map(({ sector, projects }) => (
          <div key={sector.id} id={`sec-${sector.id}`} className="grid scroll-mt-24 grid-cols-1 gap-4 py-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10">
            <div>
              <h2 className="flex items-center gap-2 text-[15px] font-semibold text-fg">
                <span className="size-2 rounded-full" style={{ backgroundColor: SECTOR_COLORS[sector.id] }} aria-hidden />
                {dict.labels.sectors[sector.id].label}
                <span className="num text-[12px] font-normal text-subtle">{projects.length}</span>
              </h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{dict.labels.sectors[sector.id].description}</p>
            </div>
            <ul className="divide-y divide-line/60">
              {projects.map((p) => {
                const stats = claimStats(p);
                const c = compositeScore(p.dossier.framework);
                return (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="group grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-4 py-3.5 first:pt-0">
                      <TokenLogo src={p.logo} name={p.name} size={32} />
                      <span className="min-w-0">
                        <span className="flex items-baseline gap-2 text-[12px]">
                          <span className="font-medium text-fg-2">{p.name}</span>
                          <span className="num text-subtle">{p.ticker}</span>
                        </span>
                        <span className="mt-0.5 block text-[15.5px] font-medium leading-snug text-fg group-hover:text-accent-strong">{dossierTitle(p)}</span>
                        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-muted">
                          <time dateTime={p.editorial.lastUpdated}>{formatDate(p.editorial.lastUpdated, locale)}</time>
                          <span aria-hidden>·</span>
                          <span>{dict.overview.dossierMeta.minRead(readingMinutes(p))}</span>
                          <span aria-hidden>·</span>
                          <span>{dict.overview.dossierMeta.sources(p.dossier.sources.length)}</span>
                          <span aria-hidden>·</span>
                          <span>{dict.dossier.byline.sourced(stats.sourcedFacts, stats.facts)}</span>
                          <span className="text-warning">{t.draft(p.editorial.version)}</span>
                          <CoveragePill level={dossierCoverage(p).level} />
                        </span>
                      </span>
                      <ScorePill score={c.score} note={c.withheldReason} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <SectionHeader title={t.formatsTitle} />
        <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 xl:grid-cols-5">
          {FORMATS.map((f) => (
            <div key={f.title} className="border-t border-line py-4">
              <dt className="text-[14px] font-medium text-fg">{f.title}</dt>
              <dd className="mt-1 text-[12.5px] leading-relaxed text-muted">{f.text}</dd>
              <dd className="mt-2 text-[11px] uppercase tracking-[0.12em] text-subtle">{f.phase}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
