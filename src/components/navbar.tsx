"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, Presentation, X } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/cn";

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/#features", label: t.nav.features },
    { href: "/#destinations", label: t.nav.destinations },
    { href: "/planner", label: t.nav.planner },
    { href: "/#pricing", label: t.nav.pricing },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "glass mx-auto flex max-w-6xl items-center gap-2 rounded-full transition-all duration-500",
          scrolled ? "py-1.5 pl-3 pr-1.5 sm:pl-4" : "py-2 pl-3.5 pr-2 sm:pl-5",
        )}
      >
        <Link href="/" className="shrink-0 rounded-full" aria-label="Travely home">
          <Logo />
        </Link>

        <ul className="mx-auto hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-black/[.04] hover:text-ink dark:hover:bg-white/[.06]",
                  pathname === l.href && "text-brand-ink",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/pitch"
              className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-black/[.04] hover:text-ink dark:hover:bg-white/[.06]"
            >
              <Presentation className="size-4 text-brand" />
              {t.nav.pitch}
            </Link>
          </li>
        </ul>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <LanguageSwitcher className="hidden sm:block" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link href="/#waitlist" className="btn btn-primary hidden h-10 px-5 text-sm md:inline-flex">
            {t.nav.cta}
            <ArrowUpRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="btn btn-soft size-10 p-0 lg:hidden"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            className="glass glass-strong mx-auto mt-2 max-w-6xl rounded-[2rem] p-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {[...links, { href: "/pitch", label: t.nav.pitch }].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold text-ink transition-colors hover:bg-black/[.04] dark:hover:bg-white/[.06]"
                  >
                    {l.label}
                    <ArrowUpRight className="size-4 text-brand" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-line px-2 pt-3">
              <LanguageSwitcher align="left" />
              <ThemeToggle />
            </div>
            <Link href="/#waitlist" onClick={() => setOpen(false)} className="btn btn-primary mt-3 h-12 w-full text-base">
              {t.nav.cta}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
