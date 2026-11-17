import type { Claim, ResearchSource, SourceType } from "@/lib/research/types";

/** Verified fact, with the ids of supporting sources. */
export const fact = (text: string, ...sources: string[]): Claim => ({ kind: "fact", text, sources });
/** Analyst interpretation of facts. */
export const view = (text: string, ...sources: string[]): Claim => ({ kind: "interpretation", text, sources });
/** Forward-looking hypothesis, explicitly uncertain. */
export const hyp = (text: string, ...sources: string[]): Claim => ({ kind: "hypothesis", text, sources });

/** Date the source links in this release were last checked. */
export const CHECKED = "2026-11-17";

export function source(
  id: string,
  title: string,
  publisher: string,
  url: string,
  type: SourceType,
  supports: string,
  opts: { published?: string; reliability?: ResearchSource["reliability"]; limitations?: string; accessed?: string } = {},
): ResearchSource {
  return {
    id,
    title,
    publisher,
    url,
    type,
    supports,
    published: opts.published,
    accessed: opts.accessed ?? CHECKED,
    reliability: opts.reliability ?? (type === "primary" || type === "documentation" ? "high" : "medium"),
    limitations: opts.limitations,
  };
}

/* Shared data sources referenced by many dossiers */

export const coingecko = (slug: string, name: string) =>
  source(
    "coingecko",
    `${name}: price, market cap and supply`,
    "CoinGecko",
    `https://www.coingecko.com/en/coins/${slug}`,
    "data",
    "Live market data: price, market cap, FDV, circulating and total supply.",
    { reliability: "medium", limitations: "Aggregator; supply figures depend on issuer disclosures and CoinGecko methodology." },
  );

export const defillamaProtocol = (slug: string, name: string) =>
  source(
    "defillama",
    `${name}: TVL, fees and revenue`,
    "DefiLlama",
    `https://defillama.com/protocol/${slug}`,
    "data",
    "TVL, fees and revenue figures.",
    { reliability: "medium", limitations: "Open-source adapters; methodology differs by protocol and may be revised." },
  );

export const defillamaChain = (slug: string, name: string) =>
  source(
    "defillama",
    `${name}: chain TVL and fees`,
    "DefiLlama",
    `https://defillama.com/chain/${slug}`,
    "data",
    "Chain-level TVL, fees and stablecoin supply.",
    { reliability: "medium", limitations: "TVL counts DeFi deposits only; it is not a measure of network value." },
  );

export const l2beat = (slug: string, name: string) =>
  source(
    "l2beat",
    `${name}: risk analysis and stage`,
    "L2BEAT",
    `https://l2beat.com/scaling/projects/${slug}`,
    "research",
    "Rollup stage, proof system, upgradeability and exit-window analysis.",
    { reliability: "high", limitations: "Snapshot of current configuration; stages change with upgrades." },
  );
