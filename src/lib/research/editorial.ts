/**
 * Editorial helpers for presenting dossiers as research articles: title,
 * reading time and the daily featured pick. Pure and deterministic.
 */
import { PROJECTS } from "@/content/projects";
import type { Project } from "./types";

export const WORDS_PER_MINUTE = 220;

/** Collects the prose of a dossier (claims, summaries, notes), excluding the source list. */
function prose(value: unknown, out: string[]): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => prose(v, out));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) if (k !== "sources" && k !== "issuance" && k !== "pillar" && k !== "kind") prose(v, out);
  }
  return out;
}

export function wordCount(project: Project): number {
  return prose(project.dossier, []).join(" ").split(/\s+/).filter(Boolean).length;
}

/** Estimated reading time in minutes for the full dossier (at least 1). */
export function readingMinutes(project: Project): number {
  return Math.max(1, Math.round(wordCount(project) / WORDS_PER_MINUTE));
}

export function dossierTitle(project: Project): string {
  return project.editorial.headline ?? `${project.name}: research dossier`;
}

/** Featured dossier of the day, rotating through dossiers flagged `featured` (UTC days). */
export function featuredDossierFor(date: Date, projects: Project[] = PROJECTS): Project {
  const pool = projects.filter((p) => p.featured);
  const list = pool.length ? pool : projects;
  const day = Math.floor(date.getTime() / 86_400_000);
  return list[((day % list.length) + list.length) % list.length];
}

/** Dossiers ordered as a research feed: most recently updated first, featured first on ties. */
export function researchFeed(projects: Project[] = PROJECTS): Project[] {
  return [...projects].sort(
    (a, b) => b.editorial.lastUpdated.localeCompare(a.editorial.lastUpdated) || Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name),
  );
}
