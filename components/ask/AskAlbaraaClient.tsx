"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Send, Trash2, Copy, Check, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { containerVariants, itemVariants } from "@/lib/motion/variants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  answerQuestion,
  resultForKey,
  GREETING_SOURCES,
  PRESET_KEYS,
  PROFILE_ROLES,
  PROFILE_STATS,
  CONTACT,
  type AnswerKey,
  type PresetKey,
  type SourceKey,
} from "@/lib/albaraa-knowledge";

/**
 * AskAlbaraaClient — the "Ask Albaraa AI" interactive console.
 *
 * A LOCAL, rule-based portfolio assistant. There is no external AI/LLM and no
 * network call: the matcher in lib/albaraa-knowledge.ts resolves a question to a
 * stable answer KEY, and the localized answer body is read from the dictionary
 * (t.ask.answers[key]) — so replies always render in the ACTIVE locale (Arabic
 * in Arabic mode, English in English mode) and re-localize on language switch.
 *
 * Reply reveal: a brief "thinking" pause, then a jank-free opacity-wave that
 * fades the answer in by word then bullet then closing. The full text is present
 * in the DOM from the first frame (no layout shift; the role="log" live region
 * announces the complete answer once, never per word). prefers-reduced-motion
 * shows the final answer instantly. All timers are cleared on unmount / clear.
 *
 * Layout — desktop (lg+): a compact left rail (suggested prompts, profile
 * snapshot, source/status + Contact CTA) beside a chat console that row-spans
 * the rail, so the two columns stay height-balanced. Mobile: intro → compact
 * horizontally-scrollable prompts → chat → profile → source, no overflow.
 *
 * Colours are inline (the global unlayered `a { color }` + theme-token utilities
 * don't emit usable colour CSS); `ie-focus` supplies the accessible cyan ring.
 */

const SURFACE = "var(--surface)";
const SURFACE_DEEP = "var(--surface-deep)";
const BORDER_IDLE = "var(--border-idle)";
const CYAN = "var(--accent)";
const IVORY = "var(--heading)";
const MUTED = "var(--text-muted)";
const BODY = "var(--text-body)";
const GREEN = "var(--accent-green)";

type ContentKey = AnswerKey | "greeting";

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | {
      id: string;
      role: "assistant";
      contentKey: ContentKey;
      sources: SourceKey[];
      contactCta?: boolean;
    };

type ResolvedAnswer = {
  title: string;
  lead: string;
  bullets: readonly string[];
  closing: string;
};

/** A short cosmetic "thinking" pause before the reply types in. */
const THINK_MS = 360;
/** Opacity-wave timings (visual only; bypassed under reduced motion). */
const WORD_STEP = 3;
const WORD_MS = 40;
const BULLET_MS = 150;

/* Stable keys mapping the index-based profile data to dictionary labels. */
const ROLE_KEYS = [
  "student",
  "aiBuilder",
  "fullStack",
  "productMinded",
  "leadership",
] as const;
const STAT_KEYS = [
  "usersResearched",
  "bootcampParticipants",
  "eventParticipants",
  "clubMembers",
  "firstPlace",
] as const;

type RevealState = {
  id: string;
  words: number;
  bullets: number;
  closing: boolean;
  done: boolean;
};
const FULLY_REVEALED = {
  words: Infinity,
  bullets: Infinity,
  closing: true,
  done: true,
};

/* ---- Small presentational pieces ---------------------------------- */

function MonoLabel({
  children,
  color = MUTED,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="font-mono text-[10px] tracking-[0.24em]" style={{ color }}>
      {children}
    </span>
  );
}

function SourceChips({ sources }: { sources: SourceKey[] }) {
  const { t } = useLanguage();
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      {sources.map((s) => (
        <span
          key={s}
          className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.12em]"
          style={{
            borderColor: "rgba(var(--rgb-cyan),0.25)",
            color: "rgba(var(--rgb-cyan),0.85)",
            backgroundColor: "rgba(var(--rgb-cyan),0.04)",
          }}
        >
          {t.ask.sourceChips[s]}
        </span>
      ))}
    </div>
  );
}

/* ---- Main component ----------------------------------------------- */

export function AskAlbaraaClient() {
  const { t, displayFont } = useLanguage();
  const prefersReduced = useReducedMotion();
  const idRef = useRef(2);
  const nextId = () => `m${idRef.current++}`;

  /** Resolve a message's localized body from the active dictionary. */
  const resolveContent = useCallback(
    (contentKey: ContentKey): ResolvedAnswer => {
      if (contentKey === "greeting") {
        return {
          title: t.ask.greeting.title,
          lead: t.ask.greeting.lead,
          bullets: [],
          closing: "",
        };
      }
      const a = t.ask.answers[contentKey];
      return { title: a.title, lead: a.lead, bullets: a.bullets, closing: a.closing };
    },
    [t]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m1", role: "assistant", contentKey: "greeting", sources: GREETING_SOURCES },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reveal, setReveal] = useState<RevealState>({ id: "m1", ...FULLY_REVEALED });

  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);
  const revealTimersRef = useRef<number[]>([]);

  const lastMsg = messages[messages.length - 1];
  const lastId = lastMsg?.id;

  // Pin the conversation to the latest message — scroll the console body only,
  // never the page. (Content is full-height from mount, so this fires once.)
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  // Reveal driver — animates ONLY the newest assistant message via an opacity
  // wave. Intentionally keyed on the new message id alone: `messages` /
  // `resolveContent` are read at fire time but omitted from deps on purpose, so
  // the wave restarts only when a NEW message arrives — never mid-animation from
  // an unrelated re-render (which would reset the reveal). Reduced motion →
  // reveal everything instantly.
  useEffect(() => {
    revealTimersRef.current.forEach((id) => window.clearTimeout(id));
    revealTimersRef.current = [];

    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return;

    if (last.contentKey === "greeting" || prefersReduced) {
      setReveal({ id: last.id, ...FULLY_REVEALED });
      return;
    }

    const c = resolveContent(last.contentKey);
    const totalWords = c.lead ? c.lead.split(" ").length : 0;
    const totalBullets = c.bullets.length;
    const hasClosing = !!c.closing;

    setReveal({ id: last.id, words: 0, bullets: 0, closing: false, done: false });
    const push = (fn: () => void, ms: number) =>
      revealTimersRef.current.push(window.setTimeout(fn, ms));

    let w = 0;
    const finish = () =>
      setReveal((r) =>
        r.id === last.id ? { ...r, closing: hasClosing, done: true } : r
      );
    const stepBullet = (i: number) => {
      if (i >= totalBullets) return finish();
      setReveal((r) => (r.id === last.id ? { ...r, bullets: i + 1 } : r));
      push(() => stepBullet(i + 1), BULLET_MS);
    };
    const stepWord = () => {
      w = Math.min(totalWords, w + WORD_STEP);
      setReveal((r) => (r.id === last.id ? { ...r, words: w } : r));
      if (w < totalWords) push(stepWord, WORD_MS);
      else push(() => stepBullet(0), BULLET_MS);
    };

    if (totalWords > 0) push(stepWord, 50);
    else push(() => stepBullet(0), 50);

    return () => {
      revealTimersRef.current.forEach((id) => window.clearTimeout(id));
      revealTimersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId, prefersReduced]);

  // Clear all pending timers on unmount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      revealTimersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const autoGrow = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, []);

  // Send a message. `label` is the visible user-bubble text; `presetKey` (when a
  // suggested prompt is clicked) routes by key so the reply is exact and the
  // user bubble shows the localized label. Custom input is matched as free text.
  const send = useCallback(
    (label?: string, presetKey?: AnswerKey) => {
      const value = (label ?? input).trim();
      if (!value || thinking) return;

      const result = presetKey ? resultForKey(presetKey) : answerQuestion(value);

      setMessages((prev) => [...prev, { id: nextId(), role: "user", text: value }]);
      setInput("");
      requestAnimationFrame(() => {
        if (taRef.current) taRef.current.style.height = "auto";
      });
      setThinking(true);

      const delay = prefersReduced ? 0 : THINK_MS;
      timeoutRef.current = window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            contentKey: result.key,
            sources: result.sources,
            contactCta: result.contactCta,
          },
        ]);
        setThinking(false);
      }, delay);
    },
    [input, thinking, prefersReduced]
  );

  const clearChat = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    revealTimersRef.current.forEach((id) => window.clearTimeout(id));
    revealTimersRef.current = [];
    setThinking(false);
    setInput("");
    idRef.current = 2;
    setMessages([
      {
        id: "m1",
        role: "assistant",
        contentKey: "greeting",
        sources: GREETING_SOURCES,
      },
    ]);
    setReveal({ id: "m1", ...FULLY_REVEALED });
    requestAnimationFrame(() => {
      if (taRef.current) taRef.current.style.height = "auto";
    });
  }, []);

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
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="relative pb-12 pt-[92px] md:pb-24 md:pt-[104px]">
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
            className={`mt-3 text-4xl font-semibold tracking-tight md:mt-4 md:text-5xl ${displayFont}`}
            style={{ color: IVORY }}
          >
            {t.ask.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-3 text-base leading-relaxed md:text-lg"
            style={{ color: BODY }}
          >
            {t.ask.intro}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-sm"
            style={{ color: MUTED }}
          >
            {t.ask.introNote}
          </motion.p>
        </motion.div>

        {/* Two-zone grid. Flat placement + order so the chat sits 2nd on mobile
            but in column 2 (row-spanning the compact rail) on desktop. `items-
            stretch` lets the row-spanning chat fill the rail's full height, so the
            two columns stay height-balanced and the rail never overpowers the
            chat. (Mobile is grid-cols-1, so rows size to content regardless.) */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-stretch lg:gap-5">
          {/* Suggested prompts — mobile order 1 (compact scroll row) · desktop col1/row1 */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <SuggestedPanel
              onPick={(key) => send(t.ask.suggested.items[key], key)}
              disabled={thinking}
            />
          </div>

          {/* Chat console — mobile order 2 · desktop col2 spanning the rail */}
          <div
            className="order-2 flex min-h-[400px] flex-col overflow-hidden rounded-2xl border lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:min-h-[480px]"
            style={{
              backgroundColor: SURFACE,
              borderColor: BORDER_IDLE,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Console header */}
            <div
              className="flex items-start justify-between gap-3 border-b px-4 py-3 md:px-5"
              style={{ borderColor: BORDER_IDLE }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: GREEN,
                      boxShadow: "0 0 8px rgba(var(--rgb-green),0.7)",
                    }}
                  />
                  <span
                    dir="ltr"
                    className="ltr-isolate truncate font-mono text-[11px] tracking-[0.18em]"
                    style={{ color: IVORY }}
                  >
                    {t.ask.console.title}
                  </span>
                  <span
                    className="hidden font-mono text-[9px] tracking-[0.16em] sm:inline"
                    style={{ color: "rgba(var(--rgb-green),0.8)" }}
                  >
                    {t.ask.console.statusOnline}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <MonoLabel>{t.ask.console.knowledgeBase}</MonoLabel>
                  <span
                    dir="ltr"
                    className="ltr-isolate font-mono text-[10px] tracking-[0.18em]"
                    style={{ color: "rgba(var(--rgb-cyan),0.7)" }}
                  >
                    {t.ask.console.route}
                  </span>
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
              {messages.map((m) => {
                if (m.role === "user") {
                  return (
                    <motion.div key={m.id} {...msgAnim} className="flex justify-end">
                      <div
                        dir="auto"
                        className="max-w-[80%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed"
                        style={{
                          backgroundColor: "rgba(var(--rgb-cyan),0.08)",
                          border: "1px solid rgba(var(--rgb-cyan),0.22)",
                          color: "var(--text-strong)",
                        }}
                      >
                        {m.text}
                      </div>
                    </motion.div>
                  );
                }

                const c = resolveContent(m.contentKey);
                const active = reveal.id === m.id;
                const done = active ? reveal.done : true;
                // While actively animating, gate by the per-step counts; once the
                // reveal is done (or for any older message) show EVERYTHING — the
                // counts are index-based against the locale that was active when
                // the wave fired, so after a language switch the freshly localized
                // word/bullet arrays must not be clipped by stale counts.
                const animating = active && !reveal.done;
                const wordsShown = animating ? reveal.words : Infinity;
                const bulletsShown = animating ? reveal.bullets : Infinity;
                const closingShown = animating ? reveal.closing : true;
                const words = c.lead ? c.lead.split(" ") : [];
                const fade = prefersReduced ? undefined : "opacity 240ms ease";

                return (
                  <motion.div key={m.id} {...msgAnim} className="flex justify-start">
                    <div className="max-w-[720px]">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="grid h-5 w-5 place-items-center rounded-md font-mono text-[8px] tracking-wide"
                          style={{
                            backgroundColor: "rgba(var(--rgb-cyan),0.1)",
                            border: "1px solid rgba(var(--rgb-cyan),0.25)",
                            color: CYAN,
                          }}
                        >
                          AI
                        </span>
                        <span
                          dir="ltr"
                          className="ltr-isolate font-mono text-[9px] tracking-[0.16em]"
                          style={{ color: MUTED }}
                        >
                          {t.ask.console.assistantBrand}
                        </span>
                      </div>
                      <div
                        className="mt-1.5 rounded-2xl rounded-tl-sm px-4 py-3.5"
                        style={{
                          backgroundColor: SURFACE_DEEP,
                          border: `1px solid ${BORDER_IDLE}`,
                        }}
                      >
                        <p
                          className="text-[13px] font-semibold"
                          style={{ color: IVORY }}
                        >
                          {c.title}
                        </p>
                        <p
                          className="mt-2.5 text-sm leading-relaxed"
                          style={{ color: BODY }}
                        >
                          {words.map((word, i) => (
                            <span
                              key={i}
                              style={{
                                opacity: i < wordsShown ? 1 : 0,
                                transition: fade,
                              }}
                            >
                              {word}
                              {i < words.length - 1 ? " " : ""}
                            </span>
                          ))}
                        </p>
                        {c.bullets.length ? (
                          <ul className="mt-3 space-y-1.5">
                            {c.bullets.map((b, i) => (
                              <li
                                key={i}
                                className="flex gap-2 text-sm leading-relaxed"
                                style={{
                                  color: BODY,
                                  opacity: i < bulletsShown ? 1 : 0,
                                  transition: fade,
                                }}
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-2 h-1 w-1 shrink-0 rounded-full"
                                  style={{
                                    backgroundColor: "rgba(var(--rgb-cyan),0.6)",
                                  }}
                                />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {c.closing ? (
                          <p
                            className="mt-3 text-sm font-medium leading-relaxed"
                            style={{
                              color: IVORY,
                              opacity: closingShown ? 1 : 0,
                              transition: fade,
                            }}
                          >
                            {c.closing}
                          </p>
                        ) : null}
                        <div
                          // `inert` while still revealing keeps the (invisible)
                          // Copy / Contact controls out of the tab order + AT
                          // until the answer is fully shown (WCAG 2.4.7 / 2.4.11).
                          inert={!done}
                          style={{
                            opacity: done ? 1 : 0,
                            transition: fade,
                            pointerEvents: done ? "auto" : "none",
                          }}
                        >
                          <SourceChips sources={m.sources} />
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => copyAnswer(m.id, answerToText(c))}
                              aria-label={t.ask.console.copyAria}
                              className="ie-focus inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[9px] tracking-[0.14em] outline-none transition-colors duration-200"
                              style={{
                                borderColor: BORDER_IDLE,
                                color: copiedId === m.id ? GREEN : MUTED,
                              }}
                            >
                              {copiedId === m.id ? (
                                <Check size={12} strokeWidth={2} aria-hidden="true" />
                              ) : (
                                <Copy size={12} strokeWidth={1.6} aria-hidden="true" />
                              )}
                              {copiedId === m.id
                                ? t.ask.console.copied
                                : t.ask.console.copy}
                            </button>
                            {m.contactCta && (
                              <Link
                                href={CONTACT.contactRoute}
                                className="ie-focus inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[9px] tracking-[0.14em] outline-none transition-colors duration-200"
                                style={{
                                  borderColor: "rgba(var(--rgb-cyan),0.4)",
                                  color: CYAN,
                                  backgroundColor: "rgba(var(--rgb-cyan),0.05)",
                                }}
                              >
                                {t.ask.console.openContact}
                                <ArrowUpRight
                                  size={12}
                                  strokeWidth={1.8}
                                  aria-hidden="true"
                                />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Thinking indicator (visual only; the final answer is announced
                  via the role="log" region when it mounts). */}
              {thinking && (
                <motion.div
                  {...msgAnim}
                  className="flex justify-start"
                  aria-hidden="true"
                >
                  <div
                    className="flex items-center gap-2 rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{
                      backgroundColor: SURFACE_DEEP,
                      border: `1px solid ${BORDER_IDLE}`,
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: CYAN }}
                          animate={
                            prefersReduced ? undefined : { opacity: [0.3, 1, 0.3] }
                          }
                          transition={
                            prefersReduced
                              ? undefined
                              : { duration: 1, repeat: Infinity, delay: i * 0.18 }
                          }
                        />
                      ))}
                    </div>
                    <span
                      className="font-mono text-[10px] tracking-[0.14em]"
                      style={{ color: MUTED }}
                    >
                      {t.ask.console.typing}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Polite status for assistant-typing — separate from the role="log"
                region so it gives AT a brief "responding" cue without disturbing
                the single, complete answer announcement. */}
            <span className="sr-only" role="status" aria-live="polite">
              {thinking ? t.ask.console.typingAria : ""}
            </span>

            {/* Input row */}
            <div
              className="border-t px-3 py-3.5 md:px-4 md:py-4"
              style={{ borderColor: BORDER_IDLE }}
            >
              <div
                className="flex items-end gap-2 rounded-xl border px-3 py-2.5"
                style={{
                  backgroundColor: "var(--surface-inset)",
                  borderColor: BORDER_IDLE,
                }}
              >
                <label htmlFor="ask-input" className="sr-only">
                  {t.ask.input.srLabel}
                </label>
                <textarea
                  id="ask-input"
                  ref={taRef}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    autoGrow();
                  }}
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
                    backgroundColor: canSend
                      ? "rgba(var(--rgb-cyan),0.12)"
                      : "transparent",
                    border: `1px solid ${canSend ? "rgba(var(--rgb-cyan),0.5)" : BORDER_IDLE}`,
                    color: canSend ? CYAN : MUTED,
                  }}
                >
                  <Send size={16} strokeWidth={1.7} aria-hidden="true" />
                </button>
              </div>
              <p
                className="mt-2 px-1 font-mono text-[9px] tracking-[0.14em]"
                style={{ color: "var(--text-muted)" }}
              >
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

/** Flatten a resolved answer to plain text for the copy-to-clipboard action. */
function answerToText(a: ResolvedAnswer): string {
  const lines = [a.title, "", a.lead];
  if (a.bullets.length) {
    lines.push("");
    for (const b of a.bullets) lines.push(`• ${b}`);
  }
  if (a.closing) {
    lines.push("");
    lines.push(a.closing);
  }
  return lines.join("\n");
}

/* ---- Left-rail panels --------------------------------------------- */

function SuggestedPanel({
  onPick,
  disabled,
}: {
  onPick: (key: PresetKey) => void;
  disabled: boolean;
}) {
  const { t } = useLanguage();
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-2xl border p-4 md:p-5"
      style={{
        backgroundColor: SURFACE,
        borderColor: BORDER_IDLE,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <motion.div variants={itemVariants}>
        <MonoLabel>{t.ask.suggested.label}</MonoLabel>
      </motion.div>
      {/* Mobile: a single compact horizontally-scrollable chip row (keeps the
          prompts from dominating vertical space). Desktop: a vertical rail. */}
      <div
        className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:mt-3.5 lg:flex-col lg:gap-2 lg:overflow-x-visible lg:pb-0"
        style={{ scrollbarWidth: "none" }}
      >
        {PRESET_KEYS.map((key) => (
          <motion.button
            key={key}
            variants={itemVariants}
            type="button"
            onClick={() => onPick(key)}
            disabled={disabled}
            className="ie-focus group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2 text-[13px] leading-snug outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 lg:w-full lg:shrink lg:justify-between lg:whitespace-normal lg:px-3.5 lg:py-2.5 lg:text-left lg:text-sm"
            style={{
              borderColor: BORDER_IDLE,
              backgroundColor: "var(--surface-inset)",
              color: BODY,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(var(--rgb-cyan),0.4)";
              e.currentTarget.style.color = IVORY;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = BORDER_IDLE;
              e.currentTarget.style.color = BODY;
            }}
          >
            <span>{t.ask.suggested.items[key]}</span>
            <ArrowUpRight
              size={14}
              strokeWidth={1.6}
              aria-hidden="true"
              style={{ color: "rgba(var(--rgb-cyan),0.6)" }}
              className="hidden shrink-0 lg:block"
            />
          </motion.button>
        ))}
      </div>
      {t.ask.suggested.note && (
        <p className="mt-3 text-[11px] leading-relaxed" style={{ color: MUTED }}>
          {t.ask.suggested.note}
        </p>
      )}
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
      style={{
        backgroundColor: SURFACE,
        borderColor: BORDER_IDLE,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <motion.div variants={itemVariants}>
        <MonoLabel>{t.ask.profile.label}</MonoLabel>
      </motion.div>
      <motion.div variants={itemVariants} className="mt-3.5 flex flex-wrap gap-1.5">
        {PROFILE_ROLES.map((_r, i) => {
          const key = ROLE_KEYS[i];
          return (
            <span
              key={key}
              className="rounded-full border px-2.5 py-1 text-[11px]"
              style={{
                borderColor: BORDER_IDLE,
                color: BODY,
                backgroundColor: "var(--surface-inset)",
              }}
            >
              {t.ask.profile.roles[key]}
            </span>
          );
        })}
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2"
      >
        {PROFILE_STATS.map((s, i) => {
          const key = STAT_KEYS[i];
          return (
            <div
              key={key}
              className="rounded-xl border px-3 py-2"
              style={{
                borderColor: BORDER_IDLE,
                backgroundColor: "var(--surface-inset)",
              }}
            >
              <div
                dir="ltr"
                className="ltr-isolate text-lg font-semibold"
                style={{ color: CYAN }}
              >
                {s.value}
              </div>
              <div
                className="mt-0.5 text-[11px] leading-tight"
                style={{ color: MUTED }}
              >
                {t.ask.profile.stats[key]}
              </div>
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
      style={{
        backgroundColor: SURFACE,
        borderColor: BORDER_IDLE,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: GREEN,
            boxShadow: "0 0 8px rgba(var(--rgb-green),0.7)",
          }}
        />
        <MonoLabel color="rgba(var(--rgb-green),0.82)">{t.ask.source.label}</MonoLabel>
      </motion.div>
      <motion.dl variants={itemVariants} className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.k} className="flex items-baseline justify-between gap-3">
            <dt
              className="font-mono text-[10px] tracking-[0.16em]"
              style={{ color: MUTED }}
            >
              {row.k}
            </dt>
            <dd className="text-right text-[12px]" style={{ color: BODY }}>
              {row.v}
            </dd>
          </div>
        ))}
      </motion.dl>
      <motion.div
        variants={itemVariants}
        className="mt-3.5 border-t pt-3.5"
        style={{ borderColor: BORDER_IDLE }}
      >
        <p className="text-sm" style={{ color: IVORY }}>
          {t.ask.source.ctaPrompt}
        </p>
        <Link
          href={CONTACT.contactRoute}
          className="ie-focus mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium outline-none transition-colors duration-200"
          style={{
            borderColor: "rgba(var(--rgb-cyan),0.5)",
            color: CYAN,
            backgroundColor: "rgba(var(--rgb-cyan),0.06)",
          }}
        >
          {t.ask.source.cta}
          <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
