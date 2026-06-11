import type { Lang } from "./config";

/**
 * Localized SEO / document metadata (title + description) per route, in both
 * languages. Drives the browser tab, the SSR <title>/<meta description>, and the
 * Open Graph / Twitter title+description (via lib/i18n/serverMeta.ts), plus the
 * client tab-title updater (components/environment/DocumentTitleSync.tsx).
 *
 * Home carries the hybrid Arabic/English personal-brand identity
 * ("مساحة البراء النهاري - Albaraa Alnahari Space"); interior routes read as
 * clean branches ("<page> - Albaraa Alnahari"). These strings are the approved
 * copy — they are metadata only and never alter visible page content.
 */
export const PAGE_META = {
  "/": {
    title: {
      ar: "مساحة البراء النهاري - Albaraa Alnahari Space",
      en: "Albaraa Alnahari Space",
    },
    description: {
      ar: "لمحة من عالم البراء؛ مساحة شخصية تجمع الأعمال، المشاريع، الخبرات، السيرة الذاتية، مع منتجات وتجارب رقمية مبنية حول هندسة البرمجيات، الذكاء الاصطناعي، ادارة المشاريع و المنتجات، والأثر التقني.",
      en: "A glimpse into Albaraa's world — a personal space for selected work, projects, experience, resume, and contact, shaped by software engineering, AI products, product thinking, robotics, and technical impact.",
    },
  },
  "/about": {
    title: {
      ar: "نبذة عن البراء - Albaraa Alnahari",
      en: "About Albaraa - Albaraa Alnahari",
    },
    description: {
      ar: "نبذة عن البراء عبدالباري النهاري؛ طالب هندسة برمجيات يصنع منتجات وتجارب رقمية تجمع بين الذكاء الاصطناعي، التفكير المنتج، والقيادة التقنية.",
      en: "Learn about Albaraa Abdulbari Alnahari, a software engineering student building digital products shaped by AI, product thinking, and technical leadership.",
    },
  },
  "/work": {
    title: {
      ar: "الأعمال - Albaraa Alnahari",
      en: "Work - Albaraa Alnahari",
    },
    description: {
      ar: "أعمال ومشاريع البراء النهاري، تشمل منتجات ذكاء اصطناعي، تطبيقات ويب، منصات رقمية، وتجارب برمجية مبنية لحل مشكلات حقيقية.",
      en: "Explore Albaraa Alnahari's selected work, including AI products, web applications, digital platforms, and software experiences built for real problems.",
    },
  },
  "/impact": {
    title: {
      ar: "الأثر - Albaraa Alnahari",
      en: "Impact - Albaraa Alnahari",
    },
    description: {
      ar: "أثر البراء النهاري في البرامج التقنية، الروبوتات، المبادرات المجتمعية، والأنشطة القيادية داخل وخارج الجامعة.",
      en: "Explore Albaraa Alnahari's impact across technical programs, robotics, community initiatives, and leadership activities.",
    },
  },
  "/resume": {
    title: {
      ar: "السيرة الذاتية - Albaraa Alnahari",
      en: "Resume - Albaraa Alnahari",
    },
    description: {
      ar: "السيرة الذاتية للبراء النهاري، تشمل الخبرات، التعليم، المشاريع، المهارات التقنية، والإنجازات المهنية.",
      en: "View Albaraa Alnahari's resume, including experience, education, projects, technical skills, and professional achievements.",
    },
  },
  "/contact": {
    title: {
      ar: "تواصل - Albaraa Alnahari",
      en: "Contact - Albaraa Alnahari",
    },
    description: {
      ar: "تواصل مع البراء النهاري لفرص العمل، التعاون، منتجات الذكاء الاصطناعي، إدارة المشاريع، أو المبادرات التقنية.",
      en: "Contact Albaraa Alnahari for opportunities, collaborations, AI products, project management, or technical initiatives.",
    },
  },
  "/ask": {
    title: {
      ar: "اسأل البراء AI - Albaraa Alnahari",
      en: "Ask Albaraa AI - Albaraa Alnahari",
    },
    description: {
      ar: "اسأل البراء AI عن مشاريع البراء النهاري، خبراته، مهاراته، أثره، وسيرته الذاتية من خلال مساعد محلي مبني على بيانات الموقع.",
      en: "Ask Albaraa AI about Albaraa Alnahari's projects, experience, skills, impact, and resume through a local portfolio assistant.",
    },
  },
} satisfies Record<
  string,
  { title: { ar: string; en: string }; description: { ar: string; en: string } }
>;

export type PageRoute = keyof typeof PAGE_META;

/**
 * Localized title for a pathname, or null for routes we do not manage (404,
 * experimental) so their own title is left untouched. Used client-side.
 */
export function titleForPath(pathname: string, lang: Lang): string | null {
  const key =
    pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const entry = (PAGE_META as Record<string, { title: { ar: string; en: string } }>)[
    key
  ];
  return entry ? entry.title[lang] : null;
}
