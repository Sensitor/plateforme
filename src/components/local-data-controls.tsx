"use client";

import { useState } from "react";
import { useWatchlist } from "@/lib/watchlist/store";
import { Button } from "@/components/ui/button";

export function LocalDataControls() {
  const { slugs, remove, ready } = useWatchlist();
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-[13.5px]">
      <span className="text-fg-2">
        Watchlist: <span className="num text-fg">{ready ? slugs.length : "…"}</span> project{slugs.length === 1 ? "" : "s"}
      </span>
      {confirm ? (
        <span className="flex items-center gap-2">
          <span className="text-muted">Remove all?</span>
          <Button size="sm" variant="ghost" onClick={() => setConfirm(false)}>
            Cancel
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
            Clear watchlist
          </Button>
        </span>
      ) : (
        <Button size="sm" variant="secondary" disabled={!slugs.length} onClick={() => setConfirm(true)}>
          Clear watchlist
        </Button>
      )}
    </div>
  );
}
