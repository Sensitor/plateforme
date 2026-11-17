import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible hover/focus tooltip without JS. The trigger is focusable so
 * keyboard users get the same explanation as mouse users.
 */
export function InfoTip({ label, children, className, align = "center" }: { label: string; children: React.ReactNode; className?: string; align?: "center" | "start" | "end" }) {
  return (
    <span className={cn("group relative inline-flex align-middle", className)}>
      <button type="button" aria-label={label} className="inline-flex text-subtle transition-colors hover:text-fg-2 focus-visible:text-fg-2">
        <Info className="size-3.5" aria-hidden />
      </button>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute top-full z-50 mt-2 hidden w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-line-strong bg-surface-2 p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-fg-2 shadow-xl shadow-black/40 group-focus-within:block group-hover:block",
          align === "center" && "left-1/2 -translate-x-1/2",
          align === "start" && "left-0",
          align === "end" && "right-0",
        )}
      >
        {children}
      </span>
    </span>
  );
}
