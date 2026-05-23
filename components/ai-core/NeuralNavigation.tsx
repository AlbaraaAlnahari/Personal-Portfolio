"use client";

import { useState, useEffect } from "react";
import {
  TerminalSquare,
  Briefcase,
  Code2,
  Send,
  Layers,
  User,
} from "lucide-react";
import { AboutNodePreview } from "./AboutNodePreview";

interface NavNode {
  id: string;
  label: string;
  description: string;
  x: number; // direct x offset from center (pixels)
  y: number; // direct y offset from center (pixels)
  sectionId: string;
  icon: React.ReactNode;
  color: string;
  colorValue: string;
  scale: number; // visual scale (0.82 = 82% of normal size)
  glowIntensity?: number; // glow strength (0.5 = subtle, 0.7 = normal)
  labelPlacement?: "right" | "left" | "above";
}

const NODES: NavNode[] = [
  {
    id: "ai-terminal",
    label: "AI Terminal",
    description: "Ask me anything",
    x: 0,
    y: -235,
    sectionId: "ai-assistant",
    icon: <TerminalSquare className="w-5 h-5" />,
    color: "text-accent-purple",
    colorValue: "rgb(181, 55, 242)",
    scale: 0.92,
    glowIntensity: 0.7,
    labelPlacement: "right",
  },
  {
    id: "about",
    label: "About",
    description: "Who I am",
    x: -295,
    y: -120,
    sectionId: "about",
    icon: <User className="w-5 h-5" />,
    color: "text-accent-cyan",
    colorValue: "rgb(0, 217, 255)",
    scale: 0.88,
    glowIntensity: 0.6,
    labelPlacement: "right",
  },
  {
    id: "experience",
    label: "Experience",
    description: "My journey",
    x: 290,
    y: -125,
    sectionId: "experience",
    icon: <Briefcase className="w-5 h-5" />,
    color: "text-accent-purple",
    colorValue: "rgb(181, 55, 242)",
    scale: 0.88,
    glowIntensity: 0.65,
    labelPlacement: "left",
  },
  {
    id: "projects",
    label: "Projects",
    description: "What I build",
    x: -290,
    y: 145,
    sectionId: "projects",
    icon: <Layers className="w-5 h-5" />,
    color: "text-accent-green",
    colorValue: "rgb(0, 255, 159)",
    scale: 0.88,
    glowIntensity: 0.65,
    labelPlacement: "right",
  },
  {
    id: "skills",
    label: "Skills",
    description: "What I know",
    x: 290,
    y: 140,
    sectionId: "skills",
    icon: <Code2 className="w-5 h-5" />,
    color: "text-accent-cyan",
    colorValue: "rgb(0, 217, 255)",
    scale: 0.88,
    glowIntensity: 0.55,
    labelPlacement: "left",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Let's connect",
    x: 0,
    y: 235,
    sectionId: "contact",
    icon: <Send className="w-5 h-5" />,
    color: "text-accent-green",
    colorValue: "rgb(0, 255, 159)",
    scale: 0.82,
    glowIntensity: 0.55,
    labelPlacement: "right",
  },
];


interface NeuralNavigationProps {
  isVisible?: boolean;
}

export function NeuralNavigation({ isVisible = true }: NeuralNavigationProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Responsive sizing
  const overlaySize = isMobile ? 360 : 640;
  const overlayCenter = overlaySize / 2;

  const handleNodeClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="absolute left-1/2 top-1/2 pointer-events-none overflow-visible hidden md:block"
      style={{
        width: `${overlaySize}px`,
        height: `${overlaySize}px`,
        transform: "translate(-50%, -50%)",
        zIndex: 5,
      }}
    >
      {/* Connection lines SVG layer */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{
          width: overlaySize,
          height: overlaySize,
          overflow: "visible",
        }}
      >
        {NODES.map((node) => {
          if (hoveredNode !== node.id) return null;

          const svgX = overlayCenter + node.x;
          const svgY = overlayCenter + node.y;

          return (
            <line
              key={`line-${node.id}`}
              x1={overlayCenter}
              y1={overlayCenter}
              x2={svgX}
              y2={svgY}
              stroke={node.colorValue}
              strokeWidth="1.5"
              opacity="0.5"
              strokeDasharray="4,4"
              style={{
                animation: `dash 15s linear infinite`,
              }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {NODES.map((node) => {
        const x = node.x;
        const y = node.y;
        const isHovered = hoveredNode === node.id;
        const scale = node.scale;
        const glowIntensity = node.glowIntensity || 0.7;
        const nodeSize = 56 * scale;
        const labelPlacement = node.labelPlacement || "right";

        // Label position classes based on placement direction
        const labelPositionClasses = {
          right: "left-[calc(100%+16px)] top-1/2 -translate-y-1/2",
          left: "right-[calc(100%+16px)] top-1/2 -translate-y-1/2",
          above: "bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2",
        };

        return (
          <div
            key={node.id}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              width: "120px",
              height: "120px",
            }}
          >
            {/* About Node Preview - only for About node */}
            {node.id === "about" && (
              <AboutNodePreview isVisible={isHovered} position={{ side: "right" }} />
            )}
            {/* Hover hitbox */}
            <button
              className="absolute inset-0 rounded-full pointer-events-auto cursor-pointer"
              style={{
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
                zIndex: 40,
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(node.sectionId)}
              aria-label={node.label}
            />

            {/* Node visual */}
            <div
              className={`absolute rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                node.color
              } ${isHovered ? "scale-125" : "scale-100"}`}
              style={{
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                borderColor: isHovered ? node.colorValue : `${node.colorValue}80`,
                backgroundColor: "rgba(10, 14, 39, 0.6)",
                backdropFilter: "blur(8px)",
                boxShadow: isHovered
                  ? `0 0 ${20 * glowIntensity}px ${node.colorValue}60`
                  : `0 0 ${12 * glowIntensity}px ${node.colorValue}30`,
                zIndex: 30,
              }}
            >
              {/* Glow background */}
              <div
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle, ${node.colorValue} 0%, transparent 70%)`,
                  opacity: isHovered ? 0.3 * glowIntensity : 0,
                }}
              />

              {/* Icon */}
              <span className="relative z-10">{node.icon}</span>
            </div>

            {/* Label - locally positioned relative to node */}
            {isHovered && (
              <div
                className={`absolute pointer-events-none whitespace-nowrap ${labelPositionClasses[labelPlacement as keyof typeof labelPositionClasses]}`}
                style={{
                  zIndex: 35,
                }}
              >
                <div
                  className="px-3 py-2 rounded-lg font-mono text-xs backdrop-blur-md border"
                  style={{
                    backgroundColor: "rgba(10, 14, 39, 0.9)",
                    borderColor: `${node.colorValue}80`,
                    color: node.colorValue,
                    boxShadow: `0 0 20px ${node.colorValue}30, inset 0 1px 2px rgba(255, 255, 255, 0.15)`,
                  }}
                >
                  <div className="font-semibold text-sm">{node.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{node.description}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -10;
          }
        }
      `}</style>
    </div>
  );
}
