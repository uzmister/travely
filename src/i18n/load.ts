import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

export const dictionaryLoaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  uz: () => import("./dictionaries/uz"),
  en: () => import("./dictionaries/en"),
  ru: () => import("./dictionaries/ru"),
  tr: () => import("./dictionaries/tr"),
  de: () => import("./dictionaries/de"),
  zh: () => import("./dictionaries/zh"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await dictionaryLoaders[locale]()).default;
}
