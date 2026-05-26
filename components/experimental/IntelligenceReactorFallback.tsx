"use client";

/**
 * Pure-SVG fallback for the Intelligence Reactor.
 * Used on mobile (no WebGL cost) and when prefers-reduced-motion is set.
 * Renders a stylized 2D reactor silhouette in the same color language.
 */
export function IntelligenceReactorFallback({
  animated = true,
}: {
  animated?: boolean;
}) {
  // Static positions for 11 shell panels around the core
  const shells = [
    { x: 0, y: -120, w: 56, h: 42, r: -8 },
    { x: 92, y: -78, w: 50, h: 38, r: 38 },
    { x: 122, y: 0, w: 56, h: 44, r: 90 },
    { x: 92, y: 78, w: 48, h: 36, r: 122 },
    { x: 0, y: 120, w: 60, h: 44, r: 180 },
    { x: -92, y: 78, w: 50, h: 38, r: -122 },
    { x: -122, y: 0, w: 56, h: 44, r: -90 },
    { x: -92, y: -78, w: 48, h: 36, r: -38 },
    { x: 55, y: -55, w: 38, h: 32, r: 20 },
    { x: -55, y: 55, w: 38, h: 32, r: 200 },
    { x: 55, y: 55, w: 36, h: 30, r: 145 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="-200 -200 400 400"
        className="w-full h-full max-w-[480px] max-h-[480px]"
        aria-label="Intelligence Reactor"
      >
        <defs>
          <radialGradient id="reactor-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d9ff" stopOpacity="1" />
            <stop offset="50%" stopColor="#00d9ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#b537f2" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="reactor-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#b537f2" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0a0e27" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="seam-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00d9ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient halo */}
        <circle cx="0" cy="0" r="170" fill="url(#reactor-halo)" />

        {/* Energy seams - simple arcs */}
        <path
          d="M -122 0 Q 0 -160 122 0"
          fill="none"
          stroke="url(#seam-cyan)"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <path
          d="M 0 -120 Q 160 0 0 120"
          fill="none"
          stroke="url(#seam-cyan)"
          strokeWidth="1.5"
          opacity="0.45"
        />
        <path
          d="M -92 -78 Q 0 0 92 78"
          fill="none"
          stroke="#b537f2"
          strokeWidth="1"
          opacity="0.35"
          strokeDasharray="3,4"
        />

        {/* Shell panels */}
        {shells.map((s, i) => (
          <rect
            key={i}
            x={-s.w / 2}
            y={-s.h / 2}
            width={s.w}
            height={s.h}
            rx="6"
            fill="#1c1f33"
            stroke="#2a2e48"
            strokeWidth="1"
            opacity="0.92"
            transform={`translate(${s.x}, ${s.y}) rotate(${s.r})`}
          />
        ))}

        {/* Subtle edge highlights on shell panels */}
        {shells.slice(0, 6).map((s, i) => (
          <line
            key={`hl-${i}`}
            x1={-s.w / 2 + 4}
            y1={-s.h / 2}
            x2={s.w / 2 - 4}
            y2={-s.h / 2}
            stroke="#00d9ff"
            strokeWidth="0.8"
            opacity="0.35"
            transform={`translate(${s.x}, ${s.y}) rotate(${s.r})`}
          />
        ))}

        {/* Inner core */}
        <circle
          cx="0"
          cy="0"
          r="44"
          fill="url(#reactor-core)"
          opacity="0.92"
        >
          {animated && (
            <animate
              attributeName="r"
              values="44;48;44"
              dur="6s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Core inner glow */}
        <circle cx="0" cy="0" r="22" fill="#ffffff" opacity="0.55">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.7;0.4"
              dur="6s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </svg>
    </div>
  );
}
