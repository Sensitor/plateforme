import type { Metadata } from "next";
import Link from "@/i18n/link";
import { PILLARS } from "@/lib/research/taxonomy";
import { PageHeader } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClaimKindBadge } from "@/components/research/pills";
import { rich } from "@/components/ui/rich-text";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("methodology", "/research/methodology");
}

const PROVIDERS = [
  { id: "coingecko", name: "CoinGecko", terms: "https://www.coingecko.com/en/api_terms" },
  { id: "coinpaprika", name: "CoinPaprika", terms: "https://coinpaprika.com/api/" },
  { id: "defillama", name: "DefiLlama", terms: "https://defillama.com/docs/api" },
  { id: "alternative", name: "Alternative.me", terms: "https://alternative.me/crypto/fear-and-greed-index/" },
];

export default async function MethodologyPage() {
  const dict = await getT();
  const t = dict.methodology;
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-fg">{t.s1.title}</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">{t.s1.intro}</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {(["fact", "interpretation", "hypothesis"] as const).map((k) => (
            <Card key={k} className="p-4">
              <ClaimKindBadge kind={k} />
              <p className="mt-3 text-[13px] leading-relaxed text-fg-2">{t.s1[k]}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-fg">{t.s2.title}</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">{rich(t.s2.intro)}</p>
        <div className="space-y-3">
          {PILLARS.map((p, i) => {
            const P = dict.labels.pillars[p.id];
            return (
              <Card key={p.id} className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-medium text-fg">
                    <span className="num mr-2 text-accent">{i + 1}</span>
                    {P.label}
                  </h3>
                  <span className="text-[12px] text-subtle">{P.scaleNote}</span>
                </div>
                <p className="mt-1 text-[13.5px] text-muted">{P.question}</p>
                <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-[13px] text-fg-2 sm:grid-cols-2">
                  {P.criteria.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden /> {c}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">{t.s3.title}</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">{rich(t.s3.p1)}</p>
        <p className="text-[14.5px] leading-relaxed text-fg-2">
          {t.s3.confidence}{" "}
          {t.s3.levels.map(([label, text], i) => (
            <span key={label}>
              {i > 0 ? " · " : null}
              <Badge tone="neutral">{label}</Badge> {text}
            </span>
          ))}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">{t.s4.title}</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">{rich(t.s4.p)}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">{t.s5.title}</h2>
        <ul className="space-y-2 text-[14.5px] leading-relaxed text-fg-2">
          {t.s5.items.map((item) => (
            <li key={item}>• {rich(item)}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">{t.s6.title}</h2>
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-line bg-surface text-left text-[11px] uppercase tracking-wide text-subtle">
                <th scope="col" className="px-4 py-2.5 font-medium">{t.s6.provider}</th>
                <th scope="col" className="px-4 py-2.5 font-medium">{t.s6.usedFor}</th>
                <th scope="col" className="px-4 py-2.5 font-medium">{t.s6.notes}</th>
              </tr>
            </thead>
            <tbody>
              {PROVIDERS.map((p) => {
                const [use, note] = t.s6.providers[p.id];
                return (
                  <tr key={p.name} className="border-b border-line/70 align-top last:border-0">
                    <td className="px-4 py-3">
                      <a href={p.terms} target="_blank" rel="noopener noreferrer" className="font-medium text-fg hover:text-accent-strong">
                        {p.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-fg-2">{use}</td>
                    <td className="px-4 py-3 text-muted">{note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-muted">{t.s6.fallback}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-fg">{t.s7.title}</h2>
        <p className="text-[14.5px] leading-relaxed text-fg-2">
          {t.s7.before}
          <Link href="/academy" className="text-accent hover:text-accent-strong">
            {t.s7.link}
          </Link>{" "}
          {t.s7.after}
        </p>
      </section>
    </div>
  );
}
