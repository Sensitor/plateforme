import Link from "next/link";
import { ArrowUp, CalendarClock } from "lucide-react";
import { KEY_DATES } from "@/content/key-dates";
import { PROJECT_BY_SLUG } from "@/content/projects";
import { TokenLogo } from "@/components/ui/token-logo";
import { PanelLabel } from "./section-header";

const QUESTIONS = ["How does Lido make money?", "What is restaking, and what can go wrong?", "Compare Arbitrum and Optimism token value accrual"];

/** Entry point to the Research Copilot: a plain GET form, works without JavaScript. */
export function AskResearch() {
  return (
    <div>
      <p className="text-[13.5px] leading-relaxed text-fg-2">Questions answered from Sensitor dossiers, with sources and labelled claims.</p>
      <form action="/copilot" method="get" className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-bg-elevated p-1.5 focus-within:border-accent/50">
        <input type="hidden" name="send" value="1" />
        <label htmlFor="ask-research" className="sr-only">
          Ask a research question
        </label>
        <input
          id="ask-research"
          name="q"
          required
          maxLength={500}
          placeholder="Ask about a project or concept"
          className="h-8 min-w-0 flex-1 bg-transparent px-2 text-[13.5px] text-fg placeholder:text-subtle focus:outline-none focus-visible:outline-none"
        />
        <button type="submit" className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-[#0d1020] hover:bg-accent-strong" aria-label="Ask the Copilot">
          <ArrowUp className="size-4" />
        </button>
      </form>
      <ul className="mt-3 space-y-1">
        {QUESTIONS.map((q) => (
          <li key={q}>
            <Link href={`/copilot?q=${encodeURIComponent(q)}&send=1`} className="block rounded-md py-1 text-[13px] text-muted hover:text-fg">
              {q}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const KIND = { unlock: "Unlock", halving: "Halving", "vesting-end": "Vesting end" } as const;

/** Supply schedule events documented in the dossiers. */
export function KeyDatesList({ limit = 5 }: { limit?: number }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <PanelLabel>Supply calendar</PanelLabel>
        <CalendarClock className="size-3.5 text-subtle" aria-hidden />
      </div>
      <ul className="divide-y divide-line/70">
        {KEY_DATES.slice(0, limit).map((d) => {
          const p = PROJECT_BY_SLUG[d.slug];
          return (
            <li key={`${d.slug}-${d.title}`}>
              <Link href={`/projects/${d.slug}#tokenomics`} className="group flex items-center gap-3 py-2.5">
                <TokenLogo src={p?.logo} name={p?.name ?? d.slug} size={22} />
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 block text-[13px] text-fg group-hover:text-accent-strong">
                    {p?.name}: {d.title}
                  </span>
                  <span className="block text-[11.5px] text-muted">{d.when}</span>
                </span>
                <span className="text-[11px] text-subtle">{KIND[d.kind]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-[11px] leading-relaxed text-subtle">Schedules from the dossiers. Exact unlock amounts need a licensed data feed (planned).</p>
    </div>
  );
}
