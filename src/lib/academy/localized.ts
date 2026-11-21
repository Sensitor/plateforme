import type { Concept, ConceptDeep, FlowSpec, TableSpec } from "@/content/concepts";
import { CONCEPT_DEEP } from "@/content/academy-deep";
import { CONCEPT_BY_SLUG } from "@/content/concepts";
import { CONCEPT_DEEP_FR, CONCEPT_TEXT_FR } from "@/content/fr/academy";
import type { Locale } from "@/i18n/config";

/** Translatable part of a concept card. Slug, category, level and links stay with the English source. */
export type ConceptText = Pick<Concept, "title" | "summary" | "body" | "keyTakeaways">;

/**
 * Translatable part of an in-depth lesson. Structure that must not drift
 * (visual, sources, example projects, quiz answers) stays in the English file;
 * a translation only replaces the words, and tests check both have the same shape.
 */
export interface DeepText {
  minute: string;
  steps: { title: string; text: string }[];
  visualCaption?: string;
  flow?: FlowSpec;
  table?: TableSpec;
  example: { title: string; paragraphs: string[] };
  metrics: { label: string; read: string }[];
  misconceptions: { myth: string; reality: string }[];
  risks: string[];
  quiz: { question: string; options: string[]; explanation: string }[];
}

const TEXT: Record<Locale, Partial<Record<string, ConceptText>>> = { en: {}, fr: CONCEPT_TEXT_FR };
const DEEP: Record<Locale, Partial<Record<string, DeepText>>> = { en: {}, fr: CONCEPT_DEEP_FR };

/** True when the lesson is fully available in this language (card and in-depth lesson). */
export function isLessonTranslated(slug: string, locale: Locale): boolean {
  return locale === "en" || Boolean(TEXT[locale][slug] && (DEEP[locale][slug] || !CONCEPT_DEEP[slug]));
}

/** Concept card in the requested language, falling back to English. */
export function localizedConcept(c: Concept, locale: Locale): Concept {
  const t = TEXT[locale][c.slug];
  return t ? { ...c, ...t } : c;
}

export function localizedConceptBySlug(slug: string, locale: Locale): Concept | undefined {
  const c = CONCEPT_BY_SLUG[slug];
  return c ? localizedConcept(c, locale) : undefined;
}

/** In-depth lesson in the requested language, falling back to English. */
export function localizedDeep(slug: string, locale: Locale): ConceptDeep | undefined {
  const en = CONCEPT_DEEP[slug];
  const t = DEEP[locale][slug];
  if (!en || !t) return en;
  return {
    ...en,
    minute: t.minute,
    steps: t.steps,
    visualCaption: t.visualCaption ?? en.visualCaption,
    flow: t.flow ?? en.flow,
    table: t.table ?? en.table,
    example: { ...en.example, title: t.example.title, paragraphs: t.example.paragraphs },
    metrics: t.metrics,
    misconceptions: t.misconceptions,
    risks: t.risks,
    quiz: en.quiz.map((q, i) => ({ ...q, ...t.quiz[i] })),
  };
}
