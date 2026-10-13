"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe, Loader2 } from "lucide-react";
import { localeMeta, locales } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className, align = "right" }: { className?: string; align?: "left" | "right" }) {
  const { locale, setLocale, t, pending } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        className="btn btn-soft h-9 gap-1.5 px-3 text-[0.8rem]"
      >
        {pending ? <Loader2 className="size-4 animate-spin text-brand" /> : <Globe className="size-4 text-brand" />}
        <span>{localeMeta[locale].short}</span>
        <ChevronDown className={cn("size-3.5 opacity-60 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t.nav.language}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "glass glass-strong absolute top-[calc(100%+0.6rem)] z-50 w-52 rounded-3xl p-1.5",
              align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left",
            )}
          >
            {locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l === locale}
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                    l === locale ? "bg-brand-soft text-brand-ink" : "text-ink-2 hover:bg-black/[.04] hover:text-ink dark:hover:bg-white/[.06]",
                  )}
                >
                  <span className="grid h-6 w-8 place-items-center rounded-lg bg-surface-2 text-[0.65rem] font-extrabold tracking-wider text-ink-2 ring-1 ring-line">
                    {localeMeta[l].short}
                  </span>
                  <span className="flex-1">{localeMeta[l].label}</span>
                  {l === locale && <Check className="size-4" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
