/**
 * translations — composed bilingual dictionary for the whole site.
 *
 * Each surface owns one file under ./dictionaries that exports `{ ar, en }` with
 * its top-level namespace(s) inside. Here we merge them per language into the
 * flat `t` object that `useLanguage()` exposes (t.nav, t.hero, t.gallery, …).
 * Namespaces are unique across files, so the spread merge never collides.
 */
import { core } from "./dictionaries/core";
import { hero } from "./dictionaries/hero";
import { home } from "./dictionaries/home";
import { about } from "./dictionaries/about";
import { skills } from "./dictionaries/skills";
import { work } from "./dictionaries/work";
import { impact } from "./dictionaries/impact";
import { resume } from "./dictionaries/resume";
import { contact } from "./dictionaries/contact";
import { ask } from "./dictionaries/ask";

export const translations = {
  ar: {
    ...core.ar,
    ...hero.ar,
    ...home.ar,
    ...about.ar,
    ...skills.ar,
    ...work.ar,
    ...impact.ar,
    ...resume.ar,
    ...contact.ar,
    ...ask.ar,
  },
  en: {
    ...core.en,
    ...hero.en,
    ...home.en,
    ...about.en,
    ...skills.en,
    ...work.en,
    ...impact.en,
    ...resume.en,
    ...contact.en,
    ...ask.en,
  },
} as const;
