"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

/**
 * Loading Component (loading.tsx)
 * Displays during page transitions and initial load
 * Framework for boot sequence animation
 */
export default function Loading() {
  const bootSequenceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const cursorVariants = {
    blink: {
      opacity: [1, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 bg-background-primary flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary opacity-50" />
        <div className="absolute inset-0 backdrop-blur-[100px] opacity-50" />
      </div>

      {/* Loading content */}
      <Container className="relative z-10">
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={bootSequenceVariants}
        >
          {/* Boot sequence header */}
          <motion.div variants={lineVariants} className="font-mono text-sm">
            <span className="text-accent-cyan">&gt;</span>
            <span className="text-foreground-secondary"> Initializing Albaraa OS...</span>
          </motion.div>

          {/* Boot lines */}
          <motion.div variants={lineVariants} className="font-mono text-xs space-y-1">
            <div>
              <span className="text-accent-green">[✓]</span>
              <span className="text-foreground-secondary"> Core systems loaded</span>
            </div>
            <div>
              <span className="text-accent-green">[✓]</span>
              <span className="text-foreground-secondary"> UI framework initialized</span>
            </div>
            <div>
              <span className="text-accent-cyan">[»]</span>
              <span className="text-foreground-secondary"> Loading content</span>
            </div>
          </motion.div>

          {/* Cursor animation */}
          <motion.div
            className="font-mono text-sm mt-6"
            variants={lineVariants}
          >
            <span className="text-accent-cyan">&gt;</span>
            <motion.span
              className="inline-block w-2 h-5 bg-accent-cyan ml-1"
              variants={cursorVariants}
            />
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="mt-8 h-1 bg-glass rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </Container>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-accent-cyan/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{ top: "-10%", right: "-5%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-accent-purple/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{ bottom: "-10%", left: "-5%" }}
        />
      </div>
    </div>
  );
}
