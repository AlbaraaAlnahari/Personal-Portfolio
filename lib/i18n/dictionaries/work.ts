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
        eyebrow: "أنظمة منشورة / أعمال مختارة",
        index: "04 من أنظمة المشاريع",
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
        livePreview: "معاينة النظام الحيّ",
        systemOutput: "مخرجات النظام",
        outputInterface: "المخرجات / الواجهة المنشورة",
      },
      labels: {
        technologyStack: "حزمة التقنيات",
        techStack: "حزمة التقنيات",
        adaptiveRoute: "مسار تعلّم متكيّف",
      },
      actions: {
        opensNewTab: "(يفتح في تبويب جديد)",
        liveSite: "افتح موقع دوكوبايلوت",
        viewRepository: "اطّلع على ملفات المشروع",
      },
      frame: {
        live: "مباشر",
        deployedInterface: "الواجهة المنشورة",
        generatedRoadmap: "خارطة طريق مُولّدة",
      },
      docupilot: {
        systemLabel: "النظام 01 / الوحدة الرائدة",
        category: "ذكاء اصطناعي كخدمة / عمليات الأعمال",
        tagline: "منصة عمليات أعمال بالذكاء الاصطناعي",
        recognition: "المركز الأول — معسكر ابتكار الذكاء الاصطناعي",
        description:
          "طبقة عمليات ذكية تحوّل العقود والفواتير ومخططات الأعمال وتغيّرات النطاق إلى قرارات قابلة للتنفيذ داخل الفريق.",
      },
      techpath: {
        systemLabel: "النظام 02 / مسار تعلّم متكيّف",
        category: "تعليم بالذكاء الاصطناعي / تخصيص",
        tagline: "مولّد خرائط طريق تعليمية بالذكاء الاصطناعي",
        description:
          "يساعدك TechPath على بناء رود ماب تعليمي مفصّل، مع روابط مختارة، واختبارات لقياس المستوى، ومتابعة يومية للتعلم وحدك أو مع زملائك.",
        roadmapAlt:
          "خارطة طريق التعلّم المولّدة في TechPath — التقدّم الإجمالي، وجدول زمني للتعلّم يضم مرحلة الأساسيات / تطوير الواجهة الخلفية، وجدول دراسة أسبوعي.",
        domain: "techpath / roadmap",
      },
      sanadk: {
        systemLabel: "النظام 03 / تصميم شامل",
        category: "إتاحة الوصول / تصميم شامل",
        name: "تطبيق سندك",
        tagline: "مساعد ذكي للتسوّق والتنقّل",
        description: "تطبيق جوّال ذكي يدعم ذوي الإعاقة عبر الرؤية الحاسوبية والملاحة الذكية، ليساعدهم على التسوق والتنقل باستقلالية وسهولة أكبر.",
        conceptLabel: "إشارة إرشاد الوصول الشامل",
        statusLabel: "حالة: إتاحة وصول / تجربة استخدام",
      },
      slidemind: {
        systemLabel: "النظام 04 / أتمتة الدراسة",
        category: "أدوات تعلّم بالذكاء الاصطناعي",
        name: "مولّد البطاقات التعليمية Slide-Mind",
        tagline: "نظام دراسة بالذكاء الاصطناعي",
        description: "يحلّل المحتوى التعليمي، يستخلص أهم النقاط، ويحوّلها إلى بطاقات تعليمية واختبارات قصيرة بالذكاء الاصطناعي.",
        conceptLabel: "محرك تحويل المحتوى إلى اختبارات قصيرة",
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
        eyebrow: "DEPLOYED SYSTEMS / FEATURED WORK",
        index: "04 PROJECT SYSTEMS",
        titleLead: "Products designed to turn",
        titleAccent: "intelligence",
        titleTrail: "into action.",
        intro:
          "A selection of AI-enabled products, accessibility experiences, and software systems built to solve real problems.",
      },
      pipeline: {
        title: "AI OPERATIONS PIPELINE",
        stages: {
          documentInput: "DOCUMENT INPUT",
          aiExtraction: "AI EXTRACTION",
          structuredWorkflow: "STRUCTURED WORKFLOW",
          approvalSystem: "APPROVAL SYSTEM",
        },
      },
      preview: {
        livePreview: "LIVE SYSTEM PREVIEW",
        systemOutput: "SYSTEM OUTPUT",
        outputInterface: "OUTPUT / DEPLOYED INTERFACE",
      },
      labels: {
        technologyStack: "TECHNOLOGY STACK",
        techStack: "TECH STACK",
        adaptiveRoute: "ADAPTIVE ROUTE",
      },
      actions: {
        opensNewTab: "(opens in a new tab)",
        liveSite: "Live Site",
        viewRepository: "View Repository",
      },
      frame: {
        live: "LIVE",
        deployedInterface: "DEPLOYED INTERFACE",
        generatedRoadmap: "GENERATED ROADMAP",
      },
      docupilot: {
        systemLabel: "SYSTEM 01 / FLAGSHIP MODULE",
        category: "AI SAAS / BUSINESS OPERATIONS",
        tagline: "AI Business Operations Platform",
        recognition: "1st Place — AI Innovation Bootcamp",
        description:
          "AI SaaS platform transforming business documents into structured workflows, approvals, and operational systems.",
      },
      techpath: {
        systemLabel: "SYSTEM 02 / ADAPTIVE LEARNING ROUTE",
        category: "AI EDUCATION / PERSONALIZATION",
        tagline: "AI Learning Roadmap Generator",
        description:
          "AI-powered roadmap generator with personalized learning timelines and adaptive educational systems.",
        roadmapAlt:
          "TechPath generated learning roadmap — overall progress, learning timeline with a Foundation / Backend Development phase, and a weekly study schedule.",
        domain: "techpath / roadmap",
      },
      sanadk: {
        systemLabel: "SYSTEM 03 / INCLUSIVE DESIGN",
        category: "ACCESSIBILITY / INCLUSIVE DESIGN",
        name: "Sanadk Accessibility App",
        tagline: "Accessible Mobility Experience",
        description: "Accessibility-first mobile experience for visually impaired and wheelchair users.",
        conceptLabel: "ACCESSIBILITY GUIDANCE SIGNAL",
        statusLabel: "ACCESSIBILITY / UX CASE",
      },
      slidemind: {
        systemLabel: "SYSTEM 04 / STUDY AUTOMATION",
        category: "AI LEARNING TOOLS",
        name: "Slide-Mind Flashcard Generator",
        tagline: "AI Study System",
        description: "AI-powered flashcard generation system with modular architecture.",
        conceptLabel: "KNOWLEDGE DISTILLATION ENGINE",
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
