import { connection } from "next/server";
import { getCoverageQuotes, getProjectFundamentals } from "@/lib/market/service";
import { formatNumberCompact, formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import type { Project } from "@/lib/research/types";
import { Delta } from "@/components/ui/delta";
import { Stat, StatStrip } from "@/components/ui/stat-strip";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { Skeleton } from "@/components/ui/skeleton";

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
      <StatStrip columns={6}>
        <Stat size="md" label="Price" value={formatPrice(q?.price)}>
          <span className="flex flex-wrap gap-x-2">
            <span>
              <Delta value={q?.change24h} className="text-[11.5px]" /> 24h
            </span>
            <span>
              <Delta value={q?.change7d} className="text-[11.5px]" /> 7d
            </span>
          </span>
        </Stat>
        <Stat size="md" label="Market cap" value={formatUsdCompact(q?.marketCap)}>
          {q?.rank ? `Rank #${q.rank}` : "Rank n/a"}
        </Stat>
        <Stat size="md" label="FDV" value={formatUsdCompact(q?.fdv)} tip="Fully diluted valuation as reported by the provider (price × total supply). A low MC/FDV ratio signals future dilution.">
          {mcFdv != null ? `MC/FDV ${formatPercent(mcFdv, { signed: false, digits: 0 })}` : project.dossier.tokenomics.maxSupply == null ? "No max supply" : "MC/FDV n/a"}
        </Stat>
        <Stat size="md" label="Circulating supply" value={formatNumberCompact(q?.circulatingSupply)}>
          {circPct != null ? `${formatPercent(circPct, { signed: false, digits: 1 })} of max` : supplyRef == null ? "Uncapped supply" : "n/a"}
        </Stat>
        <Stat size="md" label="Volume 24h" value={formatUsdCompact(q?.volume24h)}>
          {q?.volume24h && q?.marketCap ? `${formatPercent((q.volume24h / q.marketCap) * 100, { signed: false, digits: 1 })} of market cap` : "n/a"}
        </Stat>
        <Stat
          size="md"
          label={f?.tvlScope === "chain" ? "Chain TVL" : "TVL"}
          value={formatUsdCompact(f?.tvl)}
          tip="Total value locked in DeFi contracts (DefiLlama). Price-sensitive; not a valuation metric."
        >
          {f?.fees30d != null ? `Fees 30d ${formatUsdCompact(f.fees30d)}` : fundamentals.status === "unavailable" ? "Not tracked" : "Fees n/a"}
        </Stat>
      </StatStrip>
      <div className="flex flex-wrap gap-x-4">
        <SourceTag result={quotes} label="Market data" />
        {fundamentals.status !== "unavailable" ? <SourceTag result={fundamentals} label="Fundamentals" /> : null}
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
