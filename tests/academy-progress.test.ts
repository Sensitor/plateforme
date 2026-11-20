import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { academyCatalog } from "@/lib/academy/catalog";
import { computeBadges, newlyEarned } from "@/lib/academy/badges";
import { isBetter, isValidResult, type Progress, type QuizResult } from "@/lib/academy/results";
import { academyChanges, academyFromRemote, academyToRemote, mergeAcademy } from "@/lib/sync/merge";

const at = "2026-11-20T10:00:00.000Z";
const r = (score: number, total = 3): QuizResult => ({ score, total, at });
const catalog = academyCatalog();

describe("Academy results", () => {
  it("orders results by share right, then by answers right", () => {
    expect(isBetter(r(3), r(2))).toBe(true);
    expect(isBetter(r(2), r(2))).toBe(false);
    expect(isBetter(r(1), r(2))).toBe(false);
    expect(isBetter(r(2), undefined)).toBe(true);
    expect(isBetter(r(4, 6), r(2, 3))).toBe(true);
  });

  it("rejects corrupted results", () => {
    expect(isValidResult(r(2))).toBe(true);
    expect(isValidResult({ score: 4, total: 3, at })).toBe(false);
    expect(isValidResult({ score: 1.5, total: 3, at })).toBe(false);
    expect(isValidResult({ score: 1, total: 0, at })).toBe(false);
    expect(isValidResult({ score: 1, total: 3, at: "yesterday" })).toBe(false);
    expect(isValidResult(null)).toBe(false);
  });
});

describe("Academy sync", () => {
  it("adopts guest progress and keeps the best result per lesson", () => {
    const local: Progress = { stablecoins: r(3), "market-cap-vs-fdv": r(1), "token-unlocks": r(2) };
    const remote: Progress = { stablecoins: r(2), "market-cap-vs-fdv": r(2) };
    const { merged, toUpsert } = mergeAcademy(local, remote, true);
    expect(merged.stablecoins.score).toBe(3);
    expect(merged["market-cap-vs-fdv"].score).toBe(2);
    expect(merged["token-unlocks"].score).toBe(2);
    expect(toUpsert.sort()).toEqual(["stablecoins", "token-unlocks"]);
  });

  it("discards progress left by another account", () => {
    const { merged, toUpsert } = mergeAcademy({ stablecoins: r(3) }, { defi: r(2) }, false);
    expect(merged).toEqual({ defi: r(2) });
    expect(toUpsert).toEqual([]);
  });

  it("never uploads invalid slugs or results", () => {
    const local = { "Bad Slug": r(3), stablecoins: { score: 9, total: 3, at } } as Progress;
    expect(mergeAcademy(local, {}, true).toUpsert).toEqual([]);
  });

  it("mirrors only improvements after the first sync", () => {
    const cloud: Progress = { stablecoins: r(2) };
    expect(academyChanges(cloud, { stablecoins: r(2) })).toEqual([]);
    expect(academyChanges(cloud, { stablecoins: r(3), defi: r(1) }).sort()).toEqual(["defi", "stablecoins"]);
  });

  it("maps rows to and from the database", () => {
    const row = academyToRemote("stablecoins", r(2), "u1");
    expect(row).toEqual({ user_id: "u1", concept_slug: "stablecoins", score: 2, total: 3, achieved_at: at });
    expect(academyFromRemote([row])).toEqual({ stablecoins: r(2) });
  });
});

describe("Academy badges", () => {
  it("covers every track plus the cross-track badges, all unearned at first", () => {
    const badges = computeBadges({}, catalog);
    expect(badges).toHaveLength(catalog.tracks.length + 4);
    expect(new Set(badges.map((b) => b.id)).size).toBe(badges.length);
    expect(badges.every((b) => !b.earned && b.done === 0 && b.total > 0)).toBe(true);
  });

  it("awards a track once all its lessons are passed", () => {
    const track = catalog.tracks[0];
    const slugs = catalog.lessons.filter((l) => l.category === track.id).map((l) => l.slug);
    const partial = Object.fromEntries(slugs.slice(1).map((s) => [s, r(2)]));
    const full = { ...partial, [slugs[0]]: r(2) };
    const badge = (p: Progress) => computeBadges(p, catalog).find((b) => b.id === `track-${track.id}`)!;
    expect(badge(partial).earned).toBe(false);
    expect(badge(partial).done).toBe(slugs.length - 1);
    expect(badge(full).earned).toBe(true);
    // a failed quiz (1 of 3) does not complete a lesson
    expect(badge({ ...partial, [slugs[0]]: r(1) }).earned).toBe(false);
  });

  it("counts full marks and the whole curriculum", () => {
    const all = Object.fromEntries(catalog.lessons.map((l) => [l.slug, r(3)]));
    const badges = computeBadges(all, catalog);
    expect(badges.every((b) => b.earned)).toBe(true);
    const fourPerfect = Object.fromEntries(catalog.lessons.slice(0, 4).map((l) => [l.slug, r(3)]));
    expect(computeBadges(fourPerfect, catalog).find((b) => b.id === "sharp-reader")!.earned).toBe(false);
  });

  it("reports only the badges a result has just earned", () => {
    const first = catalog.lessons[0].slug;
    const earned = newlyEarned(computeBadges({}, catalog), computeBadges({ [first]: r(2) }, catalog));
    expect(earned.map((b) => b.id)).toContain("first-lesson");
    expect(newlyEarned(computeBadges({ [first]: r(2) }, catalog), computeBadges({ [first]: r(3) }, catalog))).toEqual([]);
  });
});

describe("academy_progress migration", () => {
  const sql = readFileSync("supabase/migrations/0003_academy.sql", "utf8");
  it("enables row level security and keeps anon out", () => {
    expect(sql).toMatch(/enable row level security/);
    expect(sql).toMatch(/using \(user_id = auth\.uid\(\)\) with check \(user_id = auth\.uid\(\)\)/);
    expect(sql).toMatch(/revoke all on public\.academy_progress from anon/);
  });
  it("is safe to re-run", () => {
    expect(sql).toMatch(/create table if not exists public\.academy_progress/);
    expect(sql).toMatch(/drop policy if exists/);
    expect(sql).toMatch(/drop trigger if exists/);
  });
});
