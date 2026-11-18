/**
 * Grounding for the Research Copilot. Builds a compact, plain-text context
 * from Sensitor's own research (dossier claims with their sources, framework
 * pillars, risks, concepts) plus live quotes with provider and timestamp.
 * Pure functions: no network access, unit-tested.
 */
import { PROJECTS, PROJECT_BY_SLUG } from "@/content/projects";
import { CONCEPTS, CONCEPT_BY_SLUG, type Concept } from "@/content/concepts";
import { CHAINS, PILLAR_BY_ID, RISK_CATEGORIES, SECTOR_BY_ID } from "@/lib/research/taxonomy";
import type { Claim, Project } from "@/lib/research/types";
import type { DataResult, Quote } from "@/lib/market/types";
import { formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";

export type CopilotMode = "learn" | "analyze" | "compare";
export const COPILOT_MODES: CopilotMode[] = ["learn", "analyze", "compare"];

export interface ContextRef {
  projects: { slug: string; name: string }[];
  concepts: { slug: string; title: string }[];
  market: { source: string | null; asOf: string | null; status: string } | null;
}

const KIND_TAG: Record<Claim["kind"], string> = { fact: "Fact", interpretation: "Interpretation", hypothesis: "Hypothesis" };

function claimLines(claims: Claim[] | undefined, max = 99): string[] {
  return (claims ?? []).slice(0, max).map((c) => `- [${KIND_TAG[c.kind]}] ${c.text}${c.sources?.length ? ` (sources: ${c.sources.join(", ")})` : ""}`);
}

function section(title: string, lines: string[]): string {
  return lines.length ? `### ${title}\n${lines.join("\n")}` : "";
}

function quoteBlock(project: Project, quotes: DataResult<Record<string, Quote>> | null): string {
  const q = quotes?.data?.[project.slug];
  if (!q) return `### Live market data\nUnavailable right now (n/a). Do not quote any price or market cap for ${project.name}.`;
  const src = quotes?.source?.name ?? "n/a";
  const asOf = q.lastUpdated ?? quotes?.asOf ?? "n/a";
  return [
    `### Live market data (provider: ${src}, observed: ${asOf})`,
    `- Price: ${formatPrice(q.price)}; 24h: ${formatPercent(q.change24h)}; 7d: ${formatPercent(q.change7d)}; 30d: ${formatPercent(q.change30d)}`,
    `- Market cap: ${formatUsdCompact(q.marketCap)}; FDV: ${formatUsdCompact(q.fdv)}; 24h volume: ${formatUsdCompact(q.volume24h)}; rank: ${q.rank ?? "n/a"}`,
    `- From all-time high: ${formatPercent(q.athChangePct)}`,
  ].join("\n");
}

/** Detailed context for one project (Analyze mode). */
export function projectContext(project: Project, quotes: DataResult<Record<string, Quote>> | null, depth: "full" | "brief" = "full"): string {
  const d = project.dossier;
  const full = depth === "full";
  const head = [
    `## PROJECT: ${project.name} (${project.ticker}), page /projects/${project.slug}`,
    `Sector: ${SECTOR_BY_ID[project.sector].label}. Chains: ${project.chains.map((c) => CHAINS[c].label).join(", ")}. Launched: ${project.launched}. Maturity: ${project.maturity}. Sensitor risk level: ${project.riskLevel}.`,
    `Dossier status: ${project.editorial.status}, last updated ${project.editorial.lastUpdated}, version ${project.editorial.version}.`,
    `One-liner: ${project.oneLiner}`,
    `Summary: ${d.overview.summary}`,
  ].join("\n");

  const parts = [
    head,
    section("Problem and value proposition", [...claimLines(d.overview.problem), ...claimLines(d.overview.valueProposition)]),
    section("Positioning", claimLines(d.overview.positioning)),
    full ? section("Team and governance", claimLines(d.overview.team)) : "",
    full ? section("Technology", d.technology.blocks.flatMap((b) => claimLines(b.claims).map((l) => l.replace("- ", `- (${b.topic}) `)))) : "",
    section("Technology limitations", claimLines(d.technology.limitations, full ? 99 : 3)),
    section("Tokenomics", [
      `- Supply model: ${d.tokenomics.supplyModel}. ${d.tokenomics.supplyModelNote} Max supply: ${d.tokenomics.maxSupply ?? "none (no hard cap)"}.`,
      ...claimLines(d.tokenomics.utility, full ? 99 : 2),
      ...claimLines(d.tokenomics.valueAccrual),
      ...(full ? [...claimLines(d.tokenomics.emissions), ...claimLines(d.tokenomics.vesting), ...claimLines(d.tokenomics.concentration)] : []),
    ]),
    section("Adoption", [...claimLines(d.adoption.claims, full ? 99 : 3), ...(full ? [`- Metrics to watch: ${d.adoption.metricsToWatch.join("; ")}`] : [])]),
    full ? section("Financials", [`- Business model: ${d.financials.model}`, ...claimLines(d.financials.claims)]) : "",
    full ? section("Onchain", [...claimLines(d.onchain.claims), `- Data availability: ${d.onchain.dataAvailability}`]) : "",
    section(
      "Competitors",
      d.competitors.columns.map((c) =>
        full
          ? `- ${c.name}: technology: ${c.technology}; adoption: ${c.adoption}; tokenomics: ${c.tokenomics}; economics: ${c.economics}; strengths: ${c.strengths}; weaknesses: ${c.weaknesses}; positioning: ${c.positioning}`
          : `- ${c.name}: strengths: ${c.strengths}; weaknesses: ${c.weaknesses}; positioning: ${c.positioning}`,
      ),
    ),
    section(
      "Risks",
      d.risks.flatMap((r) => [`- ${RISK_CATEGORIES[r.category]} risk, level ${r.level}:`, ...claimLines(r.claims, full ? 99 : 2).map((l) => `  ${l}`)]),
    ),
    section(
      "Sensitor Research Framework (7 pillars, 1 to 5, no composite score is published)",
      d.framework.map((p) => `- ${PILLAR_BY_ID[p.pillar].label}: ${p.rating ?? "not rated"}${p.rating ? "/5" : ""}, confidence ${p.confidence}. ${p.summary}${full ? ` Limitations: ${p.limitations}` : ""}`),
    ),
    section("Scenarios", [
      ...claimLines(d.thesis.bull, full ? 99 : 2).map((l) => l.replace("- ", "- Bull case: ")),
      ...(full ? claimLines(d.thesis.neutral).map((l) => l.replace("- ", "- Neutral case: ")) : []),
      ...claimLines(d.thesis.bear, full ? 99 : 2).map((l) => l.replace("- ", "- Bear case: ")),
      ...(full ? claimLines(d.thesis.catalysts).map((l) => l.replace("- ", "- Catalyst: ")) : []),
      ...(full ? [`- What to monitor: ${d.thesis.monitor.join("; ")}`, `- Invalidation signals: ${d.thesis.invalidation.join("; ")}`] : []),
    ]),
    quoteBlock(project, quotes),
    section(
      "Sources (cite with a markdown link to the url)",
      d.sources.map((s) => `- ${s.id}: "${s.title}", ${s.publisher}${s.published ? `, ${s.published}` : ""}, reliability ${s.reliability}, url ${s.url}`),
    ),
  ];
  return parts.filter(Boolean).join("\n\n");
}

function conceptContext(c: Concept): string {
  return [`## CONCEPT: ${c.title} (${c.level}), page /academy/concepts/${c.slug}`, c.summary, ...c.body, `Key takeaways: ${c.keyTakeaways.join("; ")}`].join("\n");
}

const STOP = new Set(
  "the a an of and or to in on for is are what how why does do with vs versus between about can my its it this that value values token tokens crypto price current include explain project projects holders de la le les des du et ou en un une est que qui quoi comment pourquoi valeur prix projet".split(" "),
);
const words = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

/** Concepts most relevant to a question (simple keyword overlap, titles weigh more). */
export function matchConcepts(question: string, limit = 4): Concept[] {
  const q = new Set(words(question));
  if (!q.size) return [];
  return CONCEPTS.map((c) => {
    const title = words(c.title + " " + c.slug.replace(/-/g, " "));
    const body = words(c.summary + " " + c.keyTakeaways.join(" "));
    const score = title.filter((w) => q.has(w)).length * 3 + body.filter((w) => q.has(w)).length;
    return { c, score };
  })
    .filter((x) => x.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.c);
}

/** Projects named in a question, by name, ticker or slug (word boundaries). */
export function detectProjects(question: string, limit = 3): string[] {
  const text = ` ${question.toLowerCase()} `;
  const found: string[] = [];
  for (const p of PROJECTS) {
    const keys = [p.name.toLowerCase(), p.slug.replace(/-/g, " "), p.ticker.toLowerCase()];
    if (keys.some((k) => k.length >= 3 && new RegExp(`[^a-z0-9]${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^a-z0-9]`).test(text))) found.push(p.slug);
  }
  return found.slice(0, limit);
}

export interface BuiltContext {
  text: string;
  refs: ContextRef;
}

export function buildContext(mode: CopilotMode, question: string, selected: string[], quotes: DataResult<Record<string, Quote>> | null): BuiltContext {
  const valid = selected.filter((s) => PROJECT_BY_SLUG[s]);
  const slugs = mode === "learn" ? [...new Set([...valid, ...detectProjects(question, 2)])].slice(0, 2) : (valid.length ? valid : detectProjects(question, mode === "compare" ? 3 : 1)).slice(0, mode === "compare" ? 3 : 1);
  const projects = slugs.map((s) => PROJECT_BY_SLUG[s]);
  const concepts = matchConcepts(question, mode === "learn" ? 4 : 2);
  // Concepts the selected dossiers rely on (Learn by Research), when there is room.
  if (mode === "analyze" && projects[0]) {
    for (const slug of projects[0].dossier.concepts) {
      const c = CONCEPT_BY_SLUG[slug];
      if (c && concepts.length < 4 && !concepts.includes(c) && words(question).some((w) => c.title.toLowerCase().includes(w))) concepts.push(c);
    }
  }

  const depth = mode === "analyze" ? "full" : "brief";
  const blocks = [
    ...projects.map((p) => projectContext(p, quotes, depth)),
    ...concepts.map(conceptContext),
    `## COVERAGE\nSensitor covers ${PROJECTS.length} projects: ${PROJECTS.map((p) => `${p.name} (/projects/${p.slug})`).join(", ")}. Academy concepts available: ${CONCEPTS.map((c) => `${c.title} (/academy/concepts/${c.slug})`).join(", ")}.`,
  ];
  return {
    text: blocks.join("\n\n---\n\n"),
    refs: {
      projects: projects.map((p) => ({ slug: p.slug, name: p.name })),
      concepts: concepts.map((c) => ({ slug: c.slug, title: c.title })),
      market: projects.length && quotes ? { source: quotes.source?.name ?? null, asOf: quotes.asOf, status: quotes.status } : null,
    },
  };
}
