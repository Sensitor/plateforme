import { NextResponse, type NextRequest } from "next/server";
import { localizeHref, splitLocale } from "@/i18n/paths";
import type { EmailOtpType } from "@supabase/supabase-js";
import { getServerSupabase } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth/redirect";

const TYPES: EmailOtpType[] = ["signup", "invite", "magiclink", "recovery", "email_change", "email"];

/**
 * Token-hash verification. Works across devices (no PKCE verifier needed) when
 * the Supabase email templates point to
 * {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=<type>.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const fallback = type === "recovery" ? "/account?recovery=1" : "/overview";
  const next = safeNext(url.searchParams.get("next"), fallback);
  // Error codes are translated by the login form; the login page keeps the visitor's language.
  const fail = (code: string) => NextResponse.redirect(new URL(`${localizeHref(splitLocale(url.searchParams.get("next") ?? "/").locale, "/login")}?error=${encodeURIComponent(code)}`, url.origin));

  if (!tokenHash || !type || !TYPES.includes(type)) return fail("incomplete");
  const supabase = await getServerSupabase();
  if (!supabase) return fail("unconfigured");
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
  if (error) return fail("expired-used");
  return NextResponse.redirect(new URL(next, url.origin));
}
