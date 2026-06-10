"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";
import { useThemeName } from "@/hooks/useThemeName";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * DestinationGallery — the single post-Hero Home composition.
 *
 * "A personal exhibition inside an operating system." After the cinematic
 * Intelligence Engine Hero, the page softens into one calm, image-led Personal
 * Archive — five clearly navigable destination exhibits (Profile / Selected
 * Work / Impact / Resume / Contact) mounted on the fixed Dark Blueprint
 * Coordinate Field.
 *
 * Asymmetric editorial composition:
 *   Plane A — Profile (quiet, portrait) + Selected Work (dominant product proof)
 *   Plane B — Impact (documentary leadership anchor) + Resume / Contact
 *             (closing gateways, their tall surfaces filled with restrained
 *             CSS/SVG dossier + direct-line systems rather than empty rows)
 * Mobile source order: Profile → Work → Impact → Resume → Contact.
 *
 * ALBARAA OS detailing stays through restrained mono route labels, quiet cyan
 * ports, precise borders, and route numbering — but the dominant feeling is
 * clean, curated, and personal. Accent colours are inline rgba because this
 * project's Tailwind theme tokens do not emit working colour utilities (the
 * same approach the approved production sections use). Home-only; never touches
 * interior-route components.
 */

/* ── shared tokens ─────────────────────────────────────────────────── */
const SURFACE = "var(--surface)"; // opaque enough to separate copy from the brighter grid
const SURFACE_LIT = "var(--surface-lit)";
const BORDER_IDLE = "var(--border-idle)";
const BORDER_LIT = "rgba(var(--rgb-cyan),0.5)";
const MUTED = "var(--text-muted)";
const BODY = "var(--text-body)";

const CARD =
  "ie-focus relative flex h-full flex-col overflow-hidden rounded-2xl border outline-none transition-[transform,border-color,background-color] duration-300";

/** Shared hover/focus "lit" state. onFocus/onBlur bubble, so binding to the
 *  card root also lights the card when an inner link (stretched-link cards)
 *  receives keyboard focus. */
function useLit() {
  const [lit, setLit] = useState(false);
  const bind = {
    onMouseEnter: () => setLit(true),
    onMouseLeave: () => setLit(false),
    onFocus: () => setLit(true),
    onBlur: () => setLit(false),
  };
  return { lit, bind };
}

function surfaceStyle(lit: boolean, reduce: boolean | null, image = false) {
  return {
    borderColor: lit ? BORDER_LIT : BORDER_IDLE,
    backgroundColor: image ? SURFACE : lit ? SURFACE_LIT : SURFACE,
    transform: lit && !reduce ? "translateY(-2px)" : "none",
  };
}

/* ── small presentational pieces ───────────────────────────────────── */
function MetaRow({
  section,
  index,
  lit,
}: {
  section: string;
  index: string;
  lit: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em]"
        style={{ color: "rgba(var(--rgb-cyan),0.82)" }}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: lit ? "var(--accent)" : "rgba(var(--rgb-cyan),0.7)",
            boxShadow: lit
              ? "0 0 8px rgba(var(--rgb-cyan),0.75)"
              : "0 0 4px rgba(var(--rgb-cyan),0.4)",
          }}
        />
        {section} <span style={{ color: MUTED }}>/ {index}</span>
      </span>
    </div>
  );
}

function Cta({
  label,
  lit,
  className = "",
}: {
  label: string;
  lit: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("flex items-center gap-2 font-bold", className)}
      style={{ color: "var(--accent)" }}
    >
      {label}
      <span
        aria-hidden="true"
        className="transition-transform duration-300"
        style={{ transform: lit ? "translateX(4px)" : "none" }}
      >
        →
      </span>
    </span>
  );
}

/* Open registration brackets that tie the five cards into one curated archive
 * board — neutral silver (matches the editorial grid), never cyan. Decorative. */
function GalleryFrameBrackets() {
  const c = "rgba(226,232,242,0.28)";
  const base = "pointer-events-none absolute h-5 w-5";
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(base, "-left-1.5 -top-1.5 border-l border-t")}
        style={{ borderColor: c }}
      />
      <span
        aria-hidden="true"
        className={cn(base, "-right-1.5 -top-1.5 border-r border-t")}
        style={{ borderColor: c }}
      />
      <span
        aria-hidden="true"
        className={cn(base, "-bottom-1.5 -left-1.5 border-b border-l")}
        style={{ borderColor: c }}
      />
      <span
        aria-hidden="true"
        className={cn(base, "-bottom-1.5 -right-1.5 border-b border-r")}
        style={{ borderColor: c }}
      />
    </>
  );
}

/* ── 01 Profile — personal, image-led gateway (quieter than Work) ───── */
function ProfileCard({ reduce }: { reduce: boolean | null }) {
  const { lit, bind } = useLit();
  const { t, displayFont } = useLanguage();
  const g = t.gallery;
  return (
    <Link
      href="/about"
      aria-label={g.profile.cardAria}
      {...bind}
      className={CARD}
      style={surfaceStyle(lit, reduce, true)}
    >
      <div className="relative min-h-[180px] md:min-h-[240px] flex-1 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{ transform: lit && !reduce ? "scale(1.03)" : "none" }}
        >
          {/* Real editorial photo (NOT a cutout) — object-cover fills the card,
              object-position keeps the face/headwear safe; a non-destructive
              cinematic grade darkens it slightly so it reads archival/premium in
              both themes rather than a raw upload. */}
          <Image
            src="/images/kld.PNG"
            alt={g.profile.photoAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover"
            style={{
              objectPosition: "center 30%",
              filter: "brightness(0.88) contrast(1.06) saturate(0.94)",
            }}
          />
        </div>
        {/* Warm-brown archival vignette — edge-weighted (transparent through the
            centre) so it deepens the studio background into a warmer vintage brown
            WITHOUT tinting the face or the navy clothing; keeps skin natural. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 42%, transparent 46%, rgba(70,38,18,0.08) 70%, rgba(70,38,18,0.2) 100%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 h-4 w-4 border-l border-t"
          style={{ borderColor: "rgba(var(--rgb-cyan),0.5)" }}
        />
        {/* Bottom navy anchor — slightly lighter so it ties into the card without
            darkening the upper body. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, rgba(5,9,20,0.6), rgba(5,9,20,0.16), transparent)",
          }}
        />
      </div>
      <div className="p-5 md:p-6">
        <MetaRow section={g.profile.section} index="01" lit={lit} />
        <h3
          className={cn(
            "mt-3 text-xl font-bold text-foreground md:text-2xl",
            displayFont
          )}
        >
          {g.profile.name}
        </h3>
        <p
          className="mt-1.5 text-[13px] font-semibold"
          style={{ color: "rgba(var(--rgb-cyan),0.85)" }}
        >
          {g.profile.role}
        </p>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
          {g.profile.description}
        </p>
        <Cta label={g.profile.cta} lit={lit} className="mt-4 text-base" />
      </div>
    </Link>
  );
}

/* ── 02 Selected Work — dominant flagship proof (DocuPilot) ─────────── */
function WorkCard({ reduce }: { reduce: boolean | null }) {
  const { lit, bind } = useLit();
  const { t, displayFont } = useLanguage();
  const w = t.gallery.work;
  return (
    <div {...bind} className={CARD} style={surfaceStyle(lit, reduce)}>
      {/* Compact header — kept tight so the deployed interface dominates */}
      <div className="px-5 pt-5 md:px-6 md:pt-6">
        <MetaRow section={w.section} index="02" lit={lit} />
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3
            className={cn(
              "text-2xl font-bold leading-tight text-foreground md:text-3xl",
              displayFont
            )}
          >
            {w.name}
          </h3>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.16em]"
            style={{
              color: "rgba(var(--rgb-green),0.95)",
              border: "1px solid rgba(var(--rgb-green),0.35)",
              backgroundColor: "rgba(var(--rgb-green),0.06)",
            }}
          >
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: "var(--accent-green)" }}
            />
            {w.award}
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.06em]"
            style={{ color: "rgba(var(--rgb-cyan),0.85)" }}
          >
            {w.platform}
          </span>
        </div>
      </div>

      {/* Deployed-interface chamber — the dominant real proof. The external Live
          Site visit lives in the interface chrome, tied to the deployed product
          and visually quieter than the internal /work route action below. */}
      <div
        className="mx-5 mt-4 overflow-hidden rounded-xl border md:mx-6"
        style={{
          borderColor: "var(--border-idle)",
          backgroundColor: "rgba(8,11,22,0.6)",
        }}
      >
        <div
          className="flex items-center justify-between gap-4 border-b px-4 py-2.5"
          style={{ borderColor: "var(--border)" }}
        >
          <span
            className="font-mono text-[10px] tracking-[0.2em]"
            style={{ color: MUTED }}
          >
            <span dir="ltr" className="ltr-isolate">
              {w.deployedInterfaceDomain}
            </span>
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://docupilot.site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={w.liveSiteAria}
              className="ie-focus relative z-[2] inline-flex items-center gap-1.5 rounded font-mono text-[10px] tracking-[0.16em] outline-none transition-colors"
              style={{ color: "rgba(var(--rgb-muted),0.8)" }}
            >
              {w.liveSite}
              <span aria-hidden="true">↗</span>
            </a>
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em]"
              style={{ color: "rgba(var(--rgb-green),0.85)" }}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--accent-green)" }}
              />
              {w.live}
            </span>
          </div>
        </div>
        <Image
          src="/images/projects/docupilot-decision-dashboard.png"
          alt={w.screenshotAlt}
          width={3446}
          height={1746}
          sizes="(max-width: 1024px) 100vw, 760px"
          className="h-auto w-full"
        />
      </div>

      {/* Supporting line + primary internal action. A stretched link makes the
          whole card open /work; the Live Site anchor above (z-2) stays
          separately clickable. */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 p-5 md:p-6">
        <p className="max-w-md text-sm leading-relaxed" style={{ color: BODY }}>
          {w.description}
        </p>
        <Link
          href="/work"
          aria-label={w.cardAria}
          className="ie-focus rounded outline-none after:absolute after:inset-0 after:z-[1] after:content-['']"
        >
          <Cta label={w.cta} lit={lit} className="text-lg md:text-xl" />
        </Link>
      </div>
    </div>
  );
}

/* ── 03 Impact — documentary leadership anchor ─────────────────────── */
function ImpactCard({ reduce }: { reduce: boolean | null }) {
  const { lit, bind } = useLit();
  const { t, displayFont } = useLanguage();
  const im = t.gallery.impact;
  return (
    <Link
      href="/impact"
      aria-label={im.cardAria}
      {...bind}
      className={CARD}
      style={surfaceStyle(lit, reduce, true)}
    >
      <div className="relative min-h-[240px] md:min-h-[300px] flex-1 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{ transform: lit && !reduce ? "scale(1.03)" : "none" }}
        >
          <Image
            src="/images/home/archive/impact-first-place-2026.jpg"
            alt={im.photoAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 620px"
            /* Mobile reveals more of the portrait (face + award board) via a
               taller card + a slightly higher crop; desktop keeps the approved
               center-44% framing. */
            className="object-cover object-[center_38%] md:object-[center_44%]"
            style={{ filter: "brightness(1.06) contrast(1.05) saturate(1.1)" }}
          />
        </div>
        {/* Documentary grade (Home-only, non-destructive): a soft indigo
            soft-light pass neutralises the green/yellow projector cast and adds
            a restrained navy mood (no grain, no muddy wash); a light vignette
            tames the bright projection while the centred face + award board stay
            clear and bright; a gentle bottom blend lands the photo into the dark
            copy panel below (stops above the award board). */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(58,60,140,0.20)",
            mixBlendMode: "soft-light",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(125% 110% at 50% 42%, transparent 58%, rgba(6,9,22,0.24) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,9,20,0.55) 0%, rgba(6,9,20,0.06) 60%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28"
          style={{
            background:
              "linear-gradient(to top, rgba(8,11,22,0.85) 0%, rgba(8,11,22,0.26) 52%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 p-5 md:p-6">
          <MetaRow section={im.section} index="03" lit={lit} />
        </div>
      </div>
      <div className="p-5 md:p-6">
        <h3
          className={cn("text-xl font-bold text-foreground md:text-2xl", displayFont)}
        >
          {im.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-3">
          <span
            className="text-4xl font-bold leading-none tabular-nums md:text-5xl"
            style={{
              color: "var(--accent)",
              textShadow: "0 0 22px rgba(var(--rgb-cyan),0.28)",
            }}
          >
            {im.metric}
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.2em]"
            style={{ color: "rgba(var(--rgb-muted),0.75)" }}
          >
            {im.metricLabel}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
          <span className="font-semibold" style={{ color: "var(--text-strong)" }}>
            {im.roleStrong}
          </span>
          {im.roleRest}
        </p>
        <Cta label={im.cta} lit={lit} className="mt-5 text-base" />
      </div>
    </Link>
  );
}

/* ── 04 Official Resume — formal dossier gateway ───────────────────── */
function ResumeCard({ reduce }: { reduce: boolean | null }) {
  const { lit, bind } = useLit();
  const theme = useThemeName();
  const { t, displayFont } = useLanguage();
  const r = t.gallery.resume;
  return (
    <div {...bind} className={cn(CARD, "p-5 md:p-6")} style={surfaceStyle(lit, reduce)}>
      <MetaRow section={r.section} index="04" lit={lit} />
      <h3 className={cn("mt-3 text-xl font-bold text-foreground", displayFont)}>
        {r.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: BODY }}>
        {r.description}
      </p>
      {/* Approved CV / dossier illustration (/images/resume.svg) — transparent
          line-art, so it sits directly on the card surface, contained and
          centred. No plate background needed. */}
      <div
        className="my-3 md:my-4 flex flex-1 items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="relative w-full mx-auto max-w-[250px] md:max-w-none"
          style={{ aspectRatio: "1376 / 768" }}
        >
          <Image
            src={theme === "warm" ? "/images/3r3.svg" : "/images/resume.svg"}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 1024px) 60vw, 340px"
            className="object-contain transition-opacity duration-500"
            style={{ opacity: lit ? 1 : 0.94 }}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <Link
          href="/resume"
          aria-label={r.ctaAria}
          className="ie-focus rounded outline-none after:absolute after:inset-0 after:z-[1] after:content-['']"
        >
          <Cta label={r.cta} lit={lit} className="text-base" />
        </Link>
        <a
          href="/resume/Albaraa-Alnahari-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={r.downloadAria}
          className="ie-focus relative z-[2] inline-flex items-center gap-1.5 rounded font-mono text-[10px] tracking-[0.14em] outline-none transition-colors"
          style={{ color: MUTED }}
        >
          {r.download}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

/* ── 05 Contact — direct-line gateway ──────────────────────────────── */
function ContactCard({ reduce }: { reduce: boolean | null }) {
  const { lit, bind } = useLit();
  const theme = useThemeName();
  const { t, displayFont } = useLanguage();
  const c = t.gallery.contact;
  return (
    <Link
      href="/contact"
      aria-label={c.cardAria}
      {...bind}
      className={cn(CARD, "p-5 md:p-6")}
      style={surfaceStyle(lit, reduce)}
    >
      <MetaRow section={c.section} index="05" lit={lit} />
      <h3 className={cn("mt-3 text-xl font-bold text-foreground", displayFont)}>
        {c.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: BODY }}>
        {c.description}
      </p>
      {/* Approved desk / phone communication illustration (/images/contact.svg)
          — transparent line-art, contained and centred directly on the navy
          card. No plate background or filter applied. */}
      <div
        className="my-3 md:my-4 flex flex-1 items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="relative w-full mx-auto max-w-[250px] md:max-w-none"
          style={{ aspectRatio: "1376 / 768" }}
        >
          <Image
            src={
              theme === "warm" ? "/images/Untitled%20design.svg" : "/images/contact.svg"
            }
            alt=""
            fill
            unoptimized
            sizes="(max-width: 1024px) 60vw, 340px"
            className="object-contain transition-opacity duration-500"
            style={{ opacity: lit ? 1 : 0.96 }}
          />
        </div>
      </div>
      <Cta label={c.cta} lit={lit} className="text-base" />
    </Link>
  );
}

/* ── gallery ───────────────────────────────────────────────────────── */
export function DestinationGallery() {
  const reduce = useReducedMotion();
  const { t, displayFont } = useLanguage();
  const g = t.gallery;
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.04,
      },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden pb-10 pt-16 md:pb-14 md:pt-28">
      {/* Background signature characters — soft ALBARAA "signatures" anchoring
          the archive: kevcek (the Voice / leadership) softened into the far
          left gutter near the Impact region, 232 (the Professional) on the
          right near the Resume / Contact corner. Decorative watermarks (lg+
          only), behind all card content; a restrained brightness lift + soft
          opacity reveals each dark-navy silhouette over the grid, balanced so
          neither competes with the cards. A third signature is intentionally
          not rendered: the only remaining transparent extra (prog.svg) is a
          full-colour cartoon that clashes with this navy/cyan line-art system,
          and the supplied "third" image was an opaque award photo (the Impact
          shot). Awaiting a transparent navy/cyan line-art third character. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Image
          src="/images/kevcek.svg"
          alt=""
          width={1024}
          height={1024}
          unoptimized
          className="absolute hidden h-[320px] w-auto lg:block"
          style={{
            left: "-115px",
            top: "52%",
            opacity: 0.1,
            filter: "brightness(1.3)",
          }}
        />
        <Image
          src="/images/232.svg"
          alt=""
          width={1024}
          height={1536}
          unoptimized
          className="absolute hidden h-[440px] w-auto lg:block"
          style={{
            right: "-48px",
            bottom: "-30px",
            opacity: 0.17,
            filter: "brightness(1.5)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Container>
          {/* Gallery header + restrained hero→archive transition device */}
          <motion.div
            className="readability-field"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={item}
          >
            <div className="mb-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(var(--rgb-cyan),0.6))",
                }}
              />
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--accent)",
                  boxShadow: "0 0 6px rgba(var(--rgb-cyan),0.6)",
                }}
              />
            </div>
            <p
              className="font-mono text-[11px] tracking-[0.24em]"
              style={{ color: "rgba(var(--rgb-body),0.62)" }}
            >
              {g.personalArchive}
            </p>
            <h2
              className={cn(
                "mt-4 max-w-2xl text-3xl font-bold leading-[1.1] text-foreground md:text-4xl lg:text-[2.75rem]",
                displayFont
              )}
            >
              {g.title}
            </h2>
            <p
              className="mt-4 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-body)" }}
            >
              {g.subtitle}
            </p>
          </motion.div>

          {/* One curated archive board — a coordinate rail + open registration
            brackets tie the five destinations together over the fixed grid. */}
          <div className="relative mt-5 md:mt-8">
            <GalleryFrameBrackets />

            {/* coordinate rail — the top edge of the board */}
            <div className="mb-5 flex items-center gap-3 md:mb-6">
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: "rgba(200,210,228,0.7)" }}
              />
              <span
                aria-hidden="true"
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to right, rgba(226,232,242,0.2), rgba(226,232,242,0.05))",
                }}
              />
            </div>

            {/* Plane A — Profile + dominant Selected Work */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={container}
              className="grid gap-3 md:gap-4 lg:grid-cols-[0.86fr_1.55fr] lg:gap-5"
            >
              <motion.div variants={item} className="h-full">
                <ProfileCard reduce={reduce} />
              </motion.div>
              <motion.div variants={item} className="h-full">
                <WorkCard reduce={reduce} />
              </motion.div>
            </motion.div>

            {/* Plane B — documentary Impact + closing Resume / Contact */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={container}
              className="mt-3 md:mt-4 grid items-stretch gap-3 md:gap-4 lg:mt-5 lg:grid-cols-[1.25fr_0.95fr] lg:gap-5"
            >
              <motion.div variants={item} className="h-full">
                <ImpactCard reduce={reduce} />
              </motion.div>
              <motion.div
                variants={item}
                className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:h-full lg:grid-cols-1 lg:grid-rows-2 lg:gap-5"
              >
                <ResumeCard reduce={reduce} />
                <ContactCard reduce={reduce} />
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
