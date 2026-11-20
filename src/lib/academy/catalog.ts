import { ACADEMY_CATEGORIES, CONCEPTS, type AcademyCategory } from "@/content/concepts";
import { START_HERE } from "@/content/academy-deep";

/**
 * The shape of the curriculum, without lesson content: small enough to pass
 * from a Server Component to client components (progress, badges).
 */
export interface AcademyCatalog {
  lessons: { slug: string; category: AcademyCategory }[];
  startHere: string[];
  tracks: { id: AcademyCategory; label: string }[];
}

export function academyCatalog(): AcademyCatalog {
  return {
    lessons: CONCEPTS.map((c) => ({ slug: c.slug, category: c.category })),
    startHere: [...START_HERE],
    tracks: ACADEMY_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  };
}
