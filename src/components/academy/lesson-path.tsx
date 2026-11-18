"use client";

import Link from "next/link";
import { CircleCheck, Clock } from "lucide-react";
import { ACADEMY_COLORS, tint } from "@/lib/brand";
import type { AcademyCategory } from "@/content/concepts";
import { isCompleted, useAcademyProgress } from "@/lib/academy/progress";

export interface PathLesson {
  slug: string;
  title: string;
  summary: string;
  category: AcademyCategory;
  categoryLabel: string;
  minutes: number;
}

/** Ordered in-depth lessons with completion from quiz results (stored in this browser). */
export function LessonPath({ lessons }: { lessons: PathLesson[] }) {
  const { progress, ready } = useAcademyProgress();
  const done = ready ? lessons.filter((l) => isCompleted(progress[l.slug])).length : 0;
  const next = ready ? lessons.find((l) => !isCompleted(progress[l.slug])) : undefined;
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-surface-3" aria-hidden>
            <div className="h-full rounded-full bg-positive transition-all" style={{ width: `${(done / lessons.length) * 100}%` }} />
          </div>
          <span className="text-[12.5px] text-muted">
            <span className="num text-fg-2">
              {done}/{lessons.length}
            </span>{" "}
            lessons completed
          </span>
        </div>
        {next ? (
          <Link href={`/academy/concepts/${next.slug}`} className="text-[13px] text-accent hover:text-accent-strong">
            {done ? "Continue" : "Start"} with {next.title} →
          </Link>
        ) : ready ? (
          <span className="text-[13px] text-positive">All in-depth lessons completed</span>
        ) : null}
      </div>
      <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
        {lessons.map((l, i) => {
          const color = ACADEMY_COLORS[l.category];
          const completed = ready && isCompleted(progress[l.slug]);
          return (
            <li key={l.slug} className="border-t border-line">
              <Link href={`/academy/concepts/${l.slug}`} className="group grid grid-cols-[32px_minmax(0,1fr)_auto] items-start gap-3 py-3.5">
                <span
                  className="num flex size-8 items-center justify-center rounded-full text-[12px] font-medium"
                  style={completed ? { backgroundColor: "rgba(69,185,151,0.16)", color: "#45B997" } : { backgroundColor: tint(color, 0.14), color }}
                >
                  {completed ? <CircleCheck className="size-4" aria-label="Completed" /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-medium text-fg group-hover:text-accent-strong">{l.title}</span>
                  <span className="mt-0.5 block truncate text-[12.5px] text-muted">{l.summary}</span>
                </span>
                <span className="flex flex-col items-end gap-1 pt-0.5 text-[11px]">
                  <span className="font-medium uppercase tracking-[0.1em]" style={{ color }}>
                    {l.categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 text-subtle">
                    <Clock className="size-3" aria-hidden /> {l.minutes} min
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
