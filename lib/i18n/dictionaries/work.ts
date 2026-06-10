/**
 * work — the "Work / Selected Work" surface: deployed-systems gallery
 * (DocuPilot flagship, TechPath feature, Sanadk + Slide-Mind concept modules)
 * plus the system-preview frame chrome and concept-visual diagram labels.
 *
 * Follows the canonical glossary in lib/i18n/dictionaries/README.md. English
 * values are byte-faithful to the current source. Product/brand names
 * (DocuPilot, TechPath, Sanadk, Slide-Mind), tech tokens, domains, and route
 * paths stay Latin and identical across ar/en.
 */
export const work = {
  ar: {
    work: {
      header: {
        eyebrow: "أعمال مختارة",
        titleLead: "منتجات صُمّمت لتحويل",
        titleAccent: "الأفكار",
        titleTrail: "إلى واقع.",
        intro:
          "مجموعة مختارة من منتجات مدعومة بالذكاء الاصطناعي، وتجارب وصول شامل، وأنظمة برمجية بُنيت لحلّ مشكلات حقيقية.",
      },
      pipeline: {
        title: "خط عمليات الذكاء الاصطناعي",
        stages: {
          documentInput: "إدخال",
          aiExtraction: "تحليل",
          structuredWorkflow: "تنظيم",
          approvalSystem: "اعتماد",
        },
      },
      preview: {
        livePreview: "معاينة مباشرة",
      },
      labels: {
        technologyStack: "حزمة التقنيات",
        techStack: "حزمة التقنيات",
      },
      actions: {
        opensNewTab: "(يفتح في تبويب جديد)",
        liveSite: "افتح موقع دوكوبايلوت",
        viewRepository: "اطّلع على ملفات المشروع",
      },
      frame: {
        live: "مباشر",
        deployedInterface: "موقع مباشر",
        generatedRoadmap: "خارطة طريق مُولّدة",
      },
      docupilot: {
        systemLabel: "المشروع الرئيسي",
        category: "ذكاء اصطناعي كخدمة / عمليات الأعمال",
        tagline: "منصة عمليات أعمال بالذكاء الاصطناعي",
        recognition: "المركز الأول — معسكر ابتكار الذكاء الاصطناعي",
        description:
          "طبقة عمليات ذكية تحوّل العقود والفواتير ومخططات الأعمال وتغيّرات النطاق إلى قرارات قابلة للتنفيذ داخل الفريق.",
      },
      techpath: {
        systemLabel: "مسار تعلّم متكيّف",
        category: "تعليم بالذكاء الاصطناعي / تخصيص",
        tagline: "مولّد خرائط طريق تعليمية بالذكاء الاصطناعي",
        description:
          "يساعدك TechPath على بناء رود ماب تعليمي مفصّل، مع روابط مختارة، واختبارات لقياس المستوى، ومتابعة يومية للتعلم وحدك أو مع زملائك.",
        roadmapAlt:
          "خارطة طريق التعلّم المولّدة في TechPath — التقدّم الإجمالي، وجدول زمني للتعلّم يضم مرحلة الأساسيات / تطوير الواجهة الخلفية، وجدول دراسة أسبوعي.",
        domain: "techpath / roadmap",
      },
      sanadk: {
        systemLabel: "تصميم شامل",
        category: "إتاحة الوصول / تصميم شامل",
        name: "تطبيق سندك",
        tagline: "مساعد ذكي للتسوّق والتنقّل",
        description:
          "تطبيق جوّال ذكي يدعم ذوي الإعاقة عبر الرؤية الحاسوبية والملاحة الذكية، ليساعدهم على التسوق والتنقل باستقلالية وسهولة أكبر.",
        conceptLabel: "تجربة إرشاد الوصول",
        statusLabel: "دراسة حالة: إتاحة الوصول وتجربة الاستخدام",
      },
      slidemind: {
        systemLabel: "أتمتة الدراسة",
        category: "أدوات تعلّم بالذكاء الاصطناعي",
        name: "مولّد البطاقات التعليمية Slide-Mind",
        tagline: "نظام دراسة بالذكاء الاصطناعي",
        description:
          "يحلّل المحتوى التعليمي، يستخلص أهم النقاط، ويحوّلها إلى بطاقات تعليمية واختبارات قصيرة بالذكاء الاصطناعي.",
        conceptLabel: "تحويل المحتوى إلى بطاقات",
      },
      docupilotPreviewAlt:
        "لوحة قرارات DocuPilot — المشاريع النشطة، والفواتير المعلّقة، والاعتمادات المطلوبة، والمخاطر العالية، ومؤشرات المشاريع المرتبطة داخل منصة عمليات الذكاء الاصطناعي المنشورة.",
      conceptVisual: {
        techpath: {
          assess: "تقييم",
          plan: "خطة",
          resources: "موارد",
          followup: "متابعة",
          progress: "تقدّم",
        },
        sanadk: {
          product: "تعرّف المنتج",
          voice: "إرشاد صوتي",
          route: "مسار مناسب",
          arrived: "وصول",
        },
        slidemind: {
          source: "المحتوى",
          aiDistill: "تحليل ذكي",
          flashcards: "بطاقات واختبارات",
        },
      },
    },
  },
  en: {
    work: {
      header: {
        eyebrow: "Selected Work",
        titleLead: "Products designed to turn",
        titleAccent: "ideas",
        titleTrail: "into reality.",
        intro:
          "A selection of AI-powered products, inclusive-access experiences, and software systems built to solve real problems.",
      },
      pipeline: {
        title: "AI OPERATIONS PIPELINE",
        stages: {
          documentInput: "INPUT",
          aiExtraction: "ANALYSIS",
          structuredWorkflow: "STRUCTURE",
          approvalSystem: "APPROVAL",
        },
      },
      preview: {
        livePreview: "Live Preview",
      },
      labels: {
        technologyStack: "TECHNOLOGY STACK",
        techStack: "TECH STACK",
      },
      actions: {
        opensNewTab: "(opens in a new tab)",
        liveSite: "Open DocuPilot Site",
        viewRepository: "View Project Files",
      },
      frame: {
        live: "LIVE",
        deployedInterface: "LIVE SITE",
        generatedRoadmap: "GENERATED ROADMAP",
      },
      docupilot: {
        systemLabel: "Flagship Project",
        category: "AI SAAS / BUSINESS OPERATIONS",
        tagline: "AI Business Operations Platform",
        recognition: "1st Place — AI Innovation Bootcamp",
        description:
          "An intelligent operations layer that turns contracts, invoices, business plans, and scope changes into actionable decisions for the team.",
      },
      techpath: {
        systemLabel: "Adaptive Learning Route",
        category: "AI EDUCATION / PERSONALIZATION",
        tagline: "AI Learning Roadmap Generator",
        description:
          "TechPath helps you build a detailed learning roadmap with curated links, level-assessment quizzes, and daily progress tracking — solo or alongside your peers.",
        roadmapAlt:
          "TechPath generated learning roadmap — overall progress, learning timeline with a Foundation / Backend Development phase, and a weekly study schedule.",
        domain: "techpath / roadmap",
      },
      sanadk: {
        systemLabel: "Inclusive Design",
        category: "ACCESSIBILITY / INCLUSIVE DESIGN",
        name: "Sanadk App",
        tagline: "Smart Shopping & Mobility Assistant",
        description:
          "A smart mobile app that supports people with disabilities through computer vision and intelligent navigation, helping them shop and get around with greater independence and ease.",
        conceptLabel: "ACCESSIBILITY GUIDANCE",
        statusLabel: "ACCESSIBILITY / UX CASE STUDY",
      },
      slidemind: {
        systemLabel: "Study Automation",
        category: "AI LEARNING TOOLS",
        name: "Slide-Mind Flashcard Generator",
        tagline: "AI Study System",
        description:
          "Analyzes learning content, distills the key points, and turns them into AI-generated flashcards and short quizzes.",
        conceptLabel: "CONTENT TO FLASHCARDS",
      },
      docupilotPreviewAlt:
        "DocuPilot Decision Dashboard — active projects, pending invoices, required approvals, high risks, and linked project indicators in the deployed AI operations platform.",
      conceptVisual: {
        techpath: {
          assess: "ASSESS",
          plan: "PLAN",
          resources: "RESOURCES",
          followup: "FOLLOW-UP",
          progress: "PROGRESS",
        },
        sanadk: {
          product: "PRODUCT",
          voice: "VOICE",
          route: "ROUTE",
          arrived: "ARRIVE",
        },
        slidemind: {
          source: "CONTENT",
          aiDistill: "AI ANALYSIS",
          flashcards: "CARDS & QUIZ",
        },
      },
    },
  },
} as const;
