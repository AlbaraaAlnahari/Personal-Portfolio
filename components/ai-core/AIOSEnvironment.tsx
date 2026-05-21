"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FloatingCodeSnippet } from "./FloatingCodeSnippet";
import { HolographicFragment } from "./HolographicFragment";

interface AIOSEnvironmentProps {
  children: ReactNode;
  intensity?: "subtle" | "medium" | "vivid";
}

/**
 * AIOS Environment Component
 * Creates a living AI workspace atmosphere around the core
 * Subtle ambient motion, particles, diagnostics, and holographic elements
 */
export function AIOSEnvironment({ children, intensity = "subtle" }: AIOSEnvironmentProps) {
  const intensityMap = {
    subtle: { particleOpacity: 0.15, fragmentOpacity: 0.2, codeOpacity: 0.1 },
    medium: { particleOpacity: 0.25, fragmentOpacity: 0.3, codeOpacity: 0.15 },
    vivid: { particleOpacity: 0.35, fragmentOpacity: 0.4, codeOpacity: 0.2 },
  };

  const settings = intensityMap[intensity];

  // Code snippets related to AI and software engineering
  const codeSnippets = [
    "const brain = \n  initialize()",
    "neural.connect(\n  nodes)",
    "async function\n  think() {}",
    "for (const\n  thread of\n  processes) {}",
    "interface Mind {\n  cognition: AI\n}",
    "quantum.compute(\n  problem)",
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background gradient layers for depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 30% 40%,
                rgba(0, 217, 255, 0.08) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 70% 60%,
                rgba(181, 55, 242, 0.08) 0%,
                transparent 50%
              )
            `,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Holographic UI Fragments - scattered around environment */}
        <HolographicFragment
          position={{ top: "10%", left: "5%" }}
          width={120}
          height={60}
          color="cyan"
          opacity={settings.fragmentOpacity}
          delay={0}
        />
        <HolographicFragment
          position={{ top: "20%", right: "8%" }}
          width={80}
          height={100}
          color="purple"
          opacity={settings.fragmentOpacity}
          delay={1}
        />
        <HolographicFragment
          position={{ bottom: "15%", left: "12%" }}
          width={100}
          height={70}
          color="green"
          opacity={settings.fragmentOpacity}
          delay={2}
        />
        <HolographicFragment
          position={{ bottom: "20%", right: "5%" }}
          width={90}
          height={90}
          color="cyan"
          opacity={settings.fragmentOpacity}
          delay={1.5}
        />

        {/* Floating Code Snippets - subtle AI/engineering references */}
        {codeSnippets.map((snippet, index) => (
          <FloatingCodeSnippet
            key={index}
            code={snippet}
            position={{
              x: `${10 + (index % 3) * 35}%`,
              y: `${15 + (Math.floor(index / 3) * 40)}%`,
            }}
            duration={8 + index * 0.5}
            delay={index * 0.3}
            opacity={settings.codeOpacity}
            size={index % 2 === 0 ? "sm" : "md"}
          />
        ))}

        {/* Ambient neural particles - subtle floating motion */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 2 + (i % 3) * 1.5,
              height: 2 + (i % 3) * 1.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ["#00d9ff", "#00ff9f", "#b537f2"][i % 3],
              opacity: settings.particleOpacity,
              boxShadow: `0 0 ${8 + i}px ${
                ["rgba(0, 217, 255, 0.6)", "rgba(0, 255, 159, 0.6)", "rgba(181, 55, 242, 0.6)"][i % 3]
              }`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100, 0],
              x: [0, (Math.random() - 0.5) * 100, 0],
              opacity: [settings.particleOpacity * 0.3, settings.particleOpacity, settings.particleOpacity * 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Subtle scan lines effect for cinematic depth */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          {[...Array(100)].map((_, i) => (
            <div
              key={`scanline-${i}`}
              className="h-px bg-accent-cyan/20"
              style={{ marginBottom: "3px" }}
            />
          ))}
        </div>

        {/* Ambient glow layers for atmospheric depth */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at 50% 50%,
                rgba(0, 217, 255, 0.05) 0%,
                transparent 70%
              )
            `,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>

      {/* Center content with AI Core and surrounding elements */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>

      {/* Status indicators - subtle system monitoring */}
      <motion.div
        className="absolute top-8 right-8 text-xs font-mono pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.8 }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-accent-cyan/70">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span>Neural: Active</span>
          </div>
          <div className="flex items-center gap-2 text-accent-cyan/70">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" />
            <span>System: Online</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom status bar - quiet intelligent presence */}
      <motion.div
        className="absolute bottom-8 left-8 text-xs font-mono pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
      >
        <div className="space-y-0.5 text-accent-cyan/60">
          <div>AIOS v4.2 | Neural Engine Active</div>
          <div>Cognition: {Math.floor(Math.random() * 20 + 80)}% | Sync: Optimal</div>
        </div>
      </motion.div>
    </div>
  );
}
