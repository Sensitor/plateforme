/** Academy quiz results: pure helpers shared by the browser store, the cloud sync and badges. */

export interface QuizResult {
  score: number;
  total: number;
  at: string;
}
/** { [conceptSlug]: best result } */
export type Progress = Record<string, QuizResult>;

/** A concept counts as completed when its quiz was passed (at least two thirds right). */
export const isCompleted = (r: QuizResult | undefined) => Boolean(r && r.score / r.total >= 2 / 3);

/** True for a full-marks result. */
export const isPerfect = (r: QuizResult | undefined) => Boolean(r && r.score === r.total);

/** True when `a` is a strictly better result than `b` (higher share right, then more answers right). */
export function isBetter(a: QuizResult, b: QuizResult | undefined): boolean {
  if (!b) return true;
  const ra = a.score / a.total;
  const rb = b.score / b.total;
  return ra > rb || (ra === rb && a.score > b.score);
}

/** Guards against corrupted browser storage before anything is uploaded. */
export function isValidResult(r: unknown): r is QuizResult {
  if (!r || typeof r !== "object") return false;
  const { score, total, at } = r as Record<string, unknown>;
  return (
    Number.isInteger(score) &&
    Number.isInteger(total) &&
    (total as number) >= 1 &&
    (total as number) <= 20 &&
    (score as number) >= 0 &&
    (score as number) <= (total as number) &&
    typeof at === "string" &&
    !Number.isNaN(Date.parse(at))
  );
}
