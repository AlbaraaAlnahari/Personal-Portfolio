"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { CommandModule } from "./CommandModuleData";

// =====================================================
// MODULE PREVIEW PANEL — compact glass/graphite card
// Shows when a module is selected
// =====================================================

interface ModulePreviewPanelProps {
  module: CommandModule | null;
  reducedMotion: boolean;
  /** 'desktop' = positioned near reactor. 'mobile' = below dock */
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}

export default function ModulePreviewPanel({
  module,
  reducedMotion,
  variant,
  onNavigate,
}: ModulePreviewPanelProps) {
  const isDesktop = variant === "desktop";

  return (
    <AnimatePresence mode="wait">
      {module && (
        <motion.div
          key={module.id}
          className={`${
            isDesktop
              ? "relative w-full max-w-[320px]"
              : "w-full max-w-sm mx-auto"
          } rounded-xl overflow-hidden`}
          style={{
            background: "rgba(12,14,30,0.88)",
            border: `1px solid ${module.accentColor}30`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 12px ${module.accentGlow}`,
            zIndex: 25,
          }}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.25, ease: "easeOut" }}
        >
          {/* Accent top border line */}
          <div
            className="h-[1.5px] w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${module.accentColor}80, transparent)`,
            }}
          />

          <div className="p-4">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `rgba(${hexToRgb(module.accentColor)},0.1)`,
                  border: `1px solid ${module.accentColor}30`,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={module.accentColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={module.icon} />
                </svg>
              </div>
              <div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "#e8e9f3" }}
                >
                  {module.previewTitle}
                </div>
                <div
                  className="text-[9px] font-mono tracking-[0.2em]"
                  style={{ color: module.accentColor + "90" }}
                >
                  {module.label} / {module.subtitle}
                </div>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-xs leading-relaxed mb-3"
              style={{ color: "rgba(160,165,197,0.7)" }}
            >
              {module.previewDescription}
            </p>

            {/* Action hint / navigation button */}
            {onNavigate ? (
              <button
                onClick={onNavigate}
                className="flex items-center gap-1.5 cursor-pointer group/action"
                style={{ background: "none", border: "none", padding: 0 }}
                aria-label={`Navigate to ${module.previewTitle} section`}
              >
                <div
                  className="w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: module.accentColor,
                    boxShadow: `0 0 4px ${module.accentGlow}`,
                  }}
                />
                <span
                  className="text-[10px] font-mono tracking-[0.15em]"
                  style={{
                    color: module.accentColor + "80",
                    transition: "color 200ms ease",
                  }}
                >
                  {module.previewAction.toUpperCase()} →
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: module.accentColor,
                    boxShadow: `0 0 4px ${module.accentGlow}`,
                  }}
                />
                <span
                  className="text-[10px] font-mono tracking-[0.15em]"
                  style={{ color: module.accentColor + "80" }}
                >
                  {module.previewAction.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
