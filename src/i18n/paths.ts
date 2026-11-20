import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";

/** "/fr/overview" -> { locale: "fr", path: "/overview" }; "/overview" -> { locale: "en", path: "/overview" }. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  for (const l of LOCALES) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return { locale: l, path: pathname.slice(l.length + 1) || "/" };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

const hasLocalePrefix = (href: string) => LOCALES.some((l) => href === `/${l}` || href.startsWith(`/${l}/`) || href.startsWith(`/${l}?`) || href.startsWith(`/${l}#`));

/**
 * Internal path for a locale. External links, anchors and paths that already
 * carry a locale are returned unchanged, so the function is safe to apply twice.
 */
export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//") || hasLocalePrefix(href)) return href;
  if (locale === DEFAULT_LOCALE) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/?") || href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Same page in another language. */
export function switchLocaleHref(pathname: string, search: string, target: Locale): string {
  return localizeHref(target, splitLocale(pathname).path) + (search ? (search.startsWith("?") ? search : `?${search}`) : "");
}
