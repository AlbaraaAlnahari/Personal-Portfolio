import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - deep dark with neon accents
        background: {
          DEFAULT: "#0a0e27",
          secondary: "#0f1229",
          tertiary: "#151a3a",
        },
        foreground: "#e8e9f3",

        // Accent colors - neon/holographic
        accent: {
          primary: "#00d9ff", // cyan
          secondary: "#00ff9f", // neon green
          tertiary: "#ff006e", // hot pink
          quaternary: "#b537f2", // purple
          cyan: "#00d9ff",
          green: "#00ff9f",
          pink: "#ff006e",
          purple: "#b537f2",
        },

        // Glassmorphism & depth
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          lighter: "rgba(255, 255, 255, 0.15)",
          lightest: "rgba(255, 255, 255, 0.2)",
        },

        // Status colors
        success: "#00ff9f",
        warning: "#ffa500",
        error: "#ff006e",
        info: "#00d9ff",

        // Neutral palette
        slate: {
          50: "#f8f9fa",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },

      backgroundColor: {
        glass: "rgba(15, 18, 41, 0.4)",
        "glass-light": "rgba(30, 41, 59, 0.2)",
      },

      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "20px",
        xl: "40px",
      },

      boxShadow: {
        // Glassmorphism shadows
        "glass-sm": "0 4px 30px rgba(0, 217, 255, 0.1)",
        "glass-md": "0 8px 32px rgba(0, 217, 255, 0.15)",
        "glass-lg": "0 12px 48px rgba(0, 217, 255, 0.2)",

        // Neon glow
        "neon-cyan": "0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)",
        "neon-green": "0 0 20px rgba(0, 255, 159, 0.5), 0 0 40px rgba(0, 255, 159, 0.3)",
        "neon-pink": "0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(255, 0, 110, 0.3)",
        "neon-purple":
          "0 0 20px rgba(181, 55, 242, 0.5), 0 0 40px rgba(181, 55, 242, 0.3)",

        // Depth layers
        "elevation-1": "0 1px 2px rgba(0, 0, 0, 0.3)",
        "elevation-2": "0 4px 8px rgba(0, 0, 0, 0.4)",
        "elevation-3": "0 8px 16px rgba(0, 0, 0, 0.5)",
      },

      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        glass: "1.5rem",
      },

      borderColor: {
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          lighter: "rgba(255, 255, 255, 0.15)",
          lightest: "rgba(255, 255, 255, 0.2)",
        },
      },

      animation: {
        // Smooth fade in/out
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-out": "fadeOut 0.6s ease-out",

        // Glow effects
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "glow-pulse-fast": "glowPulse 1.5s ease-in-out infinite",

        // Subtle movement
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",

        // Holographic/shimmer
        shimmer: "shimmer 2s ease-in-out infinite",
        hologram: "hologram 4s ease-in-out infinite",

        // Text/typing
        type: "type 3s steps(40, end)",
        blink: "blink 0.7s infinite",

        // Loading
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",

        // Entrance animations
        "slide-in-up": "slideInUp 0.5s ease-out",
        "slide-in-down": "slideInDown 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",

        // Scale entrance
        "scale-in": "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        hologram: {
          "0%": { opacity: "0.8", transform: "translateY(0px)" },
          "50%": { opacity: "1", transform: "translateY(-5px)" },
          "100%": { opacity: "0.8", transform: "translateY(0px)" },
        },
        type: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 50%, 100%": { opacity: "1" },
          "25%, 75%": { opacity: "0" },
        },
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },

      transitionTimingFunction: {
        "ease-in-out-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-out-smooth": "cubic-bezier(0, 0, 0.2, 1)",
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },

      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
        mono: [
          '"SF Mono"',
          "Monaco",
          '"Cascadia Code"',
          '"Roboto Mono"',
          "Consolas",
          '"Courier New"',
          "monospace",
        ],
      },

      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
      },

      opacity: {
        2: "0.02",
        5: "0.05",
        7: "0.07",
      },
    },
  },

  plugins: [],
};

export default config;
