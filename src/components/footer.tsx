"use client";

import Link from "next/link";
import { Heart, Mail, Send } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { localeMeta, locales } from "@/i18n/config";
import { site } from "@/data/site";
import { Logo } from "./logo";
import { cn } from "@/lib/cn";

export function Footer() {
  const { t, locale, setLocale } = useI18n();

  const cols = [
    {
      title: t.footer.product,
      links: [
        { href: "/#features", label: t.nav.features },
        { href: "/planner", label: t.nav.planner },
        { href: "/#destinations", label: t.nav.destinations },
        { href: "/#pricing", label: t.nav.pricing },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { href: "/pitch", label: t.nav.pitch },
        { href: "/#waitlist", label: t.footer.partners },
        { href: `mailto:${site.email}`, label: t.footer.careers },
        { href: `mailto:${site.email}`, label: t.footer.press },
      ],
    },
    {
      title: t.footer.resources,
      links: [
        { href: "/#faq", label: t.footer.help },
        { href: "/#faq", label: t.footer.privacy },
        { href: "/#faq", label: t.footer.terms },
      ],
    },
  ];

  return (
    <footer className="relative mt-10 px-3 pb-6 sm:px-5">
      <div className="soft mx-auto max-w-7xl rounded-[2.5rem] px-6 py-12 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-2">
              <a href={`https://t.me/${site.telegram}`} className="btn btn-soft size-10 p-0" aria-label="Telegram" target="_blank" rel="noreferrer">
                <Send className="size-4" />
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-soft size-10 p-0" aria-label="Email">
                <Mail className="size-4" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-3">{c.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm font-semibold text-ink-2 transition-colors hover:text-brand-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                  l === locale ? "bg-brand text-white" : "text-ink-2 hover:bg-black/[.04] dark:hover:bg-white/[.06]",
                )}
              >
                {localeMeta[l].label}
              </button>
            ))}
          </div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
            © {new Date().getFullYear()} Travely. {t.footer.rights}
            <span className="mx-1">·</span>
            <Heart className="size-3.5 fill-brand text-brand" /> {t.footer.made}
          </p>
        </div>
      </div>
    </footer>
  );
}
