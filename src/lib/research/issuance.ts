import type { IssuanceModel } from "./types";
import type { SeriesPoint } from "@/lib/market/types";

const YEAR_MS = 365.25 * 86400_000;

/**
 * Model a supply curve from protocol parameters. The result is a projection
 * from published rules, not observed on-chain data, and is labelled as such.
 */
export function modelSupplyCurve(model: IssuanceModel): SeriesPoint[] {
  return model.kind === "halving" ? halvingCurve(model) : disinflationCurve(model);
}

function halvingCurve(m: Extract<IssuanceModel, { kind: "halving" }>): SeriesPoint[] {
  const genesis = Date.parse(m.genesisDate);
  const epochMs = m.blocksPerHalving * m.blockTimeSec * 1000;
  const boundaries: { t: number; supply: number }[] = [{ t: genesis, supply: 0 }];
  let supply = 0;
  let reward = m.initialReward;
  const end = Date.UTC(m.untilYear, 0, 1);
  for (let k = 1; boundaries[boundaries.length - 1].t < end && reward > 1e-8; k++) {
    supply += m.blocksPerHalving * reward;
    reward /= 2;
    const known = m.knownHalvings?.[k - 1];
    const prev = boundaries[boundaries.length - 1].t;
    const t = known ? Date.parse(known) : prev + epochMs;
    boundaries.push({ t, supply: Math.min(supply, m.maxSupply) });
  }
  const points: SeriesPoint[] = [];
  for (let t = genesis; t <= end; t += YEAR_MS / 4) {
    const i = boundaries.findIndex((b) => b.t > t);
    if (i <= 0) {
      points.push({ t, v: boundaries[boundaries.length - 1].supply });
      continue;
    }
    const a = boundaries[i - 1];
    const b = boundaries[i];
    const f = (t - a.t) / (b.t - a.t);
    points.push({ t, v: a.supply + f * (b.supply - a.supply) });
  }
  return points;
}

function disinflationCurve(m: Extract<IssuanceModel, { kind: "disinflation" }>): SeriesPoint[] {
  const start = Date.parse(m.startDate);
  const points: SeriesPoint[] = [{ t: start, v: m.startSupply }];
  let supply = m.startSupply;
  for (let y = 0; y < m.years; y++) {
    const rate = Math.max(m.terminalRate, m.initialRate * Math.pow(1 - m.decayPerYear, y));
    supply *= 1 + rate / 100;
    points.push({ t: start + (y + 1) * YEAR_MS, v: supply });
  }
  return points;
}

/** Inflation rate (in %) for each year of a disinflation schedule. */
export function disinflationRates(m: Extract<IssuanceModel, { kind: "disinflation" }>): number[] {
  return Array.from({ length: m.years }, (_, y) => Math.max(m.terminalRate, m.initialRate * Math.pow(1 - m.decayPerYear, y)));
}
