import { PROJECTS } from "@/content/projects";
import { CONCEPTS } from "@/content/concepts";
import { SECTORS } from "@/lib/research/taxonomy";

export interface SearchEntry {
  id: string;
  type: "project" | "sector" | "page" | "concept";
  title: string;
  subtitle?: string;
  href: string;
  keywords: string;
  logo?: string;
}

const PAGES: SearchEntry[] = [
  { id: "p-overview", type: "page", title: "Overview", subtitle: "Dashboard", href: "/overview", keywords: "dashboard home" },
  { id: "p-explore", type: "page", title: "Explore Projects", subtitle: "Project library", href: "/explore", keywords: "projects library screener" },
  { id: "p-compare", type: "page", title: "Compare projects", subtitle: "Side-by-side comparison", href: "/compare", keywords: "comparator versus vs" },
  { id: "p-markets", type: "page", title: "Markets", subtitle: "Market intelligence", href: "/markets", keywords: "market cap dominance stablecoins defi sentiment fear greed" },
  { id: "p-research", type: "page", title: "Research library", subtitle: "All dossiers", href: "/research", keywords: "reports dossiers analysis" },
  { id: "p-method", type: "page", title: "Research methodology", subtitle: "Sensitor Research Framework", href: "/research/methodology", keywords: "framework score methodology pillars" },
  { id: "p-watchlist", type: "page", title: "Watchlist", subtitle: "Your followed projects", href: "/watchlist", keywords: "favorites saved" },
  { id: "p-academy", type: "page", title: "Academy", subtitle: "Concepts & courses", href: "/academy", keywords: "learn courses education" },
  { id: "p-pricing", type: "page", title: "Plans", subtitle: "Free, Pro, Research Club", href: "/pricing", keywords: "pricing subscription pro premium" },
];

export function buildSearchIndex(): SearchEntry[] {
  const projects: SearchEntry[] = PROJECTS.map((p) => ({
    id: `project-${p.slug}`,
    type: "project",
    title: p.name,
    subtitle: `${p.ticker} · ${SECTORS.find((s) => s.id === p.sector)?.label}`,
    href: `/projects/${p.slug}`,
    keywords: [p.ticker, p.sector, ...p.tags, p.oneLiner].join(" "),
    logo: p.logo,
  }));
  const sectors: SearchEntry[] = SECTORS.map((s) => ({
    id: `sector-${s.id}`,
    type: "sector",
    title: s.label,
    subtitle: "Sector",
    href: `/explore?sector=${s.id}`,
    keywords: `${s.short} ${s.description}`,
  }));
  const concepts: SearchEntry[] = CONCEPTS.map((c) => ({
    id: `concept-${c.slug}`,
    type: "concept",
    title: c.title,
    subtitle: "Academy concept",
    href: `/academy/concepts/${c.slug}`,
    keywords: c.summary,
  }));
  return [...projects, ...sectors, ...PAGES, ...concepts];
}

/** Rank entries for a query: prefix match on title/ticker first, then substring, then keywords. */
export function searchEntries(entries: SearchEntry[], query: string, limit = 12): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return entries.filter((e) => e.type === "project").slice(0, 8);
  const scored: { e: SearchEntry; s: number }[] = [];
  for (const e of entries) {
    const title = e.title.toLowerCase();
    const sub = (e.subtitle ?? "").toLowerCase();
    let s = 0;
    if (title === q) s = 100;
    else if (title.startsWith(q)) s = 80;
    else if (sub.split(/[\s·]+/).some((w) => w === q)) s = 75; // exact ticker
    else if (title.includes(q)) s = 60;
    else if (sub.includes(q)) s = 40;
    else if (e.keywords.toLowerCase().includes(q)) s = 20;
    if (s > 0) scored.push({ e, s: s + (e.type === "project" ? 5 : 0) });
  }
  return scored
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.e);
}
