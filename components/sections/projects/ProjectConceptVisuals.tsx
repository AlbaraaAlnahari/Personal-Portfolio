"use client";

// =====================================================
// PROJECT CONCEPT VISUALS — in-code interface abstractions
// for projects without a real product screenshot. These
// are clearly stylized system illustrations (never fake
// screenshots). Decorative + aria-hidden; static by design
// (no continuous animation) with a calm hover brighten.
// =====================================================

// ── Sanadk: Accessibility Guidance Signal / Inclusive Mobility Route ──
export function SanadkConceptVisual({ rgb = "0, 217, 255" }: { rgb?: string }) {
  const c = `rgb(${rgb})`;
  return (
    <div
      className="relative w-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 172" className="w-full h-auto" fill="none">
        {/* accessibility mode chips — guidance signal sources */}
        <g opacity="0.92">
          {/* wheelchair mode */}
          <rect x="14" y="12" width="46" height="30" rx="7" fill={`rgba(${rgb},0.06)`} stroke={`rgba(${rgb},0.4)`} strokeWidth="1" />
          <circle cx="31" cy="29" r="6.5" stroke={c} strokeWidth="1.3" opacity="0.85" />
          <circle cx="31" cy="29" r="1.6" fill={c} />
          <path d="M31 20.5 v4 M31 24.5 h6 l2 5" stroke={c} strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
          {/* voice / audio cue mode */}
          <rect x="70" y="12" width="46" height="30" rx="7" fill={`rgba(${rgb},0.06)`} stroke={`rgba(${rgb},0.4)`} strokeWidth="1" />
          <circle cx="88" cy="27" r="3.4" stroke={c} strokeWidth="1.3" opacity="0.85" />
          <path d="M95 21 a8 8 0 0 1 0 12 M99 17 a13 13 0 0 1 0 20" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* signal feeds — connect the mode sources down into the route */}
        <path d="M37 42 V96" stroke={`rgba(${rgb},0.28)`} strokeWidth="1" strokeDasharray="2 4" />
        <path d="M93 42 C 93 70, 118 78, 124 100" stroke={`rgba(${rgb},0.24)`} strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="37" cy="98" r="2" fill={`rgba(${rgb},0.55)`} />
        <circle cx="125" cy="102" r="2" fill={`rgba(${rgb},0.5)`} />

        {/* corridor guide lines */}
        <path d="M26 110 C 110 86, 160 150, 292 98" stroke={`rgba(${rgb},0.14)`} strokeWidth="1" strokeDasharray="2 5" />
        <path d="M26 126 C 110 102, 160 166, 292 114" stroke={`rgba(${rgb},0.14)`} strokeWidth="1" strokeDasharray="2 5" />

        {/* primary mobility route — origin → assisted navigation → arrival */}
        <path d="M30 118 C 110 94, 160 158, 286 106" stroke={c} strokeWidth="1.8" opacity="0.75" />

        {/* directional markers along the route */}
        <path d="M104 113 l7 2 l-6 4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" fill="none" />
        <path d="M236 120 l7 -1 l-5 -5" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" fill="none" />

        {/* origin node */}
        <circle cx="30" cy="118" r="6" fill={`rgba(${rgb},0.12)`} stroke={c} strokeWidth="1.4" />
        <circle cx="30" cy="118" r="2" fill={c} />
        <text x="30" y="140" textAnchor="middle" fontSize="6.5" fontFamily="ui-monospace, monospace" letterSpacing="1.4" fill={`rgba(${rgb},0.5)`}>
          ORIGIN
        </text>

        {/* assisted-navigation waypoint + guidance signal arcs */}
        <circle cx="160" cy="128" r="3.4" fill={c} opacity="0.9" />
        <path d="M168 119 a12 12 0 0 1 0 18 M173 113 a19 19 0 0 1 0 30" stroke={c} strokeWidth="1.1" opacity="0.45" strokeLinecap="round" />
        <text x="150" y="152" textAnchor="middle" fontSize="6.5" fontFamily="ui-monospace, monospace" letterSpacing="1.2" fill={`rgba(${rgb},0.42)`}>
          ASSISTED
        </text>

        {/* destination — confirmed assisted arrival */}
        <circle cx="286" cy="106" r="14" fill="none" stroke={`rgba(${rgb},0.25)`} strokeWidth="1" />
        <circle cx="286" cy="106" r="9.5" fill={`rgba(${rgb},0.16)`} stroke={c} strokeWidth="1.7" />
        <path d="M281 106 l3.2 3.2 l6.4 -7" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <text x="286" y="134" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1.5" fill={`rgba(${rgb},0.65)`}>
          ARRIVED
        </text>
      </svg>
    </div>
  );
}

// ── Slide-Mind: Knowledge Distillation Engine / Flashcard Generation ──
export function SlideMindConceptVisual({ rgb = "181, 55, 242" }: { rgb?: string }) {
  const c = `rgb(${rgb})`;
  return (
    <div
      className="relative w-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 172" className="w-full h-auto" fill="none">
        {/* SOURCE — slide / document */}
        <rect x="16" y="46" width="74" height="86" rx="6" fill={`rgba(${rgb},0.05)`} stroke={`rgba(${rgb},0.4)`} strokeWidth="1.2" />
        <rect x="28" y="58" width="40" height="5" rx="2" fill={`rgba(${rgb},0.7)`} />
        {[72, 82, 92, 102, 112].map((y, i) => (
          <rect key={y} x="28" y={y} width={i % 2 ? 34 : 50} height="3.2" rx="1.6" fill="rgba(160,170,205,0.3)" />
        ))}
        <text x="53" y="146" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1.2" fill={`rgba(${rgb},0.55)`}>
          SOURCE
        </text>

        {/* distillation flow into the core */}
        <path d="M94 89 H132" stroke={`rgba(${rgb},0.45)`} strokeWidth="1.2" strokeDasharray="2 4" />
        <path d="M126 85 l6 4 l-6 4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* AI DISTILLATION CORE — hex with spark */}
        <path d="M160 66 l20 11.5 v23 l-20 11.5 l-20 -11.5 v-23 Z" fill={`rgba(${rgb},0.08)`} stroke={c} strokeWidth="1.4" />
        <path d="M160 81 v16 M152 89 h16 M154.5 83.5 l11 11 M165.5 83.5 l-11 11" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
        <text x="160" y="128" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1.2" fill={`rgba(${rgb},0.6)`}>
          AI DISTILL
        </text>

        {/* generation flow to cards */}
        <path d="M182 89 H214" stroke={`rgba(${rgb},0.45)`} strokeWidth="1.2" strokeDasharray="2 4" />
        <path d="M208 85 l6 4 l-6 4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* OUTPUT — generated flashcard stack */}
        <rect x="232" y="58" width="66" height="44" rx="6" fill="rgba(12,16,40,0.6)" stroke={`rgba(${rgb},0.25)`} strokeWidth="1" opacity="0.6" transform="rotate(-6 265 80)" />
        <rect x="230" y="64" width="66" height="44" rx="6" fill={`rgba(${rgb},0.06)`} stroke={c} strokeWidth="1.3" />
        <line x1="240" y1="86" x2="286" y2="86" stroke={`rgba(${rgb},0.35)`} strokeWidth="1" strokeDasharray="3 3" />
        <rect x="240" y="72" width="30" height="4" rx="2" fill={`rgba(${rgb},0.6)`} />
        <rect x="240" y="92" width="40" height="3.4" rx="1.7" fill="rgba(160,170,205,0.3)" />
        <rect x="240" y="99.5" width="24" height="3.4" rx="1.7" fill="rgba(160,170,205,0.22)" />
        <text x="263" y="124" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1.2" fill={`rgba(${rgb},0.6)`}>
          FLASHCARDS
        </text>
      </svg>
    </div>
  );
}
