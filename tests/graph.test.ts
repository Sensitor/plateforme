import { describe, expect, it } from "vitest";
import { PROJECTS, PROJECT_BY_SLUG } from "@/content/projects";
import { ECOSYSTEMS, RELATIONSHIPS, RELATION_META } from "@/content/relationships";
import { buildGraph, GRAPH_HEIGHT, GRAPH_WIDTH, radiusFor } from "@/lib/graph-layout";

const SECTIONS = new Set(["overview", "technology", "tokenomics", "adoption", "financials", "onchain", "competitors", "risks", "thesis", "framework", "learn", "sources"]);

describe("knowledge graph content", () => {
  it("only links covered projects, never to themselves", () => {
    for (const r of RELATIONSHIPS) {
      expect(PROJECT_BY_SLUG[r.from], r.from).toBeDefined();
      expect(PROJECT_BY_SLUG[r.to], r.to).toBeDefined();
      expect(r.from).not.toBe(r.to);
      expect(RELATION_META[r.kind]).toBeDefined();
      expect(r.note.length).toBeGreaterThan(10);
    }
  });

  it("backs every relationship with a dossier section or an https source", () => {
    for (const r of RELATIONSHIPS) {
      if (r.evidence.startsWith("dossier:")) {
        const [slug, section] = r.evidence.slice(8).split("#");
        expect(PROJECT_BY_SLUG[slug], r.evidence).toBeDefined();
        expect(SECTIONS.has(section), r.evidence).toBe(true);
      } else {
        expect(r.evidence.startsWith("https://"), r.evidence).toBe(true);
      }
    }
  });

  it("has no duplicate relationships", () => {
    const keys = RELATIONSHIPS.map((r) => (RELATION_META[r.kind].directed ? `${r.from}>${r.to}:${r.kind}` : `${[r.from, r.to].sort().join("|")}:${r.kind}`));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("assigns every project to exactly one ecosystem", () => {
    const all = ECOSYSTEMS.flatMap((e) => e.members);
    expect(new Set(all).size).toBe(all.length);
    expect(all.sort()).toEqual(PROJECTS.map((p) => p.slug).sort());
  });
});

describe("graph layout", () => {
  it("is deterministic and fits the canvas", () => {
    const a = buildGraph(null);
    const b = buildGraph(null);
    expect(a.nodes.map((n) => [n.x, n.y])).toEqual(b.nodes.map((n) => [n.x, n.y]));
    for (const n of a.nodes) {
      expect(n.x - n.r).toBeGreaterThanOrEqual(0);
      expect(n.x + n.r).toBeLessThanOrEqual(GRAPH_WIDTH);
      expect(n.y - n.r).toBeGreaterThanOrEqual(0);
      expect(n.y + n.r).toBeLessThanOrEqual(GRAPH_HEIGHT);
    }
  });

  it("scales node size with market cap", () => {
    expect(radiusFor(null)).toBe(20);
    expect(radiusFor(1e12)).toBeGreaterThan(radiusFor(1e9));
    expect(radiusFor(1e15)).toBe(36);
  });
});
