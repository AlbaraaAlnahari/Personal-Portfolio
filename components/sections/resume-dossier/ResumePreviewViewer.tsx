"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useThemeName } from "@/hooks/useThemeName";

// =====================================================
// RESUME PREVIEW VIEWER — theme-aware CV document viewer
//
// A realistic desktop-style document viewer (NOT an embedded PDF): a
// window chrome (titlebar + window dots + filename + Open) wraps an
// internally-scrollable canvas that holds a real résumé PAGE — a dense,
// two-column CV snapshot of the official résumé. A bottom action bar
// carries the intentional Open / Download actions. The real PDF is never
// modified and is always reachable via the same path as the vault.
//
// Theme behaviour (driven by useThemeName — the sheet deliberately differs
// from the surrounding surface, so this is not pure CSS-token theming):
//   • warm  → cream/paper sheet, dark ink, soft paper shadow on a deeper
//             cream canvas
//   • navy  → graphite/slate sheet (#111827), high-contrast light ink,
//             subtle cyan separators on a near-black canvas
// Both stay high-contrast; no pure-white-in-dark and no black-on-black.
// =====================================================

const PDF_PATH = "/resume/Albaraa-Alnahari-Resume.pdf";
const PDF_FILENAME = "Albaraa-Alnahari-Resume.pdf";

export function ResumePreviewViewer() {
  const { t } = useLanguage();
  const p = t.resume.preview;
  const warm = useThemeName() === "warm";

  const c = warm
    ? {
        shell: "#efe9dc", bar: "rgba(120,95,55,0.14)", canvas: "#e7e0cf",
        sheet: "#faf6ea", ink: "#1d2740", sub: "#4b5670", faint: "#7b8398",
        line: "rgba(29,39,64,0.12)", chip: "rgba(11,107,125,0.09)",
        thumb: "rgba(29,39,64,0.28)", sheetShadow: "0 16px 40px rgba(40,30,10,0.14)",
      }
    : {
        shell: "#0c111e", bar: "rgba(140,165,215,0.14)", canvas: "#080c16",
        sheet: "#111827", ink: "#edf3ff", sub: "#aebbd0", faint: "#8492ab",
        line: "rgba(130,165,215,0.15)", chip: "rgba(0,217,255,0.08)",
        thumb: "rgba(150,170,210,0.32)", sheetShadow: "0 16px 40px rgba(0,0,0,0.5)",
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

      {/* ── Titlebar ───────────────────────────────────────────── */}
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
        className="overflow-y-auto overflow-x-hidden px-3 py-4 md:px-6 md:py-6 max-h-[72vh] md:max-h-[680px]"
        style={{ backgroundColor: c.canvas, scrollbarWidth: "thin", scrollbarColor: `${c.thumb} transparent` }}
      >
        <article
          className="mx-auto max-w-3xl rounded-xl p-5 md:p-8"
          style={{ backgroundColor: c.sheet, border: `1px solid ${c.line}`, boxShadow: c.sheetShadow }}
        >
          {/* CV header */}
          <header className="space-y-2">
            <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: c.ink }}>
              {t.resume.identity.name}
            </h3>
            <p className="text-[12.5px] md:text-[13px] leading-relaxed" style={{ color: c.sub }}>
              {p.roleLine}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5" aria-hidden="true">
              <ContactItem color={accent} sub={c.sub} label={p.contact.email} icon="email" />
              <ContactItem color={accent} sub={c.sub} label={p.contact.github} icon="github" />
              <ContactItem color={accent} sub={c.sub} label={p.contact.linkedin} icon="linkedin" />
            </div>
          </header>

          <div className="my-4 h-px" style={{ background: c.line }} />

          {/* Two-column CV body */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-5">
            {/* Main column */}
            <div className="md:col-span-2 space-y-5">
              <Section title={p.summaryTitle} accent={accent} ink={c.ink}>
                <p className="text-[12.5px] md:text-[13px] leading-relaxed" style={{ color: c.sub }}>
                  {p.summaryBody}
                </p>
              </Section>

              <Section title={p.experienceTitle} accent={accent} ink={c.ink}>
                <ul className="space-y-3">
                  {p.experience.map((e) => (
                    <li key={e.role}>
                      <p className="text-[12.5px] md:text-[13px] font-semibold leading-snug" style={{ color: c.ink }}>
                        {e.role}
                      </p>
                      <p className="mt-0.5 text-[12px] md:text-[12.5px] leading-relaxed" style={{ color: c.sub }}>
                        {e.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title={p.projectsTitle} accent={accent} ink={c.ink}>
                <ul className="space-y-2">
                  {p.projects.map((pr) => (
                    <li key={pr.name} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} aria-hidden="true" />
                      <span className="text-[12.5px] md:text-[13px] leading-snug" style={{ color: c.sub }}>
                        <span dir="ltr" className="ltr-isolate font-semibold" style={{ color: c.ink }}>{pr.name}</span>
                        <span className="px-1.5" style={{ color: c.faint }}>—</span>
                        {pr.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            {/* Side column */}
            <div className="md:col-span-1 space-y-5">
              <Section title={p.skillsTitle} accent={accent} ink={c.ink}>
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      dir="ltr"
                      className="ltr-isolate px-2 py-0.5 rounded-md text-[11px] font-medium"
                      style={{ background: c.chip, border: `1px solid rgba(var(--rgb-cyan),0.22)`, color: c.ink }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Section>

              <Section title={p.educationTitle} accent={accent} ink={c.ink}>
                <ul className="space-y-2.5">
                  {p.education.map((ed) => (
                    <li key={ed} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} aria-hidden="true" />
                      <span className="text-[12px] md:text-[12.5px] leading-snug" style={{ color: c.sub }}>
                        {ed}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>
          </div>

          {/* CV footer */}
          <div className="mt-6 pt-3 flex items-center justify-between border-t" style={{ borderColor: c.line }}>
            <span className="font-mono text-[10px] md:text-[11px]" style={{ color: c.faint }}>
              {p.updated}
            </span>
            <span dir="ltr" className="ltr-isolate font-mono text-[10px] md:text-[11px]" style={{ color: c.faint }}>
              {PDF_FILENAME}
            </span>
          </div>
        </article>
      </div>

      {/* ── Bottom action bar ──────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-t" style={{ borderColor: c.bar }}>
        <span dir="ltr" className="ltr-isolate font-mono text-[10px] md:text-[11px] tracking-wide" style={{ color: c.faint }}>
          {p.documentTag}
        </span>
        <div className="flex items-center gap-2.5">
          <a
            href={PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="ie-focus inline-flex items-center gap-1.5 font-semibold text-[11px] md:text-xs no-underline transition-colors duration-300"
            style={{ color: accent }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
            {p.open}
          </a>
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
    </div>
  );
}

function Section({
  title,
  accent,
  ink,
  children,
}: {
  title: string;
  accent: string;
  ink: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-3.5 h-px" style={{ background: accent }} aria-hidden="true" />
        <h4 className="text-[12px] font-bold tracking-wide" style={{ color: ink }}>
          {title}
        </h4>
      </div>
      {children}
    </section>
  );
}

function ContactItem({
  color,
  sub,
  label,
  icon,
}: {
  color: string;
  sub: string;
  label: string;
  icon: "email" | "github" | "linkedin";
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11.5px]" style={{ color: sub }}>
      <span style={{ color }}>
        {icon === "email" && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
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
      {label}
    </span>
  );
}
