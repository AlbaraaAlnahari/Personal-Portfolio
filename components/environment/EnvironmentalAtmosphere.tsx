"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EnvironmentalAtmosphereProps {
  children: ReactNode;
  intensity?: "subtle" | "medium";
  variant?: "hero" | "section" | "full";
}

/**
 * Environmental Atmosphere Component
 * Creates a living, breathing workspace atmosphere
 * Subtle ambient effects that make the environment feel alive
 */
export function EnvironmentalAtmosphere({
  children,
  intensity = "subtle",
  variant = "hero",
}: EnvironmentalAtmosphereProps) {
  const intensityMap = {
    subtle: {
      particleOpacity: 0.12,
      glowOpacity: 0.08,
      edgeLightOpacity: 0.1,
      motionScale: 1,
    },
    medium: {
      particleOpacity: 0.2,
      glowOpacity: 0.15,
      edgeLightOpacity: 0.15,
      motionScale: 1.2,
    },
  };

  const settings = intensityMap[intensity];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Multi-layer atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1: Breathing ambient glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at 50% 30%,
                rgba(0, 217, 255, 0.05) 0%,
                transparent 60%
              ),
              radial-gradient(
                ellipse at 80% 70%,
                rgba(181, 55, 242, 0.05) 0%,
                transparent 60%
              )
            `,
          }}
          animate={{
            opacity: [settings.glowOpacity * 0.7, settings.glowOpacity, settings.glowOpacity * 0.7],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Layer 2: Edge lighting (cinematic) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                90deg,
                rgba(0, 217, 255, ${settings.edgeLightOpacity}) 0%,
                transparent 15%,
                transparent 85%,
                rgba(181, 55, 242, ${settings.edgeLightOpacity * 0.7}) 100%
              )
            `,
          }}
        />

        {/* Layer 3: Ambient neural particles (intelligent floating) */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 1.5 + (i % 3) * 1.2,
              height: 1.5 + (i % 3) * 1.2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ["#00d9ff", "#00ff9f", "#b537f2"][i % 3],
              opacity: settings.particleOpacity,
              boxShadow: `0 0 ${6 + i * 0.5}px ${
                ["rgba(0, 217, 255, 0.5)", "rgba(0, 255, 159, 0.5)", "rgba(181, 55, 242, 0.5)"][
                  i % 3
                ]
              }`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 80 * settings.motionScale, 0],
              x: [0, (Math.random() - 0.5) * 80 * settings.motionScale, 0],
              opacity: [
                settings.particleOpacity * 0.3,
                settings.particleOpacity,
                settings.particleOpacity * 0.3,
              ],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Layer 4: Subtle diagonal accent lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="diagonals" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <line x1="0" y1="100" x2="100" y2="0" stroke="#00d9ff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonals)" />
          </svg>
        </div>

        {/* Layer 5: Breathing depth vignette */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at 50% 50%,
                transparent 0%,
                rgba(0, 0, 0, 0.15) 100%
              )
            `,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Layer 6: Soft neural network connections */}
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
          style={{
            filter: "blur(0.5px)",
          }}
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d9ff" />
              <stop offset="50%" stopColor="#b537f2" />
              <stop offset="100%" stopColor="#00ff9f" />
            </linearGradient>
          </defs>

          {/* Subtle neural connections */}
          {[...Array(8)].map((_, i) => {
            const x1 = (i * 150) % 1200;
            const y1 = (i * 100) % 800;
            const x2 = ((i + 1) * 150) % 1200;
            const y2 = ((i + 1) * 100) % 800;

            return (
              <motion.line
                key={`neural-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#neuralGrad)"
                strokeWidth="0.3"
                opacity="0.3"
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            );
          })}
        </motion.svg>
      </div>

      {/* Content layer */}
      <div className="relative z-10 w-full">{children}</div>

      {/* Cinematic corner accents (very subtle) */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-[0.05]">
        <div
          className="w-full h-full"
          style={{
            background: "radial-gradient(circle, #00d9ff 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none opacity-[0.05]">
        <div
          className="w-full h-full"
          style={{
            background: "radial-gradient(circle, #b537f2 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
