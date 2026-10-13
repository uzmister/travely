"use client";

import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  Headphones,
  MapPinned,
  Plane,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Reveal, SectionHeading } from "@/components/reveal";
import { Photo } from "@/components/photo";
import { photos } from "@/data/images";
import { cn } from "@/lib/cn";

function Card({
  className,
  icon: Icon,
  title,
  text,
  children,
  delay = 0,
}: {
  className?: string;
  icon: typeof Plane;
  title: string;
  text: string;
  children?: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <article className="soft group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6">
        <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-[#ffb062] to-[#f2540a] text-white shadow-lg shadow-orange-500/30">
          <Icon className="size-5" />
        </span>
        <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{text}</p>
        {children}
      </article>
    </Reveal>
  );
}

export function Features() {
  const { t } = useI18n();
  const f = t.features;

  const timeline = [
    { time: "09:00", name: "Ark Fortress", tag: "1.5 h" },
    { time: "11:00", name: "Po-i-Kalyan", tag: "1 h" },
    { time: "13:30", name: "Lyabi-Hauz", tag: "plov" },
    { time: "18:30", name: "Bozori Kord Hammam", tag: "relax" },
  ];

  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={f.eyebrow} title={<Rich text={f.title} />} subtitle={f.subtitle} />

        <div className="mt-14 grid auto-rows-auto gap-4 md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4">
          {/* AI planner — hero card */}
          <Card className="md:col-span-2 lg:row-span-2" icon={Sparkles} title={f.planner.title} text={f.planner.text}>
            <div className="soft-inset mt-6 flex-1 rounded-[1.5rem] p-4">
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-br from-[#ff8a2b] to-[#f2540a] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25">
                {f.mockPrompt}
              </div>
              <div className="mt-3 flex items-start gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-ink">
                  <Sparkles className="size-4" />
                </span>
                <div className="glass flex-1 rounded-2xl rounded-tl-sm p-3">
                  <p className="text-sm font-semibold text-ink">{f.mockReply}</p>
                  <ol className="mt-3 space-y-1.5">
                    {timeline.map((s, i) => (
                      <li key={s.name} className="flex items-center gap-3 rounded-xl bg-surface/70 px-3 py-2 text-[0.8rem] dark:bg-white/5">
                        <span className="font-mono text-[0.72rem] font-bold text-brand-ink">{s.time}</span>
                        <span className="h-4 w-px bg-line-strong" />
                        <span className="flex-1 font-bold text-ink">{s.name}</span>
                        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[0.65rem] font-bold text-brand-ink">{s.tag}</span>
                        {i < timeline.length - 1 && <span className="sr-only">→</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </Card>

          {/* Smart budget */}
          <Card className="md:col-span-1" icon={Wallet} title={f.budget.title} text={f.budget.text} delay={0.05}>
            <div className="mt-5 flex items-center gap-4">
              <svg viewBox="0 0 42 42" className="size-20 -rotate-90" aria-hidden>
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="currentColor" strokeWidth="5" className="text-black/5 dark:text-white/10" />
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="url(#bud)" strokeWidth="5" strokeDasharray="72 28" strokeLinecap="round" />
                <defs>
                  <linearGradient id="bud" x1="0" x2="1">
                    <stop offset="0" stopColor="#ffb347" />
                    <stop offset="1" stopColor="#f2540a" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="space-y-1 text-[0.8rem] font-semibold">
                <div className="text-ink-3">{f.mockSpent}</div>
                <div className="text-xl font-extrabold text-ink">$432</div>
                <div className="text-ink-3">
                  {f.mockLeft}: <span className="font-extrabold text-brand-ink">$168</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Local experiences (photo) */}
          <Reveal className="md:col-span-1 lg:row-span-2" delay={0.1}>
            <article className="group relative h-full min-h-[22rem] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(150,60,10,.55)]">
              <Photo
                id={photos.plov}
                alt="Traditional Uzbek plov"
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="absolute inset-0"
                imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="glass-dark-ui grid size-11 place-items-center rounded-2xl">
                  <MapPinned className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight">{f.local.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{f.local.text}</p>
              </div>
            </article>
          </Reveal>

          {/* One-tap booking */}
          <Card icon={Ticket} title={f.booking.title} text={f.booking.text} delay={0.1}>
            <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#ff8a2b] to-[#f2540a] p-3.5 text-white">
              <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-widest text-white/80">
                <span>TAS</span>
                <Plane className="size-4" />
                <span>SKD</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-lg font-extrabold">
                <span>08:00</span>
                <span className="mx-2 h-px flex-1 border-t border-dashed border-white/60" />
                <span>10:10</span>
              </div>
              <span className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-surface" aria-hidden />
              <span className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-surface" aria-hidden />
            </div>
          </Card>

          {/* Offline audio guide */}
          <Card icon={Headphones} title={f.guide.title} text={f.guide.text} delay={0.05}>
            <div className="mt-5 flex h-10 items-end gap-[3px]" aria-hidden>
              {[30, 55, 40, 75, 50, 90, 60, 35, 70, 45, 85, 55, 30, 65, 40, 80, 50, 35, 60, 45].map((h, i) => (
                <span
                  key={i}
                  className={cn("w-full rounded-full", i < 11 ? "bg-gradient-to-t from-brand to-amber-300" : "bg-black/10 dark:bg-white/10")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </Card>

          {/* Visa & safety */}
          <Card icon={ShieldCheck} title={f.safety.title} text={f.safety.text} delay={0.1}>
            <div className="mt-5 flex flex-wrap gap-2 text-[0.72rem] font-bold">
              <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300">e-Visa ✓</span>
              <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand-ink ring-1 ring-brand/20">SOS 112</span>
              <span className="rounded-full bg-sky-500/12 px-2.5 py-1 text-sky-700 ring-1 ring-sky-500/25 dark:text-sky-300">24°C ☀</span>
            </div>
          </Card>

          {/* Payments */}
          <Card className="md:col-span-2" icon={CreditCard} title={f.payments.title} text={f.payments.text} delay={0.15}>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Visa", "Mastercard", "Apple Pay", "Uzcard", "Humo", "Payme", "Click"].map((p, i) => (
                <span
                  key={p}
                  className={cn(
                    "soft-sm rounded-xl px-3.5 py-2 text-[0.8rem] font-extrabold tracking-tight",
                    i >= 3 ? "text-brand-ink" : "text-ink",
                  )}
                >
                  {p}
                </span>
              ))}
            </div>
          </Card>

          {/* Plan together */}
          <Card className="md:col-span-1 lg:col-span-2" icon={Users} title={f.group.title} text={f.group.text} delay={0.05}>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["A", "D", "M", "S"].map((a, i) => (
                  <span
                    key={a}
                    className="grid size-10 place-items-center rounded-full text-sm font-extrabold text-white ring-[3px] ring-surface"
                    style={{ background: ["#ff8a2b", "#f2540a", "#ffb347", "#c2410c"][i] }}
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div className="flex-1 space-y-2">
                {[78, 54].map((w, i) => (
                  <div key={w} className="flex items-center gap-2 text-[0.72rem] font-bold text-ink-2">
                    <span className="w-16 truncate">{i === 0 ? "Registan" : "Siab"}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                      <span className="block h-full rounded-full bg-gradient-to-r from-amber-400 to-brand" style={{ width: `${w}%` }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* CTA tile */}
          <Reveal className="md:col-span-2" delay={0.1}>
            <Link
              href="/planner"
              className="group relative flex h-full min-h-[12rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ff9a3d] via-[#ff6a13] to-[#d9440a] p-6 text-white shadow-[0_30px_60px_-30px_rgba(242,84,10,.8)]"
            >
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-white/15 blur-2xl transition-transform duration-700 group-hover:scale-125" aria-hidden />
              <span className="relative text-xs font-extrabold uppercase tracking-[0.16em] text-white/80">{t.planner.eyebrow}</span>
              <div className="relative flex items-end justify-between gap-4">
                <h3 className="max-w-xs text-2xl font-extrabold leading-tight tracking-tight">{t.planner.title.replaceAll("*", "")}</h3>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-brand transition-transform group-hover:translate-x-1">
                  <ArrowRight className="size-5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
