"use client";

/**
 * LanguageProvider / useLanguage — the real Arabic ⇄ English language system.
 *
 * The server seeds `initialLang` from the `albaraa-language` cookie (Arabic when
 * absent), so the provider's first client render matches the server payload —
 * no flash, no hydration mismatch. Switching language updates React state, flips
 * `<html lang/dir>` live, and persists to localStorage + cookie. A mount-time
 * reconcile adopts a localStorage choice that the cookie missed (e.g. a value
 * saved before cookie mirroring existed).
 *
 * Components read everything from `useLanguage()`:
 *   const { t, isAr, dir, displayFont, toggle } = useLanguage();
 * `t` is the active-language dictionary (t.nav.home, t.hero.title.main, …) and
 * `displayFont` is "" in English / "font-ar-display" in Arabic — apply it to
 * heroic titles so Arabic uses Thmanyah Serif Display.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type Dir,
  type Lang,
  DEFAULT_LANG,
  LANG_STORAGE_KEY,
  dirFor,
  isLang,
} from "./config";
import { translations } from "./translations";

type Dictionary = (typeof translations)[Lang];

interface LanguageContextValue {
  lang: Lang;
  dir: Dir;
  isAr: boolean;
  /** Active-language dictionary. */
  t: Dictionary;
  setLang: (next: Lang) => void;
  toggle: () => void;
  /** "" in English, "font-ar-display" in Arabic — for heroic display titles. */
  displayFont: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function persist(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage unavailable — the in-session toggle still works */
  }
  try {
    // 1-year cookie so the server can render the right language with no flash.
    document.cookie = `${LANG_STORAGE_KEY}=${lang};path=/;max-age=31536000;samesite=lax`;
  } catch {
    /* cookies unavailable — localStorage still persists the choice */
  }
}

function syncDocument(lang: Lang) {
  const el = document.documentElement;
  el.lang = lang;
  el.dir = dirFor(lang);
}

export function LanguageProvider({
  initialLang = DEFAULT_LANG,
  children,
}: {
  initialLang?: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const applyLang = useCallback((next: Lang) => {
    setLangState(next);
    syncDocument(next);
    persist(next);
  }, []);

  const setLang = useCallback(
    (next: Lang) => {
      setLangState((prev) => {
        if (prev === next) return prev;
        syncDocument(next);
        persist(next);
        return next;
      });
    },
    [],
  );

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "ar" ? "en" : "ar";
      syncDocument(next);
      persist(next);
      return next;
    });
  }, []);

  // Reconcile with localStorage once on mount: adopt a saved choice the SSR
  // cookie missed, otherwise keep cookie + <html> in sync with the SSR value.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (isLang(stored)) {
        applyLang(stored);
        return;
      }
    } catch {
      /* ignore */
    }
    syncDocument(initialLang);
    persist(initialLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: dirFor(lang),
      isAr: lang === "ar",
      t: translations[lang],
      setLang,
      toggle,
      displayFont: lang === "ar" ? "font-ar-display" : "",
    }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
