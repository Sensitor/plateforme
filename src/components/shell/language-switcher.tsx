"use client";

import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useT } from "@/i18n/client";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { switchLocaleHref } from "@/i18n/paths";

/** Opens the same page in the other interface language and remembers the choice. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useT().shell;
  const router = useRouter();
  const target: Locale = locale === "fr" ? "en" : "fr";
  return (
    <button
      type="button"
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
        router.push(switchLocaleHref(window.location.pathname, window.location.search, target) + window.location.hash);
      }}
      className={cn("flex h-9 items-center gap-1.5 rounded-lg px-2 text-[12px] font-medium uppercase tracking-wide text-fg-2 hover:bg-surface-2 hover:text-fg", className)}
      aria-label={t.switchTo}
      title={t.switchTo}
      lang={target}
    >
      <Languages className="size-4" aria-hidden />
      {target}
    </button>
  );
}
