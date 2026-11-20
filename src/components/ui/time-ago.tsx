"use client";

import { useEffect, useState } from "react";
import { formatDateTime, formatRelative } from "@/lib/format";
import { useLocale } from "@/i18n/client";

/**
 * Renders an absolute UTC timestamp on the server, then a relative time after
 * hydration (avoids hydration mismatches and keeps prerendering deterministic).
 */
export function TimeAgo({ iso, className }: { iso: string; className?: string }) {
  const [now, setNow] = useState<number | null>(null);
  const locale = useLocale();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the clock must happen after hydration
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <time dateTime={iso} title={formatDateTime(iso, locale)} className={className}>
      {now == null ? formatDateTime(iso, locale) : formatRelative(iso, now, locale)}
    </time>
  );
}
