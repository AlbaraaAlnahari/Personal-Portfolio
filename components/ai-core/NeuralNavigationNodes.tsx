"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useState, useRef, useEffect } from "react";

interface NeuralNavigationNode {
  id: string;
  label: string;
  icon: string;
  color: string;
  colorValue: string;
  angle: number;           // Fixed starting angle (360° distribution)
  orbitRadius: number;     // Individual orbit radius
  orbitSpeed: number;      // Duration of one orbit in seconds
  orbitDirection: "cw" | "ccw";  // Clockwise or counterclockwise
  phaseOffset: number;     // Starting phase offset
  sectionId: string;
  tooltipOffset?: number;  // Optional custom tooltip vertical offset
}

interface NeuralNavigationNodesProps {
  centerX?: number;
  centerY?: number;
  activeSection?: string;
  hoveredNode?: string | null;
  onHover?: (nodeId: string | null) => void;
}

export function NeuralNavigationNodes({
  centerX = 0,
  centerY = 0,
  activeSection,
  hoveredNode: externalHoveredNode = null,
  onHover,
}: NeuralNavigationNodesProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const hoveredNode = externalHoveredNode;

  const handleHover = (nodeId: string | null) => {
    if (onHover) {
      onHover(nodeId);
    }
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition({ centerX, centerY, throttle: 16 });

  // Neural Navigation Nodes - Intelligently distributed across 360°
  // Icons: futuristic minimal representations of each section
  const navigationNodes: NeuralNavigationNode[] = [
    {
      id: "about",
      label: "Profile",
      icon: "◯",  // Circle - identity/personal profile
      color: "text-accent-cyan",
      colorValue: "rgb(0, 217, 255)",
      angle: 0,              // 0° (top)
      orbitRadius: 220,
      orbitSpeed: 28,        // 28s orbit
      orbitDirection: "cw",
      phaseOffset: 0,
      sectionId: "about",
      tooltipOffset: -60,    // Move label down to avoid navbar
    },
    {
      id: "projects",
      label: "Modules",
      icon: "▦",  // Horizontal bars - modular systems
      color: "text-accent-green",
      colorValue: "rgb(0, 255, 159)",
      angle: Math.PI / 3,     // 60°
      orbitRadius: 200,
      orbitSpeed: 32,         // 32s orbit
      orbitDirection: "ccw",
      phaseOffset: 0.5,
      sectionId: "projects",
    },
    {
      id: "experience",
      label: "Timeline",
      icon: "◆",  // Diamond - temporal sequence/progression
      color: "text-accent-purple",
      colorValue: "rgb(181, 55, 242)",
      angle: (Math.PI * 2) / 3, // 120°
      orbitRadius: 210,
      orbitSpeed: 30,         // 30s orbit
      orbitDirection: "cw",
      phaseOffset: 0.3,
      sectionId: "experience",
    },
    {
      id: "skills",
      label: "Systems",
      icon: "◈",  // Star - interconnected systems/expertise
      color: "text-accent-cyan",
      colorValue: "rgb(0, 217, 255)",
      angle: Math.PI,         // 180° (bottom)
      orbitRadius: 195,
      orbitSpeed: 35,         // 35s orbit
      orbitDirection: "ccw",
      phaseOffset: 0.7,
      sectionId: "skills",
      tooltipOffset: 60,      // Move label up to avoid bottom edge
    },
    {
      id: "contact",
      label: "Connect",
      icon: "⟿",  // Wave - signal/communication/connection
      color: "text-accent-green",
      colorValue: "rgb(0, 255, 159)",
      angle: (Math.PI * 4) / 3, // 240°
      orbitRadius: 215,
      orbitSpeed: 27,         // 27s orbit
      orbitDirection: "cw",
      phaseOffset: 0.2,
      sectionId: "contact",
    },
    {
      id: "ai",
      label: "Terminal",
      icon: "⊗",  // Circle with cross - control/input center
      color: "text-accent-purple",
      colorValue: "rgb(181, 55, 242)",
      angle: (Math.PI * 5) / 3, // 300°
      orbitRadius: 205,
      orbitSpeed: 33,         // 33s orbit
      orbitDirection: "ccw",
      phaseOffset: 0.4,
      sectionId: "ai-assistant",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });
  }, []);

  const handleNodeClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Cinematic scroll transition
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
        overflow: "visible",
      }}
    >
      {navigationNodes.map((node) => {
        // Calculate current position with individual orbital motion
        const rotationOffset = node.phaseOffset * (Math.PI * 2);
        const orbitDuration = node.orbitSpeed;

        // Position calculation - static at angle with orbital animation applied
        const staticX = Math.cos(node.angle) * node.orbitRadius;
        const staticY = Math.sin(node.angle) * node.orbitRadius;

        // Calculate distance from mouse for hover effects
        const nodeX = centerX + staticX;
        const nodeY = centerY + staticY;
        const distToMouse = Math.sqrt(
          (nodeX - mousePos.x) ** 2 + (nodeY - mousePos.y) ** 2
        );
        const isHoveredNode = hoveredNode === node.id;
        const nearbyHoveredNode = hoveredNode && hoveredNode !== node.id && distToMouse < 250;

        // Smart label offset calculation to avoid clipping
        const labelOffsetY = node.tooltipOffset || (staticY < 0 ? -60 : 60);
        const labelX = staticX;
        const labelY = staticY + labelOffsetY;

        return (
          <div key={node.id} style={{ pointerEvents: "none" }}>
            {/* ROTATING ORB + ICON (orbits with motion) */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: 0,
                height: 0,
              }}
              animate={{
                rotate: node.orbitDirection === "cw" ? 360 : -360,
              }}
              transition={{
                rotate: {
                  duration: orbitDuration,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Node Button - positioned along orbital axis */}
              <motion.button
                onClick={() => handleNodeClick(node.sectionId)}
                onMouseEnter={() => handleHover(node.id)}
                onMouseLeave={() => handleHover(null)}
                className={`absolute flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 cursor-pointer pointer-events-auto transition-all duration-300 ${
                  isHoveredNode ? "border-current" : "border-current/50"
                } ${node.color} group`}
                style={{
                  left: `${staticX}px`,
                  top: `${staticY}px`,
                  transform: "translate(-50%, -50%)",
                  opacity: nearbyHoveredNode ? 0.4 : isHoveredNode ? 1 : 0.7,
                }}
                animate={{
                  scale: isHoveredNode ? 1.4 : 1,
                  opacity: nearbyHoveredNode ? 0.4 : isHoveredNode ? 1 : 0.7,
                }}
                transition={{
                  scale: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.2 },
                }}
              >
                {/* Node background glow */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, currentColor 0%, transparent 70%)`,
                  }}
                  animate={{
                    opacity: isHoveredNode ? 0.4 : 0.15,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Node icon - centered, responsive size */}
                <motion.span
                  className="text-2xl relative z-10 font-bold"
                  animate={{
                    scale: isHoveredNode ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {node.icon}
                </motion.span>

                {/* Active section indicator - persistent glow */}
                {activeSection === node.sectionId && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-current pointer-events-none"
                    animate={{
                      boxShadow: [
                        `0 0 15px ${node.colorValue}`,
                        `0 0 35px ${node.colorValue}`,
                        `0 0 15px ${node.colorValue}`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Subtle idle pulse - continuous neural activity */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    borderWidth: "1px",
                    borderColor: "currentColor",
                    opacity: 0.3,
                  }}
                />
              </motion.button>
            </motion.div>

            {/* HOLOGRAPHIC LABEL (STATIC - NOT ROTATING) */}
            {/* Positioned absolutely to stay readable and visible */}
            <motion.div
              className="absolute pointer-events-auto font-mono text-sm whitespace-nowrap"
              style={{
                left: `calc(50% + ${labelX}px)`,
                top: `calc(50% + ${labelY}px)`,
                transform: "translate(-50%, -50%)",
                zIndex: isHoveredNode ? 40 : 20,
                background: `linear-gradient(135deg, rgba(${node.colorValue === "rgb(0, 217, 255)" ? "0, 217, 255" : node.colorValue === "rgb(0, 255, 159)" ? "0, 255, 159" : "181, 55, 242"}, 0.15) 0%, rgba(${node.colorValue === "rgb(0, 217, 255)" ? "0, 217, 255" : node.colorValue === "rgb(0, 255, 159)" ? "0, 255, 159" : "181, 55, 242"}, 0.05) 100%), rgba(10, 14, 39, 0.85)`,
                border: `1px solid ${node.colorValue}40`,
                backdropFilter: "blur(12px)",
                borderRadius: "0.75rem",
                padding: "0.5rem 1rem",
                boxShadow: isHoveredNode
                  ? `0 0 20px ${node.colorValue}60, inset 0 1px 2px rgba(255, 255, 255, 0.15)`
                  : `0 0 10px ${node.colorValue}20`,
              }}
              animate={{
                opacity: isHoveredNode ? 1 : 0,
                y: isHoveredNode ? -8 : 0,
                scale: isHoveredNode ? 1 : 0.9,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <span style={{ color: node.colorValue }}>→</span>
              <span className="ml-2" style={{ color: node.colorValue }}>
                {node.label}
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
