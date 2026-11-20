"use client";

import { CircleCheck } from "lucide-react";
import { isCompleted, useAcademyProgress } from "@/lib/academy/progress";
import { useT } from "@/i18n/client";

/** "Completed" marker for a lesson, from the quiz result stored in this browser. */
export function LessonStatus({ slug, className }: { slug: string; className?: string }) {
  const { progress, ready } = useAcademyProgress();
  const label = useT().academy.browser.completed;
  if (!ready || !isCompleted(progress[slug])) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-[11.5px] text-positive ${className ?? ""}`}>
      <CircleCheck className="size-3.5" aria-hidden /> {label}
    </span>
  );
}
