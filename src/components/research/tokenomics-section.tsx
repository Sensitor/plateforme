import type { Project } from "@/lib/research/types";
import { modelSupplyCurve } from "@/lib/research/issuance";
import { formatNumber } from "@/lib/format";
import { Donut } from "@/components/charts/donut";
import { ClaimGroup, SourceRefs } from "./claim-list";
import { SupplyChart } from "./supply-chart";
import { getT } from "@/i18n/server";

function Figure({ n, title, children, caption, badge }: { n: number; title: string; children: React.ReactNode; caption?: React.ReactNode; badge?: string }) {
  return (
    <figure className="min-w-0">
      <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-line pb-2">
        <span className="text-[12.5px] text-fg-2">
          <span className="num mr-2 text-accent">Fig. {n}</span>
          {title}
        </span>
        {badge ? <span className="text-[11px] italic text-warning">{badge}</span> : null}
      </div>
      {children}
      {caption ? <figcaption className="mt-3 text-[12px] leading-relaxed text-subtle">{caption}</figcaption> : null}
    </figure>
  );
}

export async function TokenomicsSection({ project }: { project: Project }) {
  const L = (await getT()).dossier.tokenomics;
  const t = project.dossier.tokenomics;
  const sources = project.dossier.sources;
  const curve = t.issuance ? modelSupplyCurve(t.issuance) : null;
  let fig = 0;
  return (
    <div className="space-y-10">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[200px_1fr]">
        <dt className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">{L.supplyModel}</dt>
        <dd className="text-[15px] text-fg">
          {L.models[t.supplyModel]}
          <span className="ml-3 text-[13px] text-muted">{t.maxSupply ? L.maxSupply(formatNumber(t.maxSupply), project.ticker) : L.noCap}</span>
          <p className="mt-1.5 max-w-3xl text-[14px] leading-relaxed text-fg-2">{t.supplyModelNote}</p>
        </dd>
      </dl>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {t.distribution?.length ? (
          <Figure
            n={++fig}
            title={L.distribution}
            caption={
              <>
                {t.distributionNote}
                <SourceRefs ids={t.distributionSources} sources={sources} />
              </>
            }
          >
            <Donut data={t.distribution.map((d) => ({ label: d.label, value: d.pct, note: d.note }))} centerValue={project.ticker} centerLabel={L.allocation} />
          </Figure>
        ) : (
          <div className="min-w-0">
            <div className="mb-4 border-b border-line pb-2 text-[12.5px] text-fg-2">{L.distribution}</div>
            <p className="text-[14.5px] leading-relaxed text-fg-2">
              {t.distributionNote ?? L.noAllocation}
              <SourceRefs ids={t.distributionSources} sources={sources} />
            </p>
          </div>
        )}
        {curve ? (
          <Figure n={++fig} title={L.supplyOverTime} badge={L.modelled} caption={t.issuanceNote}>
            <SupplyChart data={curve} label={L.curveLabel(project.name)} />
          </Figure>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-2">
        <ClaimGroup title={L.utility} claims={t.utility} sources={sources} compact />
        <ClaimGroup title={L.emissions} claims={t.emissions} sources={sources} compact />
        <ClaimGroup title={L.vesting} claims={t.vesting} sources={sources} compact />
        <ClaimGroup title={L.valueAccrual} claims={t.valueAccrual} sources={sources} compact />
        {t.concentration?.length ? <ClaimGroup title={L.concentration} claims={t.concentration} sources={sources} compact /> : null}
      </div>
    </div>
  );
}
