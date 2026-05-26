"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import {
  containerVariants,
  itemVariants,
} from "@/lib/motion/variants";

/**
 * Organizations & Leadership
 * Ecosystem contributions and community impact
 * System module for organizational presence and leadership initiatives
 */
export function OrganizationsLeadership() {
  const organizations = [
    {
      id: "prehack",
      name: "PreHack",
      role: "Admin & Voice Host",
      description:
        "Organized tech events and live sessions, including Hackwave, and supported AI and Cybersecurity bootcamps preparing participants for hackathons.",
      highlights: ["AI & Cybersecurity Bootcamps", "Hackwave", "Community Events"],
      status: "active",
      impact: "650+",
      impactLabel: "Participants Reached",
    },
    {
      id: "uoj",
      name: "University of Jeddah",
      role: "Leadership & Tech Activities",
      description:
        "Revived the Drone Club by establishing 5 committees and recruiting active members, and organized tech events and workshops across campus.",
      highlights: ["Drone Club Revival", "5 Committees", "Tech Workshops"],
      status: "active",
      impact: "65+",
      impactLabel: "Active Members",
    },
    {
      id: "gdsc",
      name: "Google × GDSC Data Science Bootcamp",
      role: "Organizer (University of Jeddah)",
      description:
        "Managed a Google × GDSC Data Science Bootcamp and organized 10+ tech events and workshops supporting the student developer community.",
      highlights: ["Data Science", "Event Management", "10+ Workshops"],
      status: "completed",
      impact: "5,000+",
      impactLabel: "Participants",
    },
  ];

  const leadershipQualities = [
    { label: "Vision", icon: "●", color: "text-accent-cyan" },
    { label: "Execution", icon: "◆", color: "text-accent-green" },
    { label: "Impact", icon: "▲", color: "text-accent-purple" },
    { label: "Innovation", icon: "★", color: "text-accent-cyan" },
    { label: "Collaboration", icon: "◇", color: "text-accent-green" },
    { label: "Resilience", icon: "◈", color: "text-accent-purple" },
  ];

  return (
    <section id="organizations" className="py-20 md:py-32 relative">
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
              <span className="text-accent-cyan">Leadership</span> & Community
            </h2>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              Ecosystem contributions, mentorship initiatives, and organizational impact
            </p>
          </motion.div>

          {/* Organizations Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {organizations.map((org, index) => (
              <motion.div
                key={org.id}
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
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground-primary text-lg">
                      {org.name}
                    </h3>
                    <p className="text-sm text-accent-cyan">
                      {org.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground-secondary leading-relaxed flex-1">
                    {org.description}
                  </p>

                  {/* Impact Metric */}
                  <div className="py-3 border-y border-glass-light/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-cyan mb-1">
                        {org.impact}
                      </div>
                      <div className="text-xs text-foreground-secondary">
                        {org.impactLabel}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {org.highlights.map((highlight) => (
                      <motion.div
                        key={highlight}
                        className="flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                        <span className="text-xs text-foreground-secondary hover:text-foreground-primary transition-colors">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Status Indicator */}
                  <div className="pt-3 border-t border-glass-light/30">
                    <div className="flex items-center gap-2">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-accent-green"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 2 + index * 0.2,
                          repeat: Infinity,
                        }}
                      />
                      <span className="text-xs text-foreground-secondary/60 font-mono">
                        {org.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </motion.div>

          {/* Leadership Qualities Grid */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-accent-cyan">
              Leadership Framework
            </h3>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {leadershipQualities.map((quality, index) => (
                <motion.div
                  key={quality.label}
                  variants={itemVariants}
                  transition={{ delay: index * 0.08 }}
                  className="text-center"
                >
                  <GlassPanel className="p-4 space-y-2">
                    <div className={`text-2xl ${quality.color}`}>
                      {quality.icon}
                    </div>
                    <div className="text-sm font-medium text-foreground-primary">
                      {quality.label}
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Impact Summary */}
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-foreground-secondary/70 max-w-2xl mx-auto"
          >
            <p>
              Committed to building inclusive technical communities, mentoring the next generation of engineers, and driving innovation through collaborative leadership and organizational impact.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
