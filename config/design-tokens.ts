/**
 * ALBARAA OS — Design Tokens
 *
 * Centralized design system with all color, spacing, typography,
 * and animation constants. Single source of truth for visual identity.
 */

/* ============================================
   COLOR PALETTE
   ============================================ */

export const colors = {
  // Core backgrounds
  background: {
    primary: "#0a0e27",
    secondary: "#0f1229",
    tertiary: "#151a3a",
  },

  // Primary text
  foreground: {
    primary: "#e8e9f3",
    secondary: "#a0a5c5",
    tertiary: "#7a80a0",
  },

  // Accent colors - neon/holographic
  accent: {
    cyan: "#00d9ff",
    green: "#00ff9f",
    pink: "#ff006e",
    purple: "#b537f2",
  },

  // Status colors
  status: {
    success: "#00ff9f",
    warning: "#ffa500",
    error: "#ff006e",
    info: "#00d9ff",
  },

  // Glass morphism
  glass: {
    light: "rgba(255, 255, 255, 0.1)",
    lighter: "rgba(255, 255, 255, 0.15)",
    lightest: "rgba(255, 255, 255, 0.2)",
  },

  // Borders
  border: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.2)",
    dark: "rgba(0, 0, 0, 0.3)",
  },
};

/* ============================================
   SPACING SCALE
   ============================================ */

export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
};

/* ============================================
   BORDER RADIUS
   ============================================ */

export const borderRadius = {
  none: "0",
  sm: "0.375rem",
  base: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  glass: "1.5rem",
  full: "9999px",
};

/* ============================================
   TYPOGRAPHY
   ============================================ */

export const typography = {
  fontFamily: {
    sans: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
    ].join(","),
    mono: [
      '"SF Mono"',
      "Monaco",
      '"Cascadia Code"',
      '"Roboto Mono"',
      "Consolas",
      '"Courier New"',
      "monospace",
    ].join(","),
  },

  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1" }],
    "6xl": ["3.75rem", { lineHeight: "1" }],
    "7xl": ["4.5rem", { lineHeight: "1" }],
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

/* ============================================
   SHADOWS & GLOWS
   ============================================ */

export const shadows = {
  // Glassmorphism shadows
  glassSmall: "0 4px 30px rgba(0, 217, 255, 0.1)",
  glassMedium: "0 8px 32px rgba(0, 217, 255, 0.15)",
  glassLarge: "0 12px 48px rgba(0, 217, 255, 0.2)",

  // Neon glows
  neonCyan: "0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)",
  neonGreen:
    "0 0 20px rgba(0, 255, 159, 0.5), 0 0 40px rgba(0, 255, 159, 0.3)",
  neonPink: "0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(255, 0, 110, 0.3)",
  neonPurple:
    "0 0 20px rgba(181, 55, 242, 0.5), 0 0 40px rgba(181, 55, 242, 0.3)",

  // Elevation layers
  elevation1: "0 1px 2px rgba(0, 0, 0, 0.3)",
  elevation2: "0 4px 8px rgba(0, 0, 0, 0.4)",
  elevation3: "0 8px 16px rgba(0, 0, 0, 0.5)",

  // Deep shadows
  lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
};

/* ============================================
   TRANSITIONS & ANIMATIONS
   ============================================ */

export const motion = {
  // Duration presets
  durations: {
    instant: 0,
    fast: 150,
    base: 300,
    slow: 500,
    slower: 800,
    slowest: 1200,
  },

  // Easing functions
  easings: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeInOutSmooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOutSmooth: "cubic-bezier(0, 0, 0.2, 1)",
  },

  // Transition presets
  transitions: {
    fast: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
    smooth: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
};

/* ============================================
   Z-INDEX SCALE
   ============================================ */

export const zIndex = {
  auto: "auto",
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
  top: 9999,
};

/* ============================================
   BREAKPOINTS
   ============================================ */

export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/* ============================================
   GRID & LAYOUT
   ============================================ */

export const layout = {
  maxWidth: "1440px",
  containerPadding: {
    mobile: "1rem",
    tablet: "2rem",
    desktop: "3rem",
  },
  gutterSize: {
    mobile: "1rem",
    tablet: "1.5rem",
    desktop: "2rem",
  },
};
