import type { Concept, ConceptDeep } from "@/content/concepts";
import { CONCEPT_DEEP } from "@/content/academy-deep";

/** Reading time of a lesson in minutes (220 words per minute, at least 1). */
export function lessonMinutes(concept: Concept, deep: ConceptDeep | undefined = CONCEPT_DEEP[concept.slug]): number {
  const parts: string[] = [concept.summary, ...concept.body, ...concept.keyTakeaways];
  if (deep) {
    parts.push(deep.minute, ...deep.steps.flatMap((s) => [s.title, s.text]), deep.example.title, ...deep.example.paragraphs);
    parts.push(...deep.metrics.flatMap((m) => [m.label, m.read]), ...deep.misconceptions.flatMap((m) => [m.myth, m.reality]), ...deep.risks);
    parts.push(...deep.quiz.flatMap((q) => [q.question, ...q.options, q.explanation]));
  }
  const words = parts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const hasDeepLesson = (slug: string) => Boolean(CONCEPT_DEEP[slug]);
