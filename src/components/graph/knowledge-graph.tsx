"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ExternalLink, List, Network, RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatUsdCompact } from "@/lib/format";
import { SECTOR_COLORS, tint } from "@/lib/brand";
import { RELATION_META, type RelationKind } from "@/content/relationships";
import type { GraphEdge, GraphHalo, GraphNode } from "@/lib/graph-layout";
import { GRAPH_HEIGHT, GRAPH_WIDTH } from "@/lib/graph-layout";
import { Delta } from "@/components/ui/delta";
import { SectorBadge } from "@/components/ui/sector-badge";
import { TokenLogo } from "@/components/ui/token-logo";

const KINDS = Object.keys(RELATION_META) as RelationKind[];

function evidenceHref(evidence: string): { href: string; external: boolean; label: string } {
  if (evidence.startsWith("dossier:")) {
    const [slug, section] = evidence.slice(8).split("#");
    return { href: `/projects/${slug}${section ? `#${section}` : ""}`, external: false, label: "Dossier" };
  }
  return { href: evidence, external: true, label: "Official docs" };
}

/** Line between two node centres, trimmed so it starts and ends at the circle edges. */
function edgePath(a: GraphNode, b: GraphNode, curve: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const x1 = a.x + ux * (a.r + 3);
  const y1 = a.y + uy * (a.r + 3);
  const x2 = b.x - ux * (b.r + 7);
  const y2 = b.y - uy * (b.r + 7);
  const mx = (x1 + x2) / 2 - uy * curve;
  const my = (y1 + y2) / 2 + ux * curve;
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
}

export function KnowledgeGraph({ nodes, edges, halos, marketNote }: { nodes: GraphNode[]; edges: GraphEdge[]; halos: GraphHalo[]; marketNote?: React.ReactNode }) {
  const searchParams = useSearchParams();
  const bySlug = useMemo(() => new Map(nodes.map((n) => [n.slug, n])), [nodes]);
  const initial = searchParams.get("focus");
  const [selected, setSelected] = useState<string | null>(initial && bySlug.has(initial) ? initial : null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [kinds, setKinds] = useState<Set<RelationKind>>(new Set(KINDS));
  const [focusOnly, setFocusOnly] = useState(Boolean(initial && bySlug.has(initial)));
  const [view, setView] = useState<"graph" | "list">("graph");
  const [query, setQuery] = useState("");

  const visibleEdges = useMemo(() => edges.filter((e) => kinds.has(e.kind)), [edges, kinds]);
  const active = hovered ?? selected;
  const neighbours = useMemo(() => {
    if (!active) return null;
    const set = new Set<string>([active]);
    for (const e of visibleEdges) {
      if (e.from === active) set.add(e.to);
      if (e.to === active) set.add(e.from);
    }
    return set;
  }, [active, visibleEdges]);
  const focusSet = focusOnly && selected ? neighbours : null;

  const kindCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const e of edges) c[e.kind] = (c[e.kind] ?? 0) + 1;
    return c;
  }, [edges]);

  const selectedNode = selected ? bySlug.get(selected) : null;
  const selectedEdges = selected ? visibleEdges.filter((e) => e.from === selected || e.to === selected) : [];
  const matches = query.trim() ? nodes.filter((n) => `${n.name} ${n.ticker}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6) : [];

  const toggleKind = (k: RelationKind) =>
    setKinds((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  const select = (slug: string | null) => {
    setSelected(slug);
    if (!slug) setFocusOnly(false);
  };

  // Parallel edges between the same pair get opposite curvature
  const pairIndex = new Map<string, number>();

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-1.5 sm:w-auto sm:flex-wrap" role="group" aria-label="Relationship types">
          {KINDS.map((k) => {
            const m = RELATION_META[k];
            const on = kinds.has(k);
            return (
              <button
                key={k}
                onClick={() => toggleKind(k)}
                aria-pressed={on}
                className={cn("inline-flex h-8 items-center gap-2 rounded-full border px-3 text-[12.5px] transition-colors", on ? "text-fg" : "border-line text-subtle line-through")}
                style={on ? { borderColor: tint(m.color, 0.5), backgroundColor: tint(m.color, 0.12) } : undefined}
              >
                <svg width="18" height="6" aria-hidden>
                  <line x1="0" y1="3" x2="18" y2="3" stroke={m.color} strokeWidth="2" strokeDasharray={m.dashed ? "4 3" : undefined} />
                </svg>
                {m.label}
                <span className="num text-subtle">{kindCounts[k] ?? 0}</span>
              </button>
            );
          })}
        </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a project"
              aria-label="Find a project in the graph"
              className="h-9 w-48 rounded-lg border border-line bg-surface pl-8 pr-2 text-[13px] text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none"
            />
            {matches.length ? (
              <ul className="absolute right-0 top-full z-20 mt-1 w-56 overflow-hidden rounded-lg border border-line-strong bg-surface-2 shadow-xl">
                {matches.map((n) => (
                  <li key={n.slug}>
                    <button
                      onClick={() => {
                        select(n.slug);
                        setQuery("");
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-fg hover:bg-surface-3"
                    >
                      <TokenLogo src={n.logo} name={n.name} size={18} /> {n.name} <span className="text-subtle">{n.ticker}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <button
            onClick={() => setView(view === "graph" ? "list" : "graph")}
            className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-lg border border-line-strong bg-surface-2 px-3 text-[13px] text-fg-2 hover:bg-surface-3"
          >
            {view === "graph" ? <List className="size-4" aria-hidden /> : <Network className="size-4" aria-hidden />}
            {view === "graph" ? "List view" : "Graph view"}
          </button>
        </div>
      </div>

      {view === "list" ? (
        <RelationshipTable edges={visibleEdges} bySlug={bySlug} />
      ) : (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
          {/* Graph */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-elevated">
            <div className="absolute left-4 top-3 z-10 hidden text-[11.5px] text-subtle sm:block">Click a project to see its environment. Node size follows market cap.</div>
            <div className="absolute bottom-3 left-4 z-10 hidden flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-muted sm:flex">
              {halos.map((h) => (
                <span key={h.id} className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm" style={{ backgroundColor: tint(h.color, 0.45) }} aria-hidden />
                  {h.label}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full border border-line-strong" aria-hidden />
                Ring colour = sector
              </span>
            </div>
            {selected ? (
              <div className="absolute bottom-3 right-3 z-10 flex gap-2">
                <button
                  onClick={() => setFocusOnly((v) => !v)}
                  aria-pressed={focusOnly}
                  className={cn("h-8 rounded-lg border px-3 text-[12.5px]", focusOnly ? "border-accent/50 bg-accent-soft text-fg" : "border-line-strong bg-surface text-fg-2")}
                >
                  Focus on {selectedNode?.name}
                </button>
                <button onClick={() => select(null)} className="flex size-8 items-center justify-center rounded-lg border border-line-strong bg-surface text-fg-2" aria-label="Reset selection">
                  <RotateCcw className="size-3.5" />
                </button>
              </div>
            ) : null}
            <svg viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`} className="block h-auto w-full" role="img" aria-label="Knowledge graph of relationships between covered projects" onClick={() => select(null)}>
              <defs>
                {KINDS.filter((k) => RELATION_META[k].directed).map((k) => (
                  <marker key={k} id={`arrow-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M0,1 L9,5 L0,9 z" fill={RELATION_META[k].color} />
                  </marker>
                ))}
                {nodes.map((n) => (
                  <clipPath key={n.slug} id={`clip-${n.slug}`}>
                    <circle cx={n.x} cy={n.y} r={n.r - 3} />
                  </clipPath>
                ))}
              </defs>

              {halos.map((h) => (
                <g key={h.id} opacity={neighbours ? 0 : 0.07} fill={h.color} aria-hidden className="transition-opacity duration-200">
                  {h.discs.map((d, i) => (
                    <circle key={i} cx={d.x} cy={d.y} r={d.r} />
                  ))}
                </g>
              ))}

              {visibleEdges.map((e, i) => {
                const a = bySlug.get(e.from);
                const b = bySlug.get(e.to);
                if (!a || !b) return null;
                const key = [e.from, e.to].sort().join("|");
                const idx = pairIndex.get(key) ?? 0;
                pairIndex.set(key, idx + 1);
                const m = RELATION_META[e.kind];
                const touches = neighbours ? e.from === active || e.to === active : false;
                const hidden = focusSet && !(focusSet.has(e.from) && focusSet.has(e.to) && (e.from === selected || e.to === selected));
                const opacity = hidden ? 0.03 : neighbours ? (touches ? 0.95 : 0.07) : 0.55;
                return (
                  <path
                    key={i}
                    d={edgePath(a, b, 18 + idx * 22)}
                    fill="none"
                    stroke={m.color}
                    strokeWidth={touches ? 2.2 : 1.4}
                    strokeDasharray={m.dashed ? "5 4" : undefined}
                    markerEnd={m.directed ? `url(#arrow-${e.kind})` : undefined}
                    opacity={opacity}
                    className="transition-opacity duration-200"
                  >
                    <title>{`${a.name} ${m.verb} ${b.name}: ${e.note}`}</title>
                  </path>
                );
              })}

              {nodes.map((n) => {
                const color = SECTOR_COLORS[n.sector];
                const dim = (focusSet && !focusSet.has(n.slug)) || (neighbours && !neighbours.has(n.slug));
                const isSel = selected === n.slug;
                return (
                  <g
                    key={n.slug}
                    role="button"
                    tabIndex={0}
                    aria-label={`${n.name}, ${n.sectorLabel}`}
                    aria-pressed={isSel}
                    onMouseEnter={() => setHovered(n.slug)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(n.slug)}
                    onBlur={() => setHovered(null)}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      select(isSel ? null : n.slug);
                    }}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        select(isSel ? null : n.slug);
                      }
                    }}
                    className="cursor-pointer outline-none"
                    opacity={dim ? 0.18 : 1}
                    style={{ transition: "opacity 200ms" }}
                  >
                    {isSel ? <circle cx={n.x} cy={n.y} r={n.r + 8} fill={tint(color, 0.18)} stroke={tint(color, 0.6)} /> : null}
                    <circle cx={n.x} cy={n.y} r={n.r} fill="var(--surface)" stroke={color} strokeWidth={isSel ? 3 : 2} />
                    <image href={n.logo} x={n.x - n.r + 3} y={n.y - n.r + 3} width={(n.r - 3) * 2} height={(n.r - 3) * 2} clipPath={`url(#clip-${n.slug})`} preserveAspectRatio="xMidYMid slice" />
                    <text x={n.x} y={n.y + n.r + 18} textAnchor="middle" className="fill-[var(--fg-2)] text-[15px] font-medium" style={{ paintOrder: "stroke", stroke: "var(--bg-elevated)", strokeWidth: 4 }}>
                      {n.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Side panel */}
          <aside className="rounded-2xl border border-line bg-surface p-5 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7.5rem)] xl:overflow-y-auto">
            {selectedNode ? (
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <TokenLogo src={selectedNode.logo} name={selectedNode.name} size={44} />
                  <div className="min-w-0">
                    <div className="serif-display text-[28px] leading-none text-fg">{selectedNode.name}</div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <SectorBadge sector={selectedNode.sector} />
                      <span className="num text-[12px] text-subtle">{selectedNode.ticker}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[13.5px] leading-relaxed text-fg-2">{selectedNode.oneLiner}</p>
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line text-[12px]">
                  <div className="bg-bg-elevated px-3 py-2">
                    <dt className="text-subtle">Price</dt>
                    <dd className="num mt-0.5 text-[14px] text-fg">
                      {formatPrice(selectedNode.price)} <Delta value={selectedNode.change24h} className="text-[11.5px]" />
                    </dd>
                  </div>
                  <div className="bg-bg-elevated px-3 py-2">
                    <dt className="text-subtle">Market cap</dt>
                    <dd className="num mt-0.5 text-[14px] text-fg">{formatUsdCompact(selectedNode.marketCap)}</dd>
                  </div>
                </dl>
                {marketNote}
                <div>
                  <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Relationships <span className="num text-subtle">{selectedEdges.length}</span>
                  </h3>
                  <ul className="space-y-3">
                    {selectedEdges.map((e, i) => {
                      const m = RELATION_META[e.kind];
                      const other = bySlug.get(e.from === selected ? e.to : e.from)!;
                      const from = bySlug.get(e.from)!;
                      const to = bySlug.get(e.to)!;
                      const ev = evidenceHref(e.evidence);
                      return (
                        <li key={i} className="border-l-2 pl-3" style={{ borderColor: m.color }}>
                          <div className="text-[13px] text-fg">
                            {from.name} <span className="text-muted">{m.verb}</span> {to.name}
                          </div>
                          <p className="mt-0.5 text-[12px] leading-relaxed text-muted">{e.note}</p>
                          <div className="mt-1 flex gap-3 text-[11.5px]">
                            <button onClick={() => select(other.slug)} className="text-accent hover:text-accent-strong">
                              Go to {other.name}
                            </button>
                            {ev.external ? (
                              <a href={ev.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-subtle hover:text-fg-2">
                                {ev.label} <ExternalLink className="size-3" aria-hidden />
                              </a>
                            ) : (
                              <Link href={ev.href} className="text-subtle hover:text-fg-2">
                                {ev.label}
                              </Link>
                            )}
                          </div>
                        </li>
                      );
                    })}
                    {selectedEdges.length === 0 ? <li className="text-[12.5px] text-muted">No relationship of the selected types.</li> : null}
                  </ul>
                </div>
                <Link href={`/projects/${selectedNode.slug}`} className="flex items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-[13.5px] font-semibold text-[#0d1020]">
                  Open the research dossier <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="serif-display text-[26px] leading-tight text-fg">How to read the map</div>
                <p className="text-[13.5px] leading-relaxed text-fg-2">
                  Each circle is a project covered by Sensitor, ringed in its sector colour. Lines are documented relationships: where a protocol settles, where it is deployed,
                  which oracle it relies on, who it competes with.
                </p>
                <ul className="space-y-2 text-[13px] text-fg-2">
                  <li>Hover a project to highlight its connections.</li>
                  <li>Click it to open its environment on the right.</li>
                  <li>Toggle relationship types above to simplify the map.</li>
                </ul>
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line text-center">
                  <div className="bg-bg-elevated py-3">
                    <div className="num text-xl text-fg">{nodes.length}</div>
                    <div className="text-[11.5px] text-subtle">projects</div>
                  </div>
                  <div className="bg-bg-elevated py-3">
                    <div className="num text-xl text-fg">{edges.length}</div>
                    <div className="text-[11.5px] text-subtle">relationships</div>
                  </div>
                </div>
                <p className="text-[11.5px] leading-relaxed text-subtle">
                  Every relationship links to the dossier section or official documentation that supports it. Announced partnerships are not shown unless they correspond to a
                  live integration.
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function RelationshipTable({ edges, bySlug }: { edges: GraphEdge[]; bySlug: Map<string, GraphNode> }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[760px] text-[13px]">
          <thead>
            <tr className="border-b border-line text-left text-[11px] uppercase tracking-wide text-subtle">
              <th scope="col" className="py-2.5 pl-4 font-medium">From</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Relationship</th>
              <th scope="col" className="px-3 py-2.5 font-medium">To</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Detail</th>
              <th scope="col" className="px-3 py-2.5 pr-4 font-medium">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {edges.map((e, i) => {
              const a = bySlug.get(e.from)!;
              const b = bySlug.get(e.to)!;
              const m = RELATION_META[e.kind];
              const ev = evidenceHref(e.evidence);
              return (
                <tr key={i} className="border-b border-line/70 align-top last:border-0">
                  <td className="py-3 pl-4">
                    <Link href={`/projects/${a.slug}`} className="inline-flex items-center gap-2 text-fg hover:text-accent-strong">
                      <TokenLogo src={a.logo} name={a.name} size={18} /> {a.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap" style={{ color: m.color }}>
                      <span className="size-1.5 rounded-full" style={{ backgroundColor: m.color }} aria-hidden /> {m.label}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <Link href={`/projects/${b.slug}`} className="inline-flex items-center gap-2 text-fg hover:text-accent-strong">
                      <TokenLogo src={b.logo} name={b.name} size={18} /> {b.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 leading-relaxed text-fg-2">{e.note}</td>
                  <td className="px-3 py-3 pr-4">
                    {ev.external ? (
                      <a href={ev.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-strong">
                        {ev.label}
                      </a>
                    ) : (
                      <Link href={ev.href} className="text-accent hover:text-accent-strong">
                        {ev.label}
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
