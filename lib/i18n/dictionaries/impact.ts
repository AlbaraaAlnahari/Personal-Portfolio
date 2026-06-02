/**
 * impact — bilingual dictionary for the Impact surface.
 *
 * Namespace: impact. Covers OrganizationsLeadership (leadership command /
 * community impact), ExperienceTimeline (mission deployment log), and the
 * OfficialPresence recognition section (official presenter, talented-student
 * membership, volunteering). Organisation proper names stay Latin;
 * descriptive/role words are translated. Numeric values never live here —
 * they stay in the components (never translated).
 */
export const impact = {
  ar: {
    impact: {
      // ── Leadership / Community Impact section ─────────────────────────
      leadership: {
        eyebrow: "القيادة / الأثر المجتمعي",
        recordsLabel: "04 / سجلّات الأثر",
        headingBefore: "قيادةٌ بُنيت عبر المجتمعات والبرامج",
        headingAccent: "وعلى نطاقٍ واسع",
        headingAfter: ".",
        intro:
          "من تأسيس مبادرات طلابية إلى إدارة برامج تقنية واسعة، توثّق هذه السجلّات قيادةً ملموسة عبر مشاركةٍ قابلة للقياس وعملياتٍ منظّمة ونموٍّ مجتمعي.",
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
          coord: "إدارة مشاريع · 01",
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
            "أدرت معسكر علم البيانات Google × GDSC، وقدت التواصل والتنظيم اللوجستي عبر فعاليات تقنية متعددة وواسعة النطاق.",
          tags: ["قيادة التواصل والتنظيم اللوجستي", "إدارة المشاريع", "مجتمع تقني"],
        },
        operations: {
          prehack: {
            channel: "العمليات المجتمعية / 01",
            coord: "عمليات مجتمعية · 01",
            org: "PreHack",
            role: "مشرف ومضيف صوتي",
            period: "05/2024 – الآن",
            metrics: {
              hackwave: "مشارك في Hackwave",
              sessions: "حاضر في الجلسات المباشرة",
              bootcamp: "متدرّب في المعسكرات",
            },
            narrative:
              "دعمت فعاليات تقنية ومجتمعية مباشرة، واستضفت جلسات حوارية، وساهمت في تنظيم معسكرات الذكاء الاصطناعي والأمن السيبراني.",
            tags: ["استضافة", "تنظيم فعاليات", "مجتمع تقني", "معسكرات"],
          },
          droneclub: {
            channel: "العمليات المجتمعية / 02",
            coord: "قيادة طلابية · 02",
            org: "University of Jeddah",
            role: "نائب قائد نادي الطائرات بدون طيار",
            period: "03/2024 – الآن",
            metrics: {
              committees: "لجنة مُنشأة",
              members: "عضو نشط",
              workshops: "ورشة تقنية",
            },
            narrative:
              "ساهمت في إعادة تفعيل النادي بعد فترة توقف، وبناء هيكلٍ تشغيلي يضمّ لجانًا وأعضاء فاعلين لضمان الاستمرارية والنمو.",
            tags: ["قيادة طلابية", "تنظيم اللجان", "ورش تقنية"],
          },
        },
      },
      // ── Experience / Mission Deployment Log section ───────────────────
      experience: {
        eyebrow: "سجلّ المهام / الخبرة التطبيقية",
        recordsLabel: "03 / سجلّات المهام",
        headingLine1Before: "عملٌ تطبيقي، ",
        headingLine1Accent: "منشورٌ",
        headingLine2: "في بيئاتٍ حقيقية.",
        intro:
          "خبرةٌ تطبيقية تمتدّ عبر إدارة المنتجات وهندسة الروبوتات والقيادة التعليمية — مُقاسةٌ بالنتائج.",
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
              "دعمت تطوير ميزة منتج من الفكرة حتى التنفيذ، عبر بحث المستخدم، وصياغة حالات الاستخدام، وتحليل المنافسين، وتنظيف بيانات المنتج لاستخلاص قرارات قابلة للتنفيذ.",
            outcomes: {
              users: "مستخدم تمّ بحثه",
              benchmarks: "مقارنة سوقية",
              useCases: "حالة استخدام",
            },
            tags: ["بحث المستخدم", "تطوير المنتج", "تحليل البيانات", "المقارنات السوقية"],
          },
          smartmethod: {
            role: "متدرّب في هندسة الروبوتات",
            org: "Smart Method",
            period: "يونيو 2025 – ديسمبر 2025",
            domainSignal: "الروبوتات / نماذج الذكاء الاصطناعي",
            summary:
              "بنيت ذراعًا روبوتية مدعومة بالذكاء الاصطناعي، وطوّرت نموذجًا أوليًا لروبوت محادثة، مع نمذجةٍ ثلاثية الأبعاد وحلولٍ تطبيقية لتحديات روبوتية واقعية.",
            outcomes: {
              arm: "ذراع روبوتية بالذكاء الاصطناعي",
              chatbot: "نموذج أولي لروبوت محادثة",
              modeling: "نمذجة ثلاثية الأبعاد",
              certification: "شهادة مهندس روبوتات",
            },
            tags: ["روبوتات الذكاء الاصطناعي", "النمذجة ثلاثية الأبعاد", "حلول تطبيقية"],
          },
          alaqsa: {
            role: "مدير ومشرف البرنامج الصيفي",
            org: "Al-Aqsa Private Schools Institute",
            period: "2023 – 2025 · موسمي",
            domainSignal: "القيادة / التعليم",
            summary:
              "أدرت برامج صيفية موسمية، ونسّقت بين المعلمين، وطوّرت خططًا تعليمية أسهمت في رفع التسجيل وتحسين تجربة الطلاب وأولياء الأمور.",
            outcomes: {
              students: "طالب شارك",
              teachers: "معلّم تمّ التنسيق معه",
              growth: "نموّ في التسجيل",
            },
            tags: ["إدارة البرامج", "تنسيق الفريق", "التعليم", "متابعة الأداء"],
          },
        },
      },
      // ── Official Presence & Talent (recognition) section ──────────────
      recognition: {
        eyebrow: "الحضور الرسمي والموهبة",
        recordsLabel: "05 / سجلّ الحضور",
        headingBefore: "حضورٌ رسمي، وموهبةٌ ",
        headingAccent: "موثّقة",
        headingAfter: ".",
        intro:
          "حضورٌ على منصّات جامعة جدة الرسمية، وعضويةٌ في مسار رعاية الموهوبين، وساعاتُ تطوّعٍ ممتدة — أثرٌ يتجاوز التقنية إلى المجتمع والمنصّة.",
        presenter: {
          channel: "الحضور الرسمي / 01",
          coord: "حضور رسمي · 01",
          title: "مقدّم رسمي",
          org: "فعاليات جامعة جدة",
          metricLabel: "فعالية رسمية",
          description:
            "قدّمت أكثر من 6 فعاليات رسمية مع جامعة جدة، من بينها كرسي د. منال فقيه العلمي والملتقى الدولي الأول للموهبة في التعليم الجامعي.",
          eventsLabel: "من أبرزها",
          events: [
            "كرسي د. منال فقيه العلمي في دراسات استخدامات المواد المخدرة ومواد الإدمان وإعادة التأهيل",
            "الملتقى الدولي الأول للموهبة في التعليم الجامعي",
          ],
          tags: ["تقديم رسمي", "جامعة جدة", "إدارة حضور", "تواصل جماهيري"],
        },
        talent: {
          coord: "موهبة · 02",
          title: "طالب موهوب بجامعة جدة",
          org: "إدارة الاستقطاب ورعاية الموهوبين",
          description:
            "ضمن طلبة موهبة في جامعة جدة تحت رعاية إدارة الاستقطاب ورعاية الموهوبين، في مسارٍ يعزّز المبادرة، والتميّز، وتطوير القدرات.",
          tags: ["موهبة", "جامعة جدة", "رعاية الموهوبين", "تميّز طلابي"],
        },
        volunteer: {
          coord: "تطوع · 03",
          title: "ساعات تطوعية",
          metricLabel: "ساعة تطوعية",
          description:
            "مشاركة تطوعية ممتدة في فعاليات ومبادرات تعليمية وتقنية ومجتمعية.",
          tags: ["تطوع", "مبادرات", "مجتمع", "خدمة"],
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
          coord: "PROJECT MGMT · 01",
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
            "Managed the Google × GDSC Data Science Bootcamp at scale and led outreach and logistics across multiple technical events.",
          tags: ["Outreach & Logistics Lead", "Project Management", "Tech Community"],
        },
        operations: {
          prehack: {
            channel: "COMMUNITY OPERATIONS / 01",
            coord: "COMMUNITY OPS · 01",
            org: "PreHack",
            role: "Admin & Voice Host",
            period: "05/2024 – Present",
            metrics: {
              hackwave: "Hackwave Participants",
              sessions: "Live Session Attendees",
              bootcamp: "Bootcamp Trainees",
            },
            narrative:
              "Supported live technology and community events, hosted discussion sessions, and helped organize AI and cybersecurity bootcamps.",
            tags: ["Hosting", "Event Operations", "Tech Community", "Bootcamps"],
          },
          droneclub: {
            channel: "COMMUNITY OPERATIONS / 02",
            coord: "STUDENT LEAD · 02",
            org: "University of Jeddah",
            role: "Vice Leader — Drone Club",
            period: "03/2024 – Present",
            metrics: {
              committees: "Committees Established",
              members: "Active Members",
              workshops: "Technical Workshops",
            },
            narrative:
              "Helped re-activate the club after a pause, building an operational structure of committees and active members for continuity and growth.",
            tags: ["Student Leadership", "Committee Building", "Technical Workshops"],
          },
        },
      },
      // ── Experience / Mission Deployment Log section ───────────────────
      experience: {
        eyebrow: "MISSION LOG / APPLIED EXPERIENCE",
        recordsLabel: "03 / MISSION RECORDS",
        headingLine1Before: "Applied work, ",
        headingLine1Accent: "deployed",
        headingLine2: "in real environments.",
        intro:
          "Applied experience across product management, robotics engineering, and education leadership — measured by outcome.",
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
              "Supported a product feature from idea to delivery through user research, use-case definition, competitor analysis, and product-data cleaning for actionable decisions.",
            outcomes: {
              users: "USERS RESEARCHED",
              benchmarks: "MARKET BENCHMARKS",
              useCases: "PRIORITY USE CASES",
            },
            tags: ["User Research", "Product Development", "Data Analysis", "Market Benchmarks"],
          },
          smartmethod: {
            role: "Robotics Engineering Intern",
            org: "Smart Method",
            period: "Jun 2025 – Dec 2025",
            domainSignal: "ROBOTICS / AI PROTOTYPING",
            summary:
              "Built an AI-powered robotic arm and developed an AI chatbot prototype, with 3D modeling and applied solutions for real robotics challenges.",
            outcomes: {
              arm: "AI-Powered Robotic Arm",
              chatbot: "AI Chatbot Prototype",
              modeling: "3D Modeling",
              certification: "Robotics Engineer Certification",
            },
            tags: ["AI Robotics", "3D Modeling", "Applied Solutions"],
          },
          alaqsa: {
            role: "Summer Program Director & Supervisor",
            org: "Al-Aqsa Private Schools Institute",
            period: "2023 – 2025 · Seasonal",
            domainSignal: "LEADERSHIP / EDUCATION",
            summary:
              "Directed seasonal summer programs, coordinated educators, and developed learning plans that lifted enrollment and improved the student and parent experience.",
            outcomes: {
              students: "STUDENTS ENGAGED",
              teachers: "TEACHERS COORDINATED",
              growth: "ENROLLMENT GROWTH",
            },
            tags: ["Program Direction", "Team Coordination", "Education", "Performance Tracking"],
          },
        },
      },
      // ── Official Presence & Talent (recognition) section ──────────────
      recognition: {
        eyebrow: "OFFICIAL PRESENCE & TALENT",
        recordsLabel: "05 / PRESENCE RECORDS",
        headingBefore: "Official presence and ",
        headingAccent: "documented",
        headingAfter: " talent.",
        intro:
          "Hosting official University of Jeddah platforms, membership in the gifted-talent track, and sustained volunteering — impact beyond technical work, into community and stage.",
        presenter: {
          channel: "OFFICIAL PRESENCE / 01",
          coord: "OFFICIAL · 01",
          title: "Official Presenter",
          org: "University of Jeddah Events",
          metricLabel: "OFFICIAL EVENTS",
          description:
            "Presented 6+ official University of Jeddah events, including the Dr. Manal Faqih Scientific Chair and the First International Forum for Talent in University Education.",
          eventsLabel: "Among them",
          events: [
            "Dr. Manal Faqih Scientific Chair for Studies on Substance Use, Addiction & Rehabilitation",
            "First International Forum for Talent in University Education",
          ],
          tags: ["Official Hosting", "University of Jeddah", "Stage Presence", "Public Engagement"],
        },
        talent: {
          coord: "TALENT · 02",
          title: "Talented Student — University of Jeddah",
          org: "Talent Attraction & Gifted Care Dept.",
          description:
            "Selected among the talented students at University of Jeddah under the Talent Attraction & Gifted Care administration — a track advancing initiative, excellence, and capability development.",
          tags: ["Talent", "University of Jeddah", "Gifted Care", "Student Excellence"],
        },
        volunteer: {
          coord: "VOLUNTEER · 03",
          title: "Volunteer Hours",
          metricLabel: "VOLUNTEER HOURS",
          description:
            "Sustained volunteering across educational, technical, and community events and initiatives.",
          tags: ["Volunteering", "Initiatives", "Community", "Service"],
        },
      },
    },
  },
} as const;
