import { connection } from "next/server";
import { Suspense } from "react";
import Link from "@/i18n/link";
import { getCoverageQuotes, getCoverageTvl } from "@/lib/market/service";
import { formatUsdCompact } from "@/lib/format";
import { PROJECT_BY_SLUG } from "@/content/projects";
import type { CompetitorColumn, Project } from "@/lib/research/types";
import { TokenLogo } from "@/components/ui/token-logo";
import { Delta } from "@/components/ui/delta";
import { SourceTag } from "@/components/ui/source-tag";
import { getT } from "@/i18n/server";

const ROWS: { key: keyof Omit<CompetitorColumn, "name" | "slug">; label: string }[] = [
  { key: "technology", label: "Technology" },
  { key: "adoption", label: "Adoption" },
  { key: "tokenomics", label: "Tokenomics" },
  { key: "economics", label: "Economic activity" },
  { key: "strengths", label: "Strengths" },
  { key: "weaknesses", label: "Weaknesses" },
  { key: "positioning", label: "Positioning" },
];

async function LiveRow({ columns }: { columns: CompetitorColumn[] }) {
  const dict = await getT();
  const t = dict.dossier.competitors;
  await connection(); // market data is request-time: never fetched at build
  const [quotes, tvl] = await Promise.all([getCoverageQuotes(), getCoverageTvl()]);
  return (
    <>
      <tr className="border-b border-line/70 align-top">
        <th scope="row" className="py-3 pl-4 pr-3 text-left text-[12px] font-medium text-muted">
          {t.live}
        </th>
        {columns.map((c) => {
          const q = c.slug ? quotes.data?.[c.slug] : null;
          const tvlValue = c.slug ? tvl.data?.[c.slug] : null;
          return (
            <td key={c.name} className="px-3 py-3 text-[12.5px]">
              {c.slug ? (
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                  <dt className="text-subtle">{t.mcap}</dt>
                  <dd className="num text-fg-2">{formatUsdCompact(q?.marketCap)}</dd>
                  <dt className="text-subtle">FDV</dt>
                  <dd className="num text-fg-2">{formatUsdCompact(q?.fdv)}</dd>
                  <dt className="text-subtle">TVL</dt>
                  <dd className="num text-fg-2">{formatUsdCompact(tvlValue)}</dd>
                  <dt className="text-subtle">7d</dt>
                  <dd>
                    <Delta value={q?.change7d} className="text-[12.5px]" />
                  </dd>
                </dl>
              ) : (
                <span className="text-subtle">{t.notCovered}</span>
              )}
            </td>
          );
        })}
      </tr>
      <tr>
        <td colSpan={columns.length + 1} className="px-4 pb-2">
          <SourceTag result={quotes} label={dict.ui.sources.marketData} />
        </td>
      </tr>
    </>
  );
}

export async function CompetitorsSection({ project }: { project: Project }) {
  const t = (await getT()).dossier.competitors;
  const { columns, note } = project.dossier.competitors;
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[720px] text-[13px]">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="w-36 py-3 pl-4 pr-3 text-left text-[11px] font-medium uppercase tracking-wide text-subtle">
                  Dimension
                </th>
                {columns.map((c, i) => {
                  const covered = c.slug ? PROJECT_BY_SLUG[c.slug] : undefined;
                  return (
                    <th key={c.name} scope="col" className="px-3 py-3 text-left font-medium">
                      {covered && c.slug !== project.slug ? (
                        <Link href={`/projects/${c.slug}`} className="inline-flex items-center gap-2 text-fg hover:text-accent-strong">
                          <TokenLogo src={covered.logo} name={c.name} size={20} />
                          {c.name}
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-fg">
                          {covered ? <TokenLogo src={covered.logo} name={c.name} size={20} /> : null}
                          {c.name}
                          {i === 0 ? <span className="rounded bg-accent-soft px-1.5 text-[10.5px] text-accent-strong">{t.thisProject}</span> : null}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={
                  <tr>
                    <td colSpan={columns.length + 1} className="px-4 py-3 text-xs text-subtle">
                      {t.loading}
                    </td>
                  </tr>
                }
              >
                <LiveRow columns={columns} />
              </Suspense>
              {ROWS.map((row) => (
                <tr key={row.key} className="border-b border-line/70 align-top last:border-0">
                  <th scope="row" className="py-3 pl-4 pr-3 text-left text-[12px] font-medium text-muted">
                    {t.dimensions[row.key] ?? row.label}
                  </th>
                  {columns.map((c) => (
                    <td key={c.name} className="px-3 py-3 leading-relaxed text-fg-2">
                      {c[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-[12px] text-subtle">
        {t.qualitative} {note}
      </p>
    </div>
  );
}
