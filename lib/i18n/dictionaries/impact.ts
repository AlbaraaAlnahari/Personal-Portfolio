/**
 * impact — bilingual dictionary for the Impact surface.
 *
 * Namespace: impact. Covers OrganizationsLeadership (leadership command /
 * community impact) and ExperienceTimeline (mission deployment log).
 * Organisation proper names stay Latin; descriptive/role words are translated.
 */
export const impact = {
  ar: {
    impact: {
      // ── Leadership / Community Impact section ─────────────────────────
      leadership: {
        eyebrow: "القيادة / الأثر المجتمعي",
        recordsLabel: "04 / سجلّات الأثر",
        headingBefore: "قيادةٌ صُنعت عبر المجتمعات والبرامج",
        headingAccent: "وعلى نطاقٍ واسع",
        headingAfter: ".",
        intro:
          "من تأسيس مبادرات طلابية إلى إدارة برامج تقنية واسعة، تختصر هذه السجلّات قيادةً ملموسة عبر مشاركةٍ قابلة للقياس وعملياتٍ منظّمة ونموٍّ مجتمعي.",
        currentCommand: "القيادة الحالية",
        currentAppointment: "تكليف حالي",
        currentAria: (role: string, org: string) =>
          `التكليف القيادي الحالي: ${role}، ${org}`,
        tuwaiq: {
          org: "TuwaiqClub_UJ",
          role: "شريك مؤسس ونائب الرئيس",
        },
        flagship: {
          channel: "النشر الرائد / إدارة المشاريع",
          org: "Google Developer Groups On Campus UJ",
          shorthand: "GDGoC UJ",
          role: "قائد إدارة المشاريع",
          initiative: "معسكر علم البيانات Google × GDSC",
          aria: (role: string, org: string, initiative: string) =>
            `النشر الرائد: ${role}، ${org}. ${initiative}، أكثر من 5,000 مشارك، وأكثر من 10 فعاليات منظّمة.`,
          metrics: {
            participants: "مشارك",
            events: "فعالية منظّمة",
          },
          narrative:
            "أدرت معسكر علم البيانات Google × GDSC على نطاقٍ واسع، وقدت التواصل والتنظيم اللوجستي عبر فعاليات تقنية متعددة.",
          tag: "قيادة التواصل والتنظيم اللوجستي",
        },
        operations: {
          prehack: {
            channel: "العمليات المجتمعية / 01",
            org: "PreHack",
            role: "مشرف ومضيف صوتي",
            period: "05/2024 – الآن",
            metrics: {
              hackwave: "مشارك في Hackwave",
              sessions: "حاضر في الجلسات المباشرة",
              bootcamp: "متدرّب في المعسكرات",
            },
            narrative:
              "دعمت الفعاليات التقنية، واستضفت جلسات مجتمعية مباشرة، وأدرت عمليات معسكرات الذكاء الاصطناعي والأمن السيبراني.",
          },
          droneclub: {
            channel: "العمليات المجتمعية / 02",
            org: "University of Jeddah",
            role: "نائب القائد — نادي الطائرات بدون طيار",
            period: "03/2024 – الآن",
            metrics: {
              committees: "لجنة مُنشأة",
              members: "عضو نشط",
              workshops: "ورشة تقنية",
            },
            narrative:
              "ساهمت في إحياء نادي الطائرات بدون طيار عبر عملياتٍ منظّمة وتكوين اللجان ونموّ المجتمع.",
          },
        },
      },
      // ── Experience / Mission Deployment Log section ───────────────────
      experience: {
        eyebrow: "سجلّ المهام / الخبرة التطبيقية",
        recordsLabel: "03 سجلّات مهام",
        headingLine1Before: "عملٌ تطبيقي، ",
        headingLine1Accent: "منشورٌ",
        headingLine2: "في بيئاتٍ حقيقية.",
        intro:
          "مسارٌ موثّق يمتدّ عبر إدارة المنتجات وهندسة الروبوتات والقيادة التعليمية — مُسجَّلٌ بالنتائج.",
        logLabel: "سجلّ",
        completed: "مكتمل",
        verifiedOutcome: "نتيجة موثّقة",
        recordAria: (index: string, role: string, org: string, period: string) =>
          `سجلّ المهمة ${index}: ${role} في ${org}، ${period}`,
        missions: {
          soum: {
            role: "متدرّب في إدارة المنتجات",
            org: "Soum",
            period: "نوفمبر 2025 – مارس 2026",
            domainSignal: "المنتج / بحث المستخدم",
            summary:
              "دعمت تطوير المنتج عبر بحث المستخدم والمقارنات التنافسية وترتيب أولويات حالات الاستخدام عالية القيمة.",
            outcomes: {
              users: "مستخدم تمّ بحثه",
              benchmarks: "مقارنة سوقية",
              useCases: "حالة استخدام ذات أولوية",
            },
            tags: ["تطوير المنتج", "بحث المستخدم", "المقارنات السوقية"],
          },
          smartmethod: {
            role: "متدرّب في هندسة الروبوتات",
            org: "Smart Method",
            period: "يونيو 2025 – ديسمبر 2025",
            domainSignal: "الروبوتات / نماذج الذكاء الاصطناعي",
            summary:
              "بنيت ذراعًا روبوتية مدعومة بالذكاء الاصطناعي، وطوّرت نموذجًا أوليًا لروبوت محادثة خلال عملٍ تطبيقي في هندسة الروبوتات.",
            outcomes: {
              arm: "ذراع روبوتية بالذكاء الاصطناعي",
              chatbot: "نموذج أولي لروبوت محادثة",
              certification: "شهادة مهندس روبوتات",
            },
            tags: ["روبوتات الذكاء الاصطناعي", "الذراع الروبوتية", "نموذج روبوت محادثة"],
          },
          alaqsa: {
            role: "مدير ومشرف البرنامج الصيفي",
            org: "Al-Aqsa Private Schools Institute",
            period: "2023 – 2025 · موسمي",
            domainSignal: "القيادة / التعليم",
            summary:
              "أدرت برامج صيفية موسمية، ونسّقت بين المعلمين، وساهمت في توسيع مشاركة الطلاب.",
            outcomes: {
              students: "طالب تمّت خدمته",
              teachers: "معلّم تمّ التنسيق معه",
              growth: "نموّ في التسجيل",
            },
            tags: ["إدارة البرامج", "الإرشاد", "تنسيق الفريق"],
          },
        },
      },
    },
  },
  en: {
    impact: {
      // ── Leadership / Community Impact section ─────────────────────────
      leadership: {
        eyebrow: "LEADERSHIP COMMAND / COMMUNITY IMPACT",
        recordsLabel: "04 / IMPACT RECORDS",
        headingBefore: "Leadership built through communities, programs, and",
        headingAccent: "scale",
        headingAfter: ".",
        intro:
          "From founding student initiatives to managing large-scale technical programs, these records capture leadership through measurable participation, structured operations, and community growth.",
        currentCommand: "CURRENT COMMAND",
        currentAppointment: "CURRENT APPOINTMENT",
        currentAria: (role: string, org: string) =>
          `Current command appointment: ${role}, ${org}`,
        tuwaiq: {
          org: "TuwaiqClub_UJ",
          role: "Co-Founder & Vice President",
        },
        flagship: {
          channel: "FLAGSHIP DEPLOYMENT / PROJECT MANAGEMENT",
          org: "Google Developer Groups On Campus UJ",
          shorthand: "GDGoC UJ",
          role: "Project Management Lead",
          initiative: "Google × GDSC Data Science Bootcamp",
          aria: (role: string, org: string, initiative: string) =>
            `Flagship deployment: ${role}, ${org}. ${initiative}, 5,000 plus participants, 10 plus events organized.`,
          metrics: {
            participants: "PARTICIPANTS",
            events: "EVENTS ORGANIZED",
          },
          narrative:
            "Managed the Google × GDSC Data Science Bootcamp at scale and led outreach and logistics across technical events.",
          tag: "Led outreach and logistics",
        },
        operations: {
          prehack: {
            channel: "COMMUNITY OPERATIONS / 01",
            org: "PreHack",
            role: "Admin & Voice Host",
            period: "05/2024 – Present",
            metrics: {
              hackwave: "Hackwave Participants",
              sessions: "Live Session Attendees",
              bootcamp: "Bootcamp Trainees",
            },
            narrative:
              "Supported technology events, hosted live community sessions, and managed AI and cybersecurity bootcamp operations.",
          },
          droneclub: {
            channel: "COMMUNITY OPERATIONS / 02",
            org: "University of Jeddah",
            role: "Vice Leader — Drone Club",
            period: "03/2024 – Present",
            metrics: {
              committees: "Committees Established",
              members: "Active Members",
              workshops: "Technical Workshops",
            },
            narrative:
              "Helped revive the Drone Club through structured operations, committee formation, and community growth.",
          },
        },
      },
      // ── Experience / Mission Deployment Log section ───────────────────
      experience: {
        eyebrow: "MISSION LOG / APPLIED EXPERIENCE",
        recordsLabel: "03 MISSION RECORDS",
        headingLine1Before: "Applied work, ",
        headingLine1Accent: "deployed",
        headingLine2: "in real environments.",
        intro:
          "A verified progression across product management, robotics engineering, and education leadership — recorded by outcome.",
        logLabel: "LOG",
        completed: "COMPLETED",
        verifiedOutcome: "VERIFIED OUTCOME",
        recordAria: (index: string, role: string, org: string, period: string) =>
          `Mission log ${index}: ${role} at ${org}, ${period}`,
        missions: {
          soum: {
            role: "Product Management Intern",
            org: "Soum",
            period: "Nov 2025 – Mar 2026",
            domainSignal: "PRODUCT / USER RESEARCH",
            summary:
              "Supported product development through user research, competitive benchmarking, and prioritization of high-value use cases.",
            outcomes: {
              users: "USERS RESEARCHED",
              benchmarks: "MARKET BENCHMARKS",
              useCases: "PRIORITY USE CASES",
            },
            tags: ["Product Development", "User Research", "Market Benchmarks"],
          },
          smartmethod: {
            role: "Robotics Engineering Intern",
            org: "Smart Method",
            period: "Jun 2025 – Dec 2025",
            domainSignal: "ROBOTICS / AI PROTOTYPING",
            summary:
              "Built an AI-powered robotic arm and developed an AI chatbot prototype during hands-on robotics engineering work.",
            outcomes: {
              arm: "AI-Powered Robotic Arm",
              chatbot: "AI Chatbot Prototype",
              certification: "Robotics Engineer Certification",
            },
            tags: ["AI Robotics", "Robotic Arm", "AI Chatbot Prototype"],
          },
          alaqsa: {
            role: "Summer Program Director & Supervisor",
            org: "Al-Aqsa Private Schools Institute",
            period: "2023 – 2025 · Seasonal",
            domainSignal: "LEADERSHIP / EDUCATION",
            summary:
              "Directed seasonal summer programs, coordinated educators, and helped expand student participation.",
            outcomes: {
              students: "STUDENTS SERVED",
              teachers: "TEACHERS COORDINATED",
              growth: "ENROLLMENT GROWTH",
            },
            tags: ["Program Direction", "Mentorship", "Team Coordination"],
          },
        },
      },
    },
  },
} as const;
