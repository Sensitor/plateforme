"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
  letter?: string;
}

/** Sticky table of contents with scroll-spy (desktop) / chip bar (mobile). */
export function Toc({ items, title = "Dossier" }: { items: TocItem[]; title?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <nav aria-label={`${title} sections`} className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto xl:block">
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
      <nav aria-label={`${title} sections`} className="sticky top-16 z-10 -mx-4 overflow-x-auto border-b border-line bg-bg/90 px-4 py-2 backdrop-blur md:-mx-6 md:px-6 xl:hidden">
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
