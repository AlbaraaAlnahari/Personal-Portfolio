"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// =====================================================
// OFFICIAL PRESENCE & TALENT — RECOGNITION RECORDS
//
// A documented-recognition surface that extends the Impact archive beyond
// applied work and community leadership into official presence: hosting
// University of Jeddah platforms, the gifted-talent membership, and
// sustained volunteering. Three premium cards on the existing warm-cream
// surface system — a wider PRESENTER record, a TALENT record, and a
// full-width VOLUNTEER metric banner. Each record illuminates its routed
// edge + dock coordinate on hover / keyboard-focus (interaction-triggered
// only, no continuous animation). All figures are verified; nothing is
// aggregated. Accent colors reuse the existing theme-aware palette.
// =====================================================

const PRESENTER = "var(--rgb-cyan)"; // official presence / stage
const TALENT = "var(--rgb-purple)"; // recognition / talent
const VOLUNTEER = "var(--rgb-green)"; // service / community

// Verified numeric values stay in the component (never translated).
const PRESENTER_EVENTS = "6+";
const VOLUNTEER_HOURS = "119+";

export function OfficialPresence() {
  const reduce = useReducedMotion();
  const { t, isAr, displayFont } = useLanguage();
  const R = t.impact.recognition;
  const trk = (en: string) => (isAr ? "tracking-normal" : en);

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
      id="recognition"
      className="py-16 md:py-24 relative scroll-mt-14 md:scroll-mt-16"
      aria-labelledby="recognition-heading"
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
              <div className={`text-sm font-mono text-accent-cyan ${trk("tracking-[0.22em]")}`}>
                {R.eyebrow}
              </div>
              <div className={`text-xs font-mono text-accent-cyan/55 ${trk("tracking-[0.22em]")}`}>
                {R.recordsLabel}
              </div>
            </div>
            <h2
              id="recognition-heading"
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] max-w-4xl ${displayFont}`}
            >
              {R.headingBefore}
              <span className="text-accent-cyan">{R.headingAccent}</span>
              {R.headingAfter}
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg max-w-2xl leading-relaxed">
              {R.intro}
            </p>
          </motion.div>

          {/* Recognition records */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={list}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          >
            <motion.div variants={rise} className="lg:col-span-7">
              <PresenterCard />
            </motion.div>
            <motion.div variants={rise} className="lg:col-span-5">
              <TalentCard />
            </motion.div>
            <motion.div variants={rise} className="lg:col-span-12">
              <VolunteerBanner />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Shared dock-port glyph: an indexed signal coordinate + diamond port,
// language-aware so Arabic coordinates keep their cursive joining.
function DockPort({ rgb, coord, active }: { rgb: string; coord: string; active: boolean }) {
  const { isAr } = useLanguage();
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-1.5 shrink-0">
      <span
        className={`font-mono transition-colors duration-300 ${
          isAr ? "text-[10px] tracking-normal" : "text-[9px] tracking-[0.18em]"
        }`}
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

// Shared left edge accent — the routed recognition trace.
function EdgeAccent({ rgb, active }: { rgb: string; active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full transition-all duration-300"
      style={{
        background: active
          ? `linear-gradient(to bottom, rgba(${rgb},0.9), rgba(${rgb},0.3))`
          : `linear-gradient(to bottom, rgba(${rgb},0.55), rgba(${rgb},0.14))`,
      }}
    />
  );
}

function TagRow({ rgb, tags }: { rgb: string; tags: readonly string[] }) {
  return (
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
  );
}

// ─────────────────────────────────────────────────────────────────────────
// A · OFFICIAL PRESENTER — the wider quantified record (6+ official events)
// ─────────────────────────────────────────────────────────────────────────
function PresenterCard() {
  const [active, setActive] = useState(false);
  const { t, isAr } = useLanguage();
  const trk = (en: string) => (isAr ? "tracking-normal" : en);
  const P = t.impact.recognition.presenter;
  const rgb = PRESENTER;

  return (
    <article
      tabIndex={0}
      aria-label={`${P.title} — ${P.org}`}
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
      {/* focal corner glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(${rgb},0.14), transparent 70%)`,
          opacity: active ? 1 : 0.65,
        }}
      />
      <EdgeAccent rgb={rgb} active={active} />

      <div className="relative">
        {/* category + dock coordinate */}
        <div className="flex items-start justify-between gap-3">
          <span
            className={`font-mono text-[10px] md:text-[11px] ${trk("tracking-[0.22em]")}`}
            style={{ color: `rgb(${rgb})` }}
          >
            {P.channel}
          </span>
          <DockPort rgb={rgb} coord={P.coord} active={active} />
        </div>

        {/* title + org */}
        <div className="mt-5 space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-[1.12]">
            {P.title}
          </h3>
          <div className="text-base md:text-lg font-semibold" style={{ color: `rgb(${rgb})` }}>
            {P.org}
          </div>
        </div>

        {/* quantified readout */}
        <div className="mt-6">
          <div
            className="relative inline-flex flex-col rounded-xl border bg-background-primary/40 px-5 py-4 overflow-hidden"
            style={{ borderColor: `rgba(${rgb},0.3)` }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -left-6 w-28 h-28 rounded-full blur-2xl"
              style={{ background: `radial-gradient(circle, rgba(${rgb},0.14), transparent 70%)` }}
            />
            <span
              className="relative font-bold leading-none tracking-tight tabular-nums text-3xl sm:text-4xl md:text-5xl"
              style={{ color: `rgb(${rgb})` }}
            >
              {PRESENTER_EVENTS}
            </span>
            <span className={`relative mt-2 font-mono text-[9px] md:text-[10px] text-foreground-secondary/60 ${trk("tracking-[0.18em]")}`}>
              {P.metricLabel}
            </span>
          </div>
        </div>

        {/* description */}
        <p className="mt-5 text-sm md:text-[15px] text-foreground-secondary/80 leading-relaxed">
          {P.description}
        </p>

        {/* notable events — kept small so long official titles never break layout */}
        <div
          className="mt-4 rounded-xl border bg-background-primary/30 px-3.5 py-3"
          style={{ borderColor: `rgba(${rgb},0.16)` }}
        >
          <div className={`font-mono text-[9px] mb-2 ${trk("tracking-[0.2em]")}`} style={{ color: `rgba(${rgb},0.7)` }}>
            {P.eventsLabel}
          </div>
          <ul className="space-y-1.5">
            {P.events.map((ev) => (
              <li key={ev} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: `rgba(${rgb},0.8)` }}
                />
                <span className="text-[12.5px] md:text-[13px] text-foreground-secondary/75 leading-relaxed">
                  {ev}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <TagRow rgb={rgb} tags={P.tags} />
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// B · TALENTED STUDENT — recognition membership record
// ─────────────────────────────────────────────────────────────────────────
function TalentCard() {
  const [active, setActive] = useState(false);
  const { t } = useLanguage();
  const T = t.impact.recognition.talent;
  const rgb = TALENT;

  return (
    <article
      tabIndex={0}
      aria-label={`${T.title} — ${T.org}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="ie-focus relative h-full overflow-hidden rounded-2xl border bg-background-primary/40 t-warm-surface backdrop-blur-md p-5 md:p-6 outline-none transition-all duration-300"
      style={{
        borderColor: active ? `rgba(${rgb},0.48)` : `rgba(${rgb},0.26)`,
        boxShadow: active
          ? `0 14px 40px rgba(0,0,0,0.42), 0 0 26px rgba(${rgb},0.11)`
          : "none",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-6 w-56 h-40 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(${rgb},0.12), transparent 70%)`,
          opacity: active ? 1 : 0.55,
        }}
      />
      <EdgeAccent rgb={rgb} active={active} />

      <div className="relative">
        {/* talent crest + dock coordinate */}
        <div className="flex items-start justify-between gap-3">
          <span
            aria-hidden="true"
            className="grid place-items-center w-9 h-9 rounded-xl border"
            style={{ borderColor: `rgba(${rgb},0.5)`, background: `rgba(${rgb},0.12)` }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
              <path
                d="M12 3l2.4 5 5.6.7-4 3.9 1 5.5L12 21l-5 -2.9 1-5.5-4-3.9 5.6-.7z"
                stroke={`rgb(${rgb})`}
                strokeWidth="1.4"
                strokeLinejoin="round"
                fill={`rgba(${rgb},0.18)`}
              />
            </svg>
          </span>
          <DockPort rgb={rgb} coord={T.coord} active={active} />
        </div>

        {/* title + org */}
        <div className="mt-4 space-y-1.5">
          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            {T.title}
          </h3>
          <div className="text-sm md:text-base font-semibold" style={{ color: `rgb(${rgb})` }}>
            {T.org}
          </div>
        </div>

        {/* description */}
        <p className="mt-4 text-sm md:text-[15px] text-foreground-secondary/80 leading-relaxed">
          {T.description}
        </p>

        <TagRow rgb={rgb} tags={T.tags} />
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// C · VOLUNTEER HOURS — full-width compact metric banner (119+ hours)
// ─────────────────────────────────────────────────────────────────────────
function VolunteerBanner() {
  const [active, setActive] = useState(false);
  const { t, isAr } = useLanguage();
  const trk = (en: string) => (isAr ? "tracking-normal" : en);
  const V = t.impact.recognition.volunteer;
  const rgb = VOLUNTEER;

  return (
    <article
      tabIndex={0}
      aria-label={`${V.title} — ${VOLUNTEER_HOURS} ${V.metricLabel}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="ie-focus relative overflow-hidden rounded-2xl border bg-background-primary/40 t-warm-surface backdrop-blur-md p-5 md:p-6 outline-none transition-all duration-300"
      style={{
        borderColor: active ? `rgba(${rgb},0.48)` : `rgba(${rgb},0.24)`,
        boxShadow: active
          ? `0 14px 40px rgba(0,0,0,0.42), 0 0 26px rgba(${rgb},0.1)`
          : "none",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-16 w-64 h-44 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(${rgb},0.12), transparent 70%)`,
          opacity: active ? 1 : 0.55,
        }}
      />
      <EdgeAccent rgb={rgb} active={active} />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-7">
        {/* big metric */}
        <div className="flex items-end gap-3 shrink-0">
          <span
            className="font-bold leading-none tracking-tight tabular-nums text-5xl md:text-6xl lg:text-7xl"
            style={{ color: `rgb(${rgb})` }}
          >
            {VOLUNTEER_HOURS}
          </span>
          <span className={`mb-1.5 font-mono text-[10px] md:text-[11px] text-foreground-secondary/65 ${trk("tracking-[0.18em]")}`}>
            {V.metricLabel}
          </span>
        </div>

        {/* divider (desktop) */}
        <span
          aria-hidden="true"
          className="hidden md:block w-px self-stretch"
          style={{ background: `linear-gradient(to bottom, transparent, rgba(${rgb},0.3), transparent)` }}
        />

        {/* identity + copy */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
              {V.title}
            </h3>
            <DockPort rgb={rgb} coord={V.coord} active={active} />
          </div>
          <p className="mt-2 text-sm md:text-[15px] text-foreground-secondary/80 leading-relaxed">
            {V.description}
          </p>
          <TagRow rgb={rgb} tags={V.tags} />
        </div>
      </div>
    </article>
  );
}
