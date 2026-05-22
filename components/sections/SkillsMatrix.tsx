"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * Skills Matrix
 * Neural diagnostics of engineering capabilities
 * Categorized intelligence modules displayed as operational systems
 */
export function SkillsMatrix() {
  const skillCategories = [
    {
      name: "Programming Languages",
      icon: "◆",
      color: "text-accent-cyan",
      skills: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
    },
    {
      name: "AI & Machine Learning",
      icon: "●",
      color: "text-accent-green",
      skills: ["LLM APIs", "Gemini", "Claude", "Qwen", "Prompt Engineering"],
    },
    {
      name: "Frontend Development",
      icon: "◈",
      color: "text-accent-purple",
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    },
    {
      name: "Backend & Databases",
      icon: "◇",
      color: "text-accent-cyan",
      skills: ["Supabase", "Node.js", "REST APIs", "Database Design", "Authentication"],
    },
    {
      name: "Tools & Infrastructure",
      icon: "▲",
      color: "text-accent-green",
      skills: ["Git", "GitHub", "Figma", "VS Code", "Deployment"],
    },
    {
      name: "Leadership & Soft Skills",
      icon: "★",
      color: "text-accent-purple",
      skills: ["Team Leadership", "Product Strategy", "User Research", "Communication", "Project Management"],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-accent-cyan">Capabilities</span> Matrix
            </h2>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              Engineering intelligence and operational competencies
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="group relative"
              >
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, rgba(0, 217, 255, 0.2) 0%, transparent 70%)`,
                  }}
                />

                <GlassPanel className="p-6 space-y-4 relative z-10 hover:border-glass-lighter transition-all h-full flex flex-col">
                  {/* Category Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg ${category.color}`}>
                        {category.icon}
                      </span>
                      <h3 className="font-semibold text-foreground-primary">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2 flex-1">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.05 }}
                        className="flex items-center gap-2"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${category.color}`} />
                        <span className="text-sm text-foreground-secondary hover:text-foreground-primary transition-colors">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Status Indicator */}
                  <div className="pt-3 border-t border-glass-light/30">
                    <div className="flex items-center gap-2">
                      <motion.span
                        className={`w-2 h-2 rounded-full ${category.color}`}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 2 + index * 0.2,
                          repeat: Infinity,
                        }}
                      />
                      <span className="text-xs text-foreground-secondary/60 font-mono">
                        OPERATIONAL
                      </span>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Skill Categories", value: "6" },
              { label: "Total Skills", value: "25+" },
              { label: "AI Technologies", value: "5+" },
              { label: "Full-Stack Capable", value: "✓" },
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
