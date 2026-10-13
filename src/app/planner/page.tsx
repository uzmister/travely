import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDictionary } from "@/i18n/load";
import { resolveLocale } from "@/i18n/server";
import { Footer } from "@/components/footer";
import { PlannerPage } from "@/components/planner/planner-page";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary(await resolveLocale());
  return { title: t.nav.planner, description: t.planner.pageSubtitle };
}

export default function Planner() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PlannerPage />
      </main>
      <Footer />
    </>
  );
}
