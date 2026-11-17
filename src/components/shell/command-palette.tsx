"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Compass, FileText, Layers, Search, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchEntries, type SearchEntry } from "@/lib/search-index";
import { TokenLogo } from "@/components/ui/token-logo";

const TYPE_LABEL: Record<SearchEntry["type"], string> = {
  project: "Projects",
  sector: "Sectors",
  page: "Pages",
  concept: "Academy",
};

const TYPE_ICON = { sector: Layers, page: Compass, concept: BookOpen, project: FileText } as const;

export function CommandPalette({ entries, open, onOpenChange }: { entries: SearchEntry[]; open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchEntries(entries, query), [entries, query]);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setActive(0);
  }, [onOpenChange]);

  const go = useCallback(
    (entry: SearchEntry | undefined) => {
      if (!entry) return;
      close();
      router.push(entry.href);
    },
    [close, router],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        onOpenChange(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  if (!open) return null;

  // Group while preserving rank order
  const groups: { type: SearchEntry["type"]; items: { entry: SearchEntry; index: number }[] }[] = [];
  results.forEach((entry, index) => {
    let g = groups.find((x) => x.type === entry.type);
    if (!g) groups.push((g = { type: entry.type, items: [] }));
    g.items.push({ entry, index });
  });

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-[2px]" onMouseDown={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="w-full max-w-xl animate-fade-in overflow-hidden rounded-xl border border-line-strong bg-surface shadow-2xl shadow-black/50"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                go(results[active]);
              } else if (e.key === "Escape") {
                close();
              }
            }}
            placeholder="Search a project, a sector, a concept…"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
            className="h-12 flex-1 bg-transparent text-[15px] text-fg placeholder:text-subtle focus:outline-none"
          />
          <kbd className="rounded border border-line-strong px-1.5 py-0.5 text-[10px] text-subtle">ESC</kbd>
        </div>
        <div id="palette-results" role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”.</p>
          ) : (
            groups.map((g) => (
              <div key={g.type} className="mb-1">
                <div className="px-3 pb-1 pt-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-subtle">{TYPE_LABEL[g.type]}</div>
                {g.items.map(({ entry, index }) => {
                  const Icon = TYPE_ICON[entry.type];
                  return (
                    <button
                      key={entry.id}
                      id={`palette-${entry.id}`}
                      role="option"
                      aria-selected={index === active}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => go(entry)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left",
                        index === active ? "bg-surface-3" : "hover:bg-surface-2",
                      )}
                    >
                      {entry.type === "project" ? (
                        <TokenLogo src={entry.logo} name={entry.title} size={24} />
                      ) : (
                        <span className="flex size-6 items-center justify-center rounded-md bg-surface-3 text-muted">
                          <Icon className="size-3.5" aria-hidden />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-fg">{entry.title}</span>
                        {entry.subtitle ? <span className="block truncate text-xs text-muted">{entry.subtitle}</span> : null}
                      </span>
                      {index === active ? <CornerDownLeft className="size-3.5 text-subtle" aria-hidden /> : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
