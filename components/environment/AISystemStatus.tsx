"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SystemStatusItem {
  id: string;
  label: string;
  fullText: string;
  position: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  color: "cyan" | "green" | "purple";
}

interface AISystemStatusProps {
  showOnMobile?: boolean;
}

export function AISystemStatus({ showOnMobile = false }: AISystemStatusProps) {
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);

  const statusItems: SystemStatusItem[] = [
    {
      id: "workspace",
      label: "AI WORKSPACE ACTIVE",
      fullText: "Intelligent engineering environment fully initialized and operational",
      position: "top-right",
      color: "cyan",
    },
    {
      id: "neural",
      label: "NEURAL SYSTEMS STABLE",
      fullText: "Neural networks synchronized and processing information streams",
      position: "bottom-right",
      color: "green",
    },
    {
      id: "engineering",
      label: "ENGINEERING LAYER LOADED",
      fullText: "Robotics and systems architecture modules ready for interaction",
      position: "top-left",
      color: "purple",
    },
    {
      id: "developer",
      label: "DEVELOPER MODE SYNCED",
      fullText: "Full-stack capabilities and developer environment integrated",
      position: "bottom-left",
      color: "green",
    },
  ];

  const positionClasses = {
    "top-right": "top-6 right-6 md:top-8 md:right-8",
    "bottom-right": "bottom-6 right-6 md:bottom-8 md:right-8",
    "top-left": "top-6 left-6 md:top-8 md:left-8",
    "bottom-left": "bottom-6 left-6 md:bottom-8 md:left-8",
  };

  const colorClasses = {
    cyan: "text-accent-cyan",
    green: "text-accent-green",
    purple: "text-accent-purple",
  };

  const borderClasses = {
    cyan: "border-accent-cyan",
    green: "border-accent-green",
    purple: "border-accent-purple",
  };

  const shadowClasses = {
    cyan: "group-hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]",
    green: "group-hover:drop-shadow-[0_0_8px_rgba(0,255,159,0.6)]",
    purple: "group-hover:drop-shadow-[0_0_8px_rgba(181,55,242,0.6)]",
  };

  return (
    <>
      {statusItems.map((item) => (
        <motion.div
          key={item.id}
          className={`fixed ${positionClasses[item.position]} hidden md:block z-20 group pointer-events-auto`}
          initial={{ opacity: 0, y: item.position.includes("top") ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Status indicator */}
          <div
            className={`flex items-center gap-2 text-xs font-mono cursor-default`}
            onMouseEnter={() => setHoveredStatus(item.id)}
            onMouseLeave={() => setHoveredStatus(null)}
          >
            {/* Pulsing indicator dot */}
            <motion.div
              className={`w-2 h-2 rounded-full ${colorClasses[item.color]}`}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Label */}
            <span className={`${colorClasses[item.color]} opacity-60 group-hover:opacity-100 transition-opacity tracking-wider ${shadowClasses[item.color]}`}>
              {item.label}
            </span>
          </div>

          {/* Tooltip on hover */}
          <motion.div
            className={`absolute mt-1 px-2 py-1.5 rounded bg-background-primary/90 border border-glass-light/50 text-xs text-foreground-secondary backdrop-blur-sm whitespace-nowrap`}
            animate={{
              opacity: hoveredStatus === item.id ? 1 : 0,
              pointerEvents: hoveredStatus === item.id ? "auto" : "none",
            }}
            transition={{ duration: 0.2 }}
            style={{
              left: item.position.includes("left") ? "auto" : "0",
              right: item.position.includes("right") ? "auto" : "0",
              top: item.position.includes("top") ? "100%" : "auto",
              bottom: item.position.includes("bottom") ? "100%" : "auto",
            }}
          >
            {item.fullText}
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
