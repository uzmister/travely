"use client";

import { MessageSquareText, Route, Rocket } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Reveal, SectionHeading } from "@/components/reveal";

export function HowItWorks() {
  const { t } = useI18n();
  const icons = [MessageSquareText, Route, Rocket];

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow={t.how.eyebrow} title={<Rich text={t.how.title} />} />
        <div className="relative mt-14">
          <svg className="absolute left-0 top-[3.25rem] hidden h-10 w-full lg:block" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden>
            <path d="M 160 20 C 360 -10, 440 50, 600 20 S 840 -10, 1040 20" fill="none" stroke="var(--brand)" strokeOpacity=".45" strokeWidth="2" strokeDasharray="6 8" />
          </svg>
          <ol className="relative grid gap-5 lg:grid-cols-3">
            {t.how.steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={s.title} delay={i * 0.12}>
                  <li className="glass relative h-full rounded-[2rem] p-7 text-center">
                    <div className="relative mx-auto grid size-[4.5rem] place-items-center">
                      <span className="soft absolute inset-0 rounded-full" />
                      <span className="relative grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#ffb062] to-[#f2540a] text-white shadow-lg shadow-orange-500/40">
                        <Icon className="size-5" />
                      </span>
                      <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-ink text-xs font-extrabold text-bg">{i + 1}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold tracking-tight text-ink">{s.title}</h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-2">{s.text}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
