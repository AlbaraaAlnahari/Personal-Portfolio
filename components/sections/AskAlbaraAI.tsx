"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * Ask Albaraa AI
 * Premium AI assistant interface placeholder
 * Holographic, futuristic, cinematic design
 */
export function AskAlbaraAI() {
  const samplePrompts = [
    "Who is Albaraa?",
    "What projects has he built?",
    "Show AI projects",
    "What technologies does he use?",
    "Is he available for internships?",
    "Tell me about DocuPilot",
  ];

  return (
    <section id="ai-assistant" className="py-20 md:py-32 relative">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-accent-cyan">Ask</span> Albaraa AI
            </h2>
            <p className="text-foreground-secondary text-lg">
              Intelligent conversational interface. Ask questions about Albaraa's projects, skills, and experience.
            </p>
          </motion.div>

          {/* AI Interface Placeholder */}
          <motion.div variants={itemVariants} className="relative">
            {/* Holographic Background Effect */}
            <motion.div
              className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, rgba(0, 217, 255, 0.3) 0%, transparent 70%)`,
              }}
              animate={{
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <GlassPanel className="p-8 md:p-10 space-y-8 relative z-10">
              {/* Chat Interface */}
              <div className="space-y-4 min-h-60">
                {/* Status Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-accent-green/20 border border-accent-green/40 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-accent-green">●</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-foreground-primary">
                      Albaraa's AI Assistant
                    </p>
                    <p className="text-xs text-foreground-secondary">
                      Welcome! I'm an intelligent assistant trained on Albaraa's portfolio. Ask me anything about his projects, skills, and experience. Coming soon!
                    </p>
                  </div>
                </motion.div>

                {/* Placeholder */}
                <div className="flex justify-center items-center py-8">
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center"
                  >
                    <motion.div className="flex gap-1 justify-center mb-2">
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-accent-cyan"
                      />
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }}
                        className="w-2 h-2 rounded-full bg-accent-cyan"
                      />
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-accent-cyan"
                      />
                    </motion.div>
                    <p className="text-xs text-foreground-secondary/60 font-mono">
                      AI System initializing...
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Sample Prompts */}
              <div className="space-y-3 border-t border-glass-light/30 pt-6">
                <p className="text-xs text-accent-cyan font-mono tracking-widest">
                  SUGGESTED QUERIES
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {samplePrompts.map((prompt, index) => (
                    <motion.button
                      key={prompt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 217, 255, 0.1)" }}
                      className="text-left px-4 py-3 rounded-lg bg-background-primary/30 border border-glass-light/30 hover:border-accent-cyan/50 text-sm text-foreground-secondary hover:text-accent-cyan transition-all"
                      disabled
                    >
                      "{prompt}"
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-3 border-t border-glass-light/30 pt-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    disabled
                    className="flex-1 px-4 py-3 rounded-lg bg-background-primary/40 border border-glass-light/30 text-foreground-primary placeholder-foreground-secondary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    disabled
                    className="px-6 py-3 rounded-lg bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Send
                  </motion.button>
                </div>
                <p className="text-xs text-foreground-secondary/60 text-center font-mono">
                  ◆ Coming Soon — AI Assistant Initialization Complete upon launch
                </p>
              </div>
            </GlassPanel>
          </motion.div>

          {/* Info */}
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-foreground-secondary/70 max-w-2xl mx-auto"
          >
            <p>
              This intelligent assistant interface is currently in initialization mode. When activated, it will provide real-time insights into Albaraa's portfolio, projects, and professional background through conversational AI.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
