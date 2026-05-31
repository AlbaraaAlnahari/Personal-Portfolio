/**
 * albaraa-knowledge.ts — Local verified knowledge base for "Ask Albaraa AI".
 *
 * SOURCE OF TRUTH: Albaraa Alnahari's résumé/CV + the existing portfolio
 * contact data. Every fact here is drawn from those sources — nothing is
 * invented. There is NO external AI/LLM here: the assistant is a deterministic,
 * local, rule-based matcher over this structured archive. Contact email and
 * social URLs mirror the values used by the Contact console and SiteFooter.
 *
 * If a question can't be matched to a category, the matcher returns a graceful
 * fallback that points to the Contact page rather than guessing.
 */

export type SourceChip = "Résumé" | "Portfolio" | "Contact";

export type KnowledgeAnswer = {
  /** Short headline shown in bold above the answer body. */
  title: string;
  /** Lead sentence(s) — concise prose. */
  lead: string;
  /** Optional bullet points (kept tight, no walls of text). */
  bullets?: string[];
  /** Provenance chips rendered under the answer. */
  sources: SourceChip[];
  /** When true, the UI may surface an "Open Contact" CTA after the answer. */
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
 * Profile snapshot — facts + stat chips (résumé-verified only)
 * ------------------------------------------------------------------ */

export const PROFILE_ROLES = [
  "Software Engineering Student",
  "AI Builder",
  "Full-stack Developer",
  "Product-minded",
  "Leadership & Community",
] as const;

export const PROFILE_STATS = [
  { value: "100+", label: "users researched" },
  { value: "5,000+", label: "bootcamp participants" },
  { value: "450+", label: "event participants" },
  { value: "65+", label: "club members" },
  { value: "1st", label: "place AI bootcamp" },
] as const;

/* ------------------------------------------------------------------ *
 * Initial assistant greeting
 * ------------------------------------------------------------------ */

export const GREETING: KnowledgeAnswer = {
  title: "Ask Albaraa AI",
  lead:
    "Hi, I'm Ask Albaraa AI — a portfolio assistant built from Albaraa's verified résumé and project archive. Ask me about his projects, skills, experience, leadership, or how to collaborate.",
  sources: ["Portfolio"],
};

/* ------------------------------------------------------------------ *
 * Graceful fallbacks
 * ------------------------------------------------------------------ */

export const UNKNOWN_FALLBACK: KnowledgeAnswer = {
  title: "I can help with the portfolio archive",
  lead:
    "I can answer questions about Albaraa's projects, skills, experience, leadership, résumé, and contact channels. For anything else, use the Contact page and Albaraa can respond directly.",
  sources: ["Portfolio"],
  contactCta: true,
};

/** For private / unsupported asks (salary, personal data, etc.). */
export const PRIVATE_FALLBACK: KnowledgeAnswer = {
  title: "Not in the public archive",
  lead:
    "I don't have that information in the public portfolio archive. You can contact Albaraa directly through the Contact page.",
  sources: ["Contact"],
  contactCta: true,
};

/* ------------------------------------------------------------------ *
 * Six preset questions (drive the suggested-prompt panel)
 * ------------------------------------------------------------------ */

export const PRESET_QUESTIONS = [
  "Who is Albaraa?",
  "What is DocuPilot?",
  "What are Albaraa's strongest skills?",
  "What leadership impact has Albaraa made?",
  "What experience does Albaraa have?",
  "How can I contact or collaborate with Albaraa?",
] as const;

/* ------------------------------------------------------------------ *
 * Knowledge entries — each with matcher keywords + a structured answer
 * ------------------------------------------------------------------ */

type KnowledgeEntry = {
  id: string;
  /** Lowercased keywords/phrases that route a question to this answer. */
  keywords: string[];
  answer: KnowledgeAnswer;
};

const ENTRIES: KnowledgeEntry[] = [
  /* ---- Profile / who is Albaraa ---- */
  {
    id: "profile",
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
    ],
    answer: {
      title: "Who is Albaraa?",
      lead:
        "Albaraa Alnahari is a Software Engineering student at the University of Jeddah, focused on full-stack development, AI-powered products, and product management. He builds user-centric software and has experience across product research, web development, robotics, accessibility design, and community leadership.",
      bullets: [
        "Software Engineering student — University of Jeddah (expected graduation 2027).",
        "Based in Saudi Arabia; Arabic native/bilingual, English proficient.",
        "Focus: full-stack development, AI-powered products, and product management.",
      ],
      sources: ["Résumé", "Portfolio"],
    },
  },

  /* ---- DocuPilot (specific project) ---- */
  {
    id: "docupilot",
    keywords: ["docupilot", "docu pilot", "business operations", "1st place", "first place", "innovation bootcamp", "docupilot.site"],
    answer: {
      title: "What is DocuPilot?",
      lead:
        "DocuPilot is Albaraa's AI Business Operations Platform and a 1st Place AI Innovation Bootcamp project. It transforms business documents and client requests into structured workflows, risks, approvals, and project decisions.",
      bullets: [
        "Built with Next.js, TypeScript, Tailwind CSS, Supabase, Gemini API, Qwen API, and Zod.",
        "Features: feasibility analysis, blueprint generation, contract extraction, invoice approval, scope-change detection, and document-based Q&A.",
        "Includes an operations dashboard for project health, payment milestones, and decision alerts.",
        "Live at docupilot.site.",
      ],
      sources: ["Résumé"],
    },
  },

  /* ---- Projects (general) ---- */
  {
    id: "projects",
    keywords: ["project", "projects", "built", "build", "portfolio", "what have you made", "what did you build", "apps", "techpath", "slide-mind", "slidemind", "slide mind", "sanadk", "flashcard"],
    answer: {
      title: "Selected projects",
      lead: "A few projects from Albaraa's archive — each shipped or prototyped end-to-end:",
      bullets: [
        "DocuPilot — AI Business Operations Platform (1st Place, AI Innovation Bootcamp). Next.js, TypeScript, Supabase, Gemini & Qwen APIs, Zod. Live at docupilot.site.",
        "TechPath — Full-stack web app generating personalized learning roadmaps with the Anthropic Claude API. React.js, JavaScript, Tailwind CSS.",
        "Sanadk — Accessibility app (UX/UI design). User research with 77 survey responses; low- and high-fidelity prototypes for visually impaired and wheelchair users.",
        "Slide-Mind — Java flashcard generator using AI and API integration, with an extensible architecture and file I/O.",
      ],
      sources: ["Résumé"],
    },
  },

  /* ---- Skills ---- */
  {
    id: "skills",
    keywords: ["skill", "skills", "tech stack", "technolog", "languages", "programming", "framework", "tools", "what can you do", "stack", "strongest", "good at", "expert", "proficient", "react", "next", "python", "java", "figma"],
    answer: {
      title: "Strongest skills",
      lead: "Albaraa works across full-stack development, AI/data, and product, with a leadership and collaboration backbone:",
      bullets: [
        "Programming: Python, SQL, MySQL, Java, C++.",
        "Web & frameworks: HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Flutter.",
        "Data & AI: Pandas, NumPy, Data Analysis, OpenCV.",
        "Tools: Git, GitHub, VS Code, PyCharm, Figma.",
        "Soft skills: problem solving, analytical thinking, team collaboration, adaptability, communication, leadership.",
      ],
      sources: ["Résumé"],
    },
  },

  /* ---- Experience ---- */
  {
    id: "experience",
    keywords: ["experience", "work history", "job", "jobs", "intern", "internship", "career", "employ", "soum", "smart method", "robotic", "al-aqsa", "alaqsa", "summer program", "professional"],
    answer: {
      title: "Professional experience",
      lead: "Albaraa has experience across product management, robotics engineering, and program leadership:",
      bullets: [
        "Product Management Intern — Soum Company. Conducted user research with 100+ users, wrote user stories and 3+ use cases, ran competitor analysis with 4+ benchmarks, and supported a product feature across design and execution.",
        "Robotics Engineering Intern — Smart Method Company. Built an AI-powered robotic arm, designed 3D robotic models, and built an AI chatbot prototype (Full Robotics Engineer Certification).",
        "Summer Program Director & Supervisor — Al-Aqsa Private Schools Institute. Led 8+ teachers and 70+ students across 5 levels; improved parent satisfaction to 40% and increased enrollment by 30%.",
      ],
      sources: ["Résumé"],
    },
  },

  /* ---- Leadership / organizations ---- */
  {
    id: "leadership",
    keywords: ["leadership", "lead", "leader", "community", "organiz", "organis", "event", "events", "bootcamp", "prehack", "hackwave", "drone", "club", "gdgoc", "gdsc", "google", "volunteer", "impact"],
    answer: {
      title: "Leadership & community impact",
      lead: "Albaraa has organized large-scale tech communities and events across Jeddah:",
      bullets: [
        "Google × GDSC Data Science Bootcamp — managed with 5,000+ participants (Project Management Lead, GDGoC On Campus UJ).",
        "Hackwave at University of Jeddah — helped organize one of the Western Region's largest tech events, 450+ participants (PreHack, Admin & Voice Host).",
        "AI & Cybersecurity bootcamps — managed training for 150+ participants; hosted live sessions and Twitter Spaces reaching 200+ attendees.",
        "Drone Club, University of Jeddah — Vice Leader; revived the club, established 5 committees, recruited 65+ active members, ran 3+ workshops.",
        "Summer programs — led 8+ teachers and 70+ students across 5 levels.",
      ],
      sources: ["Résumé"],
    },
  },

  /* ---- Availability ---- */
  {
    id: "availability",
    keywords: ["available", "availability", "hire", "hiring", "open to", "opportunit", "role", "freelance", "collaborate", "collaboration", "work together", "speaking", "speak", "looking for"],
    answer: {
      title: "What Albaraa is open to",
      lead: "Albaraa is open to building and contributing across several directions:",
      bullets: [
        "AI-powered products and software engineering roles.",
        "Product conversations and user-centric problem solving.",
        "Collaboration on meaningful projects.",
        "Speaking and community/event involvement.",
      ],
      sources: ["Résumé", "Contact"],
      contactCta: true,
    },
  },

  /* ---- Contact ---- */
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "get in touch", "message", "linkedin", "github", "twitter", "x.com", "social", "connect", "dm", "talk", "collaborate"],
    answer: {
      title: "How to contact or collaborate",
      lead: `The most direct route is email — ${CONTACT.email} — or the Contact page, which routes messages to Albaraa personally.`,
      bullets: [
        `Email: ${CONTACT.email}`,
        "LinkedIn: linkedin.com/in/albaraa-alnahari",
        "GitHub: github.com/AlbaraaAlnahari",
        "X / Twitter: x.com/x_ff",
      ],
      sources: ["Contact"],
      contactCta: true,
    },
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
];

/* ------------------------------------------------------------------ *
 * Matcher — deterministic, local, no external calls
 * ------------------------------------------------------------------ */

function scoreEntry(text: string, entry: KnowledgeEntry): number {
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
 * Resolve a free-text question to a verified answer. Pure function — given the
 * same input it always returns the same output, and it never reaches the
 * network. Order of precedence: private guard → best keyword match → fallback.
 */
export function answerQuestion(rawInput: string): KnowledgeAnswer {
  const text = rawInput.toLowerCase().trim();
  if (!text) return UNKNOWN_FALLBACK;

  // Private/unsupported topics: answer safely instead of guessing.
  if (PRIVATE_KEYWORDS.some((kw) => text.includes(kw))) {
    return PRIVATE_FALLBACK;
  }

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;
  for (const entry of ENTRIES) {
    const score = scoreEntry(text, entry);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0) return best.answer;
  return UNKNOWN_FALLBACK;
}
