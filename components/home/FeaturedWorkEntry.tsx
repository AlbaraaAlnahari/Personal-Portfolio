"use client";

import Image from "next/image";
import { HomeScene, DestinationPortal } from "./HomeScene";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Scene 03 — Selected Work Exhibition (SELECTED WORK / 02 → /work)
 * DocuPilot is the deployed PROOF (real screenshot + interface chrome). The
 * clean top header pairs the product copy with a single Work destination portal
 * that clearly opens the broader /work collection. The external Live Site action
 * lives in the deployed-interface chrome — visibly "visit docupilot.site", never
 * competing with the /work route. Approved facts only.
 */
export function FeaturedWorkEntry() {
  const { t, displayFont } = useLanguage();
  const s = t.scene.work;
  return (
    <HomeScene eyebrow={s.eyebrow} index="02" route="/work" className="pt-8 pb-12 md:pt-10 md:pb-16">
      {/* Clean editorial header for the screenshot: proof copy + collection portal */}
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-6">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 className={cn("text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl", displayFont)}>
              {s.name}
            </h2>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.16em]"
              style={{
                color: "rgba(0,255,159,0.95)",
                border: "1px solid rgba(0,255,159,0.35)",
                backgroundColor: "rgba(0,255,159,0.06)",
              }}
            >
              <span aria-hidden="true" className="h-1 w-1 rounded-full" style={{ backgroundColor: "#00ff9f" }} />
              {s.award}
            </span>
          </div>
          <p className="mt-2 text-base font-semibold text-accent-cyan/90 md:text-lg">
            {s.platform}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground-secondary/80 md:text-base">
            {s.description}
          </p>
        </div>

        <DestinationPortal
          section={s.eyebrow}
          route="/work"
          cta={s.portalCta}
          descriptor={s.portalDescriptor}
          className="w-full sm:w-[20rem]"
        />
      </div>

      {/* Deployed-interface chamber — the dominant proof; Live Site lives here as
          the external product visit, tied to the deployed interface. */}
      <div className="mt-7 overflow-hidden rounded-2xl border border-glass-light/15 bg-background-primary/40 md:mt-8">
        <div className="flex items-center justify-between gap-4 border-b border-glass-light/10 px-4 py-2.5">
          <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary/55">
            {s.deployedInterfaceLabel} · <span dir="ltr" className="ltr-isolate">{s.deployedInterfaceDomain}</span>
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://docupilot.site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.liveSiteAria}
              className="ie-focus inline-flex items-center gap-1.5 rounded font-mono text-[10px] tracking-[0.16em] text-foreground-secondary/70 outline-none transition-colors hover:text-accent-cyan"
            >
              {s.liveSite}
              <span aria-hidden="true">↗</span>
            </a>
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em]"
              style={{ color: "rgba(0,255,159,0.85)" }}
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#00ff9f" }} />
              {s.live}
            </span>
          </div>
        </div>
        <Image
          src="/images/projects/docupilot-decision-dashboard.png"
          alt={s.screenshotAlt}
          width={3446}
          height={1746}
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="h-auto w-full"
        />
      </div>
    </HomeScene>
  );
}
