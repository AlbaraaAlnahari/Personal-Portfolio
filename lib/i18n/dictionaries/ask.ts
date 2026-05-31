/**
 * ask — copy for the "Ask Albaraa AI" interactive console (the /ask surface).
 *
 * Localizes the static chrome of the console only: intro header, console
 * labels/actions, the input row, the suggested-prompt panel, the profile
 * snapshot, and the source/status panel. The deterministic local matcher in
 * lib/albaraa-knowledge.ts (keywords + answer bodies) is AI/backend logic and is
 * NOT localized here; the suggested questions therefore carry an Arabic DISPLAY
 * label while the component still feeds the canonical English question to the
 * matcher so routing stays correct. The initial greeting (a static seeded
 * message) is localized here. English values are byte-faithful to the source.
 *
 * Brand/tech tokens (ALBARAA OS, DocuPilot, /ask, etc.) stay Latin per glossary.
 */
export const ask = {
  ar: {
    ask: {
      eyebrow: "ALBARAA OS / ذكاء شخصي",
      title: "اسأل ذكاء البراء",
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
        logAria: "محادثة مع اسأل ذكاء البراء",
        copy: "نسخ",
        copied: "تم النسخ",
        copyAria: "نسخ الإجابة",
        openContact: "افتح صفحة التواصل",
      },
      input: {
        srLabel: "اسأل عن مشاريع البراء أو مهاراته أو قيادته أو فرص التعاون",
        placeholder: "اسأل عن المشاريع أو المهارات أو القيادة أو التعاون...",
        sendAria: "أرسل الرسالة",
        hint: "ENTER للإرسال · SHIFT+ENTER لسطر جديد · أرشيف محلي، بلا ذكاء خارجي",
      },
      greeting: {
        title: "اسأل ذكاء البراء",
        lead:
          "مرحبًا، أنا «اسأل ذكاء البراء» — مساعد أرشيف مبنيّ من سيرة البراء الموثّقة وأرشيف مشاريعه. اسألني عن مشاريعه أو مهاراته أو خبرته أو قيادته أو كيفية التعاون معه.",
      },
      suggested: {
        label: "ابدأ من هنا",
        note: "الإجابات مُولّدة من بيانات موثّقة من ملف الأعمال.",
        items: {
          profile: "من هو البراء باختصار؟",
          docupilot: "ما قصة DocuPilot؟",
          skills: "ما أقوى مهارات البراء التقنية؟",
          leadership: "ما الأثر القيادي الذي حقّقه البراء؟",
          experience: "ما الخبرة التي يمتلكها البراء؟",
          contact: "كيف أتواصل مع البراء أو أتعاون معه؟",
        },
      },
      profile: {
        label: "لمحة عن الملف",
        roles: {
          student: "طالب هندسة برمجيات",
          aiBuilder: "باني منتجات ذكاء اصطناعي",
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
        ctaPrompt: "تحب نتحدّث مباشرة؟",
        cta: "افتح صفحة التواصل",
      },
    },
  },
  en: {
    ask: {
      eyebrow: "ALBARAA OS / PERSONAL INTELLIGENCE",
      title: "Ask Albaraa AI",
      intro:
        "Explore my projects, skills, leadership experience, and documented impact through an interactive personal archive assistant.",
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
        copy: "COPY",
        copied: "COPIED",
        copyAria: "Copy answer",
        openContact: "OPEN CONTACT",
      },
      input: {
        srLabel: "Ask about Albaraa's projects, skills, leadership, or collaboration",
        placeholder: "Ask about projects, skills, leadership, or collaboration...",
        sendAria: "Send message",
        hint: "ENTER TO SEND · SHIFT+ENTER FOR A NEW LINE · LOCAL ARCHIVE, NO EXTERNAL AI",
      },
      greeting: {
        title: "Ask Albaraa AI",
        lead:
          "Hi, I'm Ask Albaraa AI — a portfolio assistant built from Albaraa's verified résumé and project archive. Ask me about his projects, skills, experience, leadership, or how to collaborate.",
      },
      suggested: {
        label: "START WITH",
        note: "Answers are generated from verified portfolio data.",
        items: {
          profile: "Who is Albaraa?",
          docupilot: "What is DocuPilot?",
          skills: "What are Albaraa's strongest skills?",
          leadership: "What leadership impact has Albaraa made?",
          experience: "What experience does Albaraa have?",
          contact: "How can I contact or collaborate with Albaraa?",
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
