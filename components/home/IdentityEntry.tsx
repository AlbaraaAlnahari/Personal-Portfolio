"use client";

import Image from "next/image";
import { HomeScene, DestinationPortal, FrameCorners } from "./HomeScene";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Scene 02 — Profile Exhibition Frame (PROFILE / 01 → /about)
 * One calm, composed editorial exhibit (open corner-bracket framing, no closed
 * card) holding the identity copy, the portrait, and a clear Profile destination
 * portal. A teaser only — not the full Verified Identity frame. The dock rule
 * between copy and portrait brightens on hover/focus.
 */
export function IdentityEntry() {
  const { t, displayFont } = useLanguage();
  const s = t.scene.identity;
  return (
    <HomeScene eyebrow={s.eyebrow} index="01" route="/about" connectUp className="pt-28 pb-8 md:pt-36 md:pb-10">
      <div className="group relative">
        <FrameCorners />
        <div className="grid items-center gap-8 px-5 py-6 md:px-9 md:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Identity copy + portal */}
          <div className="order-2 lg:order-1">
            <h2 className={cn("text-4xl font-bold leading-[1.05] text-foreground md:text-5xl", displayFont)}>
              {s.name}
            </h2>
            <p className="mt-3 text-base font-semibold text-accent-cyan/90 md:text-lg">
              {s.role}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-secondary/80">
              {s.description}
            </p>
            <DestinationPortal
              section={s.eyebrow}
              route="/about"
              cta={s.portalCta}
              descriptor={s.portalDescriptor}
              className="mt-7 max-w-md"
            />
          </div>

          {/* Portrait — docked to the copy on lg */}
          <div className="relative order-1 lg:order-2 lg:pl-10">
            {/* dock relationship line (lg) — brightens on exhibit hover/focus */}
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-0 top-2 hidden w-px opacity-50 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 lg:block"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(0,217,255,0.55), transparent)" }}
            />
            <span
              aria-hidden="true"
              className="absolute -left-1 top-1 hidden h-2 w-2 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 lg:block"
              style={{ backgroundColor: "rgba(0,217,255,0.85)", boxShadow: "0 0 6px rgba(0,217,255,0.6)" }}
            />
            <div className="relative mx-auto w-full max-w-[260px]">
              <div
                className="relative overflow-hidden rounded-2xl border border-glass-light/15 bg-background-primary/40"
                style={{ aspectRatio: "4 / 5" }}
              >
                <Image
                  src="/images/albaraa-profile.svg"
                  alt={s.photoAlt}
                  fill
                  sizes="(max-width: 1024px) 70vw, 260px"
                  className="object-cover object-top"
                  priority={false}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-3 h-4 w-4 border-l border-t border-accent-cyan/50"
                />
                <span
                  aria-hidden="true"
                  dir="ltr"
                  className="ltr-isolate absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.22em] text-accent-cyan/60"
                >
                  {s.idTag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeScene>
  );
}
