import { connection } from "next/server";
import { getGlobalMarket, getPriceHistory, getTotalMarketCapHistory, totalMarketCapHistoryAvailable } from "@/lib/market/service";
import { formatUsdCompact } from "@/lib/format";
import { Delta } from "@/components/ui/delta";
import { SourceTag } from "@/components/ui/source-tag";
import { PriceChartCard, type ChartAsset } from "@/components/charts/price-chart-card";

/**
 * Global market card: live total market cap (headline) + history chart.
 * Historical total market cap needs a CoinGecko Pro key; without it the chart
 * shows BTC and ETH price history, clearly labelled.
 */
export async function MarketHero() {
  await connection(); // market data is request-time: never fetched at build
  const proTotal = totalMarketCapHistoryAvailable();
  const assets: ChartAsset[] = [
    ...(proTotal ? [{ key: "total-mcap", label: "Total market cap", format: "usd-compact" as const }] : []),
    { key: "bitcoin", label: "BTC price", format: "price" },
    { key: "ethereum", label: "ETH price", format: "price" },
  ];
  const [global, initial] = await Promise.all([
    getGlobalMarket(),
    proTotal ? getTotalMarketCapHistory("1Y") : getPriceHistory("bitcoin", "1Y"),
  ]);
  const g = global.data;
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="text-[13px] text-muted">Total crypto market cap</div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="num text-[30px] font-semibold leading-none text-fg">{formatUsdCompact(g?.totalMarketCap)}</span>
            <Delta value={g?.marketCapChange24h} className="text-sm" />
            <span className="text-xs text-subtle">24h</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[12px] text-muted">24h volume</div>
          <div className="num text-[15px] text-fg-2">{formatUsdCompact(g?.totalVolume24h)}</div>
          <SourceTag result={global} className="mt-1" />
        </div>
      </div>
      <PriceChartCard assets={assets} initialAsset={assets[0].key} initialData={initial} height={190} />
      {!proTotal ? (
        <p className="mt-2 text-[11px] text-subtle">Historical total market cap is a CoinGecko Pro dataset; BTC and ETH price history are shown instead.</p>
      ) : null}
    </div>
  );
}
