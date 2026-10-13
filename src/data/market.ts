/**
 * Researched market data (public sources, as of 2026). Keep numbers here so the
 * landing page and the pitch deck always tell the same story.
 */

export type SourceId =
  | "untourism"
  | "wttc"
  | "wttcCA"
  | "uzStat2025"
  | "uzExports"
  | "uzOutbound"
  | "uz2022"
  | "uz2023"
  | "uz2021"
  | "uzTarget"
  | "phocuswright"
  | "mm"
  | "adobe"
  | "globalRescue"
  | "expedia"
  | "expedia38"
  | "datareportal"
  | "mindtrip"
  | "booking"
  | "itpark"
  | "telegram";

export const sources: Record<SourceId, { label: string; url: string }> = {
  untourism: {
    label: "UN Tourism — World Tourism Barometer, Jan 2026 (1.52B arrivals, $1.9T receipts in 2025)",
    url: "https://www.unwto.org/unwto-world-tourism-barometer-data",
  },
  wttc: {
    label: "WTTC Economic Impact Research 2026 — $11.6T, 9.8% of global GDP (TravelPulse)",
    url: "https://www.travelpulse.com/news/impacting-travel/travel-tourism-growth-outpaces-global-economy-in-2025-wttc",
  },
  wttcCA: {
    label: "WTTC: Central Asia led global tourism growth in 2025 — visitor spending +26.4% (Fergana)",
    url: "https://en.fergana.news/news/148515/",
  },
  uzStat2025: {
    label: "Statistics Agency of Uzbekistan — 11.7M foreign tourists in 2025, +46.8% (UzDaily)",
    url: "https://www.uzdaily.uz/en/uzbekistan-welcomes-117-million-tourists-in-2025/",
  },
  uzExports: {
    label: "Uzbekistan tourism exports reach $4.8B in 2025 (Kun.uz)",
    url: "https://kun.uz/en/news/2026/01/15/uzbekistans-tourism-exports-hit-48-billion-amid-surge-in-visitor-numbers",
  },
  uzOutbound: {
    label: "7.56M outbound trips by Uzbek citizens in 2025, +22.3% (Kun.uz)",
    url: "https://kun.uz/en/news/2026/01/22/uzbekistan-records-22-rise-in-outbound-tourism-in-2025",
  },
  uz2022: {
    label: "5.2M foreign tourists visited Uzbekistan in 2022 (Kun.uz / Statistics Agency)",
    url: "https://kun.uz/en/news/2023/01/18/more-than-52-million-tourists-visited-uzbekistan-in-2022",
  },
  uz2023: {
    label: "6.6M foreign tourists in 2023 (Uzbekistan National Tourism Committee)",
    url: "https://uzbekistan.travel/en/uzbekistan-tourist-arrivals",
  },
  uz2021: {
    label: "Foreign arrivals jump sixfold from 1.9M in 2021 to 11.7M in 2025 (bne IntelliNews)",
    url: "https://www.intellinews.com/uzbekistan-s-foreign-arrivals-jump-sixfold-from-1-9mn-in-2021-to-11-7mn-in-2025-430648/",
  },
  uzTarget: {
    label: "“Uzbekistan — 2030” strategy: 15M foreign tourists per year by 2030 (President of Uzbekistan)",
    url: "https://president.uz/en/lists/view/6764",
  },
  phocuswright: {
    label: "Phocuswright — $1.2T in online travel bookings by end of 2026",
    url: "https://www.phocuswright.com/Travel-Research/Research-Updates/2025/1-2-T-dollars-in-online-bookings-by-end-of-2026",
  },
  mm: {
    label: "MarketsandMarkets — AI in tourism: $2.95B (2024) → $13.38B (2030), 28.7% CAGR",
    url: "https://www.marketsandmarkets.com/PressReleases/ai-in-tourism.asp",
  },
  adobe: {
    label: "Adobe (2025) — 29% of US consumers have used AI for trip planning",
    url: "https://business.adobe.com/blog/consumers-embrace-generative-ai-for-trip-planning",
  },
  globalRescue: {
    label: "Global Rescue traveler survey (2025) — 22% have used generative AI to plan a trip",
    url: "https://www.globalrescue.com/common/blog/detail/ai-agentic-trip-planning/",
  },
  expedia: {
    label: "Expedia Group Path to Purchase (2023) — 303 minutes and 141 pages in the 45 days before booking",
    url: "https://www.expedia.com/newsroom/eg-path-to-purchase-research",
  },
  expedia38: {
    label: "Expedia Media Solutions — consumers visit 38 sites before booking (Travel Market Report)",
    url: "https://travelmarketreport.com/articles/Consumers-Visit-38-Sites-Before-Booking-Expedia-Says",
  },
  datareportal: {
    label: "DataReportal — Digital 2026: Uzbekistan (33.1M internet users, 89% penetration)",
    url: "https://datareportal.com/reports/digital-2026-uzbekistan",
  },
  mindtrip: {
    label: "PhocusWire — Mindtrip has raised $22.5M for AI travel planning",
    url: "https://www.phocuswire.com/mindtrip-ai-travel-planning-capital-one-ventures-united-airlines-ventures",
  },
  booking: {
    label: "Booking Holdings Form 10-K FY2025 — $186.1B gross bookings",
    url: "https://www.sec.gov/Archives/edgar/data/1075531/000107553126000009/bkng-20251231.htm",
  },
  itpark: {
    label: "EY — Decree on additional incentives for IT Park residents (2024)",
    url: "https://www.ey.com/en_uz/technical/tax-alerts/2024/10/ey-uz-decree-on-additional-incentives-to-support-it-park-residents",
  },
  telegram: {
    label: "Kun.uz — Uzbekistan ranks 2nd in the world by number of Telegram channels",
    url: "https://ad.kun.uz/en/news/2023/03/23/uzbekistan-ranks-second-in-the-world-in-terms-of-number-of-telegram-channels",
  },
};

/** Foreign visitors to Uzbekistan, millions. 2024 is derived from the +46.8% growth reported for 2025. */
export const uzVisitors: { year: number; value: number; derived?: boolean }[] = [
  { year: 2021, value: 1.9 },
  { year: 2022, value: 5.2 },
  { year: 2023, value: 6.6 },
  { year: 2024, value: 8.0, derived: true },
  { year: 2025, value: 11.7 },
];

export const headline = {
  arrivals2025: 1.52, // billion, UN Tourism
  travelGdp2025: 11.6, // trillion USD, WTTC
  uzVisitors2025: 11.7, // million
  uzGrowthPct: 46.8,
  uzExports2025: 4.8, // billion USD
  uzTarget2030: 15, // million
  researchHours: 5, // 303 minutes
  onlineBookings2026: 1.2, // trillion USD
  centralAsiaExports: 10, // ≈ billion USD (Uzbekistan ≈ half)
  aiTourism2030: 13.4, // billion USD
  bookingGross2025: 186, // billion USD
};

/** Management projections used in the pitch deck. */
export const projections = [
  { year: 2027, mau: 0.15, bookers: 4.5, gbv: 2.3, revenue: 0.25, ebitda: -0.45 },
  { year: 2028, mau: 0.6, bookers: 24, gbv: 12.1, revenue: 1.33, ebitda: -1.6 },
  { year: 2029, mau: 1.5, bookers: 75, gbv: 37.8, revenue: 4.16, ebitda: -0.8 },
  { year: 2030, mau: 3.0, bookers: 165, gbv: 83.2, revenue: 9.15, ebitda: 1.2 },
];

export const useOfFunds = [40, 30, 15, 15];
export const raise = 600_000;
