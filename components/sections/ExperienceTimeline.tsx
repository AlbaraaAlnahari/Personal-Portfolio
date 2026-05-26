"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/Container";

// =====================================================
// EXPERIENCE — MISSION DEPLOYMENT LOG / APPLIED OPERATIONS RECORD
// A verified professional-journey system: three applied missions
// (product, robotics, education/leadership) docked to a numbered
// chronology spine. Each record carries a VERIFIED OUTCOME lane.
// The spine + outcome lane illuminate on hover/keyboard-focus of a
// record — interaction-triggered only (no continuous animation).
// =====================================================

type OutcomeKind = "metric" | "deliverable";

interface MissionData {
  id: string;
  index: string;
  role: string;
  org: string;
  period: string;
  domainSignal: string;
  summary: string;
  /** rgb triple for inline domain accent, e.g. "0, 217, 255" */
  rgb: string;
  outcomeKind: OutcomeKind;
  outcomes: { value?: string; label: string }[];
  tags: string[];
}

// Only verified, already-approved Experience facts. No invented metrics.
const MISSIONS: MissionData[] = [
  {
    id: "soum",
    index: "01",
    role: "Product Management Intern",
    org: "Soum",
    period: "Nov 2025 – Mar 2026",
    domainSignal: "PRODUCT / USER RESEARCH",
    summary:
      "Supported product development through user research, competitive benchmarking, and prioritization of high-value use cases.",
    rgb: "0, 217, 255",
    outcomeKind: "metric",
    outcomes: [
      { value: "100+", label: "USERS RESEARCHED" },
      { value: "4+", label: "MARKET BENCHMARKS" },
      { value: "3+", label: "PRIORITY USE CASES" },
    ],
    tags: ["Product Development", "User Research", "Market Benchmarks"],
  },
  {
    id: "smartmethod",
    index: "02",
    role: "Robotics Engineering Intern",
    org: "Smart Method",
    period: "Jun 2025 – Dec 2025",
    domainSignal: "ROBOTICS / AI PROTOTYPING",
    summary:
      "Built an AI-powered robotic arm and developed an AI chatbot prototype during hands-on robotics engineering work.",
    rgb: "181, 55, 242",
    outcomeKind: "deliverable",
    outcomes: [
      { label: "AI-Powered Robotic Arm" },
      { label: "AI Chatbot Prototype" },
      { label: "Robotics Engineer Certification" },
    ],
    tags: ["AI Robotics", "Robotic Arm", "AI Chatbot Prototype"],
  },
  {
    id: "alaqsa",
    index: "03",
    role: "Summer Program Director & Supervisor",
    org: "Al-Aqsa Private Schools Institute",
    period: "2023 – 2025 · Seasonal",
    domainSignal: "LEADERSHIP / EDUCATION",
    summary:
      "Directed seasonal summer programs, coordinated educators, and helped expand student participation.",
    rgb: "0, 255, 159",
    outcomeKind: "metric",
    outcomes: [
      { value: "70+", label: "STUDENTS SERVED" },
      { value: "8+", label: "TEACHERS COORDINATED" },
      { value: "30%", label: "ENROLLMENT GROWTH" },
    ],
    tags: ["Program Direction", "Mentorship", "Team Coordination"],
  },
];

export function ExperienceTimeline() {
  const reduce = useReducedMotion();

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
            className="space-y-5"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="text-sm font-mono text-accent-cyan tracking-[0.22em]">
                MISSION LOG / APPLIED EXPERIENCE
              </div>
              <div className="text-xs font-mono text-accent-cyan/55 tracking-[0.22em]">
                03 MISSION RECORDS
              </div>
            </div>
            <h2
              id="experience-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
            >
              Applied work, <span className="text-accent-cyan">deployed</span>
              <br />
              in real environments.
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg max-w-2xl leading-relaxed">
              A verified progression across product management, robotics
              engineering, and education leadership — recorded by outcome.
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
  const { index, role, org, period, domainSignal, summary, rgb, outcomeKind, outcomes, tags } =
    mission;
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
        aria-label={`Mission log ${index}: ${role} at ${org}, ${period}`}
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
            LOG / {index}
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
              COMPLETED
            </span>
          </div>
        </div>

        {/* Role + organization (primary hierarchy) */}
        <div className="mt-3 space-y-1">
          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            {role}
          </h3>
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <span className="text-sm md:text-base font-semibold" style={{ color: `rgb(${rgb})` }}>
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
              VERIFIED OUTCOME
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
              {outcomes.map((o) => (
                <div
                  key={o.label}
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
                    {o.label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-2.5">
              {outcomes.map((o) => (
                <div
                  key={o.label}
                  className="flex items-center gap-2 rounded-lg border bg-background-primary/40 px-2.5 py-2"
                  style={{ borderColor: `rgba(${rgb},0.15)` }}
                >
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: `rgb(${rgb})` }}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] md:text-xs font-medium text-foreground-secondary/85 leading-tight">
                    {o.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Highlight tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded text-[11px] bg-background-primary/55 border text-foreground-secondary/85"
              style={{ borderColor: `rgba(${rgb},0.18)` }}
            >
              {t}
            </span>
          ))}
        </div>
      </article>
    </motion.li>
  );
}
