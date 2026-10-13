"use client";

import { useI18n } from "@/i18n/provider";
import { Rich } from "@/components/rich";
import { Reveal, SectionHeading } from "@/components/reveal";
import { TripPlanner } from "@/components/planner/trip-planner";

export function PlannerSection() {
  const { t } = useI18n();
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={t.planner.eyebrow} title={<Rich text={t.planner.title} />} subtitle={t.planner.subtitle} />
        <Reveal className="mt-12">
          <TripPlanner id="demo" />
        </Reveal>
      </div>
    </section>
  );
}
