/**
 * resume — the Verified Career Dossier surface: the resume interface header,
 * the identity dossier panel, the credential records ledger, the capability
 * signal bus, and the Official Resume Vault (PDF view/download actions).
 *
 * English values are byte-faithful to the current source. Arabic follows the
 * canonical glossary (السيرة الذاتية / هندسة البرمجيات / باني منتجات ذكاء
 * اصطناعي / مطوّر متكامل …). Brand/tech/PDF tokens stay Latin; the name renders
 * as "البراء النهاري" in Arabic.
 */
export const resume = {
  ar: {
    resume: {
      eyebrow: "ملف النظام / سجلّات موثّقة",
      heading: { lead: "ملف", accent: "المسيرة", trail: "الموثّق" },
      intro: "سيرة رسمية جاهزة للعرض والتنزيل، تجمع المسيرة والإنجازات الأساسية في ملف واحد.",

      previewLabel: "معاينة السيرة",
      previewCount: "لقطة حيّة",
      credentialsLabel: "سجلّات موثّقة",
      credentialsCount: "03 سجلّات",
      signalsLabel: "إشارات مهنية",
      signalsCount: "06 إشارات نشطة",

      identity: {
        dossierLabel: "ملف الهوية",
        idTag: "ID / 001",
        name: "البراء النهاري",
        role: "طالب هندسة برمجيات · مهتم بمنتجات الذكاء الاصطناعي · مطوّر يجمع بين البرمجة وإدارة المنتجات",
        locationLabel: "الموقع",
        location: "المملكة العربية السعودية",
        languagesLabel: "اللغات",
        languages: { arabic: "العربية", english: "الإنجليزية" },
        chipVerified: "هوية موثّقة",
        chipOnline: "السجلّ متصل",
      },

      verified: "موثّق",
      credPrefix: "CRED",

      credentials: {
        education: {
          kind: "التعليم",
          title: "بكالوريوس هندسة البرمجيات",
          organization: "University of Jeddah",
          date: "متوقّع 2027",
        },
        certification: {
          kind: "شهادة",
          title: "شهادة مهندس روبوتات",
          organization: "Smart Method",
          date: "2025",
        },
        achievement: {
          kind: "إنجاز",
          title: "المركز الأول — معسكر ابتكار الذكاء الاصطناعي",
          organization: "DocuPilot",
          date: "2026",
        },
      },

      competencies: {
        fullStack: "التطوير المتكامل",
        aiProduct: "تطوير منتجات مدعومة بالذكاء الاصطناعي",
        productResearch: "أبحاث المنتجات",
        robotics: "هندسة الروبوتات",
        systemsThinking: "التفكير المنظومي",
        techLeadership: "القيادة التقنية",
      },

      vault: {
        label: "السيرة الرسمية",
        tag: "VAULT / 00",
        authRoute: "AUTH ROUTE",
        pdfDocument: "PDF DOCUMENT",
        verifiedRecord: "سجلّ موثّق",
        supportLine: "السيرة الرسمية ضمن السجلّ — استعرضها في تبويب جديد أو نزّل النسخة الكاملة.",
        viewPdf: "عرض الـ PDF",
        download: "تنزيل السيرة الذاتية",
        viewAria: "استعراض السيرة الذاتية الرسمية بصيغة PDF في تبويب جديد",
        downloadAria: "تنزيل السيرة الذاتية الرسمية بصيغة PDF",
      },

      preview: {
        window: "Albaraa-Alnahari-Resume.pdf",
        documentTag: "السيرة الذاتية · PDF",
        open: "فتح",
        download: "تنزيل السيرة",
        roleLine:
          "طالب هندسة برمجيات · مهتم بمنتجات الذكاء الاصطناعي · أجمع بين البرمجة وإدارة المنتجات",
        contact: { email: "البريد", github: "GitHub", linkedin: "LinkedIn" },
        summaryTitle: "الملخص المهني",
        summaryBody:
          "طالب هندسة برمجيات يجمع بين بناء المنتجات، البرمجة، وإدارة التجارب المدعومة بالذكاء الاصطناعي، مع اهتمام بتحويل الأفكار إلى حلول عملية قابلة للاستخدام.",
        skillsTitle: "المهارات",
        skills: [
          "TypeScript", "React", "Next.js", "Tailwind CSS", "Python",
          "Java", "SQL", "Supabase", "AI APIs", "Product Research",
        ],
        projectsTitle: "مشاريع مختارة",
        projects: [
          { name: "DocuPilot", desc: "منصة عمليات أعمال بالذكاء الاصطناعي" },
          { name: "TechPath", desc: "مولّد خرائط طريق تعليمية بالذكاء الاصطناعي" },
          { name: "Sanadk", desc: "مساعد ذكي للتسوّق والتنقّل" },
          { name: "Slide-Mind", desc: "تحويل المحتوى التعليمي إلى بطاقات واختبارات قصيرة" },
        ],
        experienceTitle: "الخبرات",
        experience: [
          {
            role: "متدرّب في إدارة المنتجات — Soum",
            detail: "بحث المستخدم مع أكثر من 100 مستخدم، وحالات استخدام، ومقارنات سوقية لدعم قرارات المنتج.",
          },
          {
            role: "متدرّب في هندسة الروبوتات — Smart Method",
            detail: "بناء ذراع روبوتية مدعومة بالذكاء الاصطناعي ونموذج أولي لروبوت محادثة.",
          },
          {
            role: "قائد إدارة المشاريع — GDGoC UJ",
            detail: "تنظيم معسكر علم البيانات Google × GDSC ومبادرات تقنية واسعة النطاق.",
          },
        ],
        educationTitle: "التعليم والاعتمادات",
        education: [
          "بكالوريوس هندسة البرمجيات — University of Jeddah — متوقّع 2027",
          "شهادة مهندس روبوتات — Smart Method — 2025",
          "المركز الأول — معسكر ابتكار الذكاء الاصطناعي — DocuPilot — 2026",
        ],
        updated: "آخر تحديث · 2026",
      },
    },
  },
  en: {
    resume: {
      eyebrow: "SYSTEM DOSSIER / VERIFIED CREDENTIALS",
      heading: { lead: "Verified", accent: "Career", trail: "Dossier" },
      intro: "Verified professional record and official résumé access.",

      previewLabel: "RESUME PREVIEW",
      previewCount: "LIVE SNAPSHOT",
      credentialsLabel: "VERIFIED CREDENTIALS",
      credentialsCount: "03 RECORDS",
      signalsLabel: "CAPABILITY SIGNALS",
      signalsCount: "06 SIGNALS ONLINE",

      identity: {
        dossierLabel: "IDENTITY DOSSIER",
        idTag: "ID / 001",
        name: "Albaraa Alnahari",
        role: "Software Engineering Student · AI Builder · Full-Stack Developer",
        locationLabel: "LOCATION",
        location: "Saudi Arabia",
        languagesLabel: "LANGUAGES",
        languages: { arabic: "Arabic", english: "English" },
        chipVerified: "IDENTITY VERIFIED",
        chipOnline: "RECORD ONLINE",
      },

      verified: "Verified",
      credPrefix: "CRED",

      credentials: {
        education: {
          kind: "EDUCATION",
          title: "Bachelor of Software Engineering",
          organization: "University of Jeddah",
          date: "Expected 2027",
        },
        certification: {
          kind: "CERTIFICATION",
          title: "Robotics Engineer Certification",
          organization: "Smart Method",
          date: "2025",
        },
        achievement: {
          kind: "ACHIEVEMENT",
          title: "1st Place — AI Innovation Bootcamp",
          organization: "DocuPilot",
          date: "2026",
        },
      },

      competencies: {
        fullStack: "Full-Stack Development",
        aiProduct: "AI-Powered Product Development",
        productResearch: "Product Research",
        robotics: "Robotics Engineering",
        systemsThinking: "Systems Thinking",
        techLeadership: "Technical Leadership",
      },

      vault: {
        label: "OFFICIAL RESUME",
        tag: "VAULT / 00",
        authRoute: "AUTH ROUTE",
        pdfDocument: "PDF DOCUMENT",
        verifiedRecord: "VERIFIED RECORD",
        supportLine: "Official résumé on record — view it in a new tab or download the full version.",
        viewPdf: "View PDF",
        download: "Download Resume",
        viewAria: "View the official résumé PDF in a new tab",
        downloadAria: "Download the official résumé PDF",
      },

      preview: {
        window: "Albaraa-Alnahari-Resume.pdf",
        documentTag: "RÉSUMÉ · PDF",
        open: "Open",
        download: "Download CV",
        roleLine:
          "Software Engineering Student · AI Product Builder · Product-minded Developer",
        contact: { email: "Email", github: "GitHub", linkedin: "LinkedIn" },
        summaryTitle: "Professional Summary",
        summaryBody:
          "Software engineering student blending product building, programming, and AI-powered experiences — focused on turning ideas into practical, usable solutions.",
        skillsTitle: "Skills",
        skills: [
          "TypeScript", "React", "Next.js", "Tailwind CSS", "Python",
          "Java", "SQL", "Supabase", "AI APIs", "Product Research",
        ],
        projectsTitle: "Selected Projects",
        projects: [
          { name: "DocuPilot", desc: "AI business operations platform" },
          { name: "TechPath", desc: "AI learning roadmap generator" },
          { name: "Sanadk", desc: "Smart shopping & mobility assistant" },
          { name: "Slide-Mind", desc: "Turns study content into flashcards & quizzes" },
        ],
        experienceTitle: "Experience",
        experience: [
          {
            role: "Product Management Intern — Soum",
            detail: "User research with 100+ users, use cases, and market benchmarks to support product decisions.",
          },
          {
            role: "Robotics Engineering Intern — Smart Method",
            detail: "Built an AI-powered robotic arm and an AI chatbot prototype.",
          },
          {
            role: "Project Management Lead — GDGoC UJ",
            detail: "Organized the Google × GDSC Data Science Bootcamp and large-scale technical initiatives.",
          },
        ],
        educationTitle: "Education & Credentials",
        education: [
          "Bachelor of Software Engineering — University of Jeddah — Expected 2027",
          "Robotics Engineer Certification — Smart Method — 2025",
          "1st Place — AI Innovation Bootcamp — DocuPilot — 2026",
        ],
        updated: "Last updated · 2026",
      },
    },
  },
} as const;
