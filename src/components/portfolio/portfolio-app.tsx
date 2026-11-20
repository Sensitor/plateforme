"use client";

import { useMemo, useState } from "react";
import Link from "@/i18n/link";
import { ArrowUpRight, Download, Eye, FileUp, Plus, ShieldCheck, Sparkles, Trash2, WalletMinimal } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber, formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import { SECTOR_COLORS, tint } from "@/lib/brand";
import { computePositions, holdingsAt, returnCorrelation, STABLE_ASSET, toCsv, type Transaction } from "@/lib/portfolio/engine";
import { buildInsights, type HoldingView } from "@/lib/portfolio/insights";
import { usePortfolio } from "@/lib/portfolio/store";
import type { ChartRange, SeriesPoint } from "@/lib/market/types";
import { Stat, StatStrip } from "@/components/ui/stat-strip";
import { SectionHeader } from "@/components/overview/section-header";
import { Delta } from "@/components/ui/delta";
import { TokenLogo } from "@/components/ui/token-logo";
import { Skeleton } from "@/components/ui/skeleton";
import { Donut } from "@/components/charts/donut";
import { BarList } from "@/components/charts/bar-list";
import { MultiLineChart } from "@/components/charts/multi-line-chart";
import { CATEGORICAL } from "@/components/charts/palette";
import { StorageNote, useStorageWord } from "@/components/storage-note";
import { ImportDialog, TransactionDialog } from "./dialogs";
import { fetchHistories, useHistories } from "./use-histories";
import type { AssetMeta } from "./types";
import { useT } from "@/i18n/client";

const DAY = 86400_000;
const dayKey = (t: number) => new Date(t).toISOString().slice(0, 10);

/** Example portfolio: positions bought at the real historical price of each date. */
const EXAMPLE = [
  { asset: "bitcoin", date: "2026-03-02", side: "buy" as const, quantity: 0.2 },
  { asset: "ethereum", date: "2026-03-02", side: "buy" as const, quantity: 3 },
  { asset: "solana", date: "2026-05-04", side: "buy" as const, quantity: 40 },
  { asset: "chainlink", date: "2026-06-01", side: "buy" as const, quantity: 250 },
  { asset: "aave", date: "2026-07-01", side: "buy" as const, quantity: 6 },
  { asset: "arbitrum", date: "2026-04-01", side: "buy" as const, quantity: 4000 },
  { asset: "ethereum", date: "2026-08-03", side: "sell" as const, quantity: 1 },
];

export function PortfolioApp({ assets, today, quoteSource }: { assets: AssetMeta[]; today: string; quoteSource: React.ReactNode }) {
  const dict = useT();
  const t = dict.portfolio;
  const { transactions, example, ready, add, remove, clear, setExample } = usePortfolio();
  const storageWord = useStorageWord();
  const [dialog, setDialog] = useState<"add" | "import" | null>(null);
  const [range, setRange] = useState<ChartRange>("3M");
  const [loadingExample, setLoadingExample] = useState(false);
  const [exampleError, setExampleError] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [showLedger, setShowLedger] = useState(false);

  const meta = useMemo(() => new Map(assets.map((a) => [a.slug, a])), [assets]);
  const names = useMemo(() => Object.fromEntries(assets.map((a) => [a.slug, a.name])), [assets]);
  const { positions, issues } = useMemo(() => computePositions(transactions, t.engine), [transactions, t.engine]);

  const rows = useMemo(() => {
    const list = [...positions.values()]
      .filter((p) => p.quantity > 0)
      .map((p) => {
        const m = meta.get(p.asset);
        const price = p.asset === STABLE_ASSET ? 1 : (m?.price ?? null);
        const value = price != null ? p.quantity * price : null;
        const unrealized = value != null ? value - p.costBasis : null;
        const change24hValue = value != null && m?.change24h != null && p.asset !== STABLE_ASSET ? value - value / (1 + m.change24h / 100) : 0;
        return { ...p, meta: m, price, value, unrealized, change24hValue };
      });
    const total = list.reduce((s, r) => s + (r.value ?? 0), 0);
    return list.map((r) => ({ ...r, weight: total ? (r.value ?? 0) / total : 0 })).sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  }, [positions, meta]);

  const totals = useMemo(() => {
    const value = rows.reduce((s, r) => s + (r.value ?? 0), 0);
    const cost = rows.reduce((s, r) => s + r.costBasis, 0);
    const realized = [...positions.values()].reduce((s, p) => s + p.realizedPnl, 0);
    const change24h = rows.reduce((s, r) => s + r.change24hValue, 0);
    const missingPrice = rows.some((r) => r.value == null);
    return { value, cost, unrealized: value - cost, realized, change24h, change24hPct: value ? (change24h / (value - change24h)) * 100 : null, missingPrice };
  }, [rows, positions]);

  const heldSlugs = useMemo(() => rows.filter((r) => r.asset !== STABLE_ASSET).map((r) => r.asset), [rows]);
  const historyRange: ChartRange = range;
  const { data: histories, isLoading: historiesLoading } = useHistories(heldSlugs.length ? [...new Set([...heldSlugs, ...transactions.filter((t) => t.asset !== STABLE_ASSET).map((t) => t.asset)])] : [], historyRange);

  const performance = useMemo(() => buildPerformance(transactions, histories ?? null), [transactions, histories]);

  const insights = useMemo(() => {
    const holdings: HoldingView[] = rows
      .filter((r) => r.value != null)
      .map((r) => ({
        asset: r.asset,
        name: r.meta?.name ?? r.asset,
        value: r.value!,
        sectorLabel: r.meta?.sectorLabel ?? (r.asset === STABLE_ASSET ? t.stablecoins : null),
        ecosystem: r.meta?.ecosystem ?? null,
        riskLevel: r.meta?.riskLevel ?? null,
        volume24h: r.meta?.volume24h ?? null,
      }));
    return buildInsights(holdings, names, dict);
  }, [rows, names, dict, t.stablecoins]);

  const correlations = useMemo(() => {
    if (!histories) return null;
    const slugs = heldSlugs.slice(0, 8).filter((s) => histories[s]?.length);
    if (slugs.length < 2) return null;
    const matrix = slugs.map((a) => slugs.map((b) => (a === b ? 1 : returnCorrelation(histories[a]!, histories[b]!))));
    const pairs: number[] = [];
    matrix.forEach((row, i) => row.forEach((v, j) => j > i && v != null && pairs.push(v)));
    return { slugs, matrix, average: pairs.length ? pairs.reduce((s, v) => s + v, 0) / pairs.length : null };
  }, [histories, heldSlugs]);

  async function loadExample() {
    setLoadingExample(true);
    setExampleError(null);
    try {
      const slugs = [...new Set(EXAMPLE.map((e) => e.asset))];
      const hist = await fetchHistories(slugs, "1Y");
      const priceOn = (slug: string, date: string) => {
        const series = hist[slug];
        if (!series?.length) return null;
        const target = Date.parse(date);
        return series.reduce((best, p) => (Math.abs(p.t - target) < Math.abs(best.t - target) ? p : best)).v;
      };
      const txs = EXAMPLE.map((e) => ({ ...e, price: priceOn(e.asset, e.date), fee: 0 }));
      if (txs.some((t) => t.price == null)) throw new Error("missing price");
      setExample([...txs.map((t) => ({ ...t, price: Math.round(t.price! * 100) / 100 })), { asset: STABLE_ASSET, date: "2026-03-02", side: "buy", quantity: 1500, price: 1, fee: 0 }]);
    } catch {
      setExampleError(t.exampleError);
    } finally {
      setLoadingExample(false);
    }
  }

  function exportCsv() {
    const csv = toCsv(transactions, (a) => (a === STABLE_ASSET ? "USD" : (meta.get(a)?.ticker ?? a)));
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const el = document.createElement("a");
    el.href = url;
    el.download = `sensitor-portfolio-${today}.csv`;
    el.click();
    URL.revokeObjectURL(url);
  }

  const principles = (
    <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
      <StorageNote />
      <span className="inline-flex items-center gap-1.5">
        <Eye className="size-3.5 text-positive" aria-hidden /> {t.principles.readOnly}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ShieldCheck className="size-3.5 text-positive" aria-hidden /> {t.principles.noSeed}
      </span>
    </div>
  );

  if (!ready) return <Skeleton className="h-96 w-full rounded-2xl" />;

  const dialogs = (
    <>
      {dialog === "add" ? <TransactionDialog assets={assets} today={today} onClose={() => setDialog(null)} onSubmit={(t) => add([t])} /> : null}
      {dialog === "import" ? <ImportDialog assets={assets} onClose={() => setDialog(null)} onImport={(r) => add(r)} /> : null}
    </>
  );

  if (!transactions.length) {
    return (
      <div className="space-y-5">
        {principles}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-12 text-center md:px-12">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <WalletMinimal className="size-6" aria-hidden />
          </span>
          <h2 className="serif-display mt-5 text-[34px] leading-tight text-fg">{t.empty.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-relaxed text-muted">{t.empty.text}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button onClick={() => setDialog("add")} className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-[15px] font-semibold text-[#0d1020] hover:bg-accent-strong">
              <Plus className="size-4" aria-hidden /> {t.empty.add}
            </button>
            <button onClick={() => setDialog("import")} className="inline-flex h-11 items-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-5 text-[15px] text-fg hover:bg-surface-3">
              <FileUp className="size-4" aria-hidden /> {t.empty.import}
            </button>
            <button onClick={loadExample} disabled={loadingExample} className="inline-flex h-11 items-center gap-2 rounded-lg px-5 text-[15px] text-accent hover:bg-accent-soft disabled:opacity-50">
              <Sparkles className="size-4" aria-hidden /> {loadingExample ? t.empty.loading : t.empty.example}
            </button>
          </div>
          {exampleError ? <p className="mt-4 text-[13px] text-negative">{exampleError}</p> : null}
        </div>
        {dialogs}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {principles}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setDialog("add")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-3.5 text-[13.5px] font-semibold text-[#0d1020] hover:bg-accent-strong">
            <Plus className="size-4" aria-hidden /> {t.actions.add}
          </button>
          <button onClick={() => setDialog("import")} className="inline-flex h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-3.5 text-[13.5px] text-fg hover:bg-surface-3">
            <FileUp className="size-4" aria-hidden /> {t.actions.import}
          </button>
          <button onClick={exportCsv} className="inline-flex h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-3.5 text-[13.5px] text-fg hover:bg-surface-3">
            <Download className="size-4" aria-hidden /> {t.actions.export}
          </button>
          {confirmClear ? (
            <span className="inline-flex items-center gap-2 text-[13px]">
              <span className="text-muted">{t.actions.confirm}</span>
              <button onClick={() => setConfirmClear(false)} className="h-9 rounded-lg px-3 text-fg-2 hover:bg-surface-2">
                {t.actions.cancel}
              </button>
              <button
                onClick={() => {
                  clear();
                  setConfirmClear(false);
                }}
                className="h-9 rounded-lg border border-negative/40 px-3 text-negative hover:bg-negative-soft"
              >
                {t.actions.delete}
              </button>
            </span>
          ) : (
            <button onClick={() => setConfirmClear(true)} className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-[13.5px] text-muted hover:bg-surface-2 hover:text-negative">
              <Trash2 className="size-4" aria-hidden /> {t.actions.clear}
            </button>
          )}
        </div>
      </div>

      {example ? (
        <div className="flex flex-col gap-2 rounded-xl border border-violet/30 bg-violet-soft px-4 py-2.5 text-[13px] text-fg-2 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <strong className="text-violet">{t.exampleBanner.lead}</strong> {t.exampleBanner.text}
          </span>
          <button onClick={clear} className="shrink-0 text-violet underline-offset-2 hover:underline">
            {t.exampleBanner.remove}
          </button>
        </div>
      ) : null}

      {issues.length ? (
        <div className="rounded-xl border border-warning/30 bg-warning-soft px-4 py-2.5 text-[13px] text-warning" role="status">
          {issues.map((i) => (
            <div key={i.id}>{i.message}</div>
          ))}
        </div>
      ) : null}

      {/* Summary */}
      <div>
        <StatStrip columns={5}>
          <Stat label={t.stats.value} value={formatPrice(totals.value)}>
            <Delta value={totals.change24hPct} className="text-[12.5px]" /> 24h
          </Stat>
          <Stat label={t.stats.unrealized} value={<span className={pnlClass(totals.unrealized)}>{signedUsd(totals.unrealized)}</span>}>
            <span className={pnlClass(totals.unrealized)}>{totals.cost ? formatPercent((totals.unrealized / totals.cost) * 100) : "n/a"}</span>
          </Stat>
          <Stat label={t.stats.realized} value={<span className={pnlClass(totals.realized)}>{signedUsd(totals.realized)}</span>}>
            {t.stats.fromSales}
          </Stat>
          <Stat label={t.stats.cost} value={formatPrice(totals.cost)}>
            {t.stats.method}
          </Stat>
          <Stat label={t.stats.positions} value={formatNumber(rows.length)}>
            {t.stats.transactions(transactions.length)}
          </Stat>
        </StatStrip>
        <div className="mt-2 flex justify-end">{quoteSource}</div>
      </div>

      {/* Holdings */}
      <Panel title={t.holdings.title} subtitle={t.holdings.subtitle}>
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[780px] border-y border-line text-[13.5px]">
              <thead>
                <tr className="border-b border-line text-left text-[10.5px] uppercase tracking-[0.1em] text-subtle">
                  <th scope="col" className="py-2.5 font-medium">{t.holdings.asset}</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.holdings.quantity}</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.holdings.avgCost}</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.holdings.price}</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.holdings.value}</th>
                  <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.holdings.unrealized}</th>
                  <th scope="col" className="py-2.5 pl-3 font-medium">{t.holdings.weight}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.asset} className="border-b border-line/60 last:border-0">
                    <td className="py-2.5">
                      {r.asset === STABLE_ASSET ? (
                        <span className="flex items-center gap-3">
                          <span className="flex size-7 items-center justify-center rounded-full bg-positive-soft text-[11px] font-semibold text-positive">$</span>
                          <span className="font-medium text-fg">{t.stablecoins}</span>
                        </span>
                      ) : (
                        <Link href={`/projects/${r.asset}`} className="flex items-center gap-3 hover:text-accent-strong">
                          <TokenLogo src={r.meta?.logo} name={r.meta?.name ?? r.asset} size={28} />
                          <span>
                            <span className="block font-medium text-fg">{r.meta?.name}</span>
                            <span className="block text-xs text-subtle">{r.meta?.ticker}</span>
                          </span>
                        </Link>
                      )}
                    </td>
                    <td className="num px-3 py-2.5 text-right text-fg-2">{formatNumber(r.quantity, 6)}</td>
                    <td className="num px-3 py-2.5 text-right text-fg-2">{formatPrice(r.avgCost)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="num text-fg">{formatPrice(r.price)}</div>
                      {r.asset !== STABLE_ASSET ? <Delta value={r.meta?.change24h} className="text-[11.5px]" /> : null}
                    </td>
                    <td className="num px-3 py-2.5 text-right text-fg">{formatPrice(r.value)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <div className={cn("num", pnlClass(r.unrealized))}>{r.unrealized != null ? signedUsd(r.unrealized) : "n/a"}</div>
                      <div className={cn("num text-[11.5px]", pnlClass(r.unrealized))}>{r.unrealized != null && r.costBasis ? formatPercent((r.unrealized / r.costBasis) * 100) : ""}</div>
                    </td>
                    <td className="py-2.5 pl-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-3">
                          <div className="h-full rounded-full" style={{ width: `${Math.max(2, r.weight * 100)}%`, backgroundColor: CATEGORICAL[Math.min(i, 6)] }} />
                        </div>
                        <span className="num text-[12px] text-fg-2">{formatPercent(r.weight * 100, { signed: false, digits: 1 })}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </Panel>

      {/* Performance + allocation */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:items-start">
        <Panel
            title={t.performance.title}
            subtitle={t.performance.subtitle}
            action={
              <div className="flex gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5" role="tablist" aria-label={t.performance.range}>
                {(["1M", "3M", "1Y"] as ChartRange[]).map((r) => (
                  <button key={r} role="tab" aria-selected={r === range} onClick={() => setRange(r)} className={cn("num rounded-md px-2.5 py-1 text-[12px]", r === range ? "bg-accent text-[#0d1020]" : "text-muted hover:text-fg")}>
                    {r}
                  </button>
                ))}
              </div>
            }
          >
          <div>
            {performance && performance.value.length > 2 ? (
              <MultiLineChart
                label={t.performance.chartLabel}
                format={(v) => formatUsdCompact(v)}
                height={260}
                series={[
                  { key: "value", label: t.performance.value, color: CATEGORICAL[0], data: performance.value },
                  { key: "cost", label: t.performance.cost, color: CATEGORICAL[5], data: performance.cost, dashed: true },
                ]}
              />
            ) : historiesLoading ? (
              <Skeleton className="h-[260px] w-full rounded-lg" />
            ) : (
              <p className="flex h-[200px] items-center justify-center text-center text-[13px] text-muted">{t.performance.empty}</p>
            )}
            <p className="mt-2 text-[11px] text-subtle">{t.performance.note}</p>
          </div>
        </Panel>

        <Panel title={t.allocation.title} subtitle={t.allocation.subtitle}>
          <div className="space-y-6">
            <Donut
              data={(() => {
                const top = rows.slice(0, 6).map((r) => ({ label: r.asset === STABLE_ASSET ? t.stablecoins : (r.meta?.name ?? r.asset), value: Math.round(r.weight * 10000) / 100 }));
                const other = rows.slice(6).reduce((s, r) => s + r.weight, 0);
                return other > 0 ? [...top, { label: t.other, value: Math.round(other * 10000) / 100 }] : top;
              })()}
              centerValue={formatUsdCompact(totals.value)}
              centerLabel="total"
            />
            <Breakdown title={t.allocation.sector} rows={rows} keyOf={(r) => (r.asset === STABLE_ASSET ? t.stablecoinsCash : (r.meta?.sectorLabel ?? t.other))} colorOf={(r) => (r.meta?.sector ? SECTOR_COLORS[r.meta.sector] : "#5FCB86")} />
            <Breakdown title={t.allocation.chain} rows={rows} keyOf={(r) => (r.asset === STABLE_ASSET ? t.stablecoinsCash : (r.meta?.chainLabel ?? t.other))} />
          </div>
        </Panel>
      </div>

      {/* Intelligence */}
      <section aria-labelledby="intel-title">
        <SectionHeader id="intel-title" title={t.intel.title} />
        <p className="-mt-2 mb-5 text-[13px] text-muted">{t.intel.intro}</p>
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] xl:items-start">
          <ul className="divide-y divide-line border-y border-line">
            {insights.map((ins) => (
              <li key={ins.id} className="py-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-[10.5px] font-semibold uppercase tracking-[0.12em]", ins.tone === "watch" ? "text-warning" : "text-accent-strong")}>{ins.tone === "watch" ? t.intel.watch : t.intel.note}</span>
                      <span className="text-[14px] font-medium text-fg">{ins.title}</span>
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{ins.detail}</p>
                  </div>
                  {ins.concept ? (
                    <Link href={`/academy/concepts/${ins.concept}`} className="inline-flex shrink-0 items-center gap-1 text-[12px] text-accent hover:text-accent-strong">
                      {t.intel.learn} <ArrowUpRight className="size-3" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
            {correlations?.average != null ? (
              <li className="py-3.5">
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10.5px] font-semibold uppercase tracking-[0.12em]", correlations.average > 0.7 ? "text-warning" : "text-accent-strong")}>{correlations.average > 0.7 ? t.intel.watch : t.intel.note}</span>
                  <span className="text-[14px] font-medium text-fg">{t.intel.avgCorrelation(correlations.average.toFixed(2))}</span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">
                  {correlations.average > 0.7 ? t.intel.highCorrelation : t.intel.lowCorrelation} {t.intel.basedOn(range)}
                </p>
              </li>
            ) : null}
          </ul>
          <Panel title={t.intel.matrix} subtitle={t.intel.matrixSubtitle(range)} className="xl:border-t-0 xl:pt-0">
            {correlations ? <CorrelationMatrix data={correlations} meta={meta} /> : <p className="text-[13px] text-muted">{historiesLoading ? t.intel.loadingHistory : t.intel.needsTwo}</p>}
          </Panel>
        </div>
      </section>

      {/* Ledger */}
      <Panel
          title={t.ledger.title}
          subtitle={t.ledger.subtitle(transactions.length, storageWord)}
          action={
            <button onClick={() => setShowLedger((v) => !v)} className="text-[12.5px] text-accent hover:text-accent-strong">
              {showLedger ? t.ledger.hide : t.ledger.show}
            </button>
          }
        >
        {showLedger ? (
          <div>
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[640px] border-y border-line text-[13px]">
                <thead>
                  <tr className="border-b border-line text-left text-[10.5px] uppercase tracking-[0.1em] text-subtle">
                    <th scope="col" className="py-2.5 font-medium">{t.ledger.date}</th>
                    <th scope="col" className="px-3 py-2.5 font-medium">{t.ledger.asset}</th>
                    <th scope="col" className="px-3 py-2.5 font-medium">{t.ledger.side}</th>
                    <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.ledger.quantity}</th>
                    <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.ledger.price}</th>
                    <th scope="col" className="px-3 py-2.5 text-right font-medium">{t.ledger.fee}</th>
                    <th scope="col" className="py-2.5"><span className="sr-only">{t.ledger.delete}</span></th>
                  </tr>
                </thead>
                <tbody>
                  {[...transactions].sort((a, b) => b.date.localeCompare(a.date)).map((tx) => (
                    <tr key={tx.id} className="border-b border-line/60 last:border-0">
                      <td className="num py-2.5 text-fg-2">{tx.date}</td>
                      <td className="px-3 py-2.5 text-fg">{tx.asset === STABLE_ASSET ? t.stablecoins : (meta.get(tx.asset)?.name ?? tx.asset)}</td>
                      <td className={cn("px-3 py-2.5 capitalize", tx.side === "buy" ? "text-positive" : "text-negative")}>{t.ledger.sides[tx.side]}</td>
                      <td className="num px-3 py-2.5 text-right text-fg-2">{formatNumber(tx.quantity, 6)}</td>
                      <td className="num px-3 py-2.5 text-right text-fg-2">{formatPrice(tx.price)}</td>
                      <td className="num px-3 py-2.5 text-right text-fg-2">{formatPrice(tx.fee)}</td>
                      <td className="py-2.5 text-right">
                        <button onClick={() => remove(tx.id)} className="inline-flex size-7 items-center justify-center rounded-lg text-subtle hover:bg-surface-3 hover:text-negative" aria-label={t.ledger.deleteAria}>
                          <Trash2 className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </Panel>
      {dialogs}
    </div>
  );
}

/** Section of the portfolio dashboard: hairline rule, serif title, optional action. */
function Panel({ title, subtitle, action, className, children }: { title: string; subtitle?: string; action?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("border-t border-line pt-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="serif-display text-[24px] leading-tight text-fg">{title}</h2>
          {subtitle ? <p className="mt-1 text-[12.5px] text-muted">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

type Row = { asset: string; weight: number; meta?: AssetMeta };

function Breakdown({ title, rows, keyOf, colorOf }: { title: string; rows: Row[]; keyOf: (r: Row) => string; colorOf?: (r: Row) => string }) {
  const map = new Map<string, { value: number; color?: string }>();
  for (const r of rows) {
    const k = keyOf(r);
    const cur = map.get(k);
    map.set(k, { value: (cur?.value ?? 0) + r.weight * 100, color: cur?.color ?? colorOf?.(r) });
  }
  const items = [...map.entries()].sort((a, b) => b[1].value - a[1].value);
  return (
    <div>
      <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{title}</h3>
      <BarList
        format={(v) => formatPercent(v, { signed: false, digits: 1 })}
        items={items.map(([k, v]) => ({
          key: k,
          label: (
            <span className="inline-flex items-center gap-2">
              {v.color ? <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: v.color }} aria-hidden /> : null}
              {k}
            </span>
          ),
          value: v.value,
        }))}
      />
    </div>
  );
}

function CorrelationMatrix({ data, meta }: { data: { slugs: string[]; matrix: (number | null)[][] }; meta: Map<string, AssetMeta> }) {
  const legend = useT().portfolio.intel.legend;
  const cell = (v: number | null) => {
    if (v == null) return { bg: "var(--surface-2)", fg: "var(--subtle)" };
    // Diverging: cool for negative, neutral grey near zero, warm for strongly positive
    const a = Math.min(1, Math.abs(v));
    return v >= 0 ? { bg: tint("#F08A4B", 0.08 + a * 0.5), fg: "var(--fg)" } : { bg: tint("#56B8F0", 0.08 + a * 0.5), fg: "var(--fg)" };
  };
  return (
    <div className="relative overflow-x-auto">
      <table className="text-[11.5px]">
        <thead>
          <tr>
            <th />
            {data.slugs.map((s) => (
              <th key={s} scope="col" className="px-1 pb-1.5 text-center font-medium text-muted">
                {meta.get(s)?.ticker}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slugs.map((a, i) => (
            <tr key={a}>
              <th scope="row" className="pr-2 text-right font-medium text-muted">
                {meta.get(a)?.ticker}
              </th>
              {data.matrix[i].map((v, j) => {
                const c = cell(v);
                return (
                  <td key={j} className="p-0.5">
                    <span className="num flex h-9 w-12 items-center justify-center rounded-md" style={{ backgroundColor: c.bg, color: c.fg }} title={`${meta.get(a)?.ticker} / ${meta.get(data.slugs[j])?.ticker}`}>
                      {v == null ? "n/a" : v.toFixed(2)}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-[11px] leading-relaxed text-subtle">{legend}</p>
    </div>
  );
}

const pnlClass = (v: number | null | undefined) => (v == null || Math.abs(v) < 0.005 ? "text-fg-2" : v > 0 ? "text-positive" : "text-negative");
const signedUsd = (v: number) => `${v > 0 ? "+" : v < 0 ? "-" : ""}${formatPrice(Math.abs(v))}`;

/** Daily portfolio value and cost basis from the ledger and price histories. */
function buildPerformance(transactions: Transaction[], histories: Record<string, SeriesPoint[] | null> | null) {
  if (!histories || !transactions.length) return null;
  const priceMaps = new Map<string, Map<string, number>>();
  let timeline: number[] = [];
  for (const [slug, series] of Object.entries(histories)) {
    if (!series?.length) continue;
    priceMaps.set(slug, new Map(series.map((p) => [dayKey(p.t), p.v])));
    if (series.length > timeline.length) timeline = series.map((p) => p.t);
  }
  if (!timeline.length) return null;
  const first = [...transactions].sort((a, b) => a.date.localeCompare(b.date))[0].date;
  const lastPrice = new Map<string, number>();
  const value: SeriesPoint[] = [];
  const cost: SeriesPoint[] = [];
  for (const t of timeline) {
    const d = dayKey(t);
    for (const [slug, m] of priceMaps) {
      const p = m.get(d);
      if (p != null) lastPrice.set(slug, p);
    }
    if (d < first) continue;
    const held = holdingsAt(transactions, d);
    let v = 0;
    let complete = true;
    for (const [asset, qty] of held) {
      if (!qty) continue;
      if (asset === STABLE_ASSET) v += qty;
      else {
        const p = lastPrice.get(asset);
        if (p == null) complete = false;
        else v += qty * p;
      }
    }
    if (!complete) continue;
    const { positions } = computePositions(transactions.filter((x) => x.date <= d));
    value.push({ t: t - (t % DAY), v });
    cost.push({ t: t - (t % DAY), v: [...positions.values()].reduce((s, p) => s + p.costBasis, 0) });
  }
  return { value, cost };
}
