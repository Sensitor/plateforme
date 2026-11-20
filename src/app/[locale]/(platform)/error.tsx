"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useT } from "@/i18n/client";

export default function PlatformError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useT().shell.error;
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-24 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-negative-soft text-negative">
        <AlertTriangle className="size-5" aria-hidden />
      </span>
      <h1 className="mt-4 text-xl font-semibold text-fg">{t.title}</h1>
      <p className="mt-2 text-[14px] text-muted">{t.text}</p>
      {error.digest ? <p className="num mt-2 text-[11px] text-subtle">{t.ref}: {error.digest}</p> : null}
      <button onClick={reset} className="mt-6 rounded-lg bg-accent px-4 py-2 text-[14px] font-semibold text-[#0d1020]">
        {t.retry}
      </button>
    </div>
  );
}
