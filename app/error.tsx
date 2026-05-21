"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

/**
 * Error Boundary Component
 * Handles and displays errors gracefully with futuristic aesthetic
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-center"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              <span className="text-accent-pink">Error 500</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground-primary">
              Something went wrong
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground-secondary max-w-xl mx-auto"
          >
            The system encountered an unexpected error. Our team has been notified and is
            investigating the issue.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="bg-glass glass-panel p-4 rounded-lg my-6"
          >
            <p className="text-sm text-accent-cyan font-mono break-all">
              {error.message || "Unknown error"}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button variant="primary" size="lg" glow onClick={() => reset()}>
              Try Again
            </Button>
            <Button variant="glass" size="lg" onClick={() => window.location.href = "/"}>
              Go Home
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
