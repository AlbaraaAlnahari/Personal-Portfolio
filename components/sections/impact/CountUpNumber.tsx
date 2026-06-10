"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";

// =====================================================
// COUNT-UP NUMBER — a smooth one-shot metric counter for the Impact archive.
//
// Renders the FINAL value on the server and on the first client render, so
// hydration matches exactly and there is never a layout shift (the final
// width is always reserved). On the client, when the metric first scrolls
// into view, it animates from 0 → final once with an ease-out, then stops.
// `prefers-reduced-motion` (or an unparseable value) renders the final value
// immediately with no animation.
//
// Formatting is preserved verbatim: a leading affix (e.g. none), the numeric
// body (with optional thousands separator like "5,000"), and a trailing affix
// (e.g. "+", "%"). The visual is aria-hidden; a single screen-reader span
// announces the final value once (no intermediate-frame spam).
// =====================================================

// useLayoutEffect on the client (resets to 0 before paint → no final-value
// flash), useEffect on the server (avoids the SSR "does nothing" warning).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Parsed {
  prefix: string;
  suffix: string;
  target: number;
  grouped: boolean;
}

/** Split "5,000+" / "50%" / "6+" / "193+" / "5" into affixes + numeric target. */
function parseMetric(raw: string): Parsed | null {
  const m = /^(\D*)([\d,]+)(.*)$/.exec(raw);
  if (!m) return null;
  const target = parseInt(m[2].replace(/,/g, ""), 10);
  if (Number.isNaN(target)) return null;
  return { prefix: m[1], suffix: m[3], target, grouped: m[2].includes(",") };
}

const fmt = (n: number, grouped: boolean) =>
  grouped ? n.toLocaleString("en-US") : String(n);

export function CountUpNumber({
  value,
  durationMs = 1100,
  className,
  style,
}: {
  value: string;
  durationMs?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  // Stable across renders — recomputing inline would give a new object every
  // render and re-fire the effect mid-animation (cancelling its own rAF).
  const parsed = useMemo(() => parseMetric(value), [value]);
  const ref = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef(0);
  const startedRef = useRef(false);
  // Final value on SSR + first client render → hydration-safe.
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    // Unparseable or reduced motion → keep the final value, never animate.
    if (!parsed || reduce) return;
    const node = ref.current;
    if (!node) return;

    // Reset to the start before the browser paints (no final-value flash),
    // then count up once when the metric first enters the viewport.
    const zero = `${parsed.prefix}${fmt(0, parsed.grouped)}${parsed.suffix}`;
    setDisplay(zero);

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || startedRef.current) return;
        startedRef.current = true;
        io.disconnect();
        let start = 0;
        const tick = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min(1, (ts - start) / durationMs);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          setDisplay(
            `${parsed.prefix}${fmt(Math.round(eased * parsed.target), parsed.grouped)}${parsed.suffix}`
          );
          if (p < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [parsed, reduce, durationMs]);

  return (
    <span ref={ref} className={className} style={{ ...style, display: "inline-grid" }}>
      {/* width reservation — the final value always occupies its full width so
          the count-up never reflows neighbours (e.g. a label beside it) */}
      <span aria-hidden="true" style={{ gridArea: "1 / 1", visibility: "hidden" }}>
        {value}
      </span>
      {/* animated visual — hidden from assistive tech to avoid frame spam */}
      <span aria-hidden="true" style={{ gridArea: "1 / 1" }}>
        {display}
      </span>
      {/* the one value screen readers announce */}
      {parsed && <span className="sr-only">{value}</span>}
    </span>
  );
}
