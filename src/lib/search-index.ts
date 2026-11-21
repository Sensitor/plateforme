import { PROJECTS } from "@/content/projects";
import { CONCEPTS } from "@/content/concepts";
import { SECTORS } from "@/lib/research/taxonomy";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { localizedConcept } from "@/lib/academy/localized";

export interface SearchEntry {
  id: string;
  type: "project" | "sector" | "page" | "concept";
  title: string;
  subtitle?: string;
  href: string;
  keywords: string;
  logo?: string;
}

const PAGES: (Omit<SearchEntry, "title" | "subtitle"> & { key: string })[] = [
  { id: "p-overview", key: "overview", type: "page", href: "/overview", keywords: "dashboard home" },
  { id: "p-explore", key: "explore", type: "page", href: "/explore", keywords: "projects library screener" },
  { id: "p-compare", key: "compare", type: "page", href: "/compare", keywords: "comparator versus vs" },
  { id: "p-graph", key: "graph", type: "page", href: "/graph", keywords: "map network ecosystem dependencies relationships oracle bridge" },
  { id: "p-markets", key: "markets", type: "page", href: "/markets", keywords: "market cap dominance stablecoins defi sentiment fear greed" },
  { id: "p-research", key: "research", type: "page", href: "/research", keywords: "reports dossiers analysis" },
  { id: "p-method", key: "methodology", type: "page", href: "/research/methodology", keywords: "framework score methodology pillars" },
  { id: "p-portfolio", key: "portfolio", type: "page", href: "/portfolio", keywords: "portfolio holdings positions pnl allocation csv import" },
  { id: "p-copilot", key: "copilot", type: "page", href: "/copilot", keywords: "ask question assistant chat explain learn compare analyze" },
  { id: "p-alerts", key: "alerts", type: "page", href: "/alerts", keywords: "alert notification email price threshold" },
  { id: "p-account", key: "account", type: "page", href: "/account", keywords: "login sign in account profile password" },
  { id: "p-watchlist", key: "watchlist", type: "page", href: "/watchlist", keywords: "favorites saved" },
  { id: "p-academy", key: "academy", type: "page", href: "/academy", keywords: "learn courses education" },
  { id: "p-pricing", key: "pricing", type: "page", href: "/pricing", keywords: "pricing subscription pro premium" },
];

/**
 * Search entries in the interface language. Keywords also carry the English
 * names, so a search works whichever language the visitor types in.
 */
export function buildSearchIndex(t: Dictionary = getDictionary("en"), locale: Locale = "en"): SearchEntry[] {
  const en = getDictionary("en");
  const projects: SearchEntry[] = PROJECTS.map((p) => ({
    id: `project-${p.slug}`,
    type: "project",
    title: p.name,
    subtitle: `${p.ticker} · ${t.labels.sectors[p.sector].label}`,
    href: `/projects/${p.slug}`,
    keywords: [p.ticker, p.sector, ...p.tags, p.oneLiner].join(" "),
    logo: p.logo,
  }));
  const sectors: SearchEntry[] = SECTORS.map((s) => ({
    id: `sector-${s.id}`,
    type: "sector",
    title: t.labels.sectors[s.id].label,
    subtitle: t.shell.palette.sector,
    href: `/explore?sector=${s.id}`,
    keywords: `${s.label} ${s.short} ${s.description} ${t.labels.sectors[s.id].description}`,
  }));
  const pages: SearchEntry[] = PAGES.map(({ key, ...p }) => {
    const [title, subtitle] = t.shell.palette.pages[key] ?? en.shell.palette.pages[key];
    const [enTitle, enSubtitle] = en.shell.palette.pages[key];
    return { ...p, title, subtitle, keywords: `${p.keywords} ${enTitle} ${enSubtitle}` };
  });
  const concepts: SearchEntry[] = CONCEPTS.map((c) => {
    const l = localizedConcept(c, locale);
    return {
      id: `concept-${c.slug}`,
      type: "concept",
      title: l.title,
      subtitle: t.shell.palette.concept,
      href: `/academy/concepts/${c.slug}`,
      keywords: l === c ? c.summary : `${l.summary} ${c.title} ${c.summary}`,
    };
  });
  return [...projects, ...sectors, ...pages, ...concepts];
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
