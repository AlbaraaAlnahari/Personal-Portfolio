"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * Projects Systems
 * Showcase of deployed AI systems and intelligent platforms
 * Each project feels like an active, operational module
 */
export function ProjectsSystems() {
  const projects = [
    {
      id: "docupilot",
      name: "DocuPilot",
      tagline: "AI Business Operations Platform",
      description:
        "AI SaaS platform transforming business documents into structured workflows, approvals, and operational systems. Intelligent document processing with AI-powered automation.",
      achievement: "🏆 1st Place — AI Innovation Bootcamp",
      tech: ["Next.js", "TypeScript", "Supabase", "Gemini API", "Qwen API", "Zod"],
      featured: true,
      metrics: { documents: "1000+", automations: "500+", users: "50+" },
    },
    {
      id: "techpath",
      name: "TechPath",
      tagline: "AI Learning Roadmap Generator",
      description:
        "AI-powered roadmap generator with personalized learning timelines and adaptive educational systems. Tailored tech education paths using advanced LLMs.",
      tech: ["React.js", "Tailwind CSS", "Claude API"],
      featured: false,
    },
    {
      id: "sanadk",
      name: "Sanadk",
      tagline: "Accessibility-First Mobile Experience",
      description:
        "Accessibility-focused mobile application designed for visually impaired and wheelchair users. Premium UX/UI with inclusion-first design principles.",
      tech: ["UX/UI", "Figma", "Accessibility Design"],
      featured: false,
    },
    {
      id: "slidemind",
      name: "Slide-Mind",
      tagline: "AI Flashcard Generation System",
      description:
        "AI-powered flashcard generation with modular architecture. Intelligent study material creation from source documents.",
      tech: ["Java", "API Integration", "Educational AI"],
      featured: false,
    },
  ];

  const FeaturedProject = ({ project }: { project: typeof projects[0] }) => (
    <motion.div
      variants={itemVariants}
      className="relative group"
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%)`,
        }}
      />
      <GlassPanel className="p-8 md:p-10 space-y-6 relative z-10 hover:border-glass-lighter transition-all">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-accent-cyan mb-2">
                {project.name}
              </h3>
              <p className="text-lg text-foreground-secondary">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Achievement Badge */}
          {project.achievement && (
            <div className="inline-block px-4 py-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30">
              <span className="text-sm text-accent-cyan font-medium">
                {project.achievement}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-foreground-secondary/90 leading-relaxed text-lg">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-glass-light">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key}>
                <div className="text-2xl font-bold text-accent-green mb-1">
                  {value}
                </div>
                <div className="text-xs text-foreground-secondary capitalize">
                  {key}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h4 className="text-xs font-mono text-accent-green tracking-widest mb-3">
            TECHNOLOGY STACK
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 rounded-md bg-background-primary/40 border border-glass-light/40 text-xs text-foreground-secondary hover:text-accent-cyan hover:border-accent-cyan/50 transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href={`#project-${project.id}`}
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-2 text-sm text-accent-cyan hover:text-accent-green transition-colors mt-4"
        >
          <span>Explore System</span>
          <span>→</span>
        </motion.a>
      </GlassPanel>
    </motion.div>
  );

  const RegularProject = ({ project }: { project: typeof projects[0] }) => (
    <motion.div
      variants={itemVariants}
      className="relative group"
    >
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, rgba(0, 217, 255, 0.2) 0%, transparent 70%)`,
        }}
      />
      <GlassPanel className="p-6 space-y-4 relative z-10 hover:border-glass-lighter transition-all h-full">
        <div>
          <h4 className="text-xl font-bold text-accent-cyan mb-1">
            {project.name}
          </h4>
          <p className="text-sm text-foreground-secondary">
            {project.tagline}
          </p>
        </div>

        <p className="text-sm text-foreground-secondary/80 leading-relaxed">
          {project.description}
        </p>

        <div>
          <h5 className="text-xs font-mono text-accent-green tracking-widest mb-2">
            STACK
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded text-xs bg-background-primary/30 border border-glass-light/20 text-foreground-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );

  const featuredProject = projects.find((p) => p.featured)!;
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
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
              <span className="text-accent-cyan">Deployed</span> Systems
            </h2>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              AI-powered platforms and intelligent software modules in active operation
            </p>
          </motion.div>

          {/* Featured Project */}
          <FeaturedProject project={featuredProject} />

          {/* Other Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {otherProjects.map((project) => (
              <RegularProject key={project.id} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
