"use client";

import Link from "@/i18n/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ClaimKindBadge } from "@/components/research/pills";
import type { ClaimKind } from "@/lib/research/types";

const TAGS: [RegExp, ClaimKind][] = [
  [/\[(?:Fact|Fait)\]/gi, "fact"],
  [/\[(?:Interpretation|Interprétation|Analysis|Analyse)\]/gi, "interpretation"],
  [/\[(?:Hypothesis|Hypothèse)\]/gi, "hypothesis"],
];

/** Turns the model's [Fact] / [Interpretation] / [Hypothesis] tags into inline-code markers rendered as badges. */
export function tagClaims(md: string): string {
  return TAGS.reduce((s, [re, kind]) => s.replace(re, "`claim:" + kind + "`"), md);
}

const components: Components = {
  h1: ({ children }) => <h3 className="mb-2 mt-5 text-[16px] font-semibold text-fg first:mt-0">{children}</h3>,
  h2: ({ children }) => <h3 className="mb-2 mt-5 text-[16px] font-semibold text-fg first:mt-0">{children}</h3>,
  h3: ({ children }) => <h4 className="mb-1.5 mt-4 text-[14.5px] font-semibold text-fg first:mt-0">{children}</h4>,
  p: ({ children }) => <p className="mb-3 text-[14.5px] leading-[1.7] text-fg-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="mb-3 list-disc space-y-1.5 pl-5 text-[14.5px] leading-[1.65] text-fg-2 marker:text-subtle">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1.5 pl-5 text-[14.5px] leading-[1.65] text-fg-2 marker:text-subtle">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
  blockquote: ({ children }) => <blockquote className="mb-3 border-l-2 border-violet/50 pl-3 text-fg-2">{children}</blockquote>,
  hr: () => <hr className="my-4 border-line" />,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">
        {children}
      </a>
    ),
  code: ({ children }) => {
    const text = String(children);
    if (text.startsWith("claim:")) return <ClaimKindBadge kind={text.slice(6) as ClaimKind} className="mr-1 inline-flex align-[1px]" />;
    return <code className="num rounded bg-surface-2 px-1 py-0.5 text-[12.5px] text-fg">{children}</code>;
  },
  table: ({ children }) => (
    <div className="relative mb-3 overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-[13px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-surface-2 text-[12px] uppercase tracking-wide text-muted">{children}</thead>,
  th: ({ children }) => <th className="whitespace-nowrap px-3 py-2 font-medium">{children}</th>,
  td: ({ children }) => <td className="border-t border-line px-3 py-2 align-top text-fg-2">{children}</td>,
};

export function CopilotMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {tagClaims(text)}
    </ReactMarkdown>
  );
}
