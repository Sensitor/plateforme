"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { formatPrice, formatUsdCompact } from "@/lib/format";
import { seriesChange } from "@/lib/market/series";
import { CHART_RANGES, type ChartRange, type DataResult, type SeriesPoint } from "@/lib/market/types";
import { AreaChart } from "./area-chart";
import { Delta } from "@/components/ui/delta";
import { SourceTag } from "@/components/ui/source-tag";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json() as Promise<DataResult<SeriesPoint[]>>;
  });

export interface ChartAsset {
  key: string;
  label: string;
  format: "price" | "usd-compact";
}

/**
 * Interactive history chart with range selector (1D → ALL). Data comes from
 * /api/history which proxies cached provider calls.
 */
export function PriceChartCard({
  assets,
  initialAsset,
  initialRange = "1Y",
  initialData,
  height = 240,
  title,
  headline,
}: {
  assets: ChartAsset[];
  initialAsset?: string;
  initialRange?: ChartRange;
  initialData?: DataResult<SeriesPoint[]>;
  height?: number;
  title?: string;
  headline?: React.ReactNode;
}) {
  const [asset, setAsset] = useState(initialAsset ?? assets[0].key);
  const [range, setRange] = useState<ChartRange>(initialRange);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- loading dim only after hydration
  useEffect(() => setMounted(true), []);
  const isInitial = asset === (initialAsset ?? assets[0].key) && range === initialRange;
  const { data, error, isLoading } = useSWR(`/api/history?asset=${asset}&range=${range}`, fetcher, {
    fallbackData: isInitial ? initialData : undefined,
    revalidateOnFocus: false,
    keepPreviousData: true,
    revalidateOnMount: !isInitial || !initialData,
  });
  const meta = assets.find((a) => a.key === asset)!;
  const fmt = meta.format === "price" ? formatPrice : formatUsdCompact;
  const axisFmt = (v: number) => (Math.abs(v) >= 1000 || meta.format !== "price" ? formatUsdCompact(v) : formatPrice(v));
  const series = data?.data ?? null;
  const change = series ? seriesChange(series) : null;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {assets.length > 1 ? (
            <div className="mb-2 flex flex-wrap gap-1" role="tablist" aria-label="Chart series">
              {assets.map((a) => (
                <button
                  key={a.key}
                  role="tab"
                  aria-selected={a.key === asset}
                  onClick={() => setAsset(a.key)}
                  className={cn(
                    "rounded-md px-2 py-1 text-[12.5px] transition-colors",
                    a.key === asset ? "bg-surface-3 text-fg" : "text-muted hover:text-fg-2",
                  )}
                >
                  {a.label}
                </button>
              ))}
            </div>
          ) : title ? (
            <div className="mb-1 text-[13px] text-muted">{title}</div>
          ) : null}
          {headline ?? (
            <div className="flex items-baseline gap-3">
              <span className="num text-2xl font-semibold text-fg">{series ? fmt(series[series.length - 1].v) : "n/a"}</span>
              <Delta value={change} className="text-sm" />
              <span className="text-xs text-subtle">{range === "ALL" ? "since launch" : `over ${range}`}</span>
            </div>
          )}
        </div>
        <div className="flex shrink-0 gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5" role="tablist" aria-label="Time range">
          {CHART_RANGES.map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={r === range}
              onClick={() => setRange(r)}
              className={cn(
                "num rounded-md px-2.5 py-1 text-[12px] transition-colors",
                r === range ? "bg-accent text-[#0d1020]" : "text-muted hover:text-fg",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className={cn("mt-4 transition-opacity", mounted && isLoading && "opacity-60")}>
        {series && series.length > 1 ? (
          <AreaChart data={series} format={fmt} axisFormat={axisFmt} height={height} label={`${meta.label}, ${range}`} id={`${asset}-${range}`} />
        ) : isLoading ? (
          <div style={{ height }}><Skeleton className="h-full w-full rounded-lg" /></div>
        ) : (
          <div style={{ height }} className="flex items-center justify-center rounded-lg border border-dashed border-line-strong text-center text-[13px] text-muted">
            {error ? "Chart data could not be loaded." : (data?.note ?? "No data for this range.")}
          </div>
        )}
      </div>
      {data?.source ? <SourceTag result={data} className="mt-2" /> : null}
    </div>
  );
}
