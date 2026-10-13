"use client";

import { createContext, useCallback, useContext, useMemo, useState, useTransition } from "react";
import { LOCALE_COOKIE, localeMeta, type Locale } from "./config";
import { dictionaryLoaders } from "./load";
import type { Dictionary } from "./dictionaries/en";

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  intl: string;
  setLocale: (next: Locale) => void;
  pending: boolean;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  initialLocale,
  initialDictionary,
  children,
}: {
  initialLocale: Locale;
  initialDictionary: Dictionary;
  children: React.ReactNode;
}) {
  const [state, setState] = useState({ locale: initialLocale, t: initialDictionary });
  const [pending, startTransition] = useTransition();

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === state.locale) return;
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      startTransition(async () => {
        const mod = await dictionaryLoaders[next]();
        startTransition(() => {
          setState({ locale: next, t: mod.default });
          document.documentElement.lang = next;
          document.title = mod.default.meta.title;
        });
      });
    },
    [state.locale],
  );

  const value = useMemo<I18nValue>(
    () => ({
      locale: state.locale,
      t: state.t,
      intl: localeMeta[state.locale].intl,
      setLocale,
      pending,
    }),
    [state, setLocale, pending],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Replace {name} placeholders in a template string. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}
