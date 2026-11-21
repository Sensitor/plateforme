import "server-only";
import { cacheLife } from "next/cache";
import { PROJECTS } from "@/content/projects";
import { cgGlobal, cgGlobalMarketCapChart, cgMarkets, cgTopMarkets, COINGECKO_SOURCE, hasCoinGeckoPro } from "./providers/coingecko";
import { COINPAPRIKA_SOURCE, paprikaGlobal, paprikaTickers } from "./providers/coinpaprika";
import {
  DEFILLAMA_SOURCE,
  llamaChains,
  llamaFees,
  llamaHistoricalTvl,
  llamaPriceChart,
  llamaProtocolTvl,
  llamaStablecoinChart,
  llamaStablecoins,
} from "./providers/defillama";
import { FEAR_GREED_SOURCE, fetchFearGreed } from "./providers/fear-greed";
import type {
  AltcoinBreadth,
  ChartRange,
  DataResult,
  DefiOverview,
  FearGreedPoint,
  GlobalMarket,
  MarketRegime,
  ProjectFundamentals,
  Quote,
  SeriesPoint,
  StablecoinOverview,
} from "./types";
import { changeOverWindow, downsampleSeries, movingAverage } from "./series";
import { getSnapshotTotalMarketCap, snapshotHistoryAvailable } from "./snapshots";

/*
 * Market data service.
 *
 * Every function:
 *  - is cached with `use cache` and a short lifetime (expire < 5 min), which
 *    keeps market data out of build-time prerenders: it is fetched at request
 *    time and shared between visitors for ~1 minute;
 *  - tries providers in order and reports which one answered;
 *  - never throws: it returns `status: "unavailable"` with a note instead, so
 *    pages degrade gracefully. Demo values are never substituted.
 */

function unavailable<T>(note: string): DataResult<T> {
  return { status: "unavailable", data: null, source: null, asOf: null, note };
}

function logProviderError(scope: string, err: unknown) {
  console.warn(`[market:${scope}] ${(err as Error)?.message ?? err}`);
}

/* ------------------------------------------------------------------ */
/* Quotes for the Sensitor coverage universe                          */
/* ------------------------------------------------------------------ */

export async function getCoverageQuotes(): Promise<DataResult<Record<string, Quote>>> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 240 });

  const bySlugFromCg = new Map(PROJECTS.map((p) => [p.data.coingeckoId, p.slug]));

  try {
    const quotes = await cgMarkets(PROJECTS.map((p) => p.data.coingeckoId));
    const data: Record<string, Quote> = {};
    for (const q of quotes) {
      const slug = bySlugFromCg.get(q.coingeckoId);
      if (slug) data[slug] = q;
    }
    const asOf = latest(quotes.map((q) => q.lastUpdated));
    return {
      status: Object.keys(data).length === PROJECTS.length ? "ok" : "partial",
      data,
      source: COINGECKO_SOURCE,
      asOf,
    };
  } catch (err) {
    logProviderError("quotes/coingecko", err);
  }

  try {
    const byPaprika = await paprikaTickers();
    const data: Record<string, Quote> = {};
    for (const p of PROJECTS) {
      const q = byPaprika.get(p.data.coinpaprikaId);
      if (q) data[p.slug] = { ...q, coingeckoId: p.data.coingeckoId };
    }
    if (Object.keys(data).length > 0) {
      return {
        status: Object.keys(data).length === PROJECTS.length ? "ok" : "partial",
        data,
        source: COINPAPRIKA_SOURCE,
        asOf: latest(Object.values(data).map((q) => q.lastUpdated)),
        note: "Primary source (CoinGecko) unavailable, served by fallback provider. 7-day sparklines are not provided by the fallback.",
      };
    }
  } catch (err) {
    logProviderError("quotes/coinpaprika", err);
  }

  return unavailable("Market data providers are unreachable right now. Live prices will reappear automatically.");
}

/* ------------------------------------------------------------------ */
/* Global market                                                       */
/* ------------------------------------------------------------------ */

export async function getGlobalMarket(): Promise<DataResult<GlobalMarket>> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 240 });

  try {
    const { data, asOf } = await cgGlobal();
    return { status: "ok", data, source: COINGECKO_SOURCE, asOf };
  } catch (err) {
    logProviderError("global/coingecko", err);
  }
  try {
    const { data, asOf } = await paprikaGlobal();
    // CoinPaprika does not expose ETH dominance: derive it from ETH market cap.
    const quotes = await getCoverageQuotes();
    const ethCap = quotes.data?.ethereum?.marketCap;
    if (ethCap && data.totalMarketCap) data.ethDominance = (ethCap / data.totalMarketCap) * 100;
    return { status: "ok", data, source: COINPAPRIKA_SOURCE, asOf };
  } catch (err) {
    logProviderError("global/coinpaprika", err);
  }
  return unavailable("Global market metrics are temporarily unavailable.");
}

/* ------------------------------------------------------------------ */
/* Charts                                                              */
/* ------------------------------------------------------------------ */

const RANGE_PARAMS: Record<Exclude<ChartRange, "ALL">, { span: number; period: string; cgDays: number }> = {
  "1D": { span: 24, period: "1h", cgDays: 1 },
  "7D": { span: 42, period: "4h", cgDays: 7 },
  "1M": { span: 30, period: "1d", cgDays: 30 },
  "3M": { span: 90, period: "1d", cgDays: 90 },
  "1Y": { span: 365, period: "1d", cgDays: 365 },
};

/** Price history for a coin (DefiLlama coins API, keyed by CoinGecko id). */
export async function getPriceHistory(
  coingeckoId: string,
  range: ChartRange,
  sinceUnix?: number,
): Promise<DataResult<SeriesPoint[]>> {
  "use cache";
  cacheLife({ stale: 60, revalidate: range === "1D" ? 120 : 240, expire: 290 });

  try {
    let series: SeriesPoint[];
    if (range === "ALL") {
      const start = sinceUnix ?? 1367366400; // 1 May 2013
      const nowSec = Math.floor(Date.now() / 1000);
      const twoWeeks = 14 * 86400;
      const span = Math.min(500, Math.ceil((nowSec - start) / twoWeeks));
      series = await llamaPriceChart(coingeckoId, { start, span, period: "2w" });
      // Append the most recent daily point so the curve ends "now".
      const recent = await llamaPriceChart(coingeckoId, { span: 2, period: "1d" }).catch(() => []);
      series = [...series, ...recent.filter((p) => p.t > (series.at(-1)?.t ?? 0))];
    } else {
      const { span, period } = RANGE_PARAMS[range];
      series = await llamaPriceChart(coingeckoId, { span, period });
    }
    return { status: "ok", data: series, source: DEFILLAMA_SOURCE, asOf: new Date(series.at(-1)!.t).toISOString() };
  } catch (err) {
    logProviderError(`history/${coingeckoId}/${range}`, err);
    return unavailable("Price history is temporarily unavailable.");
  }
}

/** True when a CoinGecko Pro key provides the full total market cap history. */
export function totalMarketCapHistoryAvailable() {
  return hasCoinGeckoPro();
}

/** Where total market cap history comes from: CoinGecko Pro, Sensitor's daily snapshots, or nowhere yet. */
export async function totalMarketCapHistorySource(): Promise<"pro" | "snapshots" | null> {
  if (hasCoinGeckoPro()) return "pro";
  return (await snapshotHistoryAvailable()) ? "snapshots" : null;
}

/** Historical total crypto market cap: CoinGecko Pro when configured, otherwise Sensitor's daily snapshots. */
export async function getTotalMarketCapHistory(range: ChartRange): Promise<DataResult<SeriesPoint[]>> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 240, expire: 290 });

  if (!hasCoinGeckoPro()) return getSnapshotTotalMarketCap(range);
  try {
    const days = range === "ALL" ? "max" : RANGE_PARAMS[range].cgDays;
    const series = await cgGlobalMarketCapChart(days);
    return { status: "ok", data: downsampleSeries(series, 400), source: COINGECKO_SOURCE, asOf: new Date(series.at(-1)!.t).toISOString() };
  } catch (err) {
    logProviderError("history/total-mcap", err);
    return unavailable("Total market cap history is temporarily unavailable.");
  }
}

/* ------------------------------------------------------------------ */
/* Sentiment & regime indicators                                       */
/* ------------------------------------------------------------------ */

export async function getFearGreed(): Promise<DataResult<FearGreedPoint[]>> {
  "use cache";
  cacheLife({ stale: 120, revalidate: 240, expire: 290 });
  try {
    const points = await fetchFearGreed(90);
    return { status: "ok", data: points, source: FEAR_GREED_SOURCE, asOf: new Date(points[0].t).toISOString() };
  } catch (err) {
    logProviderError("fear-greed", err);
    return unavailable("Fear & Greed Index is temporarily unavailable.");
  }
}

/**
 * Sensitor market regime: BTC price versus its 200-day simple moving average.
 * A transparent, widely used trend filter, not a forecast.
 */
export async function getMarketRegime(): Promise<DataResult<MarketRegime>> {
  "use cache";
  cacheLife({ stale: 120, revalidate: 240, expire: 290 });
  try {
    const series = await llamaPriceChart("bitcoin", { span: 400, period: "1d" });
    const closes = series.map((p) => p.v);
    const ma200 = movingAverage(closes, 200);
    const ma50 = movingAverage(closes, 50);
    if (ma200 == null || ma50 == null) throw new Error("not enough history for 200D MA");
    const price = closes.at(-1)!;
    const distancePct = (price / ma200 - 1) * 100;
    const recent = series.slice(-200);
    const offset = series.length - recent.length;
    const maSeries = recent
      .map((p, i) => ({ t: p.t, v: movingAverage(closes.slice(0, offset + i + 1), 200) }))
      .filter((p): p is SeriesPoint => p.v != null);
    return {
      status: "ok",
      data: { price, ma200, ma50, distancePct, regime: price >= ma200 ? "above-200d" : "below-200d", series: recent, maSeries },
      source: DEFILLAMA_SOURCE,
      asOf: new Date(series.at(-1)!.t).toISOString(),
    };
  } catch (err) {
    logProviderError("regime", err);
    return unavailable("Market regime indicator is temporarily unavailable.");
  }
}

/** Tokens excluded from altcoin breadth: stablecoins, wrapped and staked derivatives. */
const BREADTH_EXCLUDED_SYMBOLS = new Set([
  "USDT", "USDC", "DAI", "USDE", "USDS", "FDUSD", "TUSD", "PYUSD", "USD1", "USDD", "BUSD", "FRAX", "USDTB", "USDF",
  "RLUSD", "GHO", "USDG", "USDY", "BUIDL", "SUSDE", "SUSDS", "XAUT", "PAXG", "EURC", "USD0",
  "WBTC", "WETH", "STETH", "WSTETH", "WEETH", "WEETH", "CBBTC", "CBETH", "RETH", "METH", "EZETH", "RSETH", "JITOSOL",
  "MSOL", "BNSOL", "WBETH", "LBTC", "SOLVBTC", "TBTC", "BTCB", "CLBTC", "LSETH", "OSETH", "SWETH", "BSDETH", "STHYPE", "KHYPE",
]);

/**
 * Altcoin breadth: share of the top-100 altcoins (ex-stablecoins and wrapped
 * or staked derivatives) that outperformed BTC over the last 30 days.
 */
export async function getAltcoinBreadth(): Promise<DataResult<AltcoinBreadth>> {
  "use cache";
  cacheLife({ stale: 120, revalidate: 240, expire: 290 });
  try {
    const top = await cgTopMarkets(120);
    const btc = top.find((q) => q.coingeckoId === "bitcoin");
    if (!btc?.change30d && btc?.change30d !== 0) throw new Error("BTC 30d change missing");
    const candidates = top.filter((q) => q.coingeckoId !== "bitcoin");
    const eligible = candidates.filter((q) => !BREADTH_EXCLUDED_SYMBOLS.has(q.symbol) && q.change30d != null).slice(0, 100);
    const outperformers = eligible.filter((q) => (q.change30d ?? -Infinity) > btc.change30d!).length;
    return {
      status: "ok",
      data: { outperformers, sample: eligible.length, btcChange30d: btc.change30d!, excluded: candidates.length - eligible.length },
      source: COINGECKO_SOURCE,
      asOf: latest(top.map((q) => q.lastUpdated)),
    };
  } catch (err) {
    logProviderError("breadth", err);
    return unavailable("Altcoin breadth requires CoinGecko market data, which is temporarily unavailable.");
  }
}

/* ------------------------------------------------------------------ */
/* DeFi & stablecoins                                                  */
/* ------------------------------------------------------------------ */

export async function getDefiOverview(): Promise<DataResult<DefiOverview>> {
  "use cache";
  cacheLife({ stale: 120, revalidate: 240, expire: 290 });
  try {
    const [history, chains] = await Promise.all([llamaHistoricalTvl(), llamaChains()]);
    const last = history.at(-1)!;
    const recent = history.filter((p) => p.t >= last.t - 3 * 365 * 86400_000);
    return {
      status: "ok",
      data: {
        totalTvl: last.v,
        change30dPct: changeOverWindow(history, 30),
        series: downsampleSeries(recent, 260),
        topChains: chains
          .filter((c) => c.tvl > 0)
          .sort((a, b) => b.tvl - a.tvl)
          .slice(0, 8)
          .map((c) => ({ name: c.name, tvl: c.tvl })),
      },
      source: DEFILLAMA_SOURCE,
      asOf: new Date(last.t).toISOString(),
    };
  } catch (err) {
    logProviderError("defi", err);
    return unavailable("DeFi metrics are temporarily unavailable.");
  }
}

export async function getStablecoinOverview(): Promise<DataResult<StablecoinOverview>> {
  "use cache";
  cacheLife({ stale: 120, revalidate: 240, expire: 290 });
  try {
    const [assets, chart] = await Promise.all([llamaStablecoins(), llamaStablecoinChart()]);
    const usd = assets
      .map((a) => ({
        name: a.name,
        symbol: a.symbol,
        circulating: a.circulating?.peggedUSD ?? 0,
        pegMechanism: a.pegMechanism,
      }))
      .sort((a, b) => b.circulating - a.circulating);
    const last = chart.at(-1)!;
    const recent = chart.filter((p) => p.t >= last.t - 3 * 365 * 86400_000);
    return {
      status: "ok",
      data: {
        totalCirculating: last.v,
        change30dPct: changeOverWindow(chart, 30),
        top: usd.slice(0, 6),
        series: downsampleSeries(recent, 260),
      },
      source: DEFILLAMA_SOURCE,
      asOf: new Date(last.t).toISOString(),
    };
  } catch (err) {
    logProviderError("stablecoins", err);
    return unavailable("Stablecoin metrics are temporarily unavailable.");
  }
}

/* ------------------------------------------------------------------ */
/* Project fundamentals                                                */
/* ------------------------------------------------------------------ */

export async function getProjectFundamentals(slug: string): Promise<DataResult<ProjectFundamentals>> {
  "use cache";
  cacheLife({ stale: 120, revalidate: 240, expire: 290 });

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return unavailable("Unknown project");
  const { llamaProtocol, llamaChain, llamaFees: feesSlug } = project.data;
  if (!llamaProtocol && !llamaChain && !feesSlug) {
    return unavailable("No open fundamental data source is mapped for this project yet.");
  }

  const [tvlRes, feesRes, revRes] = await Promise.allSettled([
    llamaProtocol
      ? llamaProtocolTvl(llamaProtocol)
      : llamaChain
        ? llamaChains().then((cs) => cs.find((c) => c.name === llamaChain)?.tvl ?? null)
        : Promise.resolve(null),
    feesSlug ? llamaFees(feesSlug, "dailyFees") : Promise.resolve(null),
    feesSlug ? llamaFees(feesSlug, "dailyRevenue") : Promise.resolve(null),
  ]);

  const tvl = tvlRes.status === "fulfilled" ? tvlRes.value : null;
  const fees = feesRes.status === "fulfilled" ? feesRes.value : null;
  const rev = revRes.status === "fulfilled" ? revRes.value : null;
  if (tvl == null && !fees && !rev) {
    return unavailable("Fundamental data (TVL, fees) is temporarily unavailable.");
  }
  return {
    status: [tvlRes, feesRes, revRes].every((r) => r.status === "fulfilled") ? "ok" : "partial",
    data: {
      tvl: tvl && tvl > 0 ? tvl : null,
      tvlScope: llamaProtocol ? "protocol" : llamaChain ? "chain" : null,
      fees24h: fees?.total24h ?? null,
      fees30d: fees?.total30d ?? null,
      fees1y: fees?.total1y ?? null,
      revenue30d: rev?.total30d ?? null,
      revenue1y: rev?.total1y ?? null,
      feesChange30d: fees?.change_30dover30d ?? null,
    },
    source: DEFILLAMA_SOURCE,
    asOf: new Date().toISOString(),
  };
}

/** TVL for every covered project (protocol TVL or chain TVL), one small call each. */
export async function getCoverageTvl(): Promise<DataResult<Record<string, number | null>>> {
  "use cache";
  cacheLife({ stale: 120, revalidate: 240, expire: 290 });

  const needsChains = PROJECTS.some((p) => !p.data.llamaProtocol && p.data.llamaChain);
  const chains = needsChains ? await llamaChains().catch((err) => (logProviderError("tvl/chains", err), null)) : null;
  const entries = await Promise.all(
    PROJECTS.map(async (p): Promise<[string, number | null]> => {
      if (p.data.llamaProtocol) {
        const v = await llamaProtocolTvl(p.data.llamaProtocol).catch(() => null);
        return [p.slug, v && v > 0 ? v : null];
      }
      if (p.data.llamaChain && chains) {
        const v = chains.find((c) => c.name === p.data.llamaChain)?.tvl ?? null;
        return [p.slug, v && v > 0 ? v : null];
      }
      return [p.slug, null];
    }),
  );
  const data = Object.fromEntries(entries);
  const any = entries.some(([, v]) => v != null);
  if (!any) return unavailable("TVL data is temporarily unavailable.");
  return { status: "ok", data, source: DEFILLAMA_SOURCE, asOf: new Date().toISOString() };
}

function latest(values: (string | null)[]): string | null {
  const ts = values.map((v) => (v ? new Date(v).getTime() : NaN)).filter((n) => Number.isFinite(n));
  return ts.length ? new Date(Math.max(...ts)).toISOString() : null;
}
