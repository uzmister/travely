# Travely — AI travel companion for the New Silk Road & beyond

Travely is a startup concept: an AI travel companion that **plans, books and guides** a whole trip in the traveler's language, starting with Uzbekistan and the Silk Road and expanding worldwide.

This repository contains the marketing website, an interactive AI-planner demo and the **investor pitch deck at `/pitch`**. No backend is needed; it deploys to Vercel as-is.

## What's inside

| Route | What it is |
| --- | --- |
| `/` | Landing page: hero with an AI prompt, real market numbers, features, live planner demo, destinations from 6 continents, Silk Road spotlight, app preview, pricing, FAQ and a waitlist form |
| `/planner` | Interactive trip planner (12 cities, days, travel style, travelers, interests → day-by-day plan, route map and budget) |
| `/pitch` | 18-slide investor deck: problem, solution, product, why now, market (TAM/SAM/SOM), business model, unit economics, progress, go-to-market, competition, moat, 12-month financial plan, 12-month roadmap, team, the ask ($10K pre-seed), contact, sources |

**Design:** orange & white soft UI with liquid-glass surfaces and a day/night (light/dark) theme.
**Languages (6):** Oʻzbekcha, English, Русский, Türkçe, Deutsch, 中文. The choice is stored in a cookie, so pages are rendered server-side in the right language with no flash.
**Photos:** real photographs from the Unsplash CDN (free under the Unsplash License), see `src/data/images.ts`.

### Pitch deck controls

- `←` `→` / `Space` / swipe: previous and next slide · `G`: all slides · `F`: fullscreen
- **Save as PDF** prints one 16:9 slide per page (in the print dialog choose "Save as PDF" and enable "Background graphics").
- `/pitch#7` opens slide 7. On phones the deck becomes a scrollable document.

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · next-themes · lucide-react

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset: **Next.js** (detected automatically). No environment variables are required.
4. Click **Deploy**. The pitch deck lives at `https://<your-project>.vercel.app/pitch`.

## Editing content

| What | Where |
| --- | --- |
| All texts in 6 languages | `src/i18n/dictionaries/{uz,en,ru,tr,de,zh}.ts` (English is the reference shape) |
| Founder names, email, Telegram, domain | `src/data/site.ts` |
| Market numbers, projections, use of funds, sources | `src/data/market.ts` |
| Destinations (names, seasons, photos) | `src/data/destinations.ts`, `src/data/images.ts` |
| Planner cities, places, dishes, prices | `src/data/planner.ts` |

Wrap a word in `*asterisks*` inside any headline to give it the orange serif accent.

## The round

- **Founder & CEO:** Dinara Maksudova
- **Ask:** $10,000 pre-seed (SAFE) for a 12-month runway
- **Use of funds:** product & AI 40% ($4,000) · marketing & growth 30% ($3,000) · local partners 15% ($1,500) · operations & legal 15% ($1,500)
- **12-month plan** (`src/data/market.ts`): 25,000 registered users, 10,000 MAU, 600 bookings, $108K gross bookings, $10.8K revenue; revenue covers monthly costs from Q3 and cash never falls below $5.7K. Assumptions: $180 average booking, 10% net take rate, 1.5 bookings per booker, founder salary not included.

> **Before investor meetings:** replace the placeholder email, Telegram and domain in `src/data/site.ts`, and update the "Progress" slide with your real numbers as they come in.

## Data sources (as of 2026)

- UN Tourism World Tourism Barometer (Jan 2026): 1.52B international arrivals, $1.9T receipts in 2025
- WTTC Economic Impact Research 2026: travel & tourism = $11.6T, 9.8% of global GDP; Central Asia visitor spending +26.4% in 2025
- Statistics Agency of Uzbekistan: 11.7M foreign visitors in 2025 (+46.8%), 7.56M outbound trips; 5.2M in 2022; 6.6M in 2023; 1.9M in 2021
- Uzbekistan tourism exports: $4.8B in 2025; "Uzbekistan — 2030" target: 15M foreign visitors per year
- Phocuswright: $1.2T online travel bookings by 2026 · MarketsandMarkets: AI in tourism $13.38B by 2030 (28.7% CAGR)
- Adobe (2025): 29% of US consumers used AI for trip planning · Global Rescue (2025): 22% of travelers
- Expedia Group: 303 minutes and 141 pages of research before booking; 38 sites visited
- DataReportal Digital 2026: 33.1M internet users in Uzbekistan (89%)
- Booking Holdings FY2025 10-K: $186.1B gross bookings · PhocusWire: Mindtrip raised ~$22.5M

Full links are in `src/data/market.ts` and on the last slide of the deck. Financial projections are management estimates.

---

## Oʻzbekcha qisqacha

- **Ishga tushirish:** `npm install` → `npm run dev` → http://localhost:3000
- **Vercel'ga joylash:** GitHub repozitoriyani Vercel'da *Import* qiling → *Deploy*. Hech qanday sozlama kerak emas.
- **Pitch:** `/pitch` sahifasi. "PDF sifatida saqlash" tugmasi har bir slaydni alohida sahifa qilib chiqaradi.
- **Matnlar:** `src/i18n/dictionaries/` papkasida 6 til. Asoschi (Dinara Maksudova) va kontaktlar: `src/data/site.ts`.
- **Raund:** $10 000 pre-seed, 12 oylik reja: 25 000 foydalanuvchi, 600 bron, $108K bron hajmi, $10,8K daromad.
