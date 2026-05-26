"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { COMMAND_MODULES, type CommandModule } from "./CommandModuleData";
import type { ReactorState } from "./IntelligenceEngineModel";

// =====================================================
// MOBILE MODULE DOCK — horizontal command console
// Thumb-friendly row of compact graphite chips
// =====================================================

interface MobileModuleDockProps {
  activeModule: ReactorState | null;
  onSelect: (id: ReactorState) => void;
  onDeselect: () => void;
  reducedMotion: boolean;
}

export default function MobileModuleDock({
  activeModule,
  onSelect,
  onDeselect,
  reducedMotion,
}: MobileModuleDockProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTap = (mod: CommandModule) => {
    if (activeModule === mod.id) {
      onDeselect();
    } else {
      onSelect(mod.id as ReactorState);
    }
  };

  return (
    <div className="w-full">
      {/* Scrollable dock container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 py-2 no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {COMMAND_MODULES.map((mod) => {
          const isActive = activeModule === mod.id;

          return (
            <motion.button
              key={mod.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg flex-shrink-0 cursor-pointer select-none"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, rgba(${hexToRgb(mod.accentColor)},0.12), rgba(14,16,32,0.9))`
                  : "rgba(14,16,32,0.8)",
                border: `1px solid ${
                  isActive ? mod.accentColor + "50" : "rgba(255,255,255,0.07)"
                }`,
                boxShadow: isActive
                  ? `0 0 14px ${mod.accentGlow}`
                  : "none",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition: "all 250ms ease",
              }}
              onClick={() => handleTap(mod)}
              aria-label={`${mod.previewTitle}: ${mod.previewDescription}`}
              aria-pressed={isActive}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
            >
              {/* Icon */}
              <div
                className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                style={{
                  background: isActive
                    ? `rgba(${hexToRgb(mod.accentColor)},0.12)`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${
                    isActive ? mod.accentColor + "30" : "rgba(255,255,255,0.04)"
                  }`,
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={
                    isActive ? mod.accentColor : "rgba(160,165,197,0.5)"
                  }
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={mod.icon} />
                </svg>
              </div>

              {/* Label */}
              <span
                className="text-[10px] font-mono tracking-[0.12em] whitespace-nowrap"
                style={{
                  color: isActive ? mod.accentColor : "rgba(200,205,220,0.6)",
                  transition: "color 250ms ease",
                }}
              >
                {mod.label}
              </span>

              {/* Active dot */}
              {isActive && (
                <div
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: mod.accentColor,
                    boxShadow: `0 0 4px ${mod.accentGlow}`,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
