/**
 * albaraa-knowledge.ts — Local verified knowledge ROUTER for "Ask Albaraa AI".
 *
 * SOURCE OF TRUTH: Albaraa Alnahari's résumé/CV + the existing portfolio contact
 * data. Every fact is drawn from those sources — nothing is invented. There is
 * NO external AI/LLM and NO network call: a deterministic, local, BILINGUAL
 * keyword matcher maps a free-text question (Arabic OR English) to a stable
 * ANSWER KEY.
 *
 * The localized answer COPY lives in the i18n dictionary
 * (lib/i18n/dictionaries/ask.ts → t.ask.answers[key]); this module returns ONLY
 * the key plus provenance metadata (sources + contact CTA), so every reply
 * renders in the ACTIVE locale — Arabic answers in Arabic mode, English answers
 * in English mode — and re-localizes instantly if the language is switched. The
 * matcher itself never holds display prose. Contact email/URLs mirror the
 * Contact console + SiteFooter.
 */

export type SourceKey = "resume" | "portfolio" | "contact";

export type AnswerKey =
  | "profile"
  | "distinctive"
  | "docupilot"
  | "projects"
  | "skills"
  | "experience"
  | "leadership"
  | "availability"
  | "contact"
  | "unknown"
  | "private";

/** A resolved match: which answer to render + its provenance / CTA metadata. */
export type KnowledgeResult = {
  key: AnswerKey;
  sources: SourceKey[];
  contactCta?: boolean;
};

/* ------------------------------------------------------------------ *
 * Verified contact channels (mirror Contact console + SiteFooter)
 * ------------------------------------------------------------------ */

export const CONTACT = {
  email: "albaraa.a.alnahari@gmail.com",
  contactRoute: "/contact",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/albaraa-alnahari" },
    { label: "GitHub", href: "https://github.com/AlbaraaAlnahari" },
    { label: "X / Twitter", href: "https://x.com/x_ff" },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * Profile snapshot — stable, locale-independent data.
 * The component maps these by index to localized labels (ROLE_KEYS /
 * STAT_KEYS). Role entries only drive the count/index; stat VALUES render
 * verbatim (Latin numerals, isolated LTR in the UI).
 * ------------------------------------------------------------------ */

export const PROFILE_ROLES = [
  "student",
  "aiBuilder",
  "fullStack",
  "productMinded",
  "leadership",
] as const;

export const PROFILE_STATS = [
  { value: "100+" },
  { value: "5,000+" },
  { value: "450+" },
  { value: "65+" },
  { value: "1st" },
] as const;

/** Greeting provenance — the greeting COPY is localized in the dictionary. */
export const GREETING_SOURCES: SourceKey[] = ["portfolio"];

/* ------------------------------------------------------------------ *
 * Provenance + CTA per answer key (locale-independent metadata)
 * ------------------------------------------------------------------ */

export const ANSWER_META: Record<
  AnswerKey,
  { sources: SourceKey[]; contactCta?: boolean }
> = {
  profile: { sources: ["resume", "portfolio"] },
  distinctive: { sources: ["resume", "portfolio"] },
  docupilot: { sources: ["resume"] },
  projects: { sources: ["resume"] },
  skills: { sources: ["resume"] },
  experience: { sources: ["resume"] },
  leadership: { sources: ["resume"] },
  availability: { sources: ["resume", "contact"], contactCta: true },
  contact: { sources: ["contact"], contactCta: true },
  unknown: { sources: ["portfolio"], contactCta: true },
  private: { sources: ["contact"], contactCta: true },
};

/** Build a full result from a key — used by both preset buttons and the matcher. */
export function resultForKey(key: AnswerKey): KnowledgeResult {
  return { key, ...ANSWER_META[key] };
}

/* ------------------------------------------------------------------ *
 * Seven preset questions (drive the suggested-prompt panel).
 * Order mirrors t.ask.suggested.items. Clicking a preset routes by KEY (no
 * re-matching), so the reply is exact and the user bubble shows the localized
 * label rather than a canonical English string.
 * ------------------------------------------------------------------ */

export const PRESET_KEYS = [
  "profile",
  "distinctive",
  "docupilot",
  "skills",
  "leadership",
  "experience",
  "contact",
] as const;

/** The subset of answer keys exposed as suggested prompts (has dictionary labels). */
export type PresetKey = (typeof PRESET_KEYS)[number];

/* ------------------------------------------------------------------ *
 * Bilingual keyword router. Keywords are lowercased; English entries route
 * English questions, Arabic entries route custom Arabic questions (Arabic text
 * is unaffected by toLowerCase). Arabic keywords are kept >= 4 chars and
 * distinctive to avoid spurious substring matches.
 * ------------------------------------------------------------------ */

type Entry = { key: AnswerKey; keywords: string[] };

const ENTRIES: Entry[] = [
  {
    key: "profile",
    keywords: [
      "who is",
      "who's albaraa",
      "about albaraa",
      "about you",
      "tell me about",
      "introduce",
      "background",
      "yourself",
      "bio",
      "study",
      "student",
      "university",
      "graduat",
      "based",
      "located",
      "where is",
      "from",
      "من هو",
      "من البراء",
      "عن البراء",
      "نبذة",
      "باختصار",
      "تعريف",
      "يدرس",
      "طالب",
      "جامعة",
    ],
  },
  {
    key: "distinctive",
    keywords: [
      "distinctive",
      "stand out",
      "stands out",
      "what makes",
      "different",
      "unique",
      "special",
      "why albaraa",
      "why hire",
      "يميز",
      "ما يميز",
      "ما الذي يميز",
      "تميز",
      "يتميز",
      "الفرق",
      "لماذا البراء",
      "نقاط القوة",
      "ما الذي يجعل",
    ],
  },
  {
    key: "docupilot",
    keywords: [
      "docupilot",
      "docu pilot",
      "business operations",
      "1st place",
      "first place",
      "innovation bootcamp",
      "docupilot.site",
      "دوكوبايلوت",
      "دوكو بايلوت",
    ],
  },
  {
    key: "projects",
    keywords: [
      "project",
      "projects",
      "built",
      "build",
      "portfolio",
      "what have you made",
      "what did you build",
      "apps",
      "techpath",
      "slide-mind",
      "slidemind",
      "slide mind",
      "sanadk",
      "flashcard",
      "مشاريع",
      "مشروع",
      "أعمال",
      "تطبيقات",
      "بناه",
      "نفّذ",
    ],
  },
  {
    key: "skills",
    keywords: [
      "skill",
      "skills",
      "tech stack",
      "technolog",
      "languages",
      "programming",
      "framework",
      "tools",
      "what can you do",
      "stack",
      "strongest",
      "good at",
      "expert",
      "proficient",
      "react",
      "next",
      "python",
      "java",
      "figma",
      "مهارات",
      "مهاراته",
      "أقوى",
      "اقوى",
      "تقنيات",
      "لغات",
      "إطار",
      "يجيد",
      "خبير",
      "برمجة",
    ],
  },
  {
    key: "experience",
    keywords: [
      "experience",
      "work history",
      "job",
      "jobs",
      "intern",
      "internship",
      "career",
      "employ",
      "soum",
      "smart method",
      "robotic",
      "al-aqsa",
      "alaqsa",
      "summer program",
      "professional",
      "خبرة",
      "خبرته",
      "تجربة عمل",
      "وظيفة",
      "تدريب",
      "متدرب",
      "سوم",
      "روبوت",
      "مسيرة",
      "مهنية",
    ],
  },
  {
    key: "leadership",
    keywords: [
      "leadership",
      "lead",
      "leader",
      "community",
      "organiz",
      "organis",
      "event",
      "events",
      "bootcamp",
      "prehack",
      "hackwave",
      "drone",
      "club",
      "gdgoc",
      "gdsc",
      "google",
      "volunteer",
      "impact",
      "قيادة",
      "قيادي",
      "أثر قيادي",
      "مجتمع",
      "مبادرات",
      "مبادرة",
      "تطوع",
      "فعاليات",
      "فعالية",
      "نادي",
      "معسكر",
      "ورش",
      "تنظيم",
    ],
  },
  {
    key: "availability",
    keywords: [
      "available",
      "availability",
      "hire",
      "hiring",
      "open to",
      "opportunit",
      "role",
      "freelance",
      "speaking",
      "speak",
      "looking for",
      "متاح",
      "توظيف",
      "يوظف",
      "فرص",
      "وظيفة شاغرة",
    ],
  },
  {
    key: "contact",
    keywords: [
      "contact",
      "email",
      "reach",
      "get in touch",
      "message",
      "linkedin",
      "github",
      "twitter",
      "x.com",
      "social",
      "connect",
      "dm",
      "talk",
      "collaborate",
      "collaboration",
      "work together",
      "تواصل",
      "أتواصل",
      "اتواصل",
      "تعاون",
      "أتعاون",
      "اتعاون",
      "بريد",
      "ايميل",
      "إيميل",
      "راسل",
      "لينكدإن",
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Private / unsupported topic guard (answered safely, never guessed)
 * ------------------------------------------------------------------ */

const PRIVATE_KEYWORDS = [
  "salary",
  "pay",
  "income",
  "wage",
  "how much do you make",
  "phone",
  "number",
  "address",
  "home",
  "age",
  "old are",
  "birth",
  "married",
  "relationship",
  "religion",
  "gpa",
  "grade",
  "password",
  "راتب",
  "الراتب",
  "دخل",
  "كم عمر",
  "هاتف",
  "جوال",
  "رقم",
  "عنوان",
  "متزوج",
  "علاقة",
  "دين",
  "معدل",
  "كلمة المرور",
  "كلمة السر",
];

/* ------------------------------------------------------------------ *
 * Matcher — deterministic, local, no external calls
 * ------------------------------------------------------------------ */

function scoreEntry(text: string, entry: Entry): number {
  let score = 0;
  for (const kw of entry.keywords) {
    if (text.includes(kw)) {
      // Longer keyword phrases are stronger signals than single short words.
      score += kw.length >= 5 ? 2 : 1;
    }
  }
  return score;
}

/**
 * Resolve a free-text question (Arabic or English) to a verified answer KEY +
 * provenance. Pure + offline. Precedence: empty → unknown; private guard →
 * private; best keyword match → that key; else → unknown.
 */
export function answerQuestion(rawInput: string): KnowledgeResult {
  const text = rawInput.toLowerCase().trim();
  if (!text) return resultForKey("unknown");

  if (PRIVATE_KEYWORDS.some((kw) => text.includes(kw))) {
    return resultForKey("private");
  }

  let best: AnswerKey | null = null;
  let bestScore = 0;
  for (const entry of ENTRIES) {
    const score = scoreEntry(text, entry);
    if (score > bestScore) {
      bestScore = score;
      best = entry.key;
    }
  }

  if (best && bestScore > 0) return resultForKey(best);
  return resultForKey("unknown");
}
