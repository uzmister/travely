"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useI18n } from "@/i18n/provider";
import { fmtNum } from "@/lib/format";

/** Animated number that respects the active locale's number formatting. */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const { locale } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    // server renders the final value; below-the-fold numbers start from zero once hydrated
    if (!inView) setCurrent(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setCurrent(v),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  const formatted = fmtNum(current, locale, decimals);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
