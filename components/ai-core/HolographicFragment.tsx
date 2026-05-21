"use client";

import { motion } from "framer-motion";

interface HolographicFragmentProps {
  position: { top?: string; bottom?: string; left?: string; right?: string };
  width?: number;
  height?: number;
  color?: "cyan" | "green" | "pink" | "purple";
  opacity?: number;
  animated?: boolean;
  delay?: number;
}

const colorMap = {
  cyan: {
    from: "rgba(0, 217, 255, 0.3)",
    to: "rgba(0, 217, 255, 0.05)",
    glow: "rgba(0, 217, 255, 0.2)",
  },
  green: {
    from: "rgba(0, 255, 159, 0.3)",
    to: "rgba(0, 255, 159, 0.05)",
    glow: "rgba(0, 255, 159, 0.2)",
  },
  pink: {
    from: "rgba(255, 0, 110, 0.3)",
    to: "rgba(255, 0, 110, 0.05)",
    glow: "rgba(255, 0, 110, 0.2)",
  },
  purple: {
    from: "rgba(181, 55, 242, 0.3)",
    to: "rgba(181, 55, 242, 0.05)",
    glow: "rgba(181, 55, 242, 0.2)",
  },
};

/**
 * Holographic Fragment Component
 * Subtle holographic UI elements floating in the environment
 */
export function HolographicFragment({
  position,
  width = 100,
  height = 100,
  color = "cyan",
  opacity = 0.3,
  animated = true,
  delay = 0,
}: HolographicFragmentProps) {
  const colors = colorMap[color];

  const fragmentVariants = {
    animate: {
      opacity: [opacity * 0.5, opacity, opacity * 0.5],
      scale: [0.95, 1.05, 0.95],
      rotate: [0, 5, 0],
      transition: {
        duration: 6 + Math.random() * 4,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      },
    },
  };

  return (
    <motion.div
      className="absolute rounded-lg border border-opacity-30 pointer-events-none"
      style={{
        ...position,
        width,
        height,
        background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
        border: `1px solid ${colors.glow}`,
        boxShadow: `0 0 20px ${colors.glow}, inset 0 0 20px ${colors.glow}`,
        backdropFilter: "blur(8px)",
      }}
      variants={animated ? fragmentVariants : {}}
      animate={animated ? "animate" : {}}
    />
  );
}
