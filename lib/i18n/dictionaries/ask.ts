/**
 * ask — copy for the "Ask Albaraa AI" interactive console (the /ask surface).
 *
 * Localizes the FULL experience: intro header, console chrome, input row,
 * suggested prompts, profile snapshot, source/status panel — AND every
 * assistant ANSWER. The deterministic matcher in lib/albaraa-knowledge.ts is
 * locale-independent: it returns an answer KEY, and the component renders the
 * localized body from `answers[key]` here. So Arabic mode always answers in
 * Arabic and English mode in English; switching language re-localizes the whole
 * conversation. Proper nouns / tech tokens (Next.js, React, Python, DocuPilot,
 * Supabase, …) stay Latin inside Arabic per the glossary.
 *
 * Answer shape is uniform — { title, lead, bullets[], closing } — so the union
 * indexed by AnswerKey stays type-safe; empty bullets/closing render as nothing.
 */
export const ask = {
  ar: {
    ask: {
      eyebrow: "ALBARAA OS / ذكاء شخصي",
      title: "أسأل البراء AI",
      intro:
        "استكشف مشاريع البراء ومهاراته وخبرته القيادية وأثره الموثّق عبر مساعد أرشيف شخصي تفاعلي.",
      introNote: "مبنيّ من بيانات موثّقة من ملف الأعمال والسيرة الذاتية.",
      console: {
        title: "ASK ALBARAA AI",
        statusOnline: "الأرشيف المحلي متصل",
        knowledgeBase: "قاعدة معرفة الأعمال",
        route: "/ask",
        clear: "مسح",
        clearAria: "مسح المحادثة",
        assistantBrand: "ALBARAA OS",
        logAria: "محادثة مع أسأل البراء AI",
        typing: "يكتب الآن…",
        typingAria: "يكتب المساعد الآن",
        copy: "نسخ",
        copied: "تم النسخ",
        copyAria: "نسخ الإجابة",
        openContact: "افتح صفحة التواصل",
      },
      input: {
        srLabel: "اسأل عن مشاريع البراء أو مهاراته أو قيادته أو فرص التعاون",
        placeholder: "اسأل عن المشاريع أو المهارات أو القيادة أو التعاون…",
        sendAria: "أرسل الرسالة",
        hint: "ENTER للإرسال · SHIFT+ENTER لسطر جديد",
      },
      greeting: {
        title: "أسأل البراء AI",
        lead: "مرحبًا، أنا «أسأل البراء AI» — مساعد أرشيف مبنيّ من سيرة البراء الموثّقة وأرشيف مشاريعه. اسألني عن مشاريعه أو مهاراته أو خبرته أو قيادته أو كيفية التعاون معه.",
      },
      suggested: {
        label: "ابدأ من هنا",
        note: "",
        items: {
          profile: "من هو البراء باختصار؟",
          distinctive: "ما الذي يميز البراء؟",
          docupilot: "ما قصة DocuPilot؟",
          skills: "ما أقوى مهارات البراء؟",
          leadership: "ما الأثر القيادي الذي حقّقه البراء؟",
          experience: "ما الخبرة التي يمتلكها البراء؟",
          contact: "كيف أتواصل مع البراء أو أتعاون معه؟",
        },
      },
      sourceChips: {
        resume: "السيرة الذاتية",
        portfolio: "ملف الأعمال",
        contact: "التواصل",
      },
      answers: {
        profile: {
          title: "من هو البراء؟",
          lead: "البراء النهاري طالب هندسة برمجيات في جامعة جدة، يركّز على بناء منتجات مدعومة بالذكاء الاصطناعي وتجارب برمجية عملية. يجمع بين تطوير الويب، والتفكير المنتج، وتحليل البيانات، والقيادة المجتمعية، مع اهتمام واضح بإدارة المشاريع والمنتجات.",
          bullets: [
            "طالب هندسة برمجيات — جامعة جدة.",
            "يبني منتجات ذكاء اصطناعي وتجارب ويب قابلة للاستخدام.",
            "خبرة في المنتج، والمشاريع التقنية، والروبوتات، وإدارة المبادرات.",
            "يهتم بربط البرمجة بقيمة حقيقية للمستخدم.",
          ],
          closing: "",
        },
        distinctive: {
          title: "ما الذي يميز البراء؟",
          lead: "يميز البراء أنه يجمع بين التفكير المنتج، والهندسة البرمجية، والتنفيذ العملي. يبدأ من فهم المشكلة والفكرة، ثم يحوّلها إلى تجربة قابلة للاستخدام عبر البحث، والتصميم، والبرمجة، والاختبار. ظهر هذا في تدريبه في سوم، حيث عمل على بحث المستخدم وتحليل المنافسين وتنظيف بيانات المنتج لاستخراج قرارات قابلة للتنفيذ، وظهر أيضًا في مشاريعه التقنية مثل DocuPilot وTechPath وSanadk.",
          bullets: [
            "يفكّر كمنتِج من الفكرة إلى القرار.",
            "ينفّذ كمطوّر من الواجهة إلى البيانات.",
            "يقيس الأثر عبر المستخدمين، والمشاريع، والقيادة.",
          ],
          closing:
            "باختصار: البراء لا يبني صفحات فقط؛ بل يبني منتجات لها هدف، وتجربة، وقرار واضح.",
        },
        docupilot: {
          title: "ما قصة DocuPilot؟",
          lead: "DocuPilot منصة عمليات أعمال بالذكاء الاصطناعي تحوّل المستندات والعقود والفواتير ومخططات العمل إلى قرارات ومتابعات قابلة للتنفيذ. فاز المشروع بالمركز الأول في معسكر ابتكار الذكاء الاصطناعي، ويعكس توجّه البراء نحو بناء منتجات عملية، لا مجرّد واجهات جميلة.",
          bullets: [
            "مبني بـ Next.js وTypeScript وTailwind CSS وSupabase وGemini API وQwen API وZod.",
            "تحليل جدوى، وتوليد مخططات، واستخراج العقود، واعتماد الفواتير، ورصد تغيّر النطاق.",
            "لوحة عمليات لصحّة المشروع، ودفعات المراحل، وتنبيهات القرار.",
            "متاح على docupilot.site.",
          ],
          closing: "",
        },
        projects: {
          title: "مشاريع مختارة",
          lead: "بعض مشاريع البراء — كلٌّ منها بُني أو نُمذِج من الفكرة حتى التنفيذ:",
          bullets: [
            "DocuPilot — منصة عمليات أعمال بالذكاء الاصطناعي (المركز الأول في معسكر الابتكار). متاح على docupilot.site.",
            "TechPath — تطبيق ويب متكامل يولّد مسارات تعلّم مخصّصة عبر Anthropic Claude API.",
            "Sanadk — تطبيق إتاحة (UX/UI) مبني على بحث مستخدم ونماذج عالية ومنخفضة الدقة.",
            "Slide-Mind — مولّد بطاقات تعليمية بلغة Java مع تكامل ذكاء اصطناعي وواجهات برمجية.",
          ],
          closing: "",
        },
        skills: {
          title: "أقوى مهارات البراء",
          lead: "أقوى مهارات البراء تتوزّع بين البرمجة، ومنتجات الذكاء الاصطناعي، والتفكير المنتج، وتحويل الأفكار إلى تطبيقات قابلة للاستخدام.",
          bullets: [
            "البرمجة: Python, SQL, Java, JavaScript, TypeScript.",
            "الويب: React, Next.js, Tailwind CSS.",
            "البيانات والذكاء الاصطناعي: Pandas, NumPy, Data Analysis, OpenCV, AI APIs.",
            "الأدوات: Git, GitHub, VS Code, PyCharm, Figma, Supabase.",
            "المهارات المهنية: التفكير التحليلي، والتواصل، والقيادة، وإدارة العمل.",
          ],
          closing: "",
        },
        experience: {
          title: "خبرة البراء",
          lead: "يمتلك البراء خبرة عملية في إدارة المنتجات، وهندسة الروبوتات، والبرامج الصيفية، والمشاريع التقنية، والقيادة المجتمعية.",
          bullets: [
            "متدرّب إدارة منتجات — شركة سوم: بحث المستخدم، وتحليل المنافسين، وتنظيف بيانات المنتج.",
            "متدرّب هندسة روبوتات — Smart Method: ذراع روبوتية بالذكاء الاصطناعي ونماذج ثلاثية الأبعاد.",
            "مدير ومشرف برنامج صيفي — معهد الأقصى: قاد فرقًا تعليمية ورفع رضا أولياء الأمور.",
            "بنى مشاريع مثل DocuPilot وTechPath وSanadk وSlide-Mind.",
          ],
          closing: "",
        },
        leadership: {
          title: "الأثر القيادي للبراء",
          lead: "قاد البراء وساهم في مبادرات مجتمعية وبرامج تقنية واسعة، من تنظيم الفعاليات والورش إلى قيادة الفرق والمشاريع الطلابية.",
          bullets: [
            "أكثر من 5,000 مشارك في معسكرات تدريبية (قائد إدارة مشروع، GDGoC جامعة جدة).",
            "أكثر من 450 مشاركًا في فعاليات تقنية كبرى بالمنطقة الغربية.",
            "أكثر من 65 عضوًا في نادي الدرون بجامعة جدة (نائب القائد).",
            "أكثر من 193 ساعة تطوّعية ومجتمعية موثّقة.",
          ],
          closing: "",
        },
        availability: {
          title: "ما الذي ينفتح عليه البراء",
          lead: "البراء منفتح على البناء والمساهمة في عدّة اتجاهات:",
          bullets: [
            "منتجات الذكاء الاصطناعي وأدوار هندسة البرمجيات.",
            "إدارة المشاريع والمنتجات وحلّ المشكلات المتمحورة حول المستخدم.",
            "التعاون في مشاريع ذات أثر.",
            "التقديم الرسمي والمشاركة المجتمعية.",
          ],
          closing: "",
        },
        contact: {
          title: "كيف تتواصل أو تتعاون مع البراء",
          lead: "أفضل طريقة للتواصل هي عبر صفحة التواصل أو البريد المباشر. البراء متاح لفرص التعاون، والبرمجة ومنتجات الذكاء الاصطناعي، وإدارة المشاريع والمنتجات، والمبادرات، والتقديم الرسمي، والتصوير الاحترافي.",
          bullets: [
            "البريد: albaraa.a.alnahari@gmail.com",
            "LinkedIn: linkedin.com/in/albaraa-alnahari",
            "GitHub: github.com/AlbaraaAlnahari",
            "X / Twitter: x.com/x_ff",
          ],
          closing: "",
        },
        unknown: {
          title: "أقدر أساعدك بمعلومات موثّقة",
          lead: "أقدر أساعدك بمعلومات موثّقة عن البراء ومشاريعه وخبراته. جرّب تسأل عن DocuPilot، أو المهارات، أو الخبرة، أو الأثر القيادي، أو طرق التعاون.",
          bullets: [],
          closing: "",
        },
        private: {
          title: "خارج الأرشيف العام",
          lead: "لا أملك هذه المعلومة في الأرشيف العام لملف البراء. يمكنك التواصل معه مباشرة عبر صفحة التواصل.",
          bullets: [],
          closing: "",
        },
      },
      profile: {
        label: "لمحة عن الملف",
        roles: {
          student: "طالب هندسة برمجيات",
          aiBuilder: "يبني منتجات ذكاء اصطناعي",
          fullStack: "مطوّر متكامل",
          productMinded: "بعقلية المنتج",
          leadership: "قيادة ومجتمع",
        },
        stats: {
          usersResearched: "مستخدم في الأبحاث",
          bootcampParticipants: "مشارك في معسكرات",
          eventParticipants: "مشارك في فعاليات",
          clubMembers: "عضو في النادي",
          firstPlace: "في معسكر الذكاء الاصطناعي",
        },
      },
      source: {
        label: "المصدر والحالة",
        rows: {
          engine: { k: "المحرّك", v: "قاعدة معرفة محلية" },
          data: { k: "البيانات", v: "سيرة وأعمال موثّقة" },
          externalAi: { k: "ذكاء خارجي", v: "لا يوجد" },
          privacy: { k: "الخصوصية", v: "لا تغادر أي رسالة هذه الصفحة" },
        },
        ctaPrompt: "تحبّ نتحدّث مباشرة؟",
        cta: "افتح صفحة التواصل",
      },
    },
  },
  en: {
    ask: {
      eyebrow: "ALBARAA OS / PERSONAL INTELLIGENCE",
      title: "Ask Albaraa AI",
      intro:
        "Explore Albaraa's projects, skills, leadership experience, and documented impact through an interactive personal archive assistant.",
      introNote: "Built from verified portfolio and résumé data.",
      console: {
        title: "ASK ALBARAA AI",
        statusOnline: "LOCAL ARCHIVE ONLINE",
        knowledgeBase: "PORTFOLIO KNOWLEDGE BASE",
        route: "/ask",
        clear: "CLEAR",
        clearAria: "Clear chat",
        assistantBrand: "ALBARAA OS",
        logAria: "Conversation with Ask Albaraa AI",
        typing: "Typing…",
        typingAria: "Assistant is typing",
        copy: "COPY",
        copied: "COPIED",
        copyAria: "Copy answer",
        openContact: "OPEN CONTACT",
      },
      input: {
        srLabel: "Ask about Albaraa's projects, skills, leadership, or collaboration",
        placeholder: "Ask about projects, skills, leadership, or collaboration…",
        sendAria: "Send message",
        hint: "ENTER TO SEND · SHIFT+ENTER FOR A NEW LINE",
      },
      greeting: {
        title: "Ask Albaraa AI",
        lead: "Hi, I'm Ask Albaraa AI — a portfolio assistant built from Albaraa's verified résumé and project archive. Ask me about his projects, skills, experience, leadership, or how to collaborate.",
      },
      suggested: {
        label: "START WITH",
        note: "",
        items: {
          profile: "Who is Albaraa?",
          distinctive: "What makes Albaraa different?",
          docupilot: "What's the story behind DocuPilot?",
          skills: "What are Albaraa's strongest skills?",
          leadership: "What leadership impact has Albaraa made?",
          experience: "What experience does Albaraa have?",
          contact: "How can I contact or collaborate with Albaraa?",
        },
      },
      sourceChips: {
        resume: "Résumé",
        portfolio: "Portfolio",
        contact: "Contact",
      },
      answers: {
        profile: {
          title: "Who is Albaraa?",
          lead: "Albaraa Alnahari is a Software Engineering student at the University of Jeddah, focused on building AI-powered products and practical software experiences. He blends web development, product thinking, data analysis, and community leadership, with a clear interest in project and product management.",
          bullets: [
            "Software Engineering student — University of Jeddah.",
            "Builds AI products and usable web experiences.",
            "Experience in product, technical projects, robotics, and running initiatives.",
            "Cares about connecting code to real user value.",
          ],
          closing: "",
        },
        distinctive: {
          title: "What makes Albaraa different?",
          lead: "Albaraa combines product thinking, software engineering, and hands-on execution. He starts from the problem and the idea, then turns it into a usable experience through research, design, development, and testing — visible in his Soum internship (user research, competitor analysis, product-data cleanup) and in technical projects like DocuPilot, TechPath, and Sanadk.",
          bullets: [
            "Thinks like a product person — from idea to decision.",
            "Builds like a developer — from interface to data.",
            "Measures impact across users, projects, and leadership.",
          ],
          closing:
            "In short: Albaraa doesn't just build pages; he builds products with a purpose, an experience, and a clear decision.",
        },
        docupilot: {
          title: "What's the story behind DocuPilot?",
          lead: "DocuPilot is an AI business operations platform that turns documents, contracts, invoices, and work plans into actionable decisions and follow-ups. It won 1st Place at the AI Innovation Bootcamp and reflects Albaraa's focus on building practical products, not just polished interfaces.",
          bullets: [
            "Built with Next.js, TypeScript, Tailwind CSS, Supabase, Gemini API, Qwen API, and Zod.",
            "Feasibility analysis, blueprint generation, contract extraction, invoice approval, and scope-change detection.",
            "Operations dashboard for project health, payment milestones, and decision alerts.",
            "Live at docupilot.site.",
          ],
          closing: "",
        },
        projects: {
          title: "Selected projects",
          lead: "A few projects from Albaraa's archive — each shipped or prototyped end-to-end:",
          bullets: [
            "DocuPilot — AI Business Operations Platform (1st Place, AI Innovation Bootcamp). Live at docupilot.site.",
            "TechPath — Full-stack web app generating personalized learning roadmaps with the Anthropic Claude API.",
            "Sanadk — Accessibility app (UX/UI) built on user research with low- and high-fidelity prototypes.",
            "Slide-Mind — Java flashcard generator using AI and API integration.",
          ],
          closing: "",
        },
        skills: {
          title: "Strongest skills",
          lead: "Albaraa's strongest skills span programming, AI products, product thinking, and turning ideas into usable applications.",
          bullets: [
            "Programming: Python, SQL, Java, JavaScript, TypeScript.",
            "Web & frameworks: React, Next.js, Tailwind CSS.",
            "Data & AI: Pandas, NumPy, Data Analysis, OpenCV, AI APIs.",
            "Tools: Git, GitHub, VS Code, PyCharm, Figma, Supabase.",
            "Professional: analytical thinking, communication, leadership, and work management.",
          ],
          closing: "",
        },
        experience: {
          title: "Professional experience",
          lead: "Albaraa has hands-on experience across product management, robotics engineering, summer programs, technical projects, and community leadership.",
          bullets: [
            "Product Management Intern — Soum: user research, competitor analysis, and product-data cleanup.",
            "Robotics Engineering Intern — Smart Method: an AI-powered robotic arm and 3D robotic models.",
            "Summer Program Director — Al-Aqsa Institute: led teaching teams and improved parent satisfaction.",
            "Built projects like DocuPilot, TechPath, Sanadk, and Slide-Mind.",
          ],
          closing: "",
        },
        leadership: {
          title: "Leadership & community impact",
          lead: "Albaraa has led and contributed to community initiatives and broad tech programs — from organizing events and workshops to leading teams and student projects.",
          bullets: [
            "5,000+ participants in training bootcamps (Project Management Lead, GDGoC University of Jeddah).",
            "450+ participants at major regional tech events in the Western Region.",
            "65+ members in the University of Jeddah Drone Club (Vice Leader).",
            "193+ documented volunteering and community hours.",
          ],
          closing: "",
        },
        availability: {
          title: "What Albaraa is open to",
          lead: "Albaraa is open to building and contributing across several directions:",
          bullets: [
            "AI-powered products and software engineering roles.",
            "Project / product management and user-centric problem solving.",
            "Collaboration on impactful projects.",
            "Formal presenting and community involvement.",
          ],
          closing: "",
        },
        contact: {
          title: "How to contact or collaborate",
          lead: "The best way to reach out is through the Contact page or direct email. Albaraa is available for collaboration, programming and AI products, project/product management, initiatives, formal presenting, and professional photography.",
          bullets: [
            "Email: albaraa.a.alnahari@gmail.com",
            "LinkedIn: linkedin.com/in/albaraa-alnahari",
            "GitHub: github.com/AlbaraaAlnahari",
            "X / Twitter: x.com/x_ff",
          ],
          closing: "",
        },
        unknown: {
          title: "I can help with verified information",
          lead: "I can help with verified information about Albaraa, his projects, and his experience. Try asking about DocuPilot, his skills, his experience, his leadership impact, or ways to collaborate.",
          bullets: [],
          closing: "",
        },
        private: {
          title: "Not in the public archive",
          lead: "I don't have that information in the public portfolio archive. You can contact Albaraa directly through the Contact page.",
          bullets: [],
          closing: "",
        },
      },
      profile: {
        label: "PROFILE SNAPSHOT",
        roles: {
          student: "Software Engineering Student",
          aiBuilder: "AI Builder",
          fullStack: "Full-stack Developer",
          productMinded: "Product-minded",
          leadership: "Leadership & Community",
        },
        stats: {
          usersResearched: "users researched",
          bootcampParticipants: "bootcamp participants",
          eventParticipants: "event participants",
          clubMembers: "club members",
          firstPlace: "place AI bootcamp",
        },
      },
      source: {
        label: "SOURCE & STATUS",
        rows: {
          engine: { k: "ENGINE", v: "Local knowledge base" },
          data: { k: "DATA", v: "Verified résumé + portfolio" },
          externalAi: { k: "EXTERNAL AI", v: "None" },
          privacy: { k: "PRIVACY", v: "No message leaves the page" },
        },
        ctaPrompt: "Want to talk directly?",
        cta: "Open Contact",
      },
    },
  },
} as const;
