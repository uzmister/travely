"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Building2, Check, Compass, Crown } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Reveal, SectionHeading } from "@/components/reveal";
import { cn } from "@/lib/cn";
import { fmtUsd } from "@/lib/format";

export function Pricing() {
  const { t, locale } = useI18n();
  const pr = t.pricing;
  const [yearly, setYearly] = useState(true);
  const usd = (v: number) => fmtUsd(v, locale, v % 1 ? 2 : 0);

  const plans = [
    { key: "free", icon: Compass, plan: pr.plans.free, price: usd(0), period: pr.forever, href: "/planner" },
    {
      key: "pro",
      icon: Crown,
      plan: pr.plans.pro,
      price: yearly ? usd(39) : usd(4.99),
      period: yearly ? pr.perYear : pr.perMonth,
      href: "/#waitlist",
      featured: true,
    },
    { key: "business", icon: Building2, plan: pr.plans.business, price: pr.custom, period: "", href: "/pitch" },
  ];

  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={pr.eyebrow} title={<Rich text={pr.title} />} />

        <div className="mt-10 flex justify-center">
          <div className="soft-inset relative flex rounded-full p-1" role="radiogroup">
            {[false, true].map((y) => (
              <button
                key={String(y)}
                type="button"
                role="radio"
                aria-checked={yearly === y}
                onClick={() => setYearly(y)}
                className={cn("relative rounded-full px-5 py-2 text-sm font-bold transition-colors", yearly === y ? "text-ink" : "text-ink-3")}
              >
                {yearly === y && <motion.span layoutId="billing" className="absolute inset-0 rounded-full bg-surface shadow-md" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative flex items-center gap-2">
                  {y ? pr.yearly : pr.monthly}
                  {y && <span className="rounded-full bg-brand px-2 py-0.5 text-[0.65rem] font-extrabold text-white">{pr.save}</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[2.25rem] p-7",
                  p.featured
                    ? "bg-gradient-to-b from-[#ff8a2b] to-[#e8480a] text-white shadow-[0_40px_80px_-30px_rgba(242,84,10,.75)] lg:-my-4 lg:py-11"
                    : "soft",
                )}
              >
                {p.featured && (
                  <>
                    <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(120%_60%_at_10%_0%,rgba(255,255,255,.35),transparent_50%)]" />
                    <span className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-[0.7rem] font-extrabold ring-1 ring-white/40 backdrop-blur">
                      {pr.popular}
                    </span>
                  </>
                )}
                <span
                  className={cn(
                    "relative grid size-12 place-items-center rounded-2xl",
                    p.featured ? "bg-white/20 ring-1 ring-white/40" : "soft-inset text-brand",
                  )}
                >
                  <p.icon className="size-5" />
                </span>
                <h3 className={cn("relative mt-6 text-xl font-extrabold tracking-tight", !p.featured && "text-ink")}>{p.plan.name}</h3>
                <p className={cn("relative mt-1.5 text-sm", p.featured ? "text-white/85" : "text-ink-2")}>{p.plan.desc}</p>
                <div className="relative mt-6 flex items-end gap-1.5">
                  <span className={cn("text-5xl font-extrabold tracking-[-0.04em]", !p.featured && "text-ink")}>{p.price}</span>
                  {p.period && <span className={cn("pb-1.5 text-sm font-semibold", p.featured ? "text-white/80" : "text-ink-3")}>{p.period}</span>}
                </div>
                <ul className="relative mt-7 space-y-3">
                  {p.plan.features.map((f) => (
                    <li key={f} className={cn("flex items-start gap-3 text-sm font-semibold", p.featured ? "text-white" : "text-ink-2")}>
                      <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", p.featured ? "bg-white text-brand" : "bg-brand-soft text-brand-ink")}>
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="min-h-8 flex-1" />
                <Link
                  href={p.href}
                  className={cn(
                    "btn relative h-12 w-full text-sm",
                    p.featured ? "bg-white text-brand-ink shadow-lg hover:-translate-y-0.5" : "btn-soft",
                  )}
                >
                  {p.plan.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
