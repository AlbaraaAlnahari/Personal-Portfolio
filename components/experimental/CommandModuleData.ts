"use client";

import type { ReactorState } from "./IntelligenceEngineModel";

// =====================================================
// MODULE DATA — Six Neural Command Modules
// Single source of truth for all module visual identities
// =====================================================

export interface CommandModule {
  id: ReactorState;
  label: string;
  subtitle: string;
  icon: string; // SVG path data
  accentColor: string;
  accentGlow: string;
  previewTitle: string;
  previewDescription: string;
  previewAction: string;
  /**
   * When true, the module is a visually-coherent placeholder: it responds to
   * the Intelligence Engine (accent / glow) but has no real destination yet,
   * so it must NOT navigate. Used for TERMINAL until a real command layer ships.
   */
  comingSoon?: boolean;
}

export const COMMAND_MODULES: CommandModule[] = [
  {
    id: "about",
    label: "ABOUT",
    subtitle: "IDENTITY",
    icon: "M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z",
    accentColor: "#22D9FF",
    accentGlow: "rgba(34,217,255,0.4)",
    previewTitle: "About",
    previewDescription: "Identity, focus areas and engineering profile.",
    previewAction: "Open identity module",
  },
  {
    id: "projects",
    label: "PROJECTS",
    subtitle: "SYSTEMS",
    icon: "M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z",
    accentColor: "#A855F7",
    accentGlow: "rgba(168,85,247,0.4)",
    previewTitle: "Projects",
    previewDescription: "Deployed AI and software systems built for real use.",
    previewAction: "Explore systems",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    subtitle: "TIMELINE",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    accentColor: "#F5B84B",
    accentGlow: "rgba(245,184,75,0.35)",
    previewTitle: "Experience",
    previewDescription: "Roles, milestones and applied engineering journey.",
    previewAction: "View timeline",
  },
  {
    id: "skills",
    label: "SKILLS",
    subtitle: "STACK",
    icon: "M4 6h16M4 10h16M4 14h10M4 18h6",
    accentColor: "#34D399",
    accentGlow: "rgba(52,211,153,0.4)",
    previewTitle: "Skills",
    previewDescription: "Tools, technologies and technical capabilities.",
    previewAction: "Inspect stack",
  },
  {
    id: "contact",
    label: "CONTACT",
    subtitle: "SIGNAL",
    icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    accentColor: "#EC6CFF",
    accentGlow: "rgba(236,108,255,0.35)",
    previewTitle: "Contact",
    previewDescription: "Start a conversation or establish a connection.",
    previewAction: "Send signal",
  },
  {
    id: "terminal",
    label: "TERMINAL",
    subtitle: "COMMAND",
    icon: "M4 17l6-5-6-5M12 19h8",
    accentColor: "#E7F7FF",
    accentGlow: "rgba(231,247,255,0.35)",
    previewTitle: "Terminal",
    previewDescription:
      "Interactive command layer for exploring the portfolio. Calibrating — online soon.",
    previewAction: "Coming online",
    comingSoon: true,
  },
];

// =====================================================
// DESKTOP MODULE POSITIONS — artful arrangement around reactor
// Positions are percentages relative to the reactor container
// =====================================================
export const DESKTOP_MODULE_POSITIONS: Record<
  string,
  { top: string; left: string }
> = {
  terminal: { top: "3%", left: "46%" },      // top center
  about: { top: "14%", left: "5%" },          // upper-left
  projects: { top: "12%", left: "84%" },      // upper-right
  experience: { top: "70%", left: "86%" },    // lower-right
  skills: { top: "73%", left: "3%" },         // lower-left
  contact: { top: "90%", left: "52%" },       // bottom center
};

// =====================================================
// MODULE ROUTE MAP — maps module ID → dedicated interior route.
// In the multi-page architecture the section chapters live inside the
// About/Work/Impact routes, so the Hero routes (not in-page scrolls) here.
// =====================================================
export const MODULE_SECTION_ANCHORS: Record<string, string> = {
  about: "/about",
  projects: "/work",
  experience: "/impact",
  skills: "/about#skills",
  contact: "/contact",
  // terminal: intentionally unmapped — it is a "coming online" placeholder
  // (no real command experience exists yet), so it must not navigate anywhere.
};

// =====================================================
// Utility — look up module accent color by reactor state
// =====================================================
export function getModuleAccentColor(state: ReactorState): string | null {
  const mod = COMMAND_MODULES.find((m) => m.id === state);
  return mod ? mod.accentColor : null;
}
