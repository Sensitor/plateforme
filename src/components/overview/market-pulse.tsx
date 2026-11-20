import { connection } from "next/server";
import { getFearGreed, getGlobalMarket, getMarketRegime } from "@/lib/market/service";
import { formatPercent, formatUsdCompact } from "@/lib/format";
import { marketContext } from "@/lib/overview";
import { Delta } from "@/components/ui/delta";
import { Stat, StatStrip } from "@/components/ui/stat-strip";
import { SourceTag } from "@/components/ui/source-tag";
import { Skeleton } from "@/components/ui/skeleton";
import { zoneColor } from "./gauge";
import { getLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { INTL_LOCALE } from "@/i18n/config";

function SentimentScale({ value }: { value: number }) {
  return (
    <div className="relative mt-2.5 h-1 w-full max-w-[180px] rounded-full bg-surface-3" aria-hidden>
      <span className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-bg" style={{ left: `${value}%`, backgroundColor: zoneColor(value) }} />
    </div>
  );
}

/** Date, factual market context and the four headline indicators. */
export async function MarketPulse() {
  await connection(); // live data and today's date are request-time values
  const [global, fng, regime] = await Promise.all([getGlobalMarket(), getFearGreed(), getMarketRegime()]);
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.overview.pulse;
  const now = new Date();
  const date = new Intl.DateTimeFormat(INTL_LOCALE[locale], { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(now);
  const time = new Intl.DateTimeFormat(INTL_LOCALE[locale], { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(now);
  const g = global.data;
  const f = fng.data?.[0];
  const f7 = fng.data?.[7];
  const context = marketContext(g, regime.data, f ?? null, dict);
  const turnover = g?.totalVolume24h != null && g.totalMarketCap ? (g.totalVolume24h / g.totalMarketCap) * 100 : null;

  return (
    <>
      <p className="num mt-3 text-[12px] uppercase tracking-[0.12em] text-subtle">
        {date} · {time} {t.utc}
      </p>
      {context ? <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-fg-2">{context}</p> : null}

      <StatStrip className="mt-6">
        <Stat label={t.totalCap} tip={t.totalCapTip} value={formatUsdCompact(g?.totalMarketCap)}>
          <Delta value={g?.marketCapChange24h} className="text-[12.5px]" /> 24h
        </Stat>
        <Stat label={t.dominance} tip={t.dominanceTip} value={formatPercent(g?.btcDominance, { signed: false, digits: 1 })}>
          ETH <span className="num text-fg-2">{formatPercent(g?.ethDominance, { signed: false, digits: 1 })}</span>
        </Stat>
        <Stat label={t.fearGreed} tip={t.fearGreedTip} value={f?.value ?? "n/a"}>
          <span className="text-fg-2">{f?.classification ? (dict.ui.fearGreed[f.classification] ?? f.classification) : "n/a"}</span>
          {f7 ? <span className="text-subtle"> · {t.weekAgo(f7.value)}</span> : null}
          {f ? <SentimentScale value={f.value} /> : null}
        </Stat>
        <Stat label={t.volume} tip={t.volumeTip} value={formatUsdCompact(g?.totalVolume24h)}>
          {turnover != null ? (
            <>
              {t.turnover} <span className="num text-fg-2">{formatPercent(turnover, { signed: false, digits: 1 })}</span> {t.ofCap}
            </>
          ) : (
            "n/a"
          )}
        </Stat>
      </StatStrip>
      <div className="mt-2 flex flex-wrap justify-end gap-x-4 gap-y-1">
        {global.status === "unavailable" ? <span className="text-[11px] text-subtle">{global.note}</span> : <SourceTag result={global} label={dict.ui.sources.market} />}
        <SourceTag result={fng} label={dict.ui.sources.sentiment} />
        <SourceTag result={regime} label={dict.ui.sources.trend} />
      </div>
    </>
  );
}

export function MarketPulseSkeleton() {
  return (
    <>
      <Skeleton className="mt-3 h-3 w-64" />
      <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
      <div className="mt-6 grid grid-cols-2 gap-6 border-y border-line py-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-7 w-28" />
            <Skeleton className="mt-3 h-3 w-20" />
          </div>
        ))}
      </div>
    </>
  );
}
