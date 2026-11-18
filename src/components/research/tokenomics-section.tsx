import type { Project } from "@/lib/research/types";
import { modelSupplyCurve } from "@/lib/research/issuance";
import { formatNumber } from "@/lib/format";
import { Donut } from "@/components/charts/donut";
import { ClaimGroup, SourceRefs } from "./claim-list";
import { SupplyChart } from "./supply-chart";

const SUPPLY_MODEL_LABEL: Record<Project["dossier"]["tokenomics"]["supplyModel"], string> = {
  "fixed-cap": "Fixed cap",
  "capped-emissions": "Capped, emitted over time",
  disinflationary: "Disinflationary",
  "net-variable": "Net variable (issuance vs burn)",
  "fixed-genesis-plus-inflation": "Genesis supply + governed inflation",
};

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

export function TokenomicsSection({ project }: { project: Project }) {
  const t = project.dossier.tokenomics;
  const sources = project.dossier.sources;
  const curve = t.issuance ? modelSupplyCurve(t.issuance) : null;
  let fig = 0;
  return (
    <div className="space-y-10">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[200px_1fr]">
        <dt className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">Supply model</dt>
        <dd className="text-[15px] text-fg">
          {SUPPLY_MODEL_LABEL[t.supplyModel]}
          <span className="ml-3 text-[13px] text-muted">{t.maxSupply ? `Max supply ${formatNumber(t.maxSupply)} ${project.ticker}` : "No hard cap"}</span>
          <p className="mt-1.5 max-w-3xl text-[14px] leading-relaxed text-fg-2">{t.supplyModelNote}</p>
        </dd>
      </dl>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {t.distribution?.length ? (
          <Figure
            n={++fig}
            title="Token distribution"
            caption={
              <>
                {t.distributionNote}
                <SourceRefs ids={t.distributionSources} sources={sources} />
              </>
            }
          >
            <Donut data={t.distribution.map((d) => ({ label: d.label, value: d.pct, note: d.note }))} centerValue={project.ticker} centerLabel="allocation" />
          </Figure>
        ) : (
          <div className="min-w-0">
            <div className="mb-4 border-b border-line pb-2 text-[12.5px] text-fg-2">Token distribution</div>
            <p className="text-[14.5px] leading-relaxed text-fg-2">
              {t.distributionNote ?? "No allocation chart in this release."}
              <SourceRefs ids={t.distributionSources} sources={sources} />
            </p>
          </div>
        )}
        {curve ? (
          <Figure n={++fig} title="Supply over time" badge="Modelled from protocol rules" caption={t.issuanceNote}>
            <SupplyChart data={curve} label={`${project.name} modelled supply curve`} />
          </Figure>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-2">
        <ClaimGroup title="Token utility" claims={t.utility} sources={sources} compact />
        <ClaimGroup title="Emissions & inflation" claims={t.emissions} sources={sources} compact />
        <ClaimGroup title="Vesting & unlocks" claims={t.vesting} sources={sources} compact />
        <ClaimGroup title="Value accrual" claims={t.valueAccrual} sources={sources} compact />
        {t.concentration?.length ? <ClaimGroup title="Holder concentration" claims={t.concentration} sources={sources} compact /> : null}
      </div>
    </div>
  );
}
