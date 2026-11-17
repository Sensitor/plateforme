import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-accent text-[#0d1020] hover:bg-accent-strong font-semibold",
  secondary: "border border-line-strong bg-surface-2 text-fg hover:bg-surface-3",
  ghost: "text-fg-2 hover:bg-surface-2 hover:text-fg",
  outline: "border border-line-strong text-fg hover:border-muted",
} as const;

const sizes = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-[15px] gap-2",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

const base =
  "inline-flex items-center justify-center rounded-lg transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

export function ButtonLink({
  href,
  variant = "secondary",
  size = "md",
  className,
  children,
  external,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, variants[variant], sizes[size], className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button type="button" className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
