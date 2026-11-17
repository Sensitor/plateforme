import type { Project } from "@/lib/research/types";
import { aave } from "./aave";
import { arbitrum } from "./arbitrum";
import { avalanche } from "./avalanche";
import { bitcoin } from "./bitcoin";
import { bittensor } from "./bittensor";
import { celestia } from "./celestia";
import { chainlink } from "./chainlink";
import { eigenlayer } from "./eigenlayer";
import { ethena } from "./ethena";
import { ethereum } from "./ethereum";
import { hyperliquid } from "./hyperliquid";
import { immutable } from "./immutable";
import { layerzero } from "./layerzero";
import { lido } from "./lido";
import { ondo } from "./ondo";
import { optimism } from "./optimism";
import { render } from "./render";
import { solana } from "./solana";
import { sui } from "./sui";
import { uniswap } from "./uniswap";

/**
 * Sensitor coverage universe. Order = default editorial order.
 * To add a project: create a dossier file and register it here; the content
 * integrity tests (tests/content.test.ts) validate every dossier.
 */
export const PROJECTS: Project[] = [
  bitcoin,
  ethereum,
  solana,
  chainlink,
  arbitrum,
  optimism,
  avalanche,
  sui,
  aave,
  uniswap,
  hyperliquid,
  lido,
  eigenlayer,
  ethena,
  ondo,
  layerzero,
  celestia,
  render,
  bittensor,
  immutable,
];

export const PROJECT_BY_SLUG: Record<string, Project> = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));

export function getProject(slug: string): Project | undefined {
  return PROJECT_BY_SLUG[slug];
}
