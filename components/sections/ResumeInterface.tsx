"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * Resume Interface
 * System dossier and professional credentials
 * Interactive CV experience with premium aesthetic
 */
export function ResumeInterface() {
  const sections = [
    {
      id: "education",
      label: "Educational Systems",
      icon: "◇",
      items: [
        {
          title: "Bachelor of Software Engineering",
          organization: "University of Jeddah",
          date: "Expected 2027",
          description: "Software engineering studies with a focus on AI-enabled products, full-stack development, and systems thinking.",
        },
      ],
    },
    {
      id: "certifications",
      label: "System Certifications",
      icon: "★",
      items: [
        {
          title: "Robotics Engineer Certification",
          organization: "Smart Method",
          date: "2025",
          description: "Hands-on certification in AI robotics, 3D modeling, and automation.",
        },
      ],
    },
    {
      id: "achievements",
      label: "System Achievements",
      icon: "●",
      items: [
        {
          title: "1st Place — AI Innovation Bootcamp",
          organization: "DocuPilot",
          date: "2026",
          description: "First place for DocuPilot, an AI business operations platform built during the AI Innovation Bootcamp.",
        },
      ],
    },
  ];

  const coreCompetencies = [
    "Full-Stack Development",
    "AI-Powered Product Development",
    "Product Research",
    "Robotics Engineering",
    "Systems Thinking",
    "Technical Leadership",
  ];

  return (
    <section id="resume" className="py-20 md:py-32 relative">
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
              <span className="text-accent-cyan">System</span> Dossier
            </h2>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              Professional credentials, certifications, and comprehensive engineering profile
            </p>
          </motion.div>

          {/* Credentials Grid */}
          <motion.div
            variants={containerVariants}
            className="space-y-6"
          >
            {sections.map((section) => (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="space-y-4"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl text-accent-cyan">
                    {section.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground-primary">
                    {section.label}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-accent-cyan/50 to-transparent" />
                </div>

                {/* Items Grid */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={`${section.id}-${itemIndex}`}
                      variants={itemVariants}
                      transition={{ delay: itemIndex * 0.05 }}
                      className="group"
                    >
                      <GlassPanel className="p-5 h-full hover:border-glass-lighter transition-all space-y-3">
                        <div>
                          <h4 className="font-semibold text-foreground-primary text-sm">
                            {item.title}
                          </h4>
                          <p className="text-xs text-accent-cyan/80 mt-1">
                            {item.organization}
                          </p>
                        </div>

                        <p className="text-xs text-foreground-secondary leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-glass-light/30">
                          <span className="text-xs text-foreground-secondary/60 font-mono">
                            {item.date}
                          </span>
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-accent-green"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </GlassPanel>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Core Competencies */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl text-accent-green">◆</span>
              <h3 className="text-xl font-semibold text-foreground-primary">
                Core Competencies
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-accent-green/50 to-transparent" />
            </div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {coreCompetencies.map((competency, index) => (
                <motion.div
                  key={competency}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassPanel className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      <div className="text-sm font-medium text-foreground-secondary hover:text-foreground-primary transition-colors">
                        {competency}
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Download Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            {/* Download → official PDF (real Button preserved; anchor carries
                the link semantics so styling matches the approved design). */}
            <a
              href="/resume/Albaraa-Alnahari-Resume.pdf"
              download="Albaraa-Alnahari-Resume.pdf"
              className="contents"
            >
              <Button
                variant="primary"
                size="lg"
                glow
                className="sm:w-auto"
                tabIndex={-1}
              >
                Download Full Resume
              </Button>
            </a>
            <a
              href="/resume/Albaraa-Alnahari-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="contents"
            >
              <Button
                variant="glass"
                size="lg"
                className="sm:w-auto"
                tabIndex={-1}
              >
                View PDF
              </Button>
            </a>
          </motion.div>

          {/* Status */}
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-foreground-secondary/70 max-w-2xl mx-auto"
          >
            <p>
              Comprehensive professional dossier showcasing engineering excellence, leadership capabilities, and proven track record of delivering innovative solutions in AI and full-stack development.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
