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
      eyebrowIndex: "/ 05",
      route: "/contact",
      title: {
        lead: "خلّنا",
        accent: "نتواصل.",
      },
      intro:
        "فرص، تعاون، منتجات ذكاء اصطناعي، أدوار هندسية، وأحاديث جادّة حول بناء المنتجات — أرسل رسالتك وسأردّ في أقرب وقت ممكن.",
      availabilityBanner: "النظام متّصل / متاح للفرص",

      form: {
        heading: "أرسل رسالة",
        consoleTag: "وحدة الرسائل",
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
          aiProduct: "منتج ذكاء اصطناعي",
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
        deliveryNote: "قناة التسليم في انتظار تفعيل Resend.",
        error: {
          before: "تعذّر إرسال الإشارة. حاول مرة أخرى أو راسلني مباشرة على ",
          after: ".",
        },
      },

      success: {
        heading: "تم إرسال الإشارة.",
        body:
          "سأعود إليك قريبًا. وحتى ذلك الحين، يمكنك الوصول إليّ مباشرة عبر القنوات على اليسار.",
        rows: {
          route: { k: "المسار", v: "صندوق التواصل" },
          status: { k: "الحالة", v: "في قائمة المراجعة" },
          response: { k: "الردّ", v: "في أقرب وقت ممكن" },
        },
        reset: "اكتب رسالة أخرى",
      },

      channels: {
        heading: "قنوات التواصل",
        verifiedRoutes: "مسارات موثّقة",
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
        statusTag: "الحالة · متاح للفرص",
        availableFor: "متاح لـ",
        items: {
          aiProducts: "منتجات ذكاء اصطناعي",
          softwareEngineering: "هندسة البرمجيات",
          collaborations: "تعاونات",
          speaking: "التعليق الصوتي / التقديم الرسمي",
          initiatives: "المبادرات / التطوع",
          photography: "التصوير الاحترافي",
        },
      },

      closing: {
        before: "تفضّل البريد؟ اكتب مباشرة إلى ",
        after: " — أقرأ كل رسالة.",
      },
    },
  },
  en: {
    contact: {
      eyebrow: "DIRECT LINE",
      eyebrowIndex: "/ 05",
      route: "/contact",
      title: {
        lead: "Start the",
        accent: "conversation.",
      },
      intro:
        "Opportunities, collaboration, AI products, engineering roles, and thoughtful product conversations — send a message and I’ll respond as soon as possible.",
      availabilityBanner: "SYSTEM ONLINE / OPEN TO OPPORTUNITIES",

      form: {
        heading: "Send a message",
        consoleTag: "MESSAGE CONSOLE",
        optional: "OPTIONAL",
        fields: {
          name: { label: "NAME", placeholder: "Your name" },
          email: { label: "EMAIL", placeholder: "you@example.com" },
          topic: { label: "TOPIC", groupAria: "Topic" },
          message: {
            label: "MESSAGE",
            placeholder: "Tell me what you’re building, what you need, or how we can work together.",
          },
          link: {
            label: "LINK",
            placeholder: "Project, portfolio, LinkedIn, or reference link",
          },
        },
        topics: {
          opportunity: "Opportunity",
          collaboration: "Collaboration",
          aiProduct: "AI Product",
          speaking: "Speaking / Community",
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
        deliveryNote: "Delivery channel pending Resend activation.",
        error: {
          before: "Couldn’t send the signal. Please try again or email me directly at ",
          after: ".",
        },
      },

      success: {
        heading: "Signal sent.",
        body:
          "I’ll get back to you soon. In the meantime, you can reach me directly through the channels on the right.",
        rows: {
          route: { k: "ROUTE", v: "Contact inbox" },
          status: { k: "STATUS", v: "Queued for review" },
          response: { k: "RESPONSE", v: "As soon as possible" },
        },
        reset: "Write another message",
      },

      channels: {
        heading: "Open Channels",
        verifiedRoutes: "VERIFIED ROUTES",
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
        statusTag: "STATUS · OPEN TO OPPORTUNITIES",
        availableFor: "Available for",
        items: {
          aiProducts: "AI Products",
          softwareEngineering: "Software Engineering",
          collaborations: "Collaborations",
          speaking: "Speaking / Community",
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
