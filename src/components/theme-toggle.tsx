"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/cn";

/** Day / night switch styled as a soft-UI track with a glass knob. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? t.nav.themeLight : t.nav.themeDark;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "soft-inset relative inline-flex h-9 w-[4.25rem] shrink-0 items-center rounded-full p-1 transition-colors",
        className,
      )}
    >
      <Sun className="absolute left-2 size-3.5 text-brand-ink opacity-70" aria-hidden />
      <Moon className="absolute right-2 size-3.5 text-ink-3" aria-hidden />
      <span
        className={cn(
          "relative z-10 grid size-7 place-items-center rounded-full text-white shadow-md transition-transform duration-500 ease-[cubic-bezier(.2,.9,.2,1.2)]",
          isDark ? "translate-x-[2.25rem] bg-gradient-to-br from-[#3b2a20] to-[#1a120d]" : "translate-x-0 bg-gradient-to-br from-[#ffb14d] to-[#f2540a]",
        )}
        style={{ boxShadow: "0 1px 0 rgba(255,255,255,.45) inset, 0 6px 14px -4px rgba(0,0,0,.35)" }}
      >
        {isDark ? <Moon className="size-3.5 text-[#ffc285]" /> : <Sun className="size-3.5" />}
      </span>
    </button>
  );
}
