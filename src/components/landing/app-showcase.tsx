"use client";

import {
  Bell,
  CalendarClock,
  Camera,
  Compass,
  Home,
  LifeBuoy,
  MapPin,
  Navigation,
  Send,
  Smartphone,
  Sun,
  TicketCheck,
  User,
  WalletCards,
} from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Reveal } from "@/components/reveal";
import { Photo } from "@/components/photo";
import { photos } from "@/data/images";

function PhoneMock() {
  const { t } = useI18n();
  const a = t.app;
  return (
    <div className="relative mx-auto w-[18.5rem] sm:w-[20rem]">
      {/* glow */}
      <div className="absolute inset-x-6 top-16 -z-10 h-[70%] rounded-full bg-brand/40 blur-[80px]" aria-hidden />
      <div className="rounded-[3.2rem] bg-gradient-to-b from-[#2b1d14] to-[#120b07] p-[0.6rem] shadow-[0_50px_100px_-30px_rgba(120,40,0,.6)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[2.7rem] bg-bg">
          {/* status bar */}
          <div className="flex items-center justify-between px-7 pb-1 pt-3 text-[0.68rem] font-bold text-ink">
            <span>9:41</span>
            <span className="h-6 w-24 rounded-full bg-black" aria-hidden />
            <span className="flex gap-1">
              <span className="h-2.5 w-4 rounded-sm bg-ink/80" />
            </span>
          </div>

          <div className="space-y-3 px-4 pb-24 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.68rem] font-semibold text-ink-3">{a.greeting} 👋</div>
                <div className="text-base font-extrabold tracking-tight text-ink">{a.today}</div>
              </div>
              <span className="soft-sm relative grid size-9 place-items-center rounded-full text-ink-2">
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand" />
              </span>
            </div>

            <div className="relative overflow-hidden rounded-3xl">
              <Photo id={photos.samarkandGurEmir} alt="Gur-e-Amir, Samarkand" sizes="300px" widths={[480, 768]} className="aspect-[16/11]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[0.62rem] font-bold text-white backdrop-blur-md">
                <Sun className="size-3" /> {a.weather}
              </div>
              <div className="absolute inset-x-3 bottom-3 text-white">
                <div className="text-[0.6rem] font-bold uppercase tracking-widest text-white/75">{a.nextUp}</div>
                <div className="text-sm font-extrabold">Gur-e-Amir</div>
                <div className="mt-1 flex items-center gap-2 text-[0.62rem] font-bold">
                  <span className="rounded-full bg-brand px-2 py-0.5">{a.leaveIn}</span>
                  <span className="flex items-center gap-1 text-white/85">
                    <Navigation className="size-3" /> {a.walk}
                  </span>
                </div>
              </div>
            </div>

            <div className="soft-sm flex items-center gap-3 rounded-2xl p-3">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#ffb062] to-[#f2540a] text-white">
                <TicketCheck className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[0.75rem] font-extrabold text-ink">{a.ticket}</div>
                <div className="text-[0.62rem] font-semibold text-ink-3">SKD 17:40 → BHK 19:20</div>
              </div>
              <span className="grid size-7 place-items-center rounded-lg bg-ink text-[0.5rem] font-black text-bg">QR</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[Camera, WalletCards, LifeBuoy].map((Icon, i) => (
                <div key={i} className="soft-sm grid place-items-center rounded-2xl py-3 text-ink-2">
                  <Icon className="size-4 text-brand" />
                </div>
              ))}
            </div>
          </div>

          {/* tab bar */}
          <div className="glass absolute inset-x-3 bottom-3 flex items-center justify-around rounded-full py-2.5">
            {[Home, Compass, MapPin, User].map((Icon, i) => (
              <span key={i} className={i === 0 ? "grid size-9 place-items-center rounded-full bg-brand text-white shadow-md shadow-orange-500/40" : "grid size-9 place-items-center text-ink-3"}>
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShowcase() {
  const { t } = useI18n();
  const icons = [CalendarClock, WalletCards, Camera, LifeBuoy];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <PhoneMock />
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">{t.app.eyebrow}</span>
            <h2 className="mt-4 text-balance text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl">
              <Rich text={t.app.title} />
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-2 sm:text-lg">{t.app.text}</p>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.app.points.map((pt, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={pt} delay={i * 0.07}>
                  <li className="soft flex h-full items-center gap-3 rounded-2xl p-4 text-sm font-bold text-ink">
                    <span className="soft-inset grid size-10 shrink-0 place-items-center rounded-xl text-brand">
                      <Icon className="size-4" />
                    </span>
                    {pt}
                  </li>
                </Reveal>
              );
            })}
          </ul>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-ink">
                <Smartphone className="size-4 text-brand" /> iOS · Android
              </span>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-ink">
                <Send className="size-4 text-[#229ED9]" /> Telegram Mini App
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-ink-3">{t.app.platforms}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
