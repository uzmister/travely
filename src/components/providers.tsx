"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { I18nProvider } from "@/i18n/provider";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function Providers({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <I18nProvider initialLocale={locale} initialDictionary={dictionary}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </I18nProvider>
    </ThemeProvider>
  );
}
