import { connection } from "next/server";
import { getCoverageQuotes, getProjectFundamentals } from "@/lib/market/service";
import { formatNumberCompact, formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import type { Project } from "@/lib/research/types";
import { Delta } from "@/components/ui/delta";
import { Stat, StatStrip } from "@/components/ui/stat-strip";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { Skeleton } from "@/components/ui/skeleton";
import { getT } from "@/i18n/server";

/** Live market + fundamental metrics strip for a project (request-time data). */
export async function KeyMetrics({ project }: { project: Project }) {
  await connection(); // market data is request-time: never fetched at build
  const [quotes, fundamentals] = await Promise.all([getCoverageQuotes(), getProjectFundamentals(project.slug)]);
  const dict = await getT();
  const t = dict.dossier.metrics;
  const q = quotes.data?.[project.slug];
  const f = fundamentals.data;
  const mcFdv = q?.marketCap && q?.fdv ? (q.marketCap / q.fdv) * 100 : null;
  const supplyRef = q?.maxSupply ?? project.dossier.tokenomics.maxSupply;
  const circPct = q?.circulatingSupply && supplyRef ? (q.circulatingSupply / supplyRef) * 100 : null;

  return (
    <div className="space-y-2">
      <DataNotice result={quotes} />
      <StatStrip columns={6}>
        <Stat size="md" label={t.price} value={formatPrice(q?.price)}>
          <span className="flex flex-wrap gap-x-2">
            <span>
              <Delta value={q?.change24h} className="text-[11.5px]" /> 24h
            </span>
            <span>
              <Delta value={q?.change7d} className="text-[11.5px]" /> 7d
            </span>
          </span>
        </Stat>
        <Stat size="md" label={t.marketCap} value={formatUsdCompact(q?.marketCap)}>
          {q?.rank ? t.rank(q.rank) : t.rankNa}
        </Stat>
        <Stat size="md" label={t.fdv} value={formatUsdCompact(q?.fdv)} tip={t.fdvTip}>
          {mcFdv != null ? t.mcFdv(formatPercent(mcFdv, { signed: false, digits: 0 })) : project.dossier.tokenomics.maxSupply == null ? t.noMax : t.mcFdvNa}
        </Stat>
        <Stat size="md" label={t.circulating} value={formatNumberCompact(q?.circulatingSupply)}>
          {circPct != null ? t.ofMax(formatPercent(circPct, { signed: false, digits: 1 })) : supplyRef == null ? t.uncapped : "n/a"}
        </Stat>
        <Stat size="md" label={t.volume} value={formatUsdCompact(q?.volume24h)}>
          {q?.volume24h && q?.marketCap ? t.ofCap(formatPercent((q.volume24h / q.marketCap) * 100, { signed: false, digits: 1 })) : "n/a"}
        </Stat>
        <Stat
          size="md"
          label={f?.tvlScope === "chain" ? t.chainTvl : t.tvl}
          value={formatUsdCompact(f?.tvl)}
          tip={t.tvlTip}
        >
          {f?.fees30d != null ? t.fees30d(formatUsdCompact(f.fees30d)) : fundamentals.status === "unavailable" ? t.notTracked : t.feesNa}
        </Stat>
      </StatStrip>
      <div className="flex flex-wrap gap-x-4">
        <SourceTag result={quotes} label={dict.ui.sources.marketData} />
        {fundamentals.status !== "unavailable" ? <SourceTag result={fundamentals} label={dict.ui.sources.fundamentals} /> : null}
      </div>
    </div>
  );
}

export function KeyMetricsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 border-y border-line py-5 sm:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-2 h-5 w-24" />
        </div>
      ))}
    </div>
  );
}
