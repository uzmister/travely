"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Brain,
  CalendarCheck,
  Check,
  CircleDashed,
  Compass,
  Database,
  Globe2,
  Handshake,
  Headphones,
  Landmark,
  Languages,
  Mail,
  MapPin,
  MapPinned,
  Megaphone,
  MessageSquareText,
  Network,
  Quote,
  Rocket,
  Send,
  Sparkles,
  Target,
  Ticket,
  TrendingUp,
  UserPlus,
  Wand2,
} from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Photo } from "@/components/photo";
import { LogoMark } from "@/components/logo";
import { photos } from "@/data/images";
import { sources, plan12, plan12Total, raise, unit } from "@/data/market";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { fmtCompact, fmtNum, fmtUsd } from "@/lib/format";
import { FundsBars, MarketCircles, RevenueCostChart, VisitorsChart } from "./charts";

const ease = [0.2, 0.7, 0.2, 1] as const;

/* ------------------------------------------------------------------ */
/*  Shared chrome                                                      */
/* ------------------------------------------------------------------ */

export function SlideShell({
  n,
  total,
  eyebrow,
  title,
  children,
  className,
}: {
  n: number;
  total: number;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative flex h-full w-full flex-col overflow-hidden bg-[var(--slide-bg)] p-6 @3xl:px-14 @3xl:py-11", className)}>
      <div className="pointer-events-none absolute -right-40 -top-40 size-[30rem] rounded-full bg-brand/12 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-48 -left-32 size-[26rem] rounded-full bg-amber-300/15 blur-3xl" aria-hidden />
      <header className="relative">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="eyebrow !text-[11px] @3xl:!text-[13px]">
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-brand px-1.5 text-[11px] text-white">{String(n).padStart(2, "0")}</span>
          {eyebrow}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="mt-3 max-w-[60rem] text-balance text-[26px] font-extrabold leading-[1.07] tracking-[-0.035em] text-ink @3xl:text-[44px]"
        >
          <Rich text={title} />
        </motion.h2>
      </header>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.12, ease }}
        className="relative mt-6 min-h-0 flex-1 @3xl:mt-7"
      >
        {children}
      </motion.div>
      <footer className="relative mt-5 flex items-center justify-between text-[11px] font-bold text-ink-3 @3xl:text-[12px]">
        <span className="flex items-center gap-2">
          <LogoMark className="size-5" />
          travely · Pre-seed 2026
        </span>
        <span className="tabular-nums">
          {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </footer>
    </div>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("soft rounded-[1.5rem] p-4 @3xl:p-5", className)}>{children}</div>;
}

function IconBadge({ icon: Icon, className }: { icon: typeof Rocket; className?: string }) {
  return (
    <span className={cn("grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#ffb062] to-[#f2540a] text-white shadow-lg shadow-orange-500/30 @3xl:size-11", className)}>
      <Icon className="size-5" />
    </span>
  );
}

type SlideProps = { n: number; total: number };

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* ------------------------------------------------------------------ */
/*  Slides                                                             */
/* ------------------------------------------------------------------ */

export function CoverSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const c = t.pitch.cover;
  return (
    <div className="relative grid h-full w-full overflow-hidden bg-[var(--slide-bg)] @3xl:grid-cols-[1.05fr_1fr]">
      <div className="pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full bg-brand/15 blur-3xl" aria-hidden />
      <div className="relative flex flex-col justify-between gap-8 p-7 @3xl:p-14">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex items-center gap-3">
          <LogoMark className="size-11" />
          <span className="text-2xl font-extrabold tracking-[-0.04em] text-ink">
            travely<span className="text-brand">.</span>
          </span>
        </motion.div>
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow !text-[11px] @3xl:!text-[13px]">
            {c.kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-4 text-[64px] font-extrabold leading-[0.9] tracking-[-0.06em] text-ink @3xl:text-[112px]"
          >
            Travely<span className="text-brand">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-5 max-w-[30rem] text-balance text-[20px] font-bold leading-snug tracking-[-0.02em] text-ink-2 @3xl:text-[28px]"
          >
            <Rich text={c.tagline} />
          </motion.p>
          {site.founders[0] && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffc285] via-[#ff8a2b] to-[#e8480a] text-[14px] font-extrabold text-white shadow-lg shadow-orange-500/30">
                {initialsOf(site.founders[0])}
              </span>
              <div className="leading-tight">
                <div className="text-[16px] font-extrabold text-ink @3xl:text-[18px]">{site.founders[0]}</div>
                <div className="text-[12px] font-bold text-brand-ink @3xl:text-[13px]">{t.pitch.team.members[0].role}</div>
              </div>
            </motion.div>
          )}
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }} className="flex flex-wrap items-center gap-3">
          <span className="btn btn-primary h-11 px-5 text-[14px]">
            <Rocket className="size-4" /> {c.raising}
          </span>
          <span className="glass inline-flex h-11 items-center gap-2 rounded-full px-4 text-[13px] font-bold text-ink-2">
            <MapPin className="size-4 text-brand" /> {c.location}
          </span>
        </motion.div>
      </div>
      <div className="relative min-h-[16rem] p-3 @3xl:p-5 @3xl:pl-0">
        <div className="grid h-full grid-cols-2 grid-rows-[1.3fr_1fr] gap-3">
          <Photo id={photos.samarkand} alt="Registan, Samarkand" sizes="40vw" className="col-span-2 min-h-[11rem] rounded-[1.75rem]">
            <span className="glass-dark-ui absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold">Samarkand · UZ</span>
          </Photo>
          <Photo id={photos.istanbul} alt="Istanbul" sizes="20vw" className="min-h-[8rem] rounded-[1.75rem]">
            <span className="glass-dark-ui absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold">Istanbul · TR</span>
          </Photo>
          <Photo id={photos.tokyo} alt="Tokyo" sizes="20vw" className="min-h-[8rem] rounded-[1.75rem]">
            <span className="glass-dark-ui absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold">Tokyo · JP</span>
          </Photo>
        </div>
      </div>
      <span className="absolute bottom-4 left-7 hidden text-[11px] font-bold text-ink-3 @3xl:left-14 @3xl:block">
        {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

export function ProblemSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const p = t.pitch.problem;
  return (
    <SlideShell n={n} total={total} eyebrow={p.eyebrow} title={p.title}>
      <div className="flex h-full flex-col gap-4">
        <div className="grid flex-1 gap-3 @3xl:grid-cols-3 @3xl:gap-4">
          {p.cards.map((c) => (
            <Card key={c.label} className="flex flex-col">
              <div className="text-[44px] font-extrabold leading-none tracking-[-0.05em] text-brand @3xl:text-[80px]">{c.stat}</div>
              <div className="mt-3 text-[15px] font-extrabold leading-snug text-ink @3xl:text-[21px]">{c.label}</div>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2 @3xl:text-[16.5px]">{c.text}</p>
              <span className="mt-auto pt-3 text-[11px] font-bold text-ink-3">{c.src}</span>
            </Card>
          ))}
        </div>
        <div className="glass flex items-start gap-3 rounded-[1.5rem] p-4 @3xl:items-center">
          <MapPinned className="size-5 shrink-0 text-brand" />
          <p className="text-[13px] font-semibold leading-relaxed text-ink @3xl:text-[15px]">{p.local}</p>
        </div>
      </div>
    </SlideShell>
  );
}

export function SolutionSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const s = t.pitch.solution;
  const icons = [Wand2, Ticket, Compass];
  const pics = [photos.planning, photos.passport, photos.samarkandGurEmir];
  return (
    <SlideShell n={n} total={total} eyebrow={s.eyebrow} title={s.title}>
      <div className="flex h-full flex-col gap-4">
        <div className="grid flex-1 gap-3 @3xl:grid-cols-3 @3xl:gap-4">
          {s.pillars.map((pl, i) => (
            <Card key={pl.title} className="relative flex flex-col overflow-hidden">
              <span className="absolute right-4 top-2 text-[72px] font-extrabold leading-none tracking-tighter text-brand/10">{i + 1}</span>
              <IconBadge icon={icons[i]} />
              <h3 className="mt-4 text-[20px] font-extrabold tracking-tight text-ink @3xl:text-[26px]">{pl.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-2 @3xl:text-[16px]">{pl.text}</p>
              <Photo id={pics[i]} alt="" sizes="30vw" className="mt-4 hidden min-h-0 flex-1 rounded-2xl @3xl:block" />
            </Card>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-r from-[#ff8a2b] to-[#e8480a] p-5 text-white @3xl:p-6">
          <Quote className="absolute right-5 top-3 size-16 text-white/15" />
          <p className="relative font-serif text-[18px] font-semibold italic leading-snug @3xl:text-[26px]">“{s.quote}”</p>
        </div>
      </div>
    </SlideShell>
  );
}

export function ProductSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const pr = t.pitch.product;
  const icons = [MessageSquareText, CalendarCheck, Ticket, Headphones];
  return (
    <SlideShell n={n} total={total} eyebrow={pr.eyebrow} title={pr.title}>
      <div className="grid h-full gap-3 @3xl:grid-cols-4 @3xl:gap-4">
        {pr.steps.map((st, i) => {
          const Icon = icons[i];
          return (
            <div key={st.title} className="relative flex flex-col">
              <Card className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <IconBadge icon={Icon} />
                  <span className="text-[12px] font-extrabold text-ink-3">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-[18px] font-extrabold tracking-tight text-ink @3xl:text-[22px]">{st.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2 @3xl:text-[14px]">{st.text}</p>
                <div className="soft-inset mt-auto hidden rounded-2xl p-3 @3xl:block" aria-hidden>
                  {i === 0 && (
                    <div className="space-y-2">
                      <div className="ml-auto h-6 w-4/5 rounded-xl rounded-br-sm bg-brand/80" />
                      <div className="h-6 w-3/5 rounded-xl rounded-bl-sm bg-ink/10" />
                    </div>
                  )}
                  {i === 1 && (
                    <div className="space-y-1.5">
                      {[80, 64, 72, 50].map((w, k) => (
                        <div key={k} className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-brand" />
                          <span className="h-2.5 rounded-full bg-ink/10" style={{ width: `${w}%` }} />
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 2 && (
                    <div className="flex items-center justify-between rounded-xl bg-brand px-3 py-2.5 text-[11px] font-extrabold text-white">
                      <span>TAS 08:00</span>
                      <ArrowRight className="size-3.5" />
                      <span>SKD 10:10</span>
                    </div>
                  )}
                  {i === 3 && (
                    <div className="flex h-9 items-end gap-[3px]">
                      {[40, 70, 50, 90, 60, 80, 45, 65, 85, 55, 35, 70].map((h, k) => (
                        <span key={k} className={cn("w-full rounded-full", k < 7 ? "bg-brand" : "bg-ink/10")} style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  )}
                </div>
              </Card>
              {i < 3 && (
                <span className="absolute -right-[1.15rem] top-1/2 z-10 hidden size-7 -translate-y-1/2 place-items-center rounded-full bg-surface text-brand shadow-md @3xl:grid">
                  <ArrowRight className="size-4" />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </SlideShell>
  );
}

export function WhyNowSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const w = t.pitch.whyNow;
  const icons = [TrendingUp, Brain, Globe2];
  return (
    <SlideShell n={n} total={total} eyebrow={w.eyebrow} title={w.title}>
      <div className="grid h-full gap-4 @3xl:grid-cols-[1.25fr_1fr] @3xl:gap-6">
        <Card className="flex flex-col justify-center">
          <VisitorsChart title={w.chartTitle} note={w.chartNote} />
        </Card>
        <div className="flex flex-col gap-3">
          {w.points.map((pt, i) => {
            const Icon = icons[i];
            return (
              <Card key={pt.label} className="flex flex-1 items-center gap-4">
                <IconBadge icon={Icon} />
                <div>
                  <div className="text-[28px] font-extrabold leading-none tracking-[-0.04em] text-ink @3xl:text-[34px]">{pt.value}</div>
                  <p className="mt-1 text-[12px] font-semibold leading-snug text-ink-2 @3xl:text-[13.5px]">{pt.label}</p>
                  <span className="text-[11px] font-bold text-ink-3">{pt.src}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

export function MarketSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const { locale } = useI18n();
  const m = t.pitch.market;
  const usd = (v: number) => fmtCompact(v, locale, true);
  const rows = [
    { tag: "TAM", value: usd(1.2e12), text: m.tam, src: "Phocuswright", dot: "bg-brand-soft ring-1 ring-brand/30" },
    { tag: "SAM", value: `≈ ${usd(10e9)}`, text: m.sam, src: "WTTC · Tourism Committee", dot: "bg-brand-3" },
    { tag: "SOM", value: usd(plan12Total.gbv), text: m.som, src: "Travely · 12 months", dot: "bg-brand" },
  ];
  return (
    <SlideShell n={n} total={total} eyebrow={m.eyebrow} title={m.title}>
      <div className="grid h-full items-center gap-4 @3xl:grid-cols-[0.9fr_1.4fr] @3xl:gap-8">
        <MarketCircles values={[usd(1.2e12), usd(10e9), usd(plan12Total.gbv)]} />
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.tag} className="soft flex flex-wrap items-center gap-x-4 gap-y-1 rounded-[1.25rem] px-4 py-3">
              <span className={cn("size-4 shrink-0 rounded-full", r.dot)} />
              <span className="w-12 text-[12px] font-extrabold tracking-widest text-ink-3">{r.tag}</span>
              <span className="min-w-24 whitespace-nowrap text-[22px] font-extrabold tracking-[-0.03em] text-ink @3xl:min-w-32 @3xl:text-[24px]">{r.value}</span>
              <div className="min-w-0 basis-full @xl:basis-0 @xl:flex-1">
                <p className="text-[12.5px] font-semibold leading-snug text-ink-2 @3xl:text-[14px]">{r.text}</p>
                <span className="text-[10.5px] font-bold text-ink-3">{r.src}</span>
              </div>
            </div>
          ))}
          <div className="grid gap-3 @xl:grid-cols-2">
            <div className="glass rounded-[1.25rem] px-4 py-3">
              <div className="text-[22px] font-extrabold tracking-tight text-brand-ink">{usd(13.38e9)}</div>
              <p className="text-[12px] font-semibold leading-snug text-ink-2">{m.ai}</p>
              <span className="text-[10.5px] font-bold text-ink-3">MarketsandMarkets</span>
            </div>
            <div className="glass rounded-[1.25rem] px-4 py-3">
              <div className="text-[22px] font-extrabold tracking-tight text-brand-ink">{usd(186.1e9)}</div>
              <p className="text-[12px] font-semibold leading-snug text-ink-2">{m.booking}</p>
              <span className="text-[10.5px] font-bold text-ink-3">Booking Holdings 10-K</span>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export function BusinessSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const b = t.pitch.business;
  const icons = [Ticket, Sparkles, BadgeCheck, Handshake];
  return (
    <SlideShell n={n} total={total} eyebrow={b.eyebrow} title={b.title}>
      <div className="grid h-full gap-4 @3xl:grid-cols-[1.5fr_1fr] @3xl:gap-6">
        <div className="flex flex-col gap-3">
          <div className="grid flex-1 gap-3 @xl:grid-cols-2">
            {b.streams.map((s, i) => (
              <Card key={s.title} className="flex gap-3">
                <IconBadge icon={icons[i]} className="size-9 @3xl:size-10" />
                <div className="min-w-0">
                  <div className="text-[13px] font-extrabold text-ink-2 @3xl:text-[14px]">{s.title}</div>
                  <div className="text-[22px] font-extrabold tracking-[-0.03em] text-brand-ink @3xl:text-[26px]">{s.value}</div>
                  <p className="mt-0.5 text-[12px] leading-snug text-ink-2 @3xl:text-[13px]">{s.text}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="rounded-[1.25rem] bg-ink px-4 py-3 text-[13px] font-bold text-bg @3xl:text-[15px]">{b.blended}</div>
        </div>
        <div className="relative hidden place-items-center @3xl:grid">
          <div className="relative size-[22rem]">
            <motion.svg viewBox="0 0 200 200" className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
              <circle cx="100" cy="100" r="80" fill="none" stroke="var(--brand)" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 6" />
            </motion.svg>
            <div className="soft absolute inset-[36%] grid place-items-center rounded-full text-center">
              <LogoMark className="size-12" />
            </div>
            {b.flywheel.map((f, i) => {
              const pos = ["left-1/2 top-0 -translate-x-1/2", "right-0 top-1/2 -translate-y-1/2", "bottom-0 left-1/2 -translate-x-1/2", "left-0 top-1/2 -translate-y-1/2"][i];
              return (
                <span key={f} className={cn("glass absolute max-w-[9rem] rounded-2xl px-3 py-2 text-center text-[12px] font-extrabold leading-tight text-ink", pos)}>
                  {f}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export function UnitSlide({ n, total }: SlideProps) {
  const { t, locale } = useI18n();
  const u = t.pitch.unit;
  const hero = u.metrics[3];
  const rest = u.metrics.filter((_, i) => i !== 3);
  return (
    <SlideShell n={n} total={total} eyebrow={u.eyebrow} title={u.title}>
      <div className="flex h-full flex-col gap-3">
        <div className="grid flex-1 gap-3 @3xl:grid-cols-[1.45fr_1fr] @3xl:gap-4">
          <div className="grid gap-3 @xl:grid-cols-2 @3xl:gap-4">
            {rest.map((m) => (
              <Card key={m.label} className="flex flex-col">
                <div className="text-[34px] font-extrabold leading-none tracking-[-0.05em] text-ink @3xl:text-[46px]">{m.value}</div>
                <p className="mt-2.5 text-[13px] font-bold leading-snug text-ink @3xl:text-[15px]">{m.label}</p>
                <p className="mt-auto pt-2 text-[11px] font-semibold leading-snug text-ink-3 @3xl:text-[12px]">{m.note}</p>
              </Card>
            ))}
          </div>
          <div className="relative flex flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#ff9a3d] via-[#ff6a13] to-[#cf3f06] p-5 text-white shadow-[0_30px_60px_-30px_rgba(242,84,10,.85)] @3xl:p-7">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-white/15 blur-2xl" aria-hidden />
            <div className="relative text-[13px] font-extrabold uppercase tracking-[0.14em] text-white/80">{hero.label}</div>
            <div className="relative mt-1 text-[64px] font-extrabold leading-none tracking-[-0.06em] @3xl:text-[96px]">{hero.value}</div>
            <div className="relative mt-auto space-y-3 pt-6">
              {[
                { k: "LTV", v: unit.ltv, w: 100 },
                { k: "CAC", v: unit.cac, w: (unit.cac / unit.ltv) * 100 },
              ].map((b, i) => (
                <div key={b.k}>
                  <div className="flex justify-between text-[13px] font-extrabold">
                    <span>{b.k}</span>
                    <span>{fmtUsd(b.v, locale, b.v % 1 ? 1 : 0)}</span>
                  </div>
                  <div className="mt-1.5 h-3 rounded-full bg-white/20">
                    <motion.div
                      className="h-full rounded-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${b.w}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.15, ease }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-[12px] font-semibold text-white/80">{hero.note}</p>
            </div>
          </div>
        </div>
        <p className="text-[12px] font-semibold text-ink-3">{u.note}</p>
      </div>
    </SlideShell>
  );
}

export function TractionSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const tr = t.pitch.traction;
  return (
    <SlideShell n={n} total={total} eyebrow={tr.eyebrow} title={tr.title}>
      <div className="grid h-full gap-4 @3xl:grid-cols-2 @3xl:gap-6">
        <Card>
          <div className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
            <BadgeCheck className="size-5" /> {tr.done}
          </div>
          <ul className="mt-4 space-y-3">
            {tr.doneItems.map((d) => (
              <li key={d} className="flex items-start gap-3 text-[14px] font-bold text-ink @3xl:text-[18px]">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-5 hidden rounded-2xl bg-surface-2 p-3 ring-1 ring-line @3xl:block" aria-hidden>
            <div className="flex items-center gap-2 text-[11px] font-extrabold text-ink-3">
              <span className="size-2 rounded-full bg-emerald-500" /> travely · /planner
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[photos.samarkand, photos.bukhara, photos.tashkent].map((ph) => (
                <Photo key={ph} id={ph} alt="" sizes="160px" widths={[240, 400]} className="h-14 rounded-xl" />
              ))}
            </div>
          </div>
        </Card>
        <div className="glass rounded-[1.5rem] p-4 @3xl:p-5">
          <div className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.14em] text-brand-ink">
            <Target className="size-5" /> {tr.next}
          </div>
          <ul className="mt-4 space-y-3">
            {tr.nextItems.map((d) => (
              <li key={d} className="flex items-start gap-3 text-[14px] font-bold text-ink @3xl:text-[18px]">
                <CircleDashed className="mt-0.5 size-6 shrink-0 text-brand" />
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-6 hidden @3xl:block" aria-hidden>
            <div className="relative h-1.5 rounded-full bg-black/[.06] dark:bg-white/10">
              <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-brand" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.4, delay: 0.3, ease }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px] font-extrabold text-ink-3">
              {["0", "30", "60", "90"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export function GtmSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const g = t.pitch.gtm;
  const channelIcons = [Send, Megaphone, Globe2, MapPinned, Network, UserPlus];
  const pics = [photos.samarkandStreet, photos.almaty, photos.istanbul];
  return (
    <SlideShell n={n} total={total} eyebrow={g.eyebrow} title={g.title}>
      <div className="flex h-full flex-col gap-4">
        <div className="relative grid flex-1 gap-3 @3xl:grid-cols-3 @3xl:gap-4">
          <div className="absolute left-[16%] right-[16%] top-[2.1rem] hidden h-0.5 bg-gradient-to-r from-brand via-brand-2 to-brand-3 @3xl:block" aria-hidden />
          {g.phases.map((ph, i) => (
            <Card key={ph.title} className="relative flex flex-col">
              <span className="mx-auto grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#ffb062] to-[#f2540a] text-[14px] font-extrabold text-white ring-4 ring-[var(--slide-bg)]">{i + 1}</span>
              <div className="mt-3 text-center text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-ink">{ph.phase}</div>
              <h3 className="mt-1 text-center text-[19px] font-extrabold tracking-tight text-ink @3xl:text-[22px]">{ph.title}</h3>
              <p className="mt-1.5 text-center text-[12.5px] leading-relaxed text-ink-2 @3xl:text-[14px]">{ph.text}</p>
              <Photo id={pics[i]} alt="" sizes="30vw" className="mt-3 hidden min-h-0 flex-1 rounded-2xl @3xl:block" />
            </Card>
          ))}
        </div>
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-3">{g.channelsTitle}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {g.channels.map((c, i) => {
              const Icon = channelIcons[i];
              return (
                <span key={c} className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-bold text-ink @3xl:text-[13px]">
                  <Icon className="size-4 text-brand" /> {c}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const matrix: { name: string; values: number[]; highlight?: boolean }[] = [
  { name: "Travely", values: [2, 2, 2, 2, 2, 2, 2], highlight: true },
  { name: "Booking / Expedia", values: [1, 2, 1, 1, 0, 1, 0] },
  { name: "Tripadvisor", values: [1, 1, 1, 1, 0, 2, 0] },
  { name: "Mindtrip", values: [2, 1, 0, 1, 0, 1, 0] },
  { name: "ChatGPT", values: [2, 1, 1, 2, 0, 0, 0] },
];

function Mark({ v, labels }: { v: number; labels: [string, string, string] }) {
  if (v === 2)
    return (
      <span className="grid size-6 place-items-center rounded-full bg-brand text-white" aria-label={labels[0]}>
        <Check className="size-3.5" strokeWidth={3} />
      </span>
    );
  if (v === 1)
    return (
      <span className="relative block size-6 overflow-hidden rounded-full ring-2 ring-inset ring-brand/60" aria-label={labels[1]}>
        <span className="absolute inset-y-0 left-0 w-1/2 bg-brand/60" />
      </span>
    );
  return <span className="block size-6 rounded-full ring-2 ring-inset ring-line-strong" aria-label={labels[2]} />;
}

export function CompetitionSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const c = t.pitch.competition;
  const labels: [string, string, string] = [c.legendFull, c.legendPartial, c.legendNone];
  return (
    <SlideShell n={n} total={total} eyebrow={c.eyebrow} title={c.title}>
      <div className="flex h-full flex-col gap-3">
        <div className="soft no-scrollbar overflow-x-auto rounded-[1.5rem] p-2">
          <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-ink-3" />
                {c.features.map((f) => (
                  <th key={f} className="px-2 py-3 text-center text-[11px] font-extrabold leading-tight text-ink-2 @3xl:text-[13.5px]">
                    {f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.name} className={cn(row.highlight && "bg-brand-soft")}>
                  <th className={cn("whitespace-nowrap px-3 py-2.5 text-[13px] font-extrabold @3xl:py-4 @3xl:text-[16px]", row.highlight ? "rounded-l-2xl text-brand-ink" : "text-ink")}>
                    {row.highlight && <LogoMark className="mr-2 inline size-5 align-[-5px]" />}
                    {row.name}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className={cn("px-2 py-2.5 @3xl:py-4", row.highlight && i === row.values.length - 1 && "rounded-r-2xl")}>
                      <div className="grid place-items-center">
                        <Mark v={v} labels={labels} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold text-ink-2">
          {[2, 1, 0].map((v, i) => (
            <span key={v} className="flex items-center gap-2">
              <Mark v={v} labels={labels} /> {labels[i]}
            </span>
          ))}
        </div>
        <p className="text-[11.5px] font-semibold leading-snug text-ink-3 @3xl:text-[12.5px]">{c.note}</p>
      </div>
    </SlideShell>
  );
}

export function MoatSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const m = t.pitch.moat;
  const icons = [Handshake, Database, Languages, Send, Landmark];
  return (
    <SlideShell n={n} total={total} eyebrow={m.eyebrow} title={m.title}>
      <div className="grid h-full gap-3 @xl:grid-cols-2 @3xl:grid-cols-6 @3xl:gap-4">
        {m.items.map((it, i) => (
          <Card key={it.title} className={cn("flex flex-col", i < 3 ? "@3xl:col-span-2" : "@3xl:col-span-3")}>
            <IconBadge icon={icons[i]} />
            <h3 className="mt-3 text-[16px] font-extrabold tracking-tight text-ink @3xl:text-[19px]">{it.title}</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2 @3xl:text-[14px]">{it.text}</p>
          </Card>
        ))}
      </div>
    </SlideShell>
  );
}

export function FinancialsSlide({ n, total }: SlideProps) {
  const { t, locale } = useI18n();
  const f = t.pitch.financials;
  const usd = (v: number) => fmtUsd(v, locale);
  const signed = (v: number) => (v > 0 ? "+" : "") + fmtUsd(v, locale);
  type Row = { users: number; mau: number; bookings: number; gbv: number; revenue: number; costs: number; net: number };
  const rows: { label: string; get: (p: Row) => string; strong?: boolean }[] = [
    { label: f.users, get: (p) => fmtCompact(p.users, locale) },
    { label: f.mau, get: (p) => fmtCompact(p.mau, locale) },
    { label: f.bookings, get: (p) => fmtNum(p.bookings, locale) },
    { label: f.gbv, get: (p) => usd(p.gbv) },
    { label: f.revenue, get: (p) => usd(p.revenue), strong: true },
    { label: f.costs, get: (p) => usd(p.costs) },
    { label: f.net, get: (p) => signed(p.net) },
  ];
  const cols: (Row & { key: string; head: string; sub?: string; total?: boolean })[] = [
    ...plan12.map((p) => ({ ...p, key: p.q, head: p.q, sub: `${f.period} ${p.months}` })),
    { ...plan12Total, key: "total", head: f.total, total: true },
  ];
  return (
    <SlideShell n={n} total={total} eyebrow={f.eyebrow} title={f.title}>
      <div className="flex h-full flex-col gap-3">
        <div className="grid flex-1 gap-4 @3xl:grid-cols-[0.95fr_1.4fr] @3xl:gap-5">
          <Card className="flex flex-col justify-center">
            <RevenueCostChart title={f.chartTitle} revenueLabel={f.revenue} costsLabel={f.costs} />
          </Card>
          <div className="soft no-scrollbar overflow-x-auto rounded-[1.5rem] p-2">
            <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-right">
              <thead>
                <tr>
                  <th className="px-2.5 py-2 text-left" />
                  {cols.map((c) => (
                    <th key={c.key} className={cn("px-2.5 py-2 align-bottom", c.total && "rounded-t-xl bg-surface-2")}>
                      <div className="text-[13px] font-extrabold text-ink @3xl:text-[14px]">{c.head}</div>
                      {c.sub && <div className="whitespace-nowrap text-[10.5px] font-bold text-ink-3">{c.sub}</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={r.label} className={cn(r.strong && "bg-brand-soft")}>
                    <th className={cn("px-2.5 py-2 text-left text-[12px] font-bold leading-tight @3xl:py-[0.7rem] @3xl:text-[13.5px]", r.strong ? "rounded-l-xl text-brand-ink" : "text-ink-2")}>{r.label}</th>
                    {cols.map((c, i) => (
                      <td
                        key={c.key}
                        className={cn(
                          "whitespace-nowrap px-2.5 py-2 text-[12.5px] font-extrabold tabular-nums @3xl:py-[0.7rem] @3xl:text-[15px]",
                          r.strong ? "text-brand-ink" : "text-ink",
                          c.total && !r.strong && "bg-surface-2",
                          c.total && ri === rows.length - 1 && "rounded-b-xl",
                          r.strong && i === cols.length - 1 && "rounded-r-xl",
                        )}
                      >
                        {r.get(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[11px] font-semibold leading-snug text-ink-3 @3xl:text-[12px]">{f.note}</p>
      </div>
    </SlideShell>
  );
}

export function RoadmapSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const r = t.pitch.roadmap;
  const icons = [Rocket, MapPin, Handshake, Globe2, TrendingUp];
  return (
    <SlideShell n={n} total={total} eyebrow={r.eyebrow} title={r.title}>
      <div className="relative h-full">
        <div className="absolute left-0 right-0 top-[1.15rem] hidden h-1 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3/40 @3xl:block" aria-hidden />
        <ol className="relative grid h-full gap-3 @3xl:grid-cols-5 @3xl:gap-4">
          {r.items.map((it, i) => (
            <li key={it.when} className="flex flex-col">
              <span className={cn("hidden size-10 place-items-center rounded-full text-[13px] font-extrabold ring-4 ring-[var(--slide-bg)] @3xl:grid", i === 0 ? "bg-brand text-white" : "bg-surface text-brand-ink shadow-md")}>
                {i + 1}
              </span>
              <Card className={cn("mt-0 flex flex-1 flex-col @3xl:mt-4", i === 0 && "!bg-none bg-brand-soft ring-1 ring-brand/25")}>
                <span className="w-fit rounded-full bg-ink px-2.5 py-1 text-[11px] font-extrabold text-bg">{it.when}</span>
                <h3 className="mt-3 text-[16px] font-extrabold tracking-tight text-ink @3xl:text-[20px]">{it.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2 @3xl:text-[14.5px]">{it.text}</p>
                {(() => {
                  const Icon = icons[i];
                  return (
                    <span className="mt-auto hidden pt-4 @3xl:block">
                      <span className="soft-inset grid size-12 place-items-center rounded-2xl text-brand">
                        <Icon className="size-5" />
                      </span>
                    </span>
                  );
                })()}
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </SlideShell>
  );
}

export function TeamSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const tm = t.pitch.team;
  const initials = [site.founders[0] ? initialsOf(site.founders[0]) : "CEO", "DEV", "SMM", "LOC"];
  return (
    <SlideShell n={n} total={total} eyebrow={tm.eyebrow} title={tm.title}>
      <div className="grid h-full gap-3 @3xl:grid-cols-[1.5fr_1fr] @3xl:gap-4">
        <div className="flex flex-col gap-3">
          <div className="grid flex-1 gap-3 @xl:grid-cols-2">
            {tm.members.map((m, i) => (
              <Card key={m.role} className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffc285] via-[#ff8a2b] to-[#e8480a] text-[13px] font-extrabold text-white shadow-lg shadow-orange-500/30 @3xl:size-16 @3xl:text-[15px]">
                  {initials[i]}
                </span>
                <div className="min-w-0">
                  {site.founders[i] && <div className="text-[16px] font-extrabold text-ink @3xl:text-[18px]">{site.founders[i]}</div>}
                  <div className={cn("font-extrabold", site.founders[i] ? "text-[12.5px] text-brand-ink" : "text-[15px] text-ink @3xl:text-[18px]")}>{m.role}</div>
                  <p className="mt-1 text-[12.5px] leading-snug text-ink-2 @3xl:text-[14px]">{m.focus}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="glass flex flex-wrap items-center gap-2 rounded-[1.25rem] px-4 py-3">
            <span className="mr-1 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand-ink">
              <UserPlus className="size-4" /> {tm.hiring}
            </span>
            {tm.hiringItems.map((h) => (
              <span key={h} className="rounded-full bg-surface px-3 py-1 text-[12px] font-bold text-ink shadow-sm">
                {h}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-[12rem] overflow-hidden rounded-[1.75rem]">
          <Photo id={photos.tashkentCity} alt="Tashkent City" sizes="30vw" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <div className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-amber-200">
              <MapPin className="size-4" /> {t.pitch.cover.location}
            </div>
            <p className="mt-2 flex items-start gap-2 text-[14px] font-bold leading-snug @3xl:text-[15px]">
              <Brain className="mt-0.5 size-4 shrink-0" /> {tm.advisors}
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export function AskSlide({ n, total }: SlideProps) {
  const { t, locale } = useI18n();
  const a = t.pitch.ask;
  return (
    <SlideShell n={n} total={total} eyebrow={a.eyebrow} title={a.title}>
      <div className="grid h-full gap-4 @3xl:grid-cols-[1fr_1.15fr] @3xl:gap-6">
        <div className="relative flex flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#ff9a3d] via-[#ff6a13] to-[#cf3f06] p-5 text-white shadow-[0_30px_60px_-30px_rgba(242,84,10,.85)] @3xl:p-7">
          <div className="absolute -right-16 -top-16 size-56 rounded-full bg-white/15 blur-2xl" aria-hidden />
          <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] ring-1 ring-white/30">
            <Banknote className="size-3.5" /> Pre-seed
          </span>
          <div className="relative mt-3 text-[64px] font-extrabold leading-none tracking-[-0.06em] @3xl:text-[96px]">{fmtUsd(raise, locale)}</div>
          <div className="relative mt-2 text-[14px] font-bold text-white/85 @3xl:text-[16px]">{a.instrument}</div>
          <div className="relative mt-auto pt-5">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/75">{a.milestones}</div>
            <ul className="mt-2 grid gap-1.5 @xl:grid-cols-2">
              {a.milestoneItems.map((m) => (
                <li key={m} className="flex items-start gap-2 text-[12.5px] font-bold @3xl:text-[13.5px]">
                  <Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} /> {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Card className="flex flex-col justify-center">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink-3">{a.use}</span>
            <span className="text-[20px] font-extrabold tracking-tight text-ink">{fmtUsd(raise, locale)}</span>
          </div>
          <div className="mb-5" />
          <FundsBars labels={a.funds} />
        </Card>
      </div>
    </SlideShell>
  );
}

export function ClosingSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const c = t.pitch.closing;
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden text-white">
      <Photo id={photos.samarkandSherdor} alt="Sherdor Madrasah, Samarkand" sizes="100vw" className="absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(18,9,3,.92)_10%,rgba(40,15,3,.7)_55%,rgba(242,84,10,.45))]" />
      <div className="relative flex flex-1 flex-col justify-center p-7 @3xl:p-14">
        <LogoMark className="size-12" />
        <h2 className="mt-6 max-w-[52rem] text-balance text-[32px] font-extrabold leading-[1.05] tracking-[-0.04em] @3xl:text-[60px]">
          <Rich text={c.title} accentClassName="!bg-none !text-[#ffc285] ![-webkit-text-fill-color:#ffc285]" />
        </h2>
        <p className="mt-4 max-w-xl text-[15px] font-semibold text-white/80 @3xl:text-[19px]">{c.text}</p>
        {site.founders[0] && (
          <div className="mt-6 flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/90 text-[14px] font-extrabold text-[#c2410c]">
              {initialsOf(site.founders[0])}
            </span>
            <div className="leading-tight">
              <div className="text-[16px] font-extrabold @3xl:text-[18px]">{site.founders[0]}</div>
              <div className="text-[12px] font-bold text-white/75 @3xl:text-[13px]">{t.pitch.team.members[0].role} · Travely</div>
            </div>
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${site.email}?subject=Travely%20pre-seed`} className="btn h-12 bg-white px-6 text-[14px] text-brand-ink shadow-lg">
            <CalendarCheck className="size-4" /> {c.cta}
          </a>
          <a href={`mailto:${site.email}`} className="glass-dark-ui inline-flex h-12 items-center gap-2 rounded-full px-5 text-[14px] font-bold">
            <Mail className="size-4" /> {site.email}
          </a>
          <a href={`https://t.me/${site.telegram}`} target="_blank" rel="noreferrer" className="glass-dark-ui inline-flex h-12 items-center gap-2 rounded-full px-5 text-[14px] font-bold">
            <Send className="size-4" /> @{site.telegram}
          </a>
        </div>
      </div>
      <div className="relative flex items-center justify-between px-7 pb-5 text-[11px] font-bold text-white/70 @3xl:px-14">
        <span>{site.domain}</span>
        <span>
          {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export function SourcesSlide({ n, total }: SlideProps) {
  const { t } = useI18n();
  const s = t.pitch.sources;
  const list = Object.values(sources);
  return (
    <SlideShell n={n} total={total} eyebrow={s.eyebrow} title={s.title}>
      <div className="flex h-full flex-col gap-3">
        <ol className="gap-x-8 @3xl:columns-2">
          {list.map((src, i) => (
            <li key={src.url} className="mb-2 flex break-inside-avoid gap-2 text-[11px] leading-snug @3xl:mb-2.5 @3xl:text-[13px]">
              <span className="w-5 shrink-0 font-extrabold tabular-nums text-brand-ink">{i + 1}.</span>
              <a href={src.url} target="_blank" rel="noreferrer" className="font-semibold text-ink-2 underline decoration-line-strong underline-offset-2 hover:text-brand-ink">
                {src.label}
              </a>
            </li>
          ))}
        </ol>
        <p className="mt-auto text-[11.5px] font-semibold text-ink-3">{s.note}</p>
      </div>
    </SlideShell>
  );
}

export const slideComponents = [
  { key: "cover", Comp: CoverSlide },
  { key: "problem", Comp: ProblemSlide },
  { key: "solution", Comp: SolutionSlide },
  { key: "product", Comp: ProductSlide },
  { key: "whyNow", Comp: WhyNowSlide },
  { key: "market", Comp: MarketSlide },
  { key: "business", Comp: BusinessSlide },
  { key: "unit", Comp: UnitSlide },
  { key: "traction", Comp: TractionSlide },
  { key: "gtm", Comp: GtmSlide },
  { key: "competition", Comp: CompetitionSlide },
  { key: "moat", Comp: MoatSlide },
  { key: "financials", Comp: FinancialsSlide },
  { key: "roadmap", Comp: RoadmapSlide },
  { key: "team", Comp: TeamSlide },
  { key: "ask", Comp: AskSlide },
  { key: "closing", Comp: ClosingSlide },
  { key: "sources", Comp: SourcesSlide },
] as const;

export type SlideKey = (typeof slideComponents)[number]["key"];
