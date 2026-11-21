"use client";

import { useRouter } from "@/i18n/navigation";
import { useT } from "@/i18n/client";
import { Plus, X } from "lucide-react";
import { TokenLogo } from "@/components/ui/token-logo";

export interface CompareOption {
  slug: string;
  name: string;
  ticker: string;
  logo: string;
}

export function CompareSelector({ selected, options, max = 4 }: { selected: string[]; options: CompareOption[]; max?: number }) {
  const router = useRouter();
  const t = useT().compare.selector;
  const go = (next: string[]) => router.push(next.length ? `/compare?p=${next.join(",")}` : "/compare", { scroll: false });
  const bySlug = new Map(options.map((o) => [o.slug, o]));
  const available = options.filter((o) => !selected.includes(o.slug));
  return (
    <div className="flex flex-wrap items-center gap-2">
      {selected.map((s) => {
        const o = bySlug.get(s)!;
        return (
          <span key={s} className="inline-flex h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface-2 pl-2 pr-1 text-[13px] text-fg">
            <TokenLogo src={o.logo} name={o.name} size={20} />
            {o.name}
            <button
              onClick={() => go(selected.filter((x) => x !== s))}
              className="flex size-6 items-center justify-center rounded-md text-subtle hover:bg-surface-3 hover:text-fg"
              aria-label={t.remove(o.name)}
            >
              <X className="size-3.5" />
            </button>
          </span>
        );
      })}
      {selected.length < max ? (
        <label className="relative inline-flex h-9 items-center gap-2 rounded-lg border border-dashed border-line-strong px-3 text-[13px] text-muted hover:text-fg-2">
          <Plus className="size-3.5" aria-hidden />
          {t.add}
          <select
            className="absolute inset-0 cursor-pointer opacity-0"
            value=""
            onChange={(e) => e.target.value && go([...selected, e.target.value])}
            aria-label={t.addAria}
          >
            <option value="">{t.add}</option>
            {available.map((o) => (
              <option key={o.slug} value={o.slug}>
                {o.name} ({o.ticker})
              </option>
            ))}
          </select>
        </label>
      ) : (
        <span className="text-[12px] text-subtle">Maximum {max} projects</span>
      )}
    </div>
  );
}
