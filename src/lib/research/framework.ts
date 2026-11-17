import { PILLARS } from "./taxonomy";
import type { Claim, PillarAssessment, Project } from "./types";

/**
 * Sensitor Research Framework, scoring rules.
 *
 * A composite score is only published when it is meaningful:
 *  - all seven pillars are rated (no `null`), and
 *  - no pillar is rated with low confidence.
 * Otherwise the composite is withheld and the reason is shown, so the UI never
 * displays a misleading single number built on thin data.
 */

export interface CompositeResult {
  score: number | null;
  ratedPillars: number;
  totalPillars: number;
  withheldReason: string | null;
}

export function compositeScore(assessments: PillarAssessment[]): CompositeResult {
  const totalPillars = PILLARS.length;
  const byPillar = new Map(assessments.map((a) => [a.pillar, a]));
  const rated = PILLARS.map((p) => byPillar.get(p.id)).filter((a): a is PillarAssessment => a != null && a.rating != null);
  const ratedPillars = rated.length;

  if (ratedPillars < totalPillars) {
    return {
      score: null,
      ratedPillars,
      totalPillars,
      withheldReason: `Composite withheld: ${totalPillars - ratedPillars} of ${totalPillars} pillars lack sufficient data to be rated.`,
    };
  }
  const lowConfidence = rated.filter((a) => a.confidence === "low");
  if (lowConfidence.length > 0) {
    return {
      score: null,
      ratedPillars,
      totalPillars,
      withheldReason: `Composite withheld: ${lowConfidence.length} pillar${lowConfidence.length > 1 ? "s are" : " is"} rated with low confidence.`,
    };
  }
  const mean = rated.reduce((s, a) => s + (a.rating as number), 0) / ratedPillars;
  return { score: Math.round(mean * 10) / 10, ratedPillars, totalPillars, withheldReason: null };
}

/* ------------------------------------------------------------------ */
/* Dossier coverage, feeds the "fundamental data availability" filter */
/* ------------------------------------------------------------------ */

export type CoverageLevel = "full" | "partial" | "limited";

export interface CoverageResult {
  level: CoverageLevel;
  sections: { id: string; label: string; complete: boolean }[];
  completed: number;
}

const has = (claims: Claim[] | undefined, min = 1) => (claims?.length ?? 0) >= min;

export function dossierCoverage(project: Project): CoverageResult {
  const d = project.dossier;
  const sections = [
    { id: "overview", label: "Project overview", complete: has(d.overview.problem) && has(d.overview.valueProposition) },
    { id: "technology", label: "Technology & architecture", complete: d.technology.blocks.length >= 3 },
    { id: "tokenomics", label: "Tokenomics", complete: has(d.tokenomics.utility) && has(d.tokenomics.emissions) },
    { id: "adoption", label: "Adoption & ecosystem", complete: has(d.adoption.claims, 2) },
    { id: "financials", label: "Financial fundamentals", complete: has(d.financials.claims) && project.data.llamaFees != null },
    { id: "onchain", label: "On-chain analysis", complete: has(d.onchain.claims) },
    { id: "competitors", label: "Competitors", complete: d.competitors.columns.length >= 3 },
    { id: "risks", label: "Risks", complete: d.risks.length >= 7 },
    { id: "thesis", label: "Research thesis", complete: has(d.thesis.bull) && has(d.thesis.bear) },
    { id: "sources", label: "Sources", complete: d.sources.length >= 4 },
  ];
  const completed = sections.filter((s) => s.complete).length;
  const level: CoverageLevel = completed >= 9 ? "full" : completed >= 6 ? "partial" : "limited";
  return { level, sections, completed };
}

/** Collect every claim of a dossier (used by integrity tests and source counts). */
export function allClaims(project: Project): Claim[] {
  const d = project.dossier;
  return [
    ...d.overview.problem,
    ...d.overview.valueProposition,
    ...d.overview.positioning,
    ...d.overview.team,
    ...d.technology.blocks.flatMap((b) => b.claims),
    ...d.technology.limitations,
    ...d.tokenomics.utility,
    ...d.tokenomics.emissions,
    ...d.tokenomics.vesting,
    ...d.tokenomics.valueAccrual,
    ...(d.tokenomics.concentration ?? []),
    ...d.adoption.claims,
    ...d.financials.claims,
    ...d.onchain.claims,
    ...d.risks.flatMap((r) => r.claims),
    ...d.thesis.bull,
    ...d.thesis.neutral,
    ...d.thesis.bear,
    ...d.thesis.catalysts,
    ...d.thesis.assumptions,
  ];
}

export function claimStats(project: Project) {
  const claims = allClaims(project);
  const facts = claims.filter((c) => c.kind === "fact");
  return {
    total: claims.length,
    facts: facts.length,
    interpretations: claims.filter((c) => c.kind === "interpretation").length,
    hypotheses: claims.filter((c) => c.kind === "hypothesis").length,
    sourcedFacts: facts.filter((c) => (c.sources?.length ?? 0) > 0).length,
  };
}
