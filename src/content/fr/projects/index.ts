import type { ProjectText } from "@/lib/research/localized";
import { aaveFr } from "./aave";
import { arbitrumFr } from "./arbitrum";
import { avalancheFr } from "./avalanche";
import { bitcoinFr } from "./bitcoin";
import { bittensorFr } from "./bittensor";
import { celestiaFr } from "./celestia";
import { chainlinkFr } from "./chainlink";
import { eigenlayerFr } from "./eigenlayer";
import { ethenaFr } from "./ethena";
import { ethereumFr } from "./ethereum";
import { hyperliquidFr } from "./hyperliquid";
import { immutableFr } from "./immutable";
import { layerzeroFr } from "./layerzero";
import { lidoFr } from "./lido";
import { ondoFr } from "./ondo";
import { optimismFr } from "./optimism";
import { renderFr } from "./render";
import { solanaFr } from "./solana";
import { suiFr } from "./sui";
import { uniswapFr } from "./uniswap";

/**
 * Dossiers de recherche traduits en français : seul le texte est traduit, les
 * types d'affirmation, les sources et les paramètres de protocole restent ceux
 * de la version anglaise. Un dossier absent ici s'affiche en anglais, avec la
 * mention « contenu en anglais ».
 */
export const PROJECT_TEXT_FR: Partial<Record<string, ProjectText>> = { aave: aaveFr, arbitrum: arbitrumFr, avalanche: avalancheFr, bitcoin: bitcoinFr, bittensor: bittensorFr, celestia: celestiaFr, chainlink: chainlinkFr, eigenlayer: eigenlayerFr, ethena: ethenaFr, ethereum: ethereumFr, hyperliquid: hyperliquidFr, immutable: immutableFr, layerzero: layerzeroFr, lido: lidoFr, ondo: ondoFr, optimism: optimismFr, render: renderFr, solana: solanaFr, sui: suiFr, uniswap: uniswapFr };
