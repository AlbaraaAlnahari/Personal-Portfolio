"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// =====================================================
// ORGANIZATIONS & LEADERSHIP — LEADERSHIP MISSION CONTROL /
// COMMUNITY IMPACT COMMAND
//
// A command surface for live leadership responsibility and deployed
// community impact — not a card grid, timeline, inspector, or auth vault.
// A current command appointment (Tuwaiq) sits atop a routed command bus
// that drops into the dominant FLAGSHIP DEPLOYMENT chamber (GDGoC — the
// largest documented scale) and branches into two COMMUNITY OPERATIONS
// signals (PreHack, Drone Club). The command lineage shares one cyan
// trace (COMMAND → DEPLOYMENT); the community signals diverge into green
// and purple. Each record illuminates its routed edge + dock port on
// hover / keyboard-focus — interaction-triggered only, no continuous
// animation. All figures are verified; metrics are never aggregated.
// Layout is structured to receive organization logos / documentary
// imagery later without reconstruction.
// =====================================================

const CMD = "var(--rgb-cyan)"; // command lineage (cyan): command → deployment

// Operations metric ids — pair stable metric keys (text from t) with the
// verified numeric values (never translated).
type OpsId = "prehack" | "droneclub";
interface OpsRecord {
  id: OpsId;
  rgb: string;
  coord: string; // dock-port signal coordinate
  metricValues: { key: string; value: string }[];
}

// Largest documented deployment — the dominant quantified anchor.
// Only non-text structural fields live here; all copy reads from t.
const FLAGSHIP = {
  rgb: CMD,
  coord: "DEP·01",
  metricValues: {
    participants: "5,000+",
    events: "10+",
  },
};

// Two supporting community-building operations. Metrics stay separate —
// audiences overlap, so they are never summed into a total.
const OPERATIONS: OpsRecord[] = [
  {
    id: "prehack",
    rgb: "var(--rgb-green)",
    coord: "OPS·01",
    metricValues: [
      { key: "hackwave", value: "450+" },
      { key: "sessions", value: "200+" },
      { key: "bootcamp", value: "150+" },
    ],
  },
  {
    id: "droneclub",
    rgb: "var(--rgb-purple)",
    coord: "OPS·02",
    metricValues: [
      { key: "committees", value: "5" },
      { key: "members", value: "65+" },
      { key: "workshops", value: "3+" },
    ],
  },
];

export function OrganizationsLeadership() {
  const reduce = useReducedMotion();
  const { t, displayFont } = useLanguage();
  const L = t.impact.leadership;

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
      id="leadership"
      className="py-16 md:py-24 relative scroll-mt-14 md:scroll-mt-16"
      aria-labelledby="leadership-heading"
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
                {L.eyebrow}
              </div>
              <div className="text-xs font-mono text-accent-cyan/55 tracking-[0.22em]">
                {L.recordsLabel}
              </div>
            </div>
            <h2
              id="leadership-heading"
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] max-w-4xl ${displayFont}`}
            >
              {L.headingBefore}{" "}
              <span className="text-accent-cyan">{L.headingAccent}</span>
              {L.headingAfter}
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg max-w-2xl leading-relaxed">
              {L.intro}
            </p>
          </motion.div>

          {/* Command surface */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={list}
            className="relative"
          >
            {/* faint operating-plane backdrop (decorative) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(148,163,184,0.12) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                opacity: 0.5,
                maskImage:
                  "radial-gradient(ellipse at 28% 0%, black, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 28% 0%, black, transparent 72%)",
              }}
            />

            {/* A · CURRENT COMMAND */}
            <motion.div variants={rise} className="relative">
              <CurrentCommandBar />
            </motion.div>

            {/* command bus drop into the deployment plane (desktop only) */}
            <motion.div
              variants={rise}
              aria-hidden="true"
              className="relative hidden lg:flex flex-col items-center w-10 ml-7 py-1"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: `rgb(${CMD})`,
                  boxShadow: `0 0 6px rgba(${CMD},0.6)`,
                }}
              />
              <span
                className="w-px h-5"
                style={{
                  background: `linear-gradient(to bottom, rgba(${CMD},0.55), rgba(${CMD},0.12))`,
                }}
              />
              <span
                className="w-2 h-2 rotate-45 border"
                style={{
                  borderColor: `rgba(${CMD},0.5)`,
                  background: `rgba(${CMD},0.1)`,
                }}
              />
            </motion.div>

            {/* B + C · deployment plane */}
            <motion.div
              variants={rise}
              className="relative mt-5 lg:mt-1 grid grid-cols-1 lg:grid-cols-12 gap-5"
            >
              {/* B · FLAGSHIP DEPLOYMENT — dominant anchor */}
              <div className="lg:col-span-7">
                <FlagshipChamber />
              </div>

              {/* C · COMMUNITY OPERATIONS — two branching signals */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {OPERATIONS.map((op) => (
                  <CommunityRecord key={op.id} data={op} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// A · CURRENT COMMAND — live leadership identity (no metrics, no date)
// ─────────────────────────────────────────────────────────────────────────
function CurrentCommandBar() {
  const [active, setActive] = useState(false);
  const rgb = CMD;
  const { t } = useLanguage();
  const L = t.impact.leadership;
  const TUWAIQ = L.tuwaiq;

  return (
    <article
      tabIndex={0}
      aria-label={L.currentAria(TUWAIQ.role, TUWAIQ.org)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="ie-focus relative overflow-hidden rounded-2xl border bg-background-primary/45 t-warm-surface backdrop-blur-md px-5 py-4 md:px-6 md:py-5 outline-none transition-all duration-300"
      style={{
        borderColor: active ? `rgba(${rgb},0.5)` : `rgba(${rgb},0.26)`,
        boxShadow: active
          ? `0 14px 40px rgba(0,0,0,0.4), 0 0 26px rgba(${rgb},0.1)`
          : "none",
      }}
    >
      {/* left edge accent — command bus origin */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full transition-all duration-300"
        style={{
          background: active
            ? `linear-gradient(to bottom, rgba(${rgb},0.95), rgba(${rgb},0.35))`
            : `linear-gradient(to bottom, rgba(${rgb},0.6), rgba(${rgb},0.15))`,
        }}
      />
      {/* ambient sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-10 w-56 h-40 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(${rgb},0.10), transparent 70%)`,
          opacity: active ? 1 : 0.5,
        }}
      />

      <div className="relative flex flex-col md:flex-row md:flex-wrap md:items-center gap-y-3 md:gap-x-6">
        {/* command core + label */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid place-items-center w-9 h-9 rounded-xl border"
            style={{
              borderColor: `rgba(${rgb},0.55)`,
              background: `rgba(${rgb},0.12)`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: `rgb(${rgb})`,
                boxShadow: `0 0 8px rgba(${rgb},0.8)`,
              }}
            />
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.26em]"
            style={{ color: `rgba(${rgb},0.85)` }}
          >
            {L.currentCommand}
          </span>
        </div>

        {/* identity */}
        <div className="min-w-0 md:flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <h3
              dir="ltr"
              className="ltr-isolate text-2xl md:text-3xl font-bold text-foreground leading-tight"
            >
              {TUWAIQ.org}
            </h3>
            <span
              className="text-sm md:text-base font-semibold"
              style={{ color: `rgb(${rgb})` }}
            >
              {TUWAIQ.role}
            </span>
          </div>
        </div>

        {/* status pill — appointment only, never "verified/live since/date" */}
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-[10px] tracking-[0.2em] shrink-0 self-start md:self-auto"
          style={{
            borderColor: `rgba(${rgb},0.4)`,
            color: `rgba(${rgb},0.9)`,
            background: `rgba(${rgb},0.08)`,
          }}
        >
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: `rgb(${rgb})`,
              boxShadow: `0 0 6px rgba(${rgb},0.7)`,
            }}
          />
          {L.currentAppointment}
        </span>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// B · FLAGSHIP DEPLOYMENT — dominant quantified record (the wow anchor)
// ─────────────────────────────────────────────────────────────────────────
function FlagshipChamber() {
  const [active, setActive] = useState(false);
  const { t } = useLanguage();
  const F = t.impact.leadership.flagship;
  const { rgb, coord, metricValues } = FLAGSHIP;
  const { channel, org, shorthand, role, initiative, narrative } = F;

  return (
    <article
      tabIndex={0}
      aria-label={F.aria(role, org, initiative)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="ie-focus relative h-full overflow-hidden rounded-2xl border bg-background-primary/45 t-warm-surface backdrop-blur-md p-5 md:p-6 lg:p-7 outline-none transition-all duration-300"
      style={{
        borderColor: active ? `rgba(${rgb},0.5)` : `rgba(${rgb},0.28)`,
        boxShadow: active
          ? `0 18px 50px rgba(0,0,0,0.45), 0 0 34px rgba(${rgb},0.12)`
          : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      {/* focal corner glow — the section's anchor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(${rgb},0.16), transparent 70%)`,
          opacity: active ? 1 : 0.7,
        }}
      />
      {/* left edge accent — primary command trace */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full transition-all duration-300"
        style={{
          background: active
            ? `linear-gradient(to bottom, rgba(${rgb},0.95), rgba(${rgb},0.35))`
            : `linear-gradient(to bottom, rgba(${rgb},0.65), rgba(${rgb},0.18))`,
        }}
      />

      <div className="relative">
        {/* channel + dock coordinate */}
        <div className="flex items-start justify-between gap-3">
          <span
            className="font-mono text-[10px] md:text-[11px] tracking-[0.22em]"
            style={{ color: `rgb(${rgb})` }}
          >
            {channel}
          </span>
          <DockPort rgb={rgb} coord={coord} active={active} />
        </div>

        {/* organization + role (Project Management Lead is primary) */}
        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3
              dir="ltr"
              className="ltr-isolate text-2xl md:text-3xl font-bold text-foreground leading-[1.12]"
            >
              {org}
            </h3>
            <span
              dir="ltr"
              className="ltr-isolate px-2 py-0.5 rounded-md border font-mono text-[10px] tracking-wide shrink-0"
              style={{
                borderColor: `rgba(${rgb},0.35)`,
                color: `rgba(${rgb},0.9)`,
                background: `rgba(${rgb},0.08)`,
              }}
            >
              {shorthand}
            </span>
          </div>
          <div
            className="text-base md:text-lg font-semibold"
            style={{ color: `rgb(${rgb})` }}
          >
            {role}
          </div>
        </div>

        {/* initiative strip */}
        <div
          className="mt-4 flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5"
          style={{
            borderColor: `rgba(${rgb},0.2)`,
            background: `rgba(${rgb},0.05)`,
          }}
        >
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: `rgb(${rgb})` }}
          />
          <span className="font-mono text-[11px] tracking-[0.1em] text-foreground-secondary/85">
            {initiative}
          </span>
        </div>

        {/* HUGE quantified readout — dominant by documented scale.
            Side-by-side from 380px up; stacks on the narrowest phones so
            the 5,000+ anchor is never clipped. */}
        <div className="mt-5 grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 md:gap-4">
          <BigMetric
            rgb={rgb}
            value={metricValues.participants}
            label={F.metrics.participants}
            emphasize
          />
          <BigMetric rgb={rgb} value={metricValues.events} label={F.metrics.events} />
        </div>

        {/* narrative */}
        <p className="mt-5 text-sm md:text-[15px] text-foreground-secondary/80 leading-relaxed">
          {narrative}
        </p>

        {/* leadership tag */}
        <div
          className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t"
          style={{ borderColor: `rgba(${rgb},0.14)` }}
        >
          <span
            className="px-2.5 py-1 rounded text-[11px] bg-background-primary/55 border text-foreground-secondary/85"
            style={{ borderColor: `rgba(${rgb},0.18)` }}
          >
            {F.tag}
          </span>
        </div>
      </div>
    </article>
  );
}

function BigMetric({
  rgb,
  value,
  label,
  emphasize = false,
}: {
  rgb: string;
  value: string;
  label: string;
  emphasize?: boolean;
}) {
  return (
    <div
      className="relative rounded-xl border bg-background-primary/40 px-4 py-3.5 md:py-4 overflow-hidden"
      style={{ borderColor: `rgba(${rgb},${emphasize ? 0.3 : 0.18})` }}
    >
      {emphasize && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-6 w-28 h-28 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, rgba(${rgb},0.14), transparent 70%)`,
          }}
        />
      )}
      <div
        className={`relative font-bold leading-none tracking-tight tabular-nums ${
          emphasize
            ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            : "text-2xl sm:text-3xl md:text-4xl"
        }`}
        style={{ color: `rgb(${rgb})` }}
      >
        {value}
      </div>
      <div className="relative mt-2 font-mono text-[9px] md:text-[10px] tracking-[0.18em] text-foreground-secondary/60">
        {label}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// C · COMMUNITY OPERATIONS — supporting community-building signal
// ─────────────────────────────────────────────────────────────────────────
function CommunityRecord({ data }: { data: OpsRecord }) {
  const [active, setActive] = useState(false);
  const { t } = useLanguage();
  const O = t.impact.leadership.operations[data.id];
  const { rgb, coord, metricValues } = data;
  const { channel, org, role, period, narrative } = O;

  return (
    <article
      tabIndex={0}
      aria-label={`${channel}: ${role}, ${org}, ${period}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="ie-focus relative h-full overflow-hidden rounded-2xl border bg-background-primary/40 t-warm-surface backdrop-blur-md p-5 outline-none transition-all duration-300"
      style={{
        borderColor: active ? `rgba(${rgb},0.45)` : `rgba(${rgb},0.22)`,
        boxShadow: active
          ? `0 14px 38px rgba(0,0,0,0.4), 0 0 24px rgba(${rgb},0.1)`
          : "none",
      }}
    >
      {/* left edge accent — branched community signal */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full transition-all duration-300"
        style={{
          background: active
            ? `linear-gradient(to bottom, rgba(${rgb},0.9), rgba(${rgb},0.3))`
            : `linear-gradient(to bottom, rgba(${rgb},0.55), rgba(${rgb},0.14))`,
        }}
      />

      {/* channel + dock coordinate */}
      <div className="flex items-start justify-between gap-3">
        <span
          className="font-mono text-[10px] tracking-[0.2em]"
          style={{ color: `rgba(${rgb},0.85)` }}
        >
          {channel}
        </span>
        <DockPort rgb={rgb} coord={coord} active={active} />
      </div>

      {/* organization + role + period */}
      <div className="mt-3">
        <h3
          dir="ltr"
          className="ltr-isolate text-lg md:text-xl font-bold text-foreground leading-tight"
        >
          {org}
        </h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <span className="text-sm font-semibold" style={{ color: `rgb(${rgb})` }}>
            {role}
          </span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-foreground-secondary/50">
            {period}
          </span>
        </div>
      </div>

      {/* three separate signals — never aggregated into one total */}
      <div className="mt-3.5 grid grid-cols-3 gap-2">
        {metricValues.map((m) => (
          <div
            key={m.key}
            className="rounded-lg border bg-background-primary/40 px-2.5 py-2"
            style={{ borderColor: `rgba(${rgb},0.15)` }}
          >
            <div
              className="text-lg md:text-xl font-bold leading-none tabular-nums"
              style={{ color: `rgb(${rgb})` }}
            >
              {m.value}
            </div>
            <div className="mt-1.5 text-[10px] leading-tight text-foreground-secondary/60">
              {O.metrics[m.key as keyof typeof O.metrics]}
            </div>
          </div>
        ))}
      </div>

      {/* narrative */}
      <p className="mt-3.5 text-[13px] md:text-sm text-foreground-secondary/80 leading-relaxed">
        {narrative}
      </p>
    </article>
  );
}

// Shared dock-port glyph: an indexed signal coordinate + diamond port that
// implies connection to the command bus and brightens with the record.
function DockPort({
  rgb,
  coord,
  active,
}: {
  rgb: string;
  coord: string;
  active: boolean;
}) {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-1.5 shrink-0">
      <span
        className="font-mono text-[9px] tracking-[0.18em] transition-colors duration-300"
        style={{ color: active ? `rgba(${rgb},0.9)` : `rgba(${rgb},0.5)` }}
      >
        {coord}
      </span>
      <span
        className="w-2.5 h-2.5 rotate-45 border transition-all duration-300"
        style={{
          borderColor: active ? `rgba(${rgb},0.9)` : `rgba(${rgb},0.45)`,
          background: active ? `rgba(${rgb},0.25)` : `rgba(${rgb},0.08)`,
          boxShadow: active ? `0 0 8px rgba(${rgb},0.5)` : "none",
        }}
      />
    </span>
  );
}
