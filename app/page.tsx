"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { AICoreSphere } from "@/components/ai-core/AICoreSphere";
import {
  fadeInUpVariants,
  containerVariants,
  itemVariants,
  pageTransitionVariants,
} from "@/lib/motion/variants";

/**
 * Home Page - Landing experience
 * Foundation only - placeholder for full content
 */
export default function Home() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={pageTransitionVariants}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 bg-accent-cyan/5 rounded-full filter blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{ top: "-10%", right: "-5%" }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-accent-purple/5 rounded-full filter blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{ bottom: "-10%", left: "-5%" }}
          />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={containerVariants}
            className="flex flex-col items-center justify-center gap-12 text-center"
          >
            {/* AI Core Sphere */}
            <motion.div variants={itemVariants}>
              <AICoreSphere size="lg" glow interactive />
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-accent-cyan glow-cyan">Albaraa OS</span>
                <br />
                <span className="text-foreground-primary">AI Software Lab</span>
              </h1>
              <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
                Futuristic portfolio experience powered by intelligent design and
                cutting-edge technology.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 flex-wrap justify-center"
            >
              <Button variant="primary" size="lg" glow>
                Explore Projects
              </Button>
              <Button variant="glass" size="lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

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
