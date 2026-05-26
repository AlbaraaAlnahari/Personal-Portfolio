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
 * Contact Terminal
 * Futuristic communication interface
 * Terminal-inspired design with clean, accessible layout
 */
export function ContactTerminal() {
  const contactMethods = [
    {
      label: "Email",
      value: "albaraa.a.alnahari@gmail.com",
      icon: "✉",
      action: "mailto:albaraa.a.alnahari@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/albaraa-alnahari",
      icon: "◆",
      action: "https://www.linkedin.com/in/albaraa-alnahari",
    },
    {
      label: "GitHub",
      value: "github.com/AlbaraaAlnahari",
      icon: "◇",
      action: "https://github.com/AlbaraaAlnahari",
    },
    {
      label: "X",
      value: "x.com/x_ff",
      icon: "▲",
      action: "https://x.com/x_ff",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative">
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
              <span className="text-accent-cyan">Contact</span> Terminal
            </h2>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              Connect and collaborate. Reach out for opportunities, questions, or just to chat about AI and engineering.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <GlassPanel className="p-8 space-y-5">
                <h3 className="text-xl font-semibold text-accent-cyan">Send Message</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm text-foreground-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-lg bg-background-primary/40 border border-glass-light/50 text-foreground-primary placeholder-foreground-secondary/50 focus:outline-none focus:border-accent-cyan/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-background-primary/40 border border-glass-light/50 text-foreground-primary placeholder-foreground-secondary/50 focus:outline-none focus:border-accent-cyan/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      placeholder="Your message..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-lg bg-background-primary/40 border border-glass-light/50 text-foreground-primary placeholder-foreground-secondary/50 focus:outline-none focus:border-accent-cyan/50 transition-colors resize-none"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    glow
                  >
                    Send Message
                  </Button>
                </form>
              </GlassPanel>
            </motion.div>

            {/* Contact Methods */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold text-accent-cyan mb-6">
                Quick Connect
              </h3>
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassPanel className="p-5 hover:border-glass-lighter hover:bg-background-primary/60 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-lg text-accent-cyan">
                          {method.icon}
                        </span>
                        <div>
                          <h4 className="text-sm font-medium text-foreground-primary mb-0.5">
                            {method.label}
                          </h4>
                          <p className="text-xs text-foreground-secondary/80 group-hover:text-foreground-secondary transition-colors">
                            {method.value}
                          </p>
                        </div>
                      </div>
                      <span className="text-foreground-secondary/40 group-hover:text-accent-cyan transition-colors">
                        →
                      </span>
                    </div>
                  </GlassPanel>
                </motion.a>
              ))}

              {/* Status */}
              <div className="pt-4 border-t border-glass-light/30">
                <div className="flex items-center gap-2">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-accent-green"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-foreground-secondary/60 font-mono">
                    AVAILABLE FOR COLLABORATION
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
