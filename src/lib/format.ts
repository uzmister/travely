import type { Locale } from "@/i18n/config";

/**
 * Deterministic formatting helpers. Node and browsers ship different ICU versions,
 * so Intl output (currency spacing, compact notation, country and month names) can
 * differ between the server render and hydration. These tables keep both identical.
 */

const sep: Record<Locale, { group: string; decimal: string }> = {
  en: { group: ",", decimal: "." },
  zh: { group: ",", decimal: "." },
  uz: { group: " ", decimal: "," },
  ru: { group: " ", decimal: "," },
  tr: { group: ".", decimal: "," },
  de: { group: ".", decimal: "," },
};

export function fmtNum(value: number, locale: Locale, decimals = 0) {
  const fixed = Math.abs(value).toFixed(decimals);
  const [int, frac] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, sep[locale].group);
  return `${value < 0 ? "−" : ""}${grouped}${frac ? sep[locale].decimal + frac : ""}`;
}

/** Trims trailing zeros: 1.5 → "1,5", 2.0 → "2". */
export function fmtNumTrim(value: number, locale: Locale, maxDecimals = 1) {
  const rounded = Number(value.toFixed(maxDecimals));
  const decimals = Number.isInteger(rounded) ? 0 : maxDecimals;
  return fmtNum(rounded, locale, decimals);
}

export function fmtUsd(value: number, locale: Locale, decimals = 0) {
  return `${value < 0 ? "−" : ""}$${fmtNum(Math.abs(value), locale, decimals)}`;
}

const units: Record<Locale, [string, string, string, string]> = {
  en: ["K", "M", "B", "T"],
  uz: ["\u00a0ming", "\u00a0mln", "\u00a0mlrd", "\u00a0trln"],
  ru: ["\u00a0тыс.", "\u00a0млн", "\u00a0млрд", "\u00a0трлн"],
  tr: ["\u00a0bin", "\u00a0mn", "\u00a0mlr", "\u00a0trn"],
  de: ["\u00a0Tsd.", "\u00a0Mio.", "\u00a0Mrd.", "\u00a0Bio."],
  zh: ["", "", "", ""],
};

/** Splits a raw number into a short value + localised unit (K/M/B, mln/mlrd, 万/亿 …). */
export function compactParts(value: number, locale: Locale, maxDecimals = 2) {
  const abs = Math.abs(value);
  let n = value;
  let suffix = "";
  if (locale === "zh") {
    if (abs >= 1e12) [n, suffix] = [value / 1e12, "万亿"];
    else if (abs >= 1e8) [n, suffix] = [value / 1e8, "亿"];
    else if (abs >= 1e4) [n, suffix] = [value / 1e4, "万"];
  } else {
    const steps = [1e3, 1e6, 1e9, 1e12];
    for (let i = steps.length - 1; i >= 0; i--) {
      if (abs >= steps[i]) {
        n = value / steps[i];
        suffix = units[locale][i];
        break;
      }
    }
  }
  const a = Math.abs(n);
  let decimals = Math.min(maxDecimals, a >= 100 ? 0 : a >= 10 ? 1 : 2);
  while (decimals > 0 && a.toFixed(decimals).endsWith("0")) decimals--;
  return { n, decimals, suffix };
}

export function fmtCompact(value: number, locale: Locale, currency = false, maxDecimals = 1) {
  const { n, decimals, suffix } = compactParts(Math.abs(value), locale, maxDecimals);
  return `${value < 0 ? "−" : ""}${currency ? "$" : ""}${fmtNumTrim(n, locale, decimals)}${suffix}`;
}

export function fmtPct(value: number, locale: Locale) {
  return locale === "tr" ? `%${fmtNumTrim(value, locale)}` : `${fmtNumTrim(value, locale)}${locale === "de" || locale === "ru" || locale === "uz" ? " " : ""}%`;
}

const months: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  uz: ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"],
  ru: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  tr: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
  de: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
};

export function monthShort(m: number, locale: Locale) {
  return months[locale][m - 1];
}

type CountryNames = [en: string, uz: string, ru: string, tr: string, de: string, zh: string];
const order: Locale[] = ["en", "uz", "ru", "tr", "de", "zh"];

const countries: Record<string, CountryNames> = {
  UZ: ["Uzbekistan", "Oʻzbekiston", "Узбекистан", "Özbekistan", "Usbekistan", "乌兹别克斯坦"],
  KZ: ["Kazakhstan", "Qozogʻiston", "Казахстан", "Kazakistan", "Kasachstan", "哈萨克斯坦"],
  KG: ["Kyrgyzstan", "Qirgʻiziston", "Кыргызстан", "Kırgızistan", "Kirgisistan", "吉尔吉斯斯坦"],
  AZ: ["Azerbaijan", "Ozarbayjon", "Азербайджан", "Azerbaycan", "Aserbaidschan", "阿塞拜疆"],
  GE: ["Georgia", "Gruziya", "Грузия", "Gürcistan", "Georgien", "格鲁吉亚"],
  TR: ["Türkiye", "Turkiya", "Турция", "Türkiye", "Türkei", "土耳其"],
  FR: ["France", "Fransiya", "Франция", "Fransa", "Frankreich", "法国"],
  IT: ["Italy", "Italiya", "Италия", "İtalya", "Italien", "意大利"],
  ES: ["Spain", "Ispaniya", "Испания", "İspanya", "Spanien", "西班牙"],
  CZ: ["Czechia", "Chexiya", "Чехия", "Çekya", "Tschechien", "捷克"],
  PT: ["Portugal", "Portugaliya", "Португалия", "Portekiz", "Portugal", "葡萄牙"],
  CH: ["Switzerland", "Shveytsariya", "Швейцария", "İsviçre", "Schweiz", "瑞士"],
  JP: ["Japan", "Yaponiya", "Япония", "Japonya", "Japan", "日本"],
  KR: ["South Korea", "Janubiy Koreya", "Южная Корея", "Güney Kore", "Südkorea", "韩国"],
  ID: ["Indonesia", "Indoneziya", "Индонезия", "Endonezya", "Indonesien", "印度尼西亚"],
  TH: ["Thailand", "Tailand", "Таиланд", "Tayland", "Thailand", "泰国"],
  SG: ["Singapore", "Singapur", "Сингапур", "Singapur", "Singapur", "新加坡"],
  MY: ["Malaysia", "Malayziya", "Малайзия", "Malezya", "Malaysia", "马来西亚"],
  IN: ["India", "Hindiston", "Индия", "Hindistan", "Indien", "印度"],
  MV: ["Maldives", "Maldiv orollari", "Мальдивы", "Maldivler", "Malediven", "马尔代夫"],
  AE: ["UAE", "BAA", "ОАЭ", "BAE", "VAE", "阿联酋"],
  EG: ["Egypt", "Misr", "Египет", "Mısır", "Ägypten", "埃及"],
  MA: ["Morocco", "Marokash", "Марокко", "Fas", "Marokko", "摩洛哥"],
  ZA: ["South Africa", "Janubiy Afrika", "ЮАР", "Güney Afrika", "Südafrika", "南非"],
  BR: ["Brazil", "Braziliya", "Бразилия", "Brezilya", "Brasilien", "巴西"],
  AU: ["Australia", "Avstraliya", "Австралия", "Avustralya", "Australien", "澳大利亚"],
};

export function countryName(code: string, locale: Locale) {
  const row = countries[code];
  return row ? row[order.indexOf(locale)] : code;
}
