/**
 * skills — the Capability Command Matrix surface: the section intro, the six
 * résumé-grounded capability domains, the plain-language "what this enables"
 * copy for every capability, the applied-project evidence, and the Applied
 * Signal Console (panel + inline + standby states).
 *
 * Proper-noun skill/tech names (React, TypeScript, TensorFlow, …) and project
 * codes (DOCUPILOT, …) stay Latin and identical across ar/en — only domain
 * names, descriptive copy, console labels, and aria text are translated.
 * English values are byte-faithful to the current component source.
 */
export const skills = {
  ar: {
    skills: {
      eyebrow: "مصفوفة القدرات / منظومة الهندسة التطبيقية",
      systemTag: "06 / منظومة القدرات",
      title: {
        lead: "منظومة تقنية مبنية لأجل",
        emphasis: "منتجات ذكية.",
      },
      intro:
        "قدرات طُبّقت عبر أنظمة شُحنت فعليًّا، وتدفّقات ذكاء اصطناعي، وأعمال روبوتية، وتصميم منتجات يضع الإنسان في مركزه. استكشف أي قدرة لترى ما الذي تُتيحه.",
      telemetryLabel: "قياسات المنظومة",
      summary: {
        capabilities: "قدرة موثّقة",
        domains: "مجالات للقدرات",
        appliedSystems: "أنظمة مشاريع تطبيقية",
      },
      mobilePrompt: "اختر قدرة · شاهد ما تُتيحه وأين تظهر",
      // aria-label builders for the domain/skill nodes
      aria: {
        domain: (title: string, count: number) =>
          `مجال ${title}، ${count} قدرة`,
        skill: (skill: string, domainTitle: string) =>
          `${skill}، قدرة ضمن مجال ${domainTitle}`,
        skillApplied: (skill: string, domainTitle: string, codes: string) =>
          `${skill}، قدرة ضمن مجال ${domainTitle}، مُطبَّقة في ${codes}`,
      },
      // Capability domains, keyed by stable id (matches DOMAINS[].id)
      domains: {
        frameworks: {
          title: "أُطر العمل والمكتبات",
          purpose:
            "منظومات بناء قابلة لإعادة الاستخدام تُسرّع صناعة منتجات الويب والموبايل المتقنة.",
        },
        "data-ai": {
          title: "البيانات والذكاء الاصطناعي",
          purpose:
            "أساليب وأدوات لفهم المعلومات ومعالجة المدخلات البصرية وتمكين سلوك ذكي في المنتجات.",
        },
        programming: {
          title: "البرمجة",
          purpose:
            "لغات أساسية للتعبير عن المنطق، وأتمتة العمل، وبناء الأنظمة البرمجية.",
        },
        web: {
          title: "الويب",
          purpose:
            "التقنيات التي تُهيكل تجارب المتصفح الحديثة وتُنسّقها وتبثّ فيها الحياة.",
        },
        tools: {
          title: "الأدوات",
          purpose:
            "منصّات وبيئات تدعم التصميم والتطوير والبيانات والتعاون.",
        },
        professional: {
          title: "القدرات المهنية",
          purpose:
            "قدرات إنسانية توجّه البحث والتواصل والتنفيذ عبر العمل التقني.",
        },
      },
      // Plain-language "what this enables", keyed by exact capability name
      enables: {
        React: "يبني واجهات تفاعلية تتحدّث بسلاسة مع كل خطوة يخطوها المستخدم.",
        "Next.js":
          "إطار عمل لبناء تطبيقات ويب سريعة بصفحات منظّمة، وميزات على الخادم، وتسليم جاهز للإنتاج.",
        "Tailwind CSS":
          "حزمة تنسيق تُستخدم لصياغة واجهات متّسقة ومتجاوبة بكفاءة.",
        Flutter: "إطار عمل لبناء واجهات تطبيقات الموبايل من قاعدة شيفرة واحدة.",
        Pandas:
          "ينظّم البيانات الجدولية ويحلّلها لتسهيل استخلاص الأنماط واتخاذ القرار.",
        NumPy:
          "يتعامل مع البيانات الرقمية والحسابات بكفاءة في المسارات التقنية والتحليلية.",
        "Data Analysis":
          "يحوّل المعلومات المجمَّعة إلى نتائج قابلة للاستخدام تدعم قرارات منتج أفضل.",
        OpenCV:
          "يعالج المدخلات البصرية كالصور أو إطارات الكاميرا لتجارب الرؤية الحاسوبية.",
        "AI APIs":
          "يربط المنتجات بقدرات الذكاء الاصطناعي مثل التوليد والتصنيف والمساعدة الذكية.",
        Python:
          "لغة متعدّدة الاستخدامات تُوظَّف على نطاق واسع في الذكاء الاصطناعي والأتمتة وأعمال البيانات ومنطق الخادم.",
        SQL: "يستخرج المعلومات المنظّمة المخزّنة في قواعد البيانات وينظّمها.",
        MySQL: "نظام قواعد بيانات يُستخدم لتخزين بيانات التطبيقات وإدارتها باعتمادية.",
        Java: "لغة محكمة البنية تُستخدم لبناء تطبيقات معيارية وأنظمة قائمة على المنطق.",
        "C++":
          "لغة موجّهة للأداء كثيرًا ما تُستخدم حيث يهم التحكّم الكفء والحوسبة التقنية.",
        HTML: "تُحدّد بنية صفحة الويب ومحتواها ذا المعنى.",
        CSS: "يتحكّم في التنسيق البصري والتخطيط والمسافات والعرض المتجاوب على الويب.",
        TypeScript:
          "يضيف بنية أكثر أمانًا لمشاريع JavaScript، ويساعد التطبيقات الأكبر على البقاء موثوقة وقابلة للصيانة.",
        JavaScript:
          "يشغّل السلوك التفاعلي في تجارب الويب، من إجراءات المستخدم إلى تحديثات الواجهة الحيّة.",
        Git: "يتتبّع تغييرات الشيفرة كي يتطوّر العمل بأمان ويُراجَع عبر الزمن.",
        GitHub: "يستضيف مستودعات الشيفرة ويدعم التعاون والمراجعة وتسليم المشاريع.",
        "VS Code": "بيئة تطوير تُستخدم لكتابة مشاريع البرمجيات وفحصها وتنظيمها.",
        PyCharm: "بيئة تطوير متخصّصة لبناء مشاريع Python وإدارتها.",
        Supabase:
          "يوفّر خدمات خلفية مثل قواعد البيانات والوصول إلى بيانات التطبيقات للمنتجات الحديثة.",
        Figma:
          "يدعم تصميم الواجهات والنمذجة الأولية والتفكير التعاوني في المنتج قبل التنفيذ.",
        "Analytical Thinking":
          "يُفكّك المسائل المعقّدة إلى قرارات مبنية على الأدلة وخطوات عملية تالية.",
        Communication:
          "يترجم الأفكار والنتائج وقرارات المنتج بوضوح بين المستخدمين والفِرَق.",
        Leadership:
          "ينسّق الناس والاتجاه لينقل العمل من الفكرة إلى نتيجة ذات معنى.",
      },
      // Applied-project evidence, keyed by stable project key (matches PROJECTS)
      projects: {
        docupilot: {
          title: "منصّة عمليات أعمال بالذكاء الاصطناعي",
          relation:
            "طُبّقت في منصّة عمليات أعمال بالذكاء الاصطناعي بُنيت حول تدفّقات المستندات والواجهات التشغيلية الذكية.",
        },
        techpath: {
          title: "مولّد مسارات تعلّم بالذكاء الاصطناعي",
          relation:
            "طُبّقت في تجربة مسار تعلّم بالذكاء الاصطناعي بتوصيات مخصّصة وتدفّقات تقدّم تفاعلية.",
        },
        slidemind: {
          title: "مولّد بطاقات تعليمية معياري",
          relation: "طُبّقت في تطبيق توليد بطاقات تعليمية معياري باستخدام تكامل واجهات البرمجة.",
        },
        sanadk: {
          title: "دراسة تجربة استخدام لإمكانية الوصول",
          relation: "طُبّقت في بحث يركّز على إمكانية الوصول وتصميم نموذج أوّلي للموبايل.",
        },
      },
      // Applied Signal Console (CapabilityInspector)
      console: {
        label: "وحدة الإشارة التطبيقية",
        standby: {
          state: "وضع الاستعداد / اختر قدرة",
          body: "استكشف قدرة لترى ما الذي تُتيحه وأين تظهر ضمن أعمال مختارة.",
          ready: "27 قدرة جاهزة للفحص",
        },
        domainTag: (num: string, title: string) => `المجال ${num} / ${title}`,
        capabilitiesCount: (count: number) => `${count} قدرة`,
        capabilityTag: "قدرة",
        lanes: {
          domainPurpose: "غاية المجال",
          relatedSystems: "أنظمة مختارة ذات صلة",
          whatEnables: "ما الذي تُتيحه",
          appliedIn: "مُطبَّقة في نظام مختار",
        },
        domainConnected: "مرتبطة عبر القدرات المُطبَّقة في هذا المجال.",
        appliedAcross: "مُطبَّقة عبر أنظمة مختارة بُنيت بهذه القدرة.",
        inToolkit: "قدرة ضمن العُدّة",
      },
    },
  },
  en: {
    skills: {
      eyebrow: "CAPABILITY MATRIX / APPLIED ENGINEERING STACK",
      systemTag: "06 / CAPABILITY SYSTEM",
      title: {
        lead: "A technical stack built for",
        emphasis: "intelligent products.",
      },
      intro:
        "Capabilities applied across shipped systems, AI workflows, robotics work, and user-centered product design. Explore any capability to see what it enables.",
      telemetryLabel: "STACK TELEMETRY",
      summary: {
        capabilities: "DOCUMENTED CAPABILITIES",
        domains: "CAPABILITY DOMAINS",
        appliedSystems: "APPLIED PROJECT SYSTEMS",
      },
      mobilePrompt: "SELECT A CAPABILITY · See what it enables and where it appears",
      aria: {
        domain: (title: string, count: number) =>
          `${title} domain, ${count} capabilities`,
        skill: (skill: string, domainTitle: string) =>
          `${skill}, ${domainTitle} capability`,
        skillApplied: (skill: string, domainTitle: string, codes: string) =>
          `${skill}, ${domainTitle} capability, applied in ${codes}`,
      },
      domains: {
        frameworks: {
          title: "Frameworks & Libraries",
          purpose:
            "Reusable building systems that speed up the creation of polished web and mobile products.",
        },
        "data-ai": {
          title: "Data & AI",
          purpose:
            "Methods and tools for understanding information, processing visual input, and enabling intelligent product behavior.",
        },
        programming: {
          title: "Programming",
          purpose:
            "Core languages used to express logic, automate work, and build software systems.",
        },
        web: {
          title: "Web",
          purpose:
            "The technologies that structure, style, and activate modern browser experiences.",
        },
        tools: {
          title: "Tools",
          purpose:
            "Platforms and environments that support design, development, data, and collaboration.",
        },
        professional: {
          title: "Professional Systems",
          purpose:
            "Human capabilities that guide research, communication, and execution across technical work.",
        },
      },
      enables: {
        React: "Builds interactive interfaces that update smoothly as people use a product.",
        "Next.js":
          "A framework for building fast web applications with structured pages, server features, and production-ready delivery.",
        "Tailwind CSS": "A styling toolkit used to craft consistent, responsive interfaces efficiently.",
        Flutter: "A framework for building mobile application interfaces from a shared codebase.",
        Pandas: "Organizes and analyzes tabular data so patterns and decisions become easier to extract.",
        NumPy: "Handles numerical data and calculations efficiently for technical and analytical workflows.",
        "Data Analysis": "Turns collected information into usable findings that support better product decisions.",
        OpenCV: "Processes visual input such as images or camera frames for computer-vision experiences.",
        "AI APIs": "Connects products to AI capabilities such as generation, classification, or intelligent assistance.",
        Python: "A versatile language widely used for AI, automation, data work, and backend logic.",
        SQL: "Retrieves and organizes structured information stored in databases.",
        MySQL: "A database system used to store and manage application data reliably.",
        Java: "A strongly structured language used to build modular applications and logic-driven systems.",
        "C++": "A performance-oriented language often used where efficient control and technical computing matter.",
        HTML: "Defines the structure and meaningful content of a web page.",
        CSS: "Controls visual styling, layout, spacing, and responsive presentation on the web.",
        TypeScript: "Adds safer structure to JavaScript projects, helping larger applications stay reliable and maintainable.",
        JavaScript: "Powers interactive behavior in web experiences, from user actions to dynamic interface updates.",
        Git: "Tracks changes in code so development work can evolve safely and be reviewed over time.",
        GitHub: "Hosts code repositories and supports collaboration, review, and project delivery.",
        "VS Code": "A development environment used to write, inspect, and organize software projects.",
        PyCharm: "A development environment specialized for building and managing Python-based projects.",
        Supabase: "Provides backend services such as databases and application data access for modern products.",
        Figma: "Supports interface design, prototyping, and collaborative product thinking before implementation.",
        "Analytical Thinking": "Breaks complex problems into evidence-based decisions and practical next steps.",
        Communication: "Translates ideas, findings, and product decisions clearly across users and teams.",
        Leadership: "Coordinates people and direction to move work from idea toward meaningful outcome.",
      },
      projects: {
        docupilot: {
          title: "AI Business Operations Platform",
          relation:
            "Applied in an AI business-operations platform built around document workflows and intelligent operational interfaces.",
        },
        techpath: {
          title: "AI Learning Roadmap Generator",
          relation:
            "Applied in an AI learning-roadmap experience with personalized recommendations and interactive progress workflows.",
        },
        slidemind: {
          title: "Modular Flashcard Generator",
          relation: "Applied in a modular flashcard-generation application using API integration.",
        },
        sanadk: {
          title: "Accessibility UX Case",
          relation: "Applied in accessibility-focused research and mobile prototype design.",
        },
      },
      console: {
        label: "APPLIED SIGNAL CONSOLE",
        standby: {
          state: "STANDBY / SELECT A CAPABILITY",
          body: "Explore a capability to see what it enables and where it appears in featured work.",
          ready: "27 capabilities ready for inspection",
        },
        domainTag: (num: string, title: string) => `DOMAIN ${num} / ${title.toUpperCase()}`,
        capabilitiesCount: (count: number) => `${count} CAPABILITIES`,
        capabilityTag: "CAPABILITY",
        lanes: {
          domainPurpose: "DOMAIN PURPOSE",
          relatedSystems: "RELATED FEATURED SYSTEMS",
          whatEnables: "WHAT THIS ENABLES",
          appliedIn: "APPLIED IN FEATURED SYSTEM",
        },
        domainConnected: "Connected through applied capabilities in this domain.",
        appliedAcross: "Applied across featured systems built with this capability.",
        inToolkit: "CAPABILITY IN TOOLKIT",
      },
    },
  },
} as const;
