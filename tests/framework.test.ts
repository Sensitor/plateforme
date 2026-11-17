import { describe, expect, it } from "vitest";
import { compositeScore } from "@/lib/research/framework";
import type { PillarAssessment, PillarId } from "@/lib/research/types";

const ids: PillarId[] = ["technology", "tokenomics", "adoption", "financials", "governance", "competition", "risk"];
const make = (ratings: (1 | 2 | 3 | 4 | 5 | null)[], confidence: PillarAssessment["confidence"][] = []): PillarAssessment[] =>
  ids.map((pillar, i) => ({ pillar, rating: ratings[i], confidence: confidence[i] ?? "medium", summary: "", dataUsed: [], limitations: "", sources: [] }));

describe("compositeScore", () => {
  it("averages seven rated pillars", () => {
    expect(compositeScore(make([5, 4, 3, 4, 3, 4, 5])).score).toBe(4);
  });

  it("withholds the composite when a pillar is not rated", () => {
    const r = compositeScore(make([5, 4, 3, null, 3, 4, 5]));
    expect(r.score).toBeNull();
    expect(r.withheldReason).toMatch(/1 of 7 pillars/);
  });

  it("withholds the composite when any pillar has low confidence", () => {
    const r = compositeScore(make([5, 4, 3, 4, 3, 4, 5], ["high", "low"]));
    expect(r.score).toBeNull();
    expect(r.withheldReason).toMatch(/low confidence/);
  });

  it("rounds to one decimal", () => {
    expect(compositeScore(make([5, 5, 4, 4, 4, 4, 4])).score).toBe(4.3);
  });
});
