"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { containerVariants, itemVariants } from "@/lib/motion/variants";

/**
 * Site Footer
 * Shared footer for the multi-page architecture. Extracted verbatim from the
 * original Home composition so rendering remains visually identical wherever
 * it appears. Content/year/styling unchanged.
 */
export function SiteFooter() {
  return (
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
  );
}
