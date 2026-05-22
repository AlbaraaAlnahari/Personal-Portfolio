"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useState, useRef, useEffect } from "react";

interface NavigationNode {
  id: string;
  label: string;
  icon: string;
  color: string;
  angle: number;
  radius: number;
  sectionId: string;
}

interface NeuralNavigationNodesProps {
  centerX?: number;
  centerY?: number;
  activeSection?: string;
}

export function NeuralNavigationNodes({
  centerX = 0,
  centerY = 0,
  activeSection,
}: NeuralNavigationNodesProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition({ centerX, centerY, throttle: 16 });

  const navigationNodes: NavigationNode[] = [
    { id: "about", label: "About", icon: "◆", color: "text-accent-cyan", angle: 0, radius: 180, sectionId: "about" },
    { id: "projects", label: "Projects", icon: "▲", color: "text-accent-green", angle: Math.PI * 0.67, radius: 180, sectionId: "projects" },
    { id: "experience", label: "Experience", icon: "●", color: "text-accent-purple", angle: Math.PI * 1.33, radius: 180, sectionId: "experience" },
    { id: "skills", label: "Skills", icon: "◇", color: "text-accent-cyan", angle: Math.PI * 2, radius: 180, sectionId: "skills" },
    { id: "contact", label: "Contact", icon: "★", color: "text-accent-green", angle: -Math.PI * 0.67, radius: 180, sectionId: "contact" },
    { id: "ai", label: "AI Terminal", icon: "◈", color: "text-accent-purple", angle: -Math.PI * 1.33, radius: 180, sectionId: "ai-assistant" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });
  }, []);

  const handleNodeClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {navigationNodes.map((node, index) => {
        const x = Math.cos(node.angle) * node.radius;
        const y = Math.sin(node.angle) * node.radius;

        // Calculate distance from mouse for glow effect
        const deltaX = mousePos.x - centerX;
        const deltaY = mousePos.y - centerY;
        const nodeX = centerX + x;
        const nodeY = centerY + y;
        const distToMouse = Math.sqrt(
          (nodeX - mousePos.x) ** 2 + (nodeY - mousePos.y) ** 2
        );
        const isNearMouse = distToMouse < 200;

        return (
          <motion.button
            key={node.id}
            onClick={() => handleNodeClick(node.sectionId)}
            className={`absolute pointer-events-auto flex flex-col items-center justify-center w-12 h-12 rounded-full border border-current opacity-60 hover:opacity-90 transition-opacity cursor-pointer group ${node.color}`}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.15, opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Node background glow */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle, currentColor 0%, transparent 70%)`,
              }}
              animate={{
                opacity: isNearMouse ? 0.3 : 0.1,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Icon */}
            <span className="text-lg relative z-10 group-hover:text-xl transition-all">
              {node.icon}
            </span>

            {/* Node label tooltip */}
            <motion.div
              className="absolute bottom-full mb-2 px-2 py-1 rounded bg-background-primary/80 border border-glass-light/50 text-xs whitespace-nowrap opacity-0 pointer-events-none"
              animate={{
                opacity: isNearMouse ? 0.9 : 0,
                y: isNearMouse ? -4 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-foreground-primary">{node.label}</span>
            </motion.div>

            {/* Active state indicator */}
            {activeSection === node.sectionId && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-current"
                animate={{
                  boxShadow: [
                    "0 0 10px currentColor",
                    "0 0 30px currentColor",
                    "0 0 10px currentColor",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Floating animation */}
            <motion.div
              className="absolute inset-0"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
