import { ACADEMY_COLORS } from "@/lib/brand";
import type { AcademyCatalog } from "./catalog";
import { isCompleted, isPerfect, type Progress } from "./results";

export interface Badge {
  id: string;
  label: string;
  description: string;
  color: string;
  done: number;
  total: number;
  earned: boolean;
}

const PERFECT_TARGET = 5;

/** Badges are derived from quiz results only, so they follow progress wherever it is synced. */
export function computeBadges(progress: Progress, catalog: AcademyCatalog): Badge[] {
  const completed = (slug: string) => isCompleted(progress[slug]);
  const all = catalog.lessons.map((l) => l.slug);
  const doneAll = all.filter(completed).length;
  const perfect = Object.entries(progress).filter(([slug, r]) => all.includes(slug) && isPerfect(r)).length;
  const make = (id: string, label: string, description: string, color: string, done: number, total: number): Badge => ({
    id,
    label,
    description,
    color,
    done: Math.min(done, total),
    total,
    earned: total > 0 && done >= total,
  });

  return [
    make("first-lesson", "First lesson", "Pass the quiz of any lesson.", "#7896FF", Math.min(doneAll, 1), 1),
    make("start-here", "Fundamentals", `Complete the ${catalog.startHere.length} Start here lessons.`, "#9C83E8", catalog.startHere.filter(completed).length, catalog.startHere.length),
    ...catalog.tracks.map((t) => {
      const slugs = catalog.lessons.filter((l) => l.category === t.id).map((l) => l.slug);
      return make(`track-${t.id}`, t.label, `Complete every lesson of the ${t.label} track.`, ACADEMY_COLORS[t.id], slugs.filter(completed).length, slugs.length);
    }),
    make("sharp-reader", "Sharp reader", `Score full marks on ${PERFECT_TARGET} quizzes.`, "#7896FF", perfect, PERFECT_TARGET),
    make("full-curriculum", "Full curriculum", `Complete all ${all.length} lessons.`, "#9C83E8", doneAll, all.length),
  ];
}

/** Badges earned in `after` that were not earned in `before` (for the "badge earned" notice). */
export function newlyEarned(before: Badge[], after: Badge[]): Badge[] {
  const had = new Set(before.filter((b) => b.earned).map((b) => b.id));
  return after.filter((b) => b.earned && !had.has(b.id));
}
