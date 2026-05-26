"use client";

import { motion } from "framer-motion";
import { IntelligenceEngineHero } from "@/components/sections/IntelligenceEngineHero";
import { ImprovedHeroSection } from "@/components/sections/ImprovedHeroSection";
import { AboutModule } from "@/components/sections/AboutModule";
import { ProjectsSystems } from "@/components/sections/ProjectsSystems";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { OrganizationsLeadership } from "@/components/sections/OrganizationsLeadership";
import { ContactTerminal } from "@/components/sections/ContactTerminal";
import { AskAlbaraAI } from "@/components/sections/AskAlbaraAI";
import { ResumeInterface } from "@/components/sections/ResumeInterface";
import { Container } from "@/components/layout/Container";
import {
  containerVariants,
  itemVariants,
  pageTransitionVariants,
} from "@/lib/motion/variants";

// Toggle: set to false to revert to the original orb hero
const USE_INTELLIGENCE_ENGINE = true;

export default function Home() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={pageTransitionVariants}
      className="min-h-screen"
    >
      {/* Hero Section — Intelligence Engine or classic orb fallback */}
      {USE_INTELLIGENCE_ENGINE ? (
        <IntelligenceEngineHero />
      ) : (
        <ImprovedHeroSection />
      )}

      {/* Section Transition Divider */}
      <div className="flex justify-center py-12 md:py-16">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* About Module */}
      <AboutModule />

      {/* Section Transition Divider */}
      <div className="flex justify-center py-12 md:py-16">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Projects Systems */}
      <ProjectsSystems />

      {/* Section Transition Divider */}
      <div className="flex justify-center py-12 md:py-16">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Section Transition Divider */}
      <div className="flex justify-center py-12 md:py-16">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Skills Matrix */}
      <SkillsMatrix />

      {/* Section Transition Divider */}
      <div className="flex justify-center py-12 md:py-16">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Organizations & Leadership */}
      <OrganizationsLeadership />

      {/* Section Transition Divider */}
      <div className="flex justify-center py-12 md:py-16">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Ask Albaraa AI */}
      <AskAlbaraAI />

      {/* Section Transition Divider */}
      <div className="flex justify-center py-12 md:py-16">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Resume Interface */}
      <ResumeInterface />

      {/* Section Transition Divider */}
      <div className="flex justify-center py-12 md:py-16">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Contact Terminal — final primary conversion section */}
      <ContactTerminal />

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
              &copy; 2026 Albaraa OS. Crafted with precision and futuristic vision.
            </motion.p>
          </motion.div>
        </Container>
      </footer>
    </motion.main>
  );
}
