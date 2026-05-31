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
import { useThemeName } from "@/hooks/useThemeName";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

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

// Active-language skills dictionary slice (resolved from useLanguage inside the
// component). Keys mirror the structural ids/skill-names/project-keys below.
type SkillsDict = ReturnType<typeof useLanguage>["t"]["skills"];

// ── Applied-project evidence (verified; mirrors approved Projects) ──
// Structural only: code + the dictionary key that supplies title/relation.
const PROJECTS: Record<string, { code: string; key: keyof SkillsDict["projects"] }> = {
  docupilot: { code: "DOCUPILOT", key: "docupilot" },
  techpath: { code: "TECHPATH", key: "techpath" },
  slidemind: { code: "SLIDE-MIND", key: "slidemind" },
  sanadk: { code: "SANADK", key: "sanadk" },
};
const PROJECT_ORDER = ["docupilot", "techpath", "slidemind", "sanadk"];

function resolveProject(skills: SkillsDict, c: string): ProjectRef {
  const p = PROJECTS[c];
  const copy = skills.projects[p.key];
  return { code: p.code, title: copy.title, relation: copy.relation };
}

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

interface Domain {
  id: keyof SkillsDict["domains"];
  num: string;
  accent: string; // rgb triple
  skills: string[];
}

// Visual storytelling order; indices 01–06 match display order. Title/purpose
// copy resolve from the active-language dictionary by `id`.
const DOMAINS: Domain[] = [
  {
    id: "frameworks",
    num: "01",
    accent: "168, 130, 250",
    skills: ["React", "Next.js", "Tailwind CSS", "Flutter"],
  },
  {
    id: "data-ai",
    num: "02",
    accent: "16, 222, 170",
    skills: ["Pandas", "NumPy", "Data Analysis", "OpenCV", "AI APIs"],
  },
  {
    id: "programming",
    num: "03",
    accent: "96, 165, 250",
    skills: ["Python", "SQL", "MySQL", "Java", "C++"],
  },
  {
    id: "web",
    num: "04",
    accent: "34, 211, 238",
    skills: ["HTML", "CSS", "TypeScript", "JavaScript"],
  },
  {
    id: "tools",
    num: "05",
    accent: "148, 163, 184",
    skills: ["Git", "GitHub", "VS Code", "PyCharm", "Supabase", "Figma"],
  },
  {
    id: "professional",
    num: "06",
    accent: "232, 186, 132",
    skills: ["Analytical Thinking", "Communication", "Leadership"],
  },
];

// Telemetry metric values (structural); labels resolve from the dictionary.
const SUMMARY = [
  { value: "27", labelKey: "capabilities" },
  { value: "06", labelKey: "domains" },
  { value: "04", labelKey: "appliedSystems" },
] as const;

type Active = { type: "domain"; domainId: string } | { type: "skill"; domainId: string; skill: string };

function proofRefs(skills: SkillsDict, codes: string[]): ProjectRef[] {
  return PROJECT_ORDER.filter((c) => codes.includes(c)).map((c) => resolveProject(skills, c));
}

function sameActive(a: Active | null, b: Active | null): boolean {
  if (!a || !b || a.type !== b.type || a.domainId !== b.domainId) return false;
  if (a.type === "skill" && b.type === "skill") return a.skill === b.skill;
  return true;
}

function buildView(s: SkillsDict, active: Active | null): InspectorView {
  if (!active) return { kind: "standby" };
  const domain = DOMAINS.find((d) => d.id === active.domainId);
  if (!domain) return { kind: "standby" };
  const domainTitle = s.domains[domain.id].title;
  if (active.type === "skill") {
    return {
      kind: "skill",
      domainNum: domain.num,
      domainTitle,
      accent: domain.accent,
      label: active.skill,
      markName: active.skill,
      enables: s.enables[active.skill as keyof SkillsDict["enables"]] ?? "",
      projects: proofRefs(s, SKILL_PROOF[active.skill] ?? []),
    };
  }
  const codes = Array.from(new Set(domain.skills.flatMap((sk) => SKILL_PROOF[sk] ?? [])));
  return {
    kind: "domain",
    domainNum: domain.num,
    domainTitle,
    accent: domain.accent,
    purpose: s.domains[domain.id].purpose,
    capabilities: domain.skills,
    projects: proofRefs(s, codes),
  };
}

export function SkillsMatrix() {
  const { t, displayFont } = useLanguage();
  const s = t.skills;
  const reduce = useReducedMotion();
  const warm = useThemeName() === "warm";
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

  const view = useMemo(() => buildView(s, active), [s, active]);
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
            className="readability-field space-y-5"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="text-sm font-mono text-accent-cyan tracking-[0.22em]">
                {s.eyebrow}
              </div>
              <div className="text-xs font-mono text-accent-cyan/55 tracking-[0.22em]">
                {s.systemTag}
              </div>
            </div>
            <h2 id="skills-heading" className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] ${displayFont}`}>
              {s.title.lead}
              <br />
              <span className="text-accent-cyan">{s.title.emphasis}</span>
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg max-w-2xl leading-relaxed">
              {s.intro}
            </p>

            {/* Telemetry Command Rail — quiet graphite instrument panel */}
            <div
              className="t-surface-deep inline-flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-glass-light/12 sm:flex-row sm:items-stretch"
              style={{ background: "rgba(9, 13, 28, 0.6)" }}
            >
              {/* Leading label cell */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-b border-glass-light/12 sm:border-b-0 sm:border-r"
                style={{ background: "rgba(255,255,255,0.018)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent-cyan/70 shrink-0"
                  style={{ boxShadow: "0 0 6px rgba(var(--rgb-cyan),0.5)" }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[9px] tracking-[0.26em] text-foreground-secondary/55 whitespace-nowrap">
                  {s.telemetryLabel}
                </span>
              </div>
              {/* Metric cells */}
              <div className="grid grid-cols-3 flex-1">
                {SUMMARY.map((metric, i) => (
                  <div
                    key={metric.labelKey}
                    className={`flex flex-col justify-center px-3.5 py-2.5 ${i > 0 ? "border-l border-glass-light/10" : ""}`}
                  >
                    <span className="text-xl md:text-2xl font-bold text-accent-cyan leading-none tabular-nums">
                      {metric.value}
                    </span>
                    <span className="mt-1 font-mono text-[8px] md:text-[9px] leading-tight tracking-[0.12em] text-foreground-secondary/55">
                      {s.summary[metric.labelKey]}
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
                {s.mobilePrompt}
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
                  s={s}
                  active={active}
                  view={view}
                  rise={rise}
                  warm={warm}
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
              <CapabilityInspector view={view} variant="panel" warm={warm} />
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
  s,
  active,
  view,
  rise,
  warm,
  onPreview,
  onPreviewOff,
  onCommit,
}: {
  domain: Domain;
  s: SkillsDict;
  active: Active | null;
  view: InspectorView;
  rise: Variants;
  warm: boolean;
  onPreview: (a: Active) => void;
  onPreviewOff: () => void;
  onCommit: (a: Active) => void;
}) {
  const a = domain.accent;
  const inDomain = active?.domainId === domain.id;
  const domainHeaderActive = inDomain && active?.type === "domain";
  const domainActive: Active = { type: "domain", domainId: domain.id };
  const domainTitle = s.domains[domain.id].title;

  return (
    <motion.div
      variants={rise}
      className="relative rounded-2xl border bg-background-primary/35 backdrop-blur-md p-4 transition-colors duration-300"
      style={{
        borderColor: inDomain ? `rgba(${a},0.42)` : `rgba(${a},${warm ? 0.34 : 0.16})`,
        ...(warm
          ? {
              backgroundColor: "var(--surface)",
              boxShadow: "0 1px 2px rgba(8,15,35,0.05), 0 8px 20px -14px rgba(8,15,35,0.18)",
            }
          : {}),
      }}
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
          aria-label={s.aria.domain(domainTitle, domain.skills.length)}
          className="ie-focus w-full flex items-center justify-between gap-2 rounded-lg outline-none"
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <span
              className="grid place-items-center w-6 h-6 rounded-md border font-mono text-[10px] font-bold shrink-0 transition-colors duration-300"
              style={{
                borderColor: inDomain ? `rgba(${a},0.6)` : `rgba(${a},${warm ? 0.45 : 0.3})`,
                background: inDomain ? `rgba(${a},0.14)` : `rgba(${a},${warm ? 0.12 : 0.06})`,
                color: `rgba(${a},0.95)`,
              }}
            >
              {domain.num}
            </span>
            <span className="text-sm md:text-[15px] font-semibold text-foreground truncate">{domainTitle}</span>
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
                  ? s.aria.skillApplied(skill, domainTitle, codes.join(", "))
                  : s.aria.skill(skill, domainTitle)
              }
              className="ie-focus group/node inline-flex items-center gap-2 rounded-lg border pl-1.5 pr-2.5 py-1.5 outline-none transition-all duration-200"
              style={{
                borderColor: isActive ? `rgba(${a},0.65)` : `rgba(${a},${warm ? 0.38 : 0.2})`,
                background: isActive
                  ? `rgba(${a},${warm ? 0.14 : 0.1})`
                  : warm
                    ? "var(--surface-lit)"
                    : "rgba(255,255,255,0.015)",
                boxShadow: isActive ? `inset 0 0 14px rgba(${a},0.18)` : "none",
              }}
            >
              {/* mark container — local SVG mark, restrained at idle, vivid when active */}
              <span
                className="grid place-items-center w-6 h-6 rounded-md border shrink-0 transition-all duration-200"
                style={{
                  borderColor: isActive ? `rgba(${a},0.55)` : `rgba(${a},${warm ? 0.4 : 0.22})`,
                  background: isActive ? `rgba(${a},0.16)` : `rgba(${a},${warm ? 0.12 : 0.06})`,
                }}
              >
                <SkillMark name={skill} size={16} vivid={isActive} warm={warm} />
              </span>
              <span
                dir="ltr"
                className="ltr-isolate text-xs font-medium transition-colors duration-200"
                style={{ color: warm ? "#222a33" : isActive ? `rgb(${a})` : "rgba(200,210,230,0.85)" }}
              >
                {skill}
              </span>
              {/* applied-route micro-port (only when meaningful) */}
              {mapped && (
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full shrink-0 transition-all duration-200"
                  style={{
                    background: isActive ? `rgb(${a})` : `rgba(${a},${warm ? 0.75 : 0.5})`,
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
          <CapabilityInspector view={view} variant="inline" warm={warm} />
        </div>
      )}
    </motion.div>
  );
}
