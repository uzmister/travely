"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Reveal, SectionHeading } from "@/components/reveal";
import { cn } from "@/lib/cn";

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow={t.faq.eyebrow} title={<Rich text={t.faq.title} />} align="left" />
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className={cn("rounded-[1.5rem] transition-all", isOpen ? "glass" : "soft")}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-extrabold tracking-tight text-ink sm:px-6 sm:py-5"
                    >
                      {item.q}
                      <span className={cn("grid size-8 shrink-0 place-items-center rounded-full transition-all", isOpen ? "rotate-45 bg-brand text-white" : "soft-inset text-ink-2")}>
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-ink-2 sm:px-6 sm:text-[0.95rem]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
