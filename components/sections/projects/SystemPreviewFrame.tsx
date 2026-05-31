"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// =====================================================
// SYSTEM PREVIEW FRAME — a restrained "deployed interface"
// viewport for real product screenshots. Renders the
// original screenshot (next/image, full aspect, no crop)
// inside an ALBARAA OS system-frame with a chrome bar.
// =====================================================

interface SystemPreviewFrameProps {
  src: string;
  alt: string;
  /** intrinsic pixel dimensions of the source screenshot */
  width: number;
  height: number;
  label: string;
  domain?: string;
  /** show a truthful LIVE indicator (only for genuinely live sites) */
  live?: boolean;
  /** rgb triple, e.g. "var(--rgb-cyan)" */
  rgb: string;
  sizes: string;
  priority?: boolean;
}

export function SystemPreviewFrame({
  src,
  alt,
  width,
  height,
  label,
  domain,
  live = false,
  rgb,
  sizes,
  priority = false,
}: SystemPreviewFrameProps) {
  const { t } = useLanguage();
  return (
    <div
      className="group/frame relative rounded-xl overflow-hidden transition-all duration-500"
      style={{
        background: "rgba(8,11,28,0.92)",
        border: `1px solid rgba(${rgb},0.34)`,
        boxShadow: `0 18px 50px rgba(0,0,0,0.45), 0 0 34px rgba(${rgb},0.1), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-3 px-3.5 py-2.5 border-b"
        style={{ borderColor: `rgba(${rgb},0.16)`, background: "rgba(10,14,39,0.8)" }}
      >
        {/* window dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2 h-2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "rgba(150,165,205,0.35)" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "rgba(150,165,205,0.22)" }} />
        </div>

        {/* address / context pill */}
        {domain && (
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md min-w-0"
            style={{ background: "rgba(150,165,205,0.06)", border: "1px solid rgba(150,165,205,0.14)" }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={`rgb(${rgb})`} strokeWidth="2.4" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
            </svg>
            <span
              dir="ltr"
              className="ltr-isolate font-mono text-[10px] tracking-wide text-foreground-secondary/70 truncate"
            >
              {domain}
            </span>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {live && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-green"
                style={{ boxShadow: "0 0 7px rgba(var(--rgb-green),0.8)" }}
              />
              <span className="font-mono text-[9px] tracking-[0.2em] text-accent-green/85">
                {t.work.frame.live}
              </span>
            </span>
          )}
          <span
            className="font-mono text-[9px] tracking-[0.22em]"
            style={{ color: `rgba(${rgb},0.75)` }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Screenshot — full aspect, no destructive crop */}
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="block w-full h-auto"
        />
        {/* edge sheen on hover/focus — purely decorative */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover/frame:opacity-100 group-focus-within/frame:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, rgba(${rgb},0.08) 0%, transparent 22%)`,
          }}
        />
        {/* soft edge vignette — embeds the bright UI into the dark frame
            without darkening the readable interface (edges only) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-b-xl"
          style={{
            boxShadow: `inset 0 0 0 1px rgba(${rgb},0.14), inset 0 0 32px 8px rgba(6,9,22,0.5)`,
          }}
        />
      </div>
    </div>
  );
}
