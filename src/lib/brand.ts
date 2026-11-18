import type { AcademyCategory } from "@/content/concepts";
import type { PillarId, SectorId } from "@/lib/research/types";

/**
 * Sensitor brand colour system. The core identity stays indigo (#7896FF) and
 * violet (#9C83E8); these extended hues give each sector, Academy track and
 * research pillar its own colour so pages are easier to scan and feel less
 * monochrome. Colours always come with a text label, never alone.
 */

export const SECTOR_COLORS: Record<SectorId, string> = {
  "layer-1": "#7C93FF",
  "layer-2": "#56B8F0",
  defi: "#A487F0",
  oracles: "#3DBFA0",
  rwa: "#E8B04B",
  infrastructure: "#94A3B8",
  depin: "#F08A4B",
  ai: "#EC7BB5",
  gaming: "#B5D65A",
  stablecoins: "#5FCB86",
  "cross-chain": "#4FD3E0",
  "liquid-staking": "#D6A77A",
  restaking: "#C77DEB",
};

export const ACADEMY_COLORS: Record<AcademyCategory, string> = {
  foundations: "#7C93FF",
  technology: "#56B8F0",
  defi: "#A487F0",
  tokenomics: "#E8B04B",
  research: "#3DBFA0",
  portfolio: "#5FCB86",
  risk: "#F08A4B",
  psychology: "#EC7BB5",
};

export const PILLAR_COLORS: Record<PillarId, string> = {
  technology: "#56B8F0",
  tokenomics: "#E8B04B",
  adoption: "#5FCB86",
  financials: "#3DBFA0",
  governance: "#A487F0",
  competition: "#7C93FF",
  risk: "#F08A4B",
};

/** Hex colour with alpha, for tinted backgrounds and borders. */
export function tint(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/**
 * Project accents are brand colours chosen for light backgrounds; some are
 * too dark (or too grey) to read on Sensitor's midnight surfaces. This lifts
 * very dark accents towards white so lines and labels stay visible.
 */
export function readableAccent(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  if (lum >= 0.32) return hex;
  const mix = Math.min(0.6, 0.32 - lum + 0.25);
  const out = rgb.map((c) => Math.round(c + (255 - c) * mix));
  return `#${out.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
