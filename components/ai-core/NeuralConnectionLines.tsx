"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface NeuralConnectionLine {
  id: string;
  angle: number;
  radius: number;
  color: string;
  colorValue: string;
  orbitSpeed: number;
  orbitDirection: "cw" | "ccw";
}

interface NeuralConnectionLinesProps {
  centerX?: number;
  centerY?: number;
  activeSection?: string;
  hoveredNode?: string | null;
}

export function NeuralConnectionLines({
  centerX = 0,
  centerY = 0,
  activeSection,
  hoveredNode,
}: NeuralConnectionLinesProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Connection lines matching the new orbital system
  const connectionLines: NeuralConnectionLine[] = [
    {
      id: "about",
      angle: 0,
      radius: 220,
      color: "url(#gradient-cyan)",
      colorValue: "rgb(0, 217, 255)",
      orbitSpeed: 28,
      orbitDirection: "cw",
    },
    {
      id: "projects",
      angle: Math.PI / 3,
      radius: 200,
      color: "url(#gradient-green)",
      colorValue: "rgb(0, 255, 159)",
      orbitSpeed: 32,
      orbitDirection: "ccw",
    },
    {
      id: "experience",
      angle: (Math.PI * 2) / 3,
      radius: 210,
      color: "url(#gradient-purple)",
      colorValue: "rgb(181, 55, 242)",
      orbitSpeed: 30,
      orbitDirection: "cw",
    },
    {
      id: "skills",
      angle: Math.PI,
      radius: 195,
      color: "url(#gradient-cyan)",
      colorValue: "rgb(0, 217, 255)",
      orbitSpeed: 35,
      orbitDirection: "ccw",
    },
    {
      id: "contact",
      angle: (Math.PI * 4) / 3,
      radius: 215,
      color: "url(#gradient-green)",
      colorValue: "rgb(0, 255, 159)",
      orbitSpeed: 27,
      orbitDirection: "cw",
    },
    {
      id: "ai",
      angle: (Math.PI * 5) / 3,
      radius: 205,
      color: "url(#gradient-purple)",
      colorValue: "rgb(181, 55, 242)",
      orbitSpeed: 33,
      orbitDirection: "ccw",
    },
  ];

  useEffect(() => {
    const updateSize = () => {
      const svgElement = document.getElementById("neural-connection-svg");
      if (svgElement) {
        const rect = svgElement.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <svg
      id="neural-connection-svg"
      className="absolute inset-0 pointer-events-none"
      width="100%"
      height="100%"
      viewBox={`0 0 ${containerSize.width || 1000} ${containerSize.height || 800}`}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Gradients for connection lines */}
        <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(0, 217, 255)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(0, 217, 255)" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(0, 255, 159)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(0, 255, 159)" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(181, 55, 242)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(181, 55, 242)" stopOpacity="0.1" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="neural-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines - G wrapper for orbital rotation */}
      {connectionLines.map((line) => {
        const x2 = Math.cos(line.angle) * line.radius;
        const y2 = Math.sin(line.angle) * line.radius;
        const isActive = activeSection === line.id;
        const isHoveredLine = hoveredNode === line.id;

        return (
          <motion.g
            key={line.id}
            animate={{
              rotate: line.orbitDirection === "cw" ? 360 : -360,
            }}
            transition={{
              rotate: {
                duration: line.orbitSpeed,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            style={{
              transformOrigin: "0px 0px",
              transformBox: "fill-box",
            }}
          >
            {/* Animated dash pattern - neural energy flow */}
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={centerX + x2}
              y2={centerY + y2}
              stroke={line.colorValue}
              strokeWidth={isActive ? 3 : isHoveredLine ? 2 : 1.5}
              opacity={isActive ? 0.9 : isHoveredLine ? 0.6 : 0.25}
              strokeDasharray="6,4"
              filter="url(#neural-glow)"
              animate={{
                strokeDashoffset: [0, -10],
                opacity: isActive ? [0.85, 1, 0.85] : isHoveredLine ? [0.5, 0.7, 0.5] : [0.2, 0.35, 0.2],
              }}
              transition={{
                strokeDashoffset: {
                  duration: isActive ? 1.5 : isHoveredLine ? 2 : 4,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: {
                  duration: isActive ? 1.5 : isHoveredLine ? 2 : 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />

            {/* Active state glow layer */}
            {isActive && (
              <motion.line
                x1={centerX}
                y1={centerY}
                x2={centerX + x2}
                y2={centerY + y2}
                stroke={line.colorValue}
                strokeWidth={5}
                opacity={0}
                filter="url(#neural-glow)"
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Neural node at endpoint - subtle visual marker */}
            <motion.circle
              cx={centerX + x2}
              cy={centerY + y2}
              r={isActive ? 4 : isHoveredLine ? 3 : 2}
              fill={line.colorValue}
              opacity={isActive ? 0.8 : isHoveredLine ? 0.5 : 0.2}
              animate={{
                r: isActive ? [3, 5, 3] : isHoveredLine ? [2.5, 3.5, 2.5] : 2,
              }}
              transition={{
                r: {
                  duration: isActive ? 2 : isHoveredLine ? 1.5 : 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}
