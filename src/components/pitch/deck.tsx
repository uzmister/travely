"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Expand,
  LayoutGrid,
  Minimize,
  X,
} from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { LogoMark } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { EagerImages } from "@/components/photo";
import { cn } from "@/lib/cn";
import { slideComponents } from "./slides";

const W = 1280;
const H = 720;
const total = slideComponents.length;

function useStageScale(el: HTMLDivElement | null) {
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setScale(Math.min(r.width / W, r.height / H));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);
  return scale;
}

function SlideCanvas({ index, className }: { index: number; className?: string }) {
  const { Comp } = slideComponents[index];
  return (
    <div className={cn("@container overflow-hidden", className)} style={{ width: W, height: H }}>
      <Comp n={index + 1} total={total} />
    </div>
  );
}

function Thumb({ index, active, onClick, label }: { index: number; active: boolean; onClick: () => void; label: string }) {
  const s = 0.2;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl text-left ring-offset-2 ring-offset-bg transition-all",
        active ? "ring-[3px] ring-brand" : "ring-1 ring-line hover:ring-brand/50",
      )}
      style={{ width: W * s, height: H * s }}
      aria-label={label}
    >
      <AnimatePresence initial={false}>
        <div key="thumb" className="pointer-events-none origin-top-left" style={{ transform: `scale(${s})` }}>
          <SlideCanvas index={index} />
        </div>
      </AnimatePresence>
      <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">{index + 1}</span>
    </button>
  );
}

export function PitchDeck() {
  const { t } = useI18n();
  const ui = t.pitch.ui;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [overview, setOverview] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [mode, setMode] = useState<"deck" | "scroll" | null>(null);
  const [stageEl, setStageEl] = useState<HTMLDivElement | null>(null);
  const scale = useStageScale(stageEl);
  const touch = useRef<{ x: number; y: number } | null>(null);

  // deck on wide screens, a scrolling document on phones
  useLayoutEffect(() => {
    const pick = () => setMode(window.innerWidth < 760 || window.innerWidth / window.innerHeight < 0.95 ? "scroll" : "deck");
    pick();
    window.addEventListener("resize", pick);
    return () => window.removeEventListener("resize", pick);
  }, []);

  // initial slide from the hash (#7)
  useEffect(() => {
    const n = Number(window.location.hash.replace("#", ""));
    if (n >= 1 && n <= total) setIndex(n - 1);
  }, []);

  const go = useCallback((next: number) => {
    setIndex((cur) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setDir(clamped >= cur ? 1 : -1);
      if (clamped !== cur) history.replaceState(null, "", `#${clamped + 1}`);
      return clamped;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    if (mode !== "deck") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      } else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(total - 1);
      else if (e.key.toLowerCase() === "g") setOverview((v) => !v);
      else if (e.key.toLowerCase() === "f") toggleFullscreen();
      else if (e.key === "Escape") setOverview(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, mode, toggleFullscreen]);

  const controls = (
    <div className="flex items-center gap-1.5">
      <LanguageSwitcher />
      <ThemeToggle className="hidden sm:inline-flex" />
      {mode === "deck" && (
        <>
          <button type="button" onClick={() => setOverview(true)} className="btn btn-soft size-9 p-0" aria-label={ui.overview} title={`${ui.overview} (G)`}>
            <LayoutGrid className="size-4" />
          </button>
          <button type="button" onClick={toggleFullscreen} className="btn btn-soft hidden size-9 p-0 sm:inline-flex" aria-label={ui.fullscreen} title={`${ui.fullscreen} (F)`}>
            {fullscreen ? <Minimize className="size-4" /> : <Expand className="size-4" />}
          </button>
        </>
      )}
      <button type="button" onClick={() => window.print()} className="btn btn-primary h-9 px-3.5 text-[0.8rem]" title={ui.download}>
        <Download className="size-4" />
        <span className="hidden md:inline">{ui.download}</span>
      </button>
    </div>
  );

  return (
    <>
      <div className="pitch-screen flex min-h-[100dvh] flex-col">
        {/* Top bar */}
        <header className={cn("z-40 px-3 pt-3 sm:px-5", mode === "scroll" ? "sticky top-0" : "")}>
          <div className="glass mx-auto flex max-w-[90rem] items-center gap-2 rounded-full py-1.5 pl-2 pr-1.5">
            <Link href="/" className="btn h-9 gap-2 rounded-full px-2.5 text-[0.8rem] text-ink-2 hover:text-ink" title={ui.home}>
              <ArrowLeft className="size-4" />
              <LogoMark className="size-7" />
              <span className="hidden font-extrabold text-ink sm:inline">travely</span>
            </Link>
            <div className="mx-auto hidden truncate text-[0.8rem] font-bold text-ink-3 md:block">{t.meta.pitchTitle}</div>
            <div className="ml-auto md:ml-0">{controls}</div>
          </div>
        </header>

        {mode === "deck" && (
          <>
            <div
              ref={setStageEl}
              className="relative mx-3 my-3 flex-1 sm:mx-5"
              onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
              onTouchEnd={(e) => {
                if (!touch.current) return;
                const dx = e.changedTouches[0].clientX - touch.current.x;
                const dy = e.changedTouches[0].clientY - touch.current.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
                touch.current = null;
              }}
            >
              {scale > 0 && (
                <div
                  className="absolute left-1/2 top-1/2"
                  style={{ width: W * scale, height: H * scale, transform: "translate(-50%, -50%)" }}
                >
                  <div className="relative size-full overflow-hidden rounded-[clamp(12px,2vw,28px)] shadow-[0_40px_90px_-40px_rgba(120,45,5,.55)] ring-1 ring-line">
                    <AnimatePresence initial={false} custom={dir} mode="popLayout">
                      <motion.div
                        key={index}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -60 }}
                        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                        className="absolute inset-0 origin-top-left"
                      >
                        <div className="origin-top-left" style={{ transform: `scale(${scale})` }}>
                          <SlideCanvas index={index} />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* click zones */}
              <button type="button" aria-label={ui.prev} onClick={() => go(index - 1)} className="absolute inset-y-0 left-0 w-[8%] cursor-w-resize opacity-0" tabIndex={-1} />
              <button type="button" aria-label={ui.next} onClick={() => go(index + 1)} className="absolute inset-y-0 right-0 w-[8%] cursor-e-resize opacity-0" tabIndex={-1} />
            </div>

            {/* Bottom controls */}
            <footer className="px-3 pb-3 sm:px-5">
              <div className="glass mx-auto flex max-w-[90rem] items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4">
                <button type="button" onClick={() => go(index - 1)} disabled={index === 0} className="btn btn-soft size-9 p-0 disabled:opacity-40" aria-label={ui.prev}>
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={() => go(index + 1)} disabled={index === total - 1} className="btn btn-primary size-9 p-0 disabled:opacity-40" aria-label={ui.next}>
                  <ChevronRight className="size-5" />
                </button>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-black/[.06] dark:bg-white/10">
                  <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-brand" animate={{ width: `${((index + 1) / total) * 100}%` }} transition={{ duration: 0.4 }} />
                </div>
                <span className="text-[0.8rem] font-extrabold tabular-nums text-ink">
                  {index + 1}
                  <span className="text-ink-3"> / {total}</span>
                </span>
                <span className="hidden text-[0.75rem] font-semibold text-ink-3 lg:inline">{ui.hint}</span>
              </div>
            </footer>
          </>
        )}

        {mode === "scroll" && (
          <div className="space-y-4 px-3 py-4">
            <AnimatePresence initial={false}>
          {slideComponents.map(({ key, Comp }, i) => (
              <section key={key} className="@container overflow-hidden rounded-[1.75rem] shadow-[0_24px_50px_-30px_rgba(120,45,5,.5)] ring-1 ring-line">
                <div className="min-h-[24rem]">
                  <Comp n={i + 1} total={total} />
                </div>
              </section>
            ))}
          </AnimatePresence>
            <p className="pb-6 text-center text-xs font-semibold text-ink-3">{t.pitch.sources.note}</p>
          </div>
        )}
      </div>

      {/* Overview */}
      <AnimatePresence>
        {overview && mode === "deck" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-bg/80 p-4 backdrop-blur-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={ui.overview}
          >
            <div className="mx-auto flex max-w-[90rem] items-center justify-between">
              <h2 className="text-lg font-extrabold text-ink">{ui.overview}</h2>
              <button type="button" onClick={() => setOverview(false)} className="btn btn-soft size-10 p-0" aria-label={ui.close}>
                <X className="size-5" />
              </button>
            </div>
            <div className="mx-auto mt-6 flex max-w-[90rem] flex-wrap justify-center gap-4">
              {slideComponents.map((s, i) => (
                <Thumb
                  key={s.key}
                  index={i}
                  active={i === index}
                  label={`${i + 1}`}
                  onClick={() => {
                    go(i);
                    setOverview(false);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Print copy: one slide per page */}
      <EagerImages.Provider value={true}>
        <AnimatePresence initial={false}>
          <div key="print" className="pitch-print" aria-hidden>
            {slideComponents.map((s, i) => (
              <div key={s.key} className="pitch-print-page">
                <SlideCanvas index={i} />
              </div>
            ))}
          </div>
        </AnimatePresence>
      </EagerImages.Provider>
    </>
  );
}
