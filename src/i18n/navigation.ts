"use client";

import { useMemo } from "react";
import { usePathname as useNextPathname, useRouter as useNextRouter } from "next/navigation";
import { useLocale } from "./client";
import { localizeHref, splitLocale } from "./paths";

/** Router whose push and replace keep the current interface language. */
export function useRouter() {
  const router = useNextRouter();
  const locale = useLocale();
  return useMemo(
    () => ({
      ...router,
      push: (href: string, options?: Parameters<typeof router.push>[1]) => router.push(localizeHref(locale, href), options),
      replace: (href: string, options?: Parameters<typeof router.replace>[1]) => router.replace(localizeHref(locale, href), options),
      prefetch: (href: string) => router.prefetch(localizeHref(locale, href)),
    }),
    [router, locale],
  );
}

/** Current path without its locale prefix ("/fr/markets" -> "/markets"). */
export function usePathname() {
  return splitLocale(useNextPathname() ?? "/").path;
}
