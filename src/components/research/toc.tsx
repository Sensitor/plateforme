"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/client";

export interface TocItem {
  id: string;
  label: string;
  letter?: string;
}

/** Sticky table of contents with scroll-spy (desktop) / chip bar (mobile). */
export function Toc({ items, title = "Dossier" }: { items: TocItem[]; title?: string }) {
  const sectionsLabel = useT().dossier.toc.sections(title);
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    // The section being read is the last one whose top has passed the upper third of the screen
    // (never less than 128px, below the sticky header). Sections land 96px from the top when a
    // link is followed (scroll-mt-24), so a clicked section is always the active one.
    const MIN_OFFSET = 128;
    const ids = items.map((i) => i.id);
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = Math.max(MIN_OFFSET, window.innerHeight * 0.3);
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      // At the very bottom the last sections can never reach the top: mark the last one.
      const root = document.documentElement;
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) current = ids[ids.length - 1];
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <>
      <nav aria-label={sectionsLabel} className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto xl:block">
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-subtle">{title}</div>
        <ul className="space-y-0.5 border-l border-line">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className={cn(
                  "-ml-px flex items-baseline gap-2 border-l py-1.5 pl-3 text-[13px] transition-colors",
                  active === i.id ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg-2",
                )}
              >
                {i.letter ? <span className="num w-3 text-[11px] text-subtle">{i.letter}</span> : <span className="w-3" />}
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label={sectionsLabel} className="sticky top-16 z-10 -mx-4 overflow-x-auto border-b border-line bg-bg/90 px-4 py-2 backdrop-blur md:-mx-6 md:px-6 xl:hidden">
        <ul className="flex w-max gap-1.5">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className={cn(
                  "block whitespace-nowrap rounded-full border px-3 py-1 text-[12.5px]",
                  active === i.id ? "border-accent/50 bg-accent-soft text-fg" : "border-line text-muted",
                )}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
