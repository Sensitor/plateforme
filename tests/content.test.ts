import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/content/projects";
import { CONCEPT_BY_SLUG, CONCEPTS } from "@/content/concepts";
import { allClaims } from "@/lib/research/framework";
import { PILLARS, SECTORS } from "@/lib/research/taxonomy";

/**
 * Editorial integrity checks. These run in CI so that a dossier can never be
 * published with a broken source reference, an unknown concept or an
 * inconsistent token distribution.
 */
describe("research content integrity", () => {
  it("has unique slugs and data mappings", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const cg = PROJECTS.map((p) => p.data.coingeckoId);
    expect(new Set(cg).size).toBe(cg.length);
  });

  it("covers every sector at least once", () => {
    const covered = new Set(PROJECTS.map((p) => p.sector));
    for (const s of SECTORS) expect(covered.has(s.id), `sector ${s.id}`).toBe(true);
  });

  for (const p of PROJECTS) {
    describe(p.name, () => {
      const sourceIds = new Set(p.dossier.sources.map((s) => s.id));

      it("has unique source ids with https URLs", () => {
        expect(sourceIds.size).toBe(p.dossier.sources.length);
        for (const s of p.dossier.sources) expect(s.url.startsWith("https://"), s.url).toBe(true);
      });

      it("references only existing sources from claims", () => {
        for (const c of allClaims(p)) {
          for (const id of c.sources ?? []) expect(sourceIds.has(id), `${p.slug}: unknown source "${id}" in "${c.text.slice(0, 40)}…"`).toBe(true);
        }
      });

      it("references only existing sources from framework and tokenomics", () => {
        for (const a of p.dossier.framework) for (const id of a.sources) expect(sourceIds.has(id), `${p.slug}/${a.pillar}: ${id}`).toBe(true);
        for (const id of p.dossier.tokenomics.distributionSources ?? []) expect(sourceIds.has(id), id).toBe(true);
      });

      it("rates each pillar exactly once", () => {
        const pillars = p.dossier.framework.map((a) => a.pillar).sort();
        expect(pillars).toEqual(PILLARS.map((x) => x.id).sort());
      });

      it("has a token distribution summing to ~100% when charted", () => {
        const d = p.dossier.tokenomics.distribution;
        if (!d) return;
        const total = d.reduce((s, x) => s + x.pct, 0);
        expect(Math.abs(total - 100)).toBeLessThan(0.05);
      });

      it("assesses all seven risk categories once", () => {
        const cats = p.dossier.risks.map((r) => r.category);
        expect(new Set(cats).size).toBe(7);
      });

      it("links only to known Academy concepts", () => {
        for (const c of p.dossier.concepts) expect(CONCEPT_BY_SLUG[c], `${p.slug}: concept ${c}`).toBeDefined();
      });

      it("never stores live market numbers in claims", () => {
        // Prices and market caps must come from data providers at render time.
        for (const c of allClaims(p)) expect(/\$\s?\d/.test(c.text), `${p.slug}: "${c.text}"`).toBe(false);
      });

      it("has thesis invalidation conditions", () => {
        expect(p.dossier.thesis.invalidation.length).toBeGreaterThan(0);
      });
    });
  }

  it("has unique concept slugs with valid related links", () => {
    const slugs = CONCEPTS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const c of CONCEPTS) for (const r of c.related) expect(CONCEPT_BY_SLUG[r], `${c.slug} → ${r}`).toBeDefined();
  });
});
