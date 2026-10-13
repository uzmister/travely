import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers";
import { getDictionary } from "@/i18n/load";
import { resolveLocale } from "@/i18n/server";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  style: ["italic", "normal"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary(await resolveLocale());
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: "%s · Travely" },
    description: t.meta.description,
    applicationName: "Travely",
    keywords: ["AI travel planner", "Uzbekistan travel", "Silk Road", "Samarkand", "trip planner", "travel startup"],
    openGraph: {
      type: "website",
      siteName: "Travely",
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0a08" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await resolveLocale();
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <div className="ambient" aria-hidden />
        <div className="grain" aria-hidden />
        <Providers locale={locale} dictionary={dictionary}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
