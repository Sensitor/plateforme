import { ALL_ACADEMY_CATEGORIES, type AcademyCategory } from "@/content/concepts";
import { CONFIDENCE, MATURITY, PILLARS, RISK_CATEGORIES, RISK_LEVELS, SECTORS, TECH_TOPICS } from "@/lib/research/taxonomy";
import type { Confidence, Maturity, PillarId, RiskCategory, RiskLevel, SectorId, TechTopic } from "@/lib/research/types";

/** English labels come straight from the research taxonomy, so there is a single source of truth. */
export const labels = {
  sectors: Object.fromEntries(SECTORS.map((s) => [s.id, { label: s.label, short: s.short, description: s.description }])) as Record<SectorId, { label: string; short: string; description: string }>,
  pillars: Object.fromEntries(PILLARS.map((p) => [p.id, { label: p.label, question: p.question, criteria: p.criteria, scaleNote: p.scaleNote }])) as Record<
    PillarId,
    { label: string; question: string; criteria: string[]; scaleNote: string }
  >,
  riskCategories: { ...RISK_CATEGORIES } as Record<RiskCategory, string>,
  riskLevels: Object.fromEntries(Object.entries(RISK_LEVELS).map(([k, v]) => [k, v.label])) as Record<RiskLevel, string>,
  maturity: { ...MATURITY } as Record<Maturity, string>,
  confidence: { ...CONFIDENCE } as Record<Confidence, string>,
  techTopics: { ...TECH_TOPICS } as Record<TechTopic, string>,
  academyTracks: Object.fromEntries(ALL_ACADEMY_CATEGORIES.map((c) => [c.id, { label: c.label, description: c.description }])) as Record<AcademyCategory, { label: string; description: string }>,
  levels: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
};
