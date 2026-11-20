import type { DataResult } from "@/lib/market/types";
import { DataNoticeView } from "./data-notice-view";

/** Explains degraded data states instead of silently showing blanks. Only the status and note reach the client. */
export function DataNotice({ result, className }: { result: Pick<DataResult<unknown>, "status" | "note">; className?: string }) {
  if (result.status === "ok" && !result.note) return null;
  return <DataNoticeView unavailable={result.status === "unavailable"} note={result.note ?? null} className={className} />;
}
