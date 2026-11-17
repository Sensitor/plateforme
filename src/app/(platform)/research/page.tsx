import { SECTOR_COLORS, tint } from "@/lib/brand";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, CalendarRange, FileSearch, Layers, NotebookPen, Sigma } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import { claimStats, compositeScore, dossierCoverage } from "@/lib/research/framework";
import { SECTORS, SECTOR_BY_ID } from "@/lib/research/taxonomy";
import { formatDate } from "@/lib/format";
import { PageHeader, SectionTitle } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TokenLogo } from "@/components/ui/token-logo";
import { CoveragePill, ScorePill } from "@/components/research/pills";

export const metadata: Metadata = { title: "Research", description: "Sensitor research library: project dossiers, methodology and editorial formats." };

const FORMATS = [
  { icon: CalendarRange, title: "Weekly Market Intelligence", text: "A weekly read of market structure, flows and sentiment.", phase: "Research Club · Phase 4" },
  { icon: FileSearch, title: "Project Deep Dives", text: "Long-form dossiers extending the project pages with original analysis.", phase: "Research Club · Phase 4" },
  { icon: Layers, title: "Sector Intelligence", text: "Sector-level reports comparing business models and leaders.", phase: "Phase 2" },
  { icon: NotebookPen, title: "Founder Notes", text: "Publications and frameworks from the founder.", phase: "Research Club · Phase 4" },
  { icon: Sigma, title: "Investment Frameworks", text: "Reusable methods for analysis and risk management.", phase: "Phase 4" },
];

export default function ResearchPage() {
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
    <div className="space-y-10">
      <PageHeader
        eyebrow="Understand"
        title="Research library"
        description="Every dossier separates verified facts, analyst interpretations and hypotheses, and links each fact to its sources."
        actions={
          <ButtonLink href="/research/methodology" variant="secondary">
            <BookOpenCheck className="size-4" aria-hidden /> Methodology
          </ButtonLink>
        }
      />

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
        {[
          ["Dossiers", PROJECTS.length],
          ["Typed claims", totals.claims],
          ["Facts with a source", `${totals.sourced} / ${totals.facts}`],
          ["Sources cited", totals.sources],
        ].map(([l, v]) => (
          <div key={l as string} className="bg-surface px-4 py-4">
            <div className="text-[12px] text-muted">{l}</div>
            <div className="num mt-1 text-2xl text-fg">{v}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-warning/25 bg-warning-soft px-4 py-3 text-[13px] leading-relaxed text-warning">
        All dossiers in this release are <strong>drafts</strong>: prepared from public documentation and data, with every source link checked, but not yet peer-reviewed by the
        Sensitor editorial team. Facts without a source are explicitly flagged in each dossier.
      </div>

      {bySector.map(({ sector, projects }) => (
        <section key={sector.id} aria-labelledby={`sec-${sector.id}`}>
          <div className="mb-1.5 h-[3px] w-10 rounded-full" style={{ backgroundColor: SECTOR_COLORS[sector.id] }} aria-hidden />
          <SectionTitle id={`sec-${sector.id}`} title={sector.label} description={sector.description} />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p) => {
              const stats = claimStats(p);
              const c = compositeScore(p.dossier.framework);
              return (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
                  style={{ backgroundImage: `radial-gradient(110% 80% at 100% 0%, ${tint(p.accent, 0.12)}, transparent 60%)` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <TokenLogo src={p.logo} name={p.name} size={36} />
                      <div>
                        <div className="serif-display text-[22px] leading-tight text-fg">{p.name}</div>
                        <div className="text-xs text-muted">
                          {p.ticker} · {SECTOR_BY_ID[p.sector].label}
                        </div>
                      </div>
                    </div>
                    <ScorePill score={c.score} note={c.withheldReason} />
                  </div>
                  <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-fg-2">{p.oneLiner}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge tone="warning">Draft v{p.editorial.version}</Badge>
                    <CoveragePill level={dossierCoverage(p).level} />
                  </div>
                  <div className="mt-3 border-t border-line pt-3 text-[11.5px] text-subtle">
                    {formatDate(p.editorial.lastUpdated)} · {stats.total} claims · {p.dossier.sources.length} sources · {stats.sourcedFacts}/{stats.facts} facts sourced
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <section>
        <SectionTitle title="Editorial formats" description="Research formats planned for the platform and the Research Club." />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {FORMATS.map((f) => (
            <div key={f.title} className="rounded-xl border border-dashed border-line-strong p-4">
              <f.icon className="size-4 text-muted" aria-hidden />
              <div className="mt-3 text-[14px] font-medium text-fg">{f.title}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{f.text}</p>
              <Badge tone="outline" className="mt-3">{f.phase}</Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
