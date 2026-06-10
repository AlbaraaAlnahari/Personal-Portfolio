"use client";

import { useEffect } from "react";

/**
 * FaviconThemeSync — keeps the browser-tab favicon in step with the active
 * THEME (navy ⇄ warm). It does not own any UI; it mutates the existing
 * <link rel="icon"> href to /favicon-navy.svg or /favicon-warm.svg.
 *
 * Source of truth is `document.documentElement[data-theme]` — the same
 * attribute the no-flash bootstrap and the ThemeToggle set — so this reacts to
 * a theme change however it happens, with no page refresh. The pre-paint
 * bootstrap script already points the icon at the correct variant before
 * hydration; this effect re-asserts it on mount and on every subsequent toggle.
 */
export function FaviconThemeSync() {
  useEffect(() => {
    const apply = () => {
      const theme = document.documentElement.dataset.theme === "warm" ? "warm" : "navy";
      const href = `/favicon-${theme}.svg`;
      // Set EVERY icon link to the active variant. Next's app/icon.svg
      // convention can leave a second, unmanaged <link rel="icon"> in the head
      // (re-inserted during hydration); pointing them all at the same themed
      // file guarantees the tab shows the correct icon regardless of which the
      // browser picks. Create one if somehow none exist.
      let links = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]')
      );
      if (links.length === 0) {
        const link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
        links = [link];
      }
      for (const link of links) {
        if (link.getAttribute("href") !== href) {
          link.setAttribute("type", "image/svg+xml");
          link.setAttribute("href", href);
        }
      }
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
