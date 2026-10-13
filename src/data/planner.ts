export const interests = ["culture", "food", "nature", "shopping", "nightlife", "relax", "art", "family"] as const;
export type Interest = (typeof interests)[number];
export type Slot = "morning" | "afternoon" | "evening";
export type BudgetLevel = "budget" | "comfort" | "luxury";

export type Poi = {
  name: string;
  tags: Interest[];
  slots: Slot[];
  hours: number;
  /** rough entry fee per person, USD */
  fee: number;
  /** position on the stylised route map, 0–100 */
  x: number;
  y: number;
};

export type PlannerCity = {
  id: string;
  /** indicative daily spend per person in USD (stay + food + transport + activities) */
  daily: Record<BudgetLevel, number>;
  dishes: string[];
  pois: Poi[];
};

const p = (name: string, tags: Interest[], slots: Slot[], hours: number, fee: number, x: number, y: number): Poi => ({
  name,
  tags,
  slots,
  hours,
  fee,
  x,
  y,
});

export const plannerCities: PlannerCity[] = [
  {
    id: "samarkand",
    daily: { budget: 35, comfort: 85, luxury: 220 },
    dishes: ["Samarkand plov", "tandir non", "lamb shashlik", "somsa"],
    pois: [
      p("Registan Square", ["culture", "art"], ["morning", "evening"], 2, 6, 48, 50),
      p("Shah-i-Zinda", ["culture", "art"], ["morning", "afternoon"], 1.5, 4, 70, 30),
      p("Gur-e-Amir Mausoleum", ["culture"], ["afternoon", "evening"], 1, 4, 36, 66),
      p("Bibi-Khanym Mosque", ["culture"], ["morning", "afternoon"], 1, 3, 60, 40),
      p("Siab Bazaar", ["food", "shopping", "family"], ["morning", "afternoon"], 1.5, 0, 64, 28),
      p("Ulugh Beg Observatory", ["culture", "family"], ["afternoon"], 1, 3, 84, 18),
      p("Konigil paper mill", ["art", "family", "nature"], ["afternoon"], 2, 5, 90, 64),
      p("Afrosiab Museum", ["art", "culture"], ["afternoon"], 1, 3, 74, 16),
      p("Registan light show", ["nightlife", "culture"], ["evening"], 1, 0, 48, 52),
      p("University Boulevard", ["relax", "nightlife"], ["evening"], 1.5, 0, 30, 60),
      p("Eternal City complex", ["nightlife", "family", "art"], ["evening"], 2, 8, 18, 40),
    ],
  },
  {
    id: "bukhara",
    daily: { budget: 30, comfort: 75, luxury: 180 },
    dishes: ["Bukhara plov", "chuchvara", "green tea with halva", "lagman"],
    pois: [
      p("Ark Fortress", ["culture", "family"], ["morning"], 1.5, 5, 30, 36),
      p("Po-i-Kalyan Complex", ["culture", "art"], ["morning", "evening"], 1.5, 3, 44, 46),
      p("Lyabi-Hauz", ["food", "relax", "nightlife"], ["afternoon", "evening"], 1.5, 0, 62, 60),
      p("Trading Domes", ["shopping", "art"], ["afternoon"], 2, 0, 54, 52),
      p("Chor Minor", ["culture", "art"], ["morning", "afternoon"], 0.5, 1, 78, 36),
      p("Samanid Mausoleum", ["culture"], ["morning"], 1, 2, 16, 28),
      p("Sitorai Mohi-Xosa Palace", ["culture", "art"], ["afternoon"], 2, 5, 88, 14),
      p("Bozori Kord Hammam", ["relax"], ["evening"], 1.5, 25, 50, 66),
      p("Folk show at Nodir Divan-Begi", ["nightlife", "art", "family"], ["evening"], 1.5, 10, 64, 64),
    ],
  },
  {
    id: "tashkent",
    daily: { budget: 40, comfort: 90, luxury: 230 },
    dishes: ["plov at the Central Asian Plov Centre", "lagman", "somsa", "shashlik"],
    pois: [
      p("Chorsu Bazaar", ["food", "shopping", "culture"], ["morning"], 2, 0, 22, 34),
      p("Khast Imam Complex", ["culture", "art"], ["morning"], 1.5, 0, 16, 22),
      p("Tashkent Metro stations", ["art", "culture", "family"], ["afternoon"], 1.5, 0.2, 50, 50),
      p("Museum of Applied Arts", ["art", "culture"], ["afternoon"], 1.5, 3, 58, 64),
      p("Amir Timur Square", ["culture", "relax"], ["afternoon", "evening"], 1, 0, 56, 46),
      p("Tashkent City Park", ["relax", "family", "nightlife"], ["evening"], 2, 0, 40, 46),
      p("Navoi Theatre", ["art", "nightlife"], ["evening"], 2.5, 10, 46, 40),
      p("Chimgan & Charvak day trip", ["nature", "family"], ["morning", "afternoon"], 7, 30, 92, 12),
      p("Magic City", ["family", "nightlife"], ["evening"], 2, 0, 34, 70),
    ],
  },
  {
    id: "almaty",
    daily: { budget: 40, comfort: 90, luxury: 230 },
    dishes: ["beshbarmak", "baursak", "lagman", "kazy"],
    pois: [
      p("Medeu", ["nature", "family"], ["morning"], 2, 0, 70, 30),
      p("Shymbulak cable car", ["nature", "family"], ["morning", "afternoon"], 3, 25, 80, 14),
      p("Big Almaty Lake", ["nature"], ["morning"], 4, 5, 30, 12),
      p("Kok Tobe", ["family", "nightlife", "nature"], ["evening"], 2, 8, 58, 44),
      p("Green Bazaar", ["food", "shopping"], ["morning", "afternoon"], 1.5, 0, 44, 56),
      p("Panfilov Park & Zenkov Cathedral", ["culture", "relax"], ["afternoon"], 1, 0, 48, 62),
      p("Charyn Canyon day trip", ["nature"], ["morning", "afternoon"], 9, 15, 96, 70),
      p("Arbat street", ["shopping", "nightlife"], ["evening"], 1.5, 0, 40, 66),
    ],
  },
  {
    id: "tbilisi",
    daily: { budget: 40, comfort: 85, luxury: 220 },
    dishes: ["khachapuri", "khinkali", "churchkhela", "badrijani"],
    pois: [
      p("Old Town", ["culture", "relax"], ["morning", "afternoon"], 2, 0, 48, 56),
      p("Narikala Fortress", ["culture", "nature"], ["afternoon", "evening"], 1.5, 3, 40, 66),
      p("Abanotubani sulphur baths", ["relax"], ["evening"], 1.5, 20, 46, 70),
      p("Rustaveli Avenue", ["culture", "shopping"], ["morning"], 1.5, 0, 36, 30),
      p("Fabrika", ["nightlife", "food"], ["evening"], 2, 0, 60, 28),
      p("Dry Bridge Market", ["shopping", "art"], ["morning"], 1.5, 0, 52, 40),
      p("Mtatsminda Park", ["family", "nature"], ["afternoon"], 2, 5, 22, 44),
      p("Georgian National Museum", ["art", "culture"], ["afternoon"], 1.5, 5, 38, 36),
    ],
  },
  {
    id: "istanbul",
    daily: { budget: 55, comfort: 120, luxury: 320 },
    dishes: ["İskender kebab", "balık ekmek", "baklava", "simit"],
    pois: [
      p("Hagia Sophia", ["culture", "art"], ["morning"], 1.5, 28, 46, 60),
      p("Blue Mosque", ["culture"], ["morning", "afternoon"], 1, 0, 44, 66),
      p("Topkapı Palace", ["culture", "art"], ["morning", "afternoon"], 2.5, 45, 52, 56),
      p("Grand Bazaar", ["shopping", "food"], ["afternoon"], 2, 0, 36, 58),
      p("Galata Tower", ["culture", "nightlife"], ["evening"], 1, 30, 46, 40),
      p("Bosphorus cruise", ["nature", "relax", "family"], ["afternoon", "evening"], 2, 15, 70, 30),
      p("Kadıköy food streets", ["food", "nightlife"], ["evening"], 2, 0, 78, 66),
      p("Balat & Fener", ["culture", "art"], ["morning"], 2, 0, 28, 36),
    ],
  },
  {
    id: "dubai",
    daily: { budget: 90, comfort: 220, luxury: 600 },
    dishes: ["shawarma", "machboos", "luqaimat", "karak chai"],
    pois: [
      p("Burj Khalifa — At the Top", ["culture", "family"], ["afternoon", "evening"], 1.5, 45, 52, 52),
      p("Dubai Mall & Fountain", ["shopping", "family", "nightlife"], ["evening"], 2.5, 0, 54, 56),
      p("Al Fahidi Historical District", ["culture", "art"], ["morning"], 1.5, 0, 70, 28),
      p("Gold & Spice Souks", ["shopping", "food"], ["morning", "afternoon"], 1.5, 0, 74, 20),
      p("Desert safari", ["nature", "family", "nightlife"], ["afternoon", "evening"], 6, 60, 92, 80),
      p("Museum of the Future", ["art", "family"], ["afternoon"], 1.5, 40, 58, 44),
      p("Jumeirah Beach", ["relax", "nature", "family"], ["morning"], 2.5, 0, 34, 50),
      p("Dubai Marina walk", ["nightlife", "relax"], ["evening"], 1.5, 0, 14, 70),
    ],
  },
  {
    id: "paris",
    daily: { budget: 110, comfort: 230, luxury: 600 },
    dishes: ["croissant", "crêpe", "steak frites", "macarons"],
    pois: [
      p("Eiffel Tower", ["culture", "family"], ["morning", "evening"], 2, 30, 24, 56),
      p("Louvre Museum", ["art", "culture"], ["morning", "afternoon"], 3, 22, 50, 46),
      p("Montmartre & Sacré-Cœur", ["art", "culture"], ["afternoon", "evening"], 2, 0, 52, 14),
      p("Seine river cruise", ["relax", "nightlife", "family"], ["evening"], 1, 18, 40, 52),
      p("Le Marais", ["shopping", "food"], ["afternoon"], 2, 0, 62, 50),
      p("Musée d'Orsay", ["art"], ["morning"], 2, 16, 40, 50),
      p("Luxembourg Gardens", ["relax", "nature", "family"], ["afternoon"], 1.5, 0, 46, 68),
      p("Notre-Dame & Île de la Cité", ["culture"], ["morning"], 1, 0, 56, 58),
    ],
  },
  {
    id: "rome",
    daily: { budget: 95, comfort: 200, luxury: 500 },
    dishes: ["carbonara", "cacio e pepe", "pizza al taglio", "gelato"],
    pois: [
      p("Colosseum", ["culture", "family"], ["morning"], 2, 18, 62, 64),
      p("Roman Forum & Palatine", ["culture"], ["morning", "afternoon"], 2, 0, 58, 58),
      p("Vatican Museums", ["art", "culture"], ["morning"], 3, 20, 18, 34),
      p("Trevi Fountain", ["culture", "nightlife"], ["evening"], 0.5, 0, 50, 40),
      p("Pantheon", ["culture", "art"], ["afternoon"], 1, 5, 44, 44),
      p("Trastevere", ["food", "nightlife"], ["evening"], 2, 0, 36, 66),
      p("Villa Borghese", ["nature", "relax", "art"], ["afternoon"], 2, 0, 56, 18),
    ],
  },
  {
    id: "tokyo",
    daily: { budget: 90, comfort: 200, luxury: 520 },
    dishes: ["sushi", "ramen", "tempura", "matcha sweets"],
    pois: [
      p("Senso-ji Temple", ["culture"], ["morning"], 1.5, 0, 74, 28),
      p("Shibuya Crossing", ["nightlife", "shopping"], ["evening"], 1.5, 0, 30, 62),
      p("Meiji Shrine", ["culture", "nature"], ["morning"], 1.5, 0, 28, 46),
      p("Tsukiji Outer Market", ["food"], ["morning"], 1.5, 0, 58, 64),
      p("teamLab Planets", ["art", "family"], ["afternoon"], 2, 25, 70, 78),
      p("Shinjuku Gyoen", ["nature", "relax"], ["afternoon"], 1.5, 4, 36, 42),
      p("Akihabara", ["shopping", "family"], ["afternoon"], 2, 0, 62, 36),
      p("Tokyo Tower", ["culture", "nightlife"], ["evening"], 1, 10, 48, 66),
    ],
  },
  {
    id: "seoul",
    daily: { budget: 70, comfort: 160, luxury: 420 },
    dishes: ["bibimbap", "tteokbokki", "Korean BBQ", "hotteok"],
    pois: [
      p("Gyeongbokgung Palace", ["culture", "family"], ["morning"], 2, 3, 46, 26),
      p("Bukchon Hanok Village", ["culture", "art"], ["morning", "afternoon"], 1.5, 0, 56, 22),
      p("Myeongdong", ["shopping", "food"], ["afternoon", "evening"], 2, 0, 52, 48),
      p("N Seoul Tower", ["nightlife", "family"], ["evening"], 1.5, 18, 50, 56),
      p("Gwangjang Market", ["food"], ["afternoon"], 1.5, 0, 66, 34),
      p("Hongdae", ["nightlife", "art"], ["evening"], 2, 0, 18, 46),
      p("Han River parks", ["relax", "nature", "family"], ["afternoon"], 2, 0, 40, 76),
    ],
  },
  {
    id: "bali",
    daily: { budget: 40, comfort: 100, luxury: 300 },
    dishes: ["nasi goreng", "satay", "mie goreng", "fresh coconut"],
    pois: [
      p("Tegallalang Rice Terraces", ["nature"], ["morning"], 2, 3, 58, 26),
      p("Ubud Monkey Forest", ["nature", "family"], ["morning", "afternoon"], 1.5, 6, 52, 36),
      p("Uluwatu Temple & Kecak dance", ["culture", "art", "nightlife"], ["evening"], 2.5, 10, 30, 90),
      p("Tanah Lot", ["culture", "nature"], ["evening"], 1.5, 4, 22, 58),
      p("Seminyak beach clubs", ["relax", "nightlife"], ["afternoon", "evening"], 3, 0, 32, 70),
      p("Mount Batur sunrise trek", ["nature"], ["morning"], 6, 40, 68, 8),
      p("Tirta Empul", ["culture", "relax"], ["afternoon"], 1.5, 4, 62, 22),
      p("Ubud Art Market", ["shopping", "art"], ["afternoon"], 1.5, 0, 54, 34),
    ],
  },
];

export const plannerCityById = Object.fromEntries(plannerCities.map((c) => [c.id, c])) as Record<string, PlannerCity>;

export const costSplit = { stay: 0.42, food: 0.26, transport: 0.12, activities: 0.2 } as const;
