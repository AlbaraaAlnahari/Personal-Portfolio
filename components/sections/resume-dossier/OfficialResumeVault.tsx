"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =====================================================
// OFFICIAL RESUME VAULT — the signature focal object of
// the Verified Career Dossier. A secure-document module
// with an engineered verification route:
//
//   PDF document artifact → verification route →
//   VERIFIED RECORD state → action dock
//
// The route + ports + relevant action illuminate together
// on hover / keyboard focus of the real PDF actions.
//
// PDF wiring is preserved exactly:
//  • View PDF  → opens the official PDF in a new tab
//  • Download  → downloads the official PDF
// =====================================================

const PDF_PATH = "/resume/Albaraa-Alnahari-Resume.pdf";
const PDF_FILENAME = "Albaraa-Alnahari-Resume.pdf";

export function OfficialResumeVault() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  const engage = {
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
    onFocus: () => setActive(true),
    onBlur: () => setActive(false),
  };

  // Verification-route appearance, intensified when an action is engaged.
  const spineBg = active
    ? "linear-gradient(to bottom, transparent, rgba(0,217,255,0.85) 20%, rgba(0,255,159,0.55) 80%, transparent)"
    : "linear-gradient(to bottom, transparent, rgba(0,217,255,0.38) 20%, rgba(0,217,255,0.18) 80%, transparent)";
  const portStyle = (lit: boolean) => ({
    backgroundColor: lit ? "rgba(0,217,255,1)" : "rgba(0,217,255,0.6)",
    boxShadow: lit
      ? "0 0 10px rgba(0,217,255,0.85)"
      : "0 0 5px rgba(0,217,255,0.4)",
  });

  return (
    <div className="relative h-full">
      {/* Ambient focal glow — marks this as the section's anchor */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[28px] blur-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0.85,
          background:
            "radial-gradient(60% 60% at 32% 30%, rgba(0,217,255,0.16) 0%, transparent 72%)",
        }}
      />

      <div
        className="relative h-full rounded-2xl overflow-hidden transition-shadow duration-500"
        style={{
          background:
            "linear-gradient(150deg, rgba(18,22,46,0.94) 0%, rgba(10,14,39,0.97) 100%)",
          border: "1px solid rgba(0,217,255,0.32)",
          boxShadow: active
            ? "0 0 56px rgba(0,217,255,0.18), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 0 44px rgba(0,217,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Top edge trace */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(0,217,255,0.65), transparent)",
          }}
        />

        {/* Header strip */}
        <div className="flex items-center justify-between px-6 md:px-8 pt-6">
          <div className="flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
              style={{ boxShadow: "0 0 9px rgba(0,217,255,0.85)" }}
            />
            <span className="text-[10px] md:text-[11px] font-mono tracking-[0.3em] text-accent-cyan/90">
              OFFICIAL RESUME
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-[0.26em] text-foreground-secondary/40">
            VAULT / 00
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-6 md:gap-8 p-6 md:p-8 items-center">
          {/* Document silhouette */}
          <div className="relative mx-auto sm:mx-0 w-[122px] h-[154px]">
            {/* page glow — localized, lifts when the route is engaged */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-lg blur-md transition-opacity duration-500"
              style={{
                opacity: active ? 1 : 0.55,
                background: "rgba(0,217,255,0.14)",
              }}
            />
            <svg
              viewBox="0 0 122 154"
              className="relative w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="vault-page" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(20,26,52,0.95)" />
                  <stop offset="100%" stopColor="rgba(12,16,40,0.95)" />
                </linearGradient>
              </defs>
              {/* page body with folded corner */}
              <path
                d="M10 4 H88 L112 28 V150 H10 Z"
                fill="url(#vault-page)"
                stroke="rgba(0,217,255,0.45)"
                strokeWidth="1.2"
              />
              {/* folded corner */}
              <path
                d="M88 4 V28 H112 Z"
                fill="rgba(0,217,255,0.16)"
                stroke="rgba(0,217,255,0.5)"
                strokeWidth="1.2"
              />
              {/* header bar */}
              <rect
                x="22"
                y="40"
                width="48"
                height="6"
                rx="2"
                fill="rgba(0,217,255,0.75)"
              />
              {/* text lines */}
              {[58, 70, 82, 94, 106, 118].map((y, i) => (
                <rect
                  key={y}
                  x="22"
                  y={y}
                  width={i % 3 === 2 ? 44 : 78}
                  height="4"
                  rx="2"
                  fill="rgba(160,170,205,0.32)"
                />
              ))}
              {/* PDF tag */}
              <rect
                x="22"
                y="130"
                width="30"
                height="12"
                rx="2.5"
                fill="none"
                stroke="rgba(0,217,255,0.6)"
                strokeWidth="1"
              />
              <text
                x="37"
                y="139"
                textAnchor="middle"
                fontSize="7"
                fontFamily="ui-monospace, monospace"
                letterSpacing="1"
                fill="rgba(0,217,255,0.9)"
              >
                PDF
              </text>
            </svg>

            {/* Restrained verification scan — disabled under reduced motion */}
            {!reduce && (
              <motion.div
                aria-hidden="true"
                className="absolute left-[8%] right-[8%] h-px rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(0,217,255,0.85), transparent)",
                  boxShadow: "0 0 8px rgba(0,217,255,0.6)",
                }}
                initial={{ top: "16%", opacity: 0 }}
                animate={{
                  top: ["16%", "92%", "16%"],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 3.6,
                  times: [0, 0.45, 0.55, 1],
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>

          {/* Content column with the verification route spine */}
          <div className="relative min-w-0">
            {/* vertical verification spine */}
            <span
              aria-hidden="true"
              className="absolute left-[5px] top-7 bottom-7 w-px transition-all duration-500"
              style={{ background: spineBg }}
            />
            {/* route micro-label */}
            <span
              aria-hidden="true"
              className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[7px] font-mono tracking-[0.3em] transition-colors duration-500"
              style={{
                writingMode: "vertical-rl",
                color: active ? "rgba(0,217,255,0.6)" : "rgba(0,217,255,0.28)",
              }}
            >
              AUTH ROUTE
            </span>

            <div className="space-y-5 pl-8">
              {/* Badge node — verification state */}
              <div className="relative">
                {/* port on spine */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 -left-[27px] w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={portStyle(active)}
                />
                {/* connector from the document into the spine (desktop) */}
                <span
                  aria-hidden="true"
                  className="hidden sm:block absolute top-1/2 -translate-y-1/2 h-px transition-all duration-500"
                  style={{
                    left: "-58px",
                    width: "31px",
                    background: active
                      ? "linear-gradient(to right, rgba(0,217,255,0.7), rgba(0,217,255,0.9))"
                      : "linear-gradient(to right, rgba(0,217,255,0.15), rgba(0,217,255,0.4))",
                  }}
                />
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono tracking-[0.18em]"
                    style={{
                      background: "rgba(0,217,255,0.1)",
                      border: "1px solid rgba(0,217,255,0.35)",
                      color: "rgba(120,225,255,0.95)",
                    }}
                  >
                    PDF DOCUMENT
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <svg
                      width="11"
                      height="11"
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
                    <span className="text-[9px] font-mono tracking-[0.22em] text-accent-green/85">
                      VERIFIED RECORD
                    </span>
                  </span>
                </div>
              </div>

              {/* Filename + description */}
              <div className="space-y-2">
                <p
                  className="font-mono text-sm md:text-base text-foreground-primary/95 break-all"
                  style={{ letterSpacing: "0.01em" }}
                >
                  {PDF_FILENAME}
                </p>
                <p className="text-sm text-foreground-secondary/70 leading-relaxed max-w-md">
                  Official résumé on record — view it in a new tab or download
                  the full document.
                </p>
              </div>

              {/* Action node — dock */}
              <div className="relative">
                {/* port on spine */}
                <span
                  aria-hidden="true"
                  className="absolute top-[22px] -left-[27px] w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={portStyle(active)}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* View → open the official PDF in a new tab */}
                  <a
                    href={PDF_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View the official résumé PDF in a new tab"
                    {...engage}
                    className="ie-focus inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap no-underline transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #00d9ff 0%, #00a6cf 100%)",
                      color: "#04121c",
                      boxShadow: active
                        ? "0 0 34px rgba(0,217,255,0.5)"
                        : "0 0 26px rgba(0,217,255,0.38)",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    View PDF
                  </a>

                  {/* Download → download the official PDF */}
                  <a
                    href={PDF_PATH}
                    download={PDF_FILENAME}
                    aria-label="Download the official résumé PDF"
                    {...engage}
                    className="ie-focus inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap no-underline transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: active
                        ? "rgba(0,217,255,0.1)"
                        : "rgba(0,217,255,0.06)",
                      border: "1px solid rgba(0,217,255,0.42)",
                      color: "#bfe9f7",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 3v12" />
                      <path d="m7 10 5 5 5-5" />
                      <path d="M5 21h14" />
                    </svg>
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom routing detail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(0,217,255,0.22), transparent)",
          }}
        />
      </div>
    </div>
  );
}
