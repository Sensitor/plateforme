"use client";

import { AlertTriangle, CloudOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/client";

export function DataNoticeView({ unavailable, note, className }: { unavailable: boolean; note: string | null; className?: string }) {
  const t = useT().ui.dataNotice;
  const Icon = unavailable ? CloudOff : AlertTriangle;
  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-2 rounded-lg border px-3 py-2 text-xs leading-relaxed",
        unavailable ? "border-line-strong bg-surface-2 text-muted" : "border-warning/25 bg-warning-soft text-warning",
        className,
      )}
    >
      <Icon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      <span>{note ?? (unavailable ? t.unavailable : t.partial)}</span>
    </div>
  );
}
