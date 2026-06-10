/**
 * about — the About / Identity surface: the holographic identity portrait,
 * profile summary, focus areas, technologies, and the About node preview.
 * Arabic follows the canonical glossary (see lib/i18n/dictionaries/README.md):
 * عن البراء / الهوية / الملف الشخصي / القدرات / المهارات. Brand & tech tokens
 * (ALBARAA, React, Next.js, Python …) stay Latin in both languages. English
 * values are byte-faithful to the approved source.
 */
export const about = {
  ar: {
    about: {
      eyebrow: "نبذة عن البراء",
      heading: {
        lead: "أصنع من",
        accent: "الأفكار",
        trail: "منتجاتٍ في متناول الناس.",
      },
      portraitAlt: "صورة البراء النهاري",
      identityName: "البراء النهاري",
      identityProfileLabel: "طالب هندسة برمجيات",
      profileSummaryLabel: "الملف الشخصي",
      idCode: "",
      bio: "البراء النهاري طالب هندسة برمجيات يركّز على بناء منتجات تعمل بالذكاء الاصطناعي، وتطبيقات متكاملة حديثة، وتجارب قائمة على الروبوتات، وأنظمة رقمية قابلة للتوسّع. يجمع عمله بين هندسة البرمجيات والتفكير المنتَجي وأبحاث المستخدم والقيادة التقنية ليحوّل الأفكار الطموحة إلى منتجات عملية.",
      focusAreasIndex: "",
      focusAreasLabel: "مجالات التركيز",
      technologiesIndex: "",
      technologiesLabel: "التقنيات",
      expertise: {
        aiProducts: "منتجات تعمل بالذكاء الاصطناعي",
        fullStack: "تطوير متكامل",
        robotics: "روبوتات",
        userResearch: "أبحاث المستخدم",
        leadership: "قيادة تقنية",
        scalable: "أنظمة ويب قابلة للتوسّع",
      },
      downloadResume: "تنزيل السيرة الذاتية",
      getInTouch: "خلّنا نتواصل",
      holo: {
        neural: "",
        coherence: "",
        version: "",
        label: "",
      },
      preview: {
        moduleLabel: "نبذة عن البراء",
        name: "البراء النهاري",
        role: "طالب هندسة برمجيات",
        open: "افتح عن البراء ←",
      },
    },
  },
  en: {
    about: {
      eyebrow: "ABOUT",
      heading: {
        lead: "I turn",
        accent: "ideas",
        trail: "into products people can actually use.",
      },
      portraitAlt: "Portrait of Albaraa Alnahari",
      identityName: "ALBARAA ALNAHARI",
      identityProfileLabel: "Software Engineering Student",
      profileSummaryLabel: "PROFILE",
      idCode: "",
      bio: "Albaraa Alnahari is a Software Engineering student focused on building AI-powered products, modern full-stack applications, robotics-driven experiences, and scalable digital systems. His work combines software engineering, product thinking, user research, and technical leadership to turn ambitious ideas into practical products.",
      focusAreasIndex: "",
      focusAreasLabel: "FOCUS AREAS",
      technologiesIndex: "",
      technologiesLabel: "TECHNOLOGIES",
      expertise: {
        aiProducts: "AI-powered products",
        fullStack: "Full-stack development",
        robotics: "Robotics",
        userResearch: "User research",
        leadership: "Technical leadership",
        scalable: "Scalable web systems",
      },
      downloadResume: "Download Résumé",
      getInTouch: "Let's Connect",
      holo: {
        neural: "",
        coherence: "",
        version: "",
        label: "",
      },
      preview: {
        moduleLabel: "ABOUT",
        name: "Albaraa Alnahari",
        role: "Software Engineering Student",
        open: "Open About →",
      },
    },
  },
} as const;
