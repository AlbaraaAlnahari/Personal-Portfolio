import React from "react";
import { cn } from "@/lib/utils/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "full";
}

/**
 * Responsive Container Component
 * Manages max-width and padding across breakpoints
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      full: "w-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
