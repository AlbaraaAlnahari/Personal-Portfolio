/**
 * hero — the Intelligence Engine hero surface plus its six neural command
 * modules. Namespaces: `hero` (eyebrow, identity, copy, CTAs, status, scroll,
 * mobile console chrome) and `modules` (per-module copy keyed by stable id:
 * about / projects / experience / skills / contact / terminal). Brand and
 * product tokens (ALBARAA, ALBARAA OS, DocuPilot) and tech names stay Latin.
 * English values are byte-faithful to the current source components.
 */
export const hero = {
  ar: {
    hero: {
      // Intentionally empty in Arabic — the "ALBARAA OS / …" micro label is
      // hidden in Arabic mode (the hero component skips an empty eyebrow).
      eyebrow: "",
      title: {
        main: "البراء",
        subtitle: {
          line1: "مهتم ببناء منتجات الذكاء الاصطناعي",
          line2: "وهندسة البرمجيات",
        },
      },
      paragraph:
        "أنا البراء، طالب هندسة برمجيات، شغوف ببناء منتجات تعمل بالذكاء الاصطناعي وتعزيز قيمتها لدى الجميع لصناعة تجربة رقمية لا تُنسى وذات أثر دائم.",
      cta: {
        explore: "استكشف المشاريع",
        resume: "عرض السيرة الذاتية",
      },
      status: {
        desktop: "النظام يعمل / متاح للفرص",
        mobile: "النظام يعمل / متاح",
      },
      scroll: "استكشف",
      modulesLabel: "وحدات عصبية",
      soon: "قريبًا",
      soonAria: "قريبًا على الخط",
    },
    modules: {
      about: {
        label: "عن البراء",
        subtitle: "الهوية",
        previewTitle: "عن البراء",
        previewDescription: "الهوية ومجالات التركيز والملف الهندسي.",
        previewAction: "افتح وحدة الهوية",
      },
      projects: {
        label: "المشاريع",
        subtitle: "الأنظمة",
        previewTitle: "المشاريع",
        previewDescription: "أنظمة ذكاء اصطناعي وبرمجيات مُطلقة لاستخدام حقيقي.",
        previewAction: "استكشف الأنظمة",
      },
      experience: {
        label: "الخبرة",
        subtitle: "المسار الزمني",
        previewTitle: "الخبرة",
        previewDescription: "الأدوار والمحطّات ورحلة الهندسة التطبيقية.",
        previewAction: "اعرض المسار الزمني",
      },
      skills: {
        label: "المهارات",
        subtitle: "الأدوات",
        previewTitle: "المهارات",
        previewDescription: "الأدوات والتقنيات والقدرات التقنية.",
        previewAction: "افحص الأدوات",
      },
      contact: {
        label: "تواصل",
        subtitle: "الإشارة",
        previewTitle: "تواصل",
        previewDescription: "ابدأ محادثة أو افتح قناة تواصل.",
        previewAction: "أرسل إشارة",
      },
      terminal: {
        label: "أسأل البراء AI",
        subtitle: "الأوامر",
        previewTitle: "الطرفية",
        previewDescription:
          "طبقة أوامر تفاعلية لاستكشاف المحفظة. قيد المعايرة — على الخط قريبًا.",
        previewAction: "قريبًا على الخط",
      },
    },
  },
  en: {
    hero: {
      eyebrow: "ALBARAA OS / INTELLIGENCE ENGINE",
      title: {
        main: "ALBARAA",
        subtitle: {
          line1: "AI Builder &",
          line2: "Software Engineer",
        },
      },
      paragraph:
        "Software Engineering Student crafting AI-powered products and modern digital experiences.",
      cta: {
        explore: "Explore Projects",
        resume: "View Resume",
      },
      status: {
        desktop: "SYSTEM ONLINE / OPEN TO OPPORTUNITIES",
        mobile: "SYSTEM ONLINE / AVAILABLE",
      },
      scroll: "EXPLORE",
      modulesLabel: "NEURAL MODULES",
      soon: "SOON",
      soonAria: "coming online soon",
    },
    modules: {
      about: {
        label: "ABOUT",
        subtitle: "IDENTITY",
        previewTitle: "About",
        previewDescription: "Identity, focus areas and engineering profile.",
        previewAction: "Open identity module",
      },
      projects: {
        label: "PROJECTS",
        subtitle: "SYSTEMS",
        previewTitle: "Projects",
        previewDescription: "Deployed AI and software systems built for real use.",
        previewAction: "Explore systems",
      },
      experience: {
        label: "EXPERIENCE",
        subtitle: "TIMELINE",
        previewTitle: "Experience",
        previewDescription: "Roles, milestones and applied engineering journey.",
        previewAction: "View timeline",
      },
      skills: {
        label: "SKILLS",
        subtitle: "STACK",
        previewTitle: "Skills",
        previewDescription: "Tools, technologies and technical capabilities.",
        previewAction: "Inspect stack",
      },
      contact: {
        label: "CONTACT",
        subtitle: "SIGNAL",
        previewTitle: "Contact",
        previewDescription: "Start a conversation or establish a connection.",
        previewAction: "Send signal",
      },
      terminal: {
        label: "TERMINAL",
        subtitle: "COMMAND",
        previewTitle: "Terminal",
        previewDescription:
          "Interactive command layer for exploring the portfolio. Calibrating — online soon.",
        previewAction: "Coming online",
      },
    },
  },
} as const;
