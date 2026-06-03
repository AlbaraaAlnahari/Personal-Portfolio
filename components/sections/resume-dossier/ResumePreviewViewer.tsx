"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useThemeName } from "@/hooks/useThemeName";

// =====================================================
// RESUME PREVIEW VIEWER — theme-aware, bilingual faithful CV document viewer
//
// A realistic desktop-style document window (NOT an embedded PDF) that mirrors
// the OFFICIAL résumé: same name, title, contact row, and the same section
// order / titles / entries / dates / bullets as
// public/resume/Albaraa-Alnahari-Resume.pdf —
//   Summary → Professional Experience → Education → Projects →
//   Organisations → Skills → Languages.
//
// Locale-aware: English locale renders the English document (LTR); Arabic
// locale renders a professional Arabic translation of the same CV (RTL). Brand,
// platform, technology and project names stay Latin in both. Only the real PDF
// is the source of truth for Open / Download — the sheet is an HTML preview.
//
// The real PDF is never modified and is reached through exactly two actions:
//   • Open (titlebar)  → href=PDF, target=_blank rel=noopener (NO download)
//   • Download (footer) → href=PDF, download
//
// Theme (useThemeName): warm = cream paper sheet + dark ink on a deeper-cream
// canvas; navy = graphite slate sheet (#111827) + light ink on near-black.
// =====================================================

const PDF_PATH = "/resume/Albaraa-Alnahari-Resume.pdf";
const PDF_FILENAME = "Albaraa-Alnahari-Resume.pdf";

// Verified contact channels (mirror lib/albaraa-knowledge.ts / SiteFooter).
const LINKS = {
  email: "mailto:albaraa.a.alnahari@gmail.com",
  github: "https://github.com/AlbaraaAlnahari",
  linkedin: "https://www.linkedin.com/in/albaraa-alnahari",
} as const;

const SECTIONS = {
  en: {
    summary: "Summary",
    experience: "Professional Experience",
    education: "Education",
    projects: "Projects",
    organisations: "Organisations",
    skills: "Skills",
    languages: "Languages",
  },
  ar: {
    summary: "الملخص",
    experience: "الخبرة المهنية",
    education: "التعليم",
    projects: "المشاريع",
    organisations: "القيادة والمجتمع",
    skills: "المهارات",
    languages: "اللغات",
  },
} as const;

// English CV — a faithful mirror of the official (English) PDF.
const CV_EN = {
  name: "Albaraa Alnahari",
  title: "Software Engineering Student",
  email: "albaraa.a.alnahari@gmail.com",
  phone: "+966 55 772 7210",
  location: "Saudi Arabia",
  summary:
    "Software Engineering student with experience in full-stack development, AI-enabled products, user research, and project execution. Built web and mobile applications, integrated AI APIs, and translated user needs into practical product features. Skilled in Java, C++, Python, React, Next.js, SQL, and data analysis, with leadership experience across tech programs and student communities.",
  experience: [
    {
      role: "Product Management Intern",
      org: "Soum Company",
      meta: "Nov 2025 – Mar 2026 · Jeddah, Saudi Arabia",
      bullets: [
        "Supported end-to-end development of a product feature across research, design, testing, and execution.",
        "Conducted user research with 100+ users, translating pain points into product requirements, user stories, and 3+ use cases.",
        "Performed competitor analysis and 4+ market benchmarks to identify product opportunities and support feature decisions.",
        "Tested and iterated on product workflows, improving usability, issue detection, and data-driven performance tracking.",
      ],
    },
    {
      role: "Robotics Engineering Intern",
      org: "Smart Method Company",
      meta: "Jun 2025 – Dec 2025 · Jeddah, Saudi Arabia",
      bullets: [
        "Completed a full Robotics Engineer Certification with hands-on work in AI robotics, 3D modeling, and automation.",
        "Developed an AI-powered robotic arm and AI chatbot prototype while solving on-site factory challenges.",
      ],
    },
    {
      role: "Summer Program Director & Supervisor",
      org: "Al-Aqsa Private Schools Institute (Seasonal)",
      meta: "2023 – 2025 · Jeddah, Saudi Arabia",
      bullets: [
        "Promoted from Supervisor to Director after leading two consecutive summer programs.",
        "Managed 8+ teachers and 70+ students across 5 learning levels, increasing enrollment by 30% through program development and parent engagement.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Software Engineering",
      org: "University of Jeddah",
      meta: "Expected Graduation: 2027 · Jeddah, Saudi Arabia",
    },
  ],
  projects: [
    {
      name: "DocuPilot — AI Business Operations Platform",
      meta: "1st Place, AI Innovation Bootcamp · 05/2026 – Present",
      tech: "Next.js, TypeScript, Tailwind CSS, Supabase, Gemini API, Qwen API, Zod",
      bullets: [
        "Built a full-stack AI SaaS platform that converts business documents and client requests into structured workflows, risks, approvals, and project decisions.",
        "Developed AI workflows for feasibility analysis, business blueprint generation, contract extraction, invoice approval, scope-change detection, and document-based Q&A.",
        "Integrated Supabase with Zod-validated AI JSON outputs and designed an operations dashboard for project health, payments, obligations, and urgent alerts.",
      ],
      link: { label: "docupilot.site", href: "https://docupilot.site" },
    },
    {
      name: "Slide-Mind Flashcard Generator — Java",
      meta: "08/2025 – 10/2025",
      tech: "",
      bullets: [
        "Built a modular Java application that uses AI and API integration to generate interactive learning flashcards.",
        "Implemented file I/O and an extensible architecture to support future feature expansion.",
      ],
      link: null,
    },
    {
      name: "Sanadk Accessibility App — UX/UI Design",
      meta: "02/2026 – 05/2026",
      tech: "Figma, Google Forms, User Research, Prototyping",
      bullets: [
        "Analyzed 77 survey responses to identify accessibility needs for visually impaired and wheelchair users.",
        "Designed mobile prototypes and user-centered task flows for product scanning, accessible navigation, and voice-assisted interaction.",
      ],
      link: null,
    },
    {
      name: "TechPath — Full Stack Web Application",
      meta: "04/2026 – 05/2026",
      tech: "React.js, JavaScript, Tailwind CSS, Anthropic API (Claude AI), Responsive Design",
      bullets: [
        "Built an AI-powered roadmap generator that personalizes learning timelines, milestones, and resources based on user goals and availability.",
        "Integrated Anthropic Claude API to generate adaptive learning roadmaps and educational recommendations.",
        "Developed responsive front-end components for roadmap visualization, progress tracking, assessments, and interactive learning workflows.",
      ],
      link: null,
    },
  ],
  organisations: [
    {
      role: "Admin & Voice Host",
      org: "PreHack",
      meta: "05/2024 – Present",
      bullets: [
        "Organized tech events and live sessions reaching 650+ participants, including Hackwave at University of Jeddah.",
        "Managed AI and Cybersecurity bootcamps supporting 150+ participants in hackathon preparation.",
      ],
    },
    {
      role: "Leadership & Tech Activities",
      org: "University of Jeddah",
      meta: "03/2024 – Present",
      bullets: [
        "Revived the Drone Club by establishing 5 committees and recruiting 65+ active members.",
        "Managed a Google × GDSC Data Science Bootcamp with 5,000+ participants and organized 10+ tech events/workshops.",
      ],
    },
  ],
  skills: [
    { label: "Programming", items: "Python, SQL, MySQL, Java, C++" },
    { label: "Web", items: "HTML, CSS, TypeScript, JavaScript" },
    { label: "Data & AI", items: "Pandas, NumPy, Data Analysis, OpenCV, AI APIs" },
    { label: "Frameworks & Libraries", items: "React, Next.js, Tailwind CSS, Flutter" },
    { label: "Tools", items: "Git, GitHub, VS Code, PyCharm, Supabase, Figma" },
    { label: "Soft Skills", items: "Analytical Thinking, Communication, Leadership" },
  ],
  languages: "English — Proficient   ·   Arabic — Native / Bilingual",
  updated: "Last updated · 2026",
} as const;

// Arabic CV — a professional Arabic translation of the same official résumé.
// Brand / platform / technology / project names stay Latin (per the glossary).
const CV_AR = {
  name: "البراء النهاري",
  title: "طالب هندسة برمجيات",
  email: "البريد",
  phone: "الهاتف",
  location: "السعودية",
  summary:
    "طالب هندسة برمجيات لديه خبرة في تطوير الويب والتطبيقات، وبناء منتجات مدعومة بالذكاء الاصطناعي، وأبحاث المستخدم، وتنفيذ المشاريع. عملت على بناء تطبيقات ويب وجوال، ودمج واجهات الذكاء الاصطناعي، وتحويل احتياجات المستخدمين إلى مزايا عملية داخل المنتج. أمتلك مهارات في Java وC++ وPython وReact وNext.js وSQL وتحليل البيانات، إلى جانب خبرة قيادية في البرامج التقنية والمجتمعات الطلابية.",
  experience: [
    {
      role: "متدرّب في إدارة المنتجات",
      org: "شركة سوم",
      meta: "نوفمبر 2025 — مارس 2026 · جدة، المملكة العربية السعودية",
      bullets: [
        "دعمت تطوير ميزة منتج من البداية إلى النهاية عبر البحث، والتصميم، والاختبار، والتنفيذ.",
        "أجريت بحث مستخدم مع أكثر من 100 مستخدم، وحوّلت نقاط الألم إلى متطلبات منتج، وقصص مستخدم، وأكثر من 3 حالات استخدام.",
        "حلّلت المنافسين وأكثر من 4 مقارنات سوقية لاكتشاف فرص المنتج ودعم قرارات الميزات.",
        "اختبرت وكرّرت على مسارات المنتج لتحسين قابلية الاستخدام، واكتشاف المشكلات، وتتبّع الأداء بالاعتماد على البيانات.",
      ],
    },
    {
      role: "متدرّب في هندسة الروبوتات",
      org: "شركة Smart Method",
      meta: "يونيو 2025 — ديسمبر 2025 · جدة، المملكة العربية السعودية",
      bullets: [
        "أكملت شهادة مهندس روبوتات من خلال عمل تطبيقي في روبوتات الذكاء الاصطناعي، والنمذجة ثلاثية الأبعاد، والأتمتة.",
        "طوّرت ذراعًا روبوتية مدعومة بالذكاء الاصطناعي ونموذجًا أوليًا لروبوت محادثة، مع العمل على حلول لتحديات ميدانية.",
      ],
    },
    {
      role: "مدير ومشرف البرنامج الصيفي",
      org: "معهد مدارس الأقصى الأهلية",
      meta: "2023 — 2025 · جدة، المملكة العربية السعودية",
      bullets: [
        "ترقّيت من مشرف إلى مدير بعد قيادة برنامجين صيفيين متتاليين.",
        "أدرت أكثر من 8 معلمين وأكثر من 70 طالبًا عبر 5 مستويات تعليمية، وساهمت في رفع التسجيل بنسبة 30% من خلال تطوير البرنامج وتنسيق أولياء الأمور.",
      ],
    },
  ],
  education: [
    {
      degree: "بكالوريوس هندسة البرمجيات",
      org: "جامعة جدة",
      meta: "متوقّع التخرّج: 2027 · جدة، المملكة العربية السعودية",
    },
  ],
  projects: [
    {
      name: "DocuPilot — منصة عمليات الأعمال بالذكاء الاصطناعي",
      meta: "المركز الأول، معسكر ابتكار الذكاء الاصطناعي · 05/2026 — حتى الآن",
      tech: "Next.js, TypeScript, Tailwind CSS, Supabase, Gemini API, Qwen API, Zod",
      bullets: [
        "بنيت منصة SaaS متكاملة مدعومة بالذكاء الاصطناعي تحوّل مستندات الأعمال وطلبات العملاء إلى مسارات عمل ومخاطر وموافقات وقرارات مشاريع منظَّمة.",
        "طوّرت مسارات ذكاء اصطناعي لتحليل الجدوى، وتوليد مخططات الأعمال، واستخراج العقود، واعتماد الفواتير، واكتشاف تغيّر النطاق، والأسئلة والأجوبة المعتمدة على المستندات.",
        "دمجت Supabase مع مخرجات JSON مُتحقَّق منها عبر Zod، وصمّمت لوحة عمليات لمتابعة صحة المشاريع والمدفوعات والالتزامات والتنبيهات العاجلة.",
      ],
      link: { label: "docupilot.site", href: "https://docupilot.site" },
    },
    {
      name: "Slide-Mind — مولّد بطاقات تعليمية (Java)",
      meta: "08/2025 — 10/2025",
      tech: "",
      bullets: [
        "بنيت تطبيق Java معياريًا يستخدم الذكاء الاصطناعي وتكامل الواجهات البرمجية لتوليد بطاقات تعليمية تفاعلية.",
        "نفّذت إدخال/إخراج الملفات وبنية قابلة للتوسّع لدعم إضافة مزايا مستقبلية.",
      ],
      link: null,
    },
    {
      name: "Sanadk — تطبيق إتاحة الوصول (تصميم UX/UI)",
      meta: "02/2026 — 05/2026",
      tech: "Figma, Google Forms, User Research, Prototyping",
      bullets: [
        "حلّلت 77 ردًا على استبيان لتحديد احتياجات الإتاحة لذوي الإعاقة البصرية ومستخدمي الكراسي المتحركة.",
        "صمّمت نماذج أولية للجوال ومسارات مهام تتمحور حول المستخدم لمسح المنتجات، والتنقّل الميسّر، والتفاعل الصوتي.",
      ],
      link: null,
    },
    {
      name: "TechPath — تطبيق ويب متكامل",
      meta: "04/2026 — 05/2026",
      tech: "React.js, JavaScript, Tailwind CSS, Anthropic API (Claude AI), Responsive Design",
      bullets: [
        "بنيت مولّد خرائط طريق مدعومًا بالذكاء الاصطناعي يخصّص جداول التعلّم والمحطات والمصادر بناءً على أهداف المستخدم ووقته المتاح.",
        "دمجت واجهة Anthropic Claude لتوليد خرائط تعلّم تكيُّفية وتوصيات تعليمية.",
        "طوّرت مكوّنات واجهة أمامية متجاوبة لعرض خرائط الطريق، وتتبّع التقدّم، والتقييمات، ومسارات التعلّم التفاعلية.",
      ],
      link: null,
    },
  ],
  organisations: [
    {
      role: "مسؤول ومقدّم صوتي",
      org: "PreHack",
      meta: "05/2024 — حتى الآن",
      bullets: [
        "نظّمت فعاليات تقنية وجلسات مباشرة وصلت إلى أكثر من 650 مشاركًا، من بينها Hackwave في جامعة جدة.",
        "أدرت معسكرات في الذكاء الاصطناعي والأمن السيبراني لدعم أكثر من 150 مشاركًا في التحضير للهاكاثونات.",
      ],
    },
    {
      role: "القيادة والأنشطة التقنية",
      org: "جامعة جدة",
      meta: "03/2024 — حتى الآن",
      bullets: [
        "أعدت إحياء نادي الدرون عبر تأسيس 5 لجان واستقطاب أكثر من 65 عضوًا نشطًا.",
        "أدرت معسكر Google × GDSC لعلوم البيانات بأكثر من 5,000 مشارك، ونظّمت أكثر من 10 فعاليات وورش تقنية.",
      ],
    },
  ],
  skills: [
    { label: "البرمجة", items: "Python, SQL, MySQL, Java, C++" },
    { label: "الويب", items: "HTML, CSS, TypeScript, JavaScript" },
    { label: "البيانات والذكاء الاصطناعي", items: "Pandas, NumPy, Data Analysis, OpenCV, AI APIs" },
    { label: "الأطر والمكتبات", items: "React, Next.js, Tailwind CSS, Flutter" },
    { label: "الأدوات", items: "Git, GitHub, VS Code, PyCharm, Supabase, Figma" },
    { label: "المهارات الشخصية", items: "التفكير التحليلي، التواصل، القيادة" },
  ],
  languages: "الإنجليزية — إتقان متقدّم   ·   العربية — لغة أم / ثنائية اللغة",
  updated: "آخر تحديث · 2026",
} as const;

export function ResumePreviewViewer() {
  const { t, isAr } = useLanguage();
  const p = t.resume.preview;
  const warm = useThemeName() === "warm";
  const cv = isAr ? CV_AR : CV_EN;
  const s = isAr ? SECTIONS.ar : SECTIONS.en;
  const dir = isAr ? "rtl" : "ltr";
  // Arabic meta/date lines use the body font (the mono fallback renders Arabic
  // poorly); English keeps the technical monospace dates.
  const meta = isAr ? "" : "font-mono";

  const c = warm
    ? {
        shell: "#efe9dc", bar: "rgba(120,95,55,0.14)", canvas: "#e7e0cf",
        sheet: "#faf6ea", ink: "#1d2740", sub: "#414c66", faint: "#727a90",
        line: "rgba(29,39,64,0.12)", thumb: "rgba(29,39,64,0.28)",
        sheetShadow: "0 16px 40px rgba(40,30,10,0.14)",
      }
    : {
        shell: "#0c111e", bar: "rgba(140,165,215,0.14)", canvas: "#080c16",
        sheet: "#111827", ink: "#eef3ff", sub: "#b6c2d8", faint: "#8492ab",
        line: "rgba(130,165,215,0.15)", thumb: "rgba(150,170,210,0.32)",
        sheetShadow: "0 16px 40px rgba(0,0,0,0.5)",
      };
  const accent = "var(--accent)";

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ backgroundColor: c.shell, border: `1px solid rgba(var(--rgb-cyan),0.26)` }}
    >
      {/* top edge accent */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(var(--rgb-cyan),0.55), transparent)" }}
      />

      {/* ── Titlebar — the single Open action lives here ───────── */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-b" style={{ borderColor: c.bar }}>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full" style={{ background: "#e0695b" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#e3b04e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#56b87f" }} />
        </div>
        <span dir="ltr" className="ltr-isolate font-mono text-[11px] md:text-xs truncate" style={{ color: c.sub }}>
          {p.window}
        </span>
        <a
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="ie-focus inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-[11px] md:text-xs no-underline shrink-0 transition-all duration-300 hover:-translate-y-px"
          style={{ background: "rgba(var(--rgb-cyan),0.12)", border: "1px solid rgba(var(--rgb-cyan),0.45)", color: accent }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
          {p.open}
        </a>
      </div>

      {/* ── Scrollable canvas with the résumé sheet ────────────── */}
      <div
        className="overflow-y-auto overflow-x-hidden px-3 py-6 md:px-6 md:py-8 max-h-[74vh] md:max-h-[740px]"
        style={{ backgroundColor: c.canvas, scrollbarWidth: "thin", scrollbarColor: `${c.thumb} transparent` }}
      >
        {/* The document follows the active locale: English (LTR) or a faithful
            Arabic translation (RTL). */}
        <article
          dir={dir}
          className="mx-auto max-w-4xl rounded-xl px-6 py-7 md:px-10 md:py-10"
          style={{ backgroundColor: c.sheet, border: `1px solid ${c.line}`, boxShadow: c.sheetShadow }}
        >
          {/* CV header */}
          <header className="text-center space-y-2.5">
            <h3 className="text-[24px] md:text-[30px] font-bold tracking-tight leading-[1.2]" style={{ color: c.ink }}>
              {cv.name}
            </h3>
            <p className="text-[14px] md:text-[16px] font-medium" style={{ color: accent }}>
              {cv.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 pt-1.5 text-[12px] md:text-[13px]">
              <Contact href={LINKS.email} color={accent} sub={c.sub} label={cv.email} icon="email" />
              <Dot faint={c.faint} />
              <Contact sub={c.sub} label={cv.phone} icon="phone" color={accent} />
              <Dot faint={c.faint} />
              <Contact sub={c.sub} label={cv.location} icon="location" color={accent} />
              <Dot faint={c.faint} />
              <Contact href={LINKS.linkedin} external color={accent} sub={c.sub} label="LinkedIn" icon="linkedin" />
              <Dot faint={c.faint} />
              <Contact href={LINKS.github} external color={accent} sub={c.sub} label="GitHub" icon="github" />
            </div>
          </header>

          <div className="my-5 h-px" style={{ background: c.line }} />

          <div className="space-y-6">
            {/* Summary */}
            <Section title={s.summary} accent={accent} ink={c.ink} line={c.line}>
              <p className="text-[13px] md:text-[14px] leading-[1.85]" style={{ color: c.sub }}>
                <BidiText text={cv.summary} />
              </p>
            </Section>

            {/* Professional Experience */}
            <Section title={s.experience} accent={accent} ink={c.ink} line={c.line}>
              <ul className="space-y-4">
                {cv.experience.map((e) => (
                  <li key={e.role + e.org}>
                    <Entry role={e.role} org={e.org} meta={e.meta} metaFont={meta} ink={c.ink} faint={c.faint} accent={accent} />
                    <Bullets items={e.bullets} sub={c.sub} accent={accent} />
                  </li>
                ))}
              </ul>
            </Section>

            {/* Education */}
            <Section title={s.education} accent={accent} ink={c.ink} line={c.line}>
              <ul className="space-y-2">
                {cv.education.map((ed) => (
                  <li key={ed.degree}>
                    <p className="text-[13.5px] md:text-[15px] font-semibold leading-snug" style={{ color: c.ink }}>
                      {ed.degree}
                      <span className="font-normal" style={{ color: accent }}> — {ed.org}</span>
                    </p>
                    <p className={`mt-1 text-[11px] md:text-[12px] ${meta}`} style={{ color: c.faint }}>
                      {ed.meta}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Projects */}
            <Section title={s.projects} accent={accent} ink={c.ink} line={c.line}>
              <ul className="space-y-4">
                {cv.projects.map((pr) => (
                  <li key={pr.name}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <p className="text-[13.5px] md:text-[15px] font-semibold leading-snug" style={{ color: c.ink }}>
                        {pr.name}
                      </p>
                      <span className={`text-[11px] md:text-[12px] shrink-0 ${meta}`} style={{ color: c.faint }}>
                        {pr.meta}
                      </span>
                    </div>
                    {pr.tech && (
                      <p className="mt-1 text-[11.5px] md:text-[12.5px] italic" style={{ color: c.sub }}>
                        {pr.tech}
                      </p>
                    )}
                    <Bullets items={pr.bullets} sub={c.sub} accent={accent} />
                    {pr.link && (
                      <a
                        href={pr.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ie-focus mt-1.5 inline-flex items-center gap-1 text-[11.5px] md:text-[12.5px] font-medium no-underline hover:underline"
                        style={{ color: accent, textUnderlineOffset: "2px" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                        <span dir="ltr" className="ltr-isolate">{pr.link.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Organisations */}
            <Section title={s.organisations} accent={accent} ink={c.ink} line={c.line}>
              <ul className="space-y-4">
                {cv.organisations.map((o) => (
                  <li key={o.role + o.org}>
                    <Entry role={o.role} org={o.org} meta={o.meta} metaFont={meta} ink={c.ink} faint={c.faint} accent={accent} />
                    <Bullets items={o.bullets} sub={c.sub} accent={accent} />
                  </li>
                ))}
              </ul>
            </Section>

            {/* Skills */}
            <Section title={s.skills} accent={accent} ink={c.ink} line={c.line}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {cv.skills.map((g) => (
                  <div key={g.label}>
                    <p className="text-[11.5px] md:text-[12.5px] font-semibold tracking-wide" style={{ color: c.ink }}>
                      {g.label}
                    </p>
                    <p className="mt-0.5 text-[12px] md:text-[13px] leading-[1.7]" style={{ color: c.sub }}>
                      <BidiText text={g.items} />
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Languages */}
            <Section title={s.languages} accent={accent} ink={c.ink} line={c.line}>
              <p className="text-[12.5px] md:text-[13.5px]" style={{ color: c.sub }}>
                {cv.languages}
              </p>
            </Section>
          </div>

          {/* CV footer */}
          <div className="mt-7 pt-3.5 flex items-center justify-between gap-3 border-t" style={{ borderColor: c.line }}>
            <span className={`text-[10px] md:text-[11px] ${meta}`} style={{ color: c.faint }}>
              {cv.updated}
            </span>
            <span dir="ltr" className="ltr-isolate font-mono text-[10px] md:text-[11px]" style={{ color: c.faint }}>
              {PDF_FILENAME}
            </span>
          </div>
        </article>
      </div>

      {/* ── Bottom action bar — the single Download action ─────── */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-t" style={{ borderColor: c.bar }}>
        <span dir="ltr" className="ltr-isolate font-mono text-[10px] md:text-[11px] tracking-wide" style={{ color: c.faint }}>
          {p.documentTag}
        </span>
        <a
          href={PDF_PATH}
          download={PDF_FILENAME}
          className="ie-focus inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-[11px] md:text-xs no-underline transition-all duration-300 hover:-translate-y-px"
          style={{
            background: warm ? "linear-gradient(135deg, #0b6b7d, #0a8ba3)" : "linear-gradient(135deg, var(--accent), #00a6cf)",
            color: warm ? "#f4fbfd" : "#04121c",
            boxShadow: warm ? "0 6px 16px rgba(11,107,125,0.28)" : "0 0 18px rgba(var(--rgb-cyan),0.3)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" />
          </svg>
          {p.download}
        </a>
      </div>
    </div>
  );
}

function Section({
  title,
  accent,
  ink,
  line,
  children,
}: {
  title: string;
  accent: string;
  ink: string;
  line: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-3.5 h-px shrink-0" style={{ background: accent }} aria-hidden="true" />
        <h4 className="text-[12.5px] md:text-[13.5px] font-bold uppercase tracking-[0.08em]" style={{ color: ink }}>
          {title}
        </h4>
        <span className="h-px flex-1" style={{ background: line }} aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}

function Entry({
  role,
  org,
  meta,
  metaFont,
  ink,
  faint,
  accent,
}: {
  role: string;
  org: string;
  meta: string;
  metaFont: string;
  ink: string;
  faint: string;
  accent: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
      <p className="text-[13.5px] md:text-[15px] font-semibold leading-snug" style={{ color: ink }}>
        {role}
        <span className="font-normal" style={{ color: accent }}> — {org}</span>
      </p>
      <span className={`text-[11px] md:text-[12px] shrink-0 ${metaFont}`} style={{ color: faint }}>
        {meta}
      </span>
    </div>
  );
}

function Bullets({ items, sub, accent }: { items: readonly string[]; sub: string; accent: string }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-2.5">
          <span className="mt-[8px] w-1 h-1 rounded-full shrink-0" style={{ background: accent }} aria-hidden="true" />
          <span className="text-[12.5px] md:text-[13.5px] leading-[1.75]" style={{ color: sub }}>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function Dot({ faint }: { faint: string }) {
  return (
    <span aria-hidden="true" className="text-[10px] select-none" style={{ color: faint }}>
      ·
    </span>
  );
}

// Isolate contiguous Latin/technical runs as LTR so tokens like "C++" or
// "Next.js" never reorder when embedded in Arabic (RTL) prose. A no-op visually
// in English (the whole string is one isolated LTR run).
function BidiText({ text }: { text: string }) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9 .,+#/&()×:_'-]*[A-Za-z0-9+#)]|[A-Za-z0-9])/g);
  return (
    <>
      {parts.map((seg, i) =>
        !seg ? null : i % 2 === 1 ? (
          <span key={i} dir="ltr" className="ltr-isolate">
            {seg}
          </span>
        ) : (
          <span key={i}>{seg}</span>
        ),
      )}
    </>
  );
}

function Contact({
  href,
  external = false,
  color,
  sub,
  label,
  icon,
}: {
  href?: string;
  external?: boolean;
  color: string;
  sub: string;
  label: string;
  icon: "email" | "phone" | "location" | "github" | "linkedin";
}) {
  const inner = (
    <>
      <span style={{ color }}>
        {icon === "email" && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
          </svg>
        )}
        {icon === "phone" && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        )}
        {icon === "location" && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
        )}
        {icon === "github" && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85 0 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
          </svg>
        )}
        {icon === "linkedin" && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17V10H6v7h2.34zM7.17 8.86a1.36 1.36 0 1 0 0-2.72 1.36 1.36 0 0 0 0 2.72zM18 17v-3.86c0-2.06-1.1-3.02-2.57-3.02-1.19 0-1.72.65-2.02 1.11V10H11.1c.03.66 0 7 0 7h2.31v-3.91c0-.21.02-.42.08-.57.16-.42.55-.85 1.18-.85.83 0 1.16.63 1.16 1.56V17H18z" />
          </svg>
        )}
      </span>
      <span className={href ? "group-hover:underline" : undefined} style={{ textUnderlineOffset: "2px" }}>
        {label}
      </span>
    </>
  );

  if (!href) {
    return (
      <span className="inline-flex items-center gap-1.5" style={{ color: sub }}>
        {inner}
      </span>
    );
  }
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="ie-focus group inline-flex items-center gap-1.5 no-underline rounded outline-none transition-colors duration-200"
      style={{ color: sub }}
    >
      {inner}
    </a>
  );
}
