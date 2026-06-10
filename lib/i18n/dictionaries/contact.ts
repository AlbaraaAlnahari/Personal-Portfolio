/**
 * contact — the "Direct Line" communication console (ContactDirectLine).
 *
 * Premium personal Saudi/Arab portfolio voice: warm, confident, human. English
 * values are byte-faithful to the current source strings. Brand/tech/URLs and
 * the email stay Latin (rendered dir="ltr" in the component). Strings that wrap
 * the runtime {EMAIL} value are split into before/after fragments so the email
 * itself stays an isolated Latin token in the RTL layout.
 */
export const contact = {
  ar: {
    contact: {
      eyebrow: "خط مباشر",
      route: "/contact",
      title: {
        lead: "خلّنا",
        accent: "نتواصل.",
      },
      intro:
        "فرص، تعاون، منتجات ذكاء اصطناعي، أدوار هندسية، وأحاديث جادّة حول بناء المنتجات — أرسل رسالتك وسأردّ في أقرب وقت ممكن.",
      availabilityBanner: "متاح للفرص",

      form: {
        heading: "أرسل رسالة",
        optional: "اختياري",
        fields: {
          name: { label: "الاسم", placeholder: "اسمك" },
          email: { label: "البريد الإلكتروني", placeholder: "you@example.com" },
          topic: { label: "الموضوع", groupAria: "الموضوع" },
          message: {
            label: "الرسالة",
            placeholder: "أخبرني بما تبنيه، أو ما تحتاجه، أو كيف يمكننا العمل معًا.",
          },
          link: {
            label: "الرابط",
            placeholder: "رابط مشروع، أو معرض أعمال، أو لينكدإن، أو مرجع",
          },
        },
        topics: {
          opportunity: "فرصة",
          collaboration: "تعاون",
          aiProduct: "برمجة / منتجات ذكاء اصطناعي",
          projectManagement: "إدارة مشاريع / منتجات",
          speaking: "التعليق الصوتي / التقديم الرسمي",
          general: "عام",
        },
        honeypotLabel: "الشركة",
        validation: {
          name: "من فضلك أضف اسمك.",
          email: "من فضلك أضف بريدك الإلكتروني.",
          emailInvalid: "هذا البريد لا يبدو صحيحًا.",
          message: "حدّثني عنه قليلًا.",
        },
        send: "أرسل الرسالة",
        sending: "جارٍ الإرسال…",
        error: {
          before: "تعذّر إرسال رسالتك. حاول مرة أخرى أو راسلني مباشرة على ",
          after: ".",
        },
      },

      success: {
        heading: "تم إرسال رسالتك",
        body: "سأعود إليك قريبًا. وحتى ذلك الحين، يمكنك التواصل معي مباشرة عبر قنوات التواصل.",
        rows: {
          response: { k: "الردّ", v: "في أقرب وقت ممكن" },
        },
        reset: "اكتب رسالة أخرى",
      },

      channels: {
        heading: "قنوات التواصل",
        verifiedRoutes: "روابط موثّقة",
        description: "تفضّل طريقًا مباشرًا؟ تواصل معي عبر أيٍّ من هذه القنوات.",
        emailLabel: "البريد الإلكتروني",
        emailAria: { before: "راسل البراء على ", after: "" },
        copy: "نسخ",
        copied: "تم النسخ",
        copyAria: "نسخ عنوان البريد الإلكتروني",
        copiedAria: "تم نسخ عنوان البريد الإلكتروني",
        opensNewTab: "— يفتح في تبويب جديد",
      },

      availability: {
        statusTag: "متاح للفرص",
        availableFor: "متاح للتعاون",
        items: {
          aiProducts: "برمجة / منتجات ذكاء اصطناعي",
          projectManagement: "إدارة مشاريع / منتجات",
          collaborations: "تعاونات",
          speaking: "التعليق الصوتي / التقديم الرسمي",
          initiatives: "المبادرات / التطوع",
          photography: "التصوير الاحترافي",
        },
      },

      closing: {
        before: "تفضّل البريد؟ اكتب لي مباشرة على ",
        after: " — أقرأ كل رسالة.",
      },
    },
  },
  en: {
    contact: {
      eyebrow: "DIRECT LINE",
      route: "/contact",
      title: {
        lead: "Let’s",
        accent: "connect.",
      },
      intro:
        "Opportunities, collaboration, AI products, engineering roles, and serious conversations about building products — send your message and I’ll respond as soon as possible.",
      availabilityBanner: "OPEN TO OPPORTUNITIES",

      form: {
        heading: "Send a message",
        optional: "OPTIONAL",
        fields: {
          name: { label: "NAME", placeholder: "Your name" },
          email: { label: "EMAIL", placeholder: "you@example.com" },
          topic: { label: "TOPIC", groupAria: "Topic" },
          message: {
            label: "MESSAGE",
            placeholder:
              "Tell me what you’re building, what you need, or how we can work together.",
          },
          link: {
            label: "LINK",
            placeholder: "Project, portfolio, LinkedIn, or reference link",
          },
        },
        topics: {
          opportunity: "Opportunity",
          collaboration: "Collaboration",
          aiProduct: "Programming / AI Products",
          projectManagement: "Project / Product Management",
          speaking: "Voiceover / Formal Presenting",
          general: "General",
        },
        honeypotLabel: "Company",
        validation: {
          name: "Please add your name.",
          email: "Please add your email.",
          emailInvalid: "That email doesn’t look right.",
          message: "Tell me a little about it.",
        },
        send: "Send Message",
        sending: "Sending…",
        error: {
          before:
            "Couldn’t send your message. Please try again or email me directly at ",
          after: ".",
        },
      },

      success: {
        heading: "Message sent.",
        body: "I’ll get back to you soon. In the meantime, you can reach me directly through the contact channels.",
        rows: {
          response: { k: "RESPONSE", v: "As soon as possible" },
        },
        reset: "Write another message",
      },

      channels: {
        heading: "Contact Channels",
        verifiedRoutes: "VERIFIED LINKS",
        description: "Prefer a direct route? Reach me through any of these channels.",
        emailLabel: "Email",
        emailAria: { before: "Email Albaraa at ", after: "" },
        copy: "COPY",
        copied: "COPIED",
        copyAria: "Copy email address",
        copiedAria: "Email address copied",
        opensNewTab: "— opens in a new tab",
      },

      availability: {
        statusTag: "OPEN TO OPPORTUNITIES",
        availableFor: "Available for",
        items: {
          aiProducts: "Programming / AI Products",
          projectManagement: "Project / Product Management",
          collaborations: "Collaborations",
          speaking: "Voiceover / Formal Presenting",
          initiatives: "Initiatives / Volunteering",
          photography: "Professional Photography",
        },
      },

      closing: {
        before: "Prefer email? Write directly to ",
        after: " — I read every message.",
      },
    },
  },
} as const;
