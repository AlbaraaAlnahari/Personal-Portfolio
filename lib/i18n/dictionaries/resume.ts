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

      // Viewer chrome only — the CV document body lives in (and exactly
      // mirrors the official PDF inside) ResumePreviewViewer.tsx. The PDF is an
      // English document, so the rendered sheet is English in both languages;
      // only these action/labels stay localized so the page reads coherently.
      preview: {
        window: "Albaraa-Alnahari-Resume.pdf",
        documentTag: "السيرة · PDF",
        open: "فتح السيرة",
        download: "تنزيل السيرة",
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

      // Viewer chrome only — the CV document body lives in (and exactly
      // mirrors the official PDF inside) ResumePreviewViewer.tsx.
      preview: {
        window: "Albaraa-Alnahari-Resume.pdf",
        documentTag: "RÉSUMÉ · PDF",
        open: "Open CV",
        download: "Download CV",
      },
    },
  },
} as const;
