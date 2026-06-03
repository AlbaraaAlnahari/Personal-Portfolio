"use client";

import { SkillMark } from "./SkillMark";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// =====================================================
// APPLIED SIGNAL CONSOLE — an educational capability console that
// explains, in plain language, what each capability ENABLES and where
// it appears in featured work (only when verified). Presentational
// only; never fabricates evidence and never uses defensive résumé
// wording. Begins in an intentional STANDBY state.
//   variant="panel"  → desktop right-side console
//   variant="inline" → compact console docked under an active domain
//                       on stacked (tablet/mobile) layouts
// =====================================================

const STEEL = "148, 163, 184";

export interface ProjectRef {
  code: string;
  title: string;
  relation: string;
}

export type InspectorView =
  | { kind: "standby" }
  | {
      kind: "domain";
      domainNum: string;
      domainTitle: string;
      accent: string;
      purpose: string;
      capabilities: string[];
      projects: ProjectRef[];
    }
  | {
      kind: "skill";
      domainNum: string;
      domainTitle: string;
      accent: string;
      label: string;
      markName: string;
      enables: string;
      projects: ProjectRef[];
    };

export function CapabilityInspector({
  view,
  variant = "panel",
  warm = false,
}: {
  view: InspectorView;
  variant?: "panel" | "inline";
  warm?: boolean;
}) {
  const { t, isAr } = useLanguage();
  const c = t.skills.console;
  // Arabic shouldn't carry English-style mono tracking; relax it in Arabic mode.
  const tr = (en: string) => (isAr ? "tracking-normal" : en);
  const inline = variant === "inline";
  const isStandby = view.kind === "standby";
  // Warm cream: the standby console swaps the pale steel neutral for a dark-navy
  // one so its border, bus port, signal line, and header dot read clearly on the
  // light surface. Non-standby (selected) keeps its domain accent unchanged.
  const accent = isStandby ? (warm ? "8, 15, 35" : STEEL) : view.accent;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-background-primary/45 backdrop-blur-md transition-colors duration-300 ${
        inline ? "p-4" : "p-5 md:p-6 h-full"
      }`}
      style={{
        borderColor: `rgba(${accent},${isStandby ? (warm ? 0.28 : 0.22) : 0.34})`,
        ...(warm
          ? {
              // Same warm cream as the stat bar + skill cards via the shared
              // var(--surface-deep) token (#f0ebdf) — one consistent editorial
              // surface across the whole capability matrix (not pure white).
              backgroundColor: "var(--surface-deep)",
              boxShadow: "0 1px 2px rgba(8,15,35,0.05), 0 10px 24px -16px rgba(8,15,35,0.18)",
            }
          : {}),
      }}
    >
      {/* docked bus input port (decorative) */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-7 bottom-7 w-[2px] rounded-full transition-all duration-300"
        style={{
          background: isStandby
            ? `linear-gradient(to bottom, rgba(${accent},0.3), rgba(${accent},0.05))`
            : `linear-gradient(to bottom, rgba(${accent},0.75), rgba(${accent},0.12))`,
        }}
      />
      {!isStandby && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl"
          style={{ background: `radial-gradient(circle, rgba(${accent},0.12), transparent 70%)` }}
        />
      )}

      {/* header */}
      <div className="flex items-center gap-2.5">
        <span
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            background: isStandby ? `rgba(${accent},0.6)` : `rgb(${accent})`,
            boxShadow: isStandby ? "none" : `0 0 8px rgba(${accent},0.7)`,
          }}
          aria-hidden="true"
        />
        <span
          className={`font-mono text-[10px] text-foreground-secondary/70 ${tr("tracking-[0.24em]")}`}
          style={warm ? { color: "rgba(71,77,91,0.95)" } : undefined}
        >
          {c.label}
        </span>
      </div>

      {/* ── STANDBY ── */}
      {view.kind === "standby" && (
        <div className={inline ? "mt-4" : "mt-6"}>
          <div
            className={`font-mono text-[11px] text-foreground-secondary/50 ${tr("tracking-[0.24em]")}`}
            style={warm ? { color: "rgba(71,77,91,0.95)" } : undefined}
          >
            {c.standby.state}
          </div>
          <svg viewBox="0 0 220 40" className="mt-6 w-full max-w-[260px] h-auto" fill="none" aria-hidden="true">
            <circle cx="16" cy="20" r="6" stroke={`rgba(${accent},0.4)`} strokeWidth="1.4" />
            <circle cx="16" cy="20" r="2" fill={`rgba(${accent},0.5)`} />
            <path d="M24 20 H150" stroke={`rgba(${accent},0.28)`} strokeWidth="1.2" strokeDasharray="3 5" />
            <path d="M150 20 h40" stroke={`rgba(${accent},0.18)`} strokeWidth="1.2" />
            <rect x="190" y="11" width="18" height="18" rx="4" stroke={`rgba(${accent},0.35)`} strokeWidth="1.4" />
            <path d="M196 20h6" stroke={`rgba(${accent},0.4)`} strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <p
            className="mt-6 text-[13px] leading-[1.8] text-foreground-secondary/70 max-w-xs"
            style={warm ? { color: "rgba(71,77,91,0.92)" } : undefined}
          >
            {c.standby.body}
          </p>
          <div
            className={`mt-4 font-mono text-[10px] text-foreground-secondary/45 ${tr("tracking-[0.16em]")}`}
            style={warm ? { color: "rgba(71,77,91,0.8)" } : undefined}
          >
            {c.standby.ready}
          </div>
        </div>
      )}

      {/* ── DOMAIN ── */}
      {view.kind === "domain" && (
        <>
          <div className={`mt-5 font-mono text-[10px] ${tr("tracking-[0.22em]")}`} style={{ color: `rgba(${accent},0.8)` }}>
            {c.domainTag(view.domainNum, view.domainTitle)}
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="text-xl md:text-2xl font-bold text-foreground leading-snug">{view.domainTitle}</div>
            <div className={`font-mono text-[10px] text-foreground-secondary/50 ${tr("tracking-[0.2em]")}`}>
              {c.capabilitiesCount(view.capabilities.length)}
            </div>
          </div>

          <Lane accent={accent} label={c.lanes.domainPurpose}>
            <p className="text-[13px] leading-relaxed text-foreground-secondary/85">{view.purpose}</p>
          </Lane>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {view.capabilities.map((cap) => (
              <span
                key={cap}
                dir="ltr"
                className="ltr-isolate px-2 py-0.5 rounded text-[10px] bg-background-primary/55 border text-foreground-secondary/80"
                style={{ borderColor: `rgba(${accent},0.18)` }}
              >
                {cap}
              </span>
            ))}
          </div>

          {view.projects.length > 0 && (
            <Lane accent={accent} label={c.lanes.relatedSystems}>
              <ProjectChips accent={accent} projects={view.projects} />
              <p className="mt-2 text-[13px] leading-relaxed text-foreground-secondary/85">
                {c.domainConnected}
              </p>
            </Lane>
          )}
        </>
      )}

      {/* ── SKILL ── */}
      {view.kind === "skill" && (
        <>
          <div className={`mt-5 font-mono text-[10px] ${tr("tracking-[0.22em]")}`} style={{ color: `rgba(${accent},0.8)` }}>
            {c.domainTag(view.domainNum, view.domainTitle)}
          </div>
          <div className={`mt-2 flex items-center ${inline ? "gap-3" : "gap-3.5"}`}>
            <span
              className={`grid place-items-center rounded-xl border shrink-0 ${inline ? "w-12 h-12" : "w-14 h-14"}`}
              style={{
                borderColor: `rgba(${accent},0.4)`,
                background: `rgba(${accent},0.1)`,
              }}
            >
              <SkillMark name={view.markName} size={inline ? 28 : 34} vivid warm={warm} />
            </span>
            <div className="min-w-0">
              <div dir="ltr" className="ltr-isolate text-xl md:text-2xl font-bold text-foreground leading-tight truncate">{view.label}</div>
              <div className={`font-mono text-[10px] text-foreground-secondary/50 ${tr("tracking-[0.2em]")}`}>{c.capabilityTag}</div>
            </div>
          </div>

          <Lane accent={accent} label={c.lanes.whatEnables}>
            <p className="text-[13px] leading-relaxed text-foreground-secondary/85">{view.enables}</p>
          </Lane>

          {view.projects.length > 0 ? (
            <Lane accent={accent} label={c.lanes.appliedIn}>
              <ProjectChips accent={accent} projects={view.projects} />
              <p className="mt-2 text-[13px] leading-relaxed text-foreground-secondary/85">
                {view.projects.length === 1
                  ? view.projects[0].relation
                  : c.appliedAcross}
              </p>
            </Lane>
          ) : (
            <div className="mt-4 pt-3 border-t flex items-center gap-2" style={{ borderColor: `rgba(${accent},0.14)` }}>
              <span className="w-1 h-1 rounded-full" style={{ background: `rgba(${accent},0.6)` }} aria-hidden="true" />
              <span className={`font-mono text-[10px] text-foreground-secondary/55 ${tr("tracking-[0.22em]")}`}>
                {c.inToolkit}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Lane({ accent, label, children }: { accent: string; label: string; children: React.ReactNode }) {
  const { isAr } = useLanguage();
  return (
    <div className="mt-5 pt-5 border-t" style={{ borderColor: `rgba(${accent},0.16)` }}>
      <div className="flex items-center gap-2 mb-3">
        <span aria-hidden="true" className="h-px w-4" style={{ background: `rgba(${accent},0.6)` }} />
        <span className={`font-mono text-[10px] ${isAr ? "tracking-normal" : "tracking-[0.24em]"}`} style={{ color: `rgba(${accent},0.75)` }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function ProjectChips({ accent, projects }: { accent: string; projects: ProjectRef[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {projects.map((p) => (
        <span
          key={p.code}
          dir="ltr"
          className="ltr-isolate inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[10px] tracking-wide"
          style={{ borderColor: `rgba(${accent},0.35)`, background: `rgba(${accent},0.08)`, color: `rgb(${accent})` }}
        >
          <span className="w-1 h-1 rounded-full" style={{ background: `rgb(${accent})` }} aria-hidden="true" />
          {p.code}
        </span>
      ))}
    </div>
  );
}
