"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * System Diagnostics Component
 * Clear, recruiter-friendly system status indicators
 */
export function SystemDiagnostics() {
  const [diagnostics, setDiagnostics] = useState({
    systems: true,
    projects: 4,
    workspace: true,
    innovation: true,
  });

  useEffect(() => {
    // Subtle updates to diagnostics
    const interval = setInterval(() => {
      setDiagnostics({
        systems: true,
        projects: 4,
        workspace: true,
        innovation: true,
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const diagnosticItems = [
    {
      label: "Systems",
      value: diagnostics.systems ? "Active" : "Offline",
      status: diagnostics.systems ? "active" : "offline",
      icon: "●",
    },
    {
      label: "Projects Online",
      value: diagnostics.projects.toString(),
      status: "active",
      icon: "◆",
    },
    {
      label: "Developer Workspace",
      value: diagnostics.workspace ? "Running" : "Idle",
      status: diagnostics.workspace ? "active" : "idle",
      icon: "◈",
    },
    {
      label: "Innovation Layer",
      value: diagnostics.innovation ? "Connected" : "Connecting",
      status: diagnostics.innovation ? "active" : "loading",
      icon: "◇",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const statusColorMap = {
    active: "text-accent-green",
    offline: "text-accent-pink",
    idle: "text-foreground-secondary",
    loading: "text-accent-cyan",
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 text-xs font-mono pointer-events-none z-30"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-2">
        {diagnosticItems.map((item) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-3 text-foreground-secondary/80 hover:text-foreground-secondary transition-colors"
            variants={itemVariants}
          >
            <span className={`${statusColorMap[item.status as keyof typeof statusColorMap]} animate-pulse`}>
              {item.icon}
            </span>
            <span className="text-xs">
              {item.label}: <span className="text-foreground-primary">{item.value}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Version info */}
      <motion.div
        className="mt-4 pt-3 border-t border-glass-light text-foreground-secondary/60"
        variants={itemVariants}
        transition={{ delay: 0.5 }}
      >
        <div>AIOS v4.2 | Neural Engine</div>
        <div className="text-foreground-secondary/40">Ready to explore</div>
      </motion.div>
    </motion.div>
  );
}
