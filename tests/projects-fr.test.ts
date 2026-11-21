import { describe, expect, it } from "vitest";
import { PROJECTS, PROJECT_BY_SLUG } from "@/content/projects";
import { PROJECT_TEXT_FR } from "@/content/fr/projects";
import { KEY_DATES_FR } from "@/content/fr/key-dates";
import { KEY_DATES, keyDatesFor } from "@/content/key-dates";
import { allClaims } from "@/lib/research/framework";
import { applyProjectText, isProjectTranslated, localizedProject, projectText, type ProjectText } from "@/lib/research/localized";
import type { Project } from "@/lib/research/types";

const plain = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

function shapeProblems(a: unknown, b: unknown, path: string, out: string[]) {
  const kind = (v: unknown) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);
  if (kind(a) !== kind(b)) {
    out.push(`${path}: ${kind(a)} in English, ${kind(b)} in French`);
    return;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) out.push(`${path}: ${a.length} items in English, ${b.length} in French`);
    a.forEach((x, i) => shapeProblems(x, b[i], `${path}[${i}]`, out));
  } else if (a && typeof a === "object") {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b as object).sort();
    for (const k of ka) if (!kb.includes(k)) out.push(`${path}.${k}: missing in French`);
    for (const k of kb) if (!ka.includes(k)) out.push(`${path}.${k}: only in French`);
    for (const k of ka) if (kb.includes(k)) shapeProblems((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${path}.${k}`, out);
  }
}

function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => strings(x, out));
  return out;
}

/** Everything except the text: claim kinds and sources, ratings, parameters, URLs, source titles. */
const mask = (v: unknown): unknown => (typeof v === "string" ? "·" : Array.isArray(v) ? v.map(mask) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, mask(x)])) : v);
const dataLayer = (p: Project) => JSON.stringify(applyProjectText(p, mask(projectText(p)) as ProjectText));

describe("French research dossiers", () => {
  it("cover every project", () => {
    for (const p of PROJECTS) expect(isProjectTranslated(p.slug, "fr"), p.slug).toBe(true);
  });

  it("only translate projects that exist", () => {
    for (const slug of Object.keys(PROJECT_TEXT_FR)) expect(PROJECT_BY_SLUG[slug], slug).toBeDefined();
  });

  it("keep exactly the structure of the English dossier", () => {
    for (const [slug, fr] of Object.entries(PROJECT_TEXT_FR)) {
      const problems: string[] = [];
      shapeProblems(plain(projectText(PROJECT_BY_SLUG[slug]!)), plain(fr), slug, problems);
      expect(problems).toEqual([]);
    }
  });

  it("change only the text: claim types, sources, ratings and parameters stay identical", () => {
    for (const p of PROJECTS) {
      const fr = localizedProject(p, "fr");
      expect(dataLayer(fr), p.slug).toBe(dataLayer(p));
      expect(allClaims(fr).map((c) => [c.kind, c.sources])).toEqual(allClaims(p).map((c) => [c.kind, c.sources]));
    }
  });

  it("follow the writing and data rules", () => {
    for (const [slug, fr] of Object.entries(PROJECT_TEXT_FR)) {
      const all = strings(fr);
      expect(all.filter((s) => /[–—]/.test(s)), slug).toEqual([]);
      expect(all.filter((s) => !s.trim()), slug).toEqual([]);
      // Live market numbers never live in dossiers, in any language.
      expect(all.filter((s) => /\$\s?\d/.test(s)), slug).toEqual([]);
    }
  });
});

describe("French key dates", () => {
  it("translate every supply event, in the same order and with the same data", () => {
    expect(KEY_DATES_FR.length).toBe(KEY_DATES.length);
    const fr = keyDatesFor("fr");
    expect(fr.map((d) => [d.slug, d.kind])).toEqual(KEY_DATES.map((d) => [d.slug, d.kind]));
    for (const d of fr) expect(/[–—]/.test(d.title + d.when) || !d.title.trim() || !d.when.trim(), d.title).toBe(false);
    expect(keyDatesFor("en")).toBe(KEY_DATES);
  });
});
