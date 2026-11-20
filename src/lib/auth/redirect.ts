import { splitLocale } from "@/i18n/paths";

/** Only same-site relative paths are accepted as post-login destinations (no open redirect). */
export function safeNext(raw: string | null | undefined, fallback = "/overview"): string {
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  const { path } = splitLocale(raw);
  if (path.startsWith("/auth/") || path.startsWith("/login")) return fallback;
  return raw;
}
