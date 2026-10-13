"use client";

import { Fragment } from "react";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/cn";

/** Renders copy where *wrapped words* become the orange serif accent. */
export function Rich({ text, accentClassName }: { text: string; accentClassName?: string }) {
  const { locale } = useI18n();
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <span
            key={i}
            className={cn(
              "text-gradient",
              locale === "zh" ? "font-extrabold" : "font-serif font-semibold italic tracking-[-0.01em] [font-variant-numeric:lining-nums] pe-[0.06em] -me-[0.03em]",
              accentClassName,
            )}
          >
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
