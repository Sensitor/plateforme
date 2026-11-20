import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "@/i18n/link";
import { BellRing, Check, MessagesSquare, RefreshCcw } from "lucide-react";
import { Logo } from "@/components/shell/logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

const BENEFITS = [
  { icon: RefreshCcw, text: "Watchlist and portfolio synced across your devices" },
  { icon: BellRing, text: "Price alerts by email and in-app notifications" },
  { icon: MessagesSquare, text: "More daily questions to the Research Copilot" },
];

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,rgba(120,150,255,0.14),transparent_70%),radial-gradient(45%_40%_at_90%_20%,rgba(156,131,232,0.12),transparent_70%)]"
      />
      <header className="relative mx-auto flex h-16 w-full max-w-6xl items-center px-4 md:px-6">
        <Link href="/" aria-label="Sensitor home">
          <Logo />
        </Link>
      </header>
      <main className="relative mx-auto grid grid-cols-1 w-full max-w-6xl flex-1 items-center gap-12 px-4 pb-16 pt-6 md:px-6 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="hidden lg:block">
          <h1 className="serif-display text-[56px] leading-[1.02] text-fg">
            Research that
            <br />
            <span className="italic text-violet">remembers you.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            Everything on Sensitor stays readable without an account. Signing in keeps your own work in one place.
          </p>
          <ul className="mt-8 space-y-3.5">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[14px] text-fg-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-4" aria-hidden />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-10 flex items-center gap-2 text-[12.5px] text-subtle">
            <Check className="size-3.5 text-positive" aria-hidden /> Sensitor never asks for seed phrases or private keys.
          </p>
        </div>
        <Suspense fallback={<div className="h-[460px] rounded-2xl border border-line bg-surface" />}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
