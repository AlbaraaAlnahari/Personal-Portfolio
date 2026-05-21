"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Integrated Diagnostics Component
 * System status that feels like part of the environment
 * Clear language, subtle presentation, cinematic feel
 */
export function IntegratedDiagnostics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const diagnosticItems = [
    {
      icon: "●",
      label: "Systems",
      value: "Active",
      color: "text-accent-green",
      desc: "Engineering workspace online",
    },
    {
      icon: "◆",
      label: "Projects",
      value: "4 Online",
      color: "text-accent-cyan",
      desc: "Active development systems",
    },
    {
      icon: "◈",
      label: "Workspace",
      value: "Running",
      color: "text-accent-green",
      desc: "Developer environment active",
    },
    {
      icon: "◇",
      label: "Innovation",
      value: "Connected",
      color: "text-accent-purple",
      desc: "AI engineering layer",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 text-xs font-mono pointer-events-none z-30"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Glass panel background */}
      <div className="absolute inset-0 -m-4 rounded-lg bg-background-primary/40 backdrop-blur-sm border border-glass-light pointer-events-none" />

      {/* Diagnostics content */}
      <motion.div className="relative p-4 space-y-3">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-foreground-secondary/60 text-xs uppercase tracking-wider"
        >
          System Status
        </motion.div>

        {/* Diagnostics items */}
        <div className="space-y-2">
          {diagnosticItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3 group cursor-pointer"
              variants={itemVariants}
              whileHover={{ x: 4 }}
            >
              {/* Status indicator */}
              <motion.span
                className={`${item.color} text-xs`}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2 + index * 0.3,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                {item.icon}
              </motion.span>

              {/* Label and value */}
              <div className="flex flex-col gap-0.5">
                <div className="text-foreground-secondary text-xs">
                  {item.label}:{" "}
                  <span className={`${item.color} font-semibold`}>{item.value}</span>
                </div>
                <div className="text-foreground-secondary/40 text-[10px]">
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-glass-light to-transparent my-2"
          variants={itemVariants}
          transition={{ delay: 0.4 }}
        />

        {/* Version and status */}
        <motion.div
          className="space-y-1 text-foreground-secondary/50 text-[10px]"
          variants={itemVariants}
          transition={{ delay: 0.5 }}
        >
          <div>AIOS v4.2 | Neural Engineering Lab</div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            <span>Workspace Ready</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
