"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarDays,
  Check,
  Clock,
  Coffee,
  Footprints,
  Lightbulb,
  Loader2,
  MapPin,
  Minus,
  Moon,
  Plus,
  RefreshCw,
  Sparkles,
  Sun,
  Sunrise,
  Ticket,
  Users,
  UtensilsCrossed,
  Wand2,
} from "lucide-react";
import { useI18n, fill } from "@/i18n/provider";
import { destinations, destinationById, countryName, formatMonths } from "@/data/destinations";
import { photos } from "@/data/images";
import { interests, type BudgetLevel, type Interest } from "@/data/planner";
import { generatePlan, parsePrompt, type Plan, type PlanInput, type PlanItem } from "@/lib/itinerary";
import { Photo } from "@/components/photo";
import { cn } from "@/lib/cn";
import { fmtNumTrim, fmtUsd } from "@/lib/format";

const plannerDestinations = destinations.filter((d) => d.planner);
const levels: BudgetLevel[] = ["budget", "comfort", "luxury"];

const defaultInput: PlanInput = {
  cityId: "samarkand",
  days: 3,
  level: "comfort",
  travelers: 2,
  interests: ["culture", "food"],
  seed: 7,
};

const slotIcon = { morning: Sunrise, lunch: UtensilsCrossed, afternoon: Sun, evening: Moon } as const;
const breakdownColors = ["#f2540a", "#ff8a2b", "#ffb347", "#ffd8a8"];

export function TripPlanner({ id = "planner" }: { id?: string }) {
  const { t, locale } = useI18n();
  const p = t.planner;

  const [input, setInput] = useState<PlanInput>(defaultInput);
  const [plan, setPlan] = useState<Plan>(() => generatePlan(defaultInput));
  const [thinking, setThinking] = useState(false);
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const money = useMemo(() => ({ format: (v: number) => fmtUsd(Math.round(v), locale) }), [locale]);

  const run = useCallback((next: PlanInput, scroll = false) => {
    timers.current.forEach(clearTimeout);
    setThinking(true);
    setStep(0);
    const delays = [380, 760, 1140, 1520];
    delays.forEach((d, i) => timers.current.push(setTimeout(() => setStep(i + 1), d)));
    timers.current.push(
      setTimeout(() => {
        setPlan(generatePlan(next));
        setThinking(false);
        if (scroll && window.innerWidth < 1024) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 1750),
    );
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Pre-fill from ?q= (hero prompt) or ?dest= (destination cards)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const dest = params.get("dest");
    if (!q && !dest) return;
    const parsed = q ? parsePrompt(q) : {};
    const cityId = dest && destinationById[dest]?.planner ? dest : parsed.cityId;
    const next: PlanInput = {
      ...defaultInput,
      ...parsed,
      cityId: cityId ?? defaultInput.cityId,
      seed: Math.floor(Math.random() * 1000),
    };
    setInput(next);
    run(next);
  }, [run]);

  const update = (patch: Partial<PlanInput>) => setInput((prev) => ({ ...prev, ...patch }));
  const toggleInterest = (i: Interest) =>
    update({ interests: input.interests.includes(i) ? input.interests.filter((x) => x !== i) : [...input.interests, i] });

  const generate = () => {
    const next = { ...input, seed: input.seed + 1 };
    setInput(next);
    run(next, true);
  };

  const dest = destinationById[plan.input.cityId];
  const describe = (item: PlanItem) =>
    fill(p.templates[item.template], { poi: item.poi?.name ?? "", dish: item.dish ?? "" });

  return (
    <div id={id} className="grid scroll-mt-28 gap-5 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-6">
      {/* ---------- Controls ---------- */}
      <div className="glass glass-strong h-fit rounded-[2rem] p-5 sm:p-6 lg:sticky lg:top-28">
        <fieldset>
          <legend className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-3">{p.destination}</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {plannerDestinations.map((d) => {
              const active = input.cityId === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => update({ cityId: d.id })}
                  aria-pressed={active}
                  className={cn(
                    "group relative h-16 overflow-hidden rounded-2xl text-left transition-all duration-300",
                    active ? "ring-[3px] ring-brand ring-offset-2 ring-offset-surface" : "opacity-90 hover:opacity-100",
                  )}
                >
                  <Photo id={photos[d.photo]} alt="" sizes="120px" widths={[200, 320]} className="absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <span className="absolute inset-x-2 bottom-1.5 truncate text-[0.72rem] font-extrabold text-white">{d.name[locale]}</span>
                  {active && (
                    <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-brand text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label htmlFor={`${id}-days`} className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-3">
              {p.days}
            </label>
            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-sm font-extrabold text-brand-ink">{input.days}</span>
          </div>
          <input
            id={`${id}-days`}
            type="range"
            min={1}
            max={10}
            value={input.days}
            onChange={(e) => update({ days: Number(e.target.value) })}
            className="range mt-3 w-full"
            style={{ ["--fill" as string]: `${((input.days - 1) / 9) * 100}%` }}
          />
        </div>

        <div className="mt-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-3">{p.budget}</span>
          <div className="soft-inset mt-3 grid grid-cols-3 gap-1 rounded-2xl p-1" role="radiogroup" aria-label={p.budget}>
            {levels.map((l) => (
              <button
                key={l}
                type="button"
                role="radio"
                aria-checked={input.level === l}
                onClick={() => update({ level: l })}
                className={cn(
                  "rounded-xl px-2 py-2 text-[0.8rem] font-extrabold transition-all",
                  input.level === l ? "bg-surface text-brand-ink shadow-md" : "text-ink-3 hover:text-ink",
                )}
              >
                {p.budgetLevels[l]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-3">{p.travelers}</span>
          <div className="soft-inset flex items-center gap-1 rounded-full p-1">
            <button
              type="button"
              onClick={() => update({ travelers: Math.max(1, input.travelers - 1) })}
              className="grid size-8 place-items-center rounded-full bg-surface text-ink shadow-sm disabled:opacity-40"
              disabled={input.travelers <= 1}
              aria-label="−"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center text-sm font-extrabold tabular-nums text-ink">{input.travelers}</span>
            <button
              type="button"
              onClick={() => update({ travelers: Math.min(8, input.travelers + 1) })}
              className="grid size-8 place-items-center rounded-full bg-surface text-ink shadow-sm disabled:opacity-40"
              disabled={input.travelers >= 8}
              aria-label="+"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        <fieldset className="mt-6">
          <legend className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-3">{p.interests}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {interests.map((i) => {
              const on = input.interests.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleInterest(i)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[0.8rem] font-bold transition-all",
                    on ? "bg-brand text-white shadow-md shadow-orange-500/30" : "soft-sm text-ink-2 hover:text-ink",
                  )}
                >
                  {p.interestList[i]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button type="button" onClick={generate} disabled={thinking} className="btn btn-primary mt-7 h-12 w-full text-[0.95rem] disabled:opacity-80">
          {thinking ? <Loader2 className="size-5 animate-spin" /> : <Wand2 className="size-5" />}
          {p.generate}
        </button>
      </div>

      {/* ---------- Result ---------- */}
      <div ref={resultRef} className="relative min-h-[36rem] scroll-mt-28">
        <AnimatePresence mode="wait">
          {thinking ? (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="glass flex h-full min-h-[36rem] flex-col items-center justify-center rounded-[2rem] p-8 text-center"
            >
              <div className="relative grid size-20 place-items-center">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/30" />
                <span className="absolute inset-2 animate-pulse-ring rounded-full bg-brand/20 [animation-delay:.6s]" />
                <span className="relative grid size-16 place-items-center rounded-full bg-gradient-to-br from-[#ffb062] to-[#f2540a] text-white shadow-xl shadow-orange-500/40">
                  <Sparkles className="size-7" />
                </span>
              </div>
              <ul className="mt-8 w-full max-w-sm space-y-2.5 text-left">
                {p.thinking.map((s, i) => (
                  <li key={s} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all", i < step ? "soft-sm text-ink" : "text-ink-3")}>
                    {i < step ? (
                      <span className="grid size-6 place-items-center rounded-full bg-emerald-500 text-white">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                    ) : i === step ? (
                      <Loader2 className="size-6 animate-spin text-brand" />
                    ) : (
                      <span className="size-6 rounded-full border-2 border-dashed border-line-strong" />
                    )}
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key={`${plan.input.cityId}-${plan.input.seed}-${plan.input.days}-${locale}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
              className="space-y-4"
            >
              {/* Header */}
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-35px_rgba(150,60,10,.7)]">
                <Photo id={photos[dest.photo]} alt={dest.name.en} sizes="(min-width: 1024px) 55vw, 100vw" className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
                <div className="relative grid gap-6 p-6 text-white sm:p-8 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <span className="glass-dark-ui inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-bold">
                      <MapPin className="size-3.5" /> {countryName(dest.country, locale)}
                    </span>
                    <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                      {fill(p.resultTitle, { days: plan.input.days, city: dest.name[locale] })}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem] font-bold">
                      <span className="glass-dark-ui inline-flex items-center gap-1.5 rounded-full px-3 py-1">
                        <CalendarDays className="size-3.5" /> {p.bestTime}: {formatMonths(dest.months, locale)}
                      </span>
                      <span className="glass-dark-ui inline-flex items-center gap-1.5 rounded-full px-3 py-1">
                        <Users className="size-3.5" /> {fill(p.forTravelers, { n: plan.input.travelers })}
                      </span>
                      <span className="glass-dark-ui inline-flex items-center gap-1.5 rounded-full px-3 py-1">{p.budgetLevels[plan.input.level]}</span>
                    </div>
                  </div>
                  <div className="glass-dark-ui rounded-3xl px-5 py-4 md:text-right">
                    <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/75">{p.total}</div>
                    <div className="text-3xl font-extrabold tracking-tight">{money.format(plan.total)}</div>
                    <div className="text-[0.75rem] font-semibold text-white/80">
                      ≈ {money.format(plan.perPersonPerDay)} {t.common.perDay} · {p.perPerson}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[1fr_17rem]">
                {/* Days */}
                <ol className="space-y-4">
                  {plan.days.map((day, di) => (
                    <motion.li
                      key={day.day}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * di, duration: 0.45 }}
                      className="soft rounded-[1.75rem] p-4 sm:p-5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="flex items-center gap-2.5 text-base font-extrabold text-ink">
                          <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-[#ffb062] to-[#f2540a] text-sm text-white">{day.day}</span>
                          {fill(p.dayLabel, { n: day.day })}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[0.72rem] font-bold text-ink-3">
                          <Footprints className="size-3.5" /> {fmtNumTrim(day.km, locale)} km
                        </span>
                      </div>
                      <ul className="relative mt-4 space-y-2 before:absolute before:bottom-4 before:left-[1.18rem] before:top-4 before:w-px before:bg-line-strong">
                        {day.items.map((item, ii) => {
                          const Icon = slotIcon[item.slot];
                          return (
                            <li key={ii} className="relative flex items-start gap-3">
                              <span className="soft-sm relative z-10 grid size-[2.4rem] shrink-0 place-items-center rounded-full text-brand">
                                <Icon className="size-4" />
                              </span>
                              <div className="min-w-0 flex-1 rounded-2xl px-1 py-1">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <span className="font-mono text-[0.72rem] font-bold text-brand-ink">{item.time}</span>
                                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-ink-3">
                                    {item.slot === "lunch" ? <Coffee className="inline size-3" /> : p[item.slot]}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-sm font-bold text-ink sm:text-[0.95rem]">{describe(item)}</p>
                                <div className="mt-1.5 flex flex-wrap gap-1.5 text-[0.68rem] font-bold text-ink-3">
                                  <span className="inline-flex items-center gap-1 rounded-full bg-black/[.04] px-2 py-0.5 dark:bg-white/[.06]">
                                    <Clock className="size-3" /> {fmtNumTrim(item.hours, locale)} {p.hours}
                                  </span>
                                  {item.fee > 0 && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-brand-ink">
                                      <Ticket className="size-3" /> ≈ {money.format(item.fee)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.li>
                  ))}
                </ol>

                {/* Sidebar: map, budget, tip */}
                <div className="space-y-4">
                  <RouteMap plan={plan} />
                  <div className="soft rounded-[1.75rem] p-5">
                    <BudgetDonut plan={plan} money={money} labels={p.breakdown} />
                  </div>
                  <div className="rounded-[1.75rem] bg-brand-soft p-5 ring-1 ring-brand/15">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-ink">
                      <Lightbulb className="size-4" /> {p.tip}
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-ink">
                      {p.tips[plan.input.cityId as keyof typeof p.tips]}
                    </p>
                  </div>
                  <Link href="/#waitlist" className="btn btn-primary h-12 w-full text-sm">
                    <Ticket className="size-4" /> {p.book}
                  </Link>
                  <button type="button" onClick={generate} className="btn btn-soft h-11 w-full text-sm">
                    <RefreshCw className="size-4" /> {p.regenerate}
                  </button>
                </div>
              </div>
              <p className="px-2 text-center text-xs font-medium text-ink-3">{p.demoNote}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RouteMap({ plan }: { plan: Plan }) {
  const stops = plan.days.flatMap((d, di) => d.items.filter((i) => i.poi).map((i) => ({ ...i.poi!, day: di })));
  const unique = stops.filter((s, i) => stops.findIndex((x) => x.name === s.name) === i);
  const path = unique.map((s, i) => `${i === 0 ? "M" : "L"} ${s.x} ${s.y}`).join(" ");
  const dayColors = ["#f2540a", "#ff8a2b", "#ffb347", "#c2410c", "#ff6a13", "#e8540c", "#ffa24c", "#d9440a", "#ff7a26", "#b83a07"];

  return (
    <div className="soft relative overflow-hidden rounded-[1.75rem] p-3">
      <svg viewBox="-6 -6 112 112" className="aspect-square w-full rounded-[1.25rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,180,110,.25),transparent_60%)]" role="img" aria-label="Route map">
        <defs>
          <pattern id="map-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth=".2" className="text-ink-3/40" />
          </pattern>
        </defs>
        <rect x="-6" y="-6" width="112" height="112" fill="url(#map-grid)" />
        <path d="M -6 70 C 20 60, 40 85, 60 72 S 95 60, 106 66" fill="none" stroke="#8ec5ff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />
        <motion.path
          d={path}
          fill="none"
          stroke="#f2540a"
          strokeWidth="1.1"
          strokeDasharray="2.4 1.8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {unique.map((s, i) => (
          <g key={s.name}>
            <circle cx={s.x} cy={s.y} r="3.4" fill={dayColors[s.day % dayColors.length]} stroke="#fff" strokeWidth="1" />
            <text x={s.x} y={s.y + 1.1} textAnchor="middle" fontSize="3" fontWeight="800" fill="#fff">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function BudgetDonut({
  plan,
  money,
  labels,
}: {
  plan: Plan;
  money: { format: (v: number) => string };
  labels: { stay: string; food: string; transport: string; activities: string };
}) {
  const entries = (["stay", "food", "transport", "activities"] as const).map((k, i) => ({
    key: k,
    label: labels[k],
    value: plan.breakdown[k],
    color: breakdownColors[i],
  }));
  const total = entries.reduce((a, e) => a + e.value, 0) || 1;
  let acc = 0;

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 42 42" className="size-24 shrink-0 -rotate-90" aria-hidden>
        <circle cx="21" cy="21" r="15.9155" fill="none" stroke="currentColor" strokeWidth="6" className="text-black/5 dark:text-white/10" />
        {entries.map((e) => {
          const pct = (e.value / total) * 100;
          const el = (
            <circle
              key={e.key}
              cx="21"
              cy="21"
              r="15.9155"
              fill="none"
              stroke={e.color}
              strokeWidth="6"
              strokeDasharray={`${Math.max(pct - 0.8, 0)} ${100 - Math.max(pct - 0.8, 0)}`}
              strokeDashoffset={-acc}
            />
          );
          acc += pct;
          return el;
        })}
      </svg>
      <ul className="min-w-0 flex-1 space-y-1.5">
        {entries.map((e) => (
          <li key={e.key} className="flex items-center justify-between gap-2 text-[0.78rem] font-bold">
            <span className="flex min-w-0 items-center gap-2 text-ink-2">
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: e.color }} />
              <span className="truncate">{e.label}</span>
            </span>
            <span className="tabular-nums text-ink">{money.format(e.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
