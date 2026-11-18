"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CircleCheck, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACADEMY_CATEGORIES, type AcademyCategory, type Concept } from "@/content/concepts";
import { ACADEMY_COLORS, tint } from "@/lib/brand";
import { isCompleted, useAcademyProgress } from "@/lib/academy/progress";

const LEVELS = { beginner: 1, intermediate: 2, advanced: 3 } as const;

export function LevelDots({ level, color }: { level: Concept["level"]; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11.5px] capitalize text-muted" title={level}>
      <span className="flex gap-0.5" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span key={i} className="size-1.5 rounded-full" style={{ backgroundColor: i <= LEVELS[level] ? color : "var(--surface-3)" }} />
        ))}
      </span>
      {level}
    </span>
  );
}

export function ConceptBrowser({ concepts, usage, deep = [] }: { concepts: Concept[]; usage: Record<string, number>; deep?: string[] }) {
  const { progress, ready } = useAcademyProgress();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<AcademyCategory | "all">("all");
  const list = useMemo(
    () => concepts.filter((c) => (cat === "all" || c.category === cat) && (!q || `${c.title} ${c.summary}`.toLowerCase().includes(q.toLowerCase()))),
    [concepts, q, cat],
  );
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a concept"
            aria-label="Search concepts"
            className="h-10 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none"
          />
        </div>
        <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <div className="flex w-max gap-1.5 md:w-auto md:flex-wrap">
            <button
              onClick={() => setCat("all")}
              aria-pressed={cat === "all"}
              className={cn("h-8 whitespace-nowrap rounded-full border px-3 text-[12.5px]", cat === "all" ? "border-accent/50 bg-accent-soft text-fg" : "border-line text-muted hover:text-fg-2")}
            >
              All
            </button>
            {ACADEMY_CATEGORIES.map((c) => {
              const color = ACADEMY_COLORS[c.id];
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(active ? "all" : c.id)}
                  aria-pressed={active}
                  className={cn("inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-full border px-3 text-[12.5px]", active ? "text-fg" : "border-line text-muted hover:text-fg-2")}
                  style={active ? { borderColor: tint(color, 0.6), backgroundColor: tint(color, 0.16) } : undefined}
                >
                  <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => {
          const color = ACADEMY_COLORS[c.category];
          return (
            <Link
              key={c.slug}
              href={`/academy/concepts/${c.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong"
              style={{ backgroundImage: `linear-gradient(180deg, ${tint(color, 0.07)}, transparent 55%)` }}
            >
              <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: color }} aria-hidden />
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color }}>
                  {ACADEMY_CATEGORIES.find((x) => x.id === c.category)?.label}
                </span>
                {ready && isCompleted(progress[c.slug]) ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-positive">
                    <CircleCheck className="size-3.5" aria-hidden /> Completed
                  </span>
                ) : deep.includes(c.slug) ? (
                  <span className="rounded px-1.5 py-0.5 text-[10.5px] font-medium" style={{ backgroundColor: tint(color, 0.16), color }}>
                    In-depth
                  </span>
                ) : null}
              </div>
              <div className="serif-display mt-2 text-[25px] leading-[1.1] text-fg">{c.title}</div>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{c.summary}</p>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <LevelDots level={c.level} color={color} />
                {usage[c.slug] ? (
                  <span className="text-[11.5px] text-subtle">
                    In {usage[c.slug]} dossier{usage[c.slug] > 1 ? "s" : ""}
                  </span>
                ) : null}
              </div>
            </Link>
          );
        })}
        {list.length === 0 ? <p className="text-sm text-muted">No concept matches your search.</p> : null}
      </div>
    </div>
  );
}
