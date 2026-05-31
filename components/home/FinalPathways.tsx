"use client";

import Link from "next/link";
import { useState } from "react";
import { HomeScene, FrameCorners } from "./HomeScene";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * One destination half of the Final Terminal Frame. The whole half opens its
 * route via a stretched link; an optional secondary external action (the résumé
 * PDF) sits above it — no nested interactive parent. Brightens on hover/focus.
 */
function TerminalDestination({
  meta,
  route,
  name,
  descriptor,
  cta,
  secondaryHref,
  secondaryLabel,
  secondaryAria,
  divider = false,
}: {
  meta: string;
  route: string;
  name: string;
  descriptor: string;
  cta: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryAria?: string;
  divider?: boolean;
}) {
  const [lit, setLit] = useState(false);
  const { displayFont } = useLanguage();
  return (
    <div
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      onFocus={() => setLit(true)}
      onBlur={() => setLit(false)}
      className={cn("relative p-6 transition-colors duration-300 md:p-8", divider && "border-b md:border-b-0 md:border-r")}
      style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: lit ? "rgba(0,217,255,0.04)" : "transparent" }}
    >
      <Link
        href={route}
        aria-label={cta}
        className="ie-focus block rounded outline-none after:absolute after:inset-0 after:content-['']"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em]" style={{ color: "rgba(0,217,255,0.8)" }}>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: lit ? "#00d9ff" : "rgba(0,217,255,0.7)",
                boxShadow: lit ? "0 0 8px rgba(0,217,255,0.7)" : "0 0 4px rgba(0,217,255,0.4)",
              }}
            />
            {meta}
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: "rgba(160,165,197,0.55)" }}>{route}</span>
        </div>
        <h3 className={cn("mt-3 text-xl font-bold text-foreground md:text-2xl", displayFont)}>{name}</h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(231,247,255,0.7)" }}>{descriptor}</p>
        <div className="mt-5 flex items-center gap-2 text-base font-bold" style={{ color: "#00d9ff" }}>
          {cta}
          <span aria-hidden="true" className="transition-transform duration-300" style={{ transform: lit ? "translateX(3px)" : "none" }}>→</span>
        </div>
      </Link>
      {secondaryHref && secondaryLabel && (
        <a
          href={secondaryHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={secondaryAria}
          className="ie-focus relative z-[1] mt-4 inline-block font-mono text-[11px] tracking-[0.14em] outline-none transition-colors hover:text-accent-cyan"
          style={{ color: "rgba(160,165,197,0.6)" }}
        >
          {secondaryLabel}
        </a>
      )}
    </div>
  );
}

/**
 * Scene 05 — Final Terminal Frame
 * The closing routing decision as one composed architectural terminal: a single
 * framed surface divided into a dominant Official Resume destination (with a
 * quieter PDF action) and a Get In Touch destination. Routes into /resume and
 * /contact only; tightened so the Home ends intentionally into the footer.
 */
export function FinalPathways() {
  const { t, displayFont } = useLanguage();
  const f = t.scene.final;
  return (
    <HomeScene eyebrow={f.eyebrow} className="pt-6 pb-10 md:pt-7 md:pb-12">
      <h2 className={cn("max-w-2xl text-3xl font-bold leading-[1.1] text-foreground md:text-4xl lg:text-5xl", displayFont)}>
        {f.titleStart}{" "}
        <span className="text-accent-cyan">{f.titleAccent}</span>
      </h2>

      <div
        className="relative mt-8 overflow-hidden rounded-2xl border"
        style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(10,14,28,0.4)" }}
      >
        <FrameCorners />
        <div className="grid md:grid-cols-[1.25fr_0.9fr]">
          <TerminalDestination
            meta={f.resume.meta}
            route="/resume"
            name={f.resume.name}
            descriptor={f.resume.descriptor}
            cta={f.resume.cta}
            secondaryHref="/resume/Albaraa-Alnahari-Resume.pdf"
            secondaryLabel={f.resume.downloadLabel}
            secondaryAria={`${f.resume.downloadLabel} ${f.secondaryAriaSuffix}`}
            divider
          />
          <TerminalDestination
            meta={f.contact.meta}
            route="/contact"
            name={f.contact.name}
            descriptor={f.contact.descriptor}
            cta={f.contact.cta}
          />
        </div>
      </div>
    </HomeScene>
  );
}
