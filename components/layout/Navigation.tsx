"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * Navigation Component
 * Clear, accessible navigation for recruiter/visitor exploration
 */
export function Navigation() {
  const [activeItem, setActiveItem] = useState("home");

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 bg-background-primary/80 backdrop-blur-md border-b border-glass-light"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <motion.div variants={itemVariants}>
            <Link
              href="#"
              className="text-lg font-bold text-accent-cyan hover:text-accent-green transition-colors"
            >
              Albaraa OS
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <motion.div
            className="hidden md:flex items-center gap-8"
            variants={containerVariants}
          >
            {navItems.map((item) => (
              <motion.div key={item.label} variants={itemVariants}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground-secondary hover:text-accent-cyan transition-colors relative group"
                  onMouseEnter={() => setActiveItem(item.label)}
                  onMouseLeave={() => setActiveItem("home")}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent-cyan to-accent-green transition-all duration-300 ${
                      activeItem === item.label ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Resume CTA */}
          <motion.div variants={itemVariants}>
            <a
              href="#resume"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-background-primary font-medium text-sm hover:shadow-neon-cyan transition-all duration-300"
            >
              Resume
            </a>
          </motion.div>
        </div>

        {/* Mobile Menu Indicator */}
        <div className="md:hidden mt-4 flex gap-2 flex-wrap">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs text-foreground-secondary hover:text-accent-cyan transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
