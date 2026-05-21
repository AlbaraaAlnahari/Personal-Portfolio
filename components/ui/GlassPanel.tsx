import React from "react";
import { cn } from "@/lib/utils/cn";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sm" | "md" | "lg";
  interactive?: boolean;
  glow?: boolean;
}

/**
 * Glassmorphism Panel Component
 * Base component for all glass panels with optional glow and interactivity
 */
export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      className,
      variant = "md",
      interactive = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "relative rounded-glass border border-glass-light bg-glass backdrop-blur-lg";

    const variantClasses = {
      sm: "shadow-glass-sm",
      md: "shadow-glass-md",
      lg: "shadow-glass-lg",
    };

    const interactiveClasses = interactive
      ? "transition-all duration-300 hover:shadow-glass-lg hover:border-glass-lighter cursor-pointer"
      : "";

    const glowClasses = glow
      ? "before:absolute before:inset-0 before:rounded-glass before:bg-gradient-to-br before:from-accent-cyan/0 before:to-accent-purple/0 before:opacity-0 hover:before:opacity-20 before:transition-opacity before:duration-300"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          interactiveClasses,
          glowClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
