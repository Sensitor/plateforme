import { PROJECTS, PROJECT_BY_SLUG } from "@/content/projects";
import { PROJECT_TEXT_FR } from "@/content/fr/projects";
import type { Locale } from "@/i18n/config";
import type { Claim, CompetitorColumn, Project } from "./types";

type ColumnText = Pick<CompetitorColumn, "technology" | "adoption" | "tokenomics" | "economics" | "strengths" | "weaknesses" | "positioning">;

/**
 * Every human-readable string of a project, mirroring the dossier structure.
 * Data (ids, URLs, enums, protocol parameters, source titles, claim kinds and
 * source links) is not part of it: a translation only replaces the text, so
 * facts keep their type and their sources in every language.
 */
export interface ProjectText {
  oneLiner: string;
  tags: string[];
  headline?: string;
  overview: { summary: string; problem: string[]; valueProposition: string[]; positioning: string[]; team: string[] };
  technology: { blocks: string[][]; limitations: string[] };
  tokenomics: {
    supplyModelNote: string;
    distribution?: { label: string; note?: string }[];
    distributionNote?: string;
    issuanceNote?: string;
    utility: string[];
    emissions: string[];
    vesting: string[];
    valueAccrual: string[];
    concentration?: string[];
  };
  adoption: { claims: string[]; metricsToWatch: string[] };
  financials: { relevantMetrics: { label: string; why: string }[]; claims: string[] };
  onchain: { claims: string[]; dataAvailability: string };
  competitors: { columns: ColumnText[]; note?: string };
  risks: string[][];
  thesis: { bull: string[]; neutral: string[]; bear: string[]; catalysts: string[]; assumptions: string[]; monitor: string[]; invalidation: string[] };
  framework: { summary: string; dataUsed: string[]; limitations: string }[];
  sources: { supports: string; limitations?: string }[];
}

const texts = (claims: Claim[]) => claims.map((c) => c.text);

/** Extracts the text layer of a project (the English original for translators and tests). */
export function projectText(p: Project): ProjectText {
  const d = p.dossier;
  const tk = d.tokenomics;
  return {
    oneLiner: p.oneLiner,
    tags: [...p.tags],
    headline: p.editorial.headline,
    overview: { summary: d.overview.summary, problem: texts(d.overview.problem), valueProposition: texts(d.overview.valueProposition), positioning: texts(d.overview.positioning), team: texts(d.overview.team) },
    technology: { blocks: d.technology.blocks.map((b) => texts(b.claims)), limitations: texts(d.technology.limitations) },
    tokenomics: {
      supplyModelNote: tk.supplyModelNote,
      distribution: tk.distribution?.map((s) => ({ label: s.label, note: s.note })),
      distributionNote: tk.distributionNote,
      issuanceNote: tk.issuanceNote,
      utility: texts(tk.utility),
      emissions: texts(tk.emissions),
      vesting: texts(tk.vesting),
      valueAccrual: texts(tk.valueAccrual),
      concentration: tk.concentration ? texts(tk.concentration) : undefined,
    },
    adoption: { claims: texts(d.adoption.claims), metricsToWatch: [...d.adoption.metricsToWatch] },
    financials: { relevantMetrics: d.financials.relevantMetrics.map((m) => ({ label: m.label, why: m.why })), claims: texts(d.financials.claims) },
    onchain: { claims: texts(d.onchain.claims), dataAvailability: d.onchain.dataAvailability },
    competitors: {
      columns: d.competitors.columns.map((c) => ({ technology: c.technology, adoption: c.adoption, tokenomics: c.tokenomics, economics: c.economics, strengths: c.strengths, weaknesses: c.weaknesses, positioning: c.positioning })),
      note: d.competitors.note,
    },
    risks: d.risks.map((r) => texts(r.claims)),
    thesis: {
      bull: texts(d.thesis.bull),
      neutral: texts(d.thesis.neutral),
      bear: texts(d.thesis.bear),
      catalysts: texts(d.thesis.catalysts),
      assumptions: texts(d.thesis.assumptions),
      monitor: [...d.thesis.monitor],
      invalidation: [...d.thesis.invalidation],
    },
    framework: d.framework.map((f) => ({ summary: f.summary, dataUsed: [...f.dataUsed], limitations: f.limitations })),
    sources: d.sources.map((s) => ({ supports: s.supports, limitations: s.limitations })),
  };
}

const pick = <T>(fr: T | undefined, en: T): T => (fr === undefined ? en : fr);
const strings = (en: string[], fr: string[] | undefined) => en.map((s, i) => pick(fr?.[i], s));
const claims = (en: Claim[], fr: string[] | undefined) => en.map((c, i) => ({ ...c, text: pick(fr?.[i], c.text) }));

/** Lays a translation over a project. Any missing piece falls back to the original. */
export function applyProjectText(p: Project, t: ProjectText): Project {
  const d = p.dossier;
  const tk = d.tokenomics;
  return {
    ...p,
    oneLiner: t.oneLiner,
    tags: strings(p.tags, t.tags),
    editorial: { ...p.editorial, headline: pick(t.headline, p.editorial.headline) },
    dossier: {
      ...d,
      overview: {
        summary: t.overview.summary,
        problem: claims(d.overview.problem, t.overview.problem),
        valueProposition: claims(d.overview.valueProposition, t.overview.valueProposition),
        positioning: claims(d.overview.positioning, t.overview.positioning),
        team: claims(d.overview.team, t.overview.team),
      },
      technology: { blocks: d.technology.blocks.map((b, i) => ({ ...b, claims: claims(b.claims, t.technology.blocks[i]) })), limitations: claims(d.technology.limitations, t.technology.limitations) },
      tokenomics: {
        ...tk,
        supplyModelNote: t.tokenomics.supplyModelNote,
        distribution: tk.distribution?.map((s, i) => ({ ...s, label: pick(t.tokenomics.distribution?.[i]?.label, s.label), note: pick(t.tokenomics.distribution?.[i]?.note, s.note) })),
        distributionNote: pick(t.tokenomics.distributionNote, tk.distributionNote),
        issuanceNote: pick(t.tokenomics.issuanceNote, tk.issuanceNote),
        utility: claims(tk.utility, t.tokenomics.utility),
        emissions: claims(tk.emissions, t.tokenomics.emissions),
        vesting: claims(tk.vesting, t.tokenomics.vesting),
        valueAccrual: claims(tk.valueAccrual, t.tokenomics.valueAccrual),
        concentration: tk.concentration ? claims(tk.concentration, t.tokenomics.concentration) : undefined,
      },
      adoption: { claims: claims(d.adoption.claims, t.adoption.claims), metricsToWatch: strings(d.adoption.metricsToWatch, t.adoption.metricsToWatch) },
      financials: {
        ...d.financials,
        relevantMetrics: d.financials.relevantMetrics.map((m, i) => ({ label: pick(t.financials.relevantMetrics[i]?.label, m.label), why: pick(t.financials.relevantMetrics[i]?.why, m.why) })),
        claims: claims(d.financials.claims, t.financials.claims),
      },
      onchain: { claims: claims(d.onchain.claims, t.onchain.claims), dataAvailability: t.onchain.dataAvailability },
      competitors: { columns: d.competitors.columns.map((c, i) => ({ ...c, ...t.competitors.columns[i] })), note: pick(t.competitors.note, d.competitors.note) },
      risks: d.risks.map((r, i) => ({ ...r, claims: claims(r.claims, t.risks[i]) })),
      thesis: {
        bull: claims(d.thesis.bull, t.thesis.bull),
        neutral: claims(d.thesis.neutral, t.thesis.neutral),
        bear: claims(d.thesis.bear, t.thesis.bear),
        catalysts: claims(d.thesis.catalysts, t.thesis.catalysts),
        assumptions: claims(d.thesis.assumptions, t.thesis.assumptions),
        monitor: strings(d.thesis.monitor, t.thesis.monitor),
        invalidation: strings(d.thesis.invalidation, t.thesis.invalidation),
      },
      framework: d.framework.map((f, i) => ({ ...f, summary: pick(t.framework[i]?.summary, f.summary), dataUsed: strings(f.dataUsed, t.framework[i]?.dataUsed), limitations: pick(t.framework[i]?.limitations, f.limitations) })),
      sources: d.sources.map((s, i) => ({ ...s, supports: pick(t.sources[i]?.supports, s.supports), limitations: pick(t.sources[i]?.limitations, s.limitations) })),
    },
  };
}

const TEXT: Record<Locale, Partial<Record<string, ProjectText>>> = { en: {}, fr: PROJECT_TEXT_FR };
const cache: Record<Locale, Map<string, Project>> = { en: new Map(), fr: new Map() };

/** Whether the dossier is available in the interface language (English always is). */
export function isProjectTranslated(slug: string, locale: Locale): boolean {
  return locale === "en" || Boolean(TEXT[locale][slug]);
}

/** The project with its text in the interface language when a translation exists. */
export function localizedProject(p: Project, locale: Locale): Project {
  const t = TEXT[locale][p.slug];
  if (!t) return p;
  let out = cache[locale].get(p.slug);
  if (!out) {
    out = applyProjectText(p, t);
    cache[locale].set(p.slug, out);
  }
  return out;
}

export function localizedProjects(locale: Locale): Project[] {
  return PROJECTS.map((p) => localizedProject(p, locale));
}

export function localizedProjectBySlug(slug: string, locale: Locale): Project | undefined {
  const p = PROJECT_BY_SLUG[slug];
  return p ? localizedProject(p, locale) : undefined;
}
