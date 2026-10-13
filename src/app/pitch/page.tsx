import type { Metadata } from "next";
import { PitchDeck } from "@/components/pitch/deck";
import { getDictionary } from "@/i18n/load";
import { resolveLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary(await resolveLocale());
  return {
    title: { absolute: t.meta.pitchTitle },
    description: t.pitch.cover.tagline.replaceAll("*", ""),
    openGraph: { title: t.meta.pitchTitle, description: t.pitch.cover.tagline.replaceAll("*", "") },
  };
}

export default function PitchPage() {
  return <PitchDeck />;
}
