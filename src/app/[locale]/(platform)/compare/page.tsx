import { SectorBadge } from "@/components/ui/sector-badge";
import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "@/i18n/link";
import { PROJECTS, PROJECT_BY_SLUG } from "@/content/projects";
import { getCoverageQuotes, getProjectFundamentals } from "@/lib/market/service";
import { compositeScore } from "@/lib/research/framework";
import { CHAINS, MATURITY, PILLARS } from "@/lib/research/taxonomy";
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

export const metadata: Metadata = { title: "Compare projects", description: "Compare crypto projects side by side: market data, tokenomics, fundamentals and research framework." };

const DEFAULT = ["ethereum", "solana", "avalanche"];

export default function ComparePage(props: PageProps<"/[locale]/compare">) {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Discover"
        title="Compare projects"
        description="Up to four projects side by side. Live metrics come from market data providers; qualitative rows come from each project's Sensitor dossier."
      />
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
  const projects = slugs.map((s) => PROJECT_BY_SLUG[s]);
  const [quotes, ...funds] = await Promise.all([getCoverageQuotes(), ...slugs.map((s) => getProjectFundamentals(s))]);
  const q = (p: Project): Quote | undefined => quotes.data?.[p.slug];
  const f = (i: number): ProjectFundamentals | null => funds[i]?.data ?? null;

  type Row = { label: string; render: (p: Project, i: number) => React.ReactNode; hint?: string };
  const groups: { title: string; rows: Row[] }[] = [
    {
      title: "Market",
      rows: [
        { label: "Price", render: (p) => <span className="num">{formatPrice(q(p)?.price)}</span> },
        { label: "24h / 7d", render: (p) => <span className="flex gap-3"><Delta value={q(p)?.change24h} /><Delta value={q(p)?.change7d} /></span> },
        { label: "Market cap", render: (p) => <span className="num">{formatUsdCompact(q(p)?.marketCap)}</span> },
        { label: "FDV", render: (p) => <span className="num">{formatUsdCompact(q(p)?.fdv)}</span> },
        {
          label: "MC / FDV",
          hint: "Share of fully diluted value already circulating; low values signal future dilution.",
          render: (p) => {
            const x = q(p);
            return <span className="num">{x?.marketCap && x?.fdv ? formatPercent((x.marketCap / x.fdv) * 100, { signed: false, digits: 0 }) : "n/a"}</span>;
          },
        },
        { label: "Volume 24h", render: (p) => <span className="num">{formatUsdCompact(q(p)?.volume24h)}</span> },
      ],
    },
    {
      title: "Fundamentals",
      rows: [
        { label: "TVL", render: (_, i) => <span className="num">{formatUsdCompact(f(i)?.tvl)}</span> },
        { label: "Fees · 30d", render: (_, i) => <span className="num">{formatUsdCompact(f(i)?.fees30d)}</span> },
        { label: "Revenue · 30d", render: (_, i) => <span className="num">{formatUsdCompact(f(i)?.revenue30d)}</span> },
        {
          label: "Annualised fees / MCap",
          hint: "Fees over the last 30 days × 12, divided by market cap. A rough usage-to-valuation ratio; not comparable across business models.",
          render: (p, i) => {
            const fees = f(i)?.fees30d;
            const cap = q(p)?.marketCap;
            return <span className="num">{fees && cap ? formatPercent(((fees * 12) / cap) * 100, { signed: false, digits: 2 }) : "n/a"}</span>;
          },
        },
      ],
    },
    {
      title: "Profile",
      rows: [
        { label: "Sector", render: (p) => <SectorBadge sector={p.sector} /> },
        { label: "Blockchain", render: (p) => p.chains.map((c) => CHAINS[c].label).join(", ") },
        { label: "Launched", render: (p) => p.launched.slice(0, 4) },
        { label: "Maturity", render: (p) => MATURITY[p.maturity] },
        { label: "Risk level", render: (p) => <RiskPill level={p.riskLevel} /> },
        { label: "Max supply", render: (p) => (p.dossier.tokenomics.maxSupply ? formatNumber(p.dossier.tokenomics.maxSupply) : "No hard cap") },
      ],
    },
    {
      title: "Sensitor Research Framework",
      rows: [
        ...PILLARS.map((pillar) => ({
          label: pillar.label,
          render: (p: Project) => {
            const a = p.dossier.framework.find((x) => x.pillar === pillar.id);
            return (
              <span className="flex items-center gap-2" title={a?.summary}>
                <span className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={cn("h-1.5 w-4 rounded-full", a?.rating != null && n <= a.rating ? "bg-accent" : "bg-surface-3")} />
                  ))}
                </span>
                <span className="text-[11px] text-subtle">{a?.rating == null ? "n/r" : a.confidence}</span>
              </span>
            );
          },
        })),
        {
          label: "Composite",
          render: (p: Project) => {
            const c = compositeScore(p.dossier.framework);
            return <ScorePill score={c.score} note={c.withheldReason} />;
          },
        },
      ],
    },
    {
      title: "Analysis",
      rows: [
        { label: "Strengths", render: (p) => p.dossier.competitors.columns[0]?.strengths },
        { label: "Weaknesses", render: (p) => p.dossier.competitors.columns[0]?.weaknesses },
        { label: "Positioning", render: (p) => p.dossier.competitors.columns[0]?.positioning },
        { label: "Bull case", render: (p) => p.dossier.thesis.bull[0]?.text },
        { label: "Bear case", render: (p) => p.dossier.thesis.bear[0]?.text },
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
                  Project
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
        <SourceTag result={quotes} label="Market data" />
        {funds[0] && funds[0].status !== "unavailable" ? <SourceTag result={funds[0]} label="Fundamentals" /> : null}
      </div>
      <p className="text-[12px] leading-relaxed text-subtle">
        Comparisons across different business models (e.g. an L1 vs a DeFi protocol) are indicative only. Framework ratings are Sensitor analyst assessments from draft dossiers.
      </p>
    </div>
  );
}
