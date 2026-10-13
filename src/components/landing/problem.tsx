"use client";

import { Check, Languages, Layers, Shuffle, Sparkles, UserRound } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Reveal } from "@/components/reveal";
import { Photo } from "@/components/photo";
import { photos } from "@/data/images";

export function Problem() {
  const { t } = useI18n();
  const icons = [Layers, Shuffle, Languages];

  return (
    <section className="relative py-12 sm:py-20">
      <div className="container-x grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <Reveal>
            <span className="eyebrow">{t.problem.eyebrow}</span>
            <h2 className="mt-4 max-w-xl text-balance text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl">
              <Rich text={t.problem.title} />
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {t.problem.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="soft flex gap-5 rounded-[1.75rem] p-5 sm:p-6">
                    <span className="soft-inset grid size-12 shrink-0 place-items-center rounded-2xl text-ink-2">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight text-ink">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-2 sm:text-[0.95rem]">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.15} className="lg:pt-6">
          <div className="relative h-full min-h-[34rem] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgba(150,60,10,.6)]">
            <Photo id={photos.wingSunset} alt="Aircraft above a sea of clouds at sunset" sizes="(min-width: 1024px) 45vw, 100vw" className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff7a1a]/85 via-[#f2540a]/70 to-[#5a1d00]/80" />
            <div className="relative flex h-full flex-col p-7 text-white sm:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] ring-1 ring-white/30 backdrop-blur">
                <Sparkles className="size-3.5" />
                {t.problem.solutionEyebrow}
              </span>
              <h3 className="mt-5 text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">
                <Rich text={t.problem.solutionTitle} accentClassName="!bg-none !text-white ![-webkit-text-fill-color:#fff] underline decoration-white/40 decoration-[3px] underline-offset-[6px]" />
              </h3>
              <ul className="mt-8 space-y-3">
                {t.problem.solutionItems.map((s) => (
                  <li key={s} className="glass-dark-ui flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold sm:text-[0.95rem]">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-brand">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <div className="glass-dark-ui mt-auto rounded-3xl p-4 pt-4">
                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/90 text-brand">
                    <UserRound className="size-4" />
                  </span>
                  <p className="rounded-2xl rounded-tl-sm bg-white/90 px-3.5 py-2 text-sm font-semibold text-[#3a2416]">{t.features.mockPrompt}</p>
                </div>
                <div className="mt-3 flex items-start justify-end gap-3">
                  <p className="rounded-2xl rounded-tr-sm bg-[#2b160b]/70 px-3.5 py-2 text-sm font-semibold text-white">{t.features.mockReply}</p>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-brand text-white">
                    <Sparkles className="size-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
