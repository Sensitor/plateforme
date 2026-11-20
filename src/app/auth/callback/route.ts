import { NextResponse, type NextRequest } from "next/server";
import { localizeHref, splitLocale } from "@/i18n/paths";
import { getServerSupabase } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth/redirect";

/**
 * PKCE callback: email confirmation, magic link and password recovery links
 * land here with a `code` that is exchanged for a session cookie.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));
  // Error codes are translated by the login form; the login page keeps the visitor's language.
  const fail = (code: string) => NextResponse.redirect(new URL(`${localizeHref(splitLocale(url.searchParams.get("next") ?? "/").locale, "/login")}?error=${encodeURIComponent(code)}`, url.origin));

  const providerError = url.searchParams.get("error_description");
  if (providerError) return fail(providerError);
  if (!code) return fail("invalid");

  const supabase = await getServerSupabase();
  if (!supabase) return fail("unconfigured");
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return fail("expired-browser");
  return NextResponse.redirect(new URL(next, url.origin));
}
