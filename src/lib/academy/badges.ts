import { ACADEMY_COLORS } from "@/lib/brand";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
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
export function computeBadges(progress: Progress, catalog: AcademyCatalog, dict: Dictionary = getDictionary("en")): Badge[] {
  const t = dict.academy.badges;
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
    make("first-lesson", t.firstLesson.label, t.firstLesson.description, "#7896FF", Math.min(doneAll, 1), 1),
    make("start-here", t.startHere.label, t.startHere.description(catalog.startHere.length), "#9C83E8", catalog.startHere.filter(completed).length, catalog.startHere.length),
    ...catalog.tracks.map((tr) => {
      const slugs = catalog.lessons.filter((l) => l.category === tr.id).map((l) => l.slug);
      return make(`track-${tr.id}`, tr.label, t.track(tr.label), ACADEMY_COLORS[tr.id], slugs.filter(completed).length, slugs.length);
    }),
    make("sharp-reader", t.sharpReader.label, t.sharpReader.description(PERFECT_TARGET), "#7896FF", perfect, PERFECT_TARGET),
    make("full-curriculum", t.fullCurriculum.label, t.fullCurriculum.description(all.length), "#9C83E8", doneAll, all.length),
  ];
}

/** Badges earned in `after` that were not earned in `before` (for the "badge earned" notice). */
export function newlyEarned(before: Badge[], after: Badge[]): Badge[] {
  const had = new Set(before.filter((b) => b.earned).map((b) => b.id));
  return after.filter((b) => b.earned && !had.has(b.id));
}
