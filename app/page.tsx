"use client";

import { motion } from "framer-motion";
import { IntelligenceEngineHero } from "@/components/sections/IntelligenceEngineHero";
import { DestinationGallery } from "@/components/home/DestinationGallery";
import { EditorialBlueprintField } from "@/components/home/EditorialBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { pageTransitionVariants } from "@/lib/motion/variants";

/**
 * Home — ALBARAA OS entry.
 * One continuous environment: the cinematic Intelligence Engine Hero (the system
 * introduces the operator), flowing into the calm Personal Archive / Destination
 * Gallery (the archive reveals the person and the proof) — both unified by a
 * single Home-wide Dark Blueprint Coordinate Field that now spans the page,
 * faint behind the Hero and present behind the gallery. The full production
 * systems (About, Projects, Experience, Skills, Leadership, Resume, Contact)
 * live on their dedicated routes and are intentionally NOT rendered here — the
 * gallery cards route into them.
 *
 * Layering: the blueprint field is a fixed layer at z-[1] (it paints just above
 * the Hero's own opaque background — masked to near-zero over the reactor — and
 * below the gallery + footer, which sit in the z-10 foreground wrapper).
 */
export default function Home() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={pageTransitionVariants}
      className="relative min-h-screen"
    >
      {/* Home-wide Dark Blueprint Coordinate Field — fixed, continuous, behind
          everything (faint over the Hero, present behind the gallery). */}
      <EditorialBlueprintField />

      {/* Intelligence Engine Hero (cinematic entry; WebGL Home-only). Left at
          z-auto so the blueprint field's masked grid reads faintly across its
          margins while the reactor + headline stay clean. */}
      <IntelligenceEngineHero />

      {/* Foreground archive — sits above the blueprint field. */}
      <div className="relative z-10">
        <DestinationGallery />
        <SiteFooter />
      </div>
    </motion.main>
  );
}
