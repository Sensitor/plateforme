import { connection } from "next/server";
import { getCoverageQuotes, getProjectFundamentals } from "@/lib/market/service";
import { formatNumberCompact, formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import type { Project } from "@/lib/research/types";
import { Delta } from "@/components/ui/delta";
import { InfoTip } from "@/components/ui/info-tip";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { Skeleton } from "@/components/ui/skeleton";

function Metric({ label, value, sub, tip }: { label: string; value: React.ReactNode; sub?: React.ReactNode; tip?: string }) {
  return (
    <div className="min-w-0 bg-surface px-4 py-3.5">
      <div className="flex items-center gap-1.5 text-[11.5px] text-muted">
        {label}
        {tip ? <InfoTip label={`About ${label}`}>{tip}</InfoTip> : null}
      </div>
      <div className="num mt-1 truncate text-[17px] text-fg">{value}</div>
      {sub ? <div className="mt-0.5 text-[11.5px] text-subtle">{sub}</div> : null}
    </div>
  );
}

/** Live market + fundamental metrics strip for a project (request-time data). */
export async function KeyMetrics({ project }: { project: Project }) {
  await connection(); // market data is request-time: never fetched at build
  const [quotes, fundamentals] = await Promise.all([getCoverageQuotes(), getProjectFundamentals(project.slug)]);
  const q = quotes.data?.[project.slug];
  const f = fundamentals.data;
  const mcFdv = q?.marketCap && q?.fdv ? (q.marketCap / q.fdv) * 100 : null;
  const supplyRef = q?.maxSupply ?? project.dossier.tokenomics.maxSupply;
  const circPct = q?.circulatingSupply && supplyRef ? (q.circulatingSupply / supplyRef) * 100 : null;

  return (
    <div className="space-y-2">
      <DataNotice result={quotes} />
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        <Metric label="Price" value={formatPrice(q?.price)} sub={<span className="flex gap-2"><Delta value={q?.change24h} className="text-[11.5px]" /> 24h · <Delta value={q?.change7d} className="text-[11.5px]" /> 7d</span>} />
        <Metric label="Market cap" value={formatUsdCompact(q?.marketCap)} sub={q?.rank ? `Rank #${q.rank}` : undefined} />
        <Metric
          label="FDV"
          value={formatUsdCompact(q?.fdv)}
          sub={mcFdv != null ? `MC/FDV ${formatPercent(mcFdv, { signed: false, digits: 0 })}` : project.dossier.tokenomics.maxSupply == null ? "No max supply" : undefined}
          tip="Fully diluted valuation: price × total (or maximum) supply. A low MC/FDV ratio signals future dilution."
        />
        <Metric
          label="Circulating supply"
          value={formatNumberCompact(q?.circulatingSupply)}
          sub={circPct != null ? `${formatPercent(circPct, { signed: false, digits: 1 })} of max` : supplyRef == null ? "Uncapped supply" : undefined}
        />
        <Metric label="Volume 24h" value={formatUsdCompact(q?.volume24h)} />
        <Metric
          label={f?.tvlScope === "chain" ? "Chain TVL" : "TVL"}
          value={formatUsdCompact(f?.tvl)}
          sub={f?.fees30d != null ? `Fees 30d ${formatUsdCompact(f.fees30d)}` : fundamentals.status === "unavailable" ? "Not tracked" : undefined}
          tip="Total value locked in DeFi contracts (DefiLlama). Price-sensitive; not a valuation metric."
        />
      </div>
      <div className="flex flex-wrap gap-x-4">
        <SourceTag result={quotes} label="Market data" />
        {fundamentals.status !== "unavailable" ? <SourceTag result={fundamentals} label="Fundamentals" /> : null}
      </div>
    </div>
  );
}

export function KeyMetricsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-surface px-4 py-3.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-2 h-5 w-24" />
        </div>
      ))}
    </div>
  );
}
