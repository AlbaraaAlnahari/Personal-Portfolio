"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * HomeScene — shared wrapper for the curated Home entry scenes.
 *
 * Provides the Home-local editorial rhythm and one consistent chapter/route
 * marker language: a small cyan route port + hairline + "EYEBROW / NN" label,
 * signalling that each scene is a navigable gateway into a chapter. An optional
 * `connectUp` trace links the first scene back up to the Hero. A single
 * one-time entrance reveal, fully static under prefers-reduced-motion.
 *
 * Accent colours are applied inline because this project's Tailwind theme
 * tokens (accent-cyan etc.) do not emit working colour utilities — inline rgba
 * is the same approach the approved production sections use.
 * Home-only; never touches interior-route components.
 */
export function HomeScene({
  eyebrow,
  index,
  route,
  connectUp = false,
  children,
  className = "",
}: {
  eyebrow?: string;
  index?: string;
  route?: string;
  connectUp?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section className={cn("relative py-14 md:py-20", className)}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={rise}
        >
          {eyebrow && (
            <div className="mb-7 md:mb-9">
              {/* routed trace down from the Hero / previous chapter */}
              {connectUp && (
                <span
                  aria-hidden="true"
                  className="mb-3 block h-7 w-px"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(0,217,255,0.5))" }}
                />
              )}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: "rgba(0,217,255,0.9)", boxShadow: "0 0 6px rgba(0,217,255,0.6)" }}
                />
                <span
                  aria-hidden="true"
                  className="h-px w-6"
                  style={{ background: "linear-gradient(to right, rgba(0,217,255,0.6), transparent)" }}
                />
                <span
                  className="font-mono text-[11px] tracking-[0.24em]"
                  style={{ color: "rgba(231,247,255,0.88)" }}
                >
                  {eyebrow}
                  {index && <span style={{ color: "rgba(160,165,197,0.5)" }}> / {index}</span>}
                </span>
                {route && (
                  <span
                    className="font-mono text-[10px] tracking-[0.18em]"
                    style={{ color: "rgba(0,217,255,0.5)" }}
                  >
                    {route}
                  </span>
                )}
              </div>
            </div>
          )}
          {children}
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * FrameCorners — four quiet cyan corner brackets for open exhibition framing
 * (architectural feel without a closed card). Decorative; place inside a
 * `relative` container.
 */
export function FrameCorners({ lit = false }: { lit?: boolean }) {
  const c = lit ? "rgba(0,217,255,0.6)" : "rgba(0,217,255,0.3)";
  return (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t transition-colors duration-300" style={{ borderColor: c }} />
      <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t transition-colors duration-300" style={{ borderColor: c }} />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l transition-colors duration-300" style={{ borderColor: c }} />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r transition-colors duration-300" style={{ borderColor: c }} />
    </>
  );
}

/**
 * DestinationPortal — a larger, clean route-gateway tile that reads
 * unmistakably as a doorway into a dedicated page. Quiet metadata
 * (DESTINATION / SECTION + route path) sits above a prominent action verb and
 * one supporting line. The whole tile is a real internal link with
 * interaction-only cyan brightening and a visible keyboard focus ring.
 */
export function DestinationPortal({
  section,
  route,
  cta,
  descriptor,
  className = "",
}: {
  section: string;
  route: string;
  cta: string;
  descriptor: string;
  className?: string;
}) {
  const [lit, setLit] = useState(false);
  const { t } = useLanguage();
  return (
    <Link
      href={route}
      aria-label={cta}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      onFocus={() => setLit(true)}
      onBlur={() => setLit(false)}
      className={cn(
        "ie-focus relative block overflow-hidden rounded-xl border p-5 outline-none transition-colors duration-300 md:p-6",
        className
      )}
      style={{
        borderColor: lit ? "rgba(0,217,255,0.5)" : "rgba(255,255,255,0.1)",
        backgroundColor: "rgba(10,14,28,0.45)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em]" style={{ color: "rgba(0,217,255,0.8)" }}>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: lit ? "#00d9ff" : "rgba(0,217,255,0.7)",
              boxShadow: lit ? "0 0 8px rgba(0,217,255,0.7)" : "0 0 4px rgba(0,217,255,0.4)",
            }}
          />
          {t.scene.destinationPrefix} / {section}
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: "rgba(160,165,197,0.55)" }}>
          {route}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2 text-lg font-bold md:text-xl" style={{ color: "#00d9ff" }}>
        {cta}
        <span aria-hidden="true" className="transition-transform duration-300" style={{ transform: lit ? "translateX(3px)" : "none" }}>→</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(231,247,255,0.7)" }}>
        {descriptor}
      </p>
    </Link>
  );
}

/**
 * DestinationRail — a line-based horizontal command rail that integrates a
 * route gateway into a typographic scene (Impact) instead of a floating card.
 * Fully-clickable internal link; brightens its top rule + routing point on
 * hover/focus. No nested interactive children.
 */
export function DestinationRail({
  section,
  route,
  cta,
  descriptor,
  className = "",
}: {
  section: string;
  route: string;
  cta: string;
  descriptor: string;
  className?: string;
}) {
  const [lit, setLit] = useState(false);
  const { t } = useLanguage();
  return (
    <Link
      href={route}
      aria-label={cta}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      onFocus={() => setLit(true)}
      onBlur={() => setLit(false)}
      className={cn(
        "ie-focus relative flex flex-col gap-4 border-t pt-5 outline-none transition-colors duration-300 sm:flex-row sm:items-center sm:gap-6",
        className
      )}
      style={{ borderTopColor: lit ? "rgba(0,217,255,0.5)" : "rgba(255,255,255,0.12)" }}
    >
      <span className="flex flex-shrink-0 items-center gap-2.5 font-mono text-[10px] tracking-[0.24em]" style={{ color: "rgba(0,217,255,0.8)" }}>
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: lit ? "#00d9ff" : "rgba(0,217,255,0.7)",
            boxShadow: lit ? "0 0 8px rgba(0,217,255,0.7)" : "0 0 4px rgba(0,217,255,0.4)",
          }}
        />
        {t.scene.destinationPrefix} / {section}
      </span>
      <p className="text-sm leading-relaxed sm:flex-1" style={{ color: "rgba(231,247,255,0.7)" }}>
        {descriptor}
      </p>
      <span className="flex flex-shrink-0 items-center gap-3">
        <span className="flex items-center gap-2 text-base font-bold" style={{ color: "#00d9ff" }}>
          {cta}
          <span aria-hidden="true" className="transition-transform duration-300" style={{ transform: lit ? "translateX(3px)" : "none" }}>→</span>
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: "rgba(160,165,197,0.55)" }}>{route}</span>
      </span>
    </Link>
  );
}
