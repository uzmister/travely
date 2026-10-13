"use client";

import { ArrowUpRight, TrainFront } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Reveal } from "@/components/reveal";
import { Photo } from "@/components/photo";
import { CountUp } from "@/components/count-up";
import { photos } from "@/data/images";
import { destinationById } from "@/data/destinations";
import { headline, sources } from "@/data/market";
import { compactParts } from "@/lib/format";

export function SilkRoad() {
  const { t, locale } = useI18n();
  const s = t.silkroad;

  const stats = [
    { raw: headline.uzVisitors2025 * 1e6, label: s.visitors, src: sources.uzStat2025.url },
    { raw: headline.uzExports2025 * 1e9, prefix: "$", label: s.exports, src: sources.uzExports.url },
    { raw: 6, plain: "×", label: s.growth, src: sources.uz2021.url },
    { raw: headline.uzTarget2030 * 1e6, label: s.target, src: sources.uzTarget.url },
  ];

  const cities = [
    { id: "samarkand", photo: photos.samarkandShahiZinda, text: s.samarkand },
    { id: "bukhara", photo: photos.bukharaArk, text: s.bukhara },
    { id: "tashkent", photo: photos.tashkentMetro, text: s.tashkent },
  ];

  return (
    <section className="relative px-3 py-10 sm:px-5 sm:py-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] text-white shadow-[0_50px_100px_-50px_rgba(120,40,0,.8)]">
        <Photo id={photos.samarkandSherdor} alt="Sherdor Madrasah on Registan Square, Samarkand" sizes="100vw" className="absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(20,10,4,.92)_0%,rgba(40,16,4,.78)_45%,rgba(242,84,10,.35)_100%)]" />
        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:p-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200 ring-1 ring-white/20 backdrop-blur">
              🇺🇿 {s.eyebrow}
            </span>
            <h2 className="mt-5 text-balance text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
              <Rich text={s.title} accentClassName="!bg-none ![-webkit-text-fill-color:#ffc285] !text-[#ffc285]" />
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">{s.text}</p>

            <div className="glass-dark-ui mt-8 rounded-3xl p-4">
              <div className="flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-amber-200">
                <TrainFront className="size-4" /> {s.route}
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm font-extrabold sm:text-base">
                {s.routeText.split("→").map((c, i, arr) => (
                  <span key={c} className="flex items-center gap-2">
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-amber-300 shadow-[0_0_0_4px_rgba(252,211,77,.25)]" />
                      {c.trim()}
                    </span>
                    {i < arr.length - 1 && <span className="h-px w-4 bg-white/40 sm:w-8" />}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid content-start gap-3 sm:grid-cols-2">
            {stats.map((st, i) => (
              <Reveal key={st.label} delay={i * 0.08}>
                <a href={st.src} target="_blank" rel="noreferrer" className="glass-dark-ui group block h-full rounded-3xl p-5 transition-transform hover:-translate-y-0.5">
                  <div className="text-4xl font-extrabold tracking-[-0.04em] text-white">
                    {(() => {
                      const c = st.plain ? { n: st.raw, decimals: 0, suffix: st.plain } : compactParts(st.raw, locale);
                      return <CountUp value={c.n} decimals={c.decimals} prefix={st.prefix} suffix={c.suffix} />;
                    })()}
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-2 text-sm font-semibold text-white/75">
                    {st.label}
                    <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative grid gap-3 px-6 pb-6 sm:grid-cols-3 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
          {cities.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/20">
                <Photo id={c.photo} alt={destinationById[c.id].name.en} sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[16/10]" imgClassName="transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-xl font-extrabold">{destinationById[c.id].name[locale]}</div>
                  <div className="text-[0.8rem] font-semibold text-white/75">{c.text}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
