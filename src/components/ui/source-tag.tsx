import type { DataResult } from "@/lib/market/types";
import { SourceTagView } from "./source-tag-view";

/**
 * "Source: CoinGecko · 2 min ago", attached to every block of live data.
 * Only the source and timestamp cross to the client, never the data itself.
 */
export function SourceTag({ result, className, label }: { result: Pick<DataResult<unknown>, "source" | "asOf">; className?: string; label?: string }) {
  if (!result.source) return null;
  return <SourceTagView source={{ name: result.source.name, url: result.source.url }} asOf={result.asOf ?? null} label={label} className={className} />;
}
