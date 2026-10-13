"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fades and lifts content into view once. */
export function Reveal({ delay = 0, y = 26, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
        <span className="eyebrow">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-brand" aria-hidden />
          {eyebrow}
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-brand" aria-hidden />
        </span>
        <h2 className="mt-4 text-balance text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl">
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-pretty text-base leading-relaxed text-ink-2 sm:text-lg">{subtitle}</p>}
      </div>
    </Reveal>
  );
}
