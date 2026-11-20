"use client";

import { useState } from "react";
import { useWatchlist } from "@/lib/watchlist/store";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/client";

export function LocalDataControls() {
  const { slugs, remove, ready } = useWatchlist();
  const [confirm, setConfirm] = useState(false);
  const t = useT().settings.local;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-[13.5px]">
      <span className="text-fg-2">
        {t.watchlistLabel} <span className="num text-fg">{ready ? slugs.length : "…"}</span> {t.watchlist(slugs.length)}
      </span>
      {confirm ? (
        <span className="flex items-center gap-2">
          <span className="text-muted">{t.confirm}</span>
          <Button size="sm" variant="ghost" onClick={() => setConfirm(false)}>
            {t.cancel}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="text-negative"
            onClick={() => {
              slugs.forEach(remove);
              setConfirm(false);
            }}
          >
            {t.clear}
          </Button>
        </span>
      ) : (
        <Button size="sm" variant="secondary" disabled={!slugs.length} onClick={() => setConfirm(true)}>
          {t.clear}
        </Button>
      )}
    </div>
  );
}
