"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ConnectionLine {
  id: string;
  angle: number;
  radius: number;
  color: string;
  colorValue: string;
}

interface NeuralConnectionLinesProps {
  centerX?: number;
  centerY?: number;
  activeSection?: string;
}

export function NeuralConnectionLines({
  centerX = 0,
  centerY = 0,
  activeSection,
}: NeuralConnectionLinesProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const connectionLines: ConnectionLine[] = [
    { id: "about", angle: 0, radius: 190, color: "url(#gradient-cyan)", colorValue: "rgb(0, 217, 255)" },
    { id: "projects", angle: Math.PI * 0.67, radius: 190, color: "url(#gradient-green)", colorValue: "rgb(0, 255, 159)" },
    { id: "experience", angle: Math.PI * 1.33, radius: 180, color: "url(#gradient-purple)", colorValue: "rgb(181, 55, 242)" },
    { id: "skills", angle: Math.PI * 2, radius: 170, color: "url(#gradient-cyan)", colorValue: "rgb(0, 217, 255)" },
    { id: "contact", angle: -Math.PI * 0.67, radius: 180, color: "url(#gradient-green)", colorValue: "rgb(0, 255, 159)" },
    { id: "ai", angle: -Math.PI * 1.33, radius: 170, color: "url(#gradient-purple)", colorValue: "rgb(181, 55, 242)" },
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
          <stop offset="0%" stopColor="rgb(0, 217, 255)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(0, 217, 255)" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(0, 255, 159)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(0, 255, 159)" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(181, 55, 242)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(181, 55, 242)" stopOpacity="0.1" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="neural-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {connectionLines.map((line) => {
        const x2 = centerX + Math.cos(line.angle) * line.radius;
        const y2 = centerY + Math.sin(line.angle) * line.radius;
        const isActive = activeSection === line.id;

        return (
          <g key={line.id}>
            {/* Animated dash pattern */}
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={x2}
              y2={y2}
              stroke={line.colorValue}
              strokeWidth={isActive ? 2.5 : 1.5}
              opacity={isActive ? 0.8 : 0.2}
              strokeDasharray="5,5"
              filter="url(#neural-glow)"
              animate={{
                strokeDashoffset: [0, -10],
                opacity: isActive ? [0.8, 0.95, 0.8] : [0.2, 0.35, 0.2],
              }}
              transition={{
                strokeDashoffset: { duration: isActive ? 2 : 4, repeat: Infinity, ease: "linear" },
                opacity: { duration: isActive ? 2 : 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            {/* Glow layer (outer) */}
            {isActive && (
              <motion.line
                x1={centerX}
                y1={centerY}
                x2={x2}
                y2={y2}
                stroke={line.colorValue}
                strokeWidth={4}
                opacity={0}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
