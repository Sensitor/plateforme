import type { Metadata } from "next";
import type { Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";
import { localizeHref } from "./paths";
import { getLocale } from "./server";

/** Canonical URL and hreflang alternates for a page path written without locale ("/markets"). */
export function alternatesFor(path: string, locale: Locale): Metadata["alternates"] {
  return { canonical: localizeHref(locale, path), languages: { en: path, fr: localizeHref("fr", path), "x-default": path } };
}

/** Title, description and alternates of a static page, in the current interface language. */
export async function pageMetadata(key: keyof Dictionary["meta"]["pages"], path: string): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale).meta.pages[key];
  return { title: key === "home" ? { absolute: t.title } : t.title, description: t.description, alternates: alternatesFor(path, locale) };
}
