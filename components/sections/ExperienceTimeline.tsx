"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * Experience Timeline
 * Mission logs and deployment history
 * Operational visual language with system progression aesthetic
 */
export function ExperienceTimeline() {
  const experiences = [
    {
      id: "soum",
      title: "Product Management Intern",
      company: "Soum Company",
      period: "Recent",
      description:
        "Led product strategy and user research initiatives. Collaborated with engineering teams on feature development and market positioning.",
      highlights: ["Product Strategy", "User Research", "Cross-functional Leadership"],
      status: "active",
    },
    {
      id: "smartmethod",
      title: "Robotics Engineering Intern",
      company: "Smart Method Company",
      period: "Previous",
      description:
        "Engineered intelligent robotics systems with focus on autonomous decision-making and real-world deployment challenges.",
      highlights: ["Robotics", "Autonomous Systems", "Hardware Integration"],
      status: "active",
    },
    {
      id: "alaqsa",
      title: "Summer Program Director",
      company: "Al-Aqsa Private Schools",
      period: "Previous",
      description:
        "Directed educational summer programs with focus on technical leadership, curriculum design, and community impact.",
      highlights: ["Leadership", "Education", "Program Design"],
      status: "active",
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-32 relative">
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
              <span className="text-accent-cyan">Mission</span> Timeline
            </h2>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              Deployment history and operational experience
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline Connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-8 top-24 w-px h-12 bg-gradient-to-b from-accent-cyan/50 to-transparent hidden md:block" />
                )}

                <GlassPanel className="p-6 md:p-8 hover:border-glass-lighter transition-all">
                  <div className="flex gap-6">
                    {/* Timeline Marker */}
                    <div className="flex flex-col items-center gap-4 pt-1">
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-accent-cyan bg-background-primary"
                        animate={{ boxShadow: ["0 0 0 0 rgba(0, 217, 255, 0.4)", "0 0 0 8px rgba(0, 217, 255, 0)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="text-xs text-foreground-secondary/50 font-mono">
                        {experience.period}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3 pb-2">
                      <div>
                        <h3 className="text-xl font-bold text-accent-cyan">
                          {experience.title}
                        </h3>
                        <p className="text-sm text-foreground-secondary">
                          {experience.company}
                        </p>
                      </div>

                      <p className="text-foreground-secondary/80 text-sm leading-relaxed">
                        {experience.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {experience.highlights.map((highlight) => (
                          <motion.span
                            key={highlight}
                            className="px-3 py-1 rounded-md bg-background-primary/40 border border-glass-light/30 text-xs text-foreground-secondary text-accent-green/80"
                          >
                            {highlight}
                          </motion.span>
                        ))}
                      </div>

                      {/* Status Indicator */}
                      <div className="flex items-center gap-2 pt-2">
                        <motion.span
                          className="w-2 h-2 rounded-full bg-accent-green"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-xs text-foreground-secondary/60 font-mono">
                          {experience.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
