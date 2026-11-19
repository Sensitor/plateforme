import { cn } from "@/lib/utils";

/**
 * Page heading used across the platform: compact serif title, one-line
 * description, optional actions. (`eyebrow` is accepted for compatibility
 * but no longer rendered: the sidebar already shows where the page lives.)
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="min-w-0">
        <h1 className="serif-display text-[38px] leading-none text-fg md:text-[44px]">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-2">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionTitle({ title, description, action, id, className }: { title: string; description?: string; action?: React.ReactNode; id?: string; className?: string }) {
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4", className)}>
      <div>
        <h2 id={id} className="serif-display text-[26px] leading-tight text-fg">
          {title}
        </h2>
        {description ? <p className="mt-0.5 text-[13px] text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
