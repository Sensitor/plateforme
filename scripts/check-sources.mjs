#!/usr/bin/env node
/**
 * Checks that every research source URL is reachable.
 * Usage: npm run check:sources
 * Extracts URLs from src/content/projects/*.ts and the Academy lessons
 * (src/content/academy-deep.ts), no TS build needed, and
 * reports HTTP status. Some sites block automated requests (403/429): those
 * are reported as "blocked" and must be checked manually.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "src/content/projects");
const urls = new Map();
const files = [...readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "index.ts").map((f) => join(dir, f)), join(process.cwd(), "src/content/academy-deep.ts")];
for (const path of files) {
  const file = path.split("/").pop();
  const text = readFileSync(path, "utf8");
  for (const m of text.matchAll(/"(https:\/\/[^"\s]+)"/g)) {
    if (!urls.has(m[1])) urls.set(m[1], file);
  }
}

const results = [];
const queue = [...urls.entries()];
async function worker() {
  while (queue.length) {
    const [url, file] = queue.shift();
    let status;
    try {
      let res = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "user-agent": "Mozilla/5.0 (sensitor-link-check)" } });
      if (res.status === 405 || res.status === 403 || res.status === 404) {
        res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "user-agent": "Mozilla/5.0 (sensitor-link-check)" } });
      }
      status = res.status;
    } catch (e) {
      status = `ERR ${e.cause?.code ?? e.message}`;
    }
    results.push({ url, file, status });
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
const bad = results.filter((r) => typeof r.status !== "number" || r.status >= 400);
for (const r of results.sort((a, b) => a.file.localeCompare(b.file))) {
  const ok = typeof r.status === "number" && r.status < 400;
  if (!ok || process.argv.includes("--all")) console.log(`${ok ? "ok " : "BAD"} ${String(r.status).padEnd(8)} ${r.file.padEnd(16)} ${r.url}`);
}
console.log(`\n${results.length} URLs checked, ${bad.length} need attention.`);
process.exitCode = bad.length ? 1 : 0;
