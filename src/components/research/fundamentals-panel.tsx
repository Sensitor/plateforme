import { connection } from "next/server";
import { Suspense } from "react";
import { getProjectFundamentals } from "@/lib/market/service";
import { formatUsdCompact } from "@/lib/format";
import type { Project } from "@/lib/research/types";
import { SourceTag } from "@/components/ui/source-tag";
import { Skeleton } from "@/components/ui/skeleton";
import { Delta } from "@/components/ui/delta";
import { ClaimList } from "./claim-list";
import { getT } from "@/i18n/server";

async function LiveFundamentals({ project }: { project: Project }) {
  await connection(); // market data is request-time: never fetched at build
  const res = await getProjectFundamentals(project.slug);
  if (res.status === "unavailable") {
    return <p className="rounded-lg border border-dashed border-line-strong p-4 text-[13px] text-muted">{res.note}</p>;
  }
  const f = res.data!;
  const t = (await getT()).dossier.fundamentals;
  const items = [
    { label: f.tvlScope === "chain" ? t.chainTvl : t.tvl, value: f.tvl },
    { label: t.fees30d, value: f.fees30d, change: f.feesChange30d },
    { label: t.fees1y, value: f.fees1y },
    { label: t.revenue30d, value: f.revenue30d },
    { label: t.revenue1y, value: f.revenue1y },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-5">
        {items.map((i) => (
          <div key={i.label} className="bg-surface px-4 py-3">
            <div className="text-[11.5px] text-muted">{i.label}</div>
            <div className="num mt-1 text-[16px] text-fg">{formatUsdCompact(i.value)}</div>
            {i.change != null ? (
              <div className="text-[11px] text-subtle">
                <Delta value={i.change} className="text-[11px]" /> {t.vsPrior}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <SourceTag result={res} className="mt-2" />
      <p className="mt-1 text-[11.5px] text-subtle">{t.note}</p>
    </div>
  );
}

export async function FundamentalsPanel({ project }: { project: Project }) {
  const t = (await getT()).dossier.fundamentals;
  const fin = project.dossier.financials;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
        {t.businessModel} <span className="serif-display text-[22px] text-fg">{t.models[fin.model]}</span>
      </div>
      <Suspense fallback={<Skeleton className="h-20 w-full rounded-xl" />}>
        <LiveFundamentals project={project} />
      </Suspense>
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="border-t-2 border-violet/60 pt-4">
          <h3 className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">{t.matter}</h3>
          <dl className="space-y-3.5">
            {fin.relevantMetrics.map((m) => (
              <div key={m.label}>
                <dt className="text-[14px] font-medium text-fg">{m.label}</dt>
                <dd className="text-[13px] leading-relaxed text-muted">{m.why}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ClaimList claims={fin.claims} sources={project.dossier.sources} />
      </div>
    </div>
  );
}
