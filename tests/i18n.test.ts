import { describe, expect, it } from "vitest";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import { localizeHref, splitLocale, switchLocaleHref } from "@/i18n/paths";
import { safeNext } from "@/lib/auth/redirect";
import { prefersFrench } from "@/proxy";

describe("locale paths", () => {
  it("keeps English unprefixed and prefixes French", () => {
    expect(localizeHref("en", "/markets")).toBe("/markets");
    expect(localizeHref("fr", "/markets")).toBe("/fr/markets");
    expect(localizeHref("fr", "/")).toBe("/fr");
    expect(localizeHref("fr", "/?a=1")).toBe("/fr?a=1");
    expect(localizeHref("fr", "/explore?sector=defi")).toBe("/fr/explore?sector=defi");
  });

  it("leaves external links, anchors and already localized paths alone", () => {
    expect(localizeHref("fr", "https://example.com")).toBe("https://example.com");
    expect(localizeHref("fr", "#steps")).toBe("#steps");
    expect(localizeHref("fr", "//evil.example")).toBe("//evil.example");
    expect(localizeHref("fr", "/fr/markets")).toBe("/fr/markets");
    expect(localizeHref("fr", localizeHref("fr", "/watchlist"))).toBe("/fr/watchlist");
    // a slug that merely starts with "fr" is not a locale
    expect(localizeHref("fr", "/projects/frax")).toBe("/fr/projects/frax");
  });

  it("splits and switches locales", () => {
    expect(splitLocale("/fr/markets")).toEqual({ locale: "fr", path: "/markets" });
    expect(splitLocale("/fr")).toEqual({ locale: "fr", path: "/" });
    expect(splitLocale("/markets")).toEqual({ locale: "en", path: "/markets" });
    expect(splitLocale("/frax")).toEqual({ locale: "en", path: "/frax" });
    expect(switchLocaleHref("/fr/markets", "?x=1", "en")).toBe("/markets?x=1");
    expect(switchLocaleHref("/markets", "", "fr")).toBe("/fr/markets");
    expect(switchLocaleHref("/fr", "", "en")).toBe("/");
  });

  it("accepts localized post-login destinations but never login or auth pages", () => {
    expect(safeNext("/fr/account")).toBe("/fr/account");
    expect(safeNext("/fr/login")).toBe("/overview");
    expect(safeNext("/fr/auth/callback")).toBe("/overview");
    expect(safeNext("//evil.example")).toBe("/overview");
  });
});

describe("home page language", () => {
  it("follows an explicit choice first", () => {
    expect(prefersFrench("fr", "en-US")).toBe(true);
    expect(prefersFrench("en", "fr-FR,fr;q=0.9")).toBe(false);
  });
  it("otherwise follows the browser's ranking between French and English", () => {
    expect(prefersFrench(undefined, "fr-FR,fr;q=0.9,en;q=0.8")).toBe(true);
    expect(prefersFrench(undefined, "en-GB,en;q=0.9,fr;q=0.8")).toBe(false);
    expect(prefersFrench(undefined, "de-DE,fr;q=0.7,en;q=0.5")).toBe(true);
    expect(prefersFrench(undefined, "de-DE")).toBe(false);
    expect(prefersFrench(undefined, null)).toBe(false);
  });
});

type Node = unknown;
function compare(a: Node, b: Node, path: string, problems: string[]) {
  const kind = (v: Node) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);
  if (kind(a) !== kind(b)) return problems.push(`${path}: ${kind(a)} in English, ${kind(b)} in French`);
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) problems.push(`${path}: ${a.length} items in English, ${b.length} in French`);
    a.forEach((x, i) => compare(x, b[i], `${path}[${i}]`, problems));
  } else if (kind(a) === "object") {
    const ka = Object.keys(a as object).sort();
    const kb = Object.keys(b as object).sort();
    for (const k of ka) if (!kb.includes(k)) problems.push(`${path}.${k}: missing in French`);
    for (const k of kb) if (!ka.includes(k)) problems.push(`${path}.${k}: only in French`);
    for (const k of ka) if (kb.includes(k)) compare((a as Record<string, Node>)[k], (b as Record<string, Node>)[k], `${path}.${k}`, problems);
  }
}

function strings(v: Node, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (typeof v === "function") {
    // Render functions with sample arguments to check their output too.
    const fn = v as (...args: unknown[]) => unknown;
    for (const sample of [[0], [1], [3], ["X"], ["X", "Y"]]) {
      try {
        const r = fn(...sample);
        if (typeof r === "string") out.push(r);
      } catch {
        // argument shape not supported by this sample
      }
    }
  } else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => strings(x, out));
  return out;
}

describe("dictionaries", () => {
  it("give French exactly the keys of English", () => {
    const problems: string[] = [];
    compare(en, fr, "dict", problems);
    expect(problems).toEqual([]);
  });

  it("never use long dashes", () => {
    const bad = [...strings(en), ...strings(fr)].filter((s) => /[–—]/.test(s));
    expect(bad).toEqual([]);
  });

  it("leave no French string empty where the English one has text", () => {
    const empty: string[] = [];
    const walk = (a: Node, b: Node, path: string) => {
      if (typeof a === "string" && typeof b === "string") {
        if (a.trim() && !b.trim()) empty.push(path);
      } else if (a && b && typeof a === "object" && typeof b === "object") {
        for (const k of Object.keys(a)) walk((a as Record<string, Node>)[k], (b as Record<string, Node>)[k], `${path}.${k}`);
      }
    };
    walk(en, fr, "dict");
    expect(empty).toEqual([]);
  });
});
