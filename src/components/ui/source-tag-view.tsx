"use client";

import { cn } from "@/lib/utils";
import { useT } from "@/i18n/client";
import { TimeAgo } from "./time-ago";

export function SourceTagView({ source, asOf, label, className }: { source: { name: string; url: string }; asOf: string | null; label?: string; className?: string }) {
  const t = useT().ui;
  return (
    <p className={cn("text-[11px] text-subtle", className)}>
      {label ?? t.source}:{" "}
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-muted hover:underline">
        {source.name}
      </a>
      {asOf ? (
        <>
          {" · "}
          <TimeAgo iso={asOf} />
        </>
      ) : null}
    </p>
  );
}
