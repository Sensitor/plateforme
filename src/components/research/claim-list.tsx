import { cn } from "@/lib/utils";
import type { Claim, ResearchSource } from "@/lib/research/types";
import { CLAIM_META } from "./pills";

/**
 * Editorial rendering of typed claims: each statement opens with a small
 * coloured kicker (Fact, Analysis, Hypothesis), like annotations in a printed
 * research note. Source numbers link to the dossier's source table, and a fact
 * without a source is flagged instead of being presented silently.
 */
export function ClaimList({ claims, sources, className, compact = false }: { claims: Claim[]; sources: ResearchSource[]; className?: string; compact?: boolean }) {
  if (!claims.length) return null;
  return (
    <ul className={cn("divide-y divide-line/60", className)}>
      {claims.map((c, i) => (
        <li key={i} className={cn("first:pt-0 last:pb-0", compact ? "py-2.5" : "py-3.5")}>
          <p className={cn("leading-relaxed text-fg-2", compact ? "text-[13.5px]" : "text-[15px]")}>
            <ClaimKicker kind={c.kind} />
            {c.text}
            <SourceRefs ids={c.sources} sources={sources} />
            {c.kind === "fact" && !c.sources?.length ? (
              <span className="ml-1.5 whitespace-nowrap text-[11px] italic text-warning" title="This fact has no source attached yet and is pending verification.">
                (source pending)
              </span>
            ) : null}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function ClaimKicker({ kind }: { kind: Claim["kind"] }) {
  const m = CLAIM_META[kind];
  return (
    <span className={cn("mr-2 inline-block align-[1px] text-[10.5px] font-semibold uppercase tracking-[0.12em]", m.text)} title={m.label}>
      {m.short}
    </span>
  );
}

export function SourceRefs({ ids, sources }: { ids?: string[]; sources: ResearchSource[] }) {
  if (!ids?.length) return null;
  return (
    <span className="ml-1 inline-flex gap-0.5 align-super text-[10px]">
      {ids.map((id) => {
        const index = sources.findIndex((s) => s.id === id);
        if (index < 0) return null;
        return (
          <a
            key={id}
            href={`#source-${id}`}
            className="num rounded px-0.5 text-accent hover:bg-accent-soft"
            title={`${sources[index].title} (${sources[index].publisher})`}
          >
            {index + 1}
          </a>
        );
      })}
    </span>
  );
}

export function ClaimGroup({ title, claims, sources, className, compact }: { title: string; claims: Claim[]; sources: ResearchSource[]; className?: string; compact?: boolean }) {
  if (!claims.length) return null;
  return (
    <div className={className}>
      <h3 className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">{title}</h3>
      <ClaimList claims={claims} sources={sources} compact={compact} />
    </div>
  );
}
