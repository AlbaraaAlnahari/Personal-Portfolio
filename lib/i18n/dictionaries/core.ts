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
      about: "عن البراء",
      ask: "أسأل البراء AI",
      contact: "تواصل",
      viewPdf: "عرض السيرة الذاتية",
      logoAria: "البراء — الصفحة الرئيسية",
      routeContext: {
        about: "الهوية / السجل التشغيلي",
        work: "الأعمال / أنظمة مختارة",
        impact: "الأثر / إشارات قيادية",
        resume: "السيرة / الملف الرسمي",
        contact: "تواصل / خط مباشر",
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
      header: { lead: "فهرس المسارات", trail: "/ ALBARAA OS" },
      closeAria: "إغلاق فهرس المسارات",
      current: "الحالي",
      routes: {
        home: { title: "الرئيسية", desc: "محرّك الذكاء" },
        profile: { title: "الملف الشخصي", desc: "الهوية والقدرات" },
        work: { title: "أعمال مختارة", desc: "منتجات ذكية · DocuPilot" },
        impact: { title: "الأثر", desc: "قيادة وتنفيذ · +5,000 مشارك" },
        resume: { title: "السيرة الرسمية", desc: "ملف المسيرة المهنية ووثيقة PDF" },
        contact: { title: "تواصل", desc: "خط مباشر" },
      },
    },
    footer: {
      brandSentence: "باني منتجات ذكاء اصطناعي، ومهندس برمجيات، وصانع بعقلية المنتج.",
      navigateLabel: "تنقّل",
      directLineLabel: "خط مباشر",
      availabilityCopy: "متاح للفرص، والتعاون، والأحاديث الجادّة حول بناء المنتجات.",
      brandLogoAria: "ALBARAA — الرئيسية",
      copyright: "© 2026 ALBARAA. نُبنى بالأنظمة. ونُعرَّف بالأثر.",
      opensNewTab: "— يفتح في تبويب جديد",
      nav: {
        home: "الرئيسية",
        about: "عن البراء",
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
      viewPdf: "View PDF",
      logoAria: "البراء — ALBARAA Home",
      routeContext: {
        about: "PROFILE / OPERATOR RECORD",
        work: "WORK / SELECTED SYSTEMS",
        impact: "IMPACT / LEADERSHIP SIGNALS",
        resume: "RESUME / OFFICIAL DOSSIER",
        contact: "CONTACT / DIRECT LINE",
      },
      theme: {
        toNavy: "Switch to navy theme",
        toWarm: "Switch to warm cream theme",
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
        profile: { title: "Profile", desc: "Identity & Capabilities" },
        work: { title: "Selected Work", desc: "Intelligent Products · DocuPilot" },
        impact: { title: "Impact", desc: "Leadership & Deployment · 5,000+ Participants" },
        resume: { title: "Official Resume", desc: "Career Dossier & PDF Record" },
        contact: { title: "Contact", desc: "Direct Line" },
      },
    },
    footer: {
      brandSentence: "AI builder, software engineer, and product-minded creator.",
      navigateLabel: "NAVIGATE",
      directLineLabel: "DIRECT LINE",
      availabilityCopy: "Open to opportunities, collaborations, and product conversations.",
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
