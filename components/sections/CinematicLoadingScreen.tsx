"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CinematicLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
  autoClose?: boolean;
}

// Deterministic particle data for loading screen - no Math.random() during render
const LOADING_PARTICLES = Array.from({ length: 8 }, (_, i) => {
  const hash = (i * 6131) % 10000;
  const nextHash = ((i + 1) * 6131) % 10000;

  return {
    id: i,
    left: (hash / 10000) * 100,
    top: (nextHash / 10000) * 100,
    motionY: ((hash / 10000) - 0.5) * 100,
    duration: 6 + (nextHash / 10000) * 4,
    color: ["#00d9ff", "#b537f2"][i % 2],
  };
});

/**
 * Cinematic Loading Screen Component
 * Boot sequence experience: "Booting Albaraa OS"
 * Fast, cinematic, and skippable
 */
export function CinematicLoadingScreen({
  onComplete,
  duration = 3000,
  autoClose = true,
}: CinematicLoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  const bootLines = [
    { text: "> Booting Albaraa OS...", delay: 0 },
    { text: "> Initializing AI Workspace...", delay: 400 },
    { text: "> Loading Projects...", delay: 800 },
    { text: "> Syncing Developer Environment...", delay: 1200 },
    { text: "> Activating Innovation Layer...", delay: 1600 },
    { text: "> Access Granted.", delay: 2000 },
  ];

  useEffect(() => {
    if (!autoClose) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, autoClose, onComplete]);

  const handleClose = () => {
    setIsVisible(false);
    onComplete?.();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  const bootLineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const cursorVariants = {
    blink: {
      opacity: [1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
      },
    },
  };

  const loadingBarVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 2.4,
        ease: "easeInOut",
      },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background-primary flex flex-col items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle animated gradients */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 50% 50%,
                rgba(0, 217, 255, 0.08) 0%,
                transparent 70%
              )
            `,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        />

        {/* Subtle particles */}
        {LOADING_PARTICLES.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: particle.color,
              opacity: 0.2,
            }}
            animate={{
              y: [0, particle.motionY, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6 space-y-8">
        {/* Boot Sequence Terminal */}
        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {bootLines.map((line, index) => (
            <motion.div
              key={index}
              variants={bootLineVariants}
              transition={{ delay: line.delay / 1000 }}
              className="font-mono text-sm"
            >
              <span className="text-accent-cyan">{line.text}</span>

              {/* Typing cursor on last line */}
              {index === bootLines.length - 1 && (
                <motion.span
                  className="inline-block w-2 h-4 bg-accent-cyan ml-1"
                  variants={cursorVariants}
                  animate="blink"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Status Indicators */}
        <motion.div
          className="space-y-2 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <div className="flex items-center gap-2 text-xs text-foreground-secondary">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span>Neural Engine: Active</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-secondary">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" />
            <span>Systems: Online</span>
          </div>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-1 bg-glass rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-green"
              variants={loadingBarVariants}
              initial="hidden"
              animate="visible"
              style={{ originX: 0 }}
            />
          </div>
          <div className="mt-2 text-xs text-foreground-secondary/60 text-center">
            Preparing workspace...
          </div>
        </motion.div>

        {/* Skip Button */}
        <motion.button
          className="mt-8 px-4 py-2 text-xs text-foreground-secondary/70 hover:text-accent-cyan transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={handleClose}
        >
          Skip (or wait)
        </motion.button>
      </div>

      {/* Floating Glyphs (decorative) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute text-accent-cyan/5 font-mono text-8xl"
          style={{ left: "5%", top: "10%" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          &lt;/&gt;
        </motion.div>
        <motion.div
          className="absolute text-accent-purple/5 font-mono text-8xl"
          style={{ right: "5%", bottom: "10%" }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {"{...}"}
        </motion.div>
      </div>
    </motion.div>
  );
}
