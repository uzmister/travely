import { useId } from "react";
import { cn } from "@/lib/cn";

/** Travely mark: a sun rising over a winding route. */
export function LogoMark({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const bg = `tl-bg-${uid}`;
  const shine = `tl-shine-${uid}`;
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden>
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFA24C" />
          <stop offset="0.55" stopColor="#FF6A13" />
          <stop offset="1" stopColor="#E8480A" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="12" fill={`url(#${bg})`} />
      <rect x="1" y="1" width="38" height="38" rx="12" fill={`url(#${shine})`} />
      <circle cx="26" cy="14" r="5" fill="#fff" opacity=".95" />
      <path
        d="M7 30c5.5 0 6.5-7 12-7s5 5 9 5c2.6 0 4-1.2 5-2.5"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="7.5" cy="30" r="2.2" fill="#fff" />
    </svg>
  );
}

export function Logo({ className, textClassName }: { className?: string; textClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className={cn("text-[1.35rem] font-extrabold tracking-[-0.04em] text-ink", textClassName)}>
        travely<span className="text-brand">.</span>
      </span>
    </span>
  );
}
