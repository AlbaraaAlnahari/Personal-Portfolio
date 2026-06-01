"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

// =====================================================
// PROJECT CONCEPT VISUALS — in-code product-system diagrams
// for projects without a real product screenshot. These are
// clearly stylized system illustrations (never fake
// screenshots). Decorative + aria-hidden; static by design
// (no continuous animation) with a calm hover brighten.
//
// Shared rules: accent-tinted / transparent fills only (never
// a dark navy fill that would read muddy on the warm cream
// surface), consistent stroke weights and label scale, and
// Arabic-friendly label rendering (own font, no letter-spacing
// — mono tracking breaks the cursive join). Centered labels so
// RTL never collides with nodes.
// =====================================================

/** Per-language label rendering tuned for SVG <text>. */
function useDiagramLabels() {
  const { isAr } = useLanguage();
  return {
    labelFont: isAr ? "inherit" : ("ui-monospace, monospace" as const),
    lsp: isAr ? 0 : 1.1,
    lw: isAr ? 600 : 400,
  };
}

// ── TechPath: AI-generated adaptive learning roadmap ──
// A progress-tracked roadmap line with four checkpoints
// (assess → plan → resources → follow-up), an active node, a
// resource/link marker, a follow-up marker, and a progress
// indicator. Communicates "generated roadmap with checkpoints".
export function TechPathConceptVisual({ rgb = "var(--rgb-green)" }: { rgb?: string }) {
  const { t } = useLanguage();
  const cv = t.work.conceptVisual.techpath;
  const c = `rgb(${rgb})`;
  const { labelFont, lsp, lw } = useDiagramLabels();

  const Y = 60;
  const nodes = [
    { x: 42, label: cv.assess },
    { x: 122, label: cv.plan },
    { x: 202, label: cv.resources, active: true },
    { x: 282, label: cv.followup, upcoming: true },
  ];
  const activeX = 202;

  return (
    <div
      className="relative w-full opacity-95 group-hover:opacity-100 transition-opacity duration-500"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 104" className="w-full h-auto" fill="none">
        {/* progress indicator — label + 3-segment bar (2 of 3 complete) */}
        <text x="40" y="18" textAnchor="middle" fontSize="9" fontFamily={labelFont} fontWeight={lw} letterSpacing={lsp} fill={`rgba(${rgb},0.85)`}>
          {cv.progress}
        </text>
        <rect x="16" y="25" width="48" height="5" rx="2.5" fill={`rgba(${rgb},0.14)`} />
        <rect x="16" y="25" width="31" height="5" rx="2.5" fill={`rgba(${rgb},0.8)`} />

        {/* roadmap baseline — solid through the active node, dashed beyond */}
        <line x1="26" y1={Y} x2={activeX} y2={Y} stroke={c} strokeWidth="2" opacity="0.72" strokeLinecap="round" />
        <line x1={activeX} y1={Y} x2="296" y2={Y} stroke={`rgba(${rgb},0.32)`} strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />

        {/* resource / link marker above the resources checkpoint */}
        <g opacity="0.7">
          <circle cx="199" cy="40" r="2.4" stroke={c} strokeWidth="1.2" />
          <circle cx="205" cy="40" r="2.4" stroke={c} strokeWidth="1.2" />
        </g>
        {/* daily follow-up marker (calendar dots) above the follow-up checkpoint */}
        <g opacity="0.6" fill={c}>
          <circle cx="278" cy="39" r="1" />
          <circle cx="283" cy="39" r="1" />
          <circle cx="278" cy="43" r="1" />
          <circle cx="283" cy="43" r="1" />
        </g>

        {/* checkpoints */}
        {nodes.map((n) => (
          <g key={n.x}>
            {n.active && (
              <circle cx={n.x} cy={Y} r="10.5" fill="none" stroke={`rgba(${rgb},0.28)`} strokeWidth="1" />
            )}
            <circle
              cx={n.x}
              cy={Y}
              r={n.active ? 7 : 5.5}
              fill={n.active ? `rgba(${rgb},0.18)` : n.upcoming ? `rgba(${rgb},0.05)` : `rgba(${rgb},0.1)`}
              stroke={n.upcoming ? `rgba(${rgb},0.5)` : c}
              strokeWidth={n.active ? 1.8 : 1.6}
            />
            <circle cx={n.x} cy={Y} r={n.active ? 2.3 : 1.7} fill={n.upcoming ? `rgba(${rgb},0.55)` : c} />
            <text x={n.x} y="82" textAnchor="middle" fontSize="9" fontFamily={labelFont} fontWeight={lw} letterSpacing={lsp} fill={`rgba(${rgb},${n.upcoming ? 0.7 : 0.88})`}>
              {n.label}
            </text>
          </g>
        ))}

        {/* assessment check inside the first checkpoint */}
        <path d="M38.5 60 l2.2 2.4 l4.2 -4.8" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}

// ── Sanadk: accessible shopping + navigation support ──
// Two feature lanes: (1) product recognition → voice guidance
// for visually-impaired shopping; (2) wheelchair-friendly route
// → accessible arrival. Teal identity.
export function SanadkConceptVisual({ rgb = "var(--rgb-cyan)" }: { rgb?: string }) {
  const { t } = useLanguage();
  const cv = t.work.conceptVisual.sanadk;
  const c = `rgb(${rgb})`;
  const { labelFont, lsp, lw } = useDiagramLabels();

  return (
    <div
      className="relative w-full opacity-95 group-hover:opacity-100 transition-opacity duration-500"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 178" className="w-full h-auto" fill="none">
        {/* ── LANE 1 — shopping: product recognition → voice guidance ── */}
        {/* product recognition: a scanned product */}
        <rect x="22" y="22" width="30" height="24" rx="3.5" fill={`rgba(${rgb},0.07)`} stroke={c} strokeWidth="1.3" />
        <rect x="29" y="29" width="16" height="3.4" rx="1.7" fill={`rgba(${rgb},0.6)`} />
        <rect x="29" y="35.5" width="11" height="3" rx="1.5" fill="rgba(150,165,205,0.32)" />
        {/* scan corner brackets */}
        <g stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
          <path d="M16 26 v-4 h4" />
          <path d="M58 26 v-4 h-4" />
          <path d="M16 42 v4 h4" />
          <path d="M58 42 v4 h-4" />
        </g>
        {/* recognition scan sweep */}
        <line x1="20" y1="34" x2="54" y2="34" stroke={c} strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />

        {/* flow → voice */}
        <path d="M64 34 H92" stroke={`rgba(${rgb},0.4)`} strokeWidth="1.2" strokeDasharray="2 3" />
        <path d="M87 30 l5 4 l-5 4" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* voice guidance: speaker + sound waves */}
        <path d="M100 28 h6 l8 -6 v24 l-8 -6 h-6 Z" fill={`rgba(${rgb},0.1)`} stroke={c} strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M120 24 a9 9 0 0 1 0 20 M125 19 a15 15 0 0 1 0 30" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

        {/* lane 1 labels */}
        <text x="37" y="62" textAnchor="middle" fontSize="8.5" fontFamily={labelFont} fontWeight={lw} letterSpacing={lsp} fill={`rgba(${rgb},0.85)`}>
          {cv.product}
        </text>
        <text x="116" y="62" textAnchor="middle" fontSize="8.5" fontFamily={labelFont} fontWeight={lw} letterSpacing={lsp} fill={`rgba(${rgb},0.85)`}>
          {cv.voice}
        </text>

        {/* lane divider */}
        <line x1="14" y1="84" x2="306" y2="84" stroke={`rgba(${rgb},0.14)`} strokeWidth="1" strokeDasharray="3 6" />

        {/* ── LANE 2 — accessible navigation: wheelchair → route → arrival ── */}
        {/* wheelchair origin */}
        <circle cx="30" cy="120" r="7.5" fill={`rgba(${rgb},0.1)`} stroke={c} strokeWidth="1.4" />
        <circle cx="30" cy="120" r="3.4" stroke={c} strokeWidth="1.2" />
        <path d="M30 113 v3.5 M30 116.5 h5 l1.6 4" stroke={c} strokeWidth="1.2" strokeLinecap="round" />

        {/* wheelchair-friendly route */}
        <path d="M40 122 C 120 102, 180 152, 278 116" stroke={c} strokeWidth="1.8" opacity="0.8" strokeLinecap="round" />
        {/* direction chevrons */}
        <path d="M108 118 l6 2 l-5 3.5" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" fill="none" />
        <path d="M214 124 l6 -1 l-4.5 -4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" fill="none" />

        {/* mid waypoint + guidance arcs */}
        <circle cx="156" cy="130" r="3.6" fill={c} opacity="0.9" />
        <path d="M164 122 a11 11 0 0 1 0 16 M169 117 a17 17 0 0 1 0 26" stroke={c} strokeWidth="1.1" opacity="0.4" strokeLinecap="round" />

        {/* accessible destination */}
        <circle cx="286" cy="114" r="13" fill="none" stroke={`rgba(${rgb},0.25)`} strokeWidth="1" />
        <circle cx="286" cy="114" r="9" fill={`rgba(${rgb},0.16)`} stroke={c} strokeWidth="1.7" />
        <path d="M281 114 l3 3 l6 -6.5" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />

        {/* lane 2 labels */}
        <text x="150" y="158" textAnchor="middle" fontSize="8.5" fontFamily={labelFont} fontWeight={lw} letterSpacing={lsp} fill={`rgba(${rgb},0.8)`}>
          {cv.route}
        </text>
        <text x="286" y="142" textAnchor="middle" fontSize="8.5" fontFamily={labelFont} fontWeight={lw} letterSpacing={lsp} fill={`rgba(${rgb},0.88)`}>
          {cv.arrived}
        </text>
      </svg>
    </div>
  );
}

// ── Slide-Mind: educational content → AI analysis → cards + quiz ──
// Source content distilled by an AI core into a flashcard plus a
// short quiz / understanding check. Purple identity.
export function SlideMindConceptVisual({ rgb = "var(--rgb-purple)" }: { rgb?: string }) {
  const { t } = useLanguage();
  const cv = t.work.conceptVisual.slidemind;
  const c = `rgb(${rgb})`;
  const { labelFont, lsp, lw } = useDiagramLabels();

  return (
    <div
      className="relative w-full opacity-95 group-hover:opacity-100 transition-opacity duration-500"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 176" className="w-full h-auto" fill="none">
        {/* SOURCE — educational content */}
        <rect x="14" y="44" width="62" height="84" rx="6" fill={`rgba(${rgb},0.05)`} stroke={`rgba(${rgb},0.4)`} strokeWidth="1.2" />
        <rect x="24" y="55" width="34" height="5" rx="2" fill={`rgba(${rgb},0.7)`} />
        {[68, 78, 88, 98, 108].map((y, i) => (
          <rect key={y} x="24" y={y} width={i % 2 ? 30 : 42} height="3.2" rx="1.6" fill="rgba(150,165,205,0.32)" />
        ))}
        <text x="45" y="150" textAnchor="middle" fontSize="8.5" fontFamily={labelFont} fontWeight={lw} letterSpacing={lsp} fill={`rgba(${rgb},0.82)`}>
          {cv.source}
        </text>

        {/* flow into the AI core */}
        <path d="M80 86 H120" stroke={`rgba(${rgb},0.45)`} strokeWidth="1.2" strokeDasharray="2 4" />
        <path d="M114 82 l6 4 l-6 4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />

        {/* AI ANALYSIS CORE — hex with glow ring + spark */}
        <circle cx="150" cy="86" r="25" fill={`rgba(${rgb},0.04)`} stroke={`rgba(${rgb},0.18)`} strokeWidth="1" />
        <path d="M150 64 l20 11.5 v23 l-20 11.5 l-20 -11.5 v-23 Z" fill={`rgba(${rgb},0.09)`} stroke={c} strokeWidth="1.5" />
        <path d="M150 79 v14 M143 86 h14 M145 81 l10 10 M155 81 l-10 10" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
        <text x="150" y="150" textAnchor="middle" fontSize="8.5" fontFamily={labelFont} fontWeight={lw} letterSpacing={lsp} fill={`rgba(${rgb},0.85)`}>
          {cv.aiDistill}
        </text>

        {/* flow to the output */}
        <path d="M182 86 H214" stroke={`rgba(${rgb},0.45)`} strokeWidth="1.2" strokeDasharray="2 4" />
        <path d="M208 82 l6 4 l-6 4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />

        {/* OUTPUT — flashcard (top) + short quiz (bottom) */}
        {/* flashcard with a quiz "?" badge */}
        <rect x="230" y="46" width="64" height="36" rx="5" fill={`rgba(${rgb},0.05)`} stroke={`rgba(${rgb},0.22)`} strokeWidth="1" transform="rotate(-6 262 64)" />
        <rect x="228" y="52" width="64" height="36" rx="5" fill={`rgba(${rgb},0.08)`} stroke={c} strokeWidth="1.3" />
        <rect x="236" y="60" width="28" height="4" rx="2" fill={`rgba(${rgb},0.6)`} />
        <rect x="236" y="69" width="40" height="3.2" rx="1.6" fill="rgba(150,165,205,0.3)" />
        <rect x="236" y="76" width="24" height="3.2" rx="1.6" fill="rgba(150,165,205,0.24)" />
        <circle cx="289" cy="53" r="6.5" fill={`rgba(${rgb},0.14)`} stroke={c} strokeWidth="1.1" />
        <text x="289" y="56.4" textAnchor="middle" fontSize="8" fontWeight="700" fill={c}>?</text>

        {/* short quiz / understanding check row */}
        <path d="M232 104 l3 3 l5.5 -6" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="246" y="102.5" width="20" height="5" rx="2.5" fill={`rgba(${rgb},0.16)`} />
        <rect x="270" y="102.5" width="20" height="5" rx="2.5" fill={`rgba(${rgb},0.08)`} />
        <path d="M232 116 l3 3 l5.5 -6" stroke={`rgba(${rgb},0.5)`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="246" y="114.5" width="28" height="5" rx="2.5" fill={`rgba(${rgb},0.1)`} />

        <text x="262" y="150" textAnchor="middle" fontSize="8.5" fontFamily={labelFont} fontWeight={lw} letterSpacing={lsp} fill={`rgba(${rgb},0.85)`}>
          {cv.flashcards}
        </text>
      </svg>
    </div>
  );
}
