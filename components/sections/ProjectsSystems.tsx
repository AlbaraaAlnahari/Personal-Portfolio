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
      {/* Ambient glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.4) 0%, transparent 70%)`,
        }}
      />

      <GlassPanel className="p-8 md:p-12 space-y-8 relative z-10 group-hover:border-accent-cyan/50 transition-all duration-500">
        {/* System Identifier */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-accent-cyan/70 tracking-widest">
            SYSTEM 01 / FLAGSHIP
          </div>
          <div className="w-2 h-2 rounded-full bg-accent-green/60 animate-pulse" />
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-cyan mb-3">
              {project.name}
            </h3>
            <p className="text-lg md:text-xl text-foreground-secondary">
              {project.tagline}
            </p>
          </div>

          {/* Achievement Badge */}
          {project.achievement && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block px-4 py-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/40 hover:border-accent-cyan/60 transition-all"
            >
              <span className="text-sm text-accent-cyan font-medium flex items-center gap-2">
                <span>🏆</span> {project.achievement}
              </span>
            </motion.div>
          )}
        </div>

        {/* Description */}
        <div className="border-t border-glass-light/30 pt-8">
          <p className="text-foreground-secondary/90 leading-relaxed text-lg">
            {project.description}
          </p>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-glass-light/30">
            {Object.entries(project.metrics).map(([key, value]) => (
              <motion.div
                key={key}
                whileHover={{ y: -2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-accent-green mb-2">
                  {value}
                </div>
                <div className="text-xs text-foreground-secondary/70 uppercase tracking-widest">
                  {key}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h4 className="text-xs font-mono text-accent-purple tracking-widest mb-4">
            TECHNOLOGY STACK
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 rounded-md bg-background-primary/50 border border-glass-light/40 text-xs text-foreground-secondary/90 hover:text-accent-cyan hover:border-accent-cyan/60 transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href={`#project-${project.id}`}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan hover:text-accent-green transition-colors pt-4"
        >
          <span>Explore System Details</span>
          <span className="text-lg">→</span>
        </motion.a>
      </GlassPanel>
    </motion.div>
  );

  const RegularProject = ({ project, index }: { project: typeof projects[0]; index: number }) => (
    <motion.div
      variants={itemVariants}
      className="relative group h-full"
    >
      {/* Subtle glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, rgba(0, 217, 255, 0.2) 0%, transparent 70%)`,
        }}
      />

      <GlassPanel className="p-6 md:p-8 space-y-6 relative z-10 group-hover:border-accent-cyan/40 transition-all h-full flex flex-col">
        {/* System number + status */}
        <div className="flex items-start justify-between">
          <span className="text-xs font-mono text-accent-cyan/60 tracking-widest">
            SYSTEM {String(index + 2).padStart(2, "0")}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-accent-green/50" />
        </div>

        {/* Title */}
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-accent-cyan mb-2 group-hover:text-accent-green transition-colors">
            {project.name}
          </h4>
          <p className="text-sm text-foreground-secondary/80">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-secondary/75 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Divider */}
        <div className="border-t border-glass-light/20" />

        {/* Tech Stack */}
        <div>
          <h5 className="text-xs font-mono text-accent-green/80 tracking-widest mb-3 uppercase">
            Tech Stack
          </h5>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-1 rounded-sm text-xs bg-background-primary/40 border border-glass-light/30 text-foreground-secondary/80 hover:text-accent-cyan hover:border-accent-cyan/40 transition-all"
              >
                {tech}
              </motion.span>
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
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-sm font-mono text-accent-green tracking-widest">
              DEPLOYED SYSTEMS / FEATURED WORK
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Products designed to turn
              <br />
              intelligence into action.
            </h2>
            <p className="text-foreground-secondary/80 text-lg max-w-2xl leading-relaxed">
              Intelligent platforms solving real problems. AI-powered systems designed with purpose, built for impact.
            </p>
          </motion.div>

          {/* Featured Project */}
          <FeaturedProject project={featuredProject} />

          {/* Other Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {otherProjects.map((project, index) => (
              <RegularProject key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
