import { Fragment, type ReactNode } from "react";

/**
 * Minimal inline markup for translated prose: **bold**, *emphasis* and `code`.
 * Keeps sentences whole in the dictionaries instead of splitting them around tags.
 */
export function rich(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`"))
      return (
        <code key={i} className="rounded bg-surface-2 px-1 text-[12.5px]">
          {p.slice(1, -1)}
        </code>
      );
    if (p.startsWith("*") && p.endsWith("*")) return <em key={i}>{p.slice(1, -1)}</em>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}
