"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * About Module
 * Premium identity and engineering profile with real portrait
 */
export function AboutModule() {
  const expertise = [
    "AI-enabled products",
    "Full-stack development",
    "Robotics",
    "User research",
    "Technical leadership",
    "Scalable web systems",
  ];

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Supabase",
    "Python",
    "Java",
    "SQL",
    "AI APIs",
    "Tailwind CSS",
  ];

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-sm font-mono text-accent-cyan tracking-widest">
              ABOUT / IDENTITY MODULE
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Engineering intelligent
              <br />
              products with purpose.
            </h2>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
          >
            {/* Left: Portrait */}
            <motion.div variants={itemVariants} className="space-y-6 flex flex-col items-center md:items-start">
              {/* Portrait frame */}
              <div className="relative w-full max-w-xs aspect-[4/5] rounded-2xl overflow-hidden border border-accent-cyan/30 bg-background-primary/40">
                {/* Glow background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(0, 217, 255, 0.2) 0%, rgba(181, 55, 242, 0.1) 40%, transparent 70%)",
                  }}
                />

                {/* Image container - professional portrait framing with balanced scale */}
                <div className="absolute inset-x-6 top-6 bottom-24 overflow-hidden">
                  <Image
                    src="/images/albaraa-profile.svg"
                    alt="Portrait of Albaraa Alnahari"
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 420px"
                    className="object-contain object-bottom origin-bottom scale-[1.14]"
                    priority
                  />
                </div>

                {/* Identity label below */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-background-primary via-background-primary/80 to-transparent pointer-events-none">
                  <div className="text-xs font-mono text-accent-cyan/80 tracking-widest">
                    ALBARAA ALNAHARI
                  </div>
                  <div className="text-xs text-foreground-secondary/70 mt-0.5">
                    IDENTITY PROFILE
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Biography */}
              <div>
                <p className="text-lg text-foreground-primary leading-relaxed">
                  Albaraa Alnahari is a Software Engineering student focused on building AI-enabled
                  products, modern full-stack applications, robotics-driven experiences, and scalable
                  digital systems. His work combines software engineering, product thinking, user research,
                  and technical leadership to turn ambitious ideas into practical products.
                </p>
              </div>

              {/* Focus Areas */}
              <div>
                <h3 className="text-xs font-mono text-accent-green tracking-widest mb-3">
                  FOCUS AREAS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((area, index) => (
                    <motion.div
                      key={area}
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-1.5 rounded-md bg-background-primary/50 border border-accent-cyan/20 text-xs text-foreground-secondary/90 hover:border-accent-cyan/50 hover:text-accent-cyan transition-all"
                    >
                      {area}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xs font-mono text-accent-purple tracking-widest mb-3">
                  TECHNOLOGIES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      variants={itemVariants}
                      transition={{ delay: index * 0.03 }}
                      className="px-2.5 py-1 rounded-md bg-background-primary/40 border border-glass-light/20 text-xs text-foreground-secondary/80 hover:border-accent-purple/40 hover:text-foreground-primary transition-all"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex gap-3 flex-col sm:flex-row">
                <Button
                  variant="primary"
                  size="md"
                  onClick={(e) => {
                    const link = document.createElement("a");
                    link.href = "/resume.pdf";
                    link.download = "Albaraa_Alnahari_Resume.pdf";
                    link.click();
                  }}
                >
                  Download Resume
                </Button>
                <Button
                  variant="glass"
                  size="md"
                  onClick={(e) => handleScroll(e, "contact")}
                >
                  Get In Touch
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
