// =====================================================
// SKILL MARK — renders a capability's local SVG mark.
// Brand technology marks load from /icons/skills/brand/ and custom
// ALBARAA OS system marks from /icons/skills/system/. Marks are loaded
// as static local assets via CSS background (no <img>, no base64, no
// runtime fetch). Idle marks are slightly restrained; the active /
// console state reveals full logo personality. Decorative — the
// readable text label always supplies the accessible name.
// =====================================================

// Brand technology marks (devicon, MIT — see /icons/skills/brand/LICENSE-DEVICON-MIT.txt)
const BRAND: Record<string, string> = {
  React: "react",
  "Next.js": "nextjs",
  "Tailwind CSS": "tailwind-css",
  Flutter: "flutter",
  Pandas: "pandas",
  NumPy: "numpy",
  OpenCV: "opencv",
  Python: "python",
  MySQL: "mysql",
  Java: "java",
  "C++": "cpp",
  HTML: "html",
  CSS: "css",
  TypeScript: "typescript",
  JavaScript: "javascript",
  Git: "git",
  GitHub: "github",
  "VS Code": "vscode",
  PyCharm: "pycharm",
  Supabase: "supabase",
  Figma: "figma",
};

// Custom ALBARAA OS system marks for non-brand capabilities
const SYSTEM: Record<string, string> = {
  SQL: "sql",
  "Data Analysis": "data-analysis",
  "AI APIs": "ai-apis",
  "Analytical Thinking": "analytical-thinking",
  Communication: "communication",
  Leadership: "leadership",
};

// Dark-fill brand marks that need lightening to read on the dark surface
const INVERT = new Set(["GitHub", "Next.js"]);

function srcFor(name: string): string | null {
  if (BRAND[name]) return `/icons/skills/brand/${BRAND[name]}.svg`;
  if (SYSTEM[name]) return `/icons/skills/system/${SYSTEM[name]}.svg`;
  return null;
}

export function SkillMark({
  name,
  size = 18,
  vivid = false,
  warm = false,
  className,
}: {
  name: string;
  size?: number;
  /** reveal full logo personality (selected node / console); idle is restrained */
  vivid?: boolean;
  /** warm-cream theme: keep dark-fill marks dark (no invert, which would make
      them disappear on cream) and lift idle opacity/saturation so marks read on
      the light surface */
  warm?: boolean;
  className?: string;
}) {
  const src = srcFor(name);
  if (!src) return null;
  const invert = warm ? false : INVERT.has(name);
  const filter = [invert ? "invert(1) brightness(1.06)" : "", vivid || warm ? "" : "saturate(0.82)"]
    .filter(Boolean)
    .join(" ");
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: vivid ? 1 : warm ? 0.92 : 0.72,
        filter: filter || undefined,
        transition: "opacity 200ms ease, filter 200ms ease",
      }}
    />
  );
}
