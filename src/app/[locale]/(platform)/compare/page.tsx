import { SectorBadge } from "@/components/ui/sector-badge";
import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "@/i18n/link";
import { PROJECTS, PROJECT_BY_SLUG } from "@/content/projects";
import { getCoverageQuotes, getProjectFundamentals } from "@/lib/market/service";
import { compositeScore } from "@/lib/research/framework";
import { CHAINS, PILLARS } from "@/lib/research/taxonomy";
import { formatNumber, formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/research/types";
import type { ProjectFundamentals, Quote } from "@/lib/market/types";
import { PageHeader } from "@/components/ui/section-heading";
import { CardSkeleton } from "@/components/ui/skeleton";
import { TokenLogo } from "@/components/ui/token-logo";
import { Delta } from "@/components/ui/delta";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { RiskPill, ScorePill } from "@/components/research/pills";
import { CompareSelector } from "@/components/compare/compare-selector";
import { getLocale, getT } from "@/i18n/server";
import { localizedProject } from "@/lib/research/localized";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("compare", "/compare");
}

const DEFAULT = ["ethereum", "solana", "avalanche"];

export default async function ComparePage(props: PageProps<"/[locale]/compare">) {
  const t = (await getT()).compare;
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Suspense fallback={<CardSkeleton lines={10} />}>
        <CompareContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function CompareContent({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await connection(); // market data is request-time: never fetched at build
  const sp = await searchParams;
  const raw = typeof sp.p === "string" ? sp.p : "";
  const requested = raw.split(",").filter((s) => PROJECT_BY_SLUG[s]);
  const slugs = [...new Set(requested.length ? requested : DEFAULT)].slice(0, 4);
  const locale = await getLocale();
  const projects = slugs.map((s) => localizedProject(PROJECT_BY_SLUG[s], locale));
  const [quotes, ...funds] = await Promise.all([getCoverageQuotes(), ...slugs.map((s) => getProjectFundamentals(s))]);
  const q = (p: Project): Quote | undefined => quotes.data?.[p.slug];
  const f = (i: number): ProjectFundamentals | null => funds[i]?.data ?? null;
  const dict = await getT();
  const t = dict.compare;
  const R = t.rows;

  type Row = { label: string; render: (p: Project, i: number) => React.ReactNode; hint?: string };
  const groups: { title: string; rows: Row[] }[] = [
    {
      title: t.groups.market,
      rows: [
        { label: R.price, render: (p) => <span className="num">{formatPrice(q(p)?.price)}</span> },
        { label: R.change, render: (p) => <span className="flex gap-3"><Delta value={q(p)?.change24h} /><Delta value={q(p)?.change7d} /></span> },
        { label: R.marketCap, render: (p) => <span className="num">{formatUsdCompact(q(p)?.marketCap)}</span> },
        { label: R.fdv, render: (p) => <span className="num">{formatUsdCompact(q(p)?.fdv)}</span> },
        {
          label: R.mcFdv,
          hint: R.mcFdvHint,
          render: (p) => {
            const x = q(p);
            return <span className="num">{x?.marketCap && x?.fdv ? formatPercent((x.marketCap / x.fdv) * 100, { signed: false, digits: 0 }) : "n/a"}</span>;
          },
        },
        { label: R.volume, render: (p) => <span className="num">{formatUsdCompact(q(p)?.volume24h)}</span> },
      ],
    },
    {
      title: t.groups.fundamentals,
      rows: [
        { label: R.tvl, render: (_, i) => <span className="num">{formatUsdCompact(f(i)?.tvl)}</span> },
        { label: R.fees, render: (_, i) => <span className="num">{formatUsdCompact(f(i)?.fees30d)}</span> },
        { label: R.revenue, render: (_, i) => <span className="num">{formatUsdCompact(f(i)?.revenue30d)}</span> },
        {
          label: R.feesCap,
          hint: R.feesCapHint,
          render: (p, i) => {
            const fees = f(i)?.fees30d;
            const cap = q(p)?.marketCap;
            return <span className="num">{fees && cap ? formatPercent(((fees * 12) / cap) * 100, { signed: false, digits: 2 }) : "n/a"}</span>;
          },
        },
      ],
    },
    {
      title: t.groups.profile,
      rows: [
        { label: R.sector, render: (p) => <SectorBadge sector={p.sector} /> },
        { label: R.chain, render: (p) => p.chains.map((c) => CHAINS[c].label).join(", ") },
        { label: R.launched, render: (p) => p.launched.slice(0, 4) },
        { label: R.maturity, render: (p) => dict.labels.maturity[p.maturity] },
        { label: R.risk, render: (p) => <RiskPill level={p.riskLevel} /> },
        { label: R.maxSupply, render: (p) => (p.dossier.tokenomics.maxSupply ? formatNumber(p.dossier.tokenomics.maxSupply) : R.noCap) },
      ],
    },
    {
      title: t.groups.framework,
      rows: [
        ...PILLARS.map((pillar) => ({
          label: dict.labels.pillars[pillar.id].label,
          render: (p: Project) => {
            const a = p.dossier.framework.find((x) => x.pillar === pillar.id);
            return (
              <span className="flex items-center gap-2" title={a?.summary}>
                <span className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={cn("h-1.5 w-4 rounded-full", a?.rating != null && n <= a.rating ? "bg-accent" : "bg-surface-3")} />
                  ))}
                </span>
                <span className="text-[11px] text-subtle">{a?.rating == null ? t.nr : dict.ui.confidenceShort[a.confidence]}</span>
              </span>
            );
          },
        })),
        {
          label: R.composite,
          render: (p: Project) => {
            const c = compositeScore(p.dossier.framework);
            return <ScorePill score={c.score} note={c.withheldReason} />;
          },
        },
      ],
    },
    {
      title: t.groups.analysis,
      rows: [
        { label: R.strengths, render: (p) => p.dossier.competitors.columns[0]?.strengths },
        { label: R.weaknesses, render: (p) => p.dossier.competitors.columns[0]?.weaknesses },
        { label: R.positioning, render: (p) => p.dossier.competitors.columns[0]?.positioning },
        { label: R.bull, render: (p) => p.dossier.thesis.bull[0]?.text },
        { label: R.bear, render: (p) => p.dossier.thesis.bear[0]?.text },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <CompareSelector selected={slugs} options={PROJECTS.map((p) => ({ slug: p.slug, name: p.name, ticker: p.ticker, logo: p.logo }))} />
      <DataNotice result={quotes} />
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[760px] table-fixed border-b border-line text-[13px]">
            <colgroup>
              <col className="w-48" />
              {projects.map((p) => (
                <col key={p.slug} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-y border-line">
                <th scope="col" className="py-4 pr-4 text-left text-[10.5px] font-medium uppercase tracking-[0.1em] text-subtle">
                  {t.project}
                </th>
                {projects.map((p) => (
                  <th key={p.slug} scope="col" className="px-4 py-4 text-left">
                    <Link href={`/projects/${p.slug}`} className="flex items-center gap-2.5 hover:text-accent-strong">
                      <TokenLogo src={p.logo} name={p.name} size={30} />
                      <span>
                        <span className="block font-semibold text-fg">{p.name}</span>
                        <span className="block text-xs font-normal text-muted">{p.ticker}</span>
                      </span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            {groups.map((g) => (
              <tbody key={g.title}>
                <tr className="border-b border-line">
                  <th colSpan={projects.length + 1} scope="colgroup" className="pb-2 pt-7 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                    {g.title}
                  </th>
                </tr>
                {g.rows.map((row) => (
                  <tr key={row.label} className="border-b border-line/60 align-top last:border-0">
                    <th scope="row" className="py-3 pr-4 text-left text-[12.5px] font-normal text-muted" title={row.hint}>
                      {row.label}
                      {row.hint ? <span className="ml-1 text-subtle">ⓘ</span> : null}
                    </th>
                    {projects.map((p, i) => (
                      <td key={p.slug} className="px-4 py-3 leading-relaxed text-fg-2">
                        {row.render(p, i) ?? "n/a"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4">
        <SourceTag result={quotes} label={dict.ui.sources.marketData} />
        {funds[0] && funds[0].status !== "unavailable" ? <SourceTag result={funds[0]} label={dict.ui.sources.fundamentals} /> : null}
      </div>
      <p className="text-[12px] leading-relaxed text-subtle">
        Comparisons across different business models (e.g. an L1 vs a DeFi protocol) are indicative only. Framework ratings are Sensitor analyst assessments from draft dossiers.
      </p>
    </div>
  );
}
