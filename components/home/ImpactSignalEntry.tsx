"use client";

import { HomeScene, DestinationRail } from "./HomeScene";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Scene 04 — Impact Portal (IMPACT / 03)
 * An open-framed typographic leadership statement (not a closed card): a top
 * appointment rail routes down into a dominant cyan 5,000+ anchor, a supporting
 * metric, a narrative line, a right-side deployment-scope spine, and a single
 * routed entry into the full /impact record. Open framing + routed edge instead
 * of an enclosed rounded box; the blueprint field reads through behind it.
 *
 * Truthful approved facts only — no PreHack/Drone Club, no aggregate totals, no
 * Google-employment wording, no invented metrics, no full Leadership component.
 */
const DEPLOYMENT_SCOPE = ["projectManagement", "outreach", "logistics"] as const;

export function ImpactSignalEntry() {
  const { t } = useLanguage();
  const s = t.scene.impact;
  return (
    <HomeScene eyebrow={s.eyebrow} index="03" route="/impact" className="pt-10 pb-7 md:pt-12 md:pb-8">
      <div className="relative pl-5 sm:pl-7">
        {/* routed left edge — open framing instead of an enclosed card */}
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-0 top-1 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(0,217,255,0.55), rgba(0,217,255,0.12), transparent)" }}
        />
        {/* ultra-faint coordinate index anchoring the composition */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-0 select-none font-bold leading-none"
          style={{ fontSize: "150px", color: "rgba(0,217,255,0.045)" }}
        >
          03
        </span>

        {/* Appointment rail — open framing via a single hairline rule */}
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.2em]"
            style={{ color: "rgba(0,217,255,0.95)", border: "1px solid rgba(0,217,255,0.4)", backgroundColor: "rgba(0,217,255,0.08)" }}
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#00d9ff", boxShadow: "0 0 6px rgba(0,217,255,0.7)" }} />
            {s.currentAppointment}
          </span>
          <span dir="ltr" className="ltr-isolate text-xl font-bold text-foreground md:text-2xl">{s.org}</span>
          <span className="text-sm font-semibold md:text-base" style={{ color: "rgba(231,247,255,0.85)" }}>
            {s.position}
          </span>
        </div>

        {/* Statement body: dominant metric field + deployment-scope spine */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.55fr_0.75fr] lg:gap-10">
          {/* main metric field */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em]" style={{ color: "rgba(0,217,255,0.72)" }}>
              {s.flagshipDeployment}
            </div>
            <div className="mt-3 flex flex-wrap items-end gap-x-10 gap-y-4">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span
                  className="text-6xl font-bold leading-none tracking-tight tabular-nums min-[400px]:text-7xl md:text-8xl"
                  style={{ color: "#00d9ff", textShadow: "0 0 24px rgba(0,217,255,0.28)" }}
                >
                  {s.metric}
                </span>
                <span className="font-mono text-xs tracking-[0.2em]" style={{ color: "rgba(160,165,197,0.7)" }}>
                  {s.metricLabel}
                </span>
              </div>
              <div className="flex items-baseline gap-x-3 pb-1.5">
                <span className="text-3xl font-bold tabular-nums text-foreground md:text-4xl">{s.eventsMetric}</span>
                <span className="font-mono text-[11px] tracking-[0.18em]" style={{ color: "rgba(160,165,197,0.62)" }}>
                  {s.eventsLabel}
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground-secondary/80 md:text-base">
              <span className="font-semibold text-foreground/90">
                {s.narrativeStrong}
              </span>
              {s.narrativeRest}
            </p>
          </div>

          {/* deployment-scope spine — resolves the open area with routed scope */}
          <div className="lg:border-l lg:border-glass-light/10 lg:pl-10">
            <div className="font-mono text-[10px] tracking-[0.22em]" style={{ color: "rgba(0,217,255,0.6)" }}>
              {s.deploymentScope}
            </div>
            <ul className="relative mt-4 space-y-3.5">
              {/* routed spine line */}
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-[3px] top-2 w-px"
                style={{ background: "linear-gradient(to bottom, rgba(0,217,255,0.5), rgba(0,217,255,0.15))" }}
              />
              {DEPLOYMENT_SCOPE.map((item) => (
                <li key={item} className="relative flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="relative z-10 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: "rgba(0,217,255,0.85)", boxShadow: "0 0 5px rgba(0,217,255,0.5)" }}
                  />
                  <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: "rgba(231,247,255,0.82)" }}>
                    {s.scope[item]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Integrated command rail — the route endpoint as a line, not a card */}
        <DestinationRail
          section={s.railSection}
          route="/impact"
          cta={s.railCta}
          descriptor={s.railDescriptor}
          className="mt-8"
        />
      </div>
    </HomeScene>
  );
}
