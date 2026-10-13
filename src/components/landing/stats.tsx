"use client";

import { ArrowUpRight, Clock3, Globe2, Landmark, TrendingUp } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { CountUp } from "@/components/count-up";
import { Rich } from "@/components/rich";
import { Reveal, SectionHeading } from "@/components/reveal";
import { headline, sources, type SourceId } from "@/data/market";
import { compactParts } from "@/lib/format";

export function Stats() {
  const { t, locale } = useI18n();

  const research = t.pitch.problem.cards[0].stat.replace(/^\d+/, "");
  const items: {
    icon: typeof Globe2;
    raw: number;
    prefix?: string;
    unit?: string;
    label: string;
    source: SourceId;
    sourceName: string;
  }[] = [
    { icon: Globe2, raw: headline.arrivals2025 * 1e9, label: t.stats.arrivals, source: "untourism", sourceName: "UN Tourism" },
    { icon: Landmark, raw: headline.travelGdp2025 * 1e12, prefix: "$", label: t.stats.gdp, source: "wttc", sourceName: "WTTC" },
    { icon: TrendingUp, raw: headline.uzVisitors2025 * 1e6, label: t.stats.uzbekistan, source: "uzStat2025", sourceName: "Stat.uz" },
    { icon: Clock3, raw: headline.researchHours, unit: research, label: t.stats.research, source: "expedia", sourceName: "Expedia Group" },
  ];

  return (
    <section className="relative py-20 sm:py-28" id="why-now">
      <div className="container-x">
        <SectionHeading eyebrow={t.stats.eyebrow} title={<Rich text={t.stats.title} />} subtitle={t.stats.subtitle} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <Reveal key={s.source} delay={i * 0.08}>
              <div className="soft group relative h-full overflow-hidden rounded-[2rem] p-6">
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-brand/10 blur-2xl transition-transform duration-700 group-hover:scale-150" aria-hidden />
                <span className="soft-inset grid size-11 place-items-center rounded-2xl text-brand">
                  <s.icon className="size-5" />
                </span>
                <div className="mt-6 text-[2.75rem] font-extrabold leading-none tracking-[-0.04em] text-ink">
                  {(() => {
                    const c = s.unit ? { n: s.raw, decimals: 0, suffix: s.unit } : compactParts(s.raw, locale);
                    return <CountUp value={c.n} decimals={c.decimals} prefix={s.prefix} suffix={c.suffix} />;
                  })()}
                </div>
                <p className="mt-3 text-sm font-medium leading-relaxed text-ink-2">{s.label}</p>
                <a
                  href={sources[s.source].url}
                  target="_blank"
                  rel="noreferrer"
                  title={sources[s.source].label}
                  className="mt-5 inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[0.7rem] font-bold text-brand-ink transition-opacity hover:opacity-80"
                >
                  {t.common.source}: {s.sourceName}
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
