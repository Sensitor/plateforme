import type { RiskLevel, SectorId } from "@/lib/research/types";

/** Asset metadata + live quote passed from the server to the portfolio app. */
export interface AssetMeta {
  slug: string;
  name: string;
  ticker: string;
  logo: string | null;
  sector: SectorId | null;
  sectorLabel: string | null;
  chainLabel: string | null;
  ecosystem: string | null;
  riskLevel: RiskLevel | null;
  price: number | null;
  change24h: number | null;
  volume24h: number | null;
}
