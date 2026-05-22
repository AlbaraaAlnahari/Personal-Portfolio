"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { AliveAICore } from "@/components/ai-core/AliveAICore";
import { NeuralNavigationNodes } from "@/components/ai-core/NeuralNavigationNodes";
import { NeuralConnectionLines } from "@/components/ai-core/NeuralConnectionLines";
import { EnvironmentalAtmosphere } from "@/components/environment/EnvironmentalAtmosphere";
import { IntegratedDiagnostics } from "@/components/environment/IntegratedDiagnostics";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * Improved Hero Section
 * Clear, recruiter-friendly messaging with cinematic visuals
 * Balances: 70% usability, 30% cinematic wow
 */
export function ImprovedHeroSection() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <motion.section
      className="relative overflow-hidden"
      style={{
        minHeight: "calc(100vh - var(--nav-height))",
        paddingTop: "var(--nav-height)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {/* Neural Connection Lines Layer */}
      <NeuralConnectionLines activeSection={activeSection} hoveredNode={hoveredNode} />

      <EnvironmentalAtmosphere intensity="subtle">
        <Container className="relative z-10 w-full">
          <motion.div
            variants={containerVariants}
            className="flex flex-col items-center justify-center gap-10 text-center max-w-3xl mx-auto py-16"
          >
            {/* Alive AI Core - Floating holographic neural orb with Neural Navigation */}
            <motion.div
              variants={itemVariants}
              className="relative w-96 h-96"
              onMouseEnter={() => setActiveSection("ai-core")}
              onMouseLeave={() => setActiveSection("")}
            >
              {/* AI Core Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AliveAICore
                  size="lg"
                  interactive
                />
              </div>

              {/* Neural Navigation Nodes */}
              <NeuralNavigationNodes
                activeSection={activeSection}
                hoveredNode={hoveredNode}
                onHover={setHoveredNode}
              />
            </motion.div>

            {/* Primary Information */}
            <motion.div variants={itemVariants} className="space-y-4 pt-2">
              {/* Main Name */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-accent-cyan glow-cyan">Albaraa</span>
                <span className="text-foreground-primary"> Alnahari</span>
              </h1>

              {/* Subtitle - Roles */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-accent-green font-normal tracking-wide opacity-80">
                <span className="text-sm md:text-lg">Software Engineering Student</span>
                <span className="hidden sm:inline text-accent-green/40">·</span>
                <span className="text-sm md:text-lg">AI Builder</span>
                <span className="hidden sm:inline text-accent-green/40">·</span>
                <span className="text-sm md:text-lg">Full-Stack Developer</span>
              </div>

              {/* Description - What he builds */}
              <p className="text-base md:text-lg text-foreground-secondary/80 max-w-xl mx-auto leading-relaxed">
                I build AI-powered products, modern web experiences, and intelligent systems
                that turn ideas into usable software.
              </p>
            </motion.div>

            {/* CTAs Group - One intentional action section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-5 pt-2"
            >
              {/* Primary & Secondary Buttons */}
              <div className="flex gap-3 flex-col sm:flex-row flex-wrap justify-center">
                {/* Primary CTA - Projects */}
                <Button
                  variant="primary"
                  size="lg"
                  glow
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({
                      behavior: "smooth"
                    });
                  }}
                >
                  View Projects
                </Button>

                {/* Secondary CTA - Resume */}
                <Button
                  variant="glass"
                  size="lg"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.download = 'Albaraa_Alnahari_Resume.pdf';
                    link.click();
                  }}
                >
                  Download Resume
                </Button>
              </div>

              {/* Tertiary CTA - Contact Link */}
              <a
                href="#contact"
                className="text-sm text-foreground-secondary hover:text-accent-cyan transition-colors flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
                <span>→</span>
              </a>
            </motion.div>

            {/* System Indicators / Active Metrics */}
            <motion.div
              variants={itemVariants}
              className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full"
            >
              {[
                { number: "4", label: "DEPLOYED SYSTEMS", icon: "●" },
                { number: "∞", label: "NEURAL RUNTIME", icon: "●" },
                { number: "●", label: "WORKSPACE ACTIVE", icon: "◆" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-accent-cyan">
                    {item.number}
                  </div>
                  <div className="text-xs md:text-sm text-foreground-secondary font-mono tracking-widest flex items-center gap-1.5 bg-background-primary/20 px-2 py-1 rounded">
                    <span className="text-accent-green text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>

        {/* Integrated System Diagnostics */}
        <IntegratedDiagnostics />
      </EnvironmentalAtmosphere>

      {/* Cinematic scroll indicator - Guided exploration */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {/* Command-center style guidance text */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-foreground-secondary/70 font-mono tracking-widest">
            &gt; EXPLORE
          </span>
        </div>

        {/* Chevron animation synchronized with 4s AI Core breathing */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-lg text-accent-cyan"
        >
          ↓
        </motion.div>

        {/* Subtle glow indicator */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-accent-green"
          style={{
            boxShadow: "0 0 8px rgba(0, 255, 159, 0.6)",
          }}
        />
      </motion.div>
    </motion.section>
  );
}
