import { describe, expect, it } from "vitest";
import { computePositions, concentrationLevel, hhi, holdingsAt, parseCsv, returnCorrelation, toCsv, type Transaction } from "@/lib/portfolio/engine";

const tx = (over: Partial<Transaction>): Transaction => ({ id: Math.random().toString(36), date: "2026-01-01", asset: "ethereum", side: "buy", quantity: 1, price: 100, fee: 0, ...over });

describe("average cost positions", () => {
  it("averages buys and realises P&L on sells", () => {
    const { positions, issues } = computePositions([
      tx({ date: "2026-01-01", quantity: 2, price: 100 }),
      tx({ date: "2026-02-01", quantity: 2, price: 200 }),
      tx({ date: "2026-03-01", side: "sell", quantity: 1, price: 300 }),
    ]);
    const p = positions.get("ethereum")!;
    expect(issues).toEqual([]);
    expect(p.quantity).toBe(3);
    expect(p.avgCost).toBe(150);
    expect(p.costBasis).toBe(450);
    expect(p.realizedPnl).toBe(150);
  });

  it("includes fees in cost and subtracts them from proceeds", () => {
    const { positions } = computePositions([tx({ quantity: 1, price: 100, fee: 2 }), tx({ date: "2026-02-01", side: "sell", quantity: 1, price: 110, fee: 1 })]);
    const p = positions.get("ethereum")!;
    expect(p.quantity).toBe(0);
    expect(p.realizedPnl).toBeCloseTo(7);
  });

  it("flags sells larger than the position", () => {
    const { positions, issues } = computePositions([tx({ quantity: 1 }), tx({ date: "2026-02-01", side: "sell", quantity: 3, price: 50 })]);
    expect(issues).toHaveLength(1);
    expect(positions.get("ethereum")!.quantity).toBe(0);
  });

  it("orders the ledger by date regardless of input order", () => {
    const { issues } = computePositions([tx({ date: "2026-03-01", side: "sell", quantity: 1 }), tx({ date: "2026-01-01", quantity: 1 })]);
    expect(issues).toEqual([]);
  });
});

describe("holdings and concentration", () => {
  it("returns quantities held at a date", () => {
    const list = [tx({ date: "2026-01-01", quantity: 2 }), tx({ date: "2026-02-01", side: "sell", quantity: 1 })];
    expect(holdingsAt(list, "2026-01-15").get("ethereum")).toBe(2);
    expect(holdingsAt(list, "2026-02-01").get("ethereum")).toBe(1);
  });

  it("computes HHI and concentration levels", () => {
    expect(hhi([1])).toBe(1);
    expect(hhi([1, 1, 1, 1])).toBeCloseTo(0.25);
    expect(concentrationLevel([90, 10])).toBe("concentrated");
    expect(concentrationLevel([1, 1, 1, 1, 1, 1])).toBe("diversified");
  });
});

describe("correlation", () => {
  const day = 86400_000;
  const base = Array.from({ length: 40 }, (_, i) => ({ t: i * day, v: 100 * Math.exp(Math.sin(i) * 0.05 + i * 0.001) }));
  it("is 1 for identical return series and -1 for mirrored ones", () => {
    expect(returnCorrelation(base, base)).toBeCloseTo(1, 6);
    const mirror = base.map((p, i) => ({ t: p.t, v: 100 * Math.exp(-(Math.sin(i) * 0.05 + i * 0.001)) }));
    expect(returnCorrelation(base, mirror)).toBeCloseTo(-1, 6);
  });
  it("needs enough overlapping days", () => {
    expect(returnCorrelation(base.slice(0, 10), base.slice(0, 10))).toBeNull();
  });
});

describe("CSV", () => {
  const resolve = (raw: string) => ({ eth: "ethereum", ethereum: "ethereum", btc: "bitcoin", usdc: "usd" })[raw.toLowerCase()] ?? null;

  it("parses comma CSV with any header order", () => {
    const r = parseCsv("asset,date,side,quantity,price,fee\nETH,2026-01-02,buy,1.5,2000,3\n", resolve);
    expect(r.errors).toEqual([]);
    expect(r.rows[0]).toEqual({ date: "2026-01-02", asset: "ethereum", side: "buy", quantity: 1.5, price: 2000, fee: 3 });
  });

  it("parses French semicolon exports with decimal commas", () => {
    const r = parseCsv("date;asset;side;quantity;price\n2026-01-02;BTC;achat;0,25;64000,5\n", resolve);
    expect(r.errors).toEqual([]);
    expect(r.rows[0]).toMatchObject({ asset: "bitcoin", side: "buy", quantity: 0.25, price: 64000.5, fee: 0 });
  });

  it("reports line-level errors", () => {
    const r = parseCsv("date,asset,side,quantity,price\n02/01/2026,DOGE,hold,-1,abc\n", resolve);
    expect(r.rows).toEqual([]);
    expect(r.errors[0].line).toBe(2);
    expect(r.errors[0].message).toMatch(/date.*unknown asset.*side.*quantity.*price/);
  });

  it("rejects files without required columns", () => {
    expect(parseCsv("foo,bar\n1,2", resolve).errors[0].message).toMatch(/Missing column/);
  });

  it("round-trips through export", () => {
    const list = [tx({ date: "2026-01-02", quantity: 1.5, price: 2000, fee: 3 })];
    const csv = toCsv(list, () => "ETH");
    const back = parseCsv(csv, resolve);
    expect(back.rows[0]).toMatchObject({ date: "2026-01-02", asset: "ethereum", quantity: 1.5, price: 2000, fee: 3 });
  });
});

import { buildInsights, type HoldingView } from "@/lib/portfolio/insights";

describe("portfolio insights", () => {
  const h = (asset: string, value: number, over: Partial<HoldingView> = {}): HoldingView => ({ asset, name: asset, value, sectorLabel: "Layer 1", ecosystem: null, riskLevel: "moderate", volume24h: 1e9, ...over });
  const names = { ethereum: "Ethereum", arbitrum: "Arbitrum", aave: "Aave", chainlink: "Chainlink", bitcoin: "Bitcoin", usd: "Stablecoins" };

  it("flags a dominant position", () => {
    const ins = buildInsights([h("bitcoin", 90), h("ethereum", 10)], names);
    expect(ins.find((i) => i.id === "concentration")?.tone).toBe("watch");
  });

  it("reports shared dependencies only when several positions share them", () => {
    const ins = buildInsights([h("arbitrum", 10), h("aave", 10), h("ethereum", 10)], names);
    expect(ins.some((i) => i.id === "dep-ethereum")).toBe(true);
    expect(ins.some((i) => i.id === "dep-arbitrum")).toBe(false);
  });

  it("describes a halving as reduced issuance", () => {
    const ins = buildInsights([h("bitcoin", 10)], names);
    const halving = ins.find((i) => i.id === "event-bitcoin-halving");
    expect(halving?.detail).toMatch(/drops by half/);
  });

  it("never recommends buying or selling", () => {
    const ins = buildInsights([h("bitcoin", 50), h("arbitrum", 30, { volume24h: 1e6, riskLevel: "high" }), h("aave", 20)], names);
    for (const i of ins) expect(`${i.title} ${i.detail}`).not.toMatch(/\b(you should|buy|sell)\b/i);
  });
});
