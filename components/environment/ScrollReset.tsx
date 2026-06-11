"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollReset — guarantees every client route change lands at the true top.
 *
 * This site makes <body> the scroll container (globals.css: html,body{height:100%}
 * with overflow-x:hidden, which computes overflow-y to `auto`), so the live scroll
 * position lives on document.body — NOT the window/documentElement that the App
 * Router's scroll-to-top and the browser's `scrollRestoration` act on. On mobile
 * that left navigations occasionally landing below the top, tucking the first
 * heading under the fixed header. We take ownership of scroll restoration
 * (`manual`) and reset the body scroller (plus window/documentElement
 * defensively) to the top on every pathname change.
 *
 * Hash navigations (e.g. /resume#resume, #projects) are skipped so in-page anchor
 * links still reach their target — the global `scroll-padding-top` keeps anchors
 * clear of the fixed header. Headless: renders null, no UI, no layout shift,
 * instant (reduced-motion safe). The route transition's opacity fade masks the
 * reset, so there is no visible jump.
 */
export function ScrollReset() {
  const pathname = usePathname();

  // Own scroll restoration once: the browser's automatic restore targets the
  // viewport, not the <body> scroller, so it could re-apply a stale position.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Let in-page anchor links resolve their own scroll target.
    if (window.location.hash) return;
    // Reset the real scroller (<body>) and the viewport. Direct scrollTop
    // assignment is instant and bypasses the global `scroll-behavior: smooth`,
    // so navigation never shows an animated scroll-to-top.
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}
