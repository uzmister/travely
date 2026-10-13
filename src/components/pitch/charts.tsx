"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/i18n/provider";
import { fmtCompact, fmtNum, fmtPct } from "@/lib/format";
import { uzVisitors, projections, useOfFunds, raise } from "@/data/market";

const ease = [0.2, 0.7, 0.2, 1] as const;

/** Column chart, one series, value on each cap (the y-axis is dropped). The derived year is hatched. */
export function VisitorsChart({ title, note }: { title: string; note: string }) {
  const { locale } = useI18n();
  const [hover, setHover] = useState<number | null>(null);
  const hatchId = `hatch-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const fmt = { format: (v: number) => fmtNum(v, locale, 1) };
  const W = 520;
  const H = 260;
  const pad = { t: 28, b: 30, l: 8, r: 8 };
  const max = 12;
  const band = (W - pad.l - pad.r) / uzVisitors.length;
  const barW = 24;
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / max);

  return (
    <figure className="w-full">
      <figcaption className="text-[13px] font-extrabold text-ink @3xl:text-[15px]">{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full overflow-visible" role="img" aria-label={title}>
        <defs>
          <pattern id={hatchId} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="var(--brand)" opacity=".35" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--brand)" strokeWidth="3" />
          </pattern>
        </defs>
        {[0, 4, 8, 12].map((g) => (
          <line key={g} x1={pad.l} x2={W - pad.r} y1={y(g)} y2={y(g)} stroke="var(--line)" strokeWidth="1" />
        ))}
        {uzVisitors.map((d, i) => {
          const cx = pad.l + band * i + band / 2;
          const top = y(d.value);
          const h = H - pad.b - top;
          const r = 4;
          const path = `M ${cx - barW / 2} ${H - pad.b} V ${top + r} Q ${cx - barW / 2} ${top} ${cx - barW / 2 + r} ${top} H ${cx + barW / 2 - r} Q ${cx + barW / 2} ${top} ${cx + barW / 2} ${top + r} V ${H - pad.b} Z`;
          return (
            <g key={d.year} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={cx - band / 2} y={pad.t} width={band} height={H - pad.t - pad.b} fill="transparent" />
              <motion.path
                d={path}
                fill={d.derived ? `url(#${hatchId})` : "var(--brand)"}
                opacity={hover === null || hover === i ? 1 : 0.45}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ originY: 1, transformBox: "fill-box" }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease }}
              />
              <text x={cx} y={top - 8} textAnchor="middle" className="fill-ink" fontSize="17" fontWeight="800">
                {fmt.format(d.value)}
                {d.derived ? "*" : ""}
              </text>
              <text x={cx} y={H - 8} textAnchor="middle" className="fill-ink-3" fontSize="13" fontWeight="700">
                {d.year}
              </text>
            </g>
          );
        })}
        <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} stroke="var(--line-strong)" strokeWidth="1" />
      </svg>
      <p className="mt-2 text-[11px] font-semibold text-ink-3 @3xl:text-[12px]">* {note}</p>
    </figure>
  );
}

/** Revenue columns 2027–2030 (one series). GBV & the rest live in the table beside it. */
export function RevenueChart({ label }: { label: string }) {
  const { locale } = useI18n();
  const fmt = { format: (v: number) => fmtCompact(v, locale, true) };
  const W = 420;
  const H = 280;
  const pad = { t: 30, b: 30, l: 8, r: 8 };
  const max = 10;
  const band = (W - pad.l - pad.r) / projections.length;
  const barW = 24;
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / max);

  return (
    <figure className="w-full">
      <figcaption className="text-[13px] font-extrabold text-ink @3xl:text-[15px]">{label}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full overflow-visible" role="img" aria-label={label}>
        {[0, 5, 10].map((g) => (
          <line key={g} x1={pad.l} x2={W - pad.r} y1={y(g)} y2={y(g)} stroke="var(--line)" strokeWidth="1" />
        ))}
        {projections.map((d, i) => {
          const cx = pad.l + band * i + band / 2;
          const top = y(d.revenue);
          const r = 4;
          const path = `M ${cx - barW / 2} ${H - pad.b} V ${top + r} Q ${cx - barW / 2} ${top} ${cx - barW / 2 + r} ${top} H ${cx + barW / 2 - r} Q ${cx + barW / 2} ${top} ${cx + barW / 2} ${top + r} V ${H - pad.b} Z`;
          return (
            <g key={d.year}>
              <title>{`${d.year}: ${fmt.format(d.revenue * 1e6)}`}</title>
              <motion.path
                d={path}
                fill="var(--brand)"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ originY: 1, transformBox: "fill-box" }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease }}
              />
              <text x={cx} y={top - 9} textAnchor="middle" className="fill-ink" fontSize="15" fontWeight="800">
                {fmt.format(d.revenue * 1e6)}
              </text>
              <text x={cx} y={H - 8} textAnchor="middle" className="fill-ink-3" fontSize="12" fontWeight="700">
                {d.year}
              </text>
            </g>
          );
        })}
        <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} stroke="var(--line-strong)" strokeWidth="1" />
      </svg>
    </figure>
  );
}

/** Use of funds as horizontal bars (magnitude, one hue), value at the tip. */
export function FundsBars({ labels }: { labels: string[] }) {
  const { locale } = useI18n();
  const money = { format: (v: number) => fmtCompact(v, locale, true) };
  const pct = { format: (v: number) => fmtPct(v * 100, locale) };
  return (
    <ul className="space-y-4 @3xl:space-y-6">
      {useOfFunds.map((v, i) => (
        <li key={labels[i]}>
          <div className="flex items-baseline justify-between gap-3 text-[13px] font-bold @3xl:text-[17px]">
            <span className="text-ink">{labels[i]}</span>
            <span className="tabular-nums text-ink-2">
              {pct.format(v / 100)} · {money.format((raise * v) / 100)}
            </span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-black/[.05] dark:bg-white/[.08] @3xl:h-3.5">
            <motion.div
              className="h-full rounded-full bg-brand"
              initial={{ width: 0 }}
              animate={{ width: `${(v / 40) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 + i * 0.1, ease }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Nested TAM / SAM / SOM circles — illustrative, not to scale. */
export function MarketCircles({ values }: { values: [string, string, string] }) {
  const rings = [
    { r: 150, label: "TAM", value: values[0], fill: "var(--brand-soft)", text: "var(--brand-ink)" },
    { r: 96, label: "SAM", value: values[1], fill: "var(--brand-3)", text: "#5a2300" },
    { r: 50, label: "SOM", value: values[2], fill: "var(--brand)", text: "#fff" },
  ];
  return (
    <svg viewBox="0 0 320 320" className="mx-auto w-full max-w-[300px]" role="img" aria-label="TAM, SAM, SOM">
      {rings.map((ring, i) => (
        <motion.g key={ring.label} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, delay: i * 0.15, ease }} style={{ originX: "160px", originY: "310px" }}>
          <circle cx="160" cy={310 - ring.r} r={ring.r} fill={ring.fill} stroke="var(--surface)" strokeWidth="2" />
          <text x="160" y={310 - ring.r * 2 + (i === 2 ? 42 : 30)} textAnchor="middle" fontSize={i === 2 ? 11 : 12} fontWeight="800" fill={ring.text} opacity=".85" letterSpacing="1.5">
            {ring.label}
          </text>
          <text x="160" y={310 - ring.r * 2 + (i === 2 ? 64 : 56)} textAnchor="middle" fontSize={i === 2 ? 20 : 24} fontWeight="800" fill={ring.text}>
            {ring.value}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
