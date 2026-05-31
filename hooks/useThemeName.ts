"use client";

import { useEffect, useState } from "react";

export type ThemeName = "navy" | "warm";

/**
 * useThemeName — reads the active site theme from `<html data-theme>` and
 * updates live when the header toggle flips it (via a MutationObserver on the
 * attribute). SSR-safe: it starts as "navy" — matching both the server render
 * and the no-flash bootstrap default — then syncs after mount, so theme-aware
 * assets (e.g. the warm-cream logo / illustrations) swap without a hydration
 * mismatch. Use only for asset swapping; pure color theming is handled by CSS
 * tokens, not this hook.
 */
export function useThemeName(): ThemeName {
  const [theme, setTheme] = useState<ThemeName>("navy");
  useEffect(() => {
    const read = () =>
      setTheme(document.documentElement.dataset.theme === "warm" ? "warm" : "navy");
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return theme;
}
