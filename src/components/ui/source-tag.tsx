import { cn } from "@/lib/utils";
import type { DataResult } from "@/lib/market/types";
import { TimeAgo } from "./time-ago";

/** "Source: CoinGecko · 2 min ago", attached to every block of live data. */
export function SourceTag({ result, className, label = "Source" }: { result: Pick<DataResult<unknown>, "source" | "asOf">; className?: string; label?: string }) {
  if (!result.source) return null;
  return (
    <p className={cn("text-[11px] text-subtle", className)}>
      {label}:{" "}
      <a href={result.source.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-muted hover:underline">
        {result.source.name}
      </a>
      {result.asOf ? (
        <>
          {" · "}
          <TimeAgo iso={result.asOf} />
        </>
      ) : null}
    </p>
  );
}
