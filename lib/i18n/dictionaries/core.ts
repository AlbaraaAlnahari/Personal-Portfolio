/**
 * core — shared chrome copy: header navigation, the INDEX route deck, and the
 * site footer. Authored as the canonical terminology source for the whole site
 * (see the glossary in lib/i18n/dictionaries/README.md): every surface follows
 * these Arabic choices (الرئيسية / عن البراء / الأعمال / الأثر / السيرة الذاتية /
 * تواصل). English values are byte-faithful to the approved design.
 */
export const core = {
  ar: {
    nav: {
      home: "الرئيسية",
      about: "نبذة عن البراء",
      ask: "أسأل البراء AI",
      contact: "تواصل",
      viewPdf: "عرض السيرة الذاتية",
      logoAria: "البراء — الصفحة الرئيسية",
      routeContext: {
        about: "نبذة عن البراء",
        work: "أعمال مختارة",
        impact: "الأثر",
        resume: "السيرة الذاتية",
        contact: "تواصل",
      },
      theme: {
        toNavy: "التبديل إلى المظهر الداكن",
        toWarm: "التبديل إلى المظهر الفاتح",
      },
      language: {
        switchLabel: "التبديل إلى الإنجليزية",
        shortLabel: "EN",
      },
    },
    deck: {
      trigger: "القائمة",
      header: { lead: "المسارات", trail: "/ ALBARAA OS" },
      closeAria: "إغلاق فهرس المسارات",
      current: "الحالي",
      routes: {
        home: { title: "الرئيسية", desc: "محرّك الذكاء" },
        profile: { title: "نبذة عن البراء", desc: "نبذة ومهارات" },
        work: { title: "أعمال مختارة", desc: "منتجات ذكية · DocuPilot" },
        impact: { title: "الأثر", desc: "قيادة وتنفيذ · +5,000 مشارك" },
        resume: { title: "السيرة الذاتية", desc: "السيرة الكاملة وملف PDF" },
        contact: { title: "تواصل", desc: "راسلني مباشرة" },
      },
    },
    footer: {
      brandSentence: "أبني منتجات ذكاء اصطناعي وتجارب برمجية بعقلية المنتج.",
      navigateLabel: "تنقّل",
      directLineLabel: "خط مباشر",
      availabilityCopy: "متاح للفرص، والتعاون، والأحاديث الجادّة حول بناء المنتجات.",
      brandLogoAria: "ALBARAA — الرئيسية",
      copyright: "© 2026 ALBARAA. نُبنى بالأنظمة. ونُعرَّف بالأثر.",
      opensNewTab: "— يفتح في تبويب جديد",
      nav: {
        home: "الرئيسية",
        about: "نبذة عن البراء",
        work: "الأعمال",
        impact: "الأثر",
        resume: "السيرة الذاتية",
        contact: "تواصل",
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      ask: "Ask Albaraa AI",
      contact: "Contact",
      viewPdf: "View Résumé",
      logoAria: "ALBARAA — Home",
      routeContext: {
        about: "About",
        work: "Selected Work",
        impact: "Impact",
        resume: "Résumé",
        contact: "Contact",
      },
      theme: {
        toNavy: "Switch to dark theme",
        toWarm: "Switch to light theme",
      },
      language: {
        switchLabel: "Switch language to Arabic",
        shortLabel: "ع",
      },
    },
    deck: {
      trigger: "INDEX",
      header: { lead: "ROUTE INDEX", trail: "/ ALBARAA OS" },
      closeAria: "Close route index",
      current: "CURRENT",
      routes: {
        home: { title: "Home", desc: "Intelligence Engine" },
        profile: { title: "About", desc: "Bio & Skills" },
        work: { title: "Selected Work", desc: "Intelligent Products · DocuPilot" },
        impact: {
          title: "Impact",
          desc: "Leadership & Deployment · 5,000+ Participants",
        },
        resume: { title: "Résumé", desc: "Full résumé & PDF" },
        contact: { title: "Contact", desc: "Message me directly" },
      },
    },
    footer: {
      brandSentence:
        "I build AI products and software experiences with a product mindset.",
      navigateLabel: "NAVIGATE",
      directLineLabel: "DIRECT LINE",
      availabilityCopy:
        "Available for opportunities, collaborations, and serious conversations around building products.",
      brandLogoAria: "ALBARAA — Home",
      copyright: "© 2026 ALBARAA. Built through systems. Defined by impact.",
      opensNewTab: "— opens in a new tab",
      nav: {
        home: "Home",
        about: "About",
        work: "Work",
        impact: "Impact",
        resume: "Résumé",
        contact: "Contact",
      },
    },
  },
} as const;
