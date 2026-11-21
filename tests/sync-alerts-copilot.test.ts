import { describe, expect, it } from "vitest";
import { diffIds, fromRemote, isUuid, mergeTransactions, mergeWatchlist, toRemote } from "@/lib/sync/merge";
import { describeRule, evaluateAlert, triggeredCopy } from "@/lib/alerts/evaluate";
import { renderAlertEmail } from "@/lib/alerts/email";
import { buildContext, detectProjects, matchConcepts, projectContext } from "@/lib/copilot/context";
import { stripDashes, systemPrompt } from "@/lib/copilot/prompt";
import { safeNext } from "@/lib/auth/redirect";
import { PROJECT_BY_SLUG } from "@/content/projects";
import type { Transaction } from "@/lib/portfolio/engine";
import type { DataResult, Quote } from "@/lib/market/types";

const tx = (id: string, date = "2026-01-02"): Transaction => ({ id, date, asset: "ethereum", side: "buy", quantity: 1, price: 2000, fee: 1 });
const U1 = "11111111-1111-4111-8111-111111111111";
const U2 = "22222222-2222-4222-8222-222222222222";
const U3 = "33333333-3333-4333-8333-333333333333";
let n = 0;
const newId = () => `aaaaaaaa-aaaa-4aaa-8aaa-${String(++n).padStart(12, "0")}`;

describe("auth redirect", () => {
  it("accepts same-site paths only", () => {
    expect(safeNext("/alerts")).toBe("/alerts");
    expect(safeNext("/account?recovery=1")).toBe("/account?recovery=1");
    expect(safeNext("https://evil.example")).toBe("/overview");
    expect(safeNext("//evil.example")).toBe("/overview");
    expect(safeNext("/\\evil.example")).toBe("/overview");
    expect(safeNext("/auth/callback")).toBe("/overview");
    expect(safeNext(null, "/x")).toBe("/x");
  });
});

describe("cloud sync merge", () => {
  it("adopts guest watchlist items into the account, remote first", () => {
    const r = mergeWatchlist(["solana", "bitcoin"], ["bitcoin", "ethereum"], true, 10);
    expect(r.merged).toEqual(["bitcoin", "ethereum", "solana"]);
    expect(r.toInsert).toEqual(["solana"]);
  });
  it("discards another account's local watchlist", () => {
    const r = mergeWatchlist(["solana"], ["bitcoin"], false, 10);
    expect(r.merged).toEqual(["bitcoin"]);
    expect(r.toInsert).toEqual([]);
  });
  it("respects the plan limit when adopting", () => {
    const local = Array.from({ length: 8 }, (_, i) => `l${i}`);
    const remote = Array.from({ length: 5 }, (_, i) => `r${i}`);
    expect(mergeWatchlist(local, remote, true, 10).merged).toHaveLength(10);
  });
  it("unions transactions by id and never uploads the example portfolio", () => {
    const r = mergeTransactions([tx(U1), tx(U2, "2026-01-01")], false, [tx(U1), tx(U3, "2026-02-01")], true, newId);
    expect(r.merged.map((t) => t.id)).toEqual([U2, U1, U3]);
    expect(r.toInsert.map((t) => t.id)).toEqual([U2]);
    const ex = mergeTransactions([tx(U1)], true, [], true, newId);
    expect(ex.toInsert).toEqual([]);
    expect(ex.keepExample).toBe(true);
  });
  it("replaces legacy non-UUID ids before upload", () => {
    const r = mergeTransactions([tx("1700000000-abc")], false, [], true, newId);
    expect(isUuid(r.toInsert[0].id)).toBe(true);
  });
  it("maps the engine date field to the trade_date column", () => {
    const row = toRemote(tx(U1, "2026-03-04"), "user");
    expect(row.trade_date).toBe("2026-03-04");
    expect(fromRemote({ ...row, quantity: "1.5", price: "10", fee: "0" })).toMatchObject({ date: "2026-03-04", quantity: 1.5 });
  });
  it("diffs ids", () => {
    const d = diffIds(new Map([["a", 1], ["b", 1]]), new Map([["b", 1], ["c", 1]]));
    expect(d).toEqual({ added: ["c"], removed: ["a"] });
  });
});

describe("alerts", () => {
  it("evaluates price and move rules, never on missing data", () => {
    expect(evaluateAlert("price_above", 2000, { price: 2000, change24h: 0 }).triggered).toBe(true);
    expect(evaluateAlert("price_above", 2000, { price: 1999.99, change24h: 0 }).triggered).toBe(false);
    expect(evaluateAlert("price_below", 2000, { price: 1500, change24h: 0 })).toEqual({ triggered: true, value: 1500 });
    expect(evaluateAlert("move_24h", 5, { price: 1, change24h: -6.2 })).toEqual({ triggered: true, value: -6.2 });
    expect(evaluateAlert("move_24h", 5, { price: 1, change24h: 4.9 }).triggered).toBe(false);
    expect(evaluateAlert("price_above", 1, { price: null, change24h: null }).triggered).toBe(false);
    expect(evaluateAlert("price_above", 1, null).triggered).toBe(false);
    expect(evaluateAlert("price_above", 0, { price: 5, change24h: 0 }).triggered).toBe(false);
  });
  it("describes rules and writes informative copy with source and time", () => {
    expect(describeRule("ETH", "price_above", 3000)).toBe("ETH above $3,000.00");
    expect(describeRule("SOL", "move_24h", 10)).toBe("SOL moves more than 10% in 24h");
    const c = triggeredCopy("Ethereum", "ETH", "price_below", 2000, 1950, "CoinGecko", "2026-11-18T08:00:00Z");
    expect(c.title).toBe("ETH fell below $2,000.00");
    expect(c.body).toContain("CoinGecko, 2026-11-18 08:00 UTC");
    expect(c.body.toLowerCase()).not.toMatch(/\b(buy|sell)\b/);
    expect(triggeredCopy("Ethereum", "ETH", "move_24h", 5, -6, "CoinGecko", null, "fr").title).toContain("a varié");
  });
  it("renders an email with escaped content and a plain-text twin", () => {
    const m = renderAlertEmail([{ title: "ETH <b>", body: "x & y", link: "https://s.example/projects/ethereum" }], "https://s.example", "en");
    expect(m.html).toContain("ETH &lt;b&gt;");
    expect(m.html).toContain("x &amp; y");
    expect(m.text).toContain("https://s.example/projects/ethereum");
    expect(m.html).toContain("https://s.example/account");
    expect(m.html + m.text).not.toMatch(/[\u2013\u2014]/);
  });
});

describe("copilot grounding", () => {
  const quotes: DataResult<Record<string, Quote>> = {
    status: "ok",
    source: { name: "CoinGecko", url: "https://www.coingecko.com" },
    asOf: "2026-11-18T08:00:00.000Z",
    data: {
      ethereum: { coingeckoId: "ethereum", symbol: "eth", name: "Ethereum", image: null, price: 1800, change24h: -1, change7d: 2, change30d: 3, marketCap: 2.1e11, fdv: 2.1e11, volume24h: 1e10, circulatingSupply: 1, totalSupply: 1, maxSupply: null, rank: 2, ath: 4800, athChangePct: -62, sparkline7d: null, lastUpdated: "2026-11-18T08:00:00.000Z" },
    },
  };
  it("detects projects by name and ticker", () => {
    expect(detectProjects("Compare ETH and Solana please")).toEqual(expect.arrayContaining(["ethereum", "solana"]));
    expect(detectProjects("what is a blockchain")).toEqual([]);
  });
  it("matches concepts for learn questions", () => {
    expect(matchConcepts("What is restaking?").map((c) => c.slug)).toContain("restaking");
  });
  it("includes typed claims, sources and live data with provider and time", () => {
    const text = projectContext(PROJECT_BY_SLUG.ethereum, quotes);
    expect(text).toContain("[Fact]");
    expect(text).toContain("provider: CoinGecko, observed: 2026-11-18T08:00:00.000Z");
    expect(text).toMatch(/url https:\/\//);
  });
  it("says market data is unavailable instead of inventing it", () => {
    expect(projectContext(PROJECT_BY_SLUG.ethereum, null)).toContain("Unavailable right now (n/a)");
  });
  it("scopes context by mode", () => {
    expect(buildContext("compare", "trade-offs", ["arbitrum", "optimism", "base-x"], quotes).refs.projects.map((p) => p.slug)).toEqual(["arbitrum", "optimism"]);
    expect(buildContext("analyze", "risks?", ["ethereum", "solana"], quotes).refs.projects).toHaveLength(1);
    expect(buildContext("learn", "What is restaking?", [], null).refs.market).toBeNull();
  });
  it("prompt forbids advice and long dashes; output is cleaned", () => {
    const p = systemPrompt("analyze", "2026-11-18");
    expect(p).toMatch(/No investment advice/);
    expect(p).not.toMatch(/[\u2013\u2014]/);
    expect(stripDashes("ETH \u2014 a settlement layer, 2015\u20132022")).toBe("ETH, a settlement layer, 2015-2022");
  });
});

describe("overview and editorial", async () => {
  const { marketContext, buildDevelopments } = await import("@/lib/overview");
  const { featuredDossierFor, readingMinutes, dossierTitle, researchFeed } = await import("@/lib/research/editorial");
  const { PROJECTS } = await import("@/content/projects");
  const src = { name: "X", url: "https://x" };
  const ok = <T,>(data: T) => ({ status: "ok" as const, data, source: src, asOf: "2026-11-18T08:00:00Z" });
  const none = { status: "unavailable" as const, data: null, source: null, asOf: null };

  it("writes a factual market context and skips missing parts", () => {
    const s = marketContext({ totalMarketCap: 2.19e12, totalVolume24h: 7e10, marketCapChange24h: -2.3, btcDominance: 59, ethDominance: 10, activeCryptocurrencies: 1 }, null, { value: 11, classification: "Extreme Fear", t: 0 });
    expect(s).toBe("Total crypto market cap $2.19T, down 2.3% over 24 hours. Sentiment: Extreme Fear (11).");
    expect(marketContext(null, null, null)).toBeNull();
  });
  it("derives developments only from available data, with sources", () => {
    const d = buildDevelopments({
      regime: ok({ price: 64000, ma200: 72000, ma50: 0, distancePct: -11.1, regime: "below-200d" as const, series: [], maSeries: [] }),
      breadth: none, fng: none, defi: none,
      stables: ok({ totalCirculating: 2.88e11, change30dPct: -5.29, top: [], series: [] }),
      quotes: ok({ solana: { change24h: 3.6 } as never, ethereum: { change24h: -0.5 } as never }),
      names: { solana: "Solana" },
    });
    expect(d.map((x) => x.id)).toEqual(["regime", "stables", "mover"]);
    expect(d[0].text).toBe("Bitcoin at $64,000.00 is 11.1% below its 200-day average ($72,000.00).");
    expect(d[1].text).toContain("shrank 5.3%");
    expect(d[2].text).toContain("Solana");
    expect(d.every((x) => x.source && x.asOf)).toBe(true);
  });
  it("rotates the featured dossier daily among featured projects", () => {
    const a = featuredDossierFor(new Date("2026-11-18T10:00:00Z"));
    const b = featuredDossierFor(new Date("2026-11-18T23:00:00Z"));
    const c = featuredDossierFor(new Date("2026-11-19T01:00:00Z"));
    expect(a.slug).toBe(b.slug);
    expect(a.featured).toBe(true);
    expect(c.slug).not.toBe(a.slug);
  });
  it("gives every dossier a headline without live figures and a reading time", () => {
    for (const p of PROJECTS) {
      expect(dossierTitle(p).startsWith(p.name.split(" ")[0])).toBe(true);
      expect(p.editorial.headline).not.toMatch(/\$|\d+(\.\d+)?%/);
      expect(readingMinutes(p)).toBeGreaterThanOrEqual(1);
    }
    // Most recently updated first; on the same date, featured dossiers come first.
    const feed = researchFeed();
    for (let i = 1; i < feed.length; i++) {
      const [a, b] = [feed[i - 1], feed[i]];
      expect(a.editorial.lastUpdated >= b.editorial.lastUpdated).toBe(true);
      if (a.editorial.lastUpdated === b.editorial.lastUpdated) expect(Number(Boolean(a.featured)) >= Number(Boolean(b.featured))).toBe(true);
    }
  });
});
