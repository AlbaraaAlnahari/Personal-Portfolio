import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

/**
 * 404 Not Found Page
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              <span className="text-accent-cyan">404</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground-primary">
              Page Not Found
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-foreground-secondary max-w-xl mx-auto"
          >
            The page you're looking for doesn't exist or has been moved. Return to the
            home page to continue exploring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/">
              <Button variant="primary" size="lg" glow>
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
