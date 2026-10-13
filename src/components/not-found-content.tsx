"use client";

import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";

export function NotFoundContent() {
  const { t } = useI18n();
  return (
    <section className="container-x grid min-h-[80vh] place-items-center pt-28 text-center">
      <div>
        <div className="soft mx-auto grid size-24 place-items-center rounded-[2rem] text-brand">
          <Compass className="size-10 animate-spin-slow" />
        </div>
        <p className="mt-8 font-mono text-sm font-bold text-brand-ink">404</p>
        <h1 className="mt-2 text-balance text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-6xl">
          <Rich text={t.notFound.title} />
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-2">{t.notFound.text}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary h-12 px-6 text-sm">
            <Home className="size-4" /> {t.common.backHome}
          </Link>
          <Link href="/planner" className="btn btn-soft h-12 px-6 text-sm">
            {t.nav.planner}
          </Link>
        </div>
      </div>
    </section>
  );
}
