"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// =====================================================
// EXPERIENCE — MISSION DEPLOYMENT LOG / APPLIED OPERATIONS RECORD
// A verified professional-journey system: three applied missions
// (product, robotics, education/leadership) docked to a numbered
// chronology spine. Each record carries a VERIFIED OUTCOME lane.
// The spine + outcome lane illuminate on hover/keyboard-focus of a
// record — interaction-triggered only (no continuous animation).
// =====================================================

type OutcomeKind = "metric" | "deliverable";
type MissionId = "soum" | "smartmethod" | "alaqsa";

// Structural mission data only — all copy reads from t by mission id.
// outcomeValues pair stable outcome keys with verified numeric values
// (numbers never translated). Deliverable missions carry no values.
interface MissionData {
  id: MissionId;
  index: string;
  /** rgb triple for inline domain accent, e.g. "var(--rgb-cyan)" */
  rgb: string;
  outcomeKind: OutcomeKind;
  outcomeValues: { key: string; value?: string }[];
}

// Only verified, already-approved Experience facts. No invented metrics.
const MISSIONS: MissionData[] = [
  {
    id: "soum",
    index: "01",
    rgb: "var(--rgb-cyan)",
    outcomeKind: "metric",
    outcomeValues: [
      { key: "users", value: "100+" },
      { key: "benchmarks", value: "4+" },
      { key: "useCases", value: "3+" },
    ],
  },
  {
    id: "smartmethod",
    index: "02",
    rgb: "var(--rgb-purple)",
    outcomeKind: "deliverable",
    outcomeValues: [{ key: "arm" }, { key: "chatbot" }, { key: "certification" }],
  },
  {
    id: "alaqsa",
    index: "03",
    rgb: "var(--rgb-green)",
    outcomeKind: "metric",
    outcomeValues: [
      { key: "students", value: "70+" },
      { key: "teachers", value: "8+" },
      { key: "growth", value: "30%" },
    ],
  },
];

export function ExperienceTimeline() {
  const reduce = useReducedMotion();
  const { t, displayFont } = useLanguage();
  const E = t.impact.experience;

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] },
    },
  };
  const list: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  return (
    <section
      id="experience"
      className="py-16 md:py-24 relative scroll-mt-14 md:scroll-mt-16"
      aria-labelledby="experience-heading"
    >
      <Container>
        <div className="space-y-8 md:space-y-10">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={rise}
            className="readability-field space-y-5"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="text-sm font-mono text-accent-cyan tracking-[0.22em]">
                {E.eyebrow}
              </div>
              <div className="text-xs font-mono text-accent-cyan/55 tracking-[0.22em]">
                {E.recordsLabel}
              </div>
            </div>
            <h2
              id="experience-heading"
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] ${displayFont}`}
            >
              {E.headingLine1Before}
              <span className="text-accent-cyan">{E.headingLine1Accent}</span>
              <br />
              {E.headingLine2}
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg max-w-2xl leading-relaxed">
              {E.intro}
            </p>
          </motion.div>

          {/* Mission chronology spine */}
          <motion.ol
            role="list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={list}
            className="relative"
          >
            {MISSIONS.map((m, i) => (
              <MissionRecord
                key={m.id}
                mission={m}
                isLast={i === MISSIONS.length - 1}
                rise={rise}
              />
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// One applied-mission record docked to the chronology spine
// ─────────────────────────────────────────────────────────────────────────
function MissionRecord({
  mission,
  isLast,
  rise,
}: {
  mission: MissionData;
  isLast: boolean;
  rise: Variants;
}) {
  const { index, rgb, outcomeKind, outcomeValues } = mission;
  const { t } = useLanguage();
  const E = t.impact.experience;
  const M = E.missions[mission.id];
  const { role, org, period, domainSignal, summary, tags } = M;
  // Activation drives the signature spine + evidence-lane illumination.
  // Wired to hover AND keyboard focus so both paths light the record.
  const [active, setActive] = useState(false);

  return (
    <motion.li variants={rise} className="group relative list-none pb-7 md:pb-9 last:pb-0">
      {/* Rail segment — runs from this node's center into the next node.
          Hidden on the final record. Brightens with the active record. */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-5 top-6 w-px h-full transition-all duration-300"
          style={{
            background: active
              ? `linear-gradient(to bottom, rgba(${rgb},0.85), rgba(${rgb},0.25))`
              : `linear-gradient(to bottom, rgba(${rgb},0.4), rgba(150,165,205,0.12))`,
          }}
        />
      )}

      {/* Mission anchor node — framed index ("terminal port") on the spine */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1 z-10 grid place-items-center w-10 h-10 rounded-xl border font-mono text-sm font-bold transition-all duration-300"
        style={{
          borderColor: active ? `rgba(${rgb},0.85)` : `rgba(${rgb},0.4)`,
          background: active ? `rgba(${rgb},0.16)` : `rgba(${rgb},0.08)`,
          color: active ? `rgb(${rgb})` : `rgba(${rgb},0.8)`,
          boxShadow: active ? `0 0 16px rgba(${rgb},0.4)` : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        {index}
      </span>

      {/* Record card */}
      <article
        tabIndex={0}
        aria-label={E.recordAria(index, role, org, period)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="ie-focus relative ml-[3.25rem] sm:ml-[3.75rem] md:ml-[4.5rem] rounded-2xl border bg-background-primary/40 backdrop-blur-md p-4 sm:p-5 md:p-5 transition-all duration-300 outline-none"
        style={{
          borderColor: active ? `rgba(${rgb},0.42)` : `rgba(${rgb},0.2)`,
          boxShadow: active ? `0 14px 40px rgba(0,0,0,0.4), 0 0 26px rgba(${rgb},0.08)` : "none",
        }}
      >
        {/* Domain edge accent */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full transition-all duration-300"
          style={{
            background: active
              ? `linear-gradient(to bottom, rgba(${rgb},0.9), rgba(${rgb},0.3))`
              : `linear-gradient(to bottom, rgba(${rgb},0.5), rgba(${rgb},0.12))`,
          }}
        />

        {/* Header row: log id · period · status */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
          <span
            className="font-mono text-[11px] tracking-[0.22em]"
            style={{ color: `rgb(${rgb})` }}
          >
            {E.logLabel} / {index}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.14em] text-foreground-secondary/55">
              {period}
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border font-mono text-[9px] tracking-[0.18em]"
              style={{
                borderColor: `rgba(${rgb},0.28)`,
                color: `rgba(${rgb},0.75)`,
                background: `rgba(${rgb},0.06)`,
              }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: `rgba(${rgb},0.8)` }}
                aria-hidden="true"
              />
              {E.completed}
            </span>
          </div>
        </div>

        {/* Role + organization (primary hierarchy) */}
        <div className="mt-3 space-y-1">
          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            {role}
          </h3>
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <span
              dir="ltr"
              className="ltr-isolate text-sm md:text-base font-semibold"
              style={{ color: `rgb(${rgb})` }}
            >
              {org}
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-foreground-secondary/45">
              {domainSignal}
            </span>
          </div>
        </div>

        {/* Mission summary */}
        <p className="mt-3 text-sm md:text-[15px] text-foreground-secondary/80 leading-relaxed">
          {summary}
        </p>

        {/* VERIFIED OUTCOME evidence lane */}
        <div
          className="mt-3.5 rounded-xl border bg-background-primary/30 p-3 md:p-3.5 transition-all duration-300"
          style={{ borderColor: active ? `rgba(${rgb},0.3)` : `rgba(150,165,205,0.12)` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: active ? `rgb(${rgb})` : `rgba(${rgb},0.6)`,
                boxShadow: active ? `0 0 7px rgba(${rgb},0.7)` : "none",
              }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-[9px] tracking-[0.24em] transition-colors duration-300"
              style={{ color: active ? `rgba(${rgb},0.9)` : `rgba(${rgb},0.6)` }}
            >
              {E.verifiedOutcome}
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 transition-all duration-300"
              style={{
                background: active
                  ? `linear-gradient(to right, rgba(${rgb},0.5), transparent)`
                  : `linear-gradient(to right, rgba(${rgb},0.18), transparent)`,
              }}
            />
          </div>

          {outcomeKind === "metric" ? (
            <div className="grid grid-cols-3 gap-2 md:gap-2.5">
              {outcomeValues.map((o) => (
                <div
                  key={o.key}
                  className="rounded-lg border bg-background-primary/40 px-2.5 py-2"
                  style={{ borderColor: `rgba(${rgb},0.15)` }}
                >
                  <div
                    className="text-lg md:text-xl font-bold leading-none"
                    style={{ color: `rgb(${rgb})` }}
                  >
                    {o.value}
                  </div>
                  <div className="mt-1 font-mono text-[8.5px] md:text-[9px] tracking-[0.08em] text-foreground-secondary/60 leading-tight">
                    {M.outcomes[o.key as keyof typeof M.outcomes]}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-2.5">
              {outcomeValues.map((o) => (
                <div
                  key={o.key}
                  className="flex items-center gap-2 rounded-lg border bg-background-primary/40 px-2.5 py-2"
                  style={{ borderColor: `rgba(${rgb},0.15)` }}
                >
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: `rgb(${rgb})` }}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] md:text-xs font-medium text-foreground-secondary/85 leading-tight">
                    {M.outcomes[o.key as keyof typeof M.outcomes]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Highlight tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded text-[11px] bg-background-primary/55 border text-foreground-secondary/85"
              style={{ borderColor: `rgba(${rgb},0.18)` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </motion.li>
  );
}
