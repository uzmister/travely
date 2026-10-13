"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { TripPlanner } from "./trip-planner";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Cta } from "@/components/landing/cta";

export function PlannerPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-ink">
              <Sparkles className="size-3.5" /> {t.planner.eyebrow}
            </span>
            <h1 className="mt-5 text-balance text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl">
              <Rich text={t.planner.pageTitle} />
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-2 sm:text-lg">{t.planner.pageSubtitle}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-12"
          >
            <TripPlanner id="planner" />
          </motion.div>
        </div>
      </section>
      <HowItWorks />
      <Cta />
    </>
  );
}
