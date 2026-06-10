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
      eyebrow: "السيرة الذاتية",
      heading: { lead: "ملف", accent: "المسيرة", trail: "الموثّق" },
      intro:
        "سيرة رسمية جاهزة للعرض والتنزيل، تجمع المسيرة والإنجازات الأساسية في ملف واحد.",

      previewLabel: "معاينة السيرة",
      credentialsLabel: "التعليم والشهادات",
      credentialsCount: "03",
      signalsLabel: "القدرات التقنية",
      signalsCount: "06",

      identity: {
        dossierLabel: "نبذة عن البراء",
        name: "البراء النهاري",
        role: "طالب هندسة برمجيات · مهتم بمنتجات الذكاء الاصطناعي · مطوّر يجمع بين البرمجة وإدارة المنتجات",
        locationLabel: "الموقع",
        location: "المملكة العربية السعودية",
        languagesLabel: "اللغات",
        languages: { arabic: "العربية", english: "الإنجليزية" },
        chipOnline: "متاح للفرص",
      },

      verified: "موثّق",

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
        tag: "",
        authRoute: "",
        pdfDocument: "PDF",
        verifiedRecord: "موثّق",
        supportLine: "استعرض السيرة الرسمية في تبويب جديد أو نزّل النسخة الكاملة.",
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
      eyebrow: "RÉSUMÉ",
      heading: { lead: "Verified", accent: "Career", trail: "Dossier" },
      intro:
        "An official résumé ready to view and download, bringing my career and key achievements together in one file.",

      previewLabel: "RESUME PREVIEW",
      credentialsLabel: "EDUCATION & CREDENTIALS",
      credentialsCount: "03",
      signalsLabel: "TECHNICAL CAPABILITIES",
      signalsCount: "06",

      identity: {
        dossierLabel: "ABOUT ALBARAA",
        name: "Albaraa Alnahari",
        role: "Software Engineering Student · Interested in AI Products · Developer Bridging Programming and Product Management",
        locationLabel: "LOCATION",
        location: "Saudi Arabia",
        languagesLabel: "LANGUAGES",
        languages: { arabic: "Arabic", english: "English" },
        chipOnline: "OPEN TO OPPORTUNITIES",
      },

      verified: "Verified",

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
        label: "OFFICIAL RÉSUMÉ",
        tag: "",
        authRoute: "",
        pdfDocument: "PDF",
        verifiedRecord: "VERIFIED",
        supportLine:
          "View the official résumé in a new tab or download the full version.",
        viewPdf: "View PDF",
        download: "Download Résumé",
        viewAria: "View the official résumé PDF in a new tab",
        downloadAria: "Download the official résumé PDF",
      },

      // Viewer chrome only — the CV document body lives in (and exactly
      // mirrors the official PDF inside) ResumePreviewViewer.tsx.
      preview: {
        window: "Albaraa-Alnahari-Resume.pdf",
        documentTag: "RÉSUMÉ · PDF",
        open: "Open Résumé",
        download: "Download Résumé",
      },
    },
  },
} as const;
