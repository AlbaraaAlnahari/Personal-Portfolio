"use client";

import { motion } from "framer-motion";

interface Node {
  id: string;
  angle: number;
  label: string;
  icon: string;
  color: string;
  colorValue: string;
  sectionId: string;
  description: string;
}

const RADIUS = 240;

const NODES: Node[] = [
  {
    id: "ai",
    angle: (270 * Math.PI) / 180,
    label: "Terminal",
    icon: "◲",
    color: "text-accent-purple",
    colorValue: "rgb(181, 55, 242)",
    sectionId: "ai-assistant",
    description: "Ask me anything",
  },
  {
    id: "about",
    angle: (210 * Math.PI) / 180,
    label: "About",
    icon: "◉",
    color: "text-accent-cyan",
    colorValue: "rgb(0, 217, 255)",
    sectionId: "about",
    description: "Who I am",
  },
  {
    id: "experience",
    angle: (330 * Math.PI) / 180,
    label: "Experience",
    icon: "⊢",
    color: "text-accent-purple",
    colorValue: "rgb(181, 55, 242)",
    sectionId: "experience",
    description: "My journey",
  },
  {
    id: "projects",
    angle: (150 * Math.PI) / 180,
    label: "Projects",
    icon: "▥",
    color: "text-accent-green",
    colorValue: "rgb(0, 255, 159)",
    sectionId: "projects",
    description: "What I build",
  },
  {
    id: "skills",
    angle: (30 * Math.PI) / 180,
    label: "Skills",
    icon: "⚛",
    color: "text-accent-cyan",
    colorValue: "rgb(0, 217, 255)",
    sectionId: "skills",
    description: "What I know",
  },
  {
    id: "contact",
    angle: (90 * Math.PI) / 180,
    label: "Contact",
    icon: "⟿",
    color: "text-accent-green",
    colorValue: "rgb(0, 255, 159)",
    sectionId: "contact",
    description: "Let's connect",
  },
];

interface NeuralNavigationNodesProps {
  activeSection?: string;
  hoveredNode?: string | null;
  onHover?: (nodeId: string | null) => void;
}

export function NeuralNavigationNodes({
  activeSection,
  hoveredNode = null,
  onHover,
}: NeuralNavigationNodesProps) {
  const handleHover = (nodeId: string | null) => {
    if (onHover) {
      onHover(nodeId);
    }
  };

  const handleNodeClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate node position from radial coordinates
  const calculatePosition = (angle: number, radius: number) => {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {NODES.map((node) => {
        const isHovered = hoveredNode === node.id;
        const isActive = activeSection === node.sectionId;

        // Pure mathematical positioning in local coordinates
        const { x, y } = calculatePosition(node.angle, RADIUS);

        // Label position (extended further along the same angle)
        const { x: labelX, y: labelY } = calculatePosition(node.angle, RADIUS + 120);

        return (
          <div key={node.id}>
            {/* LARGE HOVER ZONE - Interactive area */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "120px",
                height: "120px",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                pointerEvents: "auto",
                cursor: "pointer",
                zIndex: 50,
              }}
              onMouseEnter={() => handleHover(node.id)}
              onMouseLeave={() => handleHover(null)}
              onClick={() => handleNodeClick(node.sectionId)}
            />

            {/* NODE VISUAL */}
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "56px",
                height: "56px",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              animate={{
                y: [0, 2, 0],
                scale: isHovered ? 1.4 : 1,
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
            >
              {/* NODE CIRCLE */}
              <div
                className={`absolute inset-0 rounded-full border-2 flex items-center justify-center pointer-events-none transition-all ${
                  isHovered ? "border-current" : "border-current/50"
                } ${node.color}`}
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                {/* BREATHING GLOW */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, currentColor 0%, transparent 70%)`,
                  }}
                  animate={{
                    opacity: isHovered ? 0.4 : 0.12,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* ICON */}
                <motion.span
                  className="text-2xl font-bold relative z-10 pointer-events-none"
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                  }}
                  animate={{
                    scale: isHovered ? 1.25 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {node.icon}
                </motion.span>

                {/* PULSE RING */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    borderWidth: "1px",
                    borderColor: "currentColor",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />

                {/* ACTIVE INDICATOR */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-current pointer-events-none"
                    animate={{
                      boxShadow: [
                        `0 0 15px ${node.colorValue}`,
                        `0 0 30px ${node.colorValue}`,
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
              </div>
            </motion.div>

            {/* CONNECTOR LINE - Shows on hover */}
            {isHovered && (
              <motion.svg
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  overflow: "visible",
                  transform: "translate(-50%, -50%)",
                  zIndex: 30,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <line
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  stroke={node.colorValue}
                  strokeWidth="1.5"
                  opacity="0.5"
                  strokeDasharray="4,4"
                  style={{
                    animation: `dash 15s linear infinite`,
                  }}
                />
              </motion.svg>
            )}

            {/* LABEL - Independent positioning */}
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${labelX}px), calc(-50% + ${labelY}px))`,
                pointerEvents: "none",
                zIndex: isHovered ? 100 : 10,
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
            >
              <div
                className="px-3 py-2 rounded-lg font-mono text-sm whitespace-nowrap backdrop-blur-md border select-none cursor-default"
                style={{
                  background: `linear-gradient(135deg, rgba(${node.colorValue.match(/\d+/g)?.join(", ")}, 0.15) 0%, rgba(${node.colorValue.match(/\d+/g)?.join(", ")}, 0.05) 100%), rgba(10, 14, 39, 0.9)`,
                  border: `1px solid ${node.colorValue}80`,
                  boxShadow: `0 0 20px ${node.colorValue}30, inset 0 1px 2px rgba(255, 255, 255, 0.15)`,
                  color: node.colorValue,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <div className="font-semibold">{node.label}</div>
                <div className="text-xs mt-1 opacity-70">{node.description}</div>
              </div>
            </motion.div>
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
