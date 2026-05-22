"use client";

import { motion } from "framer-motion";

interface HolographicProfileProps {
  initials?: string;
  systemMetrics?: {
    neural: number;
    coherence: number;
    latency: number;
  };
}

export function HolographicProfile({
  initials = "AOS",
  systemMetrics = { neural: 85, coherence: 92, latency: 5 },
}: HolographicProfileProps) {
  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      {/* Outer rotating frame */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-br from-accent-cyan via-accent-purple to-accent-green bg-clip-border"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Secondary rotating frame (slower) */}
      <motion.div
        className="absolute inset-2 rounded-full border border-accent-cyan/30 bg-clip-border"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner glow frame */}
      <motion.div
        className="absolute inset-4 rounded-full border border-accent-purple/40"
        animate={{
          boxShadow: [
            "0 0 20px rgba(181, 55, 242, 0.3), inset 0 0 20px rgba(0, 217, 255, 0.1)",
            "0 0 40px rgba(181, 55, 242, 0.5), inset 0 0 30px rgba(0, 217, 255, 0.2)",
            "0 0 20px rgba(181, 55, 242, 0.3), inset 0 0 20px rgba(0, 217, 255, 0.1)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Holographic center content */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-background-primary/40 to-background-tertiary/20 border border-accent-cyan/20 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
        {/* Profile initials or content */}
        <motion.div
          className="text-4xl font-bold text-accent-cyan"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {initials}
        </motion.div>

        {/* System metrics display */}
        <div className="space-y-1 text-center">
          <motion.div
            className="text-xs text-accent-green font-mono"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <span className="text-accent-cyan">Neural:</span> {systemMetrics.neural}%
          </motion.div>
          <motion.div
            className="text-xs text-accent-purple font-mono"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <span className="text-accent-green">Coherence:</span> {systemMetrics.coherence}%
          </motion.div>
        </div>
      </div>

      {/* Floating system indicator dots */}
      {[0, 1, 2].map((i) => {
        const angle = (i * Math.PI * 2) / 3;
        const x = Math.cos(angle) * 140;
        const y = Math.sin(angle) * 140;

        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent-cyan"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        );
      })}

      {/* Data label indicators */}
      <motion.div
        className="absolute top-4 right-4 text-xs font-mono text-accent-green/60 pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        AIOS v4.2
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-4 text-xs font-mono text-accent-purple/60 pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        HOLO. PROFILE
      </motion.div>
    </div>
  );
}
