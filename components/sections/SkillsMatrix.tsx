"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SkillMark } from "@/components/sections/skills/SkillMark";
import {
  CapabilityInspector,
  type InspectorView,
  type ProjectRef,
} from "@/components/sections/skills/CapabilityInspector";

// =====================================================
// SKILLS — CAPABILITY COMMAND MATRIX (educational console)
// Six résumé-grounded capability domains of marked skill nodes wired
// into an Applied Signal Console through a restrained routed bus. The
// console begins in STANDBY and, on hover/keyboard-focus (desktop) or
// tap (stacked layouts), explains what each capability ENABLES in plain
// language and traces truthful applied-project signals where verified.
// Distinct from the Hero turbine, Projects showcase, Experience spine,
// and Resume vault. Content is the sole-source-of-truth résumé stack —
// no levels, percentages, or invented evidence.
// =====================================================

const STEEL = "148, 163, 184";

// ── Applied-project evidence (verified; mirrors approved Projects) ──
const PROJECTS: Record<string, ProjectRef> = {
  docupilot: {
    code: "DOCUPILOT",
    title: "AI Business Operations Platform",
    relation:
      "Applied in an AI business-operations platform built around document workflows and intelligent operational interfaces.",
  },
  techpath: {
    code: "TECHPATH",
    title: "AI Learning Roadmap Generator",
    relation:
      "Applied in an AI learning-roadmap experience with personalized recommendations and interactive progress workflows.",
  },
  slidemind: {
    code: "SLIDE-MIND",
    title: "Modular Flashcard Generator",
    relation: "Applied in a modular flashcard-generation application using API integration.",
  },
  sanadk: {
    code: "SANADK",
    title: "Accessibility UX Case",
    relation: "Applied in accessibility-focused research and mobile prototype design.",
  },
};
const PROJECT_ORDER = ["docupilot", "techpath", "slidemind", "sanadk"];

// Skill → verified project routes (only where evidence exists; approved set)
const SKILL_PROOF: Record<string, string[]> = {
  "Next.js": ["docupilot"],
  TypeScript: ["docupilot"],
  Supabase: ["docupilot"],
  "Tailwind CSS": ["docupilot", "techpath"],
  "AI APIs": ["docupilot", "techpath", "slidemind"],
  React: ["techpath"],
  JavaScript: ["techpath"],
  Java: ["slidemind"],
  Figma: ["sanadk"],
  "Data Analysis": ["sanadk"],
};

// Plain-language "what this enables" for every capability (non-technical)
const ENABLES: Record<string, string> = {
  React: "Builds interactive interfaces that update smoothly as people use a product.",
  "Next.js":
    "A framework for building fast web applications with structured pages, server features, and production-ready delivery.",
  "Tailwind CSS": "A styling toolkit used to craft consistent, responsive interfaces efficiently.",
  Flutter: "A framework for building mobile application interfaces from a shared codebase.",
  Pandas: "Organizes and analyzes tabular data so patterns and decisions become easier to extract.",
  NumPy: "Handles numerical data and calculations efficiently for technical and analytical workflows.",
  "Data Analysis": "Turns collected information into usable findings that support better product decisions.",
  OpenCV: "Processes visual input such as images or camera frames for computer-vision experiences.",
  "AI APIs": "Connects products to AI capabilities such as generation, classification, or intelligent assistance.",
  Python: "A versatile language widely used for AI, automation, data work, and backend logic.",
  SQL: "Retrieves and organizes structured information stored in databases.",
  MySQL: "A database system used to store and manage application data reliably.",
  Java: "A strongly structured language used to build modular applications and logic-driven systems.",
  "C++": "A performance-oriented language often used where efficient control and technical computing matter.",
  HTML: "Defines the structure and meaningful content of a web page.",
  CSS: "Controls visual styling, layout, spacing, and responsive presentation on the web.",
  TypeScript: "Adds safer structure to JavaScript projects, helping larger applications stay reliable and maintainable.",
  JavaScript: "Powers interactive behavior in web experiences, from user actions to dynamic interface updates.",
  Git: "Tracks changes in code so development work can evolve safely and be reviewed over time.",
  GitHub: "Hosts code repositories and supports collaboration, review, and project delivery.",
  "VS Code": "A development environment used to write, inspect, and organize software projects.",
  PyCharm: "A development environment specialized for building and managing Python-based projects.",
  Supabase: "Provides backend services such as databases and application data access for modern products.",
  Figma: "Supports interface design, prototyping, and collaborative product thinking before implementation.",
  "Analytical Thinking": "Breaks complex problems into evidence-based decisions and practical next steps.",
  Communication: "Translates ideas, findings, and product decisions clearly across users and teams.",
  Leadership: "Coordinates people and direction to move work from idea toward meaningful outcome.",
};

interface Domain {
  id: string;
  num: string;
  title: string;
  accent: string; // rgb triple
  purpose: string;
  skills: string[];
}

// Visual storytelling order; indices 01–06 match display order.
const DOMAINS: Domain[] = [
  {
    id: "frameworks",
    num: "01",
    title: "Frameworks & Libraries",
    accent: "168, 130, 250",
    purpose: "Reusable building systems that speed up the creation of polished web and mobile products.",
    skills: ["React", "Next.js", "Tailwind CSS", "Flutter"],
  },
  {
    id: "data-ai",
    num: "02",
    title: "Data & AI",
    accent: "16, 222, 170",
    purpose: "Methods and tools for understanding information, processing visual input, and enabling intelligent product behavior.",
    skills: ["Pandas", "NumPy", "Data Analysis", "OpenCV", "AI APIs"],
  },
  {
    id: "programming",
    num: "03",
    title: "Programming",
    accent: "96, 165, 250",
    purpose: "Core languages used to express logic, automate work, and build software systems.",
    skills: ["Python", "SQL", "MySQL", "Java", "C++"],
  },
  {
    id: "web",
    num: "04",
    title: "Web",
    accent: "34, 211, 238",
    purpose: "The technologies that structure, style, and activate modern browser experiences.",
    skills: ["HTML", "CSS", "TypeScript", "JavaScript"],
  },
  {
    id: "tools",
    num: "05",
    title: "Tools",
    accent: "148, 163, 184",
    purpose: "Platforms and environments that support design, development, data, and collaboration.",
    skills: ["Git", "GitHub", "VS Code", "PyCharm", "Supabase", "Figma"],
  },
  {
    id: "professional",
    num: "06",
    title: "Professional Systems",
    accent: "232, 186, 132",
    purpose: "Human capabilities that guide research, communication, and execution across technical work.",
    skills: ["Analytical Thinking", "Communication", "Leadership"],
  },
];

const SUMMARY = [
  { value: "27", label: "DOCUMENTED CAPABILITIES" },
  { value: "06", label: "CAPABILITY DOMAINS" },
  { value: "04", label: "APPLIED PROJECT SYSTEMS" },
];

type Active = { type: "domain"; domainId: string } | { type: "skill"; domainId: string; skill: string };

function proofRefs(codes: string[]): ProjectRef[] {
  return PROJECT_ORDER.filter((c) => codes.includes(c)).map((c) => PROJECTS[c]);
}

function sameActive(a: Active | null, b: Active | null): boolean {
  if (!a || !b || a.type !== b.type || a.domainId !== b.domainId) return false;
  if (a.type === "skill" && b.type === "skill") return a.skill === b.skill;
  return true;
}

function buildView(active: Active | null): InspectorView {
  if (!active) return { kind: "standby" };
  const domain = DOMAINS.find((d) => d.id === active.domainId);
  if (!domain) return { kind: "standby" };
  if (active.type === "skill") {
    return {
      kind: "skill",
      domainNum: domain.num,
      domainTitle: domain.title,
      accent: domain.accent,
      label: active.skill,
      markName: active.skill,
      enables: ENABLES[active.skill] ?? "",
      projects: proofRefs(SKILL_PROOF[active.skill] ?? []),
    };
  }
  const codes = Array.from(new Set(domain.skills.flatMap((s) => SKILL_PROOF[s] ?? [])));
  return {
    kind: "domain",
    domainNum: domain.num,
    domainTitle: domain.title,
    accent: domain.accent,
    purpose: domain.purpose,
    capabilities: domain.skills,
    projects: proofRefs(codes),
  };
}

export function SkillsMatrix() {
  const reduce = useReducedMotion();
  // Two-tier selection model so touch taps persist reliably:
  //   committed = click / tap / Enter-Space (sticky, toggles)
  //   preview   = mouse-hover / keyboard-focus (transient)
  // Rendered priority: committed first, then transient preview, then standby.
  // Transient exits (pointerleave/blur) never clear a committed selection,
  // which is what previously caused the mobile tap-collapse.
  const [committed, setCommitted] = useState<Active | null>(null);
  const [preview, setPreview] = useState<Active | null>(null);
  const active = committed ?? preview;

  const previewOn = (a: Active) => setPreview(a);
  const previewOff = () => setPreview(null);
  const commitToggle = (a: Active) => {
    setPreview(null);
    setCommitted((cur) => (sameActive(cur, a) ? null : a));
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] } },
  };
  const grid: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
  };

  const view = useMemo(() => buildView(active), [active]);
  const activeAccent = view.kind === "standby" ? STEEL : view.accent;

  return (
    <section
      id="skills"
      className="py-16 md:py-24 relative scroll-mt-14 md:scroll-mt-16"
      aria-labelledby="skills-heading"
    >
      <Container>
        <div className="space-y-8 md:space-y-10">
          {/* Intro */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={rise}
            className="space-y-5"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="text-sm font-mono text-accent-cyan tracking-[0.22em]">
                CAPABILITY MATRIX / APPLIED ENGINEERING STACK
              </div>
              <div className="text-xs font-mono text-accent-cyan/55 tracking-[0.22em]">
                06 / CAPABILITY SYSTEM
              </div>
            </div>
            <h2 id="skills-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
              A technical stack built for
              <br />
              <span className="text-accent-cyan">intelligent products.</span>
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg max-w-2xl leading-relaxed">
              Capabilities applied across shipped systems, AI workflows, robotics work, and
              user-centered product design. Explore any capability to see what it enables.
            </p>

            {/* Telemetry Command Rail — quiet graphite instrument panel */}
            <div
              className="inline-flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-glass-light/12 sm:flex-row sm:items-stretch"
              style={{ background: "rgba(9, 13, 28, 0.6)" }}
            >
              {/* Leading label cell */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-b border-glass-light/12 sm:border-b-0 sm:border-r"
                style={{ background: "rgba(255,255,255,0.018)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent-cyan/70 shrink-0"
                  style={{ boxShadow: "0 0 6px rgba(0,217,255,0.5)" }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[9px] tracking-[0.26em] text-foreground-secondary/55 whitespace-nowrap">
                  STACK TELEMETRY
                </span>
              </div>
              {/* Metric cells */}
              <div className="grid grid-cols-3 flex-1">
                {SUMMARY.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col justify-center px-3.5 py-2.5 ${i > 0 ? "border-l border-glass-light/10" : ""}`}
                  >
                    <span className="text-xl md:text-2xl font-bold text-accent-cyan leading-none tabular-nums">
                      {s.value}
                    </span>
                    <span className="mt-1 font-mono text-[8px] md:text-[9px] leading-tight tracking-[0.12em] text-foreground-secondary/55">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mobile/stacked standby prompt (no selection yet) */}
          {!active && (
            <div className="lg:hidden flex items-center gap-2.5 rounded-xl border border-glass-light/20 bg-background-primary/30 px-3.5 py-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground-secondary/40" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.16em] text-foreground-secondary/55">
                SELECT A CAPABILITY · See what it enables and where it appears
              </span>
            </div>
          )}

          {/* Capability Atlas: matrix · routed bus · console */}
          <div className="grid lg:grid-cols-[minmax(0,1.55fr)_46px_minmax(0,1fr)] gap-y-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={grid}
              className="grid sm:grid-cols-2 gap-4 content-start"
            >
              {DOMAINS.map((d) => (
                <DomainModule
                  key={d.id}
                  domain={d}
                  active={active}
                  view={view}
                  rise={rise}
                  onPreview={previewOn}
                  onPreviewOff={previewOff}
                  onCommit={commitToggle}
                />
              ))}
            </motion.div>

            {/* Routed signal bus (desktop only) */}
            <div className="hidden lg:block relative" aria-hidden="true">
              <span
                className="absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 transition-all duration-300"
                style={{
                  background: active
                    ? `linear-gradient(to bottom, transparent, rgba(${activeAccent},0.5), transparent)`
                    : `linear-gradient(to bottom, transparent, rgba(${STEEL},0.18), transparent)`,
                }}
              />
              <span
                className="absolute left-0 top-1/2 w-1/2 h-px -translate-y-1/2 transition-all duration-300"
                style={{ background: active ? `rgba(${activeAccent},0.5)` : `rgba(${STEEL},0.18)` }}
              />
              <span
                className="absolute right-0 top-1/2 w-1/2 h-px -translate-y-1/2 transition-all duration-300"
                style={{ background: active ? `rgba(${activeAccent},0.5)` : `rgba(${STEEL},0.18)` }}
              />
              <span
                className="absolute left-1/2 top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] border transition-all duration-300"
                style={{
                  borderColor: active ? `rgb(${activeAccent})` : `rgba(${STEEL},0.4)`,
                  background: active ? `rgba(${activeAccent},0.18)` : "transparent",
                  boxShadow: active ? `0 0 10px rgba(${activeAccent},0.5)` : "none",
                }}
              />
            </div>

            {/* Applied Signal Console (desktop) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={rise}
              className="hidden lg:block lg:sticky lg:top-24 self-start"
            >
              <CapabilityInspector view={view} variant="panel" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Domain module — header port + visible skill nodes + (stacked) inline console
// ─────────────────────────────────────────────────────────────────────────
function DomainModule({
  domain,
  active,
  view,
  rise,
  onPreview,
  onPreviewOff,
  onCommit,
}: {
  domain: Domain;
  active: Active | null;
  view: InspectorView;
  rise: Variants;
  onPreview: (a: Active) => void;
  onPreviewOff: () => void;
  onCommit: (a: Active) => void;
}) {
  const a = domain.accent;
  const inDomain = active?.domainId === domain.id;
  const domainHeaderActive = inDomain && active?.type === "domain";
  const domainActive: Active = { type: "domain", domainId: domain.id };

  return (
    <motion.div
      variants={rise}
      className="relative rounded-2xl border bg-background-primary/35 backdrop-blur-md p-4 transition-colors duration-300"
      style={{ borderColor: inDomain ? `rgba(${a},0.42)` : `rgba(${a},0.16)` }}
    >
      {/* Domain header (activates the domain) */}
      <h3>
        <button
          type="button"
          onPointerEnter={(e) => { if (e.pointerType === "mouse") onPreview(domainActive); }}
          onPointerLeave={(e) => { if (e.pointerType === "mouse") onPreviewOff(); }}
          onFocus={() => onPreview(domainActive)}
          onBlur={onPreviewOff}
          onClick={() => onCommit(domainActive)}
          aria-label={`${domain.title} domain, ${domain.skills.length} capabilities`}
          className="ie-focus w-full flex items-center justify-between gap-2 rounded-lg outline-none"
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <span
              className="grid place-items-center w-6 h-6 rounded-md border font-mono text-[10px] font-bold shrink-0 transition-colors duration-300"
              style={{
                borderColor: inDomain ? `rgba(${a},0.6)` : `rgba(${a},0.3)`,
                background: inDomain ? `rgba(${a},0.14)` : `rgba(${a},0.06)`,
                color: `rgba(${a},0.95)`,
              }}
            >
              {domain.num}
            </span>
            <span className="text-sm md:text-[15px] font-semibold text-foreground truncate">{domain.title}</span>
          </span>
          {/* output terminal port */}
          <span
            aria-hidden="true"
            className="shrink-0 grid place-items-center w-4 h-4 rounded-full border transition-all duration-300"
            style={{
              borderColor: domainHeaderActive ? `rgb(${a})` : `rgba(${a},0.4)`,
              boxShadow: domainHeaderActive ? `0 0 9px rgba(${a},0.6)` : "none",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: inDomain ? `rgb(${a})` : `rgba(${a},0.45)` }}
            />
          </span>
        </button>
      </h3>

      {/* Skill nodes — all visible without interaction */}
      <div className="mt-3 flex flex-wrap gap-2">
        {domain.skills.map((skill) => {
          const codes = (SKILL_PROOF[skill] ?? []).map((c) => PROJECTS[c].code);
          const mapped = codes.length > 0;
          const isActive = active?.type === "skill" && active.skill === skill && active.domainId === domain.id;
          const skillActive: Active = { type: "skill", domainId: domain.id, skill };
          return (
            <button
              key={skill}
              type="button"
              onPointerEnter={(e) => { if (e.pointerType === "mouse") onPreview(skillActive); }}
              onPointerLeave={(e) => { if (e.pointerType === "mouse") onPreviewOff(); }}
              onFocus={() => onPreview(skillActive)}
              onBlur={onPreviewOff}
              onClick={() => onCommit(skillActive)}
              aria-label={
                mapped
                  ? `${skill}, ${domain.title} capability, applied in ${codes.join(", ")}`
                  : `${skill}, ${domain.title} capability`
              }
              className="ie-focus group/node inline-flex items-center gap-2 rounded-lg border pl-1.5 pr-2.5 py-1.5 outline-none transition-all duration-200"
              style={{
                borderColor: isActive ? `rgba(${a},0.65)` : `rgba(${a},0.2)`,
                background: isActive ? `rgba(${a},0.1)` : "rgba(255,255,255,0.015)",
                boxShadow: isActive ? `inset 0 0 14px rgba(${a},0.18)` : "none",
              }}
            >
              {/* mark container — local SVG mark, restrained at idle, vivid when active */}
              <span
                className="grid place-items-center w-6 h-6 rounded-md border shrink-0 transition-all duration-200"
                style={{
                  borderColor: isActive ? `rgba(${a},0.55)` : `rgba(${a},0.22)`,
                  background: isActive ? `rgba(${a},0.16)` : `rgba(${a},0.06)`,
                }}
              >
                <SkillMark name={skill} size={16} vivid={isActive} />
              </span>
              <span
                className="text-xs font-medium transition-colors duration-200"
                style={{ color: isActive ? `rgb(${a})` : "rgba(200,210,230,0.85)" }}
              >
                {skill}
              </span>
              {/* applied-route micro-port (only when meaningful) */}
              {mapped && (
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full shrink-0 transition-all duration-200"
                  style={{
                    background: isActive ? `rgb(${a})` : `rgba(${a},0.5)`,
                    boxShadow: isActive ? `0 0 6px rgba(${a},0.7)` : "none",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Inline console (stacked layouts only) — docked under the active domain */}
      {inDomain && (
        <div className="lg:hidden mt-3">
          <div className="flex justify-end pr-2" aria-hidden="true">
            <span className="h-3 w-px" style={{ background: `linear-gradient(to bottom, rgb(${a}), rgba(${a},0.2))` }} />
          </div>
          <CapabilityInspector view={view} variant="inline" />
        </div>
      )}
    </motion.div>
  );
}
