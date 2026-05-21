"use client";

import { motion } from "framer-motion";
import { rotateSlowVariants, pulseVariants } from "@/lib/motion/variants";

interface AICoreSphereProps {
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  interactive?: boolean;
}

/**
 * AI Core Visual Component
 * Represents the intelligent core of the portfolio
 * Features: holographic sphere, neural particles, and futuristic aesthetics
 */
export function AICoreSphere({
  size = "md",
  glow = true,
  interactive = false,
}: AICoreSphereProps) {
  const sizeMap = {
    sm: { container: 120, sphere: 80, particles: 60 },
    md: { container: 200, sphere: 140, particles: 120 },
    lg: { container: 300, sphere: 220, particles: 180 },
  };

  const { container, sphere, particles } = sizeMap[size];

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: container, height: container }}
      whileHover={interactive ? { scale: 1.1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-accent-cyan/30"
        variants={pulseVariants}
        animate="animate"
        style={{ width: "100%", height: "100%" }}
      />

      <motion.div
        className="absolute inset-0 rounded-full border border-accent-purple/20"
        style={{
          width: "85%",
          height: "85%",
          top: "7.5%",
          left: "7.5%",
        }}
        variants={rotateSlowVariants}
        animate="animate"
      />

      {/* Core sphere with gradient */}
      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: sphere,
          height: sphere,
          background: `
            radial-gradient(
              circle at 30% 30%,
              rgba(0, 217, 255, 0.8) 0%,
              rgba(0, 217, 255, 0.4) 25%,
              rgba(181, 55, 242, 0.6) 50%,
              rgba(181, 55, 242, 0.2) 75%,
              rgba(255, 0, 110, 0.1) 100%
            )
          `,
          boxShadow: glow
            ? `
              0 0 40px rgba(0, 217, 255, 0.6),
              0 0 80px rgba(181, 55, 242, 0.4),
              inset 0 0 40px rgba(0, 217, 255, 0.3)
            `
            : "none",
        }}
        variants={pulseVariants}
        animate="animate"
      />

      {/* Inner core point */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: sphere * 0.3,
          height: sphere * 0.3,
          background: "radial-gradient(circle, #00d9ff 0%, transparent 70%)",
          boxShadow: "0 0 30px rgba(0, 217, 255, 0.8)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + i * 1.5,
            height: 4 + i * 1.5,
            background: `radial-gradient(circle,
              ${i % 2 === 0 ? "#00d9ff" : "#00ff9f"} 0%,
              transparent 70%)`,
            boxShadow: `0 0 ${10 + i * 3}px ${
              i % 2 === 0 ? "rgba(0, 217, 255, 0.6)" : "rgba(0, 255, 159, 0.6)"
            }`,
            top: `${Math.sin((i * Math.PI * 2) / 6) * (particles / 2) + particles / 2}px`,
            left: `${Math.cos((i * Math.PI * 2) / 6) * (particles / 2) + particles / 2}px`,
          }}
          variants={particleVariants}
          animate="animate"
        />
      ))}

      {/* Rotating rings (performance-optimized) */}
      <motion.svg
        className="absolute"
        style={{
          width: particles,
          height: particles,
          top: (container - particles) / 2,
          left: (container - particles) / 2,
        }}
        viewBox="0 0 100 100"
        variants={rotateSlowVariants}
        animate="animate"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="100%" stopColor="#b537f2" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}
