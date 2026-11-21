import { describe, expect, it } from "vitest";
import { CONCEPT_DEEP, START_HERE } from "@/content/academy-deep";
import { CONCEPTS, CONCEPT_BY_SLUG } from "@/content/concepts";
import { CONCEPT_DEEP_FR, CONCEPT_TEXT_FR } from "@/content/fr/academy";
import { isLessonTranslated, localizedConceptBySlug, localizedDeep } from "@/lib/academy/localized";

function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => strings(x, out));
  return out;
}

const translated = Object.keys(CONCEPT_TEXT_FR);

describe("French Academy lessons", () => {
  it("cover every lesson, Start here first", () => {
    for (const slug of START_HERE) expect(isLessonTranslated(slug, "fr"), slug).toBe(true);
    for (const c of CONCEPTS) expect(isLessonTranslated(c.slug, "fr"), c.slug).toBe(true);
  });

  it("only translate lessons that exist", () => {
    for (const slug of [...translated, ...Object.keys(CONCEPT_DEEP_FR)]) expect(CONCEPT_BY_SLUG[slug], slug).toBeDefined();
  });

  it("keep the structure of the English lesson", () => {
    for (const slug of translated) {
      const en = CONCEPT_BY_SLUG[slug]!;
      const fr = CONCEPT_TEXT_FR[slug]!;
      expect(fr.body.length, `${slug} body`).toBe(en.body.length);
      expect(fr.keyTakeaways.length, `${slug} takeaways`).toBe(en.keyTakeaways.length);
      const enDeep = CONCEPT_DEEP[slug];
      const frDeep = CONCEPT_DEEP_FR[slug];
      if (!enDeep) continue;
      expect(frDeep, `${slug} deep`).toBeDefined();
      expect(frDeep!.steps.length, `${slug} steps`).toBe(enDeep.steps.length);
      expect(frDeep!.metrics.length, `${slug} metrics`).toBe(enDeep.metrics.length);
      expect(frDeep!.misconceptions.length, `${slug} misconceptions`).toBe(enDeep.misconceptions.length);
      expect(frDeep!.risks.length, `${slug} risks`).toBe(enDeep.risks.length);
      expect(frDeep!.example.paragraphs.length, `${slug} example`).toBe(enDeep.example.paragraphs.length);
      expect(frDeep!.quiz.length, `${slug} quiz`).toBe(enDeep.quiz.length);
      frDeep!.quiz.forEach((q, i) => expect(q.options.length, `${slug} quiz ${i}`).toBe(enDeep.quiz[i].options.length));
      expect(Boolean(frDeep!.flow), `${slug} flow`).toBe(Boolean(enDeep.flow));
      expect(Boolean(frDeep!.table), `${slug} table`).toBe(Boolean(enDeep.table));
    }
  });

  it("merge over the English lesson without losing answers, sources or visuals", () => {
    for (const { slug } of CONCEPTS) {
      const en = CONCEPT_DEEP[slug]!;
      const fr = localizedDeep(slug, "fr")!;
      expect(fr.visual).toBe(en.visual);
      expect(fr.quiz.map((q) => q.answer)).toEqual(en.quiz.map((q) => q.answer));
      expect(fr.sources).toEqual(en.sources);
      expect(fr.example.projects).toEqual(en.example.projects);
      expect(fr.example.live).toBe(en.example.live);
      const c = localizedConceptBySlug(slug, "fr")!;
      expect([c.related, c.level, c.category]).toEqual([CONCEPT_BY_SLUG[slug]!.related, CONCEPT_BY_SLUG[slug]!.level, CONCEPT_BY_SLUG[slug]!.category]);
      expect(localizedDeep(slug, "en")).toBe(en);
    }
  });

  it("follow the writing rules", () => {
    const all = strings([CONCEPT_TEXT_FR, CONCEPT_DEEP_FR]);
    expect(all.filter((s) => /[–—]/.test(s))).toEqual([]);
    expect(all.filter((s) => !s.trim())).toEqual([]);
    // Lessons never quote live prices: no dollar amount in the translated text.
    expect(all.filter((s) => /\$\s?\d/.test(s))).toEqual([]);
  });
});
