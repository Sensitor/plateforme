"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function PlatformError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-24 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-negative-soft text-negative">
        <AlertTriangle className="size-5" aria-hidden />
      </span>
      <h1 className="mt-4 text-xl font-semibold text-fg">Something went wrong</h1>
      <p className="mt-2 text-[14px] text-muted">This section could not be displayed. Your data is safe, try again, or come back in a moment.</p>
      {error.digest ? <p className="num mt-2 text-[11px] text-subtle">Ref: {error.digest}</p> : null}
      <button onClick={reset} className="mt-6 rounded-lg bg-accent px-4 py-2 text-[14px] font-semibold text-[#0d1020]">
        Try again
      </button>
    </div>
  );
}
