import { locale as rootLocale } from "next/root-params";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

/** Interface language of the current request, for Server Components (no prop drilling). */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Dictionary of the current interface language, for Server Components. */
export async function getT() {
  return getDictionary(await getLocale());
}
