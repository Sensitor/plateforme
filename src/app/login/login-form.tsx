"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, Mail, MailCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/auth-provider";
import { safeNext } from "@/lib/auth/redirect";

type Mode = "signin" | "signup" | "magic" | "reset";

const TITLES: Record<Mode, { title: string; cta: string }> = {
  signin: { title: "Sign in", cta: "Sign in" },
  signup: { title: "Create your account", cta: "Create account" },
  magic: { title: "Email me a sign-in link", cta: "Send the link" },
  reset: { title: "Reset your password", cta: "Send reset link" },
};

const field = "h-11 w-full rounded-lg border border-line bg-bg-elevated px-3.5 text-[14px] text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none";

export function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const { configured, supabase, user } = useAuth();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<Mode>(params.get("mode") === "signup" ? "signup" : "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(params.get("error"));
  const [sent, setSent] = useState<string | null>(null);

  if (!configured || !supabase) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-7">
        <h2 className="serif-display text-[30px] text-fg">Sign-in unavailable</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          Accounts are not configured on this deployment. You can keep using Sensitor as a guest: your watchlist and portfolio stay in this browser.
        </p>
        <Link href="/overview" className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-[#0d1020] hover:bg-accent-strong">
          Continue as guest <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    );
  }

  const callback = (target: string) => `${window.location.origin}/auth/callback?next=${encodeURIComponent(target)}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    const address = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) return setError("Enter a valid email address.");
    if ((mode === "signin" || mode === "signup") && password.length < (mode === "signup" ? 8 : 1)) {
      return setError(mode === "signup" ? "Use at least 8 characters for your password." : "Enter your password.");
    }
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: address, password });
        if (error) return setError(error.message === "Email not confirmed" ? "Confirm your email first: check your inbox for the link." : "Email or password is incorrect.");
        router.replace(next);
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email: address, password, options: { emailRedirectTo: callback(next) } });
        if (error) return setError(error.message);
        if (data.session) router.replace(next);
        else setSent(`We sent a confirmation link to ${address}. Open it to activate your account.`);
      } else if (mode === "magic") {
        const { error } = await supabase.auth.signInWithOtp({ email: address, options: { emailRedirectTo: callback(next), shouldCreateUser: true } });
        if (error) return setError(error.message);
        setSent(`We sent a sign-in link to ${address}. It works once and expires after one hour.`);
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(address, { redirectTo: callback("/account?recovery=1") });
        if (error) return setError(error.message);
        setSent(`If an account exists for ${address}, a reset link is on its way.`);
      }
    } finally {
      setBusy(false);
    }
  }

  if (user && !sent) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-7">
        <h2 className="serif-display text-[30px] text-fg">You are signed in</h2>
        <p className="mt-2 truncate text-[14px] text-muted">{user.email}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={next} className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-[#0d1020] hover:bg-accent-strong">
            Continue <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/account" className="inline-flex h-10 items-center rounded-lg border border-line-strong px-4 text-sm text-fg hover:border-muted">
            My account
          </Link>
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-7" role="status">
        <span className="flex size-11 items-center justify-center rounded-xl bg-positive-soft text-positive">
          <MailCheck className="size-5" aria-hidden />
        </span>
        <h2 className="serif-display mt-5 text-[30px] text-fg">Check your inbox</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-fg-2">{sent}</p>
        <p className="mt-2 text-[12.5px] text-muted">Open the link in this browser. Nothing arrived after a few minutes? Look in your spam folder.</p>
        <button onClick={() => setSent(null)} className="mt-6 text-[13px] text-accent hover:text-accent-strong">
          Use another email
        </button>
      </div>
    );
  }

  const { title, cta } = TITLES[mode];
  return (
    <div className="rounded-2xl border border-line bg-surface p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
      {mode === "signin" || mode === "signup" ? (
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg border border-line bg-bg-elevated p-1" role="tablist" aria-label="Account">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                setError(null);
              }}
              className={cn("h-9 rounded-md text-[13.5px]", mode === m ? "bg-surface-3 text-fg" : "text-muted hover:text-fg-2")}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>
      ) : null}
      <h2 className="serif-display text-[30px] leading-tight text-fg">{title}</h2>
      {mode === "magic" ? <p className="mt-1.5 text-[13px] text-muted">No password needed. New here? The link creates your account.</p> : null}
      <form onSubmit={submit} className="mt-5 space-y-3.5" noValidate>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[12px] font-medium text-muted">
            Email
          </label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={field} />
        </div>
        {mode === "signin" || mode === "signup" ? (
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-[12px] font-medium text-muted">
                Password
              </label>
              {mode === "signin" ? (
                <button type="button" onClick={() => setMode("reset")} className="text-[12px] text-accent hover:text-accent-strong">
                  Forgot it?
                </button>
              ) : (
                <span className="text-[11.5px] text-subtle">8 characters minimum</span>
              )}
            </div>
            <input
              id="password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
          </div>
        ) : null}
        {error ? (
          <p className="rounded-lg border border-negative/25 bg-negative-soft px-3 py-2 text-[13px] text-negative" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={busy}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent text-[14px] font-semibold text-[#0d1020] hover:bg-accent-strong disabled:opacity-60"
        >
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {cta}
        </button>
      </form>
      <div className="mt-5 border-t border-line pt-5 text-center text-[13px]">
        {mode === "signin" || mode === "signup" ? (
          <button onClick={() => setMode("magic")} className="inline-flex items-center gap-2 text-fg-2 hover:text-fg">
            <Mail className="size-4 text-muted" aria-hidden /> Sign in with an email link instead
          </button>
        ) : (
          <button onClick={() => setMode("signin")} className="text-accent hover:text-accent-strong">
            Back to sign in with a password
          </button>
        )}
      </div>
      <p className="mt-5 text-center text-[11.5px] leading-relaxed text-subtle">
        By creating an account you accept that Sensitor stores your email, watchlist, portfolio entries and alerts to provide the service. No investment advice.
      </p>
    </div>
  );
}
