"use client";

import { motion } from "framer-motion";

interface EngineeringOverlayProps {
  intensity?: "subtle" | "medium";
}

export function EngineeringOverlay({ intensity = "subtle" }: EngineeringOverlayProps) {
  const baseOpacity = intensity === "subtle" ? 0.08 : 0.15;
  const gridSize = 60;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Calibration Grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        opacity={baseOpacity}
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Engineering Corner Markers */}
      <svg
        className="absolute top-0 left-0 w-20 h-20 pointer-events-none"
        viewBox="0 0 80 80"
        opacity={baseOpacity * 1.5}
      >
        <defs>
          <linearGradient id="cornerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 217, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(0, 217, 255, 0)" />
          </linearGradient>
        </defs>
        {/* Corner registration marks */}
        <line x1="0" y1="10" x2="15" y2="10" stroke="url(#cornerGradient)" strokeWidth="1" />
        <line x1="10" y1="0" x2="10" y2="15" stroke="url(#cornerGradient)" strokeWidth="1" />
        <circle cx="10" cy="10" r="3" fill="none" stroke="rgba(0, 217, 255, 0.3)" strokeWidth="0.5" />
      </svg>

      {/* Bottom-right corner */}
      <svg
        className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none"
        viewBox="0 0 80 80"
        opacity={baseOpacity * 1.5}
      >
        <defs>
          <linearGradient id="cornerGradient2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 159, 0.5)" />
            <stop offset="100%" stopColor="rgba(0, 255, 159, 0)" />
          </linearGradient>
        </defs>
        <line x1="80" y1="70" x2="65" y2="70" stroke="url(#cornerGradient2)" strokeWidth="1" />
        <line x1="70" y1="80" x2="70" y2="65" stroke="url(#cornerGradient2)" strokeWidth="1" />
        <circle cx="70" cy="70" r="3" fill="none" stroke="rgba(0, 255, 159, 0.3)" strokeWidth="0.5" />
      </svg>

      {/* Measurement dimension lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        opacity={baseOpacity * 0.8}
      >
        {/* Horizontal measurement line */}
        <line x1="10%" y1="15%" x2="90%" y2="15%" stroke="rgba(0, 217, 255, 0.3)" strokeWidth="0.5" strokeDasharray="3,3" />
        {/* Vertical measurement line */}
        <line x1="15%" y1="10%" x2="15%" y2="90%" stroke="rgba(181, 55, 242, 0.3)" strokeWidth="0.5" strokeDasharray="3,3" />
        {/* Diagonal accent */}
        <line x1="5%" y1="95%" x2="25%" y2="75%" stroke="rgba(0, 255, 159, 0.2)" strokeWidth="0.5" />
      </svg>

      {/* Subtle animated pulse effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [baseOpacity, baseOpacity * 1.5, baseOpacity],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle at 30% 40%, rgba(0, 217, 255, 0.05) 0%, transparent 40%)`,
          pointerEvents: "none",
        }}
      />

      {/* Schematic-style floating paths (very subtle) */}
      <svg
        className="absolute top-1/4 left-1/4 w-1/3 h-1/3 pointer-events-none"
        viewBox="0 0 200 200"
        opacity={baseOpacity * 0.6}
      >
        <path
          d="M 30 30 L 100 50 L 170 30 L 150 100 L 170 170 L 100 150 L 30 170 L 50 100 Z"
          fill="none"
          stroke="rgba(0, 217, 255, 0.2)"
          strokeWidth="0.5"
        />
      </svg>

      {/* System indicator boxes (minimal) */}
      <div className="absolute top-10 right-10 w-24 h-12 border border-cyan-500/10 rounded opacity-50 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-32 h-8 border border-green-500/10 rounded opacity-50 pointer-events-none" />
    </div>
  );
}
