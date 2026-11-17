import { AlertTriangle, CloudOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DataResult } from "@/lib/market/types";

/** Explains degraded data states instead of silently showing blanks. */
export function DataNotice({ result, className }: { result: DataResult<unknown>; className?: string }) {
  if (result.status === "ok" && !result.note) return null;
  const unavailable = result.status === "unavailable";
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
      <span>{result.note ?? (unavailable ? "Data temporarily unavailable." : "Partial data.")}</span>
    </div>
  );
}
