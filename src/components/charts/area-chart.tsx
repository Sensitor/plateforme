"use client";

import { Area, AreaChart as RAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SeriesPoint } from "@/lib/market/types";
import { CHART } from "./palette";
import { useLocale } from "@/i18n/client";
import { INTL_LOCALE } from "@/i18n/config";

export type ValueFormatter = (v: number) => string;

const dateFmt = (t: number, spanDays: number, tag: string) =>
  new Intl.DateTimeFormat(
    tag,
    spanDays <= 2
      ? { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }
      : spanDays > 1100
        ? { year: "numeric", timeZone: "UTC" }
        : spanDays > 400
          ? { month: "short", year: "numeric", timeZone: "UTC" }
          : { day: "numeric", month: "short", timeZone: "UTC" },
  ).format(t);

const tooltipDate = (t: number, spanDays: number, tag: string) =>
  new Intl.DateTimeFormat(tag, spanDays <= 7 ? { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC" } : { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(t);

/**
 * Single-series area chart: 2px line, faint fill, crosshair + tooltip,
 * recessive grid. One y-axis only.
 */
export function AreaChart({
  data,
  format,
  axisFormat,
  height = 220,
  color = CHART.line,
  showAxes = true,
  label,
  id,
}: {
  data: SeriesPoint[];
  format: ValueFormatter;
  /** Optional shorter formatter for axis ticks (defaults to `format`). */
  axisFormat?: ValueFormatter;
  height?: number;
  color?: string;
  showAxes?: boolean;
  label: string;
  id: string;
}) {
  const tag = INTL_LOCALE[useLocale()];
  if (data.length < 2) return null;
  const spanDays = (data[data.length - 1].t - data[0].t) / 86400_000;
  const values = data.map((d) => d.v);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.08 || max * 0.02;
  return (
    <div style={{ height }} role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <RAreaChart data={data} margin={{ top: 8, right: showAxes ? 4 : 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.22} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showAxes && <CartesianGrid stroke={CHART.grid} strokeDasharray="0" vertical={false} />}
          <XAxis
            dataKey="t"
            type="number"
            scale="time"
            domain={["dataMin", "dataMax"]}
            hide={!showAxes}
            tickFormatter={(t: number) => dateFmt(t, spanDays, tag)}
            tick={{ fill: CHART.axis, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            minTickGap={48}
          />
          <YAxis
            orientation="right"
            hide={!showAxes}
            domain={[Math.max(0, min - pad), max + pad]}
            tickFormatter={(v: number) => (axisFormat ?? format)(v)}
            tick={{ fill: CHART.axis, fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
            axisLine={false}
            tickLine={false}
            width={64}
          />
          <Tooltip
            cursor={{ stroke: CHART.axis, strokeWidth: 1, strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload as SeriesPoint;
              return (
                <div className="rounded-lg border border-line-strong bg-surface-2 px-3 py-2 shadow-xl shadow-black/40">
                  <div className="text-[11px] text-muted">{tooltipDate(p.t, spanDays, tag)}</div>
                  <div className="num mt-0.5 text-sm text-fg">{format(p.v)}</div>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            fill={`url(#fill-${id})`}
            isAnimationActive={false}
            activeDot={{ r: 4, fill: color, stroke: CHART.surface, strokeWidth: 2 }}
          />
        </RAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
