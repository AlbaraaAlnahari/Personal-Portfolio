"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EnhancedAICoreSphereProps {
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  interactive?: boolean;
  showDiagnostics?: boolean;
}

/**
 * Enhanced AI Core Sphere
 * A living neural intelligence engine representing Albaraa OS
 * Features: holographic layers, neural particles, subtle diagnostics, breathing energy
 */
export function EnhancedAICoreSphere({
  size = "md",
  glow = true,
  interactive = false,
  showDiagnostics = true,
}: EnhancedAICoreSphereProps) {
  const sizeMap = {
    sm: { container: 120, sphere: 80, particles: 60 },
    md: { container: 200, sphere: 140, particles: 120 },
    lg: { container: 300, sphere: 220, particles: 180 },
  };

  const { container, sphere, particles } = sizeMap[size];

  // Deterministic initial diagnostics for hydration stability
  const [diagnostics, setDiagnostics] = useState({
    neural: 85,
    coherence: 90,
    latency: 5,
  });

  // Randomized diagnostic values updated client-side only
  useEffect(() => {
    // Set different initial values after hydration
    setDiagnostics({
      neural: Math.floor(Math.random() * 20 + 80),
      coherence: Math.floor(Math.random() * 15 + 85),
      latency: Math.floor(Math.random() * 8 + 2),
    });

    const interval = setInterval(() => {
      setDiagnostics({
        neural: Math.floor(Math.random() * 20 + 80),
        coherence: Math.floor(Math.random() * 15 + 85),
        latency: Math.floor(Math.random() * 8 + 2),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Neural particle variants with deterministic motion - create per particle
  const createParticleVariants = (index: number) => ({
    animate: {
      y: [0, -25, 0],
      x: [0, ((index * 7919) % 10000) / 10000 * 20 - 10, 0],
      opacity: [0.2, 1, 0.2],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 4 + (((index + 1) * 7919) % 10000) / 10000 * 2,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  });

  // Breathing energy effect
  const breathingVariants = {
    animate: {
      scale: [1, 1.08, 1],
      opacity: [1, 0.9, 1],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  // Holographic layer rotation
  const holographicVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: container, height: container }}
      whileHover={interactive ? { scale: 1.12 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Outer Holographic Rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-accent-cyan/25"
        variants={breathingVariants}
        animate="animate"
        style={{ width: "100%", height: "100%" }}
      />

      <motion.div
        className="absolute inset-0 rounded-full border border-accent-green/15"
        style={{
          width: "85%",
          height: "85%",
          top: "7.5%",
          left: "7.5%",
        }}
        variants={holographicVariants}
        animate="animate"
      />

      {/* Holographic Interface Layer */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          width: "75%",
          height: "75%",
          top: "12.5%",
          left: "12.5%",
          background: `
            conic-gradient(
              from 0deg,
              rgba(0, 217, 255, 0.2) 0deg,
              rgba(181, 55, 242, 0.2) 90deg,
              rgba(0, 255, 159, 0.1) 180deg,
              rgba(0, 217, 255, 0.2) 270deg,
              rgba(0, 217, 255, 0.2) 360deg
            )
          `,
          borderRadius: "50%",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Core Sphere with Neural Gradient */}
      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: sphere,
          height: sphere,
          background: `
            radial-gradient(
              circle at 35% 35%,
              rgba(0, 217, 255, 0.9) 0%,
              rgba(0, 217, 255, 0.5) 20%,
              rgba(181, 55, 242, 0.7) 40%,
              rgba(0, 255, 159, 0.3) 65%,
              rgba(255, 0, 110, 0.1) 100%
            )
          `,
          boxShadow: glow
            ? `
              0 0 50px rgba(0, 217, 255, 0.7),
              0 0 100px rgba(181, 55, 242, 0.5),
              inset 0 0 50px rgba(0, 217, 255, 0.4),
              inset 0 0 100px rgba(181, 55, 242, 0.2)
            `
            : "none",
        }}
        variants={breathingVariants}
        animate="animate"
      />

      {/* Inner Neural Core - Breathing Point */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: sphere * 0.25,
          height: sphere * 0.25,
          background: "radial-gradient(circle, #00d9ff 0%, rgba(0, 217, 255, 0.5) 50%, transparent 100%)",
          boxShadow: "0 0 40px rgba(0, 217, 255, 1), inset 0 0 20px rgba(0, 217, 255, 0.8)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Neural Particle Nodes - Intelligent Motion */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const distance = particles / 2;
        const startX = Math.cos(angle) * distance;
        const startY = Math.sin(angle) * distance;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 5 + i * 0.8,
              height: 5 + i * 0.8,
              background: `radial-gradient(circle,
                ${i % 3 === 0 ? "#00d9ff" : i % 3 === 1 ? "#00ff9f" : "#b537f2"} 0%,
                transparent 70%)`,
              boxShadow: `0 0 ${15 + i * 2}px ${
                i % 3 === 0
                  ? "rgba(0, 217, 255, 0.8)"
                  : i % 3 === 1
                    ? "rgba(0, 255, 159, 0.8)"
                    : "rgba(181, 55, 242, 0.8)"
              }`,
              top: `${startY + particles / 2}px`,
              left: `${startX + particles / 2}px`,
            }}
            variants={createParticleVariants(i)}
            animate="animate"
          />
        );
      })}

      {/* Subtle Connecting Neural Lines */}
      <motion.svg
        className="absolute"
        style={{
          width: particles,
          height: particles,
          top: (container - particles) / 2,
          left: (container - particles) / 2,
        }}
        viewBox="0 0 100 100"
        opacity={0.4}
      >
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="50%" stopColor="#b537f2" />
            <stop offset="100%" stopColor="#00ff9f" />
          </linearGradient>
        </defs>

        {/* Neural network connections */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 8;
          const nextAngle = ((i + 1) * Math.PI * 2) / 8;
          const x1 = 50 + Math.cos(angle) * 40;
          const y1 = 50 + Math.sin(angle) * 40;
          const x2 = 50 + Math.cos(nextAngle) * 40;
          const y2 = 50 + Math.sin(nextAngle) * 40;

          return (
            <motion.line
              key={`line-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#neuralGrad)"
              strokeWidth="0.4"
              opacity={0.5}
              animate={{
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2 + i * 0.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          );
        })}

        {/* Center circle */}
        <circle cx="50" cy="50" r="15" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.3" opacity="0.6" />
      </motion.svg>

      {/* Subtle Diagnostics Display (optional) */}
      {showDiagnostics && size !== "sm" && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-accent-cyan/70 font-mono space-y-0.5 text-center">
            <div>Neural: {diagnostics.neural}%</div>
            <div>Coherence: {diagnostics.coherence}%</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
