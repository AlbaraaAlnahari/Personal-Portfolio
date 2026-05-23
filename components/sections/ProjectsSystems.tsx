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
      category: "AI SaaS / Business Operations",
      description:
        "AI SaaS platform transforming business documents into structured workflows, approvals, and operational systems. Intelligent document processing with AI-powered automation.",
      recognition: "1st Place — AI Innovation Bootcamp",
      tech: ["Next.js", "TypeScript", "Supabase", "Gemini API", "Qwen API", "Zod"],
      featured: true,
    },
    {
      id: "techpath",
      name: "TechPath",
      tagline: "AI Learning Roadmap Generator",
      category: "AI Education / Personalization",
      description:
        "AI-powered roadmap generator with personalized learning timelines and adaptive educational systems.",
      tech: ["React.js", "Tailwind CSS", "Claude API"],
      featured: false,
    },
    {
      id: "sanadk",
      name: "Sanadk Accessibility App",
      tagline: "Accessible Mobility Experience",
      category: "Accessibility / Inclusive Design",
      description:
        "Accessibility-first mobile experience for visually impaired and wheelchair users.",
      tech: ["UX/UI", "Figma", "Accessibility Design"],
      featured: false,
    },
    {
      id: "slidemind",
      name: "Slide-Mind Flashcard Generator",
      tagline: "AI Study System",
      category: "AI Learning Tools",
      description:
        "AI-powered flashcard generation system with modular architecture.",
      tech: ["Java", "API Integration"],
      featured: false,
    },
  ];

  const FeaturedProject = ({ project }: { project: typeof projects[0] }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      className="relative group"
    >
      {/* Ambient glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.4) 0%, transparent 70%)`,
        }}
      />

      <GlassPanel className="relative z-10 group-hover:border-accent-cyan/50 transition-all duration-500 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Left: Text Content */}
          <div className="md:col-span-3 p-8 md:p-12 space-y-8">
            {/* System Label */}
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-accent-cyan/70 tracking-widest">
                SYSTEM 01 / FLAGSHIP MODULE
              </div>
              <div className="w-2 h-2 rounded-full bg-accent-green/60 animate-pulse" />
            </div>

            {/* Category */}
            <div className="text-xs font-mono text-accent-purple/60 tracking-widest uppercase">
              {project.category}
            </div>

            {/* Header */}
            <div className="space-y-3">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-cyan">
                {project.name}
              </h3>
              <p className="text-lg md:text-xl text-foreground-secondary">
                {project.tagline}
              </p>
            </div>

            {/* Recognition Badge */}
            {project.recognition && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/40">
                <div className="w-2 h-2 rounded-full bg-accent-cyan/80" />
                <span className="text-xs text-accent-cyan font-medium tracking-wide">
                  {project.recognition}
                </span>
              </div>
            )}

            {/* Description */}
            <div className="border-t border-glass-light/30 pt-8">
              <p className="text-foreground-secondary/90 leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono text-accent-purple tracking-widest mb-4">
                TECHNOLOGY STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md bg-background-primary/50 border border-glass-light/40 text-xs text-foreground-secondary/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Abstract Workflow Visualization */}
          <div className="md:col-span-2 p-8 md:p-12 flex flex-col items-center justify-center bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 border-l border-glass-light/20">
            <svg viewBox="0 0 200 300" className="w-full max-w-[120px] h-auto">
              {/* Workflow stages */}
              <g>
                {/* Stage 1: Input */}
                <circle cx="100" cy="40" r="18" fill="none" stroke="rgb(0, 217, 255)" strokeWidth="1.5" opacity="0.6" />
                <text x="100" y="45" textAnchor="middle" fontSize="9" fill="rgb(0, 217, 255)" opacity="0.8">
                  INPUT
                </text>

                {/* Connecting line 1 */}
                <line x1="100" y1="58" x2="100" y2="95" stroke="rgb(0, 217, 255)" strokeWidth="1" opacity="0.3" strokeDasharray="4,2" />

                {/* Stage 2: Processing */}
                <circle cx="100" cy="115" r="18" fill="none" stroke="rgb(181, 55, 242)" strokeWidth="1.5" opacity="0.6" />
                <text x="100" y="120" textAnchor="middle" fontSize="9" fill="rgb(181, 55, 242)" opacity="0.8">
                  EXTRACT
                </text>

                {/* Connecting line 2 */}
                <line x1="100" y1="133" x2="100" y2="170" stroke="rgb(181, 55, 242)" strokeWidth="1" opacity="0.3" strokeDasharray="4,2" />

                {/* Stage 3: Workflow */}
                <circle cx="100" cy="190" r="18" fill="none" stroke="rgb(0, 255, 159)" strokeWidth="1.5" opacity="0.6" />
                <text x="100" y="195" textAnchor="middle" fontSize="9" fill="rgb(0, 255, 159)" opacity="0.8">
                  WORKFLOW
                </text>

                {/* Connecting line 3 */}
                <line x1="100" y1="208" x2="100" y2="245" stroke="rgb(0, 255, 159)" strokeWidth="1" opacity="0.3" strokeDasharray="4,2" />

                {/* Stage 4: Operations */}
                <circle cx="100" cy="265" r="18" fill="none" stroke="rgb(0, 217, 255)" strokeWidth="1.5" opacity="0.6" />
                <text x="100" y="270" textAnchor="middle" fontSize="9" fill="rgb(0, 217, 255)" opacity="0.8">
                  OPS
                </text>

                {/* Animated energy pulse - subtle animation on load */}
                <circle cx="100" cy="40" r="18" fill="none" stroke="rgb(0, 217, 255)" strokeWidth="1.5" opacity="0.2" style={{ animation: "systemPulse 4s ease-in-out infinite" }} />
              </g>
            </svg>
            <div className="mt-6 text-center text-xs text-foreground-secondary/60 font-mono tracking-widest">
              AI OPERATIONS PIPELINE
            </div>
          </div>
        </div>
      </GlassPanel>

      <style>{`
        @keyframes systemPulse {
          0%, 100% { r: 18; opacity: 0.2; }
          50% { r: 24; opacity: 0; }
        }
      `}</style>
    </motion.div>
  );

  const RegularProject = ({ project, index }: { project: typeof projects[0]; index: number }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
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

        {/* Category */}
        <div className="text-xs font-mono text-accent-purple/60 tracking-widest uppercase">
          {project.category}
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
              <span
                key={tech}
                className="px-2.5 py-1 rounded-sm text-xs bg-background-primary/40 border border-glass-light/30 text-foreground-secondary/80"
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
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-sm font-mono text-accent-green tracking-widest">
                DEPLOYED SYSTEMS / FEATURED WORK
              </div>
              <div className="text-xs font-mono text-accent-cyan/60 tracking-widest">
                04 PROJECT SYSTEMS
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Products designed to turn
              <br />
              intelligence into action.
            </h2>
            <p className="text-foreground-secondary/80 text-lg max-w-2xl leading-relaxed">
              A selection of AI-enabled products, accessibility experiences, and software systems built to solve real problems.
            </p>
          </motion.div>

          {/* Featured Project */}
          <FeaturedProject project={featuredProject} />

          {/* Other Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
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
