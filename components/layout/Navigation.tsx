"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RouteCommandDeck } from "./RouteCommandDeck";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Navigation — ALBARAA OS header shell.
 *
 * A premium, confident navigation shelf over the cinematic Hero: the enlarged
 * ALBARAA lockup home link is the visual anchor; a calm desktop route rail
 * (Home / About / Work / Impact / Contact) gives immediate orientation with a
 * restrained cyan active state; INDEX remains the system route-command deck and
 * View PDF the primary résumé utility. Below the desktop breakpoint the route
 * rail collapses (INDEX is the accessible jump-to-chapter control), keeping the
 * mobile header to logo + INDEX + View PDF. Header height is driven by the
 * responsive --nav-height token (56px mobile / 68px md+).
 *
 * Reactive surface: clean and transparent over the very top of the Hero (the
 * lockup + nav float on the cinematic dark space), then settles onto a soft
 * protective glass surface — fill, blur, hairline border, gentle shadow — once
 * the page is scrolled OR the INDEX route deck is open, so foreground content
 * never reads against a busy backdrop. The page scroller here is <body>, so the
 * scroll position is read from document.body via a capture-phase listener.
 *
 * Utility cluster (md+): three restrained, intentionally NON-functional
 * placeholders — Theme mode, Language (EN / العربية), and Ask Albaraa (a future
 * assistant entry). They are truthfully marked "coming soon" (aria-disabled,
 * tooltip, no navigation, no behaviour) and make NO claim of working features.
 */

// Calm desktop route rail (lg+) — deliberately trimmed to the two primary
// orientation routes (Home / About). Work, Impact, Contact, and Resume stay
// fully reachable through the INDEX route deck and the Home gallery cards, so
// the top bar reads clean and premium rather than busy.
type Theme = "navy" | "warm";

const NAV_HREFS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
] as const;

/**
 * One route-rail link. Colour is applied inline because this project's global
 * unlayered `a { color: var(--color-accent-cyan) }` rule otherwise overrides
 * layered Tailwind colour utilities — inline wins. The ACTIVE state is a text
 * colour change ONLY (--nav-active): a premium emerald in navy and a deep
 * mango/golden in warm cream — no underline, no box, no pill. Hover moves toward
 * the same accent; inactive = muted slate (navy) / dark charcoal (warm). Mouse
 * clicks leave no outline (global :focus-visible); keyboard keeps the ie-focus ring.
 */
function NavRailLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="nav-rail-link ie-focus rounded text-[13px] font-medium tracking-wide outline-none transition-colors duration-200"
      style={{ color: active || hover ? "var(--nav-active)" : "var(--nav-link-idle)" }}
    >
      {label}
    </Link>
  );
}

/**
 * LanguageToggle — the real Arabic ⇄ English language switch. Mirrors the
 * ThemeToggle chrome (so it themes with the bar) but carries a globe glyph plus a
 * short code for the language it switches TO (Arabic mode → "EN"; English mode →
 * "ع"). The accessible name + native title describe the destination and come from
 * the dictionary, so they localize too. Keyboard accessible; cyan ie-focus ring.
 */
function LanguageToggle() {
  const { t, toggle } = useLanguage();
  const [hover, setHover] = useState(false);
  const label = t.nav.language.switchLabel;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="ie-focus inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-[13px] px-2 sm:px-2.5 outline-none transition-colors duration-200"
      style={{
        border: `1px solid ${hover ? "rgba(var(--nav-chrome),0.82)" : "rgba(var(--nav-chrome),0.62)"}`,
        backgroundColor: hover ? "rgba(var(--nav-chrome),0.06)" : "transparent",
        color: hover ? "rgba(var(--nav-chrome),0.95)" : "rgba(var(--nav-chrome),0.72)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17" />
        <path d="M12 3.5c2.6 2.6 2.6 14.4 0 17M12 3.5c-2.6 2.6-2.6 14.4 0 17" />
      </svg>
      <span className="text-[11px] font-semibold leading-none" style={{ letterSpacing: "0.04em" }}>
        {t.nav.language.shortLabel}
      </span>
    </button>
  );
}

/**
 * ThemeToggle — the real appearance switch (navy ⇄ warm cream). The parent
 * persists the choice to localStorage('albaraa-theme') and flips data-theme on
 * <html>; here we render a keyboard-accessible button whose glyph + accessible
 * name reflect the destination: a sun in navy mode (click → warm) and a moon in
 * warm mode (click → navy). Shares the header chrome tokens so it themes with
 * the rest of the bar, and keeps the cyan ie-focus ring.
 */
function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const { t } = useLanguage();
  const [hover, setHover] = useState(false);
  const warm = theme === "warm";
  const label = warm ? t.nav.theme.toNavy : t.nav.theme.toWarm;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={warm}
      title={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="ie-focus grid h-10 w-10 cursor-pointer place-items-center rounded-[13px] outline-none transition-colors duration-200"
      style={{
        border: `1px solid ${hover ? "rgba(var(--nav-chrome),0.82)" : "rgba(var(--nav-chrome),0.62)"}`,
        backgroundColor: hover ? "rgba(var(--nav-chrome),0.06)" : "transparent",
        color: hover ? "rgba(var(--nav-chrome),0.95)" : "rgba(var(--nav-chrome),0.72)",
      }}
    >
      {warm ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 14.4A8 8 0 0 1 9.6 4 6.5 6.5 0 1 0 20 14.4z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.3M12 19.1v2.3M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.6 12h2.3M19.1 12h2.3M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
        </svg>
      )}
    </button>
  );
}

/**
 * AskAlbaraa — the clear "Ask Albaraa AI" header utility (replaces the old,
 * unlabelled chat icon). It reads as a real product entry point — a compact
 * premium pill with a chat/terminal glyph, the label "Ask Albaraa AI", and a
 * small cyan signal dot — but it is deliberately and honestly a coming-soon
 * PLACEHOLDER: aria-disabled, accessible name + native title "Ask Albaraa AI —
 * coming soon", a hover/focus tooltip, not-allowed cursor, and NO behaviour (no
 * navigation, no panel, no chatbot, no fabricated answers). The label collapses
 * to icon-only on the md→lg band (tooltip carries the name) and shows in full on
 * lg+. Hidden below md so the mobile header stays at logo · INDEX · View PDF.
 */
function AskAlbaraa({ active }: { active: boolean }) {
  const { t } = useLanguage();
  const [hover, setHover] = useState(false);
  const lit = active || hover;
  return (
    <span className="hidden xl:inline-flex">
      <Link
        href="/ask"
        aria-label={t.nav.ask}
        aria-current={active ? "page" : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="ie-focus inline-flex h-10 items-center gap-2 rounded-full px-5 outline-none transition-colors duration-200"
        style={{
          border: `1px solid ${lit ? "rgba(var(--nav-chrome),0.9)" : "rgba(var(--nav-chrome),0.74)"}`,
          backgroundColor: lit ? "rgba(var(--nav-chrome),0.06)" : "transparent",
          color: lit ? "rgba(var(--nav-chrome),0.98)" : "rgba(var(--nav-chrome),0.82)",
        }}
      >
        {/* tiny chat outline glyph */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.5 5.5h15v10H9l-4.5 4z" />
          <path d="M8 9.2l2 2-2 2" />
          <line x1="12.5" y1="13.2" x2="15.5" y2="13.2" />
        </svg>
        <span className="whitespace-nowrap text-[13px] font-medium tracking-wide">
          {t.nav.ask}
        </span>
      </Link>
    </span>
  );
}

/**
 * ContactPill — the primary human CTA: a filled warm-ivory capsule routing to
 * /contact, deep-navy label, calm tonal hover (no glow, no loud shadow). It is
 * the clearest action in the header (stronger than Ask Albaraa AI and View PDF)
 * and is never duplicated as a plain text nav item. Cyan focus ring via
 * `ie-focus`. Visible sm+ (its parent group hides it on the smallest header).
 */
function ContactPill({ active }: { active: boolean }) {
  const { t } = useLanguage();
  const [hover, setHover] = useState(false);
  return (
    <Link
      href="/contact"
      aria-label={t.nav.contact}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="ie-focus inline-flex h-10 items-center rounded-full px-4 sm:px-6 text-[13px] font-semibold outline-none transition-colors duration-200"
      style={{
        backgroundColor: hover ? "var(--contact-pill-bg-hover)" : "var(--contact-pill-bg)",
        color: "var(--contact-pill-text)",
      }}
    >
      {t.nav.contact}
    </Link>
  );
}

// Subtle current-route context shown on interior routes only — tablet band
// (md → lg) where the route rail is collapsed; hidden on Home and on lg+ where
// the visible route rail + active state already communicate location.
const ROUTE_CONTEXT_KEYS: Record<string, "about" | "work" | "impact" | "resume" | "contact"> = {
  "/about": "about",
  "/work": "work",
  "/impact": "impact",
  "/resume": "resume",
  "/contact": "contact",
};

export function Navigation() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const routeContextKey =
    Object.entries(ROUTE_CONTEXT_KEYS).find(
      ([href]) => pathname === href || pathname.startsWith(`${href}/`)
    )?.[1] ?? null;
  const routeContext = routeContextKey ? t.nav.routeContext[routeContextKey] : null;

  // Reactive surface: surfaced once the page is scrolled past the top OR the
  // INDEX route deck is open. The page scroller is <body> (see globals.css), so
  // the offset is read from document.body; a capture-phase scroll listener
  // catches the non-bubbling scroll event from the body element.
  const [scrolled, setScrolled] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("navy");
  const surfaced = scrolled || deckOpen;

  // Sync React state with the data-theme the no-flash bootstrap already applied
  // (before paint) so the toggle's glyph + label match the persisted choice.
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "warm" ? "warm" : "navy");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "navy" ? "warm" : "navy";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("albaraa-theme", next);
      } catch {
        /* storage unavailable — the in-session toggle still works */
      }
      return next;
    });
  };

  useEffect(() => {
    const read = () => {
      const y =
        document.body.scrollTop || document.documentElement.scrollTop || window.scrollY || 0;
      setScrolled(y > 8);
    };
    read();
    window.addEventListener("scroll", read, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", read, { capture: true });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        height: "var(--nav-height)",
        // Reactive surface — transparent and clean at the top of the Hero,
        // soft protective glass once scrolled / INDEX open. Only paint-related
        // properties transition (never transform) so the entrance animation and
        // the lockup stay smooth.
        backgroundColor: surfaced ? "var(--nav-surface)" : "transparent",
        backdropFilter: surfaced ? "blur(12px) saturate(140%)" : "blur(0px)",
        WebkitBackdropFilter: surfaced ? "blur(12px) saturate(140%)" : "blur(0px)",
        borderBottom: `1px solid ${surfaced ? "var(--nav-border)" : "transparent"}`,
        boxShadow: surfaced
          ? "0 14px 36px rgba(0,0,0,0.22)"
          : "0 0 0 0 rgba(0,0,0,0)",
        transition:
          "background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div className="relative w-full max-w-[68rem] mx-auto px-3 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: brand / home link — approved البراء / ALBARAA lockup (dark-navy
            artwork). Decorative image (alt=""); the link carries the accessible
            name. Cyan focus ring on :focus-visible only; subtle hover opacity,
            no idle outline, no pill, no pulse. */}
        <motion.div variants={itemVariants} className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            aria-label={t.nav.logoAria}
            className="nav-logo-link flex items-center px-2.5 -mx-2.5"
          >
            <Image
              src={theme === "warm" ? "/images/albaraa-logo-thmanyah-light-dot-on-circle.svg" : "/brand/albaraa-logo-dark.svg"}
              alt=""
              width={900}
              height={320}
              priority
              unoptimized
              className="h-10 w-auto md:h-12 lg:h-[56px]"
            />
          </Link>
        </motion.div>

        {/* Center: restrained interior-route context — tablet band only
            (md → lg); on lg+ the visible route rail conveys location. */}
        {routeContext && (
          <motion.div
            variants={itemVariants}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block lg:hidden"
          >
            <span className="font-mono text-[11px] tracking-[0.24em]" style={{ color: "rgba(var(--nav-muted),0.55)" }}>
              {routeContext}
            </span>
          </motion.div>
        )}

        {/* Right: editorial route rail (lg+) · preference placeholders (lg+) ·
            human/AI action pills (Ask Albaraa AI / Contact) · portfolio
            utilities (INDEX / View PDF). One clean branded system, vertically
            centred, with intentional rhythm between each group. */}
        <motion.div variants={itemVariants} className="flex flex-shrink-0 items-center gap-2.5 sm:gap-4 lg:gap-8">
          {/* Editorial route rail — Home / About (lg+); tablet/mobile use INDEX */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_HREFS.map((link) => (
              <NavRailLink key={link.href} href={link.href} label={t.nav[link.key]} active={isActive(link.href)} />
            ))}
          </div>

          {/* Preferences — Theme (navy ⇄ warm) · Language (Arabic ⇄ English).
              Both are real, persistent toggles. */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <LanguageToggle />
          </div>

          {/* Human / AI action pills — Ask Albaraa AI (xl/1280+ only, so the
              1024 band stays uncrowded) · Contact (the primary CTA, kept from
              the smallest header up). */}
          <div className="flex items-center gap-2 sm:gap-3">
            <AskAlbaraa active={isActive("/ask")} />
            <ContactPill active={isActive("/contact")} />
          </div>

          {/* Portfolio utilities — INDEX route deck · View PDF, after a quiet rule.
              View PDF is hidden on the narrowest mobile so the chosen mobile
              priority reads logo · Contact · INDEX; it returns from sm+. */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span aria-hidden="true" className="hidden h-5 w-px sm:block" style={{ backgroundColor: "rgba(var(--nav-chrome),0.14)" }} />
            {/* Below lg the preferences group is hidden, so surface the language
                switch AND the theme switch here too — both are switchable at every
                breakpoint. The theme toggle reuses the same theme state / handler
                as the desktop control (no duplicate theme logic). */}
            <span className="inline-flex lg:hidden">
              <LanguageToggle />
            </span>
            <span className="inline-flex lg:hidden">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </span>
            <RouteCommandDeck onOpenChange={setDeckOpen} />
            {/* Official résumé PDF — subtle cyan-accented secondary utility, kept
                quieter than the filled Contact CTA. URL / target / rel preserved. */}
            <a
              href="/resume/Albaraa-Alnahari-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ie-focus hidden h-9 items-center rounded-lg px-3.5 text-sm font-medium outline-none transition-colors duration-200 sm:inline-flex"
              style={{ border: "1px solid rgba(var(--rgb-cyan),0.5)", backgroundColor: "rgba(var(--rgb-cyan),0.06)", color: "var(--accent)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(var(--rgb-cyan),0.78)"; e.currentTarget.style.backgroundColor = "rgba(var(--rgb-cyan),0.11)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(var(--rgb-cyan),0.5)"; e.currentTarget.style.backgroundColor = "rgba(var(--rgb-cyan),0.06)"; }}
            >
              {t.nav.viewPdf}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
