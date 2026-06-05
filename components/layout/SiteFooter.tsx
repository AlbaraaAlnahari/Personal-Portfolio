"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Twitter, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { containerVariants, itemVariants } from "@/lib/motion/variants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * SiteFooter — shared premium "Direct Line" footer across the multi-page app.
 *
 * A compact, editorial three-zone footer over the dark-navy system: brand
 * lockup + line, essential route navigation, and a direct contact channel
 * (email + verified social routes), closed by a quiet bottom bar. A solid deep
 * dark closing block in BOTH themes (warm pages stay cream above, then end on
 * this dark end-cap) so the fixed blueprint grid never shows through the footer;
 * the warm theme re-pins the footer subtree to the dark-surface (navy) token
 * values for readable ivory/slate text with restrained cyan accents.
 *
 * Anchor colours are applied inline because this project's global unlayered
 * `a { color }` rule overrides layered colour utilities (the approach the
 * approved sections use). Contact/social values mirror the verified data in the
 * Contact console — no invented handles or URLs.
 */

const MUTED = "var(--text-muted)";
const BODY = "var(--text-body)";
const IVORY = "var(--heading)";
const CYAN = "var(--accent)";
const BORDER = "var(--border)";

const EMAIL = "albaraa.a.alnahari@gmail.com";
const NAV = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "work", href: "/work" },
  { key: "impact", href: "/impact" },
  { key: "resume", href: "/resume" },
  { key: "contact", href: "/contact" },
] as const;
const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/albaraa-alnahari", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/AlbaraaAlnahari", Icon: Github },
  { label: "X / Twitter", href: "https://x.com/x_ff", Icon: Twitter },
] as const;

/* Quiet route link — muted slate → warm ivory on hover/focus, tiny cyan tick.
 * Inline colour wins over the global anchor-colour rule; ie-focus gives the
 * accessible keyboard ring. */
function FooterLink({ href, label }: { href: string; label: string }) {
  const [lit, setLit] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      onFocus={() => setLit(true)}
      onBlur={() => setLit(false)}
      className="ie-focus group inline-flex items-center gap-1.5 rounded text-sm outline-none transition-colors duration-200"
      style={{ color: lit ? "var(--nav-active)" : BODY }}
    >
      <span
        aria-hidden="true"
        className="h-1 w-1 rounded-full transition-colors duration-200"
        style={{ backgroundColor: lit ? "var(--nav-active)" : "var(--text-muted)" }}
      />
      {label}
    </Link>
  );
}

function SocialLink({ href, label, Icon }: { href: string; label: string; Icon: typeof Linkedin }) {
  const { t } = useLanguage();
  const [lit, setLit] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} ${t.footer.opensNewTab}`}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      onFocus={() => setLit(true)}
      onBlur={() => setLit(false)}
      className="ie-focus grid h-10 w-10 place-items-center rounded-lg outline-none transition-colors duration-200"
      style={{
        border: `1px solid ${lit ? "rgba(var(--nav-active-rgb),0.5)" : "var(--border-idle)"}`,
        color: lit ? "var(--nav-active)" : "var(--text-body)",
        backgroundColor: lit ? "rgba(var(--nav-active-rgb),0.08)" : "transparent",
      }}
    >
      <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
    </a>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  const [emailLit, setEmailLit] = useState(false);
  return (
    <footer className="site-footer-dark relative mt-14 md:mt-20 border-t" style={{ borderColor: BORDER }}>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-9 md:py-14"
        >
          {/* three calm zones */}
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1.25fr] md:gap-8">
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <Link href="/" aria-label={t.footer.brandLogoAria} className="nav-logo-link inline-flex items-center px-2 -mx-2">
                <Image src="/brand/albaraa-logo-dark.svg" alt="" width={900} height={320} unoptimized className="h-11 w-auto" />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: BODY }}>
                {t.footer.brandSentence}
              </p>
            </motion.div>

            {/* Navigate */}
            <motion.nav variants={itemVariants} aria-label="Footer">
              <span className="font-mono text-[10px] tracking-[0.24em]" style={{ color: MUTED }}>
                {t.footer.navigateLabel}
              </span>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <FooterLink href={n.href} label={t.footer.nav[n.key]} />
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Direct line */}
            <motion.div variants={itemVariants}>
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em]" style={{ color: "rgba(var(--rgb-cyan),0.82)" }}>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CYAN, boxShadow: "0 0 8px rgba(var(--rgb-cyan),0.7)" }} />
                {t.footer.directLineLabel}
              </span>
              <a
                href={`mailto:${EMAIL}`}
                dir="ltr"
                onMouseEnter={() => setEmailLit(true)}
                onMouseLeave={() => setEmailLit(false)}
                onFocus={() => setEmailLit(true)}
                onBlur={() => setEmailLit(false)}
                className="ie-focus ltr-isolate mt-4 inline-block break-all rounded text-base font-semibold outline-none transition-colors duration-200"
                style={{ color: emailLit ? "var(--accent-strong)" : IVORY }}
              >
                {EMAIL}
              </a>
              <p className="mt-2 max-w-xs text-sm leading-relaxed" style={{ color: BODY }}>
                {t.footer.availabilityCopy}
              </p>
              <div className="mt-5 flex items-center gap-2.5">
                {SOCIAL.map((s) => (
                  <SocialLink key={s.label} href={s.href} label={s.label} Icon={s.Icon} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* bottom bar */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-10 flex flex-col items-start justify-between gap-2.5 sm:gap-3 border-t pt-5 md:pt-6 sm:flex-row sm:items-center"
            style={{ borderColor: BORDER }}
          >
            <p className="text-[13px]" style={{ color: MUTED }}>
              {t.footer.copyright}
            </p>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              <ArrowUpRight size={12} strokeWidth={1.8} aria-hidden="true" style={{ color: "rgba(var(--rgb-cyan),0.6)" }} />
              ALBARAA OS
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
}
