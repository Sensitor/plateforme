import { ALL_ACADEMY_CATEGORIES, CONCEPTS, type AcademyCategory } from "@/content/concepts";
import { START_HERE } from "@/content/academy-deep";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";

/**
 * The shape of the curriculum, without lesson content: small enough to pass
 * from a Server Component to client components (progress, badges). Track
 * labels are in the interface language.
 */
export interface AcademyCatalog {
  lessons: { slug: string; category: AcademyCategory }[];
  startHere: string[];
  tracks: { id: AcademyCategory; label: string }[];
}

export function academyCatalog(t: Dictionary = getDictionary("en")): AcademyCatalog {
  return {
    lessons: CONCEPTS.map((c) => ({ slug: c.slug, category: c.category })),
    startHere: [...START_HERE],
    tracks: ALL_ACADEMY_CATEGORIES.map((c) => ({ id: c.id, label: t.labels.academyTracks[c.id].label })),
  };
}
