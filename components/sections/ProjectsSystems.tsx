"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SystemPreviewFrame } from "@/components/sections/projects/SystemPreviewFrame";
import {
  SanadkConceptVisual,
  SlideMindConceptVisual,
} from "@/components/sections/projects/ProjectConceptVisuals";

// =====================================================
// PROJECT SYSTEMS — Deployed systems gallery
// Flagship-led editorial hierarchy:
//   1. DocuPilot — flagship case study (AI Operations
//      Pipeline signature + real Decision Dashboard proof)
//   2. TechPath — secondary feature (real roadmap proof)
//   3. Sanadk / Slide-Mind — crafted concept modules
// =====================================================

type Accent = "cyan" | "purple" | "green";

const accentTokens: Record<Accent, { rgb: string }> = {
  cyan: { rgb: "0, 217, 255" },
  purple: { rgb: "181, 55, 242" },
  green: { rgb: "0, 255, 159" },
};

const DOCUPILOT = {
  systemLabel: "SYSTEM 01 / FLAGSHIP MODULE",
  category: "AI SAAS / BUSINESS OPERATIONS",
  name: "DocuPilot",
  tagline: "AI Business Operations Platform",
  recognition: "1st Place — AI Innovation Bootcamp",
  description:
    "AI SaaS platform transforming business documents into structured workflows, approvals, and operational systems.",
  tech: ["Next.js", "TypeScript", "Supabase", "Gemini API", "Qwen API", "Zod"],
  link: "https://docupilot.site",
  linkLabel: "Live Site",
};

export function ProjectsSystems() {
  const reduce = useReducedMotion();
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section
      id="projects"
      className="py-14 md:py-20 relative scroll-mt-14 md:scroll-mt-16"
      aria-labelledby="projects-heading"
    >
      <Container>
        <div className="space-y-8 md:space-y-10">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={rise}
            className="space-y-5"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="text-sm font-mono text-accent-green tracking-[0.22em]">
                DEPLOYED SYSTEMS / FEATURED WORK
              </div>
              <div className="text-xs font-mono text-accent-cyan/60 tracking-[0.22em]">
                04 PROJECT SYSTEMS
              </div>
            </div>
            <h2
              id="projects-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
            >
              Products designed to turn
              <br />
              <span className="text-accent-cyan">intelligence</span> into action.
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg max-w-2xl leading-relaxed">
              A selection of AI-enabled products, accessibility experiences, and
              software systems built to solve real problems.
            </p>
          </motion.div>

          {/* 1 — DocuPilot flagship */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={rise}
          >
            <FlagshipCard reduce={!!reduce} />
          </motion.div>

          {/* 2 — TechPath secondary feature */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={rise}
          >
            <TechPathFeature />
          </motion.div>

          {/* 3 + 4 — concept modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={rise}
              className="h-full"
            >
              <ConceptModule
                accent="cyan"
                systemLabel="SYSTEM 03 / INCLUSIVE DESIGN"
                category="ACCESSIBILITY / INCLUSIVE DESIGN"
                name="Sanadk Accessibility App"
                tagline="Accessible Mobility Experience"
                description="Accessibility-first mobile experience for visually impaired and wheelchair users."
                conceptLabel="ACCESSIBILITY GUIDANCE SIGNAL"
                tech={["UX/UI", "Figma", "Accessibility Design"]}
                visual={<SanadkConceptVisual rgb={accentTokens.cyan.rgb} />}
                statusLabel="ACCESSIBILITY / UX CASE"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={rise}
              className="h-full"
            >
              <ConceptModule
                accent="purple"
                systemLabel="SYSTEM 04 / STUDY AUTOMATION"
                category="AI LEARNING TOOLS"
                name="Slide-Mind Flashcard Generator"
                tagline="AI Study System"
                description="AI-powered flashcard generation system with modular architecture."
                conceptLabel="KNOWLEDGE DISTILLATION ENGINE"
                tech={["Java", "API Integration"]}
                visual={<SlideMindConceptVisual rgb={accentTokens.purple.rgb} />}
                link="https://github.com/ProgAm1/Slide-Mind-Project"
                linkLabel="View Repository"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Shared external action link
// ─────────────────────────────────────────────────────────────────────────
function ActionLink({
  href,
  label,
  name,
  rgb,
  size = "sm",
  onActiveChange,
}: {
  href: string;
  label: string;
  name: string;
  rgb: string;
  size?: "sm" | "md";
  onActiveChange?: (active: boolean) => void;
}) {
  const activity = onActiveChange
    ? {
        onMouseEnter: () => onActiveChange(true),
        onMouseLeave: () => onActiveChange(false),
        onFocus: () => onActiveChange(true),
        onBlur: () => onActiveChange(false),
      }
    : {};
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — ${label} (opens in a new tab)`}
      {...activity}
      className={`ie-focus inline-flex items-center gap-2 font-mono tracking-wide no-underline transition-opacity duration-300 hover:opacity-80 ${
        size === "md" ? "text-sm" : "text-xs"
      }`}
      style={{ color: `rgb(${rgb})` }}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}

function TechChips({ tech, rgb }: { tech: string[]; rgb: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <span
          key={t}
          className="px-2.5 py-1 rounded text-[11px] bg-background-primary/55 border text-foreground-secondary/85"
          style={{ borderColor: `rgba(${rgb},0.18)` }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 1 — DocuPilot flagship: identity + AI Operations Pipeline + live preview
// ─────────────────────────────────────────────────────────────────────────
function FlagshipCard({ reduce }: { reduce: boolean }) {
  const a = accentTokens.cyan;
  // Output routing: the pipeline emits → the deployed-interface preview. The
  // ports/trace brighten when the Live Site action is hovered/focused.
  const [outputActive, setOutputActive] = useState(false);
  return (
    <div className="relative group">
      {/* Ambient hover glow */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(${a.rgb}, 0.16) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-background-primary/45 border transition-all duration-500"
        style={{ borderColor: `rgba(${a.rgb},0.32)` }}
      >
        {/* Top accent trace */}
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${a.rgb}, 0.5), transparent)`,
          }}
          aria-hidden="true"
        />

        {/* Upper: identity + pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Left: content */}
          <div className="md:col-span-3 p-7 md:p-9 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-mono text-accent-cyan/70 tracking-[0.22em]">
                {DOCUPILOT.systemLabel}
              </div>
              <div
                className="w-1.5 h-1.5 rounded-full bg-accent-green/75"
                style={{ boxShadow: "0 0 8px rgba(0, 255, 159, 0.6)" }}
              />
            </div>

            <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em]">
              {DOCUPILOT.category}
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-cyan">
                {DOCUPILOT.name}
              </h3>
              <p className="text-lg md:text-xl text-foreground-secondary/85">
                {DOCUPILOT.tagline}
              </p>
            </div>

            {/* Recognition badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border"
              style={{
                borderColor: `rgba(${a.rgb},0.3)`,
                backgroundColor: `rgba(${a.rgb}, 0.08)`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                style={{ boxShadow: "0 0 6px rgba(0, 217, 255, 0.7)" }}
              />
              <span className="text-xs text-accent-cyan font-medium tracking-wide">
                {DOCUPILOT.recognition}
              </span>
            </div>

            <p className="text-foreground-secondary/90 leading-relaxed">
              {DOCUPILOT.description}
            </p>

            <div>
              <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em] mb-3">
                TECHNOLOGY STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {DOCUPILOT.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-md bg-background-primary/55 border border-glass-light/30 text-xs text-foreground-secondary/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <ActionLink
              href={DOCUPILOT.link}
              label={DOCUPILOT.linkLabel}
              name={DOCUPILOT.name}
              rgb={a.rgb}
              size="md"
              onActiveChange={setOutputActive}
            />
          </div>

          {/* Right: AI Operations Pipeline — PRESERVED system signature */}
          <div className="md:col-span-2 p-7 md:p-9 flex flex-col items-center justify-center bg-gradient-to-br from-accent-cyan/[0.04] via-accent-purple/[0.03] to-transparent border-t md:border-t-0 md:border-l border-glass-light/15">
            <WorkflowDiagram reduce={reduce} />

            {/* Pipeline output dock → routes down to the deployed interface.
                Visible at idle, illuminates with the preview's receiving port
                when the Live Site action/preview is hovered or focused. */}
            <div className="mt-3 flex flex-col items-center gap-1.5" aria-hidden="true">
              <span
                className="h-5 w-px transition-all duration-500"
                style={{
                  background: outputActive
                    ? "linear-gradient(to bottom, rgba(0,217,255,0.85), rgba(0,217,255,0.2))"
                    : "linear-gradient(to bottom, rgba(0,217,255,0.5), rgba(0,217,255,0.12))",
                }}
              />
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: outputActive ? "rgba(0,217,255,1)" : "rgba(0,217,255,0.75)",
                    boxShadow: outputActive
                      ? "0 0 10px rgba(0,217,255,0.85)"
                      : "0 0 6px rgba(0,217,255,0.45)",
                  }}
                />
                <span
                  className="font-mono text-[8px] tracking-[0.24em] transition-colors duration-500"
                  style={{ color: outputActive ? "rgba(0,217,255,0.95)" : "rgba(0,217,255,0.65)" }}
                >
                  SYSTEM OUTPUT
                </span>
              </span>
              {/* downward route cue — output continues into the preview below */}
              <svg
                width="9"
                height="11"
                viewBox="0 0 9 11"
                fill="none"
                className="transition-all duration-500"
                style={{ opacity: outputActive ? 0.95 : 0.55 }}
              >
                <path
                  d="M4.5 0 V8 M1.5 5.5 L4.5 9 L7.5 5.5"
                  stroke="rgb(0,217,255)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Lower: LIVE SYSTEM PREVIEW — real Decision Dashboard proof */}
        <div className="border-t border-glass-light/15 p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                style={{ boxShadow: "0 0 8px rgba(0,217,255,0.7)" }}
              />
              <span className="text-xs font-mono text-accent-cyan/80 tracking-[0.22em]">
                LIVE SYSTEM PREVIEW
              </span>
            </div>
            {/* Receiving end of the pipeline output route — docked port that
                completes the SYSTEM OUTPUT → DEPLOYED INTERFACE trace */}
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: outputActive ? "rgba(0,217,255,1)" : "rgba(0,217,255,0.7)",
                  boxShadow: outputActive
                    ? "0 0 9px rgba(0,217,255,0.8)"
                    : "0 0 5px rgba(0,217,255,0.4)",
                }}
                aria-hidden="true"
              />
              <span
                className="hidden sm:block h-px w-5 transition-all duration-500"
                style={{
                  background: outputActive
                    ? "linear-gradient(to right, rgba(0,217,255,0.8), rgba(0,217,255,0.3))"
                    : "linear-gradient(to right, rgba(0,217,255,0.45), rgba(0,217,255,0.1))",
                }}
                aria-hidden="true"
              />
              <span
                className="text-[10px] font-mono tracking-[0.2em] transition-colors duration-500"
                style={{ color: outputActive ? "rgba(120,225,255,0.95)" : "rgba(110,190,225,0.62)" }}
              >
                OUTPUT / DEPLOYED INTERFACE
              </span>
            </div>
          </div>

          <SystemPreviewFrame
            src="/images/projects/docupilot-decision-dashboard.png"
            alt="DocuPilot Decision Dashboard — active projects, pending invoices, required approvals, high risks, and linked project indicators in the deployed AI operations platform."
            width={3446}
            height={1746}
            label="DEPLOYED INTERFACE"
            domain="docupilot.site"
            live
            rgb={a.rgb}
            sizes="(max-width: 1024px) 100vw, 1100px"
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// AI Operations Pipeline — preserved exactly (DocuPilot system signature)
// ─────────────────────────────────────────────────────────────────────────
function WorkflowDiagram({ reduce }: { reduce: boolean }) {
  const stages = [
    { label: "DOCUMENT INPUT", color: "rgb(0, 217, 255)" },
    { label: "AI EXTRACTION", color: "rgb(181, 55, 242)" },
    { label: "STRUCTURED WORKFLOW", color: "rgb(0, 255, 159)" },
    { label: "APPROVAL SYSTEM", color: "rgb(0, 217, 255)" },
  ];

  const cx = 28;
  const r = 14;
  const cySpacing = 60;
  const cyStart = 22;
  const labelX = cx + r + 12;

  return (
    <div className="w-full max-w-[280px] py-1">
      <svg viewBox="0 0 280 224" className="w-full h-auto" aria-hidden="true">
        <defs>
          <linearGradient id="docupilot-trace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(0, 217, 255)" stopOpacity="0.5" />
            <stop offset="33%" stopColor="rgb(181, 55, 242)" stopOpacity="0.5" />
            <stop offset="66%" stopColor="rgb(0, 255, 159)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(0, 217, 255)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Connecting vertical line */}
        <line
          x1={cx}
          y1={cyStart + r}
          x2={cx}
          y2={cyStart + 3 * cySpacing - r}
          stroke="url(#docupilot-trace)"
          strokeWidth="1.2"
          strokeDasharray="3,4"
        />

        {/* Stages */}
        {stages.map((stage, i) => {
          const cy = cyStart + i * cySpacing;
          return (
            <g key={stage.label}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="rgba(10, 14, 39, 0.85)"
                stroke={stage.color}
                strokeWidth="1.5"
                opacity="0.75"
              />
              <circle cx={cx} cy={cy} r={r - 4} fill={stage.color} opacity="0.18" />
              <circle cx={cx} cy={cy} r="2" fill={stage.color} opacity="0.9" />
              <text
                x={labelX}
                y={cy + 3}
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                fill={stage.color}
                opacity="0.9"
                letterSpacing="1.4"
              >
                {stage.label}
              </text>
            </g>
          );
        })}

        {/* Traveling pulse — paused under reduced motion */}
        {!reduce && (
          <circle cx={cx} cy={cyStart} r="2.5" fill="rgb(0, 217, 255)">
            <animate
              attributeName="cy"
              values={`${cyStart};${cyStart + cySpacing};${cyStart + 2 * cySpacing};${cyStart + 3 * cySpacing};${cyStart}`}
              dur="6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0.9;0;0"
              keyTimes="0;0.08;0.5;0.85;0.95;1"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
      <div className="mt-3 text-center text-[10px] font-mono text-foreground-secondary/55 tracking-[0.22em]">
        AI OPERATIONS PIPELINE
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 2 — TechPath secondary feature: real roadmap proof + content
// ─────────────────────────────────────────────────────────────────────────
function TechPathFeature() {
  const a = accentTokens.green;
  return (
    <div className="relative group">
      <div
        className="absolute -inset-1.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
        style={{
          background: `radial-gradient(circle at 35% 50%, rgba(${a.rgb}, 0.13) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-background-primary/45 border transition-all duration-500"
        style={{ borderColor: `rgba(${a.rgb},0.3)` }}
      >
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${a.rgb}, 0.45), transparent)`,
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: real generated-roadmap proof */}
          <div className="p-6 md:p-8 lg:border-r border-glass-light/15 flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="text-xs font-mono tracking-[0.22em]" style={{ color: `rgba(${a.rgb},0.85)` }}>
                SYSTEM 02 / ADAPTIVE LEARNING ROUTE
              </div>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: `rgb(${a.rgb})`, boxShadow: `0 0 8px rgba(${a.rgb},0.6)` }}
              />
            </div>
            <SystemPreviewFrame
              src="/images/projects/techpath-roadmap.png"
              alt="TechPath generated learning roadmap — overall progress, learning timeline with a Foundation / Backend Development phase, and a weekly study schedule."
              width={3456}
              height={1740}
              label="GENERATED ROADMAP"
              domain="techpath / roadmap"
              rgb={a.rgb}
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>

          {/* Right: content */}
          <div className="p-6 md:p-8 flex flex-col space-y-5">
            <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em]">
              AI EDUCATION / PERSONALIZATION
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: `rgb(${a.rgb})` }}>
                TechPath
              </h3>
              <p className="text-base md:text-lg text-foreground-secondary/85">
                AI Learning Roadmap Generator
              </p>
            </div>
            <p className="text-sm md:text-base text-foreground-secondary/85 leading-relaxed">
              AI-powered roadmap generator with personalized learning timelines
              and adaptive educational systems.
            </p>
            <div>
              <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em] mb-2.5">
                TECH STACK
              </div>
              <TechChips tech={["React.js", "Tailwind CSS", "Claude API"]} rgb={a.rgb} />
            </div>

            {/* Footer — adaptive-route accent relates this panel to the
                generated roadmap, with the action docked at the base. */}
            <div className="mt-auto pt-5 space-y-4">
              <div className="flex items-center gap-3" aria-hidden="true">
                <span
                  className="text-[9px] font-mono tracking-[0.24em]"
                  style={{ color: `rgba(${a.rgb},0.6)` }}
                >
                  ADAPTIVE ROUTE
                </span>
                <div className="relative flex-1 flex items-center">
                  <span
                    className="h-px w-full"
                    style={{
                      background: `linear-gradient(to right, rgba(${a.rgb},0.1), rgba(${a.rgb},0.4))`,
                    }}
                  />
                  <span
                    className="absolute left-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: `rgba(${a.rgb},0.45)` }}
                  />
                  <span
                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ background: `rgba(${a.rgb},0.6)` }}
                  />
                  <span
                    className="absolute right-0 w-2 h-2 rounded-full"
                    style={{ background: `rgb(${a.rgb})`, boxShadow: `0 0 8px rgba(${a.rgb},0.55)` }}
                  />
                </div>
              </div>
              <ActionLink
                href="https://github.com/AlbaraaAlnahari/TechPath"
                label="View Repository"
                name="TechPath"
                rgb={a.rgb}
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 3 + 4 — concept modules (in-code interface abstractions)
// ─────────────────────────────────────────────────────────────────────────
function ConceptModule({
  accent,
  systemLabel,
  category,
  name,
  tagline,
  description,
  conceptLabel,
  tech,
  visual,
  link,
  linkLabel,
  statusLabel,
}: {
  accent: Accent;
  systemLabel: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  conceptLabel: string;
  tech: string[];
  visual: React.ReactNode;
  link?: string;
  linkLabel?: string;
  /** truthful classification shown when there is no external action link */
  statusLabel?: string;
}) {
  const a = accentTokens[accent];
  return (
    <div className="relative group h-full">
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(${a.rgb}, 0.12) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="relative h-full flex flex-col rounded-2xl backdrop-blur-xl bg-background-primary/45 border transition-all duration-500 p-6 md:p-7 space-y-5 overflow-hidden"
        style={{ borderColor: `rgba(${a.rgb},0.28)` }}
      >
        <div
          className="absolute top-0 left-6 right-6 h-px pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${a.rgb}, 0.45), transparent)`,
          }}
          aria-hidden="true"
        />

        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: `rgba(${a.rgb},0.7)` }}>
            {systemLabel}
          </span>
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: `rgb(${a.rgb})`, boxShadow: `0 0 6px rgba(${a.rgb},0.5)` }}
          />
        </div>

        <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.2em]">
          {category}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl md:text-2xl font-bold" style={{ color: `rgb(${a.rgb})` }}>
            {name}
          </h3>
          <p className="text-sm text-foreground-secondary/80">{tagline}</p>
        </div>

        {/* Concept visualization — labeled interface abstraction */}
        <div
          className="rounded-xl border bg-background-primary/40 px-4 pt-3 pb-2"
          style={{ borderColor: "rgba(150,165,205,0.14)" }}
        >
          <div className="text-[9px] font-mono tracking-[0.22em] mb-1" style={{ color: `rgba(${a.rgb},0.6)` }}>
            {conceptLabel}
          </div>
          {visual}
        </div>

        <p className="text-sm text-foreground-secondary/75 leading-relaxed flex-grow">
          {description}
        </p>

        <div className="border-t border-glass-light/15 pt-4 space-y-4">
          <TechChips tech={tech} rgb={a.rgb} />
          {link && linkLabel ? (
            <ActionLink href={link} label={linkLabel} name={name} rgb={a.rgb} />
          ) : statusLabel ? (
            <div className="inline-flex items-center gap-2">
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: `rgba(${a.rgb},0.6)` }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-[10px] tracking-[0.2em]"
                style={{ color: `rgba(${a.rgb},0.6)` }}
              >
                {statusLabel}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
