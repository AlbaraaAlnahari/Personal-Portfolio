"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Navigation Component
 * Clear, accessible navigation for recruiter/visitor exploration.
 *
 * Desktop: full inline section links + a Resume action (approved layout).
 * Mobile: minimal Albaraa OS branding + ONE deliberate menu. The six
 * Intelligence Engine module cards in the hero carry primary section
 * navigation, so the mobile header avoids a redundant pill row and a
 * second prominent Resume button — Resume lives inside the menu instead.
 */
export function Navigation() {
  const [activeItem, setActiveItem] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Leadership", href: "#leadership" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ];

  // Close the mobile menu on Escape or click outside the nav.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [menuOpen]);

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
      ref={navRef}
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

        {/* Center Zone: Navigation Items (desktop) */}
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

        {/* Right Zone: Resume (desktop) + Menu trigger (mobile) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Resume Button — desktop only (mobile reaches Resume via the menu) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden lg:block"
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

          {/* Menu trigger — mobile only */}
          <motion.button
            variants={itemVariants}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-foreground-secondary hover:text-accent-cyan transition-colors outline-none ie-focus"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,217,255,0.18)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown menu — one deliberate, complete navigation surface */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-menu"
            className="lg:hidden absolute left-0 right-0 top-full px-3 pt-2"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className="rounded-xl overflow-hidden p-1.5"
              style={{
                background: "rgba(12,14,30,0.92)",
                border: "1px solid rgba(0,217,255,0.18)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 12px 36px rgba(0,0,0,0.5), 0 0 18px rgba(0,217,255,0.08)",
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm text-foreground-secondary hover:text-accent-cyan hover:bg-accent-cyan/5 transition-colors outline-none ie-focus"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      background: "rgba(0,217,255,0.35)",
                      boxShadow: "0 0 0 2px rgba(0,217,255,0.06)",
                    }}
                  />
                  <span className="font-mono tracking-[0.08em]">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
