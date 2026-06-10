"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SystemPreviewFrame } from "@/components/sections/projects/SystemPreviewFrame";
import {
  TechPathConceptVisual,
  SanadkConceptVisual,
  SlideMindConceptVisual,
} from "@/components/sections/projects/ProjectConceptVisuals";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useThemeName } from "@/hooks/useThemeName";

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
  cyan: { rgb: "var(--rgb-cyan)" },
  purple: { rgb: "var(--rgb-purple)" },
  green: { rgb: "var(--rgb-green)" },
};

// Non-translatable tokens (brand name, tech stack, URL) live here; all
// human-readable copy is read from the `work` dictionary inside FlagshipCard.
const DOCUPILOT = {
  name: "DocuPilot",
  tech: ["Next.js", "TypeScript", "Supabase", "Gemini API", "Qwen API", "Zod"],
  link: "https://docupilot.site",
};

export function ProjectsSystems() {
  const { t, displayFont } = useLanguage();
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
      className="pt-12 pb-8 md:pt-16 md:pb-16 relative scroll-mt-12 md:scroll-mt-16"
      aria-labelledby="projects-heading"
    >
      <Container>
        <div className="space-y-7 md:space-y-9">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={rise}
            className="readability-field space-y-6"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="text-sm font-mono text-accent-green tracking-[0.22em]">
                {t.work.header.eyebrow}
              </div>
            </div>
            <h2
              id="projects-heading"
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] ${displayFont}`}
            >
              {t.work.header.titleLead}
              <br />
              <span className="text-accent-cyan">{t.work.header.titleAccent}</span>{" "}
              {t.work.header.titleTrail}
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg max-w-2xl leading-[1.7]">
              {t.work.header.intro}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={rise}
              className="h-full"
            >
              <ConceptModule
                accent="cyan"
                systemLabel={t.work.sanadk.systemLabel}
                category={t.work.sanadk.category}
                name={t.work.sanadk.name}
                tagline={t.work.sanadk.tagline}
                description={t.work.sanadk.description}
                conceptLabel={t.work.sanadk.conceptLabel}
                tech={["UX/UI", "Figma", "Accessibility Design"]}
                visual={<SanadkConceptVisual rgb={accentTokens.cyan.rgb} />}
                statusLabel={t.work.sanadk.statusLabel}
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
                systemLabel={t.work.slidemind.systemLabel}
                category={t.work.slidemind.category}
                name={t.work.slidemind.name}
                tagline={t.work.slidemind.tagline}
                description={t.work.slidemind.description}
                conceptLabel={t.work.slidemind.conceptLabel}
                tech={["Java", "API Integration"]}
                visual={<SlideMindConceptVisual rgb={accentTokens.purple.rgb} />}
                link="https://github.com/ProgAm1/Slide-Mind-Project"
                linkLabel={t.work.actions.viewRepository}
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
  const { t } = useLanguage();
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
      aria-label={`${name} — ${label} ${t.work.actions.opensNewTab}`}
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
  const { t } = useLanguage();
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
        className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-background-primary/45 t-warm-surface border transition-all duration-500"
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
          <div className="md:col-span-3 p-5 md:p-9 space-y-3 md:space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-mono text-accent-cyan/70 tracking-[0.22em]">
                {t.work.docupilot.systemLabel}
              </div>
              <div
                className="w-1.5 h-1.5 rounded-full bg-accent-green/75"
                style={{ boxShadow: "0 0 8px rgba(var(--rgb-green), 0.6)" }}
              />
            </div>

            <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em]">
              {t.work.docupilot.category}
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-cyan">
                {DOCUPILOT.name}
              </h3>
              <p className="text-base md:text-xl text-foreground-secondary/85 leading-[1.35]">
                {t.work.docupilot.tagline}
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
                style={{ boxShadow: "0 0 6px rgba(var(--rgb-cyan), 0.7)" }}
              />
              <span className="text-xs text-accent-cyan font-medium tracking-wide">
                {t.work.docupilot.recognition}
              </span>
            </div>

            <p className="text-foreground-secondary/90 leading-[1.6] md:leading-[1.8]">
              {t.work.docupilot.description}
            </p>

            <div>
              <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em] mb-3">
                {t.work.labels.technologyStack}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DOCUPILOT.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-md bg-background-primary/55 border text-xs text-foreground-secondary/90"
                    style={{ borderColor: "var(--border-idle)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <ActionLink
              href={DOCUPILOT.link}
              label={t.work.actions.liveSite}
              name={DOCUPILOT.name}
              rgb={a.rgb}
              size="md"
              onActiveChange={setOutputActive}
            />
          </div>

          {/* Right: AI Operations Pipeline — PRESERVED system signature */}
          <div
            className="md:col-span-2 p-5 md:p-9 flex flex-col items-center justify-center bg-gradient-to-br from-accent-cyan/[0.04] via-accent-purple/[0.03] to-transparent border-t md:border-t-0 md:border-l"
            style={{ borderColor: "var(--border-idle)" }}
          >
            <WorkflowDiagram reduce={reduce} />

            {/* Pipeline output dock → routes down to the deployed interface.
                Visible at idle, illuminates with the preview's receiving port
                when the Live Site action/preview is hovered or focused. */}
            <div
              className="hidden md:flex mt-3 flex-col items-center gap-1.5"
              aria-hidden="true"
            >
              <span
                className="h-5 w-px transition-all duration-500"
                style={{
                  background: outputActive
                    ? "linear-gradient(to bottom, rgba(var(--rgb-cyan),0.85), rgba(var(--rgb-cyan),0.2))"
                    : "linear-gradient(to bottom, rgba(var(--rgb-cyan),0.5), rgba(var(--rgb-cyan),0.12))",
                }}
              />
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: outputActive
                      ? "rgba(var(--rgb-cyan),1)"
                      : "rgba(var(--rgb-cyan),0.75)",
                    boxShadow: outputActive
                      ? "0 0 10px rgba(var(--rgb-cyan),0.85)"
                      : "0 0 6px rgba(var(--rgb-cyan),0.45)",
                  }}
                />
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
                  stroke="rgb(var(--rgb-cyan))"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Lower: LIVE SYSTEM PREVIEW — real Decision Dashboard proof */}
        <div
          className="border-t p-5 md:p-8 space-y-4"
          style={{ borderColor: "var(--border-idle)" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                style={{ boxShadow: "0 0 8px rgba(var(--rgb-cyan),0.7)" }}
              />
              <span className="text-xs font-mono text-accent-cyan/80 tracking-[0.22em]">
                {t.work.preview.livePreview}
              </span>
            </div>
            {/* Receiving end of the pipeline output route — docked port that
                completes the SYSTEM OUTPUT → DEPLOYED INTERFACE trace */}
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: outputActive
                    ? "rgba(var(--rgb-cyan),1)"
                    : "rgba(var(--rgb-cyan),0.7)",
                  boxShadow: outputActive
                    ? "0 0 9px rgba(var(--rgb-cyan),0.8)"
                    : "0 0 5px rgba(var(--rgb-cyan),0.4)",
                }}
                aria-hidden="true"
              />
              <span
                className="hidden sm:block h-px w-5 transition-all duration-500"
                style={{
                  background: outputActive
                    ? "linear-gradient(to right, rgba(var(--rgb-cyan),0.8), rgba(var(--rgb-cyan),0.3))"
                    : "linear-gradient(to right, rgba(var(--rgb-cyan),0.45), rgba(var(--rgb-cyan),0.1))",
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          <SystemPreviewFrame
            src="/images/projects/docupilot-decision-dashboard.png"
            alt={t.work.docupilotPreviewAlt}
            width={3446}
            height={1746}
            label={t.work.frame.deployedInterface}
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
  const { t, isAr } = useLanguage();
  const warm = useThemeName() === "warm";
  // Node disc: a light cream-white on warm (so the colored ring + core read
  // cleanly on the cream card) instead of the dark navy that looked muddy.
  const nodeFill = warm ? "rgba(255,255,255,0.72)" : "rgba(10, 14, 39, 0.85)";
  // Arabic must not be letter-spaced (breaks the cursive joining); English keeps
  // the technical mono tracking.
  const labelTracking = isAr ? 0 : 1.4;
  const stages = [
    {
      key: "documentInput",
      label: t.work.pipeline.stages.documentInput,
      color: "rgb(var(--rgb-cyan))",
    },
    {
      key: "aiExtraction",
      label: t.work.pipeline.stages.aiExtraction,
      color: "rgb(var(--rgb-purple))",
    },
    {
      key: "structuredWorkflow",
      label: t.work.pipeline.stages.structuredWorkflow,
      color: "rgb(var(--rgb-green))",
    },
    {
      key: "approvalSystem",
      label: t.work.pipeline.stages.approvalSystem,
      color: "rgb(var(--rgb-cyan))",
    },
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
            <stop offset="0%" stopColor="rgb(var(--rgb-cyan))" stopOpacity="0.5" />
            <stop offset="33%" stopColor="rgb(var(--rgb-purple))" stopOpacity="0.5" />
            <stop offset="66%" stopColor="rgb(var(--rgb-green))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(var(--rgb-cyan))" stopOpacity="0.5" />
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
            <g key={stage.key}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={nodeFill}
                stroke={stage.color}
                strokeWidth="1.7"
                opacity="0.95"
              />
              <circle cx={cx} cy={cy} r={r - 4} fill={stage.color} opacity="0.22" />
              <circle cx={cx} cy={cy} r="2.4" fill={stage.color} opacity="1" />
              <text
                x={labelX}
                y={cy + 3.5}
                fontSize="10.5"
                fontFamily={isAr ? "inherit" : "ui-monospace, monospace"}
                fontWeight={isAr ? 600 : 400}
                fill={stage.color}
                opacity="1"
                letterSpacing={labelTracking}
                textAnchor="start"
                direction="ltr"
              >
                {stage.label}
              </text>
            </g>
          );
        })}

        {/* Traveling pulse — paused under reduced motion */}
        {!reduce && (
          <circle cx={cx} cy={cyStart} r="2.5" fill="rgb(var(--rgb-cyan))">
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
      <div
        className={`mt-2 md:mt-3 text-center text-[11px] font-mono text-foreground-secondary/75 ${isAr ? "tracking-normal" : "tracking-[0.22em]"}`}
      >
        {t.work.pipeline.title}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 2 — TechPath secondary feature: real roadmap proof + content
// ─────────────────────────────────────────────────────────────────────────
function TechPathFeature() {
  const { t } = useLanguage();
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
        className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-background-primary/45 t-warm-surface border transition-all duration-500"
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
          <div
            className="p-5 md:p-8 lg:border-r flex flex-col"
            style={{ borderColor: "var(--border-idle)" }}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div
                className="text-xs font-mono tracking-[0.22em]"
                style={{ color: `rgba(${a.rgb},0.85)` }}
              >
                {t.work.techpath.systemLabel}
              </div>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: `rgb(${a.rgb})`,
                  boxShadow: `0 0 8px rgba(${a.rgb},0.6)`,
                }}
              />
            </div>
            <SystemPreviewFrame
              src="/images/projects/techpath-roadmap.png"
              alt={t.work.techpath.roadmapAlt}
              width={3456}
              height={1740}
              label={t.work.frame.generatedRoadmap}
              domain={t.work.techpath.domain}
              rgb={a.rgb}
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>

          {/* Right: content */}
          <div className="p-5 md:p-8 flex flex-col space-y-3.5 md:space-y-5">
            <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em]">
              {t.work.techpath.category}
            </div>
            <div className="space-y-2">
              <h3
                className="text-2xl md:text-3xl font-bold"
                style={{ color: `rgb(${a.rgb})` }}
              >
                TechPath
              </h3>
              <p className="text-base md:text-lg text-foreground-secondary/85 leading-[1.38]">
                {t.work.techpath.tagline}
              </p>
            </div>
            <p className="text-sm md:text-base text-foreground-secondary/85 leading-[1.6] md:leading-[1.75]">
              {t.work.techpath.description}
            </p>
            <div>
              <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em] mb-2.5">
                {t.work.labels.techStack}
              </div>
              <TechChips
                tech={["React.js", "Tailwind CSS", "Claude API"]}
                rgb={a.rgb}
              />
            </div>

            {/* Footer — adaptive-route accent relates this panel to the
                generated roadmap, with the action docked at the base. */}
            <div className="mt-auto pt-5 space-y-4">
              {/* Adaptive learning roadmap — generated checkpoints with
                  progress, resources and daily follow-up (decorative). */}
              <div
                aria-hidden="true"
                className="rounded-xl border bg-background-primary/40 px-3 pt-2 pb-1.5 md:px-4 md:pt-2.5"
                style={{ borderColor: `rgba(${a.rgb},0.18)` }}
              >
                <TechPathConceptVisual rgb={a.rgb} />
              </div>
              <ActionLink
                href="https://github.com/AlbaraaAlnahari/TechPath"
                label={t.work.actions.viewRepository}
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
  const { isAr } = useLanguage();
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
        className="relative h-full flex flex-col rounded-2xl backdrop-blur-xl bg-background-primary/45 t-warm-surface border transition-all duration-500 p-5 md:p-7 space-y-3.5 md:space-y-5 overflow-hidden"
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
          <span
            className="text-[10px] font-mono tracking-[0.2em]"
            style={{ color: `rgba(${a.rgb},0.7)` }}
          >
            {systemLabel}
          </span>
          <div
            className="w-1 h-1 rounded-full"
            style={{
              background: `rgb(${a.rgb})`,
              boxShadow: `0 0 6px rgba(${a.rgb},0.5)`,
            }}
          />
        </div>

        <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.2em]">
          {category}
        </div>

        <div className="space-y-2 md:space-y-2.5">
          <h3
            className="text-xl md:text-2xl font-bold"
            style={{ color: `rgb(${a.rgb})` }}
          >
            {name}
          </h3>
          <p className="text-sm text-foreground-secondary/80 leading-[1.4]">
            {tagline}
          </p>
        </div>

        {/* Concept visualization — labeled interface abstraction */}
        <div
          className="rounded-xl border bg-background-primary/40 px-3.5 pt-2.5 pb-1.5 md:px-4 md:pt-3 md:pb-2"
          style={{ borderColor: "rgba(150,165,205,0.14)" }}
        >
          <div
            className={`text-[10px] font-mono mb-1 ${isAr ? "tracking-normal" : "tracking-[0.22em]"}`}
            style={{ color: `rgba(${a.rgb},0.82)` }}
          >
            {conceptLabel}
          </div>
          <div className="mx-auto max-w-[90%] sm:max-w-none">{visual}</div>
        </div>

        <p className="text-sm text-foreground-secondary/75 leading-[1.75] grow">
          {description}
        </p>

        <div
          className="border-t pt-3 space-y-3 md:pt-4 md:space-y-4"
          style={{ borderColor: "var(--border-idle)" }}
        >
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
