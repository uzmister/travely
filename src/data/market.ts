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

/**
 * 12-month plan for the $10K pre-seed round (management estimates).
 * Assumptions: $180 average booking, 10% net take rate, 1.5 bookings per booker,
 * founder salary not included. Users and MAU are end-of-quarter values.
 */
export const avgBooking = 180;
export const takeRate = 0.1;

export const plan12 = [
  { q: "Q1", months: "1–3", users: 1_500, mau: 800, bookings: 10, costs: 3_000 },
  { q: "Q2", months: "4–6", users: 5_000, mau: 2_500, bookings: 60, costs: 2_500 },
  { q: "Q3", months: "7–9", users: 12_000, mau: 6_000, bookings: 180, costs: 2_300 },
  { q: "Q4", months: "10–12", users: 25_000, mau: 10_000, bookings: 350, costs: 2_200 },
].map((p) => {
  const gbv = p.bookings * avgBooking;
  const revenue = gbv * takeRate;
  return { ...p, gbv, revenue, net: revenue - p.costs };
});

export const plan12Total = {
  users: plan12[plan12.length - 1].users,
  mau: plan12[plan12.length - 1].mau,
  bookings: plan12.reduce((a, p) => a + p.bookings, 0),
  gbv: plan12.reduce((a, p) => a + p.gbv, 0),
  revenue: plan12.reduce((a, p) => a + p.revenue, 0),
  costs: plan12.reduce((a, p) => a + p.costs, 0),
  net: plan12.reduce((a, p) => a + p.net, 0),
};

/** Unit economics targets for year one. */
export const unit = {
  commission: avgBooking * takeRate, // $18
  bookingsPerBooker: 1.5,
  ltv: avgBooking * takeRate * 1.5, // $27
  cac: 7.5, // $3,000 marketing ÷ 400 bookers
};

export const raise = 10_000;
/** Use of funds, % of the round: product & AI, marketing, local partners, operations & legal. */
export const useOfFunds = [40, 30, 15, 15];
