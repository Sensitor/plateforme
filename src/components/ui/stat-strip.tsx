import { cn } from "@/lib/utils";
import { InfoTip } from "./info-tip";

/** Ruled strip of headline figures (Overview, Explore, Markets). */
export function StatStrip({ children, columns = 4, className }: { children: React.ReactNode; columns?: 3 | 4 | 5; className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-5 lg:gap-x-0 lg:divide-x lg:divide-line",
        columns === 3 ? "lg:grid-cols-3" : columns === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </dl>
  );
}

export function Stat({ label, tip, value, children }: { label: string; tip?: string; value: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="min-w-0 lg:px-6 lg:first:pl-0">
      <dt className="flex items-center gap-1.5 text-[12px] text-muted">
        {label}
        {tip ? (
          <InfoTip label={`About ${label}`} align="start">
            {tip}
          </InfoTip>
        ) : null}
      </dt>
      <dd className="num mt-2 truncate text-[26px] leading-none tracking-tight text-fg">{value}</dd>
      {children ? <dd className="mt-2 text-[12.5px] text-muted">{children}</dd> : null}
    </div>
  );
}
