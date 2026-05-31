"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * About Module
 * Premium identity and engineering profile with real portrait
 */
export function AboutModule() {
  const { t, displayFont } = useLanguage();

  // Localized focus areas, derived from the dictionary by stable key.
  const expertise = [
    t.about.expertise.aiProducts,
    t.about.expertise.fullStack,
    t.about.expertise.robotics,
    t.about.expertise.userResearch,
    t.about.expertise.leadership,
    t.about.expertise.scalable,
  ];

  // Tech/tool names stay Latin in both languages (not translated).
  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Supabase",
    "Python",
    "Java",
    "SQL",
    "AI APIs",
    "Tailwind CSS",
  ];

  // Route-aware navigation: the "Get In Touch" CTA now points to the
  // dedicated /contact route (works on both the temporary long Home and the
  // new /about route, where an in-page #contact anchor no longer exists).
  const router = useRouter();

  const reduce = useReducedMotion();
  // One calm opacity emergence for the verification frame/route, tied to the
  // section reveal. No continuous motion; instant under reduced motion.
  const frameReveal = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.7, ease: "easeOut", delay: reduce ? 0 : 0.2 },
    },
  };

  return (
    <section id="about" className="py-12 md:py-10 relative scroll-mt-14 md:scroll-mt-10">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-10 md:space-y-8"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="readability-field space-y-4">
            <div className="text-sm font-mono text-accent-cyan tracking-widest">
              {t.about.eyebrow}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${displayFont}`}>
              {t.about.heading.lead} <span className="text-accent-cyan">{t.about.heading.accent}</span>
              <br />
              {t.about.heading.trail}
            </h2>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
          >
            {/* Left: Free-standing holographic identity portrait */}
            <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
              <div className="relative flex flex-col items-center">
                {/* Portrait stage with ambient halo */}
                <div className="relative">
                  {/* Soft holographic halo behind portrait */}
                  <div
                    className="absolute -inset-6 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 55% 60% at 50% 38%, rgba(var(--rgb-cyan), 0.22) 0%, rgba(var(--rgb-purple), 0.1) 38%, transparent 68%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Free-standing portrait — transparent cutout, no border */}
                  <div className="relative w-[280px] h-[360px] md:w-[340px] md:h-[420px] flex items-end justify-center">
                    <Image
                      src="/images/albaraa-profile.svg"
                      alt={t.about.portraitAlt}
                      fill
                      sizes="(max-width: 768px) 78vw, 340px"
                      className="object-contain object-bottom"
                      priority
                    />

                    {/* Identity Verification Frame — refined technical framing
                        (corner brackets, calibration ticks, terminal node).
                        Purely decorative; the portrait image is untouched. */}
                    <motion.div
                      variants={frameReveal}
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                    >
                      {/* corner brackets — partial, never a full box */}
                      <span
                        className="absolute top-1 left-1 w-7 h-7 border-t border-l rounded-tl"
                        style={{ borderColor: "rgba(var(--rgb-cyan),0.38)" }}
                      />
                      <span
                        className="absolute top-1 right-1 w-7 h-7 border-t border-r rounded-tr"
                        style={{ borderColor: "rgba(var(--rgb-cyan),0.38)" }}
                      />
                      <span
                        className="absolute bottom-1 left-1 w-7 h-7 border-b border-l rounded-bl"
                        style={{ borderColor: "rgba(var(--rgb-cyan),0.26)" }}
                      />
                      <span
                        className="absolute bottom-1 right-1 w-7 h-7 border-b border-r rounded-br"
                        style={{ borderColor: "rgba(var(--rgb-cyan),0.26)" }}
                      />

                      {/* top calibration rule */}
                      <span className="absolute top-1 left-1/2 -translate-x-1/2 flex items-end gap-[3px] h-2">
                        {[3, 5, 7, 5, 3].map((h, i) => (
                          <span
                            key={i}
                            className="w-px bg-accent-cyan/35"
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </span>

                      {/* terminal node + faint coordinate label (top-right) */}
                      <span className="absolute top-[10px] right-9 flex items-center gap-1.5">
                        <span className="font-mono text-[8px] tracking-[0.25em] text-accent-cyan/45">
                          ID·001
                        </span>
                        <span
                          className="w-1 h-1 rounded-full bg-accent-cyan"
                          style={{ boxShadow: "0 0 6px rgba(var(--rgb-cyan),0.7)" }}
                        />
                      </span>

                      {/* left-edge micro coordinate ticks */}
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                        <span className="w-1.5 h-px bg-accent-cyan/30" />
                        <span className="w-2.5 h-px bg-accent-cyan/45" />
                        <span className="w-1.5 h-px bg-accent-cyan/30" />
                      </span>
                    </motion.div>
                  </div>

                  {/* Faint holographic floor line beneath portrait */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[65%] h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 0%, rgba(var(--rgb-cyan), 0.5) 50%, transparent 100%)",
                      boxShadow: "0 0 8px rgba(var(--rgb-cyan), 0.35)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Identity origin node — compact authenticated plaque */}
                <div className="relative mt-4 w-fit min-w-[240px] px-5 py-3 rounded-xl backdrop-blur-md bg-background-primary/65 border border-accent-cyan/30 shadow-[0_4px_24px_rgba(var(--rgb-cyan),0.1)]">
                  {/* origin port dot — seats the badge as a node */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-accent-cyan"
                    style={{ boxShadow: "0 0 8px rgba(var(--rgb-cyan),0.8)" }}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono text-accent-cyan/80 tracking-widest ltr-isolate" dir="ltr">
                        {t.about.identityName}
                      </div>
                      <div className="text-[11px] text-foreground-secondary/70 mt-0.5 tracking-wide">
                        {t.about.identityProfileLabel}
                      </div>
                    </div>

                    {/* compact verification status */}
                    <span className="flex items-center gap-1.5 shrink-0">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent-green)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="font-mono text-[8px] leading-[1.3] tracking-[0.16em] text-accent-green/80">
                        {t.about.identityVerifiedLine1}
                        <br />
                        {t.about.identityVerifiedLine2}
                      </span>
                    </span>
                  </div>

                  {/* Identity retrieval route — emits toward the Profile Summary
                      (desktop only; simplified away when columns stack). */}
                  <motion.span
                    variants={frameReveal}
                    aria-hidden="true"
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-full items-center"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent-cyan/75 -ml-[3px]"
                      style={{ boxShadow: "0 0 6px rgba(var(--rgb-cyan),0.55)" }}
                    />
                    <span
                      className="h-px w-10"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(var(--rgb-cyan),0.5), rgba(var(--rgb-cyan),0.06))",
                      }}
                    />
                    <span className="w-1 h-1 rounded-full bg-accent-cyan/45" />
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Right: Identity information field - open, no rigid box */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                {/* Soft atmospheric corner glows - no rectangle */}
                <div
                  className="absolute -top-8 -right-8 w-56 h-56 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(var(--rgb-cyan), 0.1) 0%, transparent 65%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-12 -left-8 w-56 h-56 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(var(--rgb-purple), 0.08) 0%, transparent 65%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative space-y-7 t-readability-field">
                  {/* Module header — receiving dock + status + decorative ID */}
                  <div className="relative flex items-center justify-between gap-4">
                    {/* receiving dock — resolves the identity retrieval route
                        (desktop only; aligns the route to this entry point) */}
                    <motion.span
                      variants={frameReveal}
                      aria-hidden="true"
                      className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-7 items-center"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-cyan/45" />
                      <span
                        className="h-px w-5"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(var(--rgb-cyan),0.06), rgba(var(--rgb-cyan),0.5))",
                        }}
                      />
                    </motion.span>

                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-accent-cyan/85"
                        style={{ boxShadow: "0 0 8px rgba(var(--rgb-cyan), 0.7)" }}
                      />
                      <div className="text-xs font-mono text-accent-cyan/90 tracking-[0.22em]">
                        {t.about.profileSummaryLabel}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-foreground-secondary/40 tracking-[0.2em] ltr-isolate" dir="ltr">
                      {t.about.idCode}
                    </div>
                  </div>

                  {/* Biography with subtle accent rail */}
                  <div className="relative pl-4">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-gradient-to-b from-accent-cyan/45 via-accent-cyan/15 to-transparent" />
                    <p className="text-sm md:text-base text-foreground-primary/95 leading-[1.75] max-w-prose">
                      {t.about.bio}
                    </p>
                  </div>

                  {/* Neural data divider */}
                  <div className="relative flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-glass-light/40 to-glass-light/10" />
                    <div
                      className="w-1 h-1 rounded-full bg-accent-cyan/70"
                      style={{ boxShadow: "0 0 6px rgba(var(--rgb-cyan), 0.5)" }}
                    />
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-glass-light/40 to-glass-light/10" />
                  </div>

                  {/* Focus Areas submodule */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <span className="text-[10px] font-mono text-accent-green/55 tracking-[0.2em]">
                        {t.about.focusAreasIndex}
                      </span>
                      <h3 className="text-[11px] font-mono text-accent-green/85 tracking-[0.22em]">
                        {t.about.focusAreasLabel}
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-accent-green/20 to-transparent" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {expertise.map((area, index) => (
                        <motion.div
                          key={area}
                          variants={itemVariants}
                          transition={{ delay: index * 0.05 }}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-accent-cyan/14 to-accent-purple/8 border border-accent-cyan/25 text-xs text-foreground-secondary/90 hover:border-accent-cyan/55 hover:text-accent-cyan hover:bg-accent-cyan/22 hover:shadow-[inset_0_0_14px_rgba(var(--rgb-cyan),0.15)] transition-all duration-300"
                        >
                          {area}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies submodule */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <span className="text-[10px] font-mono text-accent-purple/50 tracking-[0.2em]">
                        {t.about.technologiesIndex}
                      </span>
                      <h3 className="text-[11px] font-mono text-accent-purple/80 tracking-[0.22em]">
                        {t.about.technologiesLabel}
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-accent-purple/15 to-transparent" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <motion.div
                          key={tech}
                          variants={itemVariants}
                          transition={{ delay: index * 0.03 }}
                          dir="ltr"
                          className="ltr-isolate px-2.5 py-1 rounded-md bg-gradient-to-br from-accent-purple/10 to-accent-cyan/6 border border-accent-purple/20 text-[11px] text-foreground-secondary/80 hover:border-accent-purple/50 hover:text-accent-purple hover:bg-accent-purple/18 hover:shadow-[inset_0_0_12px_rgba(var(--rgb-purple),0.12)] transition-all duration-300"
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA action bar — both buttons visibly rendered */}
                  <div className="pt-3 flex gap-3 flex-col sm:flex-row sm:items-center">
                    <Button
                      variant="primary"
                      size="md"
                      glow
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-accent-cyan to-accent-purple text-background-primary font-semibold shadow-[0_0_20px_rgba(var(--rgb-cyan),0.35)] hover:shadow-[0_0_28px_rgba(var(--rgb-cyan),0.5)]"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = "/resume/Albaraa-Alnahari-Resume.pdf";
                        link.download = "Albaraa-Alnahari-Resume.pdf";
                        link.click();
                      }}
                    >
                      {t.about.downloadResume}
                    </Button>
                    <Button
                      variant="glass"
                      size="md"
                      className="w-full sm:w-auto px-6 py-2.5 border border-accent-cyan/30 text-foreground-primary hover:border-accent-cyan/60 hover:text-accent-cyan"
                      onClick={() => router.push("/contact")}
                    >
                      {t.about.getInTouch}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
