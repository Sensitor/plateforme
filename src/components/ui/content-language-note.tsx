"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/client";

/** On French pages, says that the research or lesson text below is still in English. Renders nothing in English. */
export function ContentLanguageNote({ className }: { className?: string }) {
  const note = useT().common.contentInEnglish;
  if (!note) return null;
  return (
    <p className={cn("flex items-center gap-2 text-[12.5px] text-muted", className)} lang="fr">
      <Languages className="size-3.5 shrink-0" aria-hidden />
      {note}
    </p>
  );
}
