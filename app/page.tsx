"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ImprovedHeroSection } from "@/components/sections/ImprovedHeroSection";
import {
  containerVariants,
  itemVariants,
  pageTransitionVariants,
} from "@/lib/motion/variants";

/**
 * Home Page - Landing experience
 * Phase 2: Improved Hero with clear messaging and cinematic loading
 */
export default function Home() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={pageTransitionVariants}
      className="min-h-screen"
    >
      {/* Improved Hero Section */}
      <ImprovedHeroSection />

      {/* Featured Section - Foundation placeholder */}
      <section className="py-20 md:py-32 relative">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-accent-green">Featured</span> Work
              </h2>
              <p className="text-foreground-secondary text-lg max-w-2xl">
                Showcase of premium projects and innovative solutions powered by AI.
              </p>
            </motion.div>

            {/* Grid placeholder */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3].map((i) => (
                <motion.div key={i} variants={itemVariants}>
                  <GlassPanel
                    className="aspect-video flex items-center justify-center"
                    interactive
                    glow
                  >
                    <div className="text-center">
                      <div className="text-sm text-foreground-secondary">
                        Project {i}
                      </div>
                      <div className="text-accent-cyan mt-2">Foundation Only</div>
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-light py-12 mt-20">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-foreground-secondary text-sm"
          >
            <motion.p variants={itemVariants}>
              &copy; 2024 Albaraa OS. Crafted with precision and futuristic vision.
            </motion.p>
          </motion.div>
        </Container>
      </footer>
    </motion.main>
  );
}
