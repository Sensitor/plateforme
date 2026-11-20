/** Interface languages. English is served at unprefixed URLs, French under /fr. */
export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
/** Remembers an explicit language choice (read on the home page only). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLocale = (value: unknown): value is Locale => typeof value === "string" && (LOCALES as readonly string[]).includes(value);

export const LOCALE_NAMES: Record<Locale, string> = { en: "English", fr: "Français" };

/** Tags for dates and wording. Financial figures keep en-US conventions in both languages (see lib/format). */
export const INTL_LOCALE: Record<Locale, string> = { en: "en-GB", fr: "fr-FR" };
