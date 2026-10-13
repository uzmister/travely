"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { SectionHeading } from "@/components/reveal";
import { Photo } from "@/components/photo";
import { destinations, countryName, formatMonths, type Region } from "@/data/destinations";
import { photos } from "@/data/images";
import { cn } from "@/lib/cn";

const featured = ["samarkand", "istanbul", "tokyo", "bukhara", "paris", "bali", "dubai", "tbilisi", "cappadocia", "seoul", "almaty", "rome", "maldives"];

export function Destinations() {
  const { t, locale } = useI18n();
  const [region, setRegion] = useState<Region | "all">("all");
  const regions = Object.keys(t.destinations.regions) as (Region | "all")[];

  const list = useMemo(() => {
    if (region === "all") return featured.map((id) => destinations.find((d) => d.id === id)!).filter(Boolean);
    return destinations.filter((d) => d.region === region);
  }, [region]);

  return (
    <section id="destinations" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={t.destinations.eyebrow} title={<Rich text={t.destinations.title} />} subtitle={t.destinations.subtitle} />

        <div className="no-scrollbar mx-auto mt-10 flex max-w-full gap-2 overflow-x-auto px-1 pb-2 sm:justify-center">
          <div className="soft-inset flex shrink-0 gap-1 rounded-full p-1">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors",
                  region === r ? "text-white" : "text-ink-2 hover:text-ink",
                )}
              >
                {region === r && (
                  <motion.span
                    layoutId="region-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff8a2b] to-[#f2540a] shadow-md shadow-orange-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{t.destinations.regions[r]}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((d, i) => {
              const big = i === 0;
              return (
                <motion.li
                  layout
                  key={d.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                  className={cn(big && "col-span-2 row-span-2")}
                >
                  <Link
                    href={d.planner ? `/planner?dest=${d.id}#planner` : "/planner#planner"}
                    className={cn(
                      "group relative block h-full overflow-hidden rounded-[1.75rem] shadow-[0_24px_50px_-30px_rgba(120,50,10,.55)] focus-visible:rounded-[1.75rem]",
                      big && "min-h-[22rem]",
                    )}
                  >
                    <Photo
                      id={photos[d.photo]}
                      alt={`${d.name.en}, ${countryName(d.country, "en")}`}
                      sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      className={cn(big ? "absolute inset-0" : "aspect-[3/4] w-full")}
                      imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <div className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/20 text-white opacity-0 ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="size-4" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-5">
                      <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/75">{countryName(d.country, locale)}</div>
                      <div className={cn("font-extrabold tracking-tight", big ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl")}>{d.name[locale]}</div>
                      <div className={cn("mt-2 flex flex-wrap gap-1.5 text-[0.68rem] font-bold", !big && "max-sm:hidden")}>
                        <span className="glass-dark-ui inline-flex items-center gap-1 rounded-full px-2.5 py-1">
                          <CalendarDays className="size-3" /> {formatMonths(d.months, locale)}
                        </span>
                        <span className="glass-dark-ui inline-flex items-center gap-1 rounded-full px-2.5 py-1">
                          <Clock className="size-3" /> {d.days[0] === d.days[1] ? d.days[0] : `${d.days[0]}–${d.days[1]}`} {t.common.days}
                        </span>
                      </div>
                      {big && (
                        <span className="btn btn-primary mt-4 h-10 px-4 text-sm">
                          {t.destinations.plan} <ArrowUpRight className="size-4" />
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
