"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactorState } from "./IntelligenceEngineModel";
import { COMMAND_MODULES, DESKTOP_MODULE_POSITIONS } from "./CommandModuleData";

// =====================================================
// CONNECTOR NETWORK — SVG signal lines between modules and reactor center
// Desktop only — positioned absolutely over the reactor container
// =====================================================

interface ConnectorNetworkProps {
  activeModule: ReactorState | null;
  reducedMotion: boolean;
  /**
   * Production hero: pass `true` once the radial cards are rendered. When
   * defined, connector endpoints dock to the MEASURED reactor-facing edge of
   * each real card (robust to the card's actual on-screen box). When omitted
   * (e.g. the experimental comparison route), the original position-based
   * docking is used unchanged.
   */
  cardsReady?: boolean;
}

// Center of the reactor in percentage space
const REACTOR_CENTER = { x: 50, y: 50 };

// ─────────────────────────────────────────────────────────────────────────
// LEGACY position-based docking (unchanged) — only used when cardsReady is
// undefined, so the shared experimental route keeps its exact prior behavior.
// ─────────────────────────────────────────────────────────────────────────
const CARD_WIDTH_PCT: Record<string, number> = {
  about: 16,
  skills: 17,
  contact: 20,
  terminal: 21,
  projects: 21,
  experience: 23,
};
const CARD_HEIGHT_PCT = 8;
const BREATH_GAP_PCT = 1.2;

function computeDockingLegacy(
  mx: number,
  my: number,
  cardW: number,
  cardH: number
): { endX: number; endY: number } {
  const dx = REACTOR_CENTER.x - mx;
  const dy = REACTOR_CENTER.y - my;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const tx = Math.abs(ux) > 1e-4 ? cardW / 2 / Math.abs(ux) : Infinity;
  const ty = Math.abs(uy) > 1e-4 ? cardH / 2 / Math.abs(uy) : Infinity;
  const edgeDist = Math.min(tx, ty);
  const total = edgeDist + BREATH_GAP_PCT;
  return { endX: mx + ux * total, endY: my + uy * total };
}

type Dock = { x: number; y: number };

export default function ConnectorNetwork({
  activeModule,
  reducedMotion,
  cardsReady,
}: ConnectorNetworkProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [measuredDocks, setMeasuredDocks] = useState<Record<string, Dock>>({});
  const useMeasured = cardsReady !== undefined;

  // Measure each rendered card's true reactor-facing edge and place the dock
  // there. Re-measures when cards appear (cardsReady) and on any container
  // resize, so endpoints stay docked across the approved desktop widths.
  useEffect(() => {
    if (!useMeasured) return;
    const svg = svgRef.current;
    const container = svg?.parentElement;
    if (!container) return;

    let raf = 0;
    const measure = () => {
      const cr = container.getBoundingClientRect();
      if (!cr.width || !cr.height) return;
      const cW = cr.width;
      const cH = cr.height;
      // Tiny docking stub (px) so the port reads as sitting on the card edge.
      const DOCK_GAP_PX = 3;
      const next: Record<string, Dock> = {};
      for (const mod of COMMAND_MODULES) {
        const el = container.querySelector<HTMLElement>(
          `[data-connector-card="${mod.id}"]`
        );
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cx = (r.left + r.right) / 2 - cr.left;
        const cy = (r.top + r.bottom) / 2 - cr.top;
        // Unit vector from the card's real center toward the reactor core.
        let ux = cW / 2 - cx;
        let uy = cH / 2 - cy;
        const L = Math.hypot(ux, uy) || 1;
        ux /= L;
        uy /= L;
        // Distance from card center to the bounding-box edge along that ray —
        // whichever edge (vertical/horizontal) the ray meets first.
        const tx = Math.abs(ux) > 1e-4 ? r.width / 2 / Math.abs(ux) : Infinity;
        const ty = Math.abs(uy) > 1e-4 ? r.height / 2 / Math.abs(uy) : Infinity;
        const edge = Math.min(tx, ty) + DOCK_GAP_PX;
        const dx = cx + ux * edge;
        const dy = cy + uy * edge;
        next[mod.id] = { x: (dx / cW) * 100, y: (dy / cH) * 100 };
      }
      setMeasuredDocks(next);
    };

    measure();
    // One more pass after layout settles (font metrics, reveal transition).
    raf = requestAnimationFrame(measure);

    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [useMeasured, cardsReady]);

  return (
    <svg
      ref={svgRef}
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

        // Resolve the endpoint: measured card edge (production) or legacy.
        let endX: number;
        let endY: number;
        if (useMeasured) {
          const d = measuredDocks[mod.id];
          if (!d) return null; // cards not measured yet → draw nothing for it
          endX = d.x;
          endY = d.y;
        } else {
          const mx = parseFloat(pos.left);
          const my = parseFloat(pos.top);
          const cardW = CARD_WIDTH_PCT[mod.id] ?? 20;
          const docked = computeDockingLegacy(mx, my, cardW, CARD_HEIGHT_PCT);
          endX = docked.endX;
          endY = docked.endY;
        }

        const isActive = activeModule === mod.id;
        const isIdle = !activeModule;

        return (
          <g key={mod.id}>
            {/* Base connector line — terminates at the card-edge dock point */}
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

            {/* Energy pulse — travels from card-edge dock point to core */}
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

            {/* Terminal docking dot — sits precisely where the line meets the
                card edge. Outer ring + inner core for a polished port anchor. */}
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
