"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { RouteTransitionVeil } from "./RouteTransitionVeil";

// =====================================================
// ROUTE TRANSITION — premium, clean page handoff for ALBARAA OS.
//
// Two cooperating layers:
//  1. RouteTransitionVeil — a brief theme-aware cyan scan that masks the
//     old→new swap (the cinematic "opening a new dossier" motion).
//  2. This wrapper — a keyed OPACITY-only fade of the new page.
//
// Why opacity only (no transform/blur on the wrapper): the interior pages
// render a `position: fixed` blueprint field INSIDE their content. A
// transform or filter on an ancestor would turn this wrapper into the
// containing block for those fixed layers and visibly mis-anchor them.
// Opacity creates no containing block, so the fixed field stays pinned to
// the viewport. The page's own per-section `whileInView` reveals (which
// re-fire because the key change remounts the subtree) supply the
// "content rises into place" motion — so the handoff still feels assembled
// without ever touching transform on the page shell.
//
// The first render does NOT animate (initial={false}) so initial paint /
// LCP is not delayed; only real client route changes fade. Honors
// prefers-reduced-motion (instant). Sits inside the layout's `relative z-10`
// content context, so the fixed header (z-40) is never affected.
// =====================================================

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const first = useRef(true);
  const isFirst = first.current;

  useEffect(() => {
    first.current = false;
  }, []);

  return (
    <>
      <RouteTransitionVeil />
      <motion.div
        key={pathname}
        data-route-transition
        initial={isFirst ? false : { opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: reduce ? 0.18 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
