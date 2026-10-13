"use client";

import { useI18n } from "@/i18n/provider";
import { destinations, countryName } from "@/data/destinations";
import { photos } from "@/data/images";
import { Photo } from "@/components/photo";
import { cn } from "@/lib/cn";

function Row({ items, reverse }: { items: typeof destinations; reverse?: boolean }) {
  const { locale } = useI18n();
  const doubled = [...items, ...items];
  return (
    <div className="mask-fade-x overflow-hidden py-2">
      <ul className={cn("flex w-max gap-3 hover:[animation-play-state:paused]", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {doubled.map((d, i) => (
          <li key={`${d.id}-${i}`} aria-hidden={i >= items.length}>
            <div className="soft-sm flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5">
              <Photo id={photos[d.photo]} alt="" sizes="48px" widths={[96, 160]} className="size-10 rounded-full" />
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-ink">{d.name[locale]}</div>
                <div className="text-[0.7rem] font-semibold text-ink-3">{countryName(d.country, locale)}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DestinationMarquee() {
  const { t } = useI18n();
  const half = Math.ceil(destinations.length / 2);
  return (
    <section aria-label={t.marquee} className="relative py-6">
      <p className="container-x mb-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-ink-3">{t.marquee}</p>
      <Row items={destinations.slice(0, half)} />
      <Row items={destinations.slice(half)} reverse />
    </section>
  );
}
