/** Only same-site relative paths are accepted as post-login destinations (no open redirect). */
export function safeNext(raw: string | null | undefined, fallback = "/overview"): string {
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  if (raw.startsWith("/auth/") || raw.startsWith("/login")) return fallback;
  return raw;
}
