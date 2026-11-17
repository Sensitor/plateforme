import { cn } from "@/lib/utils";

/** Self-hosted project logo (public/logos) with a monogram fallback. */
export function TokenLogo({ src, name, size = 32, className }: { src?: string | null; name: string; size?: number; className?: string }) {
  if (!src) {
    return (
      <span
        aria-hidden
        style={{ width: size, height: size, fontSize: size * 0.38 }}
        className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-surface-3 font-semibold text-fg-2", className)}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny self-hosted icons; no optimisation needed
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className={cn("shrink-0 rounded-full bg-surface-3 object-cover", className)}
      style={{ width: size, height: size }}
    />
  );
}
