import Link from "@/i18n/link";
import { ArrowRight } from "lucide-react";

/** Editorial section heading: hairline rule, serif title, optional link. */
export function SectionHeader({ id, title, href, linkLabel, children }: { id?: string; title: string; href?: string; linkLabel?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-line pt-5">
      <h2 id={id} className="serif-display text-[26px] leading-none text-fg">
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {children}
        {href ? (
          <Link href={href} className="inline-flex items-center gap-1.5 text-[13px] text-fg-2 hover:text-fg">
            {linkLabel} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/** Small uppercase label for sub-panels inside a section. */
export function PanelLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-[11px] font-medium uppercase tracking-[0.14em] text-muted ${className ?? ""}`}>{children}</h3>;
}
