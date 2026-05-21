import React from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  loading?: boolean;
}

/**
 * Premium Button Component
 * Supports multiple variants with consistent styling
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      glow = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan";

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-accent-cyan to-accent-purple text-background-primary hover:shadow-neon-cyan active:scale-95",
      secondary:
        "bg-glass border border-glass-light text-foreground hover:shadow-glass-lg active:scale-95",
      ghost:
        "text-foreground hover:bg-glass/50 active:bg-glass/80 hover:text-accent-cyan",
      glass:
        "bg-glass border border-glass-light text-foreground hover:border-glass-lighter hover:shadow-glass-lg active:scale-95",
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm rounded-md gap-2",
      md: "px-4 py-2 text-base rounded-lg gap-2",
      lg: "px-6 py-3 text-lg rounded-xl gap-2",
    };

    const glowClass = glow && variant === "primary" ? "shadow-neon-cyan" : "";

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          glowClass,
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
