"use client";

import { motion } from "framer-motion";
import { COMMAND_MODULES, type CommandModule } from "./CommandModuleData";
import type { ReactorState } from "./IntelligenceEngineModel";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// =====================================================
// MOBILE MODULE GRID — deliberate 2-column × 3-row neural console
// Production-only mobile navigation for the Intelligence Engine hero.
// Reuses the desktop command-card language (graphite glass, accent icon
// chips, accent endpoint "port" dots) so the dock reads as part of the
// same system. Every module is fully visible — no horizontal scroll,
// no clipping. Tapping a module pulses the reactor in its accent and
// routes to the matching section; TERMINAL is a coherent "coming online"
// placeholder that responds to the engine but never navigates.
// =====================================================

interface MobileModuleGridProps {
  activeModule: ReactorState | null;
  /** Tap handler — the hero pulses the reactor accent and navigates. */
  onSelect: (mod: CommandModule) => void;
  reducedMotion: boolean;
}

export default function MobileModuleGrid({
  activeModule,
  onSelect,
  reducedMotion,
}: MobileModuleGridProps) {
  const { t, isAr } = useLanguage();
  return (
    <div className="w-full">
      {/* Console framing label */}
      <div className="flex items-center gap-2.5 mb-3 px-0.5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(0,217,255,0.18)]" />
        <span className="text-[8px] font-mono tracking-[0.3em] text-[rgba(0,217,255,0.42)]">
          {t.hero.modulesLabel}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(0,217,255,0.18)]" />
      </div>

      {/* 2 × 3 grid — reading order matches command priority */}
      <div className="grid grid-cols-2 gap-2">
        {COMMAND_MODULES.map((mod) => {
          const isActive = activeModule === mod.id;
          const isSoon = !!mod.comingSoon;
          const rgb = hexToRgb(mod.accentColor);
          const copy = t.modules[mod.id as keyof typeof t.modules];

          return (
            <motion.button
              key={mod.id}
              type="button"
              onClick={() => onSelect(mod)}
              aria-label={
                isSoon
                  ? `${copy.previewTitle} — ${t.hero.soonAria}`
                  : `${copy.previewTitle}: ${copy.previewDescription}`
              }
              aria-disabled={isSoon || undefined}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              className="group relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left outline-none ie-focus"
              style={{
                minHeight: "50px",
                background: isActive
                  ? `linear-gradient(135deg, rgba(${rgb},0.16) 0%, rgba(16,18,38,0.92) 100%)`
                  : "rgba(18,20,40,0.82)",
                border: `1px solid ${
                  isActive
                    ? mod.accentColor + "66"
                    : isSoon
                      ? "rgba(150,165,205,0.12)"
                      : "rgba(150,165,205,0.16)"
                }`,
                boxShadow: isActive
                  ? `0 0 22px ${mod.accentGlow}, inset 0 1px 0 rgba(255,255,255,0.07)`
                  : "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 6px rgba(0,0,0,0.26)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                opacity: isSoon && !isActive ? 0.88 : 1,
                transition: "background 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
              }}
            >
              {/* Endpoint "port" dot — echoes the desktop connector docking dots */}
              <span
                className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full"
                style={{
                  background: isActive
                    ? mod.accentColor
                    : "rgba(0,217,255,0.45)",
                  boxShadow: isActive
                    ? `0 0 8px ${mod.accentGlow}`
                    : "0 0 0 2px rgba(0,217,255,0.07)",
                  transition: "all 300ms ease",
                }}
              />

              {/* Icon chip */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: isActive
                    ? `rgba(${rgb},0.16)`
                    : "rgba(140,155,200,0.06)",
                  border: `1px solid ${
                    isActive ? mod.accentColor + "55" : "rgba(140,155,200,0.1)"
                  }`,
                  transition: "all 300ms ease",
                }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isActive ? mod.accentColor : "rgba(195,205,230,0.72)"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: "stroke 300ms ease" }}
                >
                  <path d={mod.icon} />
                </svg>
              </div>

              {/* Label column — Arabic shows ONE clean phrase (no stacked
                  sub-label); the SOON badge is preserved in both languages. */}
              <div className="flex flex-col min-w-0">
                <span
                  className={
                    isAr
                      ? "text-[13px] font-mono leading-tight"
                      : "text-[11px] font-mono tracking-[0.16em] leading-none"
                  }
                  style={{
                    color: isActive
                      ? mod.accentColor
                      : "rgba(222,230,244,0.92)",
                    transition: "color 300ms ease",
                  }}
                >
                  {copy.label}
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {!isAr && (
                    <span
                      className="text-[8px] font-mono tracking-[0.2em] leading-none"
                      style={{
                        color: isActive
                          ? mod.accentColor + "aa"
                          : "rgba(170,180,207,0.55)",
                        transition: "color 300ms ease",
                      }}
                    >
                      {copy.subtitle}
                    </span>
                  )}
                  {isSoon && (
                    <span
                      className="text-[7px] font-mono tracking-[0.16em] leading-none px-1 py-0.5 rounded-[3px]"
                      style={{
                        color: "rgba(231,247,255,0.62)",
                        background: "rgba(231,247,255,0.06)",
                        border: "1px solid rgba(231,247,255,0.14)",
                      }}
                    >
                      {t.hero.soon}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
