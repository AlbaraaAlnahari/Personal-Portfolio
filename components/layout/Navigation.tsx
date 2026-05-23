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
      className="fixed top-0 left-0 right-0 z-40 bg-background-primary/80 backdrop-blur-lg border-t border-transparent shadow-glass-md"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        height: "var(--nav-height)",
        boxShadow: "0 0 30px rgba(0, 217, 255, 0.08), var(--shadow-glass-md)",
        borderImage: "linear-gradient(90deg, rgba(0,217,255,0.1) 0%, rgba(0,217,255,0.05) 50%, transparent 100%) 1",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Left Zone: Logo */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0"
          animate={{
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            opacity: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
            whileHover: {
              duration: 0.2,
            },
          }}
        >
          <Link
            href="#"
            className="text-lg font-bold text-accent-cyan hover:text-accent-cyan hover:drop-shadow-[0_0_12px_rgba(0,217,255,0.6)] transition-all duration-300"
          >
            Albaraa OS
          </Link>
        </motion.div>

        {/* Center Zone: Navigation Items */}
        <motion.div
          className="hidden lg:flex items-center gap-6 flex-1 justify-center"
          variants={containerVariants}
        >
          {navItems.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={item.href}
                className={`text-sm transition-all duration-300 relative group inline-block px-2 py-1 rounded ${
                  activeItem === item.label
                    ? "text-accent-cyan drop-shadow-[0_0_6px_rgba(0,217,255,0.4)] bg-accent-cyan/5"
                    : "text-foreground-secondary hover:text-accent-cyan hover:drop-shadow-[0_0_6px_rgba(0,217,255,0.3)] hover:scale-105"
                }`}
                onMouseEnter={() => setActiveItem(item.label)}
                onMouseLeave={() => setActiveItem("home")}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent-cyan to-accent-green transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                    activeItem === item.label ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Zone: Resume Button */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <a
            href="#resume"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-background-primary font-medium text-sm transition-all duration-300 inline-block relative"
            style={{
              boxShadow: "0 0 20px rgba(0, 217, 255, 0.4), 0 0 40px rgba(181, 55, 242, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transition = "box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 217, 255, 0.6), 0 0 50px rgba(181, 55, 242, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transition = "box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 217, 255, 0.4), 0 0 40px rgba(181, 55, 242, 0.2)";
            }}
          >
            Resume
          </a>
        </motion.div>

        {/* Mobile Menu Indicator - Below navbar */}
      </div>

      {/* Mobile Navigation - Sits below navbar */}
      <div className="lg:hidden w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 flex-wrap">
        {navItems.slice(0, 3).map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="px-3 py-1.5 text-sm text-foreground-secondary hover:text-accent-cyan transition-all rounded-md bg-background-primary/40 hover:bg-background-primary/60 border border-glass-light/50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
