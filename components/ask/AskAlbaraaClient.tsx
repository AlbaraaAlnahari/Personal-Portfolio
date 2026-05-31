"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Send, Trash2, Copy, Check, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { containerVariants, itemVariants } from "@/lib/motion/variants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  answerQuestion,
  GREETING,
  PRESET_QUESTIONS,
  PROFILE_ROLES,
  PROFILE_STATS,
  CONTACT,
  type KnowledgeAnswer,
} from "@/lib/albaraa-knowledge";

/**
 * AskAlbaraaClient — the "Ask Albaraa AI" interactive console.
 *
 * A LOCAL, rule-based portfolio assistant. There is no external AI/LLM and no
 * network call: every reply comes from the deterministic matcher in
 * lib/albaraa-knowledge.ts over verified résumé/portfolio data. The "thinking"
 * pause is purely cosmetic.
 *
 * Layout — two zones. Desktop (lg+): a left rail (suggested prompts, profile
 * snapshot, source/status + Contact CTA) beside a tall chat console. Mobile:
 * everything stacks (intro header → suggested → chat → profile → source), so the
 * chat sits high and there is no horizontal overflow at any width.
 *
 * Colours are inline (the project's global unlayered `a { color }` rule and
 * theme-token utilities don't emit usable colour CSS), matching approved
 * sections; `ie-focus` supplies the accessible cyan keyboard ring.
 */

const SURFACE = "var(--surface)";
const SURFACE_DEEP = "var(--surface-deep)";
const BORDER_IDLE = "var(--border-idle)";
const CYAN = "var(--accent)";
const IVORY = "var(--heading)";
const MUTED = "var(--text-muted)";
const BODY = "var(--text-body)";
const GREEN = "var(--accent-green)";

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; answer: KnowledgeAnswer };

const THINK_MS = 520;

/* Stable keys mapping the matcher-facing English data (lib/albaraa-knowledge.ts)
 * to the dictionary's display labels. The canonical English question is still
 * sent to the deterministic matcher; only the visible label is localized. The
 * order mirrors the source arrays exactly. */
const PRESET_KEYS = ["profile", "docupilot", "skills", "leadership", "experience", "contact"] as const;
const ROLE_KEYS = ["student", "aiBuilder", "fullStack", "productMinded", "leadership"] as const;
const STAT_KEYS = ["usersResearched", "bootcampParticipants", "eventParticipants", "clubMembers", "firstPlace"] as const;

/** Flatten an answer to plain text for the copy-to-clipboard action. */
function answerToText(a: KnowledgeAnswer): string {
  const lines = [a.title, "", a.lead];
  if (a.bullets?.length) {
    lines.push("");
    for (const b of a.bullets) lines.push(`• ${b}`);
  }
  return lines.join("\n");
}

/* ---- Small presentational pieces ---------------------------------- */

function MonoLabel({ children, color = MUTED }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.24em]" style={{ color }}>
      {children}
    </span>
  );
}

function SourceChips({ sources }: { sources: KnowledgeAnswer["sources"] }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      {sources.map((s) => (
        <span
          key={s}
          className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em]"
          style={{ borderColor: "rgba(var(--rgb-cyan),0.25)", color: "rgba(var(--rgb-cyan),0.85)", backgroundColor: "rgba(var(--rgb-cyan),0.04)" }}
        >
          {s.toUpperCase()}
        </span>
      ))}
    </div>
  );
}

/* ---- Main component ----------------------------------------------- */

export function AskAlbaraaClient() {
  const { t, displayFont } = useLanguage();
  const prefersReduced = useReducedMotion();
  const idRef = useRef(1);
  const nextId = () => `m${idRef.current++}`;

  // Localized initial greeting — a static seeded message. Provenance chips stay
  // on the fixed source taxonomy from the knowledge base. Memoised so it only
  // changes when the language does (keeps the send/clear callbacks stable).
  const greeting: KnowledgeAnswer = useMemo(
    () => ({
      title: t.ask.greeting.title,
      lead: t.ask.greeting.lead,
      sources: GREETING.sources,
    }),
    [t.ask.greeting.title, t.ask.greeting.lead],
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m0", role: "assistant", answer: greeting },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  // Keep the conversation pinned to the latest message — scroll the console
  // body only, never the page.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  // Clear any pending timers on unmount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const autoGrow = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, []);

  const send = useCallback(
    (raw?: string) => {
      const value = (raw ?? input).trim();
      if (!value || thinking) return;

      setMessages((prev) => [...prev, { id: nextId(), role: "user", text: value }]);
      setInput("");
      // reset textarea height after clearing
      requestAnimationFrame(() => {
        if (taRef.current) taRef.current.style.height = "auto";
      });
      setThinking(true);

      const delay = prefersReduced ? 0 : THINK_MS;
      timeoutRef.current = window.setTimeout(() => {
        const answer = answerQuestion(value);
        setMessages((prev) => [...prev, { id: nextId(), role: "assistant", answer }]);
        setThinking(false);
      }, delay);
    },
    [input, thinking, prefersReduced],
  );

  const clearChat = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setThinking(false);
    setInput("");
    idRef.current = 1;
    setMessages([{ id: "m0", role: "assistant", answer: greeting }]);
    requestAnimationFrame(() => {
      if (taRef.current) taRef.current.style.height = "auto";
    });
  }, [greeting]);

  const copyAnswer = useCallback(async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      /* clipboard unavailable — silently no-op */
    }
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const canSend = input.trim().length > 0 && !thinking;
  const canClear = messages.length > 1 || thinking;
  const msgAnim = prefersReduced
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section className="relative pb-16 pt-[92px] md:pb-24 md:pt-[104px]">
      <Container>
        {/* Intro header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="readability-field max-w-2xl"
        >
          <motion.div variants={itemVariants}>
            <MonoLabel color="rgba(var(--rgb-cyan),0.82)">{t.ask.eyebrow}</MonoLabel>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className={`mt-4 text-4xl font-semibold tracking-tight md:text-5xl ${displayFont}`}
            style={{ color: IVORY }}
          >
            {t.ask.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-base leading-relaxed md:text-lg" style={{ color: BODY }}>
            {t.ask.intro}
          </motion.p>
          <motion.p variants={itemVariants} className="mt-2 text-sm" style={{ color: MUTED }}>
            {t.ask.introNote}
          </motion.p>
        </motion.div>

        {/* Two-zone grid. Flat placement + order so the chat sits 2nd on mobile
            but in column 2 (spanning the left rail) on desktop. */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:items-start">
          {/* Suggested prompts — mobile order 1 · desktop col1/row1 */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <SuggestedPanel onPick={(q) => send(q)} disabled={thinking} />
          </div>

          {/* Chat console — mobile order 2 · desktop col2 spanning the rail */}
          <div className="order-2 flex min-h-[480px] flex-col overflow-hidden rounded-2xl border lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:min-h-[560px]"
            style={{ backgroundColor: SURFACE, borderColor: BORDER_IDLE, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          >
            {/* Console header */}
            <div className="flex items-start justify-between gap-3 border-b px-4 py-3.5 md:px-5" style={{ borderColor: BORDER_IDLE }}>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GREEN, boxShadow: "0 0 8px rgba(var(--rgb-green),0.7)" }} />
                  <span dir="ltr" className="ltr-isolate truncate font-mono text-[11px] tracking-[0.18em]" style={{ color: IVORY }}>{t.ask.console.title}</span>
                  <span className="font-mono text-[9px] tracking-[0.16em]" style={{ color: "rgba(var(--rgb-green),0.8)" }}>{t.ask.console.statusOnline}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <MonoLabel>{t.ask.console.knowledgeBase}</MonoLabel>
                  <span dir="ltr" className="ltr-isolate font-mono text-[10px] tracking-[0.18em]" style={{ color: "rgba(var(--rgb-cyan),0.7)" }}>{t.ask.console.route}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={clearChat}
                disabled={!canClear}
                aria-label={t.ask.console.clearAria}
                className="ie-focus inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] tracking-[0.16em] outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ borderColor: BORDER_IDLE, color: MUTED }}
              >
                <Trash2 size={13} strokeWidth={1.6} aria-hidden="true" />
                <span className="hidden sm:inline">{t.ask.console.clear}</span>
              </button>
            </div>

            {/* Message area */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-label={t.ask.console.logAria}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-5 md:px-5"
            >
              {messages.map((m) =>
                m.role === "user" ? (
                  <motion.div key={m.id} {...msgAnim} className="flex justify-end">
                    <div
                      className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed"
                      style={{ backgroundColor: "rgba(var(--rgb-cyan),0.08)", border: "1px solid rgba(var(--rgb-cyan),0.22)", color: "var(--text-strong)" }}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={m.id} {...msgAnim} className="flex justify-start">
                    <div className="max-w-[88%]">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="grid h-5 w-5 place-items-center rounded-md font-mono text-[8px] tracking-wide"
                          style={{ backgroundColor: "rgba(var(--rgb-cyan),0.1)", border: "1px solid rgba(var(--rgb-cyan),0.25)", color: CYAN }}
                        >
                          AI
                        </span>
                        <span dir="ltr" className="ltr-isolate font-mono text-[9px] tracking-[0.16em]" style={{ color: MUTED }}>{t.ask.console.assistantBrand}</span>
                      </div>
                      <div
                        className="mt-1.5 rounded-2xl rounded-tl-sm px-4 py-3"
                        style={{ backgroundColor: SURFACE_DEEP, border: `1px solid ${BORDER_IDLE}` }}
                      >
                        <p className="text-[13px] font-semibold" style={{ color: IVORY }}>{m.answer.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: BODY }}>{m.answer.lead}</p>
                        {m.answer.bullets?.length ? (
                          <ul className="mt-2.5 space-y-1.5">
                            {m.answer.bullets.map((b, i) => (
                              <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: BODY }}>
                                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "rgba(var(--rgb-cyan),0.6)" }} />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <SourceChips sources={m.answer.sources} />
                        {/* actions */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyAnswer(m.id, answerToText(m.answer))}
                            aria-label={t.ask.console.copyAria}
                            className="ie-focus inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[9px] tracking-[0.14em] outline-none transition-colors duration-200"
                            style={{ borderColor: BORDER_IDLE, color: copiedId === m.id ? GREEN : MUTED }}
                          >
                            {copiedId === m.id ? <Check size={12} strokeWidth={2} aria-hidden="true" /> : <Copy size={12} strokeWidth={1.6} aria-hidden="true" />}
                            {copiedId === m.id ? t.ask.console.copied : t.ask.console.copy}
                          </button>
                          {m.answer.contactCta && (
                            <Link
                              href={CONTACT.contactRoute}
                              className="ie-focus inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[9px] tracking-[0.14em] outline-none transition-colors duration-200"
                              style={{ borderColor: "rgba(var(--rgb-cyan),0.4)", color: CYAN, backgroundColor: "rgba(var(--rgb-cyan),0.05)" }}
                            >
                              {t.ask.console.openContact}
                              <ArrowUpRight size={12} strokeWidth={1.8} aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ),
              )}

              {/* Thinking indicator */}
              {thinking && (
                <motion.div {...msgAnim} className="flex justify-start" aria-hidden="true">
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3" style={{ backgroundColor: SURFACE_DEEP, border: `1px solid ${BORDER_IDLE}` }}>
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: CYAN }}
                          animate={prefersReduced ? undefined : { opacity: [0.3, 1, 0.3] }}
                          transition={prefersReduced ? undefined : { duration: 1, repeat: Infinity, delay: i * 0.18 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input row */}
            <div className="border-t px-3 py-3 md:px-4" style={{ borderColor: BORDER_IDLE }}>
              <div
                className="flex items-end gap-2 rounded-xl border px-3 py-2"
                style={{ backgroundColor: "var(--surface-inset)", borderColor: BORDER_IDLE }}
              >
                <label htmlFor="ask-input" className="sr-only">{t.ask.input.srLabel}</label>
                <textarea
                  id="ask-input"
                  ref={taRef}
                  rows={1}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); autoGrow(); }}
                  onKeyDown={onKeyDown}
                  placeholder={t.ask.input.placeholder}
                  className="ie-focus max-h-[120px] min-h-[24px] flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:opacity-60"
                  style={{ color: IVORY }}
                />
                <button
                  type="button"
                  onClick={() => send()}
                  disabled={!canSend}
                  aria-label={t.ask.input.sendAria}
                  className="ie-focus inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    backgroundColor: canSend ? "rgba(var(--rgb-cyan),0.12)" : "transparent",
                    border: `1px solid ${canSend ? "rgba(var(--rgb-cyan),0.5)" : BORDER_IDLE}`,
                    color: canSend ? CYAN : MUTED,
                  }}
                >
                  <Send size={16} strokeWidth={1.7} aria-hidden="true" />
                </button>
              </div>
              <p className="mt-2 px-1 font-mono text-[9px] tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                {t.ask.input.hint}
              </p>
            </div>
          </div>

          {/* Profile snapshot — mobile order 3 · desktop col1/row2 */}
          <div className="order-3 lg:col-start-1 lg:row-start-2">
            <ProfileSnapshot />
          </div>

          {/* Source / status + Contact CTA — mobile order 4 · desktop col1/row3 */}
          <div className="order-4 lg:col-start-1 lg:row-start-3">
            <SourceStatusPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---- Left-rail panels --------------------------------------------- */

function SuggestedPanel({ onPick, disabled }: { onPick: (q: string) => void; disabled: boolean }) {
  const { t } = useLanguage();
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-2xl border p-4 md:p-5"
      style={{ backgroundColor: SURFACE, borderColor: BORDER_IDLE, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
    >
      <motion.div variants={itemVariants}>
        <MonoLabel>{t.ask.suggested.label}</MonoLabel>
      </motion.div>
      <div className="mt-3 flex flex-col gap-2">
        {PRESET_QUESTIONS.map((q, i) => {
          const key = PRESET_KEYS[i];
          return (
            <motion.button
              key={key}
              variants={itemVariants}
              type="button"
              // Send the canonical English question to the deterministic matcher;
              // only the visible label is localized.
              onClick={() => onPick(q)}
              disabled={disabled}
              className="ie-focus group flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left text-sm outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ borderColor: BORDER_IDLE, backgroundColor: "var(--surface-inset)", color: BODY }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(var(--rgb-cyan),0.4)"; e.currentTarget.style.color = IVORY; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER_IDLE; e.currentTarget.style.color = BODY; }}
            >
              <span>{t.ask.suggested.items[key]}</span>
              <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" style={{ color: "rgba(var(--rgb-cyan),0.6)" }} className="shrink-0" />
            </motion.button>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed" style={{ color: MUTED }}>
        {t.ask.suggested.note}
      </p>
    </motion.div>
  );
}

function ProfileSnapshot() {
  const { t } = useLanguage();
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-2xl border p-4 md:p-5"
      style={{ backgroundColor: SURFACE, borderColor: BORDER_IDLE, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
    >
      <motion.div variants={itemVariants}>
        <MonoLabel>{t.ask.profile.label}</MonoLabel>
      </motion.div>
      <motion.div variants={itemVariants} className="mt-3 flex flex-wrap gap-1.5">
        {PROFILE_ROLES.map((_r, i) => {
          const key = ROLE_KEYS[i];
          return (
            <span
              key={key}
              className="rounded-full border px-2.5 py-1 text-[11px]"
              style={{ borderColor: BORDER_IDLE, color: BODY, backgroundColor: "var(--surface-inset)" }}
            >
              {t.ask.profile.roles[key]}
            </span>
          );
        })}
      </motion.div>
      <motion.div variants={itemVariants} className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
        {PROFILE_STATS.map((s, i) => {
          const key = STAT_KEYS[i];
          return (
            <div key={key} className="rounded-xl border px-3 py-2.5" style={{ borderColor: BORDER_IDLE, backgroundColor: "var(--surface-inset)" }}>
              <div dir="ltr" className="ltr-isolate text-lg font-semibold" style={{ color: CYAN }}>{s.value}</div>
              <div className="mt-0.5 text-[11px] leading-tight" style={{ color: MUTED }}>{t.ask.profile.stats[key]}</div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function SourceStatusPanel() {
  const { t } = useLanguage();
  const rows = [
    t.ask.source.rows.engine,
    t.ask.source.rows.data,
    t.ask.source.rows.externalAi,
    t.ask.source.rows.privacy,
  ];
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-2xl border p-4 md:p-5"
      style={{ backgroundColor: SURFACE, borderColor: BORDER_IDLE, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
    >
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GREEN, boxShadow: "0 0 8px rgba(var(--rgb-green),0.7)" }} />
        <MonoLabel color="rgba(var(--rgb-green),0.82)">{t.ask.source.label}</MonoLabel>
      </motion.div>
      <motion.dl variants={itemVariants} className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.k} className="flex items-baseline justify-between gap-3">
            <dt className="font-mono text-[10px] tracking-[0.16em]" style={{ color: MUTED }}>{row.k}</dt>
            <dd className="text-right text-[12px]" style={{ color: BODY }}>{row.v}</dd>
          </div>
        ))}
      </motion.dl>
      <motion.div variants={itemVariants} className="mt-4 border-t pt-4" style={{ borderColor: BORDER_IDLE }}>
        <p className="text-sm" style={{ color: IVORY }}>{t.ask.source.ctaPrompt}</p>
        <Link
          href={CONTACT.contactRoute}
          className="ie-focus mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium outline-none transition-colors duration-200"
          style={{ borderColor: "rgba(var(--rgb-cyan),0.5)", color: CYAN, backgroundColor: "rgba(var(--rgb-cyan),0.06)" }}
        >
          {t.ask.source.cta}
          <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
