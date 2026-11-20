"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/i18n/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { ArrowUp, BookOpenText, Database, FileText, GitCompareArrows, GraduationCap, Plus, ScanSearch, Square, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/brand";
import { useAuth } from "@/lib/auth/auth-provider";
import { formatDateTime } from "@/lib/format";
import type { ContextRef, CopilotMode } from "@/lib/copilot/context";
import { TokenLogo } from "@/components/ui/token-logo";
import { CopilotMarkdown } from "./markdown";

export interface CopilotProject {
  slug: string;
  name: string;
  ticker: string;
  logo: string | null;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  refs?: ContextRef;
  error?: { text: string; upgrade?: "signup" | "plans" };
}

const MODES: { id: CopilotMode; label: string; hint: string; icon: typeof GraduationCap; color: string }[] = [
  { id: "learn", label: "Learn", hint: "Concepts explained from first principles", icon: GraduationCap, color: "#45B997" },
  { id: "analyze", label: "Analyze", hint: "One project through its dossier", icon: ScanSearch, color: "#7896FF" },
  { id: "compare", label: "Compare", hint: "Two or three projects side by side", icon: GitCompareArrows, color: "#9C83E8" },
];

function suggestions(mode: CopilotMode, picked: CopilotProject[]): string[] {
  if (mode === "learn") return ["What is restaking, and what can go wrong?", "Explain data availability as if I were new to crypto", "How do token unlocks affect circulating supply?", "Comment un stablecoin garde-t-il son ancrage au dollar ?"];
  if (mode === "analyze") {
    const n = picked[0]?.name ?? "this project";
    return [`How does ${n} capture value for token holders?`, `What are the main risks in the ${n} dossier?`, `Which framework pillars are weakest for ${n}, and why?`, `What would invalidate the bull case for ${n}?`];
  }
  return ["Compare their technology trade-offs", "How do their tokens accrue value?", "Which risks do they share, and which are specific?", "Where does each one stand on adoption evidence?"];
}

const quotaFetcher = (url: string) => fetch(url).then((r) => r.json() as Promise<{ configured: boolean; signedIn: boolean; remaining: number; limit: number }>);

export function CopilotChat({ projects }: { projects: CopilotProject[] }) {
  const params = useSearchParams();
  const { user } = useAuth();
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const initialMode = (["learn", "analyze", "compare"] as const).find((m) => m === params.get("mode")) ?? (params.get("project") ? "analyze" : "learn");
  const [mode, setMode] = useState<CopilotMode>(initialMode);
  const [picked, setPicked] = useState<string[]>(() => (params.get("project") ?? "").split(",").filter((s) => bySlug.has(s)).slice(0, 3));
  const [input, setInput] = useState(params.get("q") ?? "");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const quota = useSWR(["copilot-quota", user?.id ?? "guest"], () => quotaFetcher("/api/copilot"), { revalidateOnFocus: false });

  const maxPick = mode === "compare" ? 3 : mode === "analyze" ? 1 : 0;
  const pickedProjects = picked.map((s) => bySlug.get(s)!).filter(Boolean);
  const needsProjects = (mode === "analyze" && picked.length < 1) || (mode === "compare" && picked.length < 2);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: streaming ? "auto" : "smooth" });
  }, [messages, streaming]);

  function switchMode(m: CopilotMode) {
    setMode(m);
    const max = m === "compare" ? 3 : m === "analyze" ? 1 : 0;
    setPicked((p) => p.slice(0, max));
  }

  function toggleProject(slug: string) {
    setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : maxPick === 1 ? [slug] : p.length >= maxPick ? p : [...p, slug]));
  }

  async function ask(text: string) {
    const question = text.trim();
    if (!question || streaming || needsProjects) return;
    const history: Message[] = [...messages.filter((m) => !m.error), { role: "user", content: question }];
    setMessages([...messages, { role: "user", content: question }, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;
    const update = (patch: Partial<Message>) =>
      setMessages((cur) => {
        const next = [...cur];
        next[next.length - 1] = { ...next[next.length - 1], ...patch };
        return next;
      });
    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, projects: picked, messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => ({}))) as { error?: string; signedIn?: boolean };
        update({ error: { text: j.error ?? "Something went wrong.", upgrade: res.status === 429 ? (j.signedIn ? "plans" : "signup") : undefined } });
        return;
      }
      const refsHeader = res.headers.get("X-Copilot-Context");
      const refs = refsHeader ? (JSON.parse(decodeURIComponent(refsHeader)) as ContextRef) : undefined;
      update({ refs });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        update({ content: acc });
      }
      if (!acc.trim()) update({ error: { text: "The Copilot returned an empty answer. Try rephrasing your question." } });
    } catch (err) {
      if ((err as Error).name !== "AbortError") update({ error: { text: "Connection lost. Please try again." } });
    } finally {
      setStreaming(false);
      abortRef.current = null;
      void quota.mutate();
      inputRef.current?.focus();
    }
  }

  // Questions sent from elsewhere (Overview "Ask the research"): /copilot?q=...&send=1
  const autoSent = useRef(false);
  useEffect(() => {
    if (autoSent.current) return;
    const q = params.get("q")?.trim();
    if (params.get("send") !== "1" || !q) return;
    autoSent.current = true;
    const url = new URL(window.location.href);
    url.searchParams.delete("send");
    url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off question handed over by URL, sent after mount
    void ask(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  const disabledReason = quota.data && !quota.data.configured ? "The Copilot is not configured on this deployment." : needsProjects ? (mode === "analyze" ? "Pick a project first." : "Pick at least two projects.") : null;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
      <div className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-line bg-surface">
        {/* Mode and scope */}
        <div className="border-b border-line p-4">
          <div className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-bg-elevated p-1" role="radiogroup" aria-label="Copilot mode">
            {MODES.map((m) => {
              const active = mode === m.id;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  role="radio"
                  aria-checked={active}
                  onClick={() => switchMode(m.id)}
                  className={cn("flex h-11 items-center justify-center gap-2 rounded-lg text-[13.5px] transition-colors", active ? "text-fg" : "text-muted hover:text-fg-2")}
                  style={active ? { background: tint(m.color, 0.14), boxShadow: `inset 0 0 0 1px ${tint(m.color, 0.35)}` } : undefined}
                >
                  <Icon className="size-4" style={{ color: active ? m.color : undefined }} aria-hidden />
                  <span>{m.label}</span>
                  <span className="hidden text-[11.5px] text-subtle 2xl:inline">· {m.hint}</span>
                </button>
              );
            })}
          </div>
          {maxPick > 0 ? (
            <div className="mt-3">
              <div className="mb-2 text-[12px] text-muted">
                {mode === "analyze" ? "Project to analyze" : `Projects to compare (${picked.length}/3, at least 2)`}
              </div>
              <div className="flex max-h-[92px] flex-wrap gap-1.5 overflow-y-auto">
                {projects.map((p) => {
                  const on = picked.includes(p.slug);
                  return (
                    <button
                      key={p.slug}
                      onClick={() => toggleProject(p.slug)}
                      aria-pressed={on}
                      className={cn(
                        "inline-flex h-7 items-center gap-1.5 rounded-full border pl-1 pr-2.5 text-[12px] transition-colors",
                        on ? "border-accent/60 bg-accent-soft text-fg" : "border-line text-fg-2 hover:border-line-strong",
                        !on && maxPick > 1 && picked.length >= maxPick && "opacity-40",
                      )}
                    >
                      <TokenLogo src={p.logo} name={p.name} size={18} />
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Conversation */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6" aria-live="polite">
          {messages.length === 0 ? (
            <div className="mx-auto max-w-xl py-6 text-center">
              <h2 className="serif-display text-[30px] leading-tight text-fg">
                {mode === "learn" ? "What do you want to understand?" : mode === "analyze" ? (pickedProjects[0] ? `Ask about ${pickedProjects[0].name}` : "Pick a project to analyze") : "Pick projects to compare"}
              </h2>
              <p className="mt-2 text-[13.5px] text-muted">Try one of these, or write your own question in English or French.</p>
              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {suggestions(mode, pickedProjects).map((s) => (
                  <button
                    key={s}
                    disabled={needsProjects}
                    onClick={() => ask(s)}
                    className="rounded-xl border border-line bg-bg-elevated px-3.5 py-3 text-left text-[13px] leading-snug text-fg-2 transition-colors hover:border-line-strong hover:text-fg disabled:opacity-40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-surface-3 px-4 py-2.5 text-[14px] leading-relaxed text-fg">{m.content}</div>
                </div>
              ) : (
                <div key={i} className="max-w-none">
                  {m.content ? <CopilotMarkdown text={m.content} /> : !m.error ? <Thinking /> : null}
                  {m.error ? (
                    <div className="rounded-xl border border-warning/30 bg-warning-soft px-4 py-3 text-[13.5px] text-fg-2" role="alert">
                      {m.error.text}
                      {m.error.upgrade === "signup" ? (
                        <Link href="/login?mode=signup&next=/copilot" className="ml-2 font-medium text-accent hover:text-accent-strong">
                          Create a free account
                        </Link>
                      ) : m.error.upgrade === "plans" ? (
                        <Link href="/pricing" className="ml-2 font-medium text-accent hover:text-accent-strong">
                          See plans
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                  {m.refs && (m.content || !streaming) ? <Grounding refs={m.refs} /> : null}
                </div>
              ),
            )
          )}
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <div className="border-t border-line p-3 md:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void ask(input);
            }}
            className="flex items-end gap-2 rounded-xl border border-line bg-bg-elevated p-2 focus-within:border-accent/50"
          >
            <label htmlFor="copilot-input" className="sr-only">
              Your question
            </label>
            <textarea
              id="copilot-input"
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  void ask(input);
                }
              }}
              maxLength={2000}
              placeholder={disabledReason ?? "Ask a question…"}
              className="max-h-40 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-[14px] text-fg placeholder:text-subtle focus:outline-none focus-visible:outline-none [field-sizing:content]"
            />
            {streaming ? (
              <button type="button" onClick={() => abortRef.current?.abort()} className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-fg hover:bg-line-strong" aria-label="Stop">
                <Square className="size-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || Boolean(disabledReason)}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-[#0d1020] hover:bg-accent-strong disabled:opacity-30"
                aria-label="Send"
              >
                <ArrowUp className="size-4" />
              </button>
            )}
          </form>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-[11.5px] text-subtle">
            <span>Educational answers, not investment advice. The Copilot can be wrong: check the linked sources.</span>
            <span className="flex items-center gap-3">
              {quota.data ? (
                <span className="num">
                  {quota.data.remaining}/{quota.data.limit} left today
                </span>
              ) : null}
              {messages.length ? (
                <button onClick={() => setMessages([])} disabled={streaming} className="inline-flex items-center gap-1 text-accent hover:text-accent-strong disabled:opacity-40">
                  <Plus className="size-3" aria-hidden /> New conversation
                </button>
              ) : null}
            </span>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-[14px] font-semibold text-fg">How the Copilot answers</h2>
          <ul className="mt-3 space-y-3 text-[13px] leading-relaxed text-fg-2">
            <li className="flex gap-2.5">
              <FileText className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> From Sensitor&apos;s dossiers and Academy, with links to the original sources.
            </li>
            <li className="flex gap-2.5">
              <BookOpenText className="mt-0.5 size-4 shrink-0 text-violet" aria-hidden />
              <span>
                Claims keep their label: <span className="text-positive">fact</span>, <span className="text-accent-strong">analysis</span> or <span className="text-warning">hypothesis</span>.
              </span>
            </li>
            <li className="flex gap-2.5">
              <Database className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden /> Live figures only with their provider and timestamp. Missing data is shown as n/a.
            </li>
            <li className="flex gap-2.5">
              <X className="mt-0.5 size-4 shrink-0 text-negative" aria-hidden /> No buy, sell or hold calls, no price targets.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5 text-[13px] leading-relaxed text-fg-2">
          <h2 className="text-[14px] font-semibold text-fg">Daily questions</h2>
          <p className="mt-2">
            Guests <span className="num">3</span>, free accounts <span className="num">10</span>, Pro <span className="num">100</span>, Research Club <span className="num">300</span>. Resets at
            midnight UTC.
          </p>
          {!user ? (
            <Link href="/login?mode=signup&next=/copilot" className="mt-3 inline-block font-medium text-accent hover:text-accent-strong">
              Create a free account
            </Link>
          ) : null}
          <p className="mt-3 text-[12px] text-muted">Questions are sent to OpenAI to generate the answer. Do not include personal or account information.</p>
        </div>
      </aside>
    </div>
  );
}

function Thinking() {
  return (
    <div className="flex items-center gap-2 text-[13px] text-muted">
      <span className="flex gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 animate-pulse rounded-full bg-accent" style={{ animationDelay: `${i * 150}ms` }} />
        ))}
      </span>
      Reading the research…
    </div>
  );
}

function Grounding({ refs }: { refs: ContextRef }) {
  if (!refs.projects.length && !refs.concepts.length && !refs.market) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-line pt-3 text-[11.5px]">
      <span className="mr-1 text-subtle">Grounded in</span>
      {refs.projects.map((p) => (
        <Link key={p.slug} href={`/projects/${p.slug}`} className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-0.5 text-fg-2 hover:border-accent/50 hover:text-fg">
          <FileText className="size-3 text-accent" aria-hidden /> {p.name} dossier
        </Link>
      ))}
      {refs.concepts.map((c) => (
        <Link key={c.slug} href={`/academy/concepts/${c.slug}`} className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-0.5 text-fg-2 hover:border-violet/50 hover:text-fg">
          <GraduationCap className="size-3 text-violet" aria-hidden /> {c.title}
        </Link>
      ))}
      {refs.market ? (
        <span className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-0.5 text-muted">
          <Database className="size-3 text-positive" aria-hidden /> {refs.market.source ?? "Market data n/a"}
          {refs.market.asOf ? `, ${formatDateTime(refs.market.asOf)}` : ""}
        </span>
      ) : null}
    </div>
  );
}
