import "server-only";
import { fetchJson } from "../http";
import type { FearGreedPoint } from "../types";

/**
 * Crypto Fear & Greed Index by Alternative.me, free API, attribution
 * required next to the data (https://alternative.me/crypto/fear-and-greed-index/).
 */

export const FEAR_GREED_SOURCE = { name: "Alternative.me", url: "https://alternative.me/crypto/fear-and-greed-index/" };

export async function fetchFearGreed(limit = 30): Promise<FearGreedPoint[]> {
  const res = await fetchJson<{ data: { value: string; value_classification: string; timestamp: string }[] }>(
    "alternative.me",
    `https://api.alternative.me/fng/?limit=${limit}&format=json`,
  );
  return res.data.map((d) => ({
    value: Number(d.value),
    classification: d.value_classification,
    t: Number(d.timestamp) * 1000,
  }));
}
