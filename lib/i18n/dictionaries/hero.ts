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
        main: "أنا البراء",
        subtitle: {
          line1: "مبرمج، متحدث وملقي، مصور،",
          line2: "ومهتم جدًا بعالم الإدارة والبزنس.",
        },
      },
      paragraph:
        "طالب هندسة برمجيات، شغوف ببناء منتجات تعمل بالذكاء الاصطناعي وتعزيز قيمتها لدى الجميع لصناعة تجربة رقمية لا تُنسى وذات أثر دائم.",
      cta: {
        explore: "استكشف المشاريع",
        resume: "سيرتي الذاتية",
      },
      status: {
        desktop: "متاح للفرص",
        mobile: "متاح للفرص",
      },
      scroll: "استكشف",
      modulesLabel: "تنقّل",
      soon: "قريبًا",
      soonAria: "قريبًا على الخط",
    },
    modules: {
      about: {
        label: "عن البراء",
        subtitle: "الهوية",
        previewTitle: "عن البراء",
        previewDescription: "الهوية ومجالات التركيز والملف الهندسي.",
        previewAction: "نبذة عن البراء",
      },
      projects: {
        label: "المشاريع",
        subtitle: "الأنظمة",
        previewTitle: "المشاريع",
        previewDescription: "منتجات ذكاء اصطناعي وبرمجيات حقيقية قيد الاستخدام.",
        previewAction: "استكشف الأعمال",
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
        subtitle: "تواصل مباشر",
        previewTitle: "تواصل",
        previewDescription: "ابدأ محادثة أو تواصل مباشرة.",
        previewAction: "تواصل الآن",
      },
      terminal: {
        label: "أسأل البراء AI",
        subtitle: "المساعد",
        previewTitle: "أسأل البراء AI",
        previewDescription: "اسأل عن المشاريع، الخبرات، المهارات، أو طرق التعاون.",
        previewAction: "افتح أسأل البراء AI",
      },
    },
  },
  en: {
    hero: {
      eyebrow: "ALBARAA OS / INTELLIGENCE ENGINE",
      title: {
        main: "I AM ALBARAA",
        subtitle: {
          line1: "Programmer, speaker and presenter, photographer,",
          line2: "and deeply drawn to management and business.",
        },
      },
      paragraph:
        "A software engineering student passionate about building AI-powered products and amplifying their value for everyone — crafting digital experiences that are unforgettable and leave a lasting impact.",
      cta: {
        explore: "Explore Projects",
        resume: "View Résumé",
      },
      status: {
        desktop: "OPEN TO OPPORTUNITIES",
        mobile: "OPEN TO OPPORTUNITIES",
      },
      scroll: "EXPLORE",
      modulesLabel: "NAVIGATE",
      soon: "SOON",
      soonAria: "coming online soon",
    },
    modules: {
      about: {
        label: "ABOUT",
        subtitle: "IDENTITY",
        previewTitle: "About",
        previewDescription: "Identity, focus areas and engineering profile.",
        previewAction: "Open About",
      },
      projects: {
        label: "PROJECTS",
        subtitle: "SYSTEMS",
        previewTitle: "Projects",
        previewDescription: "Real AI and software products, shipped and in use.",
        previewAction: "Explore work",
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
        subtitle: "TOOLS",
        previewTitle: "Skills",
        previewDescription: "Tools, technologies and technical capabilities.",
        previewAction: "Inspect tools",
      },
      contact: {
        label: "CONTACT",
        subtitle: "DIRECT LINE",
        previewTitle: "Contact",
        previewDescription: "Start a conversation or reach out directly.",
        previewAction: "Reach out",
      },
      terminal: {
        label: "ASK ALBARAA AI",
        subtitle: "ASSISTANT",
        previewTitle: "Ask Albaraa AI",
        previewDescription:
          "Ask about projects, experience, skills, or ways to collaborate.",
        previewAction: "Open Ask Albaraa AI",
      },
    },
  },
} as const;
