"use client";


import type { ReactorState } from "./IntelligenceEngineModel";
import { COMMAND_MODULES, DESKTOP_MODULE_POSITIONS } from "./CommandModuleData";

// =====================================================
// CONNECTOR NETWORK — SVG signal lines between modules and reactor center
// Desktop only — positioned absolutely over the reactor container
// =====================================================

interface ConnectorNetworkProps {
  activeModule: ReactorState | null;
  reducedMotion: boolean;
}

// Center of the reactor in percentage space
const REACTOR_CENTER = { x: 50, y: 50 };

// Approximate card dimensions as percentage of the (square) reactor container.
// Cards are centered at their position via translate(-50%, -50%), so to make
// the connector visibly DOCK at the card's inner-facing edge we compute the
// line/box intersection and pull back by a small breathing gap.
// Per-module widths because labels vary in length (EXPERIENCE wider than ABOUT).
const CARD_WIDTH_PCT: Record<string, number> = {
  about: 16,
  skills: 17,
  contact: 20,
  terminal: 21,
  projects: 21,
  experience: 23,
};
const CARD_HEIGHT_PCT = 8;
// Visible breathing gap between line tip and card body — ~7px on a 620px container
const BREATH_GAP_PCT = 1.2;

function computeDocking(
  mx: number,
  my: number,
  cardW: number,
  cardH: number
): { endX: number; endY: number; ux: number; uy: number } {
  // Direction unit vector from card center toward reactor center
  const dx = REACTOR_CENTER.x - mx;
  const dy = REACTOR_CENTER.y - my;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  // Distance from card center to its bounding-box edge along (ux, uy).
  // Whichever of horizontal/vertical edge intersects first wins —
  // this naturally picks the card's nearest inner-facing edge.
  const tx = Math.abs(ux) > 1e-4 ? cardW / 2 / Math.abs(ux) : Infinity;
  const ty = Math.abs(uy) > 1e-4 ? cardH / 2 / Math.abs(uy) : Infinity;
  const edgeDist = Math.min(tx, ty);

  // Line endpoint sits OUTSIDE the card by BREATH_GAP_PCT (toward reactor)
  const total = edgeDist + BREATH_GAP_PCT;
  return {
    endX: mx + ux * total,
    endY: my + uy * total,
    ux,
    uy,
  };
}

export default function ConnectorNetwork({
  activeModule,
  reducedMotion,
}: ConnectorNetworkProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {COMMAND_MODULES.map((mod) => (
          <linearGradient
            key={`grad-${mod.id}`}
            id={`connector-grad-${mod.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={mod.accentColor} stopOpacity="0.6" />
            <stop offset="50%" stopColor={mod.accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.1" />
          </linearGradient>
        ))}
      </defs>

      {COMMAND_MODULES.map((mod) => {
        const pos = DESKTOP_MODULE_POSITIONS[mod.id];
        if (!pos) return null;

        // Parse position percentages to get module center
        const mx = parseFloat(pos.left);
        const my = parseFloat(pos.top);
        const cardW = CARD_WIDTH_PCT[mod.id] ?? 20;
        const { endX, endY } = computeDocking(mx, my, cardW, CARD_HEIGHT_PCT);

        const isActive = activeModule === mod.id;
        const isIdle = !activeModule;

        return (
          <g key={mod.id}>
            {/* Base connector line — terminates at card-edge docking point,
                NOT the card center, so each card visibly docks at its line tip */}
            <line
              x1={endX}
              y1={endY}
              x2={REACTOR_CENTER.x}
              y2={REACTOR_CENTER.y}
              stroke={mod.accentColor}
              strokeWidth="0.15"
              opacity={isActive ? 0.5 : isIdle ? 0.08 : 0.03}
              style={{
                transition: reducedMotion ? "none" : "opacity 400ms ease",
              }}
            />

            {/* Active connector — brighter, with gradient */}
            {isActive && (
              <line
                x1={endX}
                y1={endY}
                x2={REACTOR_CENTER.x}
                y2={REACTOR_CENTER.y}
                stroke={`url(#connector-grad-${mod.id})`}
                strokeWidth="0.3"
                opacity={0.7}
                style={{
                  filter: `drop-shadow(0 0 2px ${mod.accentGlow})`,
                }}
              />
            )}

            {/* Energy pulse — travels from card-edge docking point to core */}
            {isActive && !reducedMotion && (
              <circle r="0.8" fill={mod.accentColor} opacity="0.8">
                <animateMotion
                  dur="0.8s"
                  repeatCount="1"
                  path={`M${endX},${endY} L${REACTOR_CENTER.x},${REACTOR_CENTER.y}`}
                  fill="freeze"
                />
                <animate
                  attributeName="opacity"
                  values="0.9;0.6;0"
                  dur="0.8s"
                  fill="freeze"
                />
                <animate
                  attributeName="r"
                  values="0.8;0.4;0.1"
                  dur="0.8s"
                  fill="freeze"
                />
              </circle>
            )}

            {/* Terminal docking dot — sits precisely where the line meets
                the card edge. Outer ring + inner core for a polished
                "this card is docked here" anchor point. */}
            <circle
              cx={endX}
              cy={endY}
              r={isActive ? 1.0 : 0.55}
              fill="none"
              stroke={isActive ? mod.accentColor : "rgba(0,217,255,0.55)"}
              strokeWidth={isActive ? 0.18 : 0.12}
              opacity={isActive ? 0.9 : isIdle ? 0.5 : 0.2}
              style={{
                transition: reducedMotion ? "none" : "all 350ms ease",
                filter: isActive
                  ? `drop-shadow(0 0 2px ${mod.accentGlow})`
                  : "drop-shadow(0 0 0.6px rgba(0,217,255,0.35))",
              }}
            />
            <circle
              cx={endX}
              cy={endY}
              r={isActive ? 0.45 : 0.28}
              fill={isActive ? mod.accentColor : "rgba(0,217,255,0.6)"}
              opacity={isActive ? 1.0 : isIdle ? 0.7 : 0.25}
              style={{
                transition: reducedMotion ? "none" : "all 350ms ease",
                filter: isActive
                  ? `drop-shadow(0 0 1.5px ${mod.accentGlow})`
                  : undefined,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
