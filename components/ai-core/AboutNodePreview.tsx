"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutNodePreviewProps {
  isVisible: boolean;
  position?: {
    side: "left" | "right";
    offsetX?: number;
    offsetY?: number;
  };
}

export function AboutNodePreview({
  isVisible,
  position = { side: "left", offsetX: -10, offsetY: 0 },
}: AboutNodePreviewProps) {
  const baseOffset = position.side === "left" ? "-16px" : "16px";
  const direction = position.side === "left" ? "right" : "left";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={
        isVisible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.92 }
      }
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      style={{
        position: "absolute" as const,
        pointerEvents: isVisible ? "auto" : "none",
        zIndex: 50,
      }}
      className={`${position.side === "left" ? "right-[calc(100%+16px)]" : "left-[calc(100%+16px)]"} top-1/2 -translate-y-1/2`}
    >
      <div className="px-4 py-3 rounded-lg backdrop-blur-md border border-accent-cyan/40 bg-background-primary/80 whitespace-nowrap pointer-events-none">
        {/* Micro label */}
        <div className="text-xs font-mono text-accent-cyan/70 tracking-widest mb-2">
          IDENTITY MODULE
        </div>

        {/* Profile row with image and text */}
        <div className="flex items-center gap-3">
          {/* Thumbnail */}
          <div className="relative w-14 h-14 rounded-md border border-accent-cyan/30 overflow-hidden bg-background-primary/60 flex-shrink-0">
            <Image
              src="/images/albaraa-profile.webp"
              alt="Portrait of Albaraa Alnahari"
              fill
              className="object-cover"
              sizes="56px"
              priority={false}
              onError={(e) => {
                // Fallback if image fails
                const img = e.currentTarget;
                img.style.display = "none";
              }}
            />
            {/* Fallback placeholder */}
            <div
              className="absolute inset-0 flex items-center justify-center text-xs text-accent-cyan/40 font-mono"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(181, 55, 242, 0.1) 100%)",
              }}
            >
              {/* Will be hidden if image loads */}
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold text-foreground-primary">
              Albaraa Alnahari
            </div>
            <div className="text-xs text-foreground-secondary/80">
              Profile Identity
            </div>
            <div className="text-xs text-accent-cyan/70 pt-0.5">
              Open About →
            </div>
          </div>
        </div>

        {/* Subtle glow */}
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(0, 217, 255, 0.15) 0%, transparent 50%)",
          }}
        />
      </div>
    </motion.div>
  );
}
