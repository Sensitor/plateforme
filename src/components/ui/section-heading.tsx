import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
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
        {eyebrow ? <div className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-accent">{eyebrow}</div> : null}
        <h1 className="serif-display text-[34px] leading-[1.05] text-fg md:text-[44px]">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{description}</p> : null}
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
