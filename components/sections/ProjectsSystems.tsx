"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

type Accent = "cyan" | "purple" | "green";

interface Project {
  id: string;
  systemLabel: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  recognition?: string;
  tech: string[];
  accent: Accent;
}

const flagship: Project = {
  id: "docupilot",
  systemLabel: "SYSTEM 01 / FLAGSHIP MODULE",
  category: "AI SAAS / BUSINESS OPERATIONS",
  name: "DocuPilot",
  tagline: "AI Business Operations Platform",
  description:
    "AI SaaS platform transforming business documents into structured workflows, approvals, and operational systems.",
  recognition: "1st Place — AI Innovation Bootcamp",
  tech: ["Next.js", "TypeScript", "Supabase", "Gemini API", "Qwen API", "Zod"],
  accent: "cyan",
};

const supporting: Project[] = [
  {
    id: "techpath",
    systemLabel: "SYSTEM 02 / LEARNING INTELLIGENCE",
    category: "AI EDUCATION / PERSONALIZATION",
    name: "TechPath",
    tagline: "AI Learning Roadmap Generator",
    description:
      "AI-powered roadmap generator with personalized learning timelines and adaptive educational systems.",
    tech: ["React.js", "Tailwind CSS", "Claude API"],
    accent: "purple",
  },
  {
    id: "sanadk",
    systemLabel: "SYSTEM 03 / INCLUSIVE DESIGN",
    category: "ACCESSIBILITY / INCLUSIVE DESIGN",
    name: "Sanadk Accessibility App",
    tagline: "Accessible Mobility Experience",
    description:
      "Accessibility-first mobile experience for visually impaired and wheelchair users.",
    tech: ["UX/UI", "Figma", "Accessibility Design"],
    accent: "green",
  },
  {
    id: "slidemind",
    systemLabel: "SYSTEM 04 / STUDY AUTOMATION",
    category: "AI LEARNING TOOLS",
    name: "Slide-Mind Flashcard Generator",
    tagline: "AI Study System",
    description: "AI-powered flashcard generation system with modular architecture.",
    tech: ["Java", "API Integration"],
    accent: "cyan",
  },
];

const accentTokens: Record<Accent, { text: string; textSoft: string; border: string; borderHover: string; rgb: string }> = {
  cyan: {
    text: "text-accent-cyan",
    textSoft: "text-accent-cyan/70",
    border: "border-accent-cyan/30",
    borderHover: "hover:border-accent-cyan/60",
    rgb: "0, 217, 255",
  },
  purple: {
    text: "text-accent-purple",
    textSoft: "text-accent-purple/70",
    border: "border-accent-purple/30",
    borderHover: "hover:border-accent-purple/60",
    rgb: "181, 55, 242",
  },
  green: {
    text: "text-accent-green",
    textSoft: "text-accent-green/70",
    border: "border-accent-green/30",
    borderHover: "hover:border-accent-green/60",
    rgb: "0, 255, 159",
  },
};

export function ProjectsSystems() {
  return (
    <section
      id="projects"
      className="py-14 md:py-20 relative scroll-mt-14 md:scroll-mt-16"
    >
      <Container>
        <div className="space-y-10 md:space-y-12">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
              Products designed to turn
              <br />
              <span className="text-accent-cyan">intelligence</span> into action.
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg max-w-2xl leading-relaxed">
              A selection of AI-enabled products, accessibility experiences, and software systems built to solve real problems.
            </p>
          </motion.div>

          {/* Flagship */}
          <FlagshipCard project={flagship} />

          {/* Supporting modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {supporting.map((project, index) => (
              <SupportingCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FlagshipCard({ project }: { project: Project }) {
  const a = accentTokens[project.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="relative group"
    >
      {/* Ambient hover glow */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(${a.rgb}, 0.16) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className={`relative rounded-2xl overflow-hidden backdrop-blur-xl bg-background-primary/45 border ${a.border} ${a.borderHover} transition-all duration-500`}
      >
        {/* Top accent trace */}
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${a.rgb}, 0.5), transparent)`,
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Left: content */}
          <div className="md:col-span-3 p-7 md:p-10 space-y-6">
            {/* System label + active status */}
            <div className="flex items-center justify-between gap-3">
              <div className={`text-xs font-mono ${a.textSoft} tracking-[0.22em]`}>
                {project.systemLabel}
              </div>
              <div
                className="w-1.5 h-1.5 rounded-full bg-accent-green/75"
                style={{ boxShadow: "0 0 8px rgba(0, 255, 159, 0.6)" }}
              />
            </div>

            {/* Category */}
            <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em]">
              {project.category}
            </div>

            {/* Title block */}
            <div className="space-y-2">
              <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${a.text}`}>
                {project.name}
              </h3>
              <p className="text-lg md:text-xl text-foreground-secondary/85">
                {project.tagline}
              </p>
            </div>

            {/* Recognition badge */}
            {project.recognition && (
              <div
                className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border ${a.border}`}
                style={{ backgroundColor: `rgba(${a.rgb}, 0.08)` }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                  style={{ boxShadow: "0 0 6px rgba(0, 217, 255, 0.7)" }}
                />
                <span className="text-xs text-accent-cyan font-medium tracking-wide">
                  {project.recognition}
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-foreground-secondary/90 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            <div>
              <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.22em] mb-3">
                TECHNOLOGY STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md bg-background-primary/55 border border-glass-light/30 text-xs text-foreground-secondary/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: abstract workflow diagram */}
          <div className="md:col-span-2 p-7 md:p-10 flex flex-col items-center justify-center bg-gradient-to-br from-accent-cyan/[0.04] via-accent-purple/[0.03] to-transparent border-t md:border-t-0 md:border-l border-glass-light/15">
            <WorkflowDiagram />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WorkflowDiagram() {
  const stages = [
    { label: "DOCUMENT INPUT", color: "rgb(0, 217, 255)" },
    { label: "AI EXTRACTION", color: "rgb(181, 55, 242)" },
    { label: "STRUCTURED WORKFLOW", color: "rgb(0, 255, 159)" },
    { label: "APPROVAL SYSTEM", color: "rgb(0, 217, 255)" },
  ];

  const cx = 28;
  const r = 14;
  const cySpacing = 70;
  const cyStart = 24;
  const labelX = cx + r + 12;

  return (
    <div className="w-full max-w-[280px] py-2">
      <svg
        viewBox="0 0 280 260"
        className="w-full h-auto"
        aria-hidden="true"
      >
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
              <circle
                cx={cx}
                cy={cy}
                r={r - 4}
                fill={stage.color}
                opacity="0.18"
              />
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

        {/* Traveling pulse */}
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
      </svg>
      <div className="mt-3 text-center text-[10px] font-mono text-foreground-secondary/55 tracking-[0.22em]">
        AI OPERATIONS PIPELINE
      </div>
    </div>
  );
}

function SupportingCard({ project, index }: { project: Project; index: number }) {
  const a = accentTokens[project.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: 0.25 + index * 0.08, ease: "easeOut" }}
      className="relative group h-full"
    >
      {/* Ambient hover glow */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(${a.rgb}, 0.14) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className={`relative h-full flex flex-col rounded-2xl backdrop-blur-xl bg-background-primary/45 border ${a.border} ${a.borderHover} transition-all duration-500 p-6 md:p-7 space-y-5 overflow-hidden`}
      >
        {/* Top accent trace */}
        <div
          className="absolute top-0 left-6 right-6 h-px pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${a.rgb}, 0.45), transparent)`,
          }}
          aria-hidden="true"
        />

        {/* System label + active dot */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] font-mono ${a.textSoft} tracking-[0.2em]`}>
            {project.systemLabel}
          </span>
          <div
            className="w-1 h-1 rounded-full bg-accent-green/65"
            style={{ boxShadow: "0 0 6px rgba(0, 255, 159, 0.5)" }}
          />
        </div>

        {/* Category */}
        <div className="text-[10px] font-mono text-accent-purple/55 tracking-[0.2em]">
          {project.category}
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h4
            className={`text-xl md:text-2xl font-bold ${a.text} transition-all`}
          >
            {project.name}
          </h4>
          <p className="text-sm text-foreground-secondary/80">{project.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-secondary/75 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Subtle accent */}
        <ProjectAccent type={project.id} rgb={a.rgb} />

        {/* Divider */}
        <div className="border-t border-glass-light/15" />

        {/* Tech */}
        <div>
          <div className={`text-[10px] font-mono ${a.textSoft} tracking-[0.2em] mb-2.5`}>
            TECH STACK
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-[11px] bg-background-primary/55 border border-glass-light/25 text-foreground-secondary/85"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectAccent({ type, rgb }: { type: string; rgb: string }) {
  if (type === "techpath") {
    // Subtle adaptive learning route
    return (
      <svg
        viewBox="0 0 200 36"
        className="w-full opacity-60"
        aria-hidden="true"
      >
        <path
          d="M 8 28 Q 50 6 90 20 T 170 16 L 192 12"
          stroke={`rgb(${rgb})`}
          strokeWidth="1"
          fill="none"
          opacity="0.55"
          strokeDasharray="2,3"
        />
        {[
          { x: 8, y: 28 },
          { x: 60, y: 14 },
          { x: 110, y: 20 },
          { x: 160, y: 17 },
          { x: 192, y: 12 },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2.5"
            fill={`rgb(${rgb})`}
            opacity="0.75"
          />
        ))}
      </svg>
    );
  }

  if (type === "sanadk") {
    // Subtle accessibility/touch reach indicator
    return (
      <svg
        viewBox="0 0 200 36"
        className="w-full opacity-60"
        aria-hidden="true"
      >
        <circle
          cx="22"
          cy="18"
          r="11"
          fill="none"
          stroke={`rgb(${rgb})`}
          strokeWidth="1"
          opacity="0.55"
        />
        <circle cx="22" cy="18" r="4" fill={`rgb(${rgb})`} opacity="0.55" />
        <line
          x1="42"
          y1="18"
          x2="158"
          y2="18"
          stroke={`rgb(${rgb})`}
          strokeWidth="1"
          opacity="0.4"
          strokeDasharray="3,3"
        />
        <rect
          x="162"
          y="9"
          width="26"
          height="18"
          rx="3"
          fill="none"
          stroke={`rgb(${rgb})`}
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="167"
          y1="14"
          x2="183"
          y2="14"
          stroke={`rgb(${rgb})`}
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="167"
          y1="18"
          x2="180"
          y2="18"
          stroke={`rgb(${rgb})`}
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="167"
          y1="22"
          x2="183"
          y2="22"
          stroke={`rgb(${rgb})`}
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    );
  }

  if (type === "slidemind") {
    // Stacked flashcards
    return (
      <svg
        viewBox="0 0 200 36"
        className="w-full opacity-60"
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={50 + i * 26}
            y={6 + i * 2}
            width="60"
            height="24"
            rx="3"
            fill={`rgb(${rgb})`}
            fillOpacity="0.05"
            stroke={`rgb(${rgb})`}
            strokeWidth="1"
            opacity={0.55 - i * 0.12}
          />
        ))}
        <line
          x1="58"
          y1="14"
          x2="100"
          y2="14"
          stroke={`rgb(${rgb})`}
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="58"
          y1="22"
          x2="92"
          y2="22"
          stroke={`rgb(${rgb})`}
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    );
  }

  return null;
}
