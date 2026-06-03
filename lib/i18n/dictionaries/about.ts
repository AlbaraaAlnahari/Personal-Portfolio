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
      eyebrow: "عن البراء / وحدة الهوية",
      heading: {
        lead: "أصنع من",
        accent: "الأفكار",
        trail: "منتجاتٍ في متناول الناس.",
      },
      portraitAlt: "صورة البراء النهاري",
      identityName: "البراء النهاري",
      identityProfileLabel: "الملف التعريفي",
      identityVerifiedLine1: "الهوية",
      identityVerifiedLine2: "موثّقة",
      profileSummaryLabel: "الملف الشخصي",
      idCode: "ID / 001",
      bio:
        "البراء النهاري طالب هندسة برمجيات يركّز على بناء منتجات تعمل بالذكاء الاصطناعي، وتطبيقات متكاملة حديثة، وتجارب قائمة على الروبوتات، وأنظمة رقمية قابلة للتوسّع. يجمع عمله بين هندسة البرمجيات والتفكير المنتَجي وأبحاث المستخدم والقيادة التقنية ليحوّل الأفكار الطموحة إلى منتجات عملية.",
      focusAreasIndex: "01",
      focusAreasLabel: "مجالات التركيز",
      technologiesIndex: "02",
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
        neural: "العصبي:",
        coherence: "التماسك:",
        version: "AIOS v4.2",
        label: "ملف هولوجرامي",
      },
      preview: {
        moduleLabel: "وحدة الهوية",
        name: "البراء النهاري",
        role: "هوية الملف الشخصي",
        open: "افتح عن البراء ←",
      },
    },
  },
  en: {
    about: {
      eyebrow: "ABOUT / IDENTITY MODULE",
      heading: {
        lead: "Turning",
        accent: "intelligence",
        trail: "into systems people can use.",
      },
      portraitAlt: "Portrait of Albaraa Alnahari",
      identityName: "ALBARAA ALNAHARI",
      identityProfileLabel: "IDENTITY PROFILE",
      identityVerifiedLine1: "IDENTITY",
      identityVerifiedLine2: "VERIFIED",
      profileSummaryLabel: "PROFILE SUMMARY",
      idCode: "ID / 001",
      bio:
        "Albaraa Alnahari is a Software Engineering student focused on building AI-enabled products, modern full-stack applications, robotics-driven experiences, and scalable digital systems. His work combines software engineering, product thinking, user research, and technical leadership to turn ambitious ideas into practical products.",
      focusAreasIndex: "01",
      focusAreasLabel: "FOCUS AREAS",
      technologiesIndex: "02",
      technologiesLabel: "TECHNOLOGIES",
      expertise: {
        aiProducts: "AI-enabled products",
        fullStack: "Full-stack development",
        robotics: "Robotics",
        userResearch: "User research",
        leadership: "Technical leadership",
        scalable: "Scalable web systems",
      },
      downloadResume: "Download Resume",
      getInTouch: "Get In Touch",
      holo: {
        neural: "Neural:",
        coherence: "Coherence:",
        version: "AIOS v4.2",
        label: "HOLO. PROFILE",
      },
      preview: {
        moduleLabel: "IDENTITY MODULE",
        name: "Albaraa Alnahari",
        role: "Profile Identity",
        open: "Open About →",
      },
    },
  },
} as const;
