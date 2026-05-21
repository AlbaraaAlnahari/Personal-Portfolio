"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { AliveAICore } from "@/components/ai-core/AliveAICore";
import { EnvironmentalAtmosphere } from "@/components/environment/EnvironmentalAtmosphere";
import { IntegratedDiagnostics } from "@/components/environment/IntegratedDiagnostics";
import {
  fadeInUpVariants,
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * Improved Hero Section
 * Clear, recruiter-friendly messaging with cinematic visuals
 * Balances: 70% usability, 30% cinematic wow
 */
export function ImprovedHeroSection() {
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
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
      <EnvironmentalAtmosphere intensity="subtle" variant="hero">
        <Container className="relative z-10 w-full">
          <motion.div
            variants={containerVariants}
            className="flex flex-col items-center justify-center gap-12 text-center max-w-3xl mx-auto"
          >
            {/* Alive AI Core - The Emotional Heart */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative">
                <AliveAICore
                  size="lg"
                  interactive
                  showMetrics
                />
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-xs text-accent-cyan/60 font-mono">
                    Neural Engine | AI Systems | Innovation Core
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Primary Information */}
            <motion.div variants={itemVariants} className="space-y-4 pt-8">
              {/* Main Name */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="text-accent-cyan glow-cyan">Albaraa</span>
                <br />
                <span className="text-foreground-primary">Alnahari</span>
              </h1>

              {/* Subtitle - Roles */}
              <h2 className="text-lg md:text-2xl text-accent-green font-medium tracking-wide">
                Software Engineering Student · AI Builder · Full-Stack Developer
              </h2>

              {/* Description - What he builds */}
              <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
                I build AI-powered products, modern web experiences, and intelligent systems
                that turn ideas into usable software.
              </p>
            </motion.div>

            {/* Primary CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 flex-col sm:flex-row flex-wrap justify-center pt-8"
            >
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
            </motion.div>

            {/* Tertiary CTA - Contact */}
            <motion.div
              variants={itemVariants}
              className="pt-4"
            >
              <a
                href="#contact"
                className="text-sm text-foreground-secondary hover:text-accent-cyan transition-colors flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
                <span>→</span>
              </a>
            </motion.div>

            {/* Trust Indicators / Quick Facts */}
            <motion.div
              variants={itemVariants}
              className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 w-full"
            >
              {[
                { number: "4+", label: "Projects" },
                { number: "AI", label: "Focused" },
                { number: "Full-Stack", label: "Expertise" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-accent-cyan">
                    {item.number}
                  </div>
                  <div className="text-xs md:text-sm text-foreground-secondary">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>

        {/* Integrated System Diagnostics */}
        <IntegratedDiagnostics />
      </EnvironmentalAtmosphere>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-xs text-foreground-secondary/50 font-mono">
          scroll to explore
        </div>
      </motion.div>
    </motion.section>
  );
}
