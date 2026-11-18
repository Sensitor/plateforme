import { describe, expect, it } from "vitest";
import { CONCEPTS, CONCEPT_BY_SLUG } from "@/content/concepts";
import { CONCEPT_DEEP } from "@/content/academy-deep";
import { PROJECT_BY_SLUG } from "@/content/projects";
import { lessonMinutes } from "@/lib/academy/lesson";
import { drawdownSeries } from "@/lib/market/series";

const entries = Object.entries(CONCEPT_DEEP);

describe("Academy in-depth lessons", () => {
  it("gives every concept an in-depth lesson", () => {
    for (const c of CONCEPTS) expect(CONCEPT_DEEP[c.slug], c.slug).toBeDefined();
  });

  it("starts the suggested path with existing lessons", async () => {
    const { START_HERE } = await import("@/content/academy-deep");
    expect(START_HERE.length).toBe(10);
    for (const s of START_HERE) expect(CONCEPT_DEEP[s], s).toBeDefined();
  });

  for (const [slug, d] of entries) {
    describe(slug, () => {
      it("extends an existing concept", () => {
        expect(CONCEPT_BY_SLUG[slug], slug).toBeDefined();
      });
      it("has a complete lesson structure", () => {
        expect(d.minute.length).toBeGreaterThan(80);
        expect(d.steps.length).toBeGreaterThanOrEqual(4);
        expect(d.example.paragraphs.length).toBeGreaterThanOrEqual(2);
        expect(d.metrics.length).toBeGreaterThanOrEqual(3);
        expect(d.misconceptions.length).toBeGreaterThanOrEqual(2);
        expect(d.risks.length).toBeGreaterThanOrEqual(3);
        expect(d.sources.length).toBeGreaterThanOrEqual(3);
      });
      it("links worked examples to covered projects", () => {
        for (const p of d.example.projects) expect(PROJECT_BY_SLUG[p], `${slug}: ${p}`).toBeDefined();
      });
      it("has a well-formed quiz", () => {
        expect(d.quiz.length).toBe(3);
        for (const q of d.quiz) {
          expect(q.options.length).toBe(4);
          expect(new Set(q.options).size).toBe(4);
          expect(q.answer).toBeGreaterThanOrEqual(0);
          expect(q.answer).toBeLessThan(q.options.length);
          expect(q.explanation.length).toBeGreaterThan(20);
        }
      });
      it("cites https sources only", () => {
        for (const s of d.sources) expect(s.url).toMatch(/^https:\/\//);
      });
      it("contains no live market figures outside hypothetical quiz questions", () => {
        const text = [d.minute, ...d.steps.map((s) => s.text), ...d.example.paragraphs, ...d.metrics.map((m) => m.read), ...d.misconceptions.flatMap((m) => [m.myth, m.reality]), ...d.risks].join(" ");
        expect(text).not.toMatch(/\$\s?\d/);
      });
      it("never uses long dashes", () => {
        expect(JSON.stringify(d)).not.toMatch(/[–—]/);
      });
    });
  }

  it("gives every lesson a reading time", () => {
    for (const c of CONCEPTS) expect(lessonMinutes(c)).toBeGreaterThanOrEqual(1);
    expect(lessonMinutes(CONCEPT_BY_SLUG.amm)).toBeGreaterThan(lessonMinutes({ ...CONCEPT_BY_SLUG.amm, slug: "x" }, undefined));
  });

  it("computes drawdowns from the running peak", () => {
    const dd = drawdownSeries([100, 120, 60, 90, 130].map((v, i) => ({ t: i, v })));
    expect(dd.map((p) => Math.round(p.v))).toEqual([0, 0, -50, -25, 0]);
  });
});
