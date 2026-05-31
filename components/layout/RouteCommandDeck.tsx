"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * RouteCommandDeck — the ALBARAA OS "INDEX" navigation.
 *
 * Replaces the conventional always-visible route-link row with a single quiet
 * INDEX trigger that opens a curated exhibition-style route index (a route
 * command deck). The Home scenes are the primary visual gateways; this panel
 * is the precise, accessible jump-to-chapter control on every route.
 *
 * Accessibility: dialog role, focus moves into the panel on open and returns to
 * the trigger on close, Escape + backdrop + close-button dismissal, a simple
 * Tab focus loop, body scroll lock, aria-current on the active route, and a
 * fully static render under prefers-reduced-motion. No new dependencies.
 *
 * Colours are applied inline because this project's Tailwind colour tokens do
 * not emit working utilities (accent-cyan etc. resolve to inherited/transparent).
 */

type RouteKey = "home" | "profile" | "work" | "impact" | "resume" | "contact";
type Route = { n: string; key: RouteKey; href: string };

// Core chapters — the curated route map of the portfolio. Titles/descriptions
// are resolved per-language from the deck dictionary (t.deck.routes[key]).
const CORE_ROUTES: Route[] = [
  { n: "01", key: "profile", href: "/about" },
  { n: "02", key: "work", href: "/work" },
  { n: "03", key: "impact", href: "/impact" },
  { n: "04", key: "resume", href: "/resume" },
  { n: "05", key: "contact", href: "/contact" },
];

// Home is surfaced first only when the visitor is on an interior route.
const HOME_ROUTE: Route = { n: "00", key: "home", href: "/" };

const isActiveRoute = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

function RouteRow({
  route,
  active,
  onNavigate,
}: {
  route: Route;
  active: boolean;
  onNavigate: () => void;
}) {
  const { t } = useLanguage();
  const [lit, setLit] = useState(false);
  const bright = active || lit;
  const { title, desc } = t.deck.routes[route.key];
  return (
    <li className="border-t first:border-t-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <Link
        href={route.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        onMouseEnter={() => setLit(true)}
        onMouseLeave={() => setLit(false)}
        onFocus={() => setLit(true)}
        onBlur={() => setLit(false)}
        className="ie-focus grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-2 py-3.5 outline-none transition-colors duration-200"
        style={{ backgroundColor: lit ? "rgba(var(--rgb-cyan),0.05)" : "transparent" }}
      >
        {/* number + route port */}
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: bright ? "rgba(var(--rgb-cyan),0.9)" : "rgba(var(--rgb-muted),0.3)",
              boxShadow: active ? "0 0 6px rgba(var(--rgb-cyan),0.85)" : "none",
            }}
          />
          <span
            className="font-mono text-sm tabular-nums transition-colors duration-200"
            style={{ color: bright ? "var(--accent)" : "var(--text-muted)" }}
          >
            {route.n}
          </span>
        </span>

        {/* destination */}
        <span className="min-w-0">
          <span
            className="block text-base font-semibold leading-tight transition-colors duration-200 sm:text-lg"
            style={{ color: bright ? "var(--accent)" : "var(--color-foreground)" }}
          >
            {title}
          </span>
          <span className="mt-0.5 block truncate text-xs" style={{ color: "var(--text-muted)" }}>
            {desc}
          </span>
        </span>

        {/* current marker or routed arrow */}
        {active ? (
          <span
            className="rounded px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em]"
            style={{ color: "var(--accent)", border: "1px solid rgba(var(--rgb-cyan),0.35)" }}
          >
            {t.deck.current}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="transition-transform duration-200"
            style={{ color: lit ? "var(--accent)" : "var(--text-muted)", transform: lit ? "translateX(2px)" : "none" }}
          >
            →
          </span>
        )}
      </Link>
    </li>
  );
}

export function RouteCommandDeck({
  onOpenChange,
}: {
  /** Notifies the parent header when the INDEX panel opens/closes so it can
   *  hold its surfaced (protective) state while the deck is open. Optional —
   *  the deck stays fully standalone-usable without it. */
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [triggerLit, setTriggerLit] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Mirror open-state up to the header (kept in an effect so it fires for every
  // path that toggles `open`: trigger, Escape, backdrop, close button, navigate).
  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  // Lock background scroll (the page scroller is <body>) and move focus into
  // the panel when it opens; restore both when it closes.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  // Escape to close + a simple, robust Tab focus loop inside the panel.
  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close(true);
      return;
    }
    if (e.key !== "Tab") return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const routes = pathname === "/" ? CORE_ROUTES : [HOME_ROUTE, ...CORE_ROUTES];

  return (
    <>
      {/* INDEX trigger — quiet, instrumental, present on every route */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setTriggerLit(true)}
        onMouseLeave={() => setTriggerLit(false)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="route-command-deck"
        className="ie-focus inline-flex items-center gap-2 rounded-lg px-3 py-1.5 outline-none transition-colors duration-300"
        style={{
          border: `1px solid ${triggerLit ? "rgba(var(--rgb-cyan),0.4)" : "var(--border-idle)"}`,
          backgroundColor: "rgba(255,255,255,0.02)",
          color: triggerLit ? "var(--accent)" : "rgba(var(--rgb-body),0.85)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          style={{ color: triggerLit ? "var(--accent)" : "rgba(var(--rgb-cyan),0.75)" }}
        >
          <circle cx="2.5" cy="3.5" r="1.1" fill="currentColor" />
          <circle cx="2.5" cy="10.5" r="1.1" fill="currentColor" />
          <line x1="6" y1="3.5" x2="12.5" y2="3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="6" y1="10.5" x2="12.5" y2="10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span className="font-mono text-xs tracking-[0.2em]">{t.deck.trigger}</span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="route-deck"
                className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
                style={{ backgroundColor: "rgba(4,6,15,0.85)", backdropFilter: "blur(4px)" }}
                onClick={() => close(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
              >
                <motion.div
                  id="route-command-deck"
                  ref={panelRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="route-deck-title"
                  tabIndex={-1}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={onPanelKeyDown}
                  className="t-surface relative z-[1] mt-16 w-full max-w-lg overflow-hidden rounded-2xl p-5 outline-none sm:mt-20 sm:p-7"
                  style={{
                    backgroundColor: "rgba(10,14,28,0.96)",
                    border: "1px solid var(--border-idle)",
                    boxShadow: "0 30px 90px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(var(--rgb-cyan),0.06)",
                  }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ duration: reduce ? 0 : 0.22, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* top routed accent */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(to right, transparent, rgba(var(--rgb-cyan),0.55), transparent)" }}
                  />

                  {/* Header */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 8px rgba(var(--rgb-cyan),0.8)" }}
                      />
                      <span
                        id="route-deck-title"
                        className="font-mono text-[11px] tracking-[0.26em]"
                        style={{ color: "rgba(var(--rgb-cyan),0.85)" }}
                      >
                        {t.deck.header.lead} <span style={{ color: "var(--text-muted)" }}>{t.deck.header.trail}</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => close(true)}
                      aria-label={t.deck.closeAria}
                      className="ie-focus -mr-1 grid h-8 w-8 place-items-center rounded-lg outline-none transition-colors"
                      style={{ color: "var(--text-body)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div
                    aria-hidden="true"
                    className="mt-4 mb-1 h-px"
                    style={{ background: "linear-gradient(to right, rgba(var(--rgb-cyan),0.25), var(--border), transparent)" }}
                  />

                  {/* Route list */}
                  <ul>
                    {routes.map((r) => (
                      <RouteRow
                        key={r.href}
                        route={r}
                        active={isActiveRoute(pathname, r.href)}
                        onNavigate={() => close(false)}
                      />
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
