import { costSplit, plannerCityById, type BudgetLevel, type Interest, type Poi, type PlannerCity, type Slot } from "@/data/planner";
import { destinations } from "@/data/destinations";
import { locales } from "@/i18n/config";

export type TemplateKey = "explore" | "visit" | "stroll" | "taste" | "sunset" | "dinner" | "evening" | "free";

export type PlanInput = {
  cityId: string;
  days: number;
  level: BudgetLevel;
  travelers: number;
  interests: Interest[];
  seed: number;
};

export type PlanItem = {
  time: string;
  slot: Slot | "lunch";
  template: TemplateKey;
  poi?: Poi;
  dish?: string;
  hours: number;
  fee: number;
};

export type PlanDay = { day: number; items: PlanItem[]; km: number };

export type Plan = {
  input: PlanInput;
  city: PlannerCity;
  days: PlanDay[];
  perPersonPerDay: number;
  total: number;
  breakdown: { stay: number; food: number; transport: number; activities: number };
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dist = (a: Poi, b: Poi) => Math.hypot(a.x - b.x, a.y - b.y);

export function generatePlan(input: PlanInput): Plan {
  const city = plannerCityById[input.cityId] ?? plannerCityById.samarkand;
  const rand = mulberry32(input.seed * 9973 + city.id.length * 131 + input.days);
  const wanted = new Set(input.interests);

  const score = (p: Poi) => p.tags.filter((t) => wanted.has(t)).length * 3 + rand() * 1.5;
  const ranked = [...city.pois].map((p) => ({ p, s: score(p) })).sort((a, b) => b.s - a.s).map((x) => x.p);
  const used = new Set<string>();

  const pick = (slot: Slot): Poi | undefined => {
    const fresh = ranked.find((p) => !used.has(p.name) && p.slots.includes(slot));
    const any = fresh ?? ranked.find((p) => !used.has(p.name));
    if (any) used.add(any.name);
    return any;
  };

  const days: PlanDay[] = [];
  for (let d = 1; d <= input.days; d++) {
    const items: PlanItem[] = [];
    const early = rand() > 0.5;

    const morning = pick("morning");
    items.push(
      morning
        ? { time: early ? "09:00" : "09:30", slot: "morning", template: d % 2 ? "explore" : "visit", poi: morning, hours: morning.hours, fee: morning.fee }
        : { time: "10:00", slot: "morning", template: "free", poi: ranked[(d * 3) % ranked.length], hours: 2, fee: 0 },
    );

    const dish = city.dishes[(d - 1) % city.dishes.length];
    items.push({ time: "13:00", slot: "lunch", template: "taste", dish, hours: 1, fee: 0 });

    const afternoon = pick("afternoon");
    items.push(
      afternoon
        ? { time: "15:00", slot: "afternoon", template: d % 2 ? "visit" : "stroll", poi: afternoon, hours: afternoon.hours, fee: afternoon.fee }
        : { time: "15:00", slot: "afternoon", template: "free", poi: ranked[(d * 5 + 1) % ranked.length], hours: 2, fee: 0 },
    );

    const evening = pick("evening");
    if (evening) {
      items.push({
        time: rand() > 0.5 ? "18:30" : "19:00",
        slot: "evening",
        template: evening.tags.includes("nightlife") ? "evening" : "sunset",
        poi: evening,
        hours: evening.hours,
        fee: evening.fee,
      });
    } else {
      items.push({ time: "19:30", slot: "evening", template: "dinner", dish: city.dishes[d % city.dishes.length], hours: 1.5, fee: 0 });
    }

    const stops = items.map((i) => i.poi).filter(Boolean) as Poi[];
    let km = 0;
    for (let i = 1; i < stops.length; i++) km += dist(stops[i - 1], stops[i]) * 0.09;
    days.push({ day: d, items, km: Math.max(1.2, Math.round(km * 10) / 10) });
  }

  const perPersonPerDay = city.daily[input.level];
  const shared = input.travelers > 1 ? 0.75 : 1; // rooms are shared
  const perDay = {
    stay: perPersonPerDay * costSplit.stay * shared,
    food: perPersonPerDay * costSplit.food,
    transport: perPersonPerDay * costSplit.transport,
    activities: perPersonPerDay * costSplit.activities,
  };
  const mult = input.days * input.travelers;
  const breakdown = {
    stay: Math.round(perDay.stay * mult),
    food: Math.round(perDay.food * mult),
    transport: Math.round(perDay.transport * mult),
    activities: Math.round(perDay.activities * mult),
  };
  const total = breakdown.stay + breakdown.food + breakdown.transport + breakdown.activities;

  return { input, city, days, perPersonPerDay, total, breakdown };
}

/** Best-effort parse of a free-text prompt like "5 days in Samarkand under $600". */
export function parsePrompt(q: string): Partial<PlanInput> {
  const text = q.toLowerCase();
  const out: Partial<PlanInput> = {};

  for (const d of destinations) {
    if (!d.planner) continue;
    // compare stems so inflected forms match too ("в Бухаре", "Buxoroda", "Buhara'da")
    const stem = (name: string) => (name.length > 4 ? name.slice(0, -1) : name).toLowerCase();
    if (locales.some((l) => text.includes(stem(d.name[l])))) {
      out.cityId = d.id;
      break;
    }
  }

  const money = text.match(/\$\s?(\d[\d,. ]*)|(\d[\d,. ]*)\s?(\$|usd|dollar|долл|dolar|美元)/);
  const budget = money ? Number((money[1] ?? money[2]).replace(/[^\d]/g, "")) : undefined;

  const withoutMoney = money ? text.replace(money[0], " ") : text;
  const num = withoutMoney.match(/(\d{1,2})/);
  if (num) {
    const n = Number(num[1]);
    if (n >= 1 && n <= 14) out.days = Math.min(10, Math.max(1, n));
  }
  if (/weekend|dam olish kun|выходн|hafta sonu|wochenende|周末/.test(text) && !out.days) out.days = 2;
  if (/week|hafta|недел|woche|一周|星期/.test(text) && !out.days) out.days = 7;

  if (budget && out.cityId) {
    const days = out.days ?? 3;
    const perDay = budget / days;
    const city = plannerCityById[out.cityId];
    out.level = perDay >= city.daily.luxury * 0.8 ? "luxury" : perDay >= city.daily.comfort * 0.8 ? "comfort" : "budget";
  } else if (/luxury|hashamat|люкс|lüks|luxus|奢华/.test(text)) {
    out.level = "luxury";
  } else if (/budget|tejam|эконом|ekonomik|backpack|经济/.test(text)) {
    out.level = "budget";
  }

  const interestWords: [Interest, RegExp][] = [
    ["culture", /histor|tarix|истор|tarih|geschicht|历史|cultur|madaniy|культур|kültür|kultur|文化/],
    ["food", /food|taom|еда|кухн|yemek|essen|美食|plov|palov|halal|halol|халял|helal/],
    ["nature", /nature|tabiat|природ|doğa|natur|自然|mountain|togʻ|горн|dağ|berg|山/],
    ["family", /family|kid|oila|bola|сем|дет|aile|çocuk|famili|kinder|亲子|孩子/],
    ["shopping", /shop|xarid|шоп|alışveriş|einkauf|购物/],
    ["nightlife", /night|tungi|ночн|gece|nacht|夜/],
    ["art", /\bart\b|museum|sanʼat|muzey|искусств|музе|sanat|müze|kunst|艺术|博物馆/],
    ["relax", /relax|dam ol|отдых|dinlen|entspann|休闲|spa/],
  ];
  const found = interestWords.filter(([, re]) => re.test(text)).map(([i]) => i);
  if (found.length) out.interests = found;
  return out;
}
