"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";
import { useThemeName } from "@/hooks/useThemeName";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * ContactDirectLine — the ALBARAA "Direct Line" communication console.
 *
 * A premium, editorial Contact experience on the dark-navy archive system:
 * a left-hand message console (form) paired with a right-hand channel panel
 * (email + verified social routes) and an availability signal — all over a
 * faint local blueprint grid with restrained corner brackets and cyan signal
 * accents. Human and confident, not a generic SaaS form.
 *
 * Email sending is NOT wired in this pass: the submit handler validates
 * client-side and shows a truthful "signal queued" state — it never claims a
 * message was delivered. The handler is isolated and marked for the future
 * Resend connection (see onSubmit). No env vars, no API route, no SDK import.
 *
 * Accent colours are inline rgba/hex because this project's Tailwind theme
 * tokens do not emit working colour utilities (the approach the approved
 * production sections use); cyan focus comes from the shared `ie-focus`
 * (:focus-visible) ring. Contact data mirrors the verified values already in
 * the repo — no invented handles or URLs.
 */

/* ── shared tokens ─────────────────────────────────────────────────── */
const SURFACE = "var(--surface)";
const SURFACE_DEEP = "var(--surface-deep)";
const BORDER_IDLE = "var(--border-idle)";
const BORDER_LIT = "rgba(var(--rgb-cyan),0.5)";
const CYAN = "var(--accent)";
const IVORY = "var(--heading)";
const MUTED = "var(--text-muted)";
const BODY = "var(--text-body)";
/* Error palette resolves to theme-aware values scoped under #contact in
 * globals.css (the previous hardcoded salmon was invisible on warm cream). */
const ERR = "var(--c-error)";
const ERR_STRONG = "var(--c-error-strong)";
const ERR_BORDER = "var(--c-error-border)";
const ERR_BG = "var(--c-error-bg)";

/* Verified contact data (already present in the repo — not invented). */
const EMAIL = "albaraa.a.alnahari@gmail.com";
const CHANNELS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/albaraa-alnahari",
    href: "https://www.linkedin.com/in/albaraa-alnahari",
    Icon: Linkedin,
  },
  {
    key: "github",
    label: "GitHub",
    value: "github.com/AlbaraaAlnahari",
    href: "https://github.com/AlbaraaAlnahari",
    Icon: Github,
  },
  {
    key: "x",
    label: "X / Twitter",
    value: "x.com/x_ff",
    href: "https://x.com/x_ff",
    Icon: Twitter,
  },
] as const;

/* Stable topic keys — labels are resolved from the active dictionary. The form
 * submit handler still posts a topic string; the key is the stable identity. */
const TOPIC_KEYS = [
  "opportunity",
  "collaboration",
  "aiProduct",
  "projectManagement",
  "speaking",
  "general",
] as const;
type Topic = (typeof TOPIC_KEYS)[number];

/* Identity capabilities lead the list (programming/AI products, then project /
 * product management), followed by the remaining collaboration channels. */
const AVAILABILITY_KEYS = [
  "aiProducts",
  "projectManagement",
  "collaborations",
  "speaking",
  "initiatives",
  "photography",
] as const;

/* ── decorative open registration brackets (neutral silver, never cyan) ── */
function FrameBrackets() {
  const c = "rgba(226,232,242,0.26)";
  const base = "pointer-events-none absolute h-5 w-5";
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(base, "-left-1.5 -top-1.5 border-l border-t")}
        style={{ borderColor: c }}
      />
      <span
        aria-hidden="true"
        className={cn(base, "-right-1.5 -top-1.5 border-r border-t")}
        style={{ borderColor: c }}
      />
      <span
        aria-hidden="true"
        className={cn(base, "-bottom-1.5 -left-1.5 border-b border-l")}
        style={{ borderColor: c }}
      />
      <span
        aria-hidden="true"
        className={cn(base, "-bottom-1.5 -right-1.5 border-b border-r")}
        style={{ borderColor: c }}
      />
    </>
  );
}

/* ── premium text field ────────────────────────────────────────────── */
function Field({
  id,
  label,
  type = "text",
  as = "input",
  value,
  onChange,
  placeholder,
  error,
  optional,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
  optional?: boolean;
  autoComplete?: string;
}) {
  const { t } = useLanguage();
  const shared = {
    id,
    value,
    onChange,
    placeholder,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "contact-field ie-focus w-full rounded-xl px-4 py-3 text-[15px] leading-relaxed outline-none transition-colors duration-200 placeholder:text-[var(--placeholder)]",
    style: {
      backgroundColor: SURFACE_DEEP,
      border: `1px solid ${error ? ERR_BORDER : "rgba(var(--rgb-body),0.22)"}`,
      color: IVORY,
    },
  } as const;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 flex items-center justify-between gap-3 sm:mb-1.5"
      >
        <span
          className="font-mono text-[10px] tracking-[0.2em]"
          style={{ color: "var(--text-strong)" }}
        >
          {label}
        </span>
        {optional && (
          <span
            className="font-mono text-[9px] tracking-[0.18em]"
            style={{ color: MUTED }}
          >
            {t.contact.form.optional}
          </span>
        )}
      </label>
      {as === "textarea" ? (
        <textarea
          {...shared}
          rows={5}
          className={cn(shared.className, "resize-none contact-textarea")}
        />
      ) : (
        <input type={type} {...shared} />
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[12px]"
          style={{ color: ERR }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ── verified social channel (full-card external link) ─────────────── */
function ChannelCard({
  label,
  value,
  href,
  Icon,
}: {
  label: string;
  value: string;
  href: string;
  Icon: typeof Linkedin;
}) {
  const { t } = useLanguage();
  const [lit, setLit] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} ${t.contact.channels.opensNewTab}`}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      onFocus={() => setLit(true)}
      onBlur={() => setLit(false)}
      className="ie-focus group flex items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 outline-none transition-colors duration-200 sm:px-4 sm:py-4"
      style={{
        border: `1px solid ${lit ? BORDER_LIT : "rgba(var(--rgb-body),0.16)"}`,
        backgroundColor: SURFACE_DEEP,
      }}
    >
      <span className="flex min-w-0 items-center gap-3.5">
        <span
          aria-hidden="true"
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg transition-colors"
          style={{
            border: `1px solid ${lit ? "rgba(var(--rgb-cyan),0.4)" : "rgba(var(--rgb-body),0.2)"}`,
            color: lit ? CYAN : "var(--text-body)",
          }}
        >
          <Icon size={16} strokeWidth={1.6} />
        </span>
        <span className="min-w-0">
          <span
            className="block text-sm font-semibold"
            style={{ color: "var(--text-strong)" }}
          >
            {label}
          </span>
          <span
            dir="ltr"
            className="ltr-isolate block truncate font-mono text-[11px] tracking-[0.02em]"
            style={{ color: "var(--text-body)" }}
          >
            {value}
          </span>
        </span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        size={16}
        strokeWidth={1.8}
        className="flex-shrink-0 transition-colors"
        style={{ color: lit ? CYAN : "var(--text-muted)" }}
      />
    </a>
  );
}

/* ── email channel (copy-to-clipboard + mailto) ────────────────────── */
function EmailCard() {
  const { t } = useLanguage();
  const [lit, setLit] = useState(false);
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link remains the fallback */
    }
  }
  return (
    <div
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-200 sm:px-4 sm:py-4"
      style={{
        border: `1px solid ${lit ? BORDER_LIT : "rgba(var(--rgb-body),0.16)"}`,
        backgroundColor: SURFACE_DEEP,
      }}
    >
      <a
        href={`mailto:${EMAIL}`}
        aria-label={`${t.contact.channels.emailAria.before}${EMAIL}${t.contact.channels.emailAria.after}`}
        onFocus={() => setLit(true)}
        onBlur={() => setLit(false)}
        className="ie-focus flex min-w-0 items-center gap-3.5 rounded outline-none"
      >
        <span
          aria-hidden="true"
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg"
          style={{
            border: `1px solid ${lit ? "rgba(var(--rgb-cyan),0.4)" : "rgba(var(--rgb-body),0.2)"}`,
            color: lit ? CYAN : "var(--text-body)",
          }}
        >
          <Mail size={16} strokeWidth={1.6} />
        </span>
        <span className="min-w-0">
          <span
            className="block text-sm font-semibold"
            style={{ color: "var(--text-strong)" }}
          >
            {t.contact.channels.emailLabel}
          </span>
          <span
            dir="ltr"
            className="ltr-isolate block truncate font-mono text-[11px] tracking-[0.02em]"
            style={{ color: "var(--text-body)" }}
          >
            {EMAIL}
          </span>
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={
          copied ? t.contact.channels.copiedAria : t.contact.channels.copyAria
        }
        className="ie-focus inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[10px] tracking-[0.16em] outline-none transition-colors duration-200"
        style={{
          border: `1px solid ${copied ? "rgba(var(--rgb-green),0.5)" : "rgba(var(--rgb-body),0.2)"}`,
          color: copied ? "rgba(var(--rgb-green),0.95)" : "var(--text-body)",
          backgroundColor: copied ? "rgba(var(--rgb-green),0.06)" : "transparent",
        }}
      >
        {copied ? (
          <Check size={13} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Copy size={13} strokeWidth={1.8} aria-hidden="true" />
        )}
        {copied ? t.contact.channels.copied : t.contact.channels.copy}
      </button>
    </div>
  );
}

/* ── the Direct Line console ───────────────────────────────────────── */
export function ContactDirectLine() {
  const { t, displayFont } = useLanguage();
  const reduce = useReducedMotion();

  // `company` is a hidden honeypot — real users leave it empty.
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    link: "",
    company: "",
  });
  const [topic, setTopic] = useState<Topic>("opportunity");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
    link?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const topicRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate() {
    const e: { name?: string; email?: string; message?: string; link?: string } = {};
    if (!form.name.trim()) e.name = t.contact.form.validation.name;
    if (!form.email.trim()) e.email = t.contact.form.validation.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = t.contact.form.validation.emailInvalid;
    if (!form.message.trim()) e.message = t.contact.form.validation.message;
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, topic }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: typeof errors;
      };
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        if (data.errors) setErrors((prev) => ({ ...prev, ...data.errors }));
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setForm({ name: "", email: "", message: "", link: "", company: "" });
    setTopic("opportunity");
    setErrors({});
    setStatus("idle");
  }

  function onTopicKey(e: React.KeyboardEvent, idx: number) {
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = (idx + 1) % TOPIC_KEYS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (idx - 1 + TOPIC_KEYS.length) % TOPIC_KEYS.length;
    else return;
    e.preventDefault();
    setTopic(TOPIC_KEYS[next]);
    topicRefs.current[next]?.focus();
  }

  const fade: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };
  const theme = useThemeName();
  const warm = theme === "warm";
  // Card presence — a slightly stronger edge + soft, theme-aware lift so the
  // form, channels, and availability panels read as confident, equal blocks on
  // large screens (warm keeps a faint cream lift; navy gets quiet depth).
  const CARD_BORDER = "1px solid rgba(var(--rgb-body),0.16)";
  const CARD_SHADOW = warm
    ? "0 14px 34px rgba(40,30,10,0.07), inset 0 1px 0 rgba(255,255,255,0.45)"
    : "0 18px 44px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)";
  const group: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.04,
      },
    },
  };

  return (
    <section id="contact" className="contact-section relative overflow-hidden">
      {/* Character watermark — decorative, behind all content, desktop only,
          never blocks input. The blueprint grid is now the shared fixed
          InteriorBlueprintField layer (mounted by the page shell). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={
            theme === "warm" ? "/images/Untitled%20design.svg" : "/images/contact.svg"
          }
          alt=""
          width={1005}
          height={944}
          unoptimized
          className="contact-art absolute hidden w-auto xl:block"
          style={{ right: "-30px", bottom: "32px" }}
        />
      </div>

      <div className="relative z-10">
        {/* Shell width is token-driven (viewport-aware): wider on true large/
            tall screens, tighter on short ones. The intro's own max-widths and
            md/lg behaviour stay unchanged. */}
        <Container style={{ maxWidth: "var(--contact-shell-max)" }}>
          <motion.div initial="hidden" animate="visible" variants={group}>
            {/* ── Section 1 — intro band ── */}
            <motion.div variants={fade} className="readability-field">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em]"
                  style={{ color: "rgba(var(--rgb-cyan),0.82)" }}
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: CYAN,
                      boxShadow: "0 0 8px rgba(var(--rgb-cyan),0.7)",
                    }}
                  />
                  {t.contact.eyebrow}
                </span>
                <span
                  dir="ltr"
                  className="ltr-isolate font-mono text-[10px] tracking-[0.18em]"
                  style={{ color: "rgba(var(--rgb-body),0.55)" }}
                >
                  {t.contact.route}
                </span>
              </div>

              <h2
                className={cn(
                  "contact-title mt-5 max-w-3xl font-bold text-foreground sm:mt-6",
                  displayFont
                )}
              >
                {t.contact.title.lead}{" "}
                <span
                  style={{
                    color: CYAN,
                    textShadow: "0 0 28px rgba(var(--rgb-cyan),0.3)",
                  }}
                >
                  {t.contact.title.accent}
                </span>
              </h2>
              <p
                className="contact-body mt-5 max-w-xl leading-[1.7] sm:mt-6"
                style={{ color: BODY }}
              >
                {t.contact.intro}
              </p>

              <div
                className="mt-5 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 sm:mt-6"
                style={{
                  border: `1px solid rgba(var(--rgb-green),0.28)`,
                  backgroundColor: "rgba(var(--rgb-green),0.04)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: "var(--accent-green)",
                    boxShadow: "0 0 8px rgba(var(--rgb-green),0.6)",
                  }}
                />
                <span
                  className="font-mono text-[10px] tracking-[0.22em]"
                  style={{ color: "rgba(var(--rgb-green),0.9)" }}
                >
                  {t.contact.availabilityBanner}
                </span>
              </div>
            </motion.div>

            {/* ── Sections 2 + 3 — two-column console ── */}
            <motion.div variants={fade} className="contact-gridwrap relative">
              <FrameBrackets />
              <div className="contact-grid grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
                {/* LEFT — message console */}
                <div
                  className="contact-card min-w-0"
                  style={{
                    border: CARD_BORDER,
                    backgroundColor: SURFACE,
                    boxShadow: CARD_SHADOW,
                  }}
                >
                  <div className="mb-5 flex items-center justify-between gap-3 sm:mb-7">
                    <h3 className="text-lg font-bold text-foreground">
                      {t.contact.form.heading}
                    </h3>
                  </div>

                  {status === "success" ? (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex flex-col items-center px-2 py-10 text-center"
                    >
                      <span
                        className="grid h-14 w-14 place-items-center rounded-full"
                        style={{
                          border: "1px solid rgba(var(--rgb-green),0.4)",
                          backgroundColor: "rgba(var(--rgb-green),0.06)",
                        }}
                      >
                        <Check
                          size={26}
                          strokeWidth={2}
                          aria-hidden="true"
                          style={{ color: "var(--accent-green)" }}
                        />
                      </span>
                      <h3 className="mt-5 text-xl font-bold text-foreground">
                        {t.contact.success.heading}
                      </h3>
                      <p
                        className="mt-2 max-w-sm text-sm leading-relaxed"
                        style={{ color: BODY }}
                      >
                        {t.contact.success.body}
                      </p>
                      {/* Quiet system receipt — fills the panel intentionally without clutter. */}
                      <dl
                        className="mt-5 w-full max-w-xs overflow-hidden rounded-xl border text-left"
                        style={{
                          borderColor: BORDER_IDLE,
                          backgroundColor: SURFACE_DEEP,
                        }}
                      >
                        {[
                          {
                            k: t.contact.success.rows.response.k,
                            v: t.contact.success.rows.response.v,
                            dot: null as string | null,
                          },
                        ].map((row, i) => (
                          <div
                            key={row.k}
                            className="flex items-center justify-between gap-3 px-3.5 py-2.5"
                            style={
                              i > 0
                                ? { borderTop: "1px solid rgba(var(--rgb-body),0.1)" }
                                : undefined
                            }
                          >
                            <dt
                              className="font-mono text-[10px] tracking-[0.18em]"
                              style={{ color: MUTED }}
                            >
                              {row.k}
                            </dt>
                            <dd
                              className="flex items-center gap-1.5 text-[12px] font-medium"
                              style={{ color: "rgba(var(--rgb-body),0.9)" }}
                            >
                              {row.dot && (
                                <span
                                  aria-hidden="true"
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{
                                    backgroundColor: row.dot,
                                    boxShadow: `0 0 6px ${row.dot}99`,
                                  }}
                                />
                              )}
                              {row.v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <button
                        type="button"
                        onClick={reset}
                        className="ie-focus mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold outline-none transition-colors duration-200"
                        style={{ border: `1px solid var(--heading)`, color: IVORY }}
                      >
                        {t.contact.success.reset}
                      </button>
                    </div>
                  ) : (
                    <form
                      className="space-y-4 sm:space-y-5"
                      noValidate
                      onSubmit={onSubmit}
                    >
                      <Field
                        id="cf-name"
                        label={t.contact.form.fields.name.label}
                        value={form.name}
                        onChange={set("name")}
                        placeholder={t.contact.form.fields.name.placeholder}
                        error={errors.name}
                        autoComplete="name"
                      />
                      <Field
                        id="cf-email"
                        label={t.contact.form.fields.email.label}
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder={t.contact.form.fields.email.placeholder}
                        error={errors.email}
                        autoComplete="email"
                      />

                      {/* Topic — segmented radiogroup */}
                      <div>
                        <span
                          className="mb-2 block font-mono text-[10px] tracking-[0.2em]"
                          style={{ color: "var(--text-body)" }}
                        >
                          {t.contact.form.fields.topic.label}
                        </span>
                        <div
                          role="radiogroup"
                          aria-label={t.contact.form.fields.topic.groupAria}
                          className="flex flex-wrap gap-2 sm:gap-2.5"
                        >
                          {TOPIC_KEYS.map((topicKey, i) => {
                            const selected = topic === topicKey;
                            return (
                              <button
                                key={topicKey}
                                ref={(el) => {
                                  topicRefs.current[i] = el;
                                }}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                tabIndex={selected ? 0 : -1}
                                onClick={() => setTopic(topicKey)}
                                onKeyDown={(e) => onTopicKey(e, i)}
                                className="ie-focus rounded-full px-3 py-1.5 text-xs font-medium outline-none transition-colors duration-200 sm:px-3.5 sm:text-[12.5px]"
                                style={{
                                  border: `1px solid ${selected ? "rgba(var(--rgb-cyan),0.6)" : "rgba(var(--rgb-body),0.2)"}`,
                                  backgroundColor: selected
                                    ? "rgba(var(--rgb-cyan),0.14)"
                                    : "transparent",
                                  color: selected
                                    ? "var(--accent-strong)"
                                    : "rgba(var(--rgb-body),0.9)",
                                }}
                              >
                                {t.contact.form.topics[topicKey]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <Field
                        id="cf-message"
                        label={t.contact.form.fields.message.label}
                        as="textarea"
                        value={form.message}
                        onChange={set("message")}
                        placeholder={t.contact.form.fields.message.placeholder}
                        error={errors.message}
                      />
                      <Field
                        id="cf-link"
                        label={t.contact.form.fields.link.label}
                        value={form.link}
                        onChange={set("link")}
                        placeholder={t.contact.form.fields.link.placeholder}
                        optional
                        autoComplete="url"
                        error={errors.link}
                      />

                      {/* Honeypot — hidden from humans; bots that fill it are dropped server-side. */}
                      <div
                        aria-hidden="true"
                        className="absolute h-px w-px overflow-hidden"
                        style={{ left: "-9999px", top: "auto" }}
                      >
                        <label htmlFor="cf-company">
                          {t.contact.form.honeypotLabel}
                        </label>
                        <input
                          id="cf-company"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.company}
                          onChange={set("company")}
                        />
                      </div>

                      {status === "error" && (
                        <div
                          role="alert"
                          className="flex items-start gap-2.5 rounded-xl px-4 py-3"
                          style={{
                            border: `1px solid ${ERR_BORDER}`,
                            backgroundColor: ERR_BG,
                          }}
                        >
                          <AlertCircle
                            size={16}
                            strokeWidth={1.8}
                            aria-hidden="true"
                            style={{ color: ERR, marginTop: 1, flexShrink: 0 }}
                          />
                          <p
                            className="text-[13px] leading-relaxed"
                            style={{ color: ERR_STRONG }}
                          >
                            {t.contact.form.error.before}
                            <a
                              href={`mailto:${EMAIL}`}
                              dir="ltr"
                              className="ie-focus ltr-isolate rounded font-medium underline outline-none"
                              style={{ color: ERR_STRONG }}
                            >
                              {EMAIL}
                            </a>
                            {t.contact.form.error.after}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        aria-busy={status === "sending"}
                        className="ie-focus inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-semibold outline-none transition-[background-color,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-80"
                        style={{
                          backgroundColor: "var(--contact-pill-bg)",
                          color: "var(--contact-pill-text)",
                        }}
                        onMouseEnter={(e) => {
                          if (status !== "sending")
                            e.currentTarget.style.backgroundColor =
                              "var(--contact-pill-bg-hover)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--contact-pill-bg)";
                        }}
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                              className={reduce ? "" : "animate-spin"}
                            />
                            {t.contact.form.sending}
                          </>
                        ) : (
                          <>
                            <Send size={16} strokeWidth={2} aria-hidden="true" />
                            {t.contact.form.send}
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* RIGHT — channels + availability */}
                <div className="contact-rightcol flex flex-col min-w-0">
                  <div
                    className="contact-card min-w-0"
                    style={{
                      border: CARD_BORDER,
                      backgroundColor: SURFACE,
                      boxShadow: CARD_SHADOW,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-foreground">
                        {t.contact.channels.heading}
                      </h3>
                      <span
                        className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em]"
                        style={{ color: "rgba(var(--rgb-body),0.55)" }}
                      >
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full"
                          style={{
                            backgroundColor: CYAN,
                            boxShadow: "0 0 6px rgba(var(--rgb-cyan),0.6)",
                          }}
                        />
                        {t.contact.channels.verifiedRoutes}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
                      {t.contact.channels.description}
                    </p>
                    <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                      <EmailCard />
                      {CHANNELS.map((c) => (
                        <ChannelCard
                          key={c.key}
                          label={c.label}
                          value={c.value}
                          href={c.href}
                          Icon={c.Icon}
                        />
                      ))}
                    </div>
                  </div>

                  {/* ── Section 4 — availability / signal ── */}
                  <div
                    className="contact-card min-w-0"
                    style={{
                      border: CARD_BORDER,
                      backgroundColor: SURFACE,
                      boxShadow: CARD_SHADOW,
                    }}
                  >
                    <span
                      className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em]"
                      style={{ color: "rgba(var(--rgb-body),0.6)" }}
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor: "var(--accent-green)",
                          boxShadow: "0 0 7px rgba(var(--rgb-green),0.55)",
                        }}
                      />
                      {t.contact.availability.statusTag}
                    </span>
                    <p
                      className="mt-3.5 text-sm font-semibold sm:mt-4"
                      style={{ color: "rgba(var(--rgb-body),0.9)" }}
                    >
                      {t.contact.availability.availableFor}
                    </p>
                    <div className="mt-3.5 flex flex-wrap gap-2 sm:mt-4 sm:gap-3">
                      {AVAILABILITY_KEYS.map((a) => (
                        <span
                          key={a}
                          className="rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.12em]"
                          style={{
                            border: "1px solid rgba(var(--rgb-cyan),0.4)",
                            color: "rgba(var(--rgb-cyan),0.95)",
                            backgroundColor: "rgba(var(--rgb-cyan),0.08)",
                          }}
                        >
                          {t.contact.availability.items[a]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Section 5 — closing note ── */}
            {/* Contained "direct email" strip — a quiet bordered line instead of
                free-floating text, so it reads as a deliberate premium element
                with tighter surrounding whitespace. */}
            <motion.div
              variants={fade}
              className="contact-fallback flex justify-center"
            >
              <p
                className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl px-4 py-2.5 text-center text-[13px] leading-relaxed"
                style={{
                  border: "1px solid rgba(var(--rgb-body),0.14)",
                  backgroundColor: SURFACE_DEEP,
                  color: MUTED,
                }}
              >
                <Mail
                  size={13}
                  strokeWidth={1.7}
                  aria-hidden="true"
                  className="flex-shrink-0"
                  style={{ color: "rgba(var(--rgb-cyan),0.7)" }}
                />
                <span>
                  {t.contact.closing.before}
                  <a
                    href={`mailto:${EMAIL}`}
                    dir="ltr"
                    className="ie-focus ltr-isolate rounded font-medium outline-none"
                    style={{ color: "rgba(var(--rgb-cyan),0.9)" }}
                  >
                    {EMAIL}
                  </a>
                  {t.contact.closing.after}
                </span>
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
