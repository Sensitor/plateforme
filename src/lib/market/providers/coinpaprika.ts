import "server-only";
import { fetchJson } from "../http";
import type { GlobalMarket, Quote } from "../types";

/**
 * CoinPaprika, fallback for prices and global metrics when CoinGecko is
 * rate-limited or unavailable. Free tier, keyless.
 * Terms: https://coinpaprika.com/api/, attribution required.
 */

export const COINPAPRIKA_SOURCE = { name: "CoinPaprika", url: "https://coinpaprika.com" };

interface PaprikaTicker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      ath_price: number | null;
      percent_from_price_ath: number | null;
    };
  };
}

function toQuote(t: PaprikaTicker): Quote {
  const q = t.quotes.USD;
  const price = q.price ?? null;
  // The tickers endpoint does not expose circulating supply directly; derive it
  // from market cap / price, which is how CoinPaprika computes market cap.
  const circulating = price && q.market_cap ? q.market_cap / price : null;
  const fdvSupply = t.max_supply > 0 ? t.max_supply : t.total_supply > 0 ? t.total_supply : null;
  return {
    coingeckoId: "",
    symbol: t.symbol,
    name: t.name,
    image: `https://static.coinpaprika.com/coin/${t.id}/logo.png`,
    price,
    change24h: q.percent_change_24h ?? null,
    change7d: q.percent_change_7d ?? null,
    change30d: q.percent_change_30d ?? null,
    marketCap: q.market_cap || null,
    fdv: price && fdvSupply ? price * fdvSupply : null,
    volume24h: q.volume_24h ?? null,
    circulatingSupply: circulating,
    totalSupply: t.total_supply || null,
    maxSupply: t.max_supply > 0 ? t.max_supply : null,
    rank: t.rank ?? null,
    ath: q.ath_price ?? null,
    athChangePct: q.percent_from_price_ath ?? null,
    sparkline7d: null,
    lastUpdated: t.last_updated,
  };
}

/** One bulk call (~2,000 tickers, < 2 MB), keeps us well inside free-tier quotas. */
export async function paprikaTickers(): Promise<Map<string, Quote>> {
  const rows = await fetchJson<PaprikaTicker[]>("coinpaprika", "https://api.coinpaprika.com/v1/tickers?quotes=USD", {
    timeoutMs: 12000,
  });
  return new Map(rows.map((t) => [t.id, toQuote(t)]));
}

interface PaprikaGlobal {
  market_cap_usd: number;
  volume_24h_usd: number;
  bitcoin_dominance_percentage: number;
  cryptocurrencies_number: number;
  market_cap_change_24h: number;
  last_updated: number;
}

export async function paprikaGlobal(): Promise<{ data: GlobalMarket; asOf: string }> {
  const g = await fetchJson<PaprikaGlobal>("coinpaprika", "https://api.coinpaprika.com/v1/global");
  return {
    data: {
      totalMarketCap: g.market_cap_usd,
      totalVolume24h: g.volume_24h_usd ?? null,
      marketCapChange24h: g.market_cap_change_24h ?? null,
      btcDominance: g.bitcoin_dominance_percentage ?? null,
      ethDominance: null,
      activeCryptocurrencies: g.cryptocurrencies_number ?? null,
    },
    asOf: new Date(g.last_updated * 1000).toISOString(),
  };
}
