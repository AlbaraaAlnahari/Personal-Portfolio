/**
 * i18n configuration — language identity, persistence keys, and direction.
 *
 * Arabic is the product default (first visit with no saved preference renders
 * Arabic / RTL). The selected language is persisted to BOTH localStorage (the
 * spec-mandated `albaraa-language` key) and a same-named cookie; the cookie lets
 * the server render the correct language and `<html lang/dir>` on first paint,
 * so there is no language flash and no hydration mismatch.
 */

export type Lang = "ar" | "en";
export type Dir = "rtl" | "ltr";

/** localStorage key + cookie name (kept identical, per spec). */
export const LANG_STORAGE_KEY = "albaraa-language";

/** Arabic-first: the default when no saved preference exists. */
export const DEFAULT_LANG: Lang = "ar";

export function isLang(value: unknown): value is Lang {
  return value === "ar" || value === "en";
}

export function dirFor(lang: Lang): Dir {
  return lang === "ar" ? "rtl" : "ltr";
}

/** Normalise any persisted value into a valid Lang, defaulting to Arabic. */
export function normalizeLang(value: unknown): Lang {
  return isLang(value) ? value : DEFAULT_LANG;
}
