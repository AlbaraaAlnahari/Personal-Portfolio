/**
 * FRAMER MOTION ANIMATION VARIANTS
 * Reusable animation patterns for consistent motion across the site
 */

import { Variants } from "framer-motion";

/* ============================================
   FADE ANIMATIONS
   ============================================ */

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 },
  },
};

export const fadeInDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* ============================================
   SCALE ANIMATIONS
   ============================================ */

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const scaleInCenterVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

/* ============================================
   GLOW & HOVER ANIMATIONS
   ============================================ */

export const glowVariants: Variants = {
  rest: {
    boxShadow: "0 0 20px rgba(0, 217, 255, 0.3)",
  },
  hover: {
    boxShadow: "0 0 40px rgba(0, 217, 255, 0.6)",
    transition: {
      duration: 0.3,
    },
  },
};

export const neonGlowVariants: Variants = {
  rest: {
    textShadow: "0 0 10px rgba(0, 217, 255, 0.3)",
  },
  hover: {
    textShadow: "0 0 20px rgba(0, 217, 255, 0.8)",
    transition: {
      duration: 0.3,
    },
  },
};

/* ============================================
   FLOAT ANIMATIONS
   ============================================ */

export const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const floatSlowVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

/* ============================================
   SHIMMER/PULSE ANIMATIONS
   ============================================ */

export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ["200% center", "-200% center"],
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const pulseVariants: Variants = {
  animate: {
    opacity: [1, 0.6, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const glowPulseVariants: Variants = {
  animate: {
    opacity: [1, 0.5, 1],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

/* ============================================
   STAGGER ANIMATIONS
   ============================================ */

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* ============================================
   ROTATE ANIMATIONS
   ============================================ */

export const rotateVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const rotateSlowVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

/* ============================================
   MODAL/OVERLAY ANIMATIONS
   ============================================ */

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

/* ============================================
   MENU/DROPDOWN ANIMATIONS
   ============================================ */

export const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    pointerEvents: "none",
  },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/* ============================================
   SLIDE ANIMATIONS
   ============================================ */

export const slideInLeftVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* ============================================
   PAGE TRANSITION ANIMATIONS
   ============================================ */

export const pageTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
    },
  },
};
