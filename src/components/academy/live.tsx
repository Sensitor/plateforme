import { connection } from "next/server";
import Link from "next/link";
import { KEY_DATES } from "@/content/key-dates";
import { PROJECTS, PROJECT_BY_SLUG } from "@/content/projects";
import { getCoverageQuotes, getCoverageTvl } from "@/lib/market/service";
import { formatPercent, formatUsdCompact } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { TokenLogo } from "@/components/ui/token-logo";

/** Live float ratio (market cap / FDV) across covered projects. */
export async function McapFdvTable({ color }: { color: string }) {
  await connection();
  const quotes = await getCoverageQuotes();
  const rows = PROJECTS.map((p) => {
    const q = quotes.data?.[p.slug];
    const ratio = q?.marketCap && q?.fdv ? Math.min(1, q.marketCap / q.fdv) : null;
    return { p, mcap: q?.marketCap ?? null, fdv: q?.fdv ?? null, ratio };
  })
    .filter((r) => r.ratio != null)
    .sort((a, b) => b.ratio! - a.ratio!);
  if (!rows.length) return <p className="text-[13px] text-muted">{quotes.note ?? "Market data is unavailable right now."}</p>;
  return (
    <div>
      <div className="relative overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[480px] text-left text-[12.5px]">
          <thead className="bg-bg-elevated text-[10.5px] uppercase tracking-[0.1em] text-subtle">
            <tr>
              <th scope="col" className="px-3.5 py-2.5 font-medium">Project</th>
              <th scope="col" className="px-3.5 py-2.5 text-right font-medium">Market cap</th>
              <th scope="col" className="px-3.5 py-2.5 text-right font-medium">FDV</th>
              <th scope="col" className="w-[38%] px-3.5 py-2.5 font-medium">Float ratio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map(({ p, mcap, fdv, ratio }) => (
              <tr key={p.slug}>
                <td className="px-3.5 py-2">
                  <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-2 text-fg hover:text-accent-strong">
                    <TokenLogo src={p.logo} name={p.name} size={18} /> {p.name}
                  </Link>
                </td>
                <td className="num px-3.5 py-2 text-right text-fg-2">{formatUsdCompact(mcap)}</td>
                <td className="num px-3.5 py-2 text-right text-fg-2">{formatUsdCompact(fdv)}</td>
                <td className="px-3.5 py-2">
                  <span className="flex items-center gap-2.5">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3" aria-hidden>
                      <span className="block h-full rounded-full" style={{ width: `${ratio! * 100}%`, backgroundColor: color }} />
                    </span>
                    <span className="num w-12 text-right text-fg">{formatPercent(ratio! * 100, { signed: false, digits: 0 })}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SourceTag result={quotes} className="mt-2" />
      <p className="mt-1 text-[11px] text-subtle">FDV as reported by the provider, computed from total supply created so far rather than maximum supply.</p>
    </div>
  );
}

export function McapFdvSkeleton() {
  return <Skeleton className="h-64 w-full rounded-xl" />;
}

const KIND = { unlock: "Unlock", halving: "Halving", "vesting-end": "Vesting end" } as const;

/** Supply schedules documented in the dossiers. */
export function KeyDatesTable() {
  return (
    <ul className="divide-y divide-line rounded-xl border border-line">
      {KEY_DATES.map((d) => {
        const p = PROJECT_BY_SLUG[d.slug];
        return (
          <li key={`${d.slug}-${d.title}`}>
            <Link href={`/projects/${d.slug}#tokenomics`} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-surface-2/50">
              <TokenLogo src={p?.logo} name={p?.name ?? d.slug} size={22} />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] text-fg">
                  {p?.name}: {d.title}
                </span>
                <span className="block text-[11.5px] text-muted">{d.when}</span>
              </span>
              <span className="text-[11px] text-subtle">{KIND[d.kind]}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Live TVL across covered projects, with market cap / TVL where both exist. */
export async function TvlTable({ color }: { color: string }) {
  await connection();
  const [tvl, quotes] = await Promise.all([getCoverageTvl(), getCoverageQuotes()]);
  const rows = PROJECTS.map((p) => ({ p, tvl: tvl.data?.[p.slug] ?? null, mcap: quotes.data?.[p.slug]?.marketCap ?? null, scope: p.data.llamaProtocol ? "Protocol" : "Chain" }))
    .filter((r) => r.tvl != null)
    .sort((a, b) => b.tvl! - a.tvl!);
  if (!rows.length) return <p className="text-[13px] text-muted">{tvl.note ?? "TVL data is unavailable right now."}</p>;
  const max = rows[0].tvl!;
  return (
    <div>
      <div className="relative overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[520px] text-left text-[12.5px]">
          <thead className="bg-bg-elevated text-[10.5px] uppercase tracking-[0.1em] text-subtle">
            <tr>
              <th scope="col" className="px-3.5 py-2.5 font-medium">Project</th>
              <th scope="col" className="px-3.5 py-2.5 font-medium">Scope</th>
              <th scope="col" className="w-[30%] px-3.5 py-2.5 font-medium">TVL</th>
              <th scope="col" className="px-3.5 py-2.5 text-right font-medium">Mkt cap / TVL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map(({ p, tvl: v, mcap, scope }) => (
              <tr key={p.slug}>
                <td className="px-3.5 py-2">
                  <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-2 text-fg hover:text-accent-strong">
                    <TokenLogo src={p.logo} name={p.name} size={18} /> {p.name}
                  </Link>
                </td>
                <td className="px-3.5 py-2 text-muted">{scope}</td>
                <td className="px-3.5 py-2">
                  <span className="flex items-center gap-2.5">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3" aria-hidden>
                      <span className="block h-full rounded-full" style={{ width: `${(v! / max) * 100}%`, backgroundColor: color }} />
                    </span>
                    <span className="num w-16 text-right text-fg">{formatUsdCompact(v)}</span>
                  </span>
                </td>
                <td className="num px-3.5 py-2 text-right text-fg-2">{mcap ? `${(mcap / v!).toFixed(2)}x` : "n/a"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4">
        <SourceTag result={tvl} label="TVL" />
        <SourceTag result={quotes} label="Market cap" />
      </div>
      <p className="mt-1 text-[11px] text-subtle">Protocol scope: assets deposited in the protocol. Chain scope: DeFi value locked on the chain, not the value of the chain&apos;s token.</p>
    </div>
  );
}
