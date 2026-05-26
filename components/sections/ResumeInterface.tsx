"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { OfficialResumeVault } from "@/components/sections/resume-dossier/OfficialResumeVault";

/**
 * Resume Interface — VERIFIED CAREER DOSSIER
 *
 * A premium, futuristic professional credential experience: an authenticated
 * record retrieved from the Intelligence Engine. The Official Resume Vault is
 * the dominant anchor; the identity dossier, credential records, and capability
 * signals support it without competing.
 *
 * All facts are verified against the official résumé and must not be expanded.
 * PDF wiring is preserved exactly inside OfficialResumeVault.
 */

interface Credential {
  id: string;
  index: string;
  kind: string;
  title: string;
  organization: string;
  date: string;
  featured?: boolean;
}

const credentials: Credential[] = [
  {
    id: "education",
    index: "01",
    kind: "EDUCATION",
    title: "Bachelor of Software Engineering",
    organization: "University of Jeddah",
    date: "Expected 2027",
  },
  {
    id: "certification",
    index: "02",
    kind: "CERTIFICATION",
    title: "Robotics Engineer Certification",
    organization: "Smart Method",
    date: "2025",
  },
  {
    id: "achievement",
    index: "03",
    kind: "ACHIEVEMENT",
    title: "1st Place — AI Innovation Bootcamp",
    organization: "DocuPilot",
    date: "2026",
    featured: true,
  },
];

const competencies = [
  "Full-Stack Development",
  "AI-Powered Product Development",
  "Product Research",
  "Robotics Engineering",
  "Systems Thinking",
  "Technical Leadership",
];

const languages = ["Arabic", "English"];

export function ResumeInterface() {
  const reduce = useReducedMotion();

  const ease = [0.4, 0, 0.2, 1] as const;
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.04 },
    },
  };
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  return (
    <section
      id="resume"
      className="pt-8 md:pt-12 pb-20 md:pb-28 relative scroll-mt-20"
      aria-labelledby="resume-heading"
    >
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="space-y-9 md:space-y-11"
        >
          {/* ── Section header / system declaration ───────────────── */}
          <motion.header variants={rise} className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                style={{ boxShadow: "0 0 8px rgba(0,217,255,0.7)" }}
              />
              <span className="text-xs font-mono tracking-[0.26em] text-accent-cyan/80">
                SYSTEM DOSSIER / VERIFIED CREDENTIALS
              </span>
            </div>
            <h2
              id="resume-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]"
            >
              Verified <span className="text-accent-cyan">Career</span> Dossier
            </h2>
            <p className="text-foreground-secondary/80 text-base md:text-lg leading-relaxed">
              Verified professional record and official résumé access.
            </p>
          </motion.header>

          {/* ── Primary composition: identity + Official Resume Vault ─ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Identity dossier — supporting panel */}
            <motion.div variants={rise} className="lg:col-span-5">
              <IdentityDossier />
            </motion.div>

            {/* Official Resume Vault — dominant anchor */}
            <motion.div variants={rise} className="lg:col-span-7">
              <OfficialResumeVault />
            </motion.div>
          </div>

          {/* ── Credential records ledger ─────────────────────────── */}
          <motion.div variants={rise} className="space-y-5">
            <SubHeader label="VERIFIED CREDENTIALS" count="03 RECORDS" />
            <div className="relative">
              {/* registry rail — connects the three records (md+) */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-0 left-[14%] right-[14%] h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(0,217,255,0.28), transparent)",
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:pt-6">
                {credentials.map((c, i) => (
                  <CredentialModule
                    key={c.id}
                    credential={c}
                    reduce={reduce}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Capability signal bus ─────────────────────────────── */}
          <motion.div variants={rise} className="space-y-5">
            <SubHeader
              label="CAPABILITY SIGNALS"
              count="06 SIGNALS ONLINE"
              accent="green"
            />
            {/* Single auto-flow grid fills row-by-row (01,02 / 03,04 / 05,06)
                on desktop/tablet and stays sequential 01→06 on mobile. Two
                absolute bus rails preserve the per-column signal-bus styling. */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
              {/* left column bus rail */}
              <span
                aria-hidden="true"
                className="absolute left-[3px] top-5 bottom-5 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(0,217,255,0.32) 22%, rgba(0,255,159,0.22) 78%, transparent)",
                }}
              />
              {/* right column bus rail (sm+) */}
              <span
                aria-hidden="true"
                className="hidden sm:block absolute left-[calc(50%+27px)] top-5 bottom-5 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(0,217,255,0.32) 22%, rgba(0,255,159,0.22) 78%, transparent)",
                }}
              />
              {competencies.map((comp, i) => (
                <div
                  key={comp}
                  className="group relative flex items-center gap-3 py-3 pl-6"
                >
                  {/* port on the column's rail */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[3px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan/55 group-hover:bg-accent-cyan transition-all duration-300"
                    style={{ boxShadow: "0 0 6px rgba(0,217,255,0.35)" }}
                  />
                  <span className="font-mono text-[10px] text-accent-cyan/55 tracking-wider w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-foreground-secondary/85 group-hover:text-foreground-primary transition-colors duration-300">
                    {comp}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Identity dossier — premium ID-record panel (supports the vault)
// ─────────────────────────────────────────────────────────────────────────
function IdentityDossier() {
  return (
    <div
      className="relative h-full rounded-2xl p-6 md:p-7 overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, rgba(16,20,42,0.86) 0%, rgba(10,14,39,0.93) 100%)",
        border: "1px solid rgba(150,165,205,0.18)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* corner glow */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -left-10 w-40 h-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative flex flex-col h-full gap-5">
        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-mono tracking-[0.26em] text-accent-cyan/80">
            IDENTITY DOSSIER
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-foreground-secondary/40">
            ID / 001
          </span>
        </div>

        {/* name + positioning */}
        <div className="space-y-2">
          <h3 className="text-2xl md:text-[1.7rem] font-bold text-foreground-primary leading-tight">
            Albaraa Alnahari
          </h3>
          <p className="text-sm text-accent-cyan/90 font-medium leading-relaxed">
            Software Engineering Student · AI Builder · Full-Stack Developer
          </p>
        </div>

        {/* metadata registry — centered in the flexible middle */}
        <div className="flex-1 flex flex-col justify-center gap-4 py-1">
          <RoutedDivider />
          <dl className="space-y-3.5">
            <MetaRow label="LOCATION">
              <span className="text-sm text-foreground-primary/90">
                Saudi Arabia
              </span>
            </MetaRow>
            <MetaRow label="LANGUAGES">
              <span className="text-sm text-foreground-primary/90">
                {languages.map((l, i) => (
                  <span key={l}>
                    {i > 0 && (
                      <span className="text-foreground-secondary/40 px-1.5">
                        ·
                      </span>
                    )}
                    {l}
                  </span>
                ))}
              </span>
            </MetaRow>
          </dl>
          <RoutedDivider />
        </div>

        {/* state markers — anchored at the base */}
        <div className="flex flex-wrap gap-2">
          <StateChip color="cyan" label="IDENTITY VERIFIED" />
          <StateChip color="green" label="RECORD ONLINE" />
        </div>
      </div>
    </div>
  );
}

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-foreground-secondary/50">
        <span
          aria-hidden="true"
          className="w-1 h-1 rounded-full bg-accent-cyan/50"
        />
        {label}
      </dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

function RoutedDivider() {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="w-1 h-1 rounded-full bg-accent-cyan/50" />
      <div className="h-px flex-1 bg-gradient-to-r from-accent-cyan/25 via-glass-light/15 to-transparent" />
      <div className="h-px w-6 bg-accent-cyan/20" />
    </div>
  );
}

function StateChip({
  color,
  label,
}: {
  color: "cyan" | "green";
  label: string;
}) {
  const hex = color === "cyan" ? "#00d9ff" : "#00ff9f";
  const rgb = color === "cyan" ? "0,217,255" : "0,255,159";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-mono tracking-[0.18em]"
      style={{
        background: `rgba(${rgb},0.07)`,
        border: `1px solid rgba(${rgb},0.28)`,
        color: color === "cyan" ? "rgba(140,228,255,0.9)" : "rgba(120,255,200,0.9)",
      }}
    >
      <span
        className="w-1 h-1 rounded-full"
        style={{ backgroundColor: hex, boxShadow: `0 0 6px ${hex}` }}
      />
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Sub-section header — indexed system label
// ─────────────────────────────────────────────────────────────────────────
function SubHeader({
  label,
  count,
  accent = "cyan",
}: {
  label: string;
  count: string;
  accent?: "cyan" | "green";
}) {
  const c = accent === "cyan" ? "text-accent-cyan/80" : "text-accent-green/80";
  const line =
    accent === "cyan" ? "from-accent-cyan/35" : "from-accent-green/35";
  return (
    <div className="flex items-center gap-4">
      <span className={`text-xs font-mono tracking-[0.24em] ${c}`}>{label}</span>
      <div className={`h-px flex-1 bg-gradient-to-r ${line} to-transparent`} />
      <span className="text-[10px] font-mono tracking-[0.2em] text-foreground-secondary/40">
        {count}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Credential record — authenticated dossier record
// ─────────────────────────────────────────────────────────────────────────
function CredentialModule({
  credential,
  reduce,
  index,
}: {
  credential: Credential;
  reduce: boolean | null;
  index: number;
}) {
  const featured = credential.featured;
  return (
    <article
      className="group relative h-full rounded-xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: featured
          ? "linear-gradient(150deg, rgba(0,217,255,0.06) 0%, rgba(12,16,40,0.92) 55%)"
          : "linear-gradient(150deg, rgba(16,20,42,0.78) 0%, rgba(10,14,39,0.9) 100%)",
        border: featured
          ? "1px solid rgba(0,217,255,0.32)"
          : "1px solid rgba(150,165,205,0.16)",
        boxShadow: featured
          ? "0 0 24px rgba(0,217,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
          : "none",
      }}
    >
      {/* hover illumination */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, rgba(0,217,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* registry tie — connects the record up to the ledger rail (md+) */}
      <div
        aria-hidden="true"
        className="hidden md:flex flex-col items-center absolute -top-6 left-1/2 -translate-x-1/2"
      >
        <span
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: featured
              ? "rgba(0,217,255,0.95)"
              : "rgba(0,217,255,0.6)",
            boxShadow: featured
              ? "0 0 8px rgba(0,217,255,0.7)"
              : "0 0 5px rgba(0,217,255,0.4)",
          }}
        />
        <span
          className="w-px h-6"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,217,255,0.4), transparent)",
          }}
        />
      </div>

      <div className="relative space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-mono tracking-[0.22em] text-foreground-secondary/45">
            CRED / {credential.index}
          </span>
          {/* compact verification indicator (icon only — reduces repetition) */}
          <span className="inline-flex items-center">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00ff9f"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="sr-only">Verified</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.22em] text-accent-cyan/55">
          {featured && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="rgba(0,217,255,0.85)"
              stroke="none"
              aria-hidden="true"
            >
              <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 7.1-1.01L12 2z" />
            </svg>
          )}
          {credential.kind}
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-foreground-primary leading-snug">
            {credential.title}
          </h4>
          <p className="text-xs text-accent-cyan/80">{credential.organization}</p>
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-glass-light/25">
          <span className="text-[11px] font-mono text-foreground-secondary/55">
            {credential.date}
          </span>
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-accent-green/70"
            animate={reduce ? {} : { opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.3 }}
          />
        </div>
      </div>
    </article>
  );
}
