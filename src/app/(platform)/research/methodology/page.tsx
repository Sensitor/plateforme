import type { Metadata } from "next";
import Link from "next/link";
import { PILLARS } from "@/lib/research/taxonomy";
import { PageHeader } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClaimKindBadge } from "@/components/research/pills";

export const metadata: Metadata = { title: "Research methodology", description: "The Sensitor Research Framework: how projects are analysed, rated and sourced." };

const PROVIDERS = [
  { name: "CoinGecko", use: "Prices, market cap, FDV, supply, 7d sparklines, altcoin breadth", terms: "https://www.coingecko.com/en/api_terms", note: "Primary market source. Public API works keyless with rate limits; a Demo/Pro key is recommended in production." },
  { name: "CoinPaprika", use: "Fallback for prices and global metrics", terms: "https://coinpaprika.com/api/", note: "Used automatically if CoinGecko is unavailable. Sparklines are not available from the fallback." },
  { name: "DefiLlama", use: "TVL, fees, revenue, stablecoins, historical prices", terms: "https://defillama.com/docs/api", note: "Open data with open-source adapters; methodology varies by protocol." },
  { name: "Alternative.me", use: "Crypto Fear & Greed Index", terms: "https://alternative.me/crypto/fear-and-greed-index/", note: "Free API with attribution." },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <PageHeader
        eyebrow="Research"
        title="The Sensitor Research Framework"
        description="Our analyses are designed to be transparent and reproducible: you should be able to see what we know, how we know it, and where we are guessing."
      />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-fg">1. Three kinds of statements</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">Every statement in a dossier is typed. The type is shown next to it, everywhere.</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { k: "fact" as const, t: "Verifiable from a cited source: protocol rules, documented events, published parameters. A fact without a source is flagged “source pending”." },
            { k: "interpretation" as const, t: "The analyst's reading of the facts: comparisons, assessments, judgements. Reasonable people can disagree." },
            { k: "hypothesis" as const, t: "A forward-looking or uncertain claim. Hypotheses are what the thesis depends on and what could be wrong." },
          ].map((x) => (
            <Card key={x.k} className="p-4">
              <ClaimKindBadge kind={x.k} />
              <p className="mt-3 text-[13px] leading-relaxed text-fg-2">{x.t}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-fg">2. Seven pillars, rated separately</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">
          Each project is assessed on seven pillars on a 1-5 scale (higher = more favourable). Each rating states its criteria, the data used, the sources, the limitations and a
          confidence level. A pillar can be left <strong>not rated</strong> when data is insufficient.
        </p>
        <div className="space-y-3">
          {PILLARS.map((p, i) => (
            <Card key={p.id} className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[15px] font-medium text-fg">
                  <span className="num mr-2 text-accent">{i + 1}</span>
                  {p.label}
                </h3>
                <span className="text-[12px] text-subtle">{p.scaleNote}</span>
              </div>
              <p className="mt-1 text-[13.5px] text-muted">{p.question}</p>
              <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-[13px] text-fg-2 sm:grid-cols-2">
                {p.criteria.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden /> {c}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">3. When we publish a composite score, and when we don&apos;t</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">
          The composite is the unweighted mean of the seven pillar ratings. It is <strong>withheld</strong> (shown as “n/a” with the reason) when any pillar is not rated or any
          pillar is rated with low confidence. A single number built on thin data would be misleading, so we prefer to show nothing.
        </p>
        <p className="text-[14.5px] leading-relaxed text-fg-2">
          Confidence reflects data quality: <Badge tone="neutral">High</Badge> primary sources and robust data · <Badge tone="neutral">Medium</Badge> partial data or reliance on
          aggregators · <Badge tone="neutral">Low</Badge> sparse, self-reported or unverifiable data.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">4. Metrics adapted to the business model</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">
          A Layer 1, a lending protocol and a stablecoin are not analysed with the same metrics. Each dossier declares its business model (settlement layer, rollup, lending,
          exchange, staking protocol, middleware, synthetic dollar, tokenisation, compute network, gaming platform) and lists the metrics that matter for it and why. We
          distinguish <em>fees</em> (paid by users) from <em>revenue</em> (retained by the protocol or its token holders).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">5. Sources and editorial process</h2>
        <ul className="space-y-2 text-[14.5px] leading-relaxed text-fg-2">
          <li>• Primary sources first: whitepapers, official documentation, governance records and regulatory filings; aggregators and research second.</li>
          <li>• Each source lists what it supports, its publication date, the date its link was last checked, its reliability and its limitations.</li>
          <li>
            • Source links are checked automatically (<code className="rounded bg-surface-2 px-1 text-[12.5px]">npm run check:sources</code>). For <strong>draft</strong> dossiers, only
            reachability has been verified; peer review confirms that each source still supports its claim.
          </li>
          <li>• Live numbers (prices, market caps, TVL, fees) are never written into dossiers: they are fetched from data providers and always displayed with their source and timestamp.</li>
          <li>• Dossier versions and update dates are displayed on every page.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">6. Data providers</h2>
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-line bg-surface text-left text-[11px] uppercase tracking-wide text-subtle">
                <th scope="col" className="px-4 py-2.5 font-medium">Provider</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Used for</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {PROVIDERS.map((p) => (
                <tr key={p.name} className="border-b border-line/70 align-top last:border-0">
                  <td className="px-4 py-3">
                    <a href={p.terms} target="_blank" rel="noopener noreferrer" className="font-medium text-fg hover:text-accent-strong">
                      {p.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-fg-2">{p.use}</td>
                  <td className="px-4 py-3 text-muted">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-muted">If every provider is unavailable, Sensitor shows the data as unavailable. We never substitute demo values for market data.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">7. What this is not</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">
          Sensitor research is educational. It does not tell anyone what to buy or sell, does not provide personalised recommendations and makes no performance promises. Ratings
          describe our assessment of a project at a point in time; they are not price targets. See the{" "}
          <Link href="/academy" className="text-accent hover:text-accent-strong">
            Academy
          </Link>{" "}
          to learn the concepts behind each pillar.
        </p>
      </section>
    </div>
  );
}
