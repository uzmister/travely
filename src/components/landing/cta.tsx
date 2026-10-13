"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Mail, Presentation } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Reveal } from "@/components/reveal";
import { Photo } from "@/components/photo";
import { photos } from "@/data/images";

const STORAGE_KEY = "travely-waitlist";

export function Cta() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) setState("done");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState("error");
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: email.trim(), at: new Date().toISOString() }));
    } catch {
      /* storage unavailable */
    }
    setState("done");
  };

  return (
    <section id="waitlist" className="relative px-3 py-16 sm:px-5 sm:py-24">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] bg-gradient-to-br from-[#ff9a3d] via-[#ff6a13] to-[#cf3f06] px-6 py-14 text-white shadow-[0_50px_100px_-40px_rgba(242,84,10,.85)] sm:px-12 sm:py-20">
          <Photo id={photos.friendsMountains} alt="" sizes="100vw" className="absolute inset-0 opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(255,255,255,.35),transparent_55%)]" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-white/15 blur-3xl" aria-hidden />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              <Rich text={t.cta.title} accentClassName="!bg-none !text-white ![-webkit-text-fill-color:#fff]" />
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-medium text-white/85 sm:text-lg">{t.cta.text}</p>

            <AnimatePresence mode="wait">
              {state === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-dark-ui mx-auto mt-9 flex max-w-md items-center justify-center gap-3 rounded-full px-6 py-4 text-base font-bold"
                  role="status"
                >
                  <CheckCircle2 className="size-6" /> {t.cta.success}
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate className="mx-auto mt-9 max-w-xl">
                  <div className="glass-dark-ui flex flex-col gap-2 rounded-[1.75rem] p-2 sm:flex-row sm:rounded-full">
                    <label htmlFor="waitlist-email" className="sr-only">
                      Email
                    </label>
                    <div className="flex flex-1 items-center gap-3 px-4">
                      <Mail className="size-5 shrink-0 text-white/80" />
                      <input
                        id="waitlist-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (state === "error") setState("idle");
                        }}
                        placeholder={t.cta.placeholder}
                        aria-invalid={state === "error"}
                        className="h-12 w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-white/60"
                      />
                    </div>
                    <button type="submit" className="btn h-12 bg-white px-6 text-[0.95rem] text-brand-ink shadow-lg hover:-translate-y-0.5">
                      {t.cta.button} <ArrowRight className="size-4" />
                    </button>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white/80" aria-live="polite">
                    {state === "error" ? t.cta.invalid : t.cta.privacy}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>

            <Link href="/pitch" className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white/90 underline-offset-4 hover:underline">
              <Presentation className="size-4" /> {t.cta.investor} →
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
