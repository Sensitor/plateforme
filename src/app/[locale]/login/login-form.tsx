"use client";

import { useState } from "react";
import Link from "@/i18n/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, Mail, MailCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/auth-provider";
import { safeNext } from "@/lib/auth/redirect";
import { useLocale, useT } from "@/i18n/client";
import { localizeHref } from "@/i18n/paths";
import { useRouter as useLocaleRouter } from "@/i18n/navigation";

type Mode = "signin" | "signup" | "magic" | "reset";

const field = "h-11 w-full rounded-lg border border-line bg-bg-elevated px-3.5 text-[14px] text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none";

export function LoginForm() {
  const params = useSearchParams();
  const router = useLocaleRouter();
  const locale = useLocale();
  const t = useT().login;
  const { configured, supabase, user } = useAuth();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<Mode>(params.get("mode") === "signup" ? "signup" : "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const initialError = params.get("error");
  const [error, setError] = useState<string | null>(initialError ? (t.errors.codes[initialError] ?? initialError) : null);
  const [sent, setSent] = useState<string | null>(null);

  if (!configured || !supabase) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-7">
        <h2 className="serif-display text-[30px] text-fg">{t.unavailable.title}</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">{t.unavailable.text}</p>
        <Link href="/overview" className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-[#0d1020] hover:bg-accent-strong">
          {t.unavailable.guest} <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    );
  }

  // The email link brings the visitor back in the language they signed up in.
  const callback = (target: string) => `${window.location.origin}/auth/callback?next=${encodeURIComponent(localizeHref(locale, target))}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    const address = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) return setError(t.errors.email);
    if ((mode === "signin" || mode === "signup") && password.length < (mode === "signup" ? 8 : 1)) {
      return setError(mode === "signup" ? t.errors.passwordLength : t.errors.passwordMissing);
    }
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: address, password });
        if (error) return setError(error.message === "Email not confirmed" ? t.errors.notConfirmed : t.errors.incorrect);
        router.replace(next);
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email: address, password, options: { emailRedirectTo: callback(next) } });
        if (error) return setError(error.message);
        if (data.session) router.replace(next);
        else setSent(t.sent.confirm(address));
      } else if (mode === "magic") {
        const { error } = await supabase.auth.signInWithOtp({ email: address, options: { emailRedirectTo: callback(next), shouldCreateUser: true } });
        if (error) return setError(error.message);
        setSent(t.sent.magic(address));
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(address, { redirectTo: callback("/account?recovery=1") });
        if (error) return setError(error.message);
        setSent(t.sent.reset(address));
      }
    } finally {
      setBusy(false);
    }
  }

  if (user && !sent) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-7">
        <h2 className="serif-display text-[30px] text-fg">{t.signedIn.title}</h2>
        <p className="mt-2 truncate text-[14px] text-muted">{user.email}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={next} className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-[#0d1020] hover:bg-accent-strong">
            {t.signedIn.continue} <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/account" className="inline-flex h-10 items-center rounded-lg border border-line-strong px-4 text-sm text-fg hover:border-muted">
            {t.signedIn.account}
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
        <h2 className="serif-display mt-5 text-[30px] text-fg">{t.sent.title}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-fg-2">{sent}</p>
        <p className="mt-2 text-[12.5px] text-muted">{t.sent.hint}</p>
        <button onClick={() => setSent(null)} className="mt-6 text-[13px] text-accent hover:text-accent-strong">
          {t.sent.another}
        </button>
      </div>
    );
  }

  const { title, cta } = t.modes[mode];
  return (
    <div className="rounded-2xl border border-line bg-surface p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
      {mode === "signin" || mode === "signup" ? (
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg border border-line bg-bg-elevated p-1" role="tablist" aria-label={t.tabs.aria}>
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
              {m === "signin" ? t.tabs.signin : t.tabs.signup}
            </button>
          ))}
        </div>
      ) : null}
      <h2 className="serif-display text-[30px] leading-tight text-fg">{title}</h2>
      {mode === "magic" ? <p className="mt-1.5 text-[13px] text-muted">{t.magicHint}</p> : null}
      <form onSubmit={submit} className="mt-5 space-y-3.5" noValidate>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[12px] font-medium text-muted">
            {t.email}
          </label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPlaceholder} className={field} />
        </div>
        {mode === "signin" || mode === "signup" ? (
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-[12px] font-medium text-muted">
                {t.password}
              </label>
              {mode === "signin" ? (
                <button type="button" onClick={() => setMode("reset")} className="text-[12px] text-accent hover:text-accent-strong">
                  {t.forgot}
                </button>
              ) : (
                <span className="text-[11.5px] text-subtle">{t.minLength}</span>
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
            <Mail className="size-4 text-muted" aria-hidden /> {t.useLink}
          </button>
        ) : (
          <button onClick={() => setMode("signin")} className="text-accent hover:text-accent-strong">
            {t.backToPassword}
          </button>
        )}
      </div>
      <p className="mt-5 text-center text-[11.5px] leading-relaxed text-subtle">
        {t.consent}
      </p>
    </div>
  );
}
