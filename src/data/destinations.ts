import type { Locale } from "@/i18n/config";
import { photos, type PhotoKey } from "./images";
import { monthShort } from "@/lib/format";

export type Region = "silkroad" | "europe" | "asia" | "mideast" | "americas";

export type Destination = {
  id: string;
  name: Record<Locale, string>;
  country: string; // ISO 3166-1 alpha-2
  region: Region;
  photo: PhotoKey;
  months: number[]; // best months, 1–12
  days: [number, number];
  planner?: boolean; // available in the interactive planner demo
};

const n = (en: string, uz: string, ru: string, tr: string, de: string, zh: string): Record<Locale, string> => ({
  en,
  uz,
  ru,
  tr,
  de,
  zh,
});

export const destinations: Destination[] = [
  { id: "samarkand", name: n("Samarkand", "Samarqand", "Самарканд", "Semerkant", "Samarkand", "撒马尔罕"), country: "UZ", region: "silkroad", photo: "samarkand", months: [4, 5, 6, 9, 10], days: [2, 3], planner: true },
  { id: "bukhara", name: n("Bukhara", "Buxoro", "Бухара", "Buhara", "Buchara", "布哈拉"), country: "UZ", region: "silkroad", photo: "bukhara", months: [4, 5, 9, 10], days: [2, 3], planner: true },
  { id: "tashkent", name: n("Tashkent", "Toshkent", "Ташкент", "Taşkent", "Taschkent", "塔什干"), country: "UZ", region: "silkroad", photo: "tashkent", months: [4, 5, 6, 9, 10], days: [2, 3], planner: true },
  { id: "almaty", name: n("Almaty", "Olmaota", "Алматы", "Almatı", "Almaty", "阿拉木图"), country: "KZ", region: "silkroad", photo: "almaty", months: [5, 6, 7, 8, 9], days: [3, 5], planner: true },
  { id: "bishkek", name: n("Bishkek", "Bishkek", "Бишкек", "Bişkek", "Bischkek", "比什凯克"), country: "KG", region: "silkroad", photo: "bishkek", months: [6, 7, 8, 9], days: [3, 5] },
  { id: "baku", name: n("Baku", "Boku", "Баку", "Bakü", "Baku", "巴库"), country: "AZ", region: "silkroad", photo: "baku", months: [4, 5, 6, 9, 10], days: [3, 4] },
  { id: "tbilisi", name: n("Tbilisi", "Tbilisi", "Тбилиси", "Tiflis", "Tiflis", "第比利斯"), country: "GE", region: "silkroad", photo: "tbilisi", months: [5, 6, 9, 10], days: [3, 5], planner: true },
  { id: "istanbul", name: n("Istanbul", "Istanbul", "Стамбул", "İstanbul", "Istanbul", "伊斯坦布尔"), country: "TR", region: "europe", photo: "istanbul", months: [4, 5, 9, 10], days: [4, 5], planner: true },
  { id: "cappadocia", name: n("Cappadocia", "Kappadokiya", "Каппадокия", "Kapadokya", "Kappadokien", "卡帕多奇亚"), country: "TR", region: "europe", photo: "cappadocia", months: [4, 5, 6, 9, 10], days: [2, 3] },
  { id: "paris", name: n("Paris", "Parij", "Париж", "Paris", "Paris", "巴黎"), country: "FR", region: "europe", photo: "paris", months: [4, 5, 6, 9, 10], days: [4, 5], planner: true },
  { id: "rome", name: n("Rome", "Rim", "Рим", "Roma", "Rom", "罗马"), country: "IT", region: "europe", photo: "rome", months: [4, 5, 9, 10], days: [3, 4], planner: true },
  { id: "barcelona", name: n("Barcelona", "Barselona", "Барселона", "Barselona", "Barcelona", "巴塞罗那"), country: "ES", region: "europe", photo: "barcelona", months: [5, 6, 9], days: [3, 4] },
  { id: "prague", name: n("Prague", "Praga", "Прага", "Prag", "Prag", "布拉格"), country: "CZ", region: "europe", photo: "prague", months: [5, 6, 9], days: [3, 3] },
  { id: "lisbon", name: n("Lisbon", "Lissabon", "Лиссабон", "Lizbon", "Lissabon", "里斯本"), country: "PT", region: "europe", photo: "lisbon", months: [3, 4, 5, 9, 10], days: [3, 4] },
  { id: "alps", name: n("Swiss Alps", "Shveytsariya Alplari", "Швейцарские Альпы", "İsviçre Alpleri", "Schweizer Alpen", "瑞士阿尔卑斯"), country: "CH", region: "europe", photo: "swissAlps", months: [6, 7, 8, 9], days: [4, 6] },
  { id: "tokyo", name: n("Tokyo", "Tokio", "Токио", "Tokyo", "Tokio", "东京"), country: "JP", region: "asia", photo: "tokyo", months: [3, 4, 10, 11], days: [5, 7], planner: true },
  { id: "seoul", name: n("Seoul", "Seul", "Сеул", "Seul", "Seoul", "首尔"), country: "KR", region: "asia", photo: "seoul", months: [4, 5, 9, 10], days: [4, 5], planner: true },
  { id: "bali", name: n("Bali", "Bali", "Бали", "Bali", "Bali", "巴厘岛"), country: "ID", region: "asia", photo: "bali", months: [5, 6, 7, 8, 9], days: [7, 10], planner: true },
  { id: "thailand", name: n("Thai islands", "Tailand orollari", "Острова Таиланда", "Tayland adaları", "Thailändische Inseln", "泰国海岛"), country: "TH", region: "asia", photo: "thailand", months: [11, 12, 1, 2, 3, 4], days: [6, 9] },
  { id: "singapore", name: n("Singapore", "Singapur", "Сингапур", "Singapur", "Singapur", "新加坡"), country: "SG", region: "asia", photo: "singapore", months: [2, 3, 4], days: [3, 4] },
  { id: "kualalumpur", name: n("Kuala Lumpur", "Kuala-Lumpur", "Куала-Лумпур", "Kuala Lumpur", "Kuala Lumpur", "吉隆坡"), country: "MY", region: "asia", photo: "kualaLumpur", months: [5, 6, 7], days: [3, 3] },
  { id: "agra", name: n("Agra", "Agra", "Агра", "Agra", "Agra", "阿格拉"), country: "IN", region: "asia", photo: "tajMahal", months: [10, 11, 12, 1, 2, 3], days: [1, 2] },
  { id: "maldives", name: n("Maldives", "Maldiv orollari", "Мальдивы", "Maldivler", "Malediven", "马尔代夫"), country: "MV", region: "asia", photo: "maldives", months: [11, 12, 1, 2, 3, 4], days: [5, 7] },
  { id: "dubai", name: n("Dubai", "Dubay", "Дубай", "Dubai", "Dubai", "迪拜"), country: "AE", region: "mideast", photo: "dubai", months: [11, 12, 1, 2, 3], days: [4, 5], planner: true },
  { id: "cairo", name: n("Cairo", "Qohira", "Каир", "Kahire", "Kairo", "开罗"), country: "EG", region: "mideast", photo: "cairo", months: [10, 11, 12, 1, 2, 3, 4], days: [3, 4] },
  { id: "marrakech", name: n("Marrakech", "Marrakesh", "Марракеш", "Marakeş", "Marrakesch", "马拉喀什"), country: "MA", region: "mideast", photo: "marrakech", months: [3, 4, 5, 10, 11], days: [3, 4] },
  { id: "capetown", name: n("Cape Town", "Keyptaun", "Кейптаун", "Cape Town", "Kapstadt", "开普敦"), country: "ZA", region: "mideast", photo: "capeTown", months: [11, 12, 1, 2, 3], days: [5, 7] },
  { id: "rio", name: n("Rio de Janeiro", "Rio-de-Janeyro", "Рио-де-Жанейро", "Rio de Janeiro", "Rio de Janeiro", "里约热内卢"), country: "BR", region: "americas", photo: "rio", months: [12, 1, 2, 3], days: [4, 6] },
  { id: "sydney", name: n("Sydney", "Sidney", "Сидней", "Sidney", "Sydney", "悉尼"), country: "AU", region: "americas", photo: "sydney", months: [9, 10, 11, 3, 4, 5], days: [4, 6] },
];

export const destinationById = Object.fromEntries(destinations.map((d) => [d.id, d])) as Record<string, Destination>;

export function photoOf(d: Destination) {
  return photos[d.photo];
}

export { countryName } from "@/lib/format";

/** Format a list of months as compact ranges, e.g. "Apr–Jun, Sep–Oct" (handles Nov–Mar wrap-around). */
export function formatMonths(months: number[], locale: Locale) {
  const set = new Set(months);
  const label = (m: number) => monthShort(m, locale);
  const next = (m: number) => (m === 12 ? 1 : m + 1);
  // a run starts where the previous month is not in the set
  const starts = [...set].filter((m) => !set.has(m === 1 ? 12 : m - 1)).sort((a, b) => a - b);
  if (starts.length === 0) return `${label(1)}–${label(12)}`;
  return starts
    .map((start) => {
      let end = start;
      while (set.has(next(end)) && next(end) !== start) end = next(end);
      return start === end ? label(start) : `${label(start)}–${label(end)}`;
    })
    .join(", ");
}
