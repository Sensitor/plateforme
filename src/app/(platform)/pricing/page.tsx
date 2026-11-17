import type { Metadata } from "next";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/content/plans";

export const metadata: Metadata = { title: "Plans", description: "Free, Sensitor Pro and Sensitor Research Club." };


export default function PricingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Plans"
        title="Choose how deep you want to go"
        description="Prices are indicative hypotheses. Paid subscriptions will open with Stripe in Phase 4; until then everything available in the app is free."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.id} className={cn("flex flex-col rounded-2xl border bg-surface p-6", p.highlight ? "border-accent/50" : "border-line")}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-fg">{p.name}</h2>
              <Badge tone={p.status === "Available now" ? "positive" : "outline"}>{p.status}</Badge>
            </div>
            <p className="mt-1 text-[13.5px] text-muted">{p.tagline}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="num text-3xl font-semibold text-fg">{p.price}</span>
              <span className="text-[13px] text-muted">{p.period}</span>
            </div>
            <ul className="mt-5 flex-1 space-y-2.5 text-[13.5px] text-fg-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="mt-6 h-10 cursor-not-allowed rounded-lg border border-line-strong text-[13.5px] text-muted"
              aria-disabled="true"
            >
              {p.id === "free" ? "Current plan" : "Subscriptions open in Phase 4"}
            </button>
          </div>
        ))}
      </div>
      <p className="text-[12.5px] leading-relaxed text-subtle">
        A Private Program on application is being designed with a clearly defined pedagogical and regulatory scope. No plan includes personalised buy/sell recommendations or
        performance promises.
      </p>
    </div>
  );
}
