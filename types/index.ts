/**
 * Global Type Definitions
 */

/* ============================================
   UI COMPONENTS
   ============================================ */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "glass";
export type ButtonSize = "sm" | "md" | "lg";

export type GlassPanelVariant = "sm" | "md" | "lg";

export type AICoreSphereSize = "sm" | "md" | "lg";

/* ============================================
   DESIGN SYSTEM
   ============================================ */

export type ColorAccent = "cyan" | "green" | "pink" | "purple";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type AnimationDuration = "fast" | "base" | "slow" | "slower" | "slowest";

/* ============================================
   MOTION & ANIMATIONS
   ============================================ */

export interface MotionProps {
  initial?: string;
  animate?: string;
  exit?: string;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
}

/* ============================================
   PROJECT/PORTFOLIO DATA
   ============================================ */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: {
    start: Date;
    end?: Date;
  };
  description: string;
  technologies: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

/* ============================================
   METADATA & SEO
   ============================================ */

export interface PageMetadata {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}

/* ============================================
   API RESPONSES
   ============================================ */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/* ============================================
   ANIMATIONS/FRAMER MOTION
   ============================================ */

export interface TransitionConfig {
  duration: number;
  ease: string;
  delay?: number;
}
