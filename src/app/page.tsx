import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { DestinationMarquee } from "@/components/landing/marquee";
import { Stats } from "@/components/landing/stats";
import { Problem } from "@/components/landing/problem";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PlannerSection } from "@/components/landing/planner-section";
import { Destinations } from "@/components/landing/destinations";
import { SilkRoad } from "@/components/landing/silk-road";
import { AppShowcase } from "@/components/landing/app-showcase";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <DestinationMarquee />
        <Stats />
        <Problem />
        <Features />
        <HowItWorks />
        <PlannerSection />
        <Destinations />
        <SilkRoad />
        <AppShowcase />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
