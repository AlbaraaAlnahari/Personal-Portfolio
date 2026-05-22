"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * About Module
 * Intelligent system overview and personal engineering profile
 * Cinematic composition with subtle interface layering
 */
export function AboutModule() {
  const expertise = [
    "AI-enabled products",
    "Full-stack development",
    "Robotics engineering",
    "User research",
    "Technical leadership",
    "Scalable web systems",
  ];

  const technologies = [
    { category: "Frontend", tools: "React, Next.js, TypeScript, Tailwind CSS" },
    { category: "Backend", tools: "Python, Java, SQL, Supabase" },
    { category: "AI/ML", tools: "Gemini API, Qwen API, Claude API, LLMs" },
    { category: "DevOps", tools: "Git, Deployment, Performance Optimization" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-accent-cyan">About</span> Albaraa
            </h2>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              Software Engineering student building AI-enabled products and intelligent systems
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left: Profile Overview */}
            <motion.div variants={itemVariants} className="space-y-6">
              <GlassPanel className="p-6 space-y-4">
                <div>
                  <h3 className="text-sm text-accent-cyan font-mono tracking-widest mb-3">
                    ENGINEERING PROFILE
                  </h3>
                  <p className="text-foreground-primary leading-relaxed">
                    Albaraa Alnahari is a Software Engineering student with experience in creating
                    intelligent, scalable products. Passionate about transforming complex problems
                    into elegant technical solutions.
                  </p>
                </div>

                <div className="pt-4 border-t border-glass-light">
                  <h4 className="text-xs text-accent-green font-mono tracking-widest mb-3">
                    CORE EXPERTISE
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((skill, index) => (
                      <motion.span
                        key={skill}
                        variants={itemVariants}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-1 rounded-md bg-background-primary/40 border border-glass-light/30 text-xs text-foreground-secondary hover:text-accent-cyan hover:border-accent-cyan/50 transition-all"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            </motion.div>

            {/* Right: Technologies */}
            <motion.div variants={itemVariants} className="space-y-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.category}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassPanel className="p-4 hover:border-glass-lighter transition-all">
                    <div>
                      <h4 className="text-xs font-mono text-accent-green tracking-widest mb-2">
                        {tech.category}
                      </h4>
                      <p className="text-sm text-foreground-secondary/80">
                        {tech.tools}
                      </p>
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats/Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Projects Built", value: "4+" },
              { label: "Technologies", value: "12+" },
              { label: "AI Products", value: "3" },
              { label: "Bootcamps", value: "1st Place" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                transition={{ delay: index * 0.08 }}
                className="text-center"
              >
                <GlassPanel className="p-4">
                  <div className="text-xl md:text-2xl font-bold text-accent-cyan mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-foreground-secondary">
                    {stat.label}
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
