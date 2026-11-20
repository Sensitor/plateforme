"use client";

import { SECTOR_COLORS } from "@/lib/brand";
import { useMemo, useState } from "react";
import Link from "@/i18n/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useT } from "@/i18n/client";
import { ArrowDown, ArrowUp, ChevronRight, Scale, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatUsdCompact } from "@/lib/format";
import {
  DEFAULT_FILTERS,
  MCAP_BUCKETS,
  VOLUME_BUCKETS,
  activeFilterCount,
  filterRows,
  sortRows,
  type ExploreFilters,
  type ExploreRow,
  type SortDir,
  type SortKey,
} from "@/lib/explore";
import { CHAINS, MATURITY, RISK_LEVELS, SECTORS } from "@/lib/research/taxonomy";
import type { ChainId } from "@/lib/research/types";
import { useWatchlist } from "@/lib/watchlist/store";
import { Delta } from "@/components/ui/delta";
import { TokenLogo } from "@/components/ui/token-logo";
import { Sparkline } from "@/components/charts/sparkline";
import { WatchlistButton } from "@/components/watchlist-button";
import { EmptyState } from "@/components/ui/empty-state";
import { ScorePill, CoveragePill } from "@/components/research/pills";

const MAX_COMPARE = 4;

function readFilters(params: URLSearchParams): ExploreFilters {
  const get = (k: string) => params.get(k);
  return {
    ...DEFAULT_FILTERS,
    q: get("q") ?? "",
    sector: (get("sector") as ExploreFilters["sector"]) ?? "all",
    chain: (get("chain") as ExploreFilters["chain"]) ?? "all",
    mcap: (get("mcap") as ExploreFilters["mcap"]) ?? "all",
    volume: (get("volume") as ExploreFilters["volume"]) ?? "all",
    perf: (get("perf") as ExploreFilters["perf"]) ?? "all",
    risk: (get("risk") as ExploreFilters["risk"]) ?? "all",
    coverage: (get("coverage") as ExploreFilters["coverage"]) ?? "all",
    maturity: (get("maturity") as ExploreFilters["maturity"]) ?? "all",
    watchlistOnly: get("watchlist") === "1",
  };
}

function Select<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-wide text-subtle">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-9 rounded-lg border border-line bg-surface-2 px-2.5 text-[13px] text-fg focus:border-accent/60 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const COLUMNS: { key: SortKey; label: "price" | "24h" | "7d" | "marketCap" | "fdv" | "tvl" | "volume"; align: "left" | "right"; className?: string }[] = [
  { key: "price", label: "price", align: "right" },
  { key: "change24h", label: "24h", align: "right" },
  { key: "change7d", label: "7d", align: "right" },
  { key: "marketCap", label: "marketCap", align: "right" },
  { key: "fdv", label: "fdv", align: "right", className: "hidden md:table-cell" },
  { key: "tvl", label: "tvl", align: "right", className: "hidden md:table-cell" },
  { key: "volume24h", label: "volume", align: "right", className: "hidden 2xl:table-cell" },
];

const BUCKET_KEY = { mega: "mega", large: "large", mid: "mid", small: "small" } as const;
const VOLUME_KEY = { high: "volHigh", mid: "volMid", low: "volLow" } as const;

export function ProjectsExplorer({ rows, marketAvailable }: { rows: ExploreRow[]; marketAvailable: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(new URLSearchParams(searchParams.toString())), [searchParams]);
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: marketAvailable ? "marketCap" : "default", dir: "desc" });
  const [panelOpen, setPanelOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { slugs: watchlist } = useWatchlist();
  const dict = useT();
  const t = dict.explore;
  const columnLabel = (k: (typeof COLUMNS)[number]["label"]) => (k === "24h" || k === "7d" ? k : t.columns[k]);

  const update = (patch: Partial<ExploreFilters>) => {
    const next = { ...filters, ...patch };
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.sector !== "all") params.set("sector", next.sector);
    if (next.chain !== "all") params.set("chain", next.chain);
    if (next.mcap !== "all") params.set("mcap", next.mcap);
    if (next.volume !== "all") params.set("volume", next.volume);
    if (next.perf !== "all") params.set("perf", next.perf);
    if (next.risk !== "all") params.set("risk", next.risk);
    if (next.coverage !== "all") params.set("coverage", next.coverage);
    if (next.maturity !== "all") params.set("maturity", next.maturity);
    if (next.watchlistOnly) params.set("watchlist", "1");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const visible = useMemo(() => sortRows(filterRows(rows, filters, watchlist), sort.key, sort.dir), [rows, filters, watchlist, sort]);
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of rows) counts[r.sector] = (counts[r.sector] ?? 0) + 1;
    return counts;
  }, [rows]);
  const chainOptions = useMemo(() => {
    const set = new Set<ChainId>();
    rows.forEach((r) => r.chains.forEach((c) => set.add(c)));
    return [...set].sort((a, b) => CHAINS[a].label.localeCompare(CHAINS[b].label));
  }, [rows]);
  const extraFilters = activeFilterCount(filters);

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === "desc" ? "asc" : "desc" } : { key, dir: key === "name" ? "asc" : "desc" }));

  const toggleSelected = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : s.length >= MAX_COMPARE ? s : [...s, slug]));

  return (
    <div className="space-y-4">
      {/* Sector tabs */}
      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0" role="tablist" aria-label={t.sectorsAria}>
        <div className="flex w-max gap-x-5 gap-y-1 border-b border-line md:w-auto md:flex-wrap md:border-b-0">
          <button
            role="tab"
            aria-selected={filters.sector === "all"}
            onClick={() => update({ sector: "all" })}
            className={cn("-mb-px whitespace-nowrap border-b-2 pb-2 pt-1 text-[13px] transition-colors", filters.sector === "all" ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg-2")}
          >
            {t.all} <span className="num ml-1 text-subtle">{rows.length}</span>
          </button>
          {SECTORS.filter((s) => sectorCounts[s.id]).map((s) => {
            const active = filters.sector === s.id;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={active}
                onClick={() => update({ sector: active ? "all" : s.id })}
                title={dict.labels.sectors[s.id].description}
                className={cn("-mb-px inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 pb-2 pt-1 text-[13px] transition-colors", active ? "text-fg" : "border-transparent text-muted hover:text-fg-2")}
                style={active ? { borderColor: SECTOR_COLORS[s.id] } : undefined}
              >
                <span className="size-1.5 rounded-full" style={{ backgroundColor: SECTOR_COLORS[s.id] }} aria-hidden />
                {dict.labels.sectors[s.id].label} <span className="num text-subtle">{sectorCounts[s.id]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden />
          <input
            value={filters.q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder={t.filterPlaceholder}
            aria-label={t.filterAria}
            className="h-9 w-full rounded-lg border border-line bg-surface pl-9 pr-9 text-[13.5px] text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none"
          />
          {filters.q ? (
            <button onClick={() => update({ q: "" })} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-subtle hover:text-fg" aria-label={t.clearSearch}>
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPanelOpen((v) => !v)}
            aria-expanded={panelOpen}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-[13px] transition-colors",
              panelOpen || extraFilters ? "border-accent/50 bg-accent-soft text-fg" : "border-line-strong bg-surface-2 text-fg-2 hover:bg-surface-3",
            )}
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            {t.filters}
            {extraFilters ? <span className="num rounded bg-accent px-1.5 text-[11px] text-[#0d1020]">{extraFilters}</span> : null}
          </button>
          <button
            onClick={() => update({ watchlistOnly: !filters.watchlistOnly })}
            aria-pressed={filters.watchlistOnly}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-[13px] transition-colors",
              filters.watchlistOnly ? "border-accent/50 bg-accent-soft text-fg" : "border-line-strong bg-surface-2 text-fg-2 hover:bg-surface-3",
            )}
          >
            {t.watchlist}
          </button>
        </div>
      </div>

      {panelOpen ? (
        <div className="grid animate-fade-in grid-cols-2 gap-3 border-y border-line py-4 md:grid-cols-4 xl:grid-cols-7">
          <Select label={t.chain} value={filters.chain} onChange={(v) => update({ chain: v })} options={[{ value: "all", label: t.allChains }, ...chainOptions.map((c) => ({ value: c, label: CHAINS[c].label }))]} />
          <Select
            label={t.marketCap}
            value={filters.mcap}
            onChange={(v) => update({ mcap: v })}
            options={[{ value: "all", label: t.any }, ...Object.keys(MCAP_BUCKETS).map((k) => ({ value: k as ExploreFilters["mcap"], label: t.buckets[BUCKET_KEY[k as keyof typeof BUCKET_KEY]] }))]}
          />
          <Select
            label={t.volume}
            value={filters.volume}
            onChange={(v) => update({ volume: v })}
            options={[{ value: "all", label: t.any }, ...Object.keys(VOLUME_BUCKETS).map((k) => ({ value: k as ExploreFilters["volume"], label: t.buckets[VOLUME_KEY[k as keyof typeof VOLUME_KEY]] }))]}
          />
          <Select
            label={t.performance}
            value={filters.perf}
            onChange={(v) => update({ perf: v })}
            options={[
              { value: "all", label: t.any },
              { value: "up24h", label: t.perf.up24h },
              { value: "down24h", label: t.perf.down24h },
              { value: "up7d", label: t.perf.up7d },
              { value: "down7d", label: t.perf.down7d },
            ]}
          />
          <Select
            label={t.risk}
            value={filters.risk}
            onChange={(v) => update({ risk: v })}
            options={[{ value: "all", label: t.any }, ...Object.keys(RISK_LEVELS).map((k) => ({ value: k as ExploreFilters["risk"], label: dict.labels.riskLevels[k as keyof typeof RISK_LEVELS] }))]}
          />
          <Select
            label={t.maturity}
            value={filters.maturity}
            onChange={(v) => update({ maturity: v })}
            options={[{ value: "all", label: t.any }, ...Object.keys(MATURITY).map((k) => ({ value: k as ExploreFilters["maturity"], label: dict.labels.maturity[k as keyof typeof MATURITY] }))]}
          />
          <Select
            label={t.coverage}
            value={filters.coverage}
            onChange={(v) => update({ coverage: v })}
            options={[
              { value: "all", label: t.any },
              { value: "full", label: t.coverageOptions.full },
              { value: "partial", label: t.coverageOptions.partial },
              { value: "limited", label: t.coverageOptions.limited },
            ]}
          />
          {extraFilters ? (
            <div className="col-span-full flex justify-end">
              <button
                onClick={() => update({ ...DEFAULT_FILTERS, q: filters.q, sector: filters.sector })}
                className="text-[13px] text-accent hover:text-accent-strong"
              >
                {t.resetFilters}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Table */}
      <div>
        <div className="flex items-center justify-between pb-2.5 text-[12.5px] text-muted">
          <span>
            <span className="num text-fg">{visible.length}</span> {t.count(visible.length, rows.length)}
          </span>
          {selected.length > 0 ? (
            <span className="flex items-center gap-3">
              <span>{t.selected(selected.length)}</span>
              <button onClick={() => setSelected([])} className="text-subtle hover:text-fg">
                {t.clear}
              </button>
              <Link
                href={`/compare?p=${selected.join(",")}`}
                className={cn(
                  "inline-flex h-7 items-center gap-1.5 rounded-md bg-accent px-2.5 text-[12.5px] font-semibold text-[#0d1020]",
                  selected.length < 2 && "pointer-events-none opacity-50",
                )}
                aria-disabled={selected.length < 2}
              >
                <Scale className="size-3.5" aria-hidden /> {t.compare}
              </Link>
            </span>
          ) : (
            <span className="hidden sm:inline">{t.selectHint(MAX_COMPARE)}</span>
          )}
        </div>
        {visible.length === 0 ? (
          <EmptyState
            icon={<Search className="size-4" />}
            title={filters.watchlistOnly && watchlist.length === 0 ? t.emptyWatchlist : t.emptyFilters}
            description={filters.watchlistOnly && watchlist.length === 0 ? t.emptyWatchlistText : t.emptyFiltersText}
            action={
              <button onClick={() => update({ ...DEFAULT_FILTERS })} className="text-sm text-accent hover:text-accent-strong">
                {t.resetAll}
              </button>
            }
          />
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse border-y border-line text-sm">
              <thead>
                <tr className="border-b border-line text-[10.5px] uppercase tracking-[0.1em] text-subtle">
                  <th scope="col" className="w-9 py-2.5 pl-1 pr-1 text-left font-medium">
                    <span className="sr-only">{t.columns.select}</span>
                  </th>
                  <th scope="col" className="sticky left-0 z-10 bg-bg py-2.5 pr-3 text-left font-medium">
                    <SortButton label={t.columns.project} sortLabel={t.sortBy(t.columns.project)} active={sort.key === "name"} dir={sort.dir} onClick={() => toggleSort("name")} />
                  </th>
                  {COLUMNS.map((c) => (
                    <th key={c.key} scope="col" className={cn("whitespace-nowrap px-3 py-2.5 text-right font-medium", c.className)}>
                      <SortButton label={columnLabel(c.label)} sortLabel={t.sortBy(columnLabel(c.label))} active={sort.key === c.key} dir={sort.dir} onClick={() => toggleSort(c.key)} align="right" />
                    </th>
                  ))}
                  <th scope="col" className="hidden whitespace-nowrap px-3 py-2.5 text-left font-medium xl:table-cell">
                    {t.columns.sectorChain}
                  </th>
                  <th scope="col" className="px-3 py-2.5 text-right font-medium">
                    <SortButton label={t.columns.score} sortLabel={t.sortBy(t.columns.score)} active={sort.key === "score"} dir={sort.dir} onClick={() => toggleSort("score")} align="right" />
                  </th>
                  <th scope="col" className="hidden px-3 py-2.5 text-right font-medium min-[1700px]:table-cell">
                    {t.columns.trend}
                  </th>
                  <th scope="col" className="py-2.5 pl-2 pr-1">
                    <span className="sr-only">{t.columns.actions}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr
                    key={r.slug}
                    className="group cursor-pointer border-b border-line/60 transition-colors last:border-0 hover:bg-surface/70"
                    onClick={() => router.push(`/projects/${r.slug}`)}
                  >
                    <td className="py-2.5 pl-1 pr-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.includes(r.slug)}
                        onChange={() => toggleSelected(r.slug)}
                        disabled={!selected.includes(r.slug) && selected.length >= MAX_COMPARE}
                        aria-label={t.selectFor(r.name)}
                        className="size-3.5 accent-[#7896ff]"
                      />
                    </td>
                    <td className="sticky left-0 z-10 bg-bg py-2.5 pr-3 transition-colors group-hover:bg-surface">
                      <Link href={`/projects/${r.slug}`} className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                        <TokenLogo src={r.logo} name={r.name} size={26} />
                        <span className="min-w-0">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-[14px] font-medium text-fg group-hover:text-accent-strong">{r.name}</span>
                            <span className="num text-[11px] text-subtle">{r.ticker}</span>
                          </span>
                          <span className="hidden max-w-[210px] truncate text-[11.5px] text-muted sm:block">{r.oneLiner}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="num px-3 py-2.5 text-right text-fg">{formatPrice(r.price)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <Delta value={r.change24h} />
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <Delta value={r.change7d} />
                    </td>
                    <td className="num px-3 py-2.5 text-right text-fg-2">{formatUsdCompact(r.marketCap)}</td>
                    <td className="num hidden px-3 py-2.5 text-right text-fg-2 md:table-cell">{formatUsdCompact(r.fdv)}</td>
                    <td className="num hidden px-3 py-2.5 text-right text-fg-2 md:table-cell">{formatUsdCompact(r.tvl)}</td>
                    <td className="num hidden px-3 py-2.5 text-right text-fg-2 2xl:table-cell">{formatUsdCompact(r.volume24h)}</td>
                    <td className="hidden px-3 py-2.5 xl:table-cell">
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="inline-flex items-center gap-1.5 text-[12.5px] text-fg-2">
                          <span className="size-1.5 rounded-full" style={{ backgroundColor: SECTOR_COLORS[r.sector] }} aria-hidden />
                          {r.sectorLabel}
                        </span>
                        <span className="pl-3 text-[11.5px] text-muted">{r.chainLabel}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <ScorePill score={r.score} note={r.scoreNote} />
                    </td>
                    <td className="hidden px-3 py-2.5 text-right min-[1700px]:table-cell">
                      <Sparkline values={r.sparkline} width={88} height={26} className="ml-auto" />
                    </td>
                    <td className="py-2.5 pl-2 pr-1" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <WatchlistButton slug={r.slug} name={r.name} />
                        <Link
                          href={`/projects/${r.slug}`}
                          className="flex size-8 items-center justify-center rounded-lg text-subtle hover:bg-surface-3 hover:text-fg"
                          aria-label={t.open(r.name)}
                        >
                          <ChevronRight className="size-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-subtle">
        <span className="flex items-center gap-1.5">
          {t.coverageLegend} <CoveragePill level="full" /> <CoveragePill level="partial" />
        </span>
        <Link href="/research/methodology" className="text-accent hover:text-accent-strong">
          {t.howScores}
        </Link>
      </div>
    </div>
  );
}

function SortButton({ label, sortLabel, active, dir, onClick, align = "left" }: { label: string; sortLabel: string; active: boolean; dir: SortDir; onClick: () => void; align?: "left" | "right" }) {
  const Icon = dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <button
      onClick={onClick}
      className={cn("inline-flex items-center gap-1 uppercase tracking-wide hover:text-fg-2", active && "text-fg-2", align === "right" && "flex-row-reverse")}
      aria-label={sortLabel}
    >
      {label}
      <Icon className={cn("size-3", active ? "opacity-100" : "opacity-0")} aria-hidden />
    </button>
  );
}
