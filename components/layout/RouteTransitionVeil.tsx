"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useThemeName } from "@/hooks/useThemeName";

// =====================================================
// ROUTE TRANSITION VEIL — the "ALBARAA OS opens a new dossier" scan.
//
// A brief, theme-aware overlay that plays on every client route change: a
// soft archival tint + a single cyan scan line that sweeps the content
// plane top→bottom, masking the page handoff without a hard loading screen.
//
// Lives inside the layout's `relative z-10` content stacking context, so it
// is ALWAYS below the fixed header (z-40) — the header never flickers. It is
// pointer-events-none and only present for ~480ms, so it never blocks
// interaction. It carries NO page backgrounds, so it never disturbs the
// page's own fixed blueprint field. Honors prefers-reduced-motion (renders
// nothing). Skips the very first mount (no veil on initial page load).
// =====================================================

const VEIL_MS = 480;

export function RouteTransitionVeil() {
  const pathname = usePathname();
  const warm = useThemeName() === "warm";
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    // Don't scan on the initial load — only on real route changes.
    if (first.current) {
      first.current = false;
      return;
    }
    // Under reduced motion the veil renders nothing — skip the timers entirely.
    if (reduce) return;
    setActive(true);
    const id = setTimeout(() => setActive(false), VEIL_MS);
    return () => clearTimeout(id);
  }, [pathname, reduce]);

  if (reduce) return null;

  const tint = warm
    ? "linear-gradient(to bottom, rgba(245,242,234,0.42), rgba(245,242,234,0.14))"
    : "linear-gradient(to bottom, rgba(8,11,22,0.5), rgba(8,11,22,0.16))";

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="route-veil"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
        >
          {/* archival tint */}
          <div className="absolute inset-0" style={{ background: tint }} />

          {/* soft panel glow that fades with the veil */}
          <div
            className="absolute inset-x-0 top-0 h-1/3"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 0%, rgba(var(--rgb-cyan),0.10), transparent 70%)",
            }}
          />

          {/* cyan scan line sweeping the content plane top → bottom */}
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(var(--rgb-cyan),0) 6%, rgba(var(--rgb-cyan),0.85) 50%, rgba(var(--rgb-cyan),0) 94%, transparent)",
              boxShadow: "0 0 18px rgba(var(--rgb-cyan),0.55)",
            }}
            initial={{ top: "-2%", opacity: 0 }}
            animate={{ top: "102%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
