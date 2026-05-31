"use client";

import { motion } from "framer-motion";
import type { CommandModule } from "./CommandModuleData";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// =====================================================
// COMMAND MODULE CARD — premium graphite interface unit
// Used on desktop floating around the reactor
// =====================================================
interface CommandModuleCardProps {
  module: CommandModule;
  isSelected: boolean;
  isAnySelected: boolean;
  reducedMotion: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
  onNavigate?: (id: string) => void;
  style?: React.CSSProperties;
}

export default function CommandModuleCard({
  module,
  isSelected,
  isAnySelected,
  reducedMotion,
  onActivate,
  onDeactivate,
  onNavigate,
  style,
}: CommandModuleCardProps) {
  const { t, isAr } = useLanguage();
  const copy = t.modules[module.id as keyof typeof t.modules];
  const dimmed = isAnySelected && !isSelected;

  return (
    <motion.button
      className="group absolute flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer select-none outline-none ie-focus"
      data-connector-card={module.id}
      style={{
        ...style,
        background: isSelected
          ? `linear-gradient(135deg, rgba(${hexToRgb(module.accentColor)},0.18) 0%, rgba(18,20,42,0.94) 100%)`
          : "rgba(20,22,42,0.88)",
        border: `1px solid ${
          isSelected
            ? module.accentColor + "75"
            : dimmed
              ? "rgba(150,165,205,0.16)"
              : "rgba(150,165,205,0.28)"
        }`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: isSelected
          ? `0 0 26px ${module.accentGlow}, inset 0 1px 0 rgba(255,255,255,0.08)`
          : "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 10px rgba(0,0,0,0.35)",
        opacity: dimmed ? 0.7 : 1,
        zIndex: isSelected ? 20 : 10,
        transition: "all 350ms cubic-bezier(0.4,0,0.2,1)",
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => onActivate(module.id)}
      onMouseLeave={() => onDeactivate()}
      onClick={() => onNavigate?.(module.id)}
      onFocus={() => onActivate(module.id)}
      onBlur={() => onDeactivate()}
      aria-label={`${copy.previewTitle}: ${copy.previewDescription}`}
      initial={false}
      animate={{
        scale: isSelected ? 1.06 : dimmed ? 0.97 : 1,
        // Selected module advances slightly toward center
        x: isSelected ? 0 : 0,
      }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
    >
      {/* Icon container */}
      <div
        className="relative w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0"
        style={{
          background: isSelected
            ? `rgba(${hexToRgb(module.accentColor)},0.18)`
            : "rgba(140,155,200,0.06)",
          border: `1px solid ${
            isSelected
              ? module.accentColor + "45"
              : "rgba(140,155,200,0.1)"
          }`,
          transition: "all 300ms ease",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isSelected ? module.accentColor : "rgba(195,205,230,0.78)"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke 300ms ease" }}
        >
          <path d={module.icon} />
        </svg>

        {/* Active pulse indicator */}
        {isSelected && (
          <motion.div
            className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: module.accentColor,
              boxShadow: `0 0 6px ${module.accentGlow}`,
            }}
            animate={reducedMotion ? {} : { scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Label column — in Arabic each pill shows ONE clean phrase (no stacked
          sub-label); English keeps the label + sub-label pairing. */}
      <div className="flex flex-col items-start min-w-0">
        <span
          className={
            isAr
              ? "text-[12px] font-mono leading-tight"
              : "text-[10px] font-mono tracking-[0.18em] leading-none"
          }
          style={{
            color: isSelected
              ? module.accentColor
              : dimmed
                ? "rgba(200,210,230,0.55)"
                : "rgba(215,225,240,0.88)",
            transition: "color 300ms ease",
          }}
        >
          {copy.label}
        </span>
        {!isAr && (
          <span
            className="text-[8px] font-mono tracking-[0.15em] leading-none mt-0.5"
            style={{
              color: isSelected
                ? module.accentColor + "90"
                : dimmed
                  ? "rgba(170,180,207,0.42)"
                  : "rgba(180,190,217,0.6)",
              transition: "color 300ms ease",
            }}
          >
            {copy.subtitle}
          </span>
        )}
      </div>
    </motion.button>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
