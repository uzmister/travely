export const locales = ["uz", "en", "ru", "tr", "de", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "travely-locale";

export const localeMeta: Record<Locale, { label: string; short: string; flag: string; intl: string }> = {
  uz: { label: "Oʻzbekcha", short: "UZ", flag: "🇺🇿", intl: "uz-Latn-UZ" },
  en: { label: "English", short: "EN", flag: "🇬🇧", intl: "en-US" },
  ru: { label: "Русский", short: "RU", flag: "🇷🇺", intl: "ru-RU" },
  tr: { label: "Türkçe", short: "TR", flag: "🇹🇷", intl: "tr-TR" },
  de: { label: "Deutsch", short: "DE", flag: "🇩🇪", intl: "de-DE" },
  zh: { label: "中文", short: "ZH", flag: "🇨🇳", intl: "zh-CN" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Pick the best supported locale from an Accept-Language header. */
export function matchLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}
