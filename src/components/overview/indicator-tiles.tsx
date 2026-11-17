import { tint } from "@/lib/brand";
import { ArrowUpRight, CircleDollarSign, Gauge, Layers3, PieChart, TrendingUp, type LucideIcon } from "lucide-react";
import { connection } from "next/server";
import Link from "next/link";
import { getAltcoinBreadth, getFearGreed, getGlobalMarket, getMarketRegime, getStablecoinOverview } from "@/lib/market/service";
import { formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Delta } from "@/components/ui/delta";
import { InfoTip } from "@/components/ui/info-tip";
import { SourceTag } from "@/components/ui/source-tag";
import { Skeleton } from "@/components/ui/skeleton";
import type { DataResult } from "@/lib/market/types";
import { Gauge as GaugeChart, zoneColor } from "./gauge";

function Tile({
  title,
  tip,
  result,
  children,
  href,
  icon: Icon,
  color,
}: {
  title: string;
  tip: string;
  result: DataResult<unknown>;
  children: React.ReactNode;
  href?: string;
  icon: LucideIcon;
  color: string;
}) {
  return (
    <div className="relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface p-4">
      <span className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: color }} aria-hidden />
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2 whitespace-nowrap text-[12.5px] text-muted">
          <span className="flex size-6 items-center justify-center rounded-md" style={{ backgroundColor: tint(color, 0.14), color }}>
            <Icon className="size-3.5" aria-hidden />
          </span>
          {title}
          <InfoTip label={`About ${title}`} align="start">{tip}</InfoTip>
        </div>
        {href ? (
          <Link href={href} className="text-subtle hover:text-fg-2" aria-label={`${title} details`}>
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        ) : null}
      </div>
      <div className="my-2">{result.status === "unavailable" ? <p className="text-[12.5px] text-subtle">{result.note}</p> : children}</div>
      <SourceTag result={result} />
    </div>
  );
}

export async function IndicatorTiles() {
  await connection(); // market data is request-time: never fetched at build
  const [global, fng, breadth, regime, stables] = await Promise.all([
    getGlobalMarket(),
    getFearGreed(),
    getAltcoinBreadth(),
    getMarketRegime(),
    getStablecoinOverview(),
  ]);
  const g = global.data;
  const f = fng.data?.[0];
  const fPrev = fng.data?.[7];
  const b = breadth.data;
  const r = regime.data;
  const s = stables.data;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <Tile icon={PieChart} color="#F7931A" title="BTC dominance" tip="Bitcoin's share of total crypto market capitalisation. Rising dominance often reflects risk aversion within crypto." result={global} href="/markets">
        <div className="num text-2xl text-fg">{formatPercent(g?.btcDominance, { signed: false, digits: 1 })}</div>
        <div className="mt-1 text-[12px] text-muted">
          ETH <span className="num text-fg-2">{formatPercent(g?.ethDominance, { signed: false, digits: 1 })}</span>
        </div>
      </Tile>
      <Tile icon={Gauge as LucideIcon} color={f ? zoneColor(f.value) : "#8EA7FF"} title="Fear & Greed" tip="Crypto Fear & Greed Index (0 = extreme fear, 100 = extreme greed) by Alternative.me. Sentiment context, not a trading signal." result={fng} href="/markets#sentiment">
        <div className="flex items-end gap-3">
          {f ? <GaugeChart value={f.value} label={`Fear and Greed ${f.value}`} /> : null}
          <div>
            <div className="num text-2xl leading-none text-fg">{f?.value ?? "n/a"}</div>
            <div className="mt-1 text-[12px] text-fg-2">{f?.classification}</div>
          </div>
        </div>
        {fPrev ? <div className="mt-1 text-[11.5px] text-subtle">7 days ago: {fPrev.value} ({fPrev.classification})</div> : null}
      </Tile>
      <Tile
        icon={Layers3}
        color="#A487F0"
        title="Altcoin breadth"
        tip="Share of the top-100 altcoins (excluding stablecoins and wrapped/staked tokens) that outperformed BTC over 30 days. Sensitor indicator computed from CoinGecko data."
        result={breadth}
      >
        <div className="num text-2xl text-fg">
          {b?.outperformers ?? "n/a"}
          <span className="text-sm text-subtle"> / {b?.sample ?? 100}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
          <div className="h-full rounded-full bg-violet" style={{ width: `${b ? (b.outperformers / Math.max(b.sample, 1)) * 100 : 0}%` }} />
        </div>
        <div className="mt-1.5 text-[11.5px] text-subtle">beat BTC over 30d (BTC {formatPercent(b?.btcChange30d, { digits: 1 })})</div>
      </Tile>
      <Tile
        icon={TrendingUp}
        color={r?.regime === "below-200d" ? "#E36B75" : "#45B997"}
        title="Market regime"
        tip="Bitcoin price versus its 200-day simple moving average, a transparent trend filter describing the current regime. It does not forecast prices."
        result={regime}
        href="/markets#regime"
      >
        <div className={cn("text-[17px] font-medium", r?.regime === "above-200d" ? "text-positive" : "text-negative")}>
          {r ? (r.regime === "above-200d" ? "BTC above 200D MA" : "BTC below 200D MA") : "n/a"}
        </div>
        <div className="mt-1 text-[12px] text-muted">
          <Delta value={r?.distancePct} className="text-[12px]" /> vs MA ({formatPrice(r?.ma200)})
        </div>
      </Tile>
      <Tile icon={CircleDollarSign} color="#5FCB86" title="Stablecoin supply" tip="Total circulating supply of USD-pegged stablecoins (DefiLlama). A proxy for on-chain dollar liquidity." result={stables} href="/markets#stablecoins">
        <div className="num text-2xl text-fg">{formatUsdCompact(s?.totalCirculating)}</div>
        <div className="mt-1 text-[12px] text-muted">
          <Delta value={s?.change30dPct} className="text-[12px]" /> over 30 days
        </div>
      </Tile>
    </div>
  );
}

export function IndicatorTilesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-[132px] rounded-xl border border-line bg-surface p-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-5 h-7 w-20" />
          <Skeleton className="mt-3 h-3 w-32" />
        </div>
      ))}
    </div>
  );
}
