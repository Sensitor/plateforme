import { ChevronDown } from "lucide-react";
import { compositeScore } from "@/lib/research/framework";
import { PILLARS } from "@/lib/research/taxonomy";
import { PILLAR_COLORS } from "@/lib/brand";
import type { Project } from "@/lib/research/types";
import { SourceRefs } from "./claim-list";
import { getT } from "@/i18n/server";
import type { Dictionary } from "@/i18n/dictionaries";

function RatingBar({ rating, color, t }: { rating: number | null; color: string; t: Dictionary["dossier"]["framework"] }) {
  return (
    <span className="flex items-center gap-2" aria-label={rating == null ? t.notRated : t.outOf(rating)}>
      <span className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="h-2 w-5 rounded-sm" style={{ backgroundColor: rating != null && i <= rating ? color : "var(--surface-3)" }} />
        ))}
      </span>
      <span className="num w-7 text-[13px] text-fg">{rating == null ? t.nr : `${rating}/5`}</span>
    </span>
  );
}

/** Scorecard: the seven pillars as rows, expandable for criteria, data and limits. */
export async function FrameworkPanel({ project }: { project: Project }) {
  const dict = await getT();
  const t = dict.dossier.framework;
  const assessments = project.dossier.framework;
  const composite = compositeScore(assessments);
  const sources = project.dossier.sources;
  const byId = new Map(assessments.map((a) => [a.pillar, a]));
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-xl text-[14px] leading-relaxed text-fg-2">
          {composite.score != null
            ? t.compositeNote
            : composite.withheldReason}
        </p>
        <div className="text-right">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">{t.composite}</div>
          <div className="serif-display text-[44px] leading-none text-fg">
            {composite.score != null ? composite.score.toFixed(1) : "n/a"}
            {composite.score != null ? <span className="text-[22px] text-subtle"> / 5</span> : null}
          </div>
        </div>
      </div>

      <div className="border-y border-line">
        <div className="hidden grid-cols-[220px_170px_110px_1fr_20px] gap-5 border-b border-line py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle md:grid">
          <span>{t.pillar}</span>
          <span>{t.rating}</span>
          <span>{t.confidence}</span>
          <span>{t.assessment}</span>
          <span />
        </div>
        {PILLARS.map((pillar) => {
          const a = byId.get(pillar.id);
          const color = PILLAR_COLORS[pillar.id];
          const P = dict.labels.pillars[pillar.id];
          return (
            <details key={pillar.id} className="group border-b border-line/70 last:border-0">
              <summary className="grid grid-cols-1 cursor-pointer list-none gap-2 py-4 md:grid-cols-[220px_170px_110px_1fr_20px] md:items-center md:gap-5">
                <span className="flex items-center gap-2.5 text-[14.5px] font-medium text-fg">
                  <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />
                  {P.label}
                </span>
                <RatingBar rating={a?.rating ?? null} color={color} t={t} />
                <span className="text-[13px] text-muted">{a ? dict.ui.confidenceShort[a.confidence] : "n/a"}</span>
                <span className="text-[13.5px] leading-relaxed text-fg-2">{a?.summary ?? t.notAssessed}</span>
                <ChevronDown className="hidden size-4 text-subtle transition-transform group-open:rotate-180 md:block" aria-hidden />
              </summary>
              {a ? (
                <dl className="grid grid-cols-1 gap-3 pb-5 text-[13px] leading-relaxed md:grid-cols-3 md:pl-[245px]">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">{t.criteria}</dt>
                    <dd className="mt-1 text-fg-2">{P.criteria.join("; ")}.</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">{t.dataUsed}</dt>
                    <dd className="mt-1 text-fg-2">
                      {a.dataUsed.length ? a.dataUsed.join(", ") : t.noneAvailable}
                      <SourceRefs ids={a.sources} sources={sources} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">{t.limitations}</dt>
                    <dd className="mt-1 text-fg-2">{a.limitations}</dd>
                    <dd className="mt-1 text-subtle">{P.scaleNote}</dd>
                  </div>
                </dl>
              ) : null}
            </details>
          );
        })}
      </div>
    </div>
  );
}
