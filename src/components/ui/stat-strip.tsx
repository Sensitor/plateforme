import { cn } from "@/lib/utils";
import { InfoTip } from "./info-tip";

/** Ruled strip of headline figures (Overview, Explore, Markets). */
export function StatStrip({ children, columns = 4, className }: { children: React.ReactNode; columns?: 3 | 4 | 5 | 6; className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-5 lg:gap-x-0 lg:divide-x lg:divide-line",
        columns === 3 ? "lg:grid-cols-3" : columns === 5 ? "lg:grid-cols-5" : columns === 6 ? "sm:grid-cols-3 lg:grid-cols-6" : "lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </dl>
  );
}

export function Stat({ label, tip, value, children, size = "lg" }: { label: string; tip?: string; value: React.ReactNode; children?: React.ReactNode; size?: "lg" | "md" }) {
  return (
    <div className={cn("min-w-0 lg:first:pl-0", size === "md" ? "lg:px-4" : "lg:px-6")}>
      <dt className="flex items-center gap-1.5 text-[12px] text-muted">
        {label}
        {tip ? (
          <InfoTip label={label} align="start">
            {tip}
          </InfoTip>
        ) : null}
      </dt>
      <dd className={cn("num mt-2 truncate leading-none tracking-tight text-fg", size === "md" ? "text-[19px]" : "text-[26px]")}>{value}</dd>
      {children ? <dd className={cn("mt-2 text-muted", size === "md" ? "text-[11.5px]" : "text-[12.5px]")}>{children}</dd> : null}
    </div>
  );
}
