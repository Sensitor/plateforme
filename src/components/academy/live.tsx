import { connection } from "next/server";
import Link from "next/link";
import { KEY_DATES } from "@/content/key-dates";
import { PROJECTS, PROJECT_BY_SLUG } from "@/content/projects";
import { getCoverageQuotes, getCoverageTvl, getFearGreed, getMarketRegime, getPriceHistory } from "@/lib/market/service";
import { formatPercent, formatUsdCompact } from "@/lib/format";
import { drawdownSeries } from "@/lib/market/series";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { TokenLogo } from "@/components/ui/token-logo";
import { ChartFrame } from "./visuals";

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

const shortDate = (t: number) => new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }).format(t);

/** Bitcoin's drawdown from its running peak, computed from price history. */
export async function BtcDrawdownChart() {
  await connection();
  const hist = await getPriceHistory("bitcoin", "ALL");
  const pts = hist.data ?? [];
  if (pts.length < 10) return <p className="text-[13px] text-muted">{hist.note ?? "Price history is unavailable right now."}</p>;
  const dd = drawdownSeries(pts);
  const worst = dd.reduce((a, b) => (b.v < a.v ? b : a));
  const current = dd[dd.length - 1];
  const t0 = dd[0].t;
  const t1 = current.t;
  const x = (t: number) => ((t - t0) / (t1 - t0)) * 1000;
  const H = 240;
  const y = (v: number) => (-v / 100) * H;
  const line = dd.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p.v).toFixed(1)}`).join("");
  const firstYear = new Date(t0).getUTCFullYear();
  const lastYear = new Date(t1).getUTCFullYear();
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i).filter((yr) => yr % 2 === 0 && Date.UTC(yr, 0, 1) >= t0);
  return (
    <div>
      <div className="mb-3 grid grid-cols-2 gap-4 sm:max-w-md">
        <div>
          <div className="text-[12px] text-muted">Current drawdown</div>
          <div className="num text-[18px] text-fg">{formatPercent(current.v, { digits: 1 })}</div>
        </div>
        <div>
          <div className="text-[12px] text-muted">Deepest in the period</div>
          <div className="num text-[18px] text-negative">{formatPercent(worst.v, { digits: 1 })}</div>
          <div className="text-[11.5px] text-subtle">{shortDate(worst.t)}</div>
        </div>
      </div>
      <ChartFrame height={200} yLeft={["0%", "-50%", "-100%"]} xLabels={years.map((yr) => ({ pct: (x(Date.UTC(yr, 0, 1)) / 1000) * 100, label: String(yr) }))}>
        <svg viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label="Bitcoin drawdown from its previous peak over time">
          <path d={`${line}L1000,0L0,0Z`} fill="rgba(227,107,117,0.18)" />
          <path d={line} fill="none" stroke="#E36B75" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
        </svg>
      </ChartFrame>
      <SourceTag result={hist} className="mt-2" label="Prices" />
      <p className="mt-1 text-[11px] text-subtle">Computed from two-week closes (plus the latest daily close), so short-lived intraperiod lows are not captured.</p>
    </div>
  );
}

/** Bitcoin versus its 200-day moving average over the last 200 days. */
export async function RegimeChart() {
  await connection();
  const regime = await getMarketRegime();
  const r = regime.data;
  if (!r || r.series.length < 10) return <p className="text-[13px] text-muted">{regime.note ?? "Trend data is unavailable right now."}</p>;
  const all = [...r.series, ...r.maSeries].map((p) => p.v);
  const min = Math.min(...all) * 0.97;
  const max = Math.max(...all) * 1.03;
  const t0 = r.series[0].t;
  const t1 = r.series[r.series.length - 1].t;
  const H = 240;
  const x = (t: number) => ((t - t0) / (t1 - t0)) * 1000;
  const y = (v: number) => H - ((v - min) / (max - min)) * H;
  const path = (s: { t: number; v: number }[]) => s.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p.v).toFixed(1)}`).join("");
  const months = r.series.filter((p, i) => i % 50 === 0).map((p) => ({ pct: (x(p.t) / 1000) * 100, label: shortDate(p.t) }));
  const above = r.regime === "above-200d";
  return (
    <div>
      <p className="mb-3 text-[14px] text-fg">
        Bitcoin trades <span className={above ? "num text-positive" : "num text-negative"}>{formatPercent(Math.abs(r.distancePct), { signed: false, digits: 1 })}</span> {above ? "above" : "below"} its
        200-day moving average.
      </p>
      <ChartFrame height={200} yLeft={[formatUsdCompact(max), formatUsdCompact((max + min) / 2), formatUsdCompact(min)]} xLabels={months}>
        <svg viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label="Bitcoin price and its 200-day moving average">
          <path d={path(r.maSeries)} fill="none" stroke="#9299A8" strokeWidth={1.5} strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
          <path d={path(r.series)} fill="none" stroke="#F7931A" strokeWidth={1.75} vectorEffect="non-scaling-stroke" />
        </svg>
      </ChartFrame>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4 bg-[#F7931A]" aria-hidden /> BTC price
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4 border-t border-dashed border-[#9299A8]" aria-hidden /> 200-day moving average
        </span>
      </div>
      <SourceTag result={regime} className="mt-2" label="Prices" />
    </div>
  );
}

const FNG_ZONES = [
  { max: 24, label: "Extreme fear (0-24)", color: "#E36B75" },
  { max: 49, label: "Fear (25-49)", color: "#F08A4B" },
  { max: 74, label: "Greed (50-74)", color: "#B5D65A" },
  { max: 100, label: "Extreme greed (75-100)", color: "#45B997" },
];
const fngColor = (v: number) => FNG_ZONES.find((z) => v <= z.max)!.color;

/** The Crypto Fear & Greed Index over the last 90 days. */
export async function FearGreedHistory() {
  await connection();
  const fng = await getFearGreed();
  const pts = [...(fng.data ?? [])].reverse();
  if (!pts.length) return <p className="text-[13px] text-muted">{fng.note ?? "The index is unavailable right now."}</p>;
  const now = pts[pts.length - 1];
  const weekAgo = pts[pts.length - 8];
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-end gap-x-6 gap-y-2">
        <div>
          <div className="text-[12px] text-muted">Today</div>
          <div className="num text-[26px] leading-none" style={{ color: fngColor(now.value) }}>
            {now.value}
          </div>
          <div className="mt-1 text-[12.5px] text-fg-2">{now.classification}</div>
        </div>
        {weekAgo ? (
          <div>
            <div className="text-[12px] text-muted">A week ago</div>
            <div className="num text-[16px] text-fg-2">
              {weekAgo.value} <span className="text-[12px] text-subtle">({weekAgo.classification})</span>
            </div>
          </div>
        ) : null}
      </div>
      <ChartFrame height={160} yLeft={["100", "50", "0"]} xLabels={[0, Math.floor(pts.length / 2), pts.length - 1].map((i) => ({ pct: (i / Math.max(1, pts.length - 1)) * 100, label: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(pts[i].t) }))}>
        <div className="absolute inset-0 flex items-end gap-px px-px" role="img" aria-label={`Fear and Greed Index over ${pts.length} days, today ${now.value}`}>
          {pts.map((p) => (
            <span key={p.t} className="flex-1 rounded-t-[1px]" style={{ height: `${p.value}%`, backgroundColor: fngColor(p.value), opacity: 0.85 }} />
          ))}
        </div>
      </ChartFrame>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-muted">
        {FNG_ZONES.map((z) => (
          <span key={z.label} className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-sm" style={{ backgroundColor: z.color }} aria-hidden /> {z.label}
          </span>
        ))}
      </div>
      <SourceTag result={fng} className="mt-2" />
    </div>
  );
}
