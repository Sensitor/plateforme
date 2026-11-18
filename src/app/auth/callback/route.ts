import { NextResponse, type NextRequest } from "next/server";
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
  const fail = (message: string) => NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(message)}`, url.origin));

  const providerError = url.searchParams.get("error_description");
  if (providerError) return fail(providerError);
  if (!code) return fail("The sign-in link is invalid or has expired.");

  const supabase = await getServerSupabase();
  if (!supabase) return fail("Sign-in is not configured on this deployment.");
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return fail("This link has expired or was opened in a different browser. Request a new one below.");
  return NextResponse.redirect(new URL(next, url.origin));
}
