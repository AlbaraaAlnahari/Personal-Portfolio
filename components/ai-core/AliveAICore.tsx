"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AliveAICoreProps {
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  showMetrics?: boolean;
}

/**
 * Alive AI Core Component
 * The emotional heart of Albaraa OS
 * Represents: intelligence, creativity, engineering, AI focus
 * Feels: alive, breathing, intelligent, meaningful
 */
export function AliveAICore({
  size = "md",
  interactive = true,
  showMetrics = false,
}: AliveAICoreProps) {
  const sizeMap = {
    sm: { container: 140, sphere: 90, particles: 70 },
    md: { container: 240, sphere: 160, particles: 140 },
    lg: { container: 340, sphere: 240, particles: 200 },
  };

  const { container, sphere, particles } = sizeMap[size];

  const [metrics, setMetrics] = useState({ projects: 4, systems: 85 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        projects: Math.floor(Math.random() * 20 + 75),
        systems: Math.floor(Math.random() * 15 + 85),
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Breathing animation - feels alive
  const breathingVariants = {
    animate: {
      scale: [1, 1.12, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  // Core pulse - heartbeat
  const heartbeatVariants = {
    animate: {
      scale: [1, 1.25, 1],
      opacity: [1, 0.6, 1],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  // Intelligent orbital motion
  const orbitalVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  // Neural particles with intelligent behavior
  const neuralParticleVariants = {
    animate: (index: number) => ({
      y: [0, -30 + (index % 4) * 15, 0],
      x: [0, Math.sin((index * Math.PI) / 4) * 25, 0],
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.3, 0.8],
      transition: {
        duration: 5 + (index % 3) * 0.5,
        ease: "easeInOut",
        repeat: Infinity,
        delay: (index * 0.2) % 2,
      },
    }),
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: container, height: container }}
      whileHover={interactive ? { scale: 1.15 } : {}}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
    >
      {/* Outer Holographic Rings - represents neural tiers */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{
          borderColor: "rgba(0, 217, 255, 0.3)",
          width: "100%",
          height: "100%",
        }}
        variants={breathingVariants}
        animate="animate"
      />

      {/* Secondary ring - rotating */}
      <motion.div
        className="absolute inset-0 rounded-full border border-accent-purple/20"
        style={{
          width: "85%",
          height: "85%",
          top: "7.5%",
          left: "7.5%",
        }}
        variants={orbitalVariants}
        animate="animate"
      />

      {/* Tertiary ring - counter-rotating */}
      <motion.div
        className="absolute inset-0 rounded-full border border-accent-green/15"
        style={{
          width: "70%",
          height: "70%",
          top: "15%",
          left: "15%",
        }}
        animate={{
          rotate: [-360, 0],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Holographic interface layer - conic gradient */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
          background: `
            conic-gradient(
              from 0deg,
              rgba(0, 217, 255, 0.15) 0deg,
              rgba(181, 55, 242, 0.15) 90deg,
              rgba(0, 255, 159, 0.1) 180deg,
              rgba(0, 217, 255, 0.15) 270deg,
              rgba(0, 217, 255, 0.15) 360deg
            )
          `,
          opacity: 0.4,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Core Sphere - with sophisticated gradient */}
      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: sphere,
          height: sphere,
          background: `
            radial-gradient(
              circle at 40% 35%,
              rgba(0, 217, 255, 0.95) 0%,
              rgba(0, 217, 255, 0.6) 25%,
              rgba(181, 55, 242, 0.8) 45%,
              rgba(0, 255, 159, 0.3) 70%,
              rgba(255, 0, 110, 0.1) 100%
            )
          `,
          boxShadow: `
            0 0 60px rgba(0, 217, 255, 0.8),
            0 0 120px rgba(181, 55, 242, 0.6),
            inset 0 0 60px rgba(0, 217, 255, 0.5),
            inset 0 0 120px rgba(181, 55, 242, 0.2)
          `,
        }}
        variants={breathingVariants}
        animate="animate"
      />

      {/* Inner Bright Core - the heartbeat */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: sphere * 0.3,
          height: sphere * 0.3,
          background: "radial-gradient(circle, #00d9ff 0%, rgba(0, 217, 255, 0.4) 50%, transparent 100%)",
          boxShadow: "0 0 50px rgba(0, 217, 255, 1), inset 0 0 30px rgba(0, 217, 255, 0.9)",
        }}
        variants={heartbeatVariants}
        animate="animate"
      />

      {/* Neural Particle Nodes - intelligent behavior */}
      {[...Array(10)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 10;
        const distance = particles / 2;
        const startX = Math.cos(angle) * distance;
        const startY = Math.sin(angle) * distance;

        const colors = ["#00d9ff", "#00ff9f", "#b537f2"];
        const color = colors[i % 3];

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + i * 0.7,
              height: 4 + i * 0.7,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              boxShadow: `0 0 ${18 + i * 1.5}px ${color.replace(")", ", 0.8)").replace("rgb", "rgba")}`,
              top: `${startY + particles / 2}px`,
              left: `${startX + particles / 2}px`,
            }}
            custom={i}
            variants={neuralParticleVariants}
            animate="animate"
          />
        );
      })}

      {/* Neural Connection SVG - animated lines */}
      <motion.svg
        className="absolute"
        style={{
          width: particles * 1.1,
          height: particles * 1.1,
          top: (container - particles * 1.1) / 2,
          left: (container - particles * 1.1) / 2,
          opacity: 0.45,
        }}
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="neuralConnectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="50%" stopColor="#b537f2" />
            <stop offset="100%" stopColor="#00ff9f" />
          </linearGradient>
        </defs>

        {/* Intelligent neural paths */}
        {[...Array(10)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 10;
          const nextAngle = ((i + 1) * Math.PI * 2) / 10;
          const x1 = 50 + Math.cos(angle) * 45;
          const y1 = 50 + Math.sin(angle) * 45;
          const x2 = 50 + Math.cos(nextAngle) * 45;
          const y2 = 50 + Math.sin(nextAngle) * 45;

          return (
            <motion.line
              key={`conn-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#neuralConnectGrad)"
              strokeWidth="0.5"
              animate={{
                opacity: [0.25, 0.7, 0.25],
                strokeWidth: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3 + (i % 3) * 0.3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          );
        })}

        {/* Center connection point */}
        <circle cx="50" cy="50" r="12" fill="none" stroke="url(#neuralConnectGrad)" strokeWidth="0.5" opacity="0.5" />
      </motion.svg>

      {/* Subtle Metrics Display (optional) */}
      {showMetrics && size !== "sm" && (
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs text-accent-cyan/70 font-mono space-y-0.5">
            <div>Systems: {metrics.systems}%</div>
            <div>Projects: {metrics.projects}%</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
