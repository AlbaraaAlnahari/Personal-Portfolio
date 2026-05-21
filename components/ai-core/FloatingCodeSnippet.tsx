"use client";

import { motion } from "framer-motion";

interface FloatingCodeSnippetProps {
  code: string;
  position: { x: string; y: string };
  duration?: number;
  delay?: number;
  opacity?: number;
  size?: "sm" | "md";
}

/**
 * Floating Code Snippet Component
 * Subtle code elements floating in the AI workspace environment
 */
export function FloatingCodeSnippet({
  code,
  position,
  duration = 8,
  delay = 0,
  opacity = 0.15,
  size = "sm",
}: FloatingCodeSnippetProps) {
  const sizeClass = size === "sm" ? "text-xs" : "text-sm";

  return (
    <motion.div
      className={`absolute font-mono pointer-events-none ${sizeClass}`}
      style={{
        left: position.x,
        top: position.y,
        opacity,
      }}
      animate={{
        y: [-20, 20, -20],
        opacity: [opacity * 0.5, opacity, opacity * 0.5],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      <div className="text-accent-cyan/60 whitespace-pre-wrap break-words max-w-[150px]">
        {code}
      </div>
    </motion.div>
  );
}
