"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Presentation,
  Sparkles,
  Star,
  Sun,
  TrainFront,
  Wallet,
} from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Photo } from "@/components/photo";
import { photos } from "@/data/images";
import { destinationById, countryName } from "@/data/destinations";

function useTypewriter(lines: string[], active: boolean) {
  const [text, setText] = useState("");
  const state = useRef({ line: 0, char: 0, deleting: false });

  useEffect(() => {
    state.current = { line: 0, char: 0, deleting: false };
    setText("");
  }, [lines]);

  useEffect(() => {
    if (!active || lines.length === 0) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const s = state.current;
      const full = lines[s.line % lines.length];
      if (!s.deleting) {
        s.char = Math.min(s.char + 1, full.length);
        setText(full.slice(0, s.char));
        if (s.char === full.length) {
          s.deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 34 + Math.random() * 40);
      } else {
        s.char = Math.max(s.char - 2, 0);
        setText(full.slice(0, s.char));
        if (s.char === 0) {
          s.deleting = false;
          s.line += 1;
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 16);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [lines, active]);

  return text;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] as const } }),
};

export function Hero() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const typed = useTypewriter(t.hero.prompts, !focused && value === "");

  // gentle parallax for the photo collage
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const back = { x: useTransform(sx, (v) => v * -10), y: useTransform(sy, (v) => v * -10) };
  const front = { x: useTransform(sx, (v) => v * 16), y: useTransform(sy, (v) => v * 16) };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = (value || t.hero.prompts[0]).trim();
    router.push(`/planner?q=${encodeURIComponent(q)}#planner`);
  };

  const samarkand = destinationById.samarkand;

  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Copy */}
        <motion.div initial="hidden" animate="show" className="relative z-10">
          <motion.div custom={0} variants={fadeUp}>
            <span className="glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-xs font-bold text-ink-2 sm:text-[0.8rem]">
              <span className="relative grid size-6 place-items-center rounded-full bg-brand text-white">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand" aria-hidden />
                <Sparkles className="relative size-3.5" />
              </span>
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-6 text-balance text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.6rem]"
          >
            <Rich text={t.hero.title} />
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-2 sm:text-lg">
            {t.hero.subtitle}
          </motion.p>

          <motion.form custom={3} variants={fadeUp} onSubmit={submit} className="glass mt-8 rounded-[1.75rem] p-2 sm:p-2.5">
            <label htmlFor="hero-prompt" className="sr-only">
              {t.hero.promptLabel}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2">
                <Sparkles className="size-5 shrink-0 text-brand" aria-hidden />
                <div className="relative min-w-0 flex-1">
                  <input
                    id="hero-prompt"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoComplete="off"
                    className="w-full bg-transparent text-[0.95rem] font-semibold text-ink outline-none placeholder:text-ink-3 sm:text-base"
                    placeholder={focused ? t.hero.promptLabel : ""}
                  />
                  {!focused && value === "" && (
                    <span className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-nowrap text-[0.95rem] font-semibold text-ink-3 sm:text-base" aria-hidden>
                      <span className="truncate">{typed}</span>
                      <span className="ml-0.5 inline-block h-5 w-[2px] animate-blink bg-brand" />
                    </span>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary h-12 px-6 text-[0.95rem]">
                {t.hero.generate}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </motion.form>

          <motion.div custom={4} variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/pitch" className="btn btn-soft h-11 px-5 text-sm">
              <Presentation className="size-4 text-brand" />
              {t.hero.secondary}
            </Link>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[0.8rem] font-semibold text-ink-3">
              {t.hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Visual collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
          className="relative mx-auto aspect-[4/4.4] w-full max-w-[34rem] sm:aspect-[4/4]"
        >
          {/* orbit ring */}
          <svg className="absolute inset-[-6%] h-[112%] w-[112%] animate-spin-slow text-brand/30" viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth=".25" strokeDasharray="1 2.2" />
          </svg>

          <motion.div style={back} className="absolute right-0 top-0 w-[44%]">
            <Photo
              id={photos.tokyo}
              alt="Tokyo, Japan"
              sizes="(min-width: 1024px) 15vw, 40vw"
              className="aspect-[3/4] rotate-[5deg] rounded-[1.75rem] shadow-2xl shadow-orange-900/20 ring-4 ring-white/70 dark:ring-white/10"
            />
          </motion.div>

          <motion.div style={back} className="absolute bottom-[2%] left-0 w-[40%]">
            <Photo
              id={photos.paris}
              alt="Paris, France"
              sizes="(min-width: 1024px) 14vw, 38vw"
              className="aspect-[3/4] -rotate-[6deg] rounded-[1.75rem] shadow-2xl shadow-orange-900/20 ring-4 ring-white/70 dark:ring-white/10"
            />
          </motion.div>

          <motion.div style={front} className="absolute left-[14%] top-[8%] w-[64%]">
            <Photo
              id={photos.samarkand}
              alt="Registan Square, Samarkand, Uzbekistan"
              priority
              sizes="(min-width: 1024px) 24vw, 62vw"
              className="aspect-[4/5] rounded-[2.25rem] shadow-[0_40px_80px_-30px_rgba(150,60,10,.55)] ring-[6px] ring-white/80 dark:ring-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <div className="flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/80">
                  <MapPin className="size-3.5" />
                  {countryName(samarkand.country, locale)}
                </div>
                <div className="mt-1 text-2xl font-extrabold tracking-tight">{samarkand.name[locale]}</div>
                <div className="mt-1 flex items-center gap-0.5 text-amber-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </Photo>
          </motion.div>

          {/* Floating liquid-glass chips */}
          <motion.div
            style={front}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="absolute left-[-2%] top-[4%] sm:left-[-6%]"
          >
            <div className="glass animate-float flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                <CheckCircle2 className="size-5" />
              </span>
              <div>
                <div className="text-[0.8rem] font-extrabold text-ink">{t.hero.chipItinerary}</div>
                <div className="text-[0.7rem] font-semibold text-ink-3">{t.hero.chipItineraryMeta}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={front}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="absolute right-[-2%] top-[46%] sm:right-[-8%]"
          >
            <div className="glass animate-float-slow w-52 rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand-ink">
                  <Wallet className="size-4" />
                </span>
                <div>
                  <div className="text-[0.78rem] font-extrabold text-ink">{t.hero.chipBudget}</div>
                  <div className="text-[0.68rem] font-semibold text-ink-3">{t.hero.chipBudgetMeta}</div>
                </div>
              </div>
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "90%" }}
                  transition={{ delay: 1.2, duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-brand"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            style={front}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="absolute bottom-[-1%] right-[4%]"
          >
            <div className="glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#ff9a3d] to-[#f2540a] text-white shadow-lg shadow-orange-600/30">
                <TrainFront className="size-5" />
              </span>
              <div>
                <div className="text-[0.78rem] font-extrabold text-ink">{t.hero.chipTrain}</div>
                <div className="text-[0.68rem] font-semibold text-ink-3">{t.hero.chipTrainMeta}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={back}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="absolute right-[30%] top-[-3%] hidden sm:block"
          >
            <div className="glass flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5">
              <span className="grid size-7 place-items-center rounded-full bg-amber-400/90 text-white">
                <Sun className="size-4" />
              </span>
              <div className="leading-tight">
                <div className="text-[0.68rem] font-bold text-ink-3">{t.hero.chipWeather}</div>
                <div className="text-[0.75rem] font-extrabold text-ink">{t.hero.chipWeatherMeta}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
