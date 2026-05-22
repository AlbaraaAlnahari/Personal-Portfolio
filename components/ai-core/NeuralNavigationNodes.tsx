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
  description?: string;    // Optional section description
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
  const navigationNodes: NeuralNavigationNode[] = [
    {
      id: "about",
      label: "About",
      icon: "◉",  // Filled circle with dot - identity/profile
      color: "text-accent-cyan",
      colorValue: "rgb(0, 217, 255)",
      angle: 0,              // 0° (top)
      orbitRadius: 220,
      orbitSpeed: 28,
      orbitDirection: "cw",
      phaseOffset: 0,
      sectionId: "about",
      description: "Who I am",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "▥",  // Horizontal bars - grid/modules
      color: "text-accent-green",
      colorValue: "rgb(0, 255, 159)",
      angle: Math.PI / 3,
      orbitRadius: 200,
      orbitSpeed: 32,
      orbitDirection: "ccw",
      phaseOffset: 0.5,
      sectionId: "projects",
      description: "What I build",
    },
    {
      id: "experience",
      label: "Experience",
      icon: "⊢",  // Turnstile - timeline/chronological
      color: "text-accent-purple",
      colorValue: "rgb(181, 55, 242)",
      angle: (Math.PI * 2) / 3,
      orbitRadius: 210,
      orbitSpeed: 30,
      orbitDirection: "cw",
      phaseOffset: 0.3,
      sectionId: "experience",
      description: "My journey",
    },
    {
      id: "skills",
      label: "Skills",
      icon: "⚛",  // Atom - interconnected systems
      color: "text-accent-cyan",
      colorValue: "rgb(0, 217, 255)",
      angle: Math.PI,
      orbitRadius: 195,
      orbitSpeed: 35,
      orbitDirection: "ccw",
      phaseOffset: 0.7,
      sectionId: "skills",
      description: "What I know",
    },
    {
      id: "contact",
      label: "Contact",
      icon: "⟿",  // Wave - signal/communication
      color: "text-accent-green",
      colorValue: "rgb(0, 255, 159)",
      angle: (Math.PI * 4) / 3,
      orbitRadius: 215,
      orbitSpeed: 27,
      orbitDirection: "cw",
      phaseOffset: 0.2,
      sectionId: "contact",
      description: "Let's connect",
    },
    {
      id: "ai",
      label: "Terminal",
      icon: "◲",  // Open square - command interface
      color: "text-accent-purple",
      colorValue: "rgb(181, 55, 242)",
      angle: (Math.PI * 5) / 3,
      orbitRadius: 205,
      orbitSpeed: 33,
      orbitDirection: "ccw",
      phaseOffset: 0.4,
      sectionId: "ai-assistant",
      description: "Ask me anything",
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
            {/* ORBITAL CONTAINER - Node and Label orbit together */}
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
              {/* CONNECTOR LINE - from node toward center */}
              {isHoveredNode && (
                <motion.svg
                  className="absolute pointer-events-none"
                  style={{
                    left: `${staticX}px`,
                    top: `${staticY}px`,
                    width: "100px",
                    height: "100px",
                    overflow: "visible",
                  }}
                  viewBox="-50 -50 100 100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={-staticX * 0.7}
                    y2={-staticY * 0.7}
                    stroke={node.colorValue}
                    strokeWidth="1"
                    opacity="0.4"
                    strokeDasharray="3,3"
                  />
                </motion.svg>
              )}

              {/* NODE BUTTON - Interactive element */}
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
                }}
                animate={{
                  scale: isHoveredNode ? 1.5 : 1,
                  opacity: nearbyHoveredNode ? 0.4 : isHoveredNode ? 1 : 0.7,
                }}
                transition={{
                  scale: { duration: 0.4, ease: "easeOut" },
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
                    opacity: isHoveredNode ? 0.5 : 0.15,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Node icon */}
                <motion.span
                  className="text-2xl relative z-10 font-bold leading-none"
                  animate={{
                    scale: isHoveredNode ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {node.icon}
                </motion.span>

                {/* Active section indicator */}
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

                {/* Idle pulse animation */}
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

              {/* HOLOGRAPHIC LABEL - Anchored to node, counter-rotated to stay readable */}
              <motion.div
                className="absolute pointer-events-auto"
                style={{
                  left: `${staticX}px`,
                  top: `${staticY}px`,
                  transform: "translate(-50%, calc(-100% - 16px))",
                }}
                animate={{
                  // Counter-rotate to keep text horizontal while parent orbits
                  rotate: node.orbitDirection === "cw" ? -360 : 360,
                  opacity: isHoveredNode ? 1 : 0,
                  scale: isHoveredNode ? 1 : 0.85,
                  y: isHoveredNode ? 0 : 8,
                }}
                transition={{
                  rotate: {
                    duration: orbitDuration,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  y: { duration: 0.3 },
                }}
              >
                <div
                  className="px-3 py-2 rounded-lg font-mono text-sm whitespace-nowrap backdrop-blur-xl border pointer-events-auto"
                  style={{
                    background: `linear-gradient(135deg, rgba(${node.colorValue.match(/\d+/g)?.join(", ")}, 0.2) 0%, rgba(${node.colorValue.match(/\d+/g)?.join(", ")}, 0.05) 100%), rgba(10, 14, 39, 0.9)`,
                    border: `1px solid ${node.colorValue}60`,
                    boxShadow: `0 0 24px ${node.colorValue}40, inset 0 1px 2px rgba(255, 255, 255, 0.2)`,
                    color: node.colorValue,
                  }}
                >
                  <div className="font-semibold">{node.label}</div>
                  {node.description && (
                    <div
                      className="text-xs mt-1 opacity-70"
                      style={{ color: node.colorValue }}
                    >
                      {node.description}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
