import { cn } from "@/lib/utils";

/** Report-style section: letter, serif title, hairline rule. */
export function DossierSection({
  id,
  letter,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  letter?: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-24", className)}>
      <header className="mb-7 border-b border-line pb-4">
        <div className="flex items-baseline gap-4">
          {letter ? <span className="num w-5 shrink-0 text-[13px] font-medium text-accent">{letter}</span> : <span className="w-5 shrink-0" />}
          <h2 id={`${id}-title`} className="serif-display text-[30px] leading-tight text-fg md:text-[34px]">
            {title}
          </h2>
        </div>
        {intro ? <p className="mt-1.5 pl-9 text-[13.5px] leading-relaxed text-muted">{intro}</p> : null}
      </header>
      <div className="md:pl-9">{children}</div>
    </section>
  );
}
