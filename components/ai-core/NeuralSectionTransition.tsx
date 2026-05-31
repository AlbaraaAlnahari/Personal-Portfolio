"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface NeuralTransitionState {
  isActive: boolean;
  label: string;
  color: string;
}

// Create a simple global state for transitions
let transitionCallback: ((state: NeuralTransitionState) => void) | null = null;

export function setNeuralTransition(state: NeuralTransitionState) {
  if (transitionCallback) {
    transitionCallback(state);
  }
}

export function NeuralSectionTransition() {
  const [transition, setTransition] = useState<NeuralTransitionState>({
    isActive: false,
    label: "",
    color: "rgb(0, 217, 255)",
  });

  useEffect(() => {
    transitionCallback = setTransition;
    return () => {
      transitionCallback = null;
    };
  }, []);

  return (
    <AnimatePresence>
      {transition.isActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Energy sweep from left to right */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${transition.color}40 50%, transparent 100%)`,
            }}
          />

          {/* Horizontal activation trace */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              top: "50%",
              background: `linear-gradient(90deg, transparent 0%, ${transition.color} 50%, transparent 100%)`,
              transformOrigin: "center",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Micro-label */}
          <motion.div
            className="absolute text-xs font-mono tracking-widest"
            style={{
              color: transition.color,
              top: "calc(50% - 24px)",
            }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            &gt; {transition.label}
          </motion.div>

          {/* Small corner indicators */}
          <motion.div
            className="absolute w-8 h-8 border-t-2 border-l-2 top-8 left-8"
            style={{ borderColor: transition.color }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          />
          <motion.div
            className="absolute w-8 h-8 border-b-2 border-r-2 bottom-8 right-8"
            style={{ borderColor: transition.color }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
