"use client";

/**
 * EditorialBlueprintField — Home-wide Dark Blueprint Coordinate Field.
 *
 * One continuous engineered "graph-paper" planning surface that now spans the
 * entire Home experience — faint behind the cinematic Intelligence Engine Hero
 * and present behind the Personal Archive / Destination Gallery — so the Hero,
 * grid, header, and archive read as a single environment.
 *
 * Implementation notes (important):
 *  • The Hero <section> paints its OWN opaque radial-gradient background, so a
 *    layer placed literally *behind* it would be fully occluded. To show the
 *    grid across the Hero region WITHOUT touching the protected Hero component,
 *    this field is a `position: fixed` layer that paints just *above* the Hero's
 *    background (z-[1]) and *below* the gallery cards (z-10 in page.tsx).
 *  • A soft radial mask reduces the grid to near-zero through the central focal
 *    band (the reactor core + hero headline + buttons), so the 3D composition
 *    reads exactly as before — nothing is painted *over* the reactor. Crucially
 *    the mask only ever REMOVES grid alpha; it never paints dark, so the Hero is
 *    never darkened or tinted.
 *  • Being `fixed`, the field is a stationary architectural surface the whole
 *    page scrolls over (continuous environment), and it avoids the iOS
 *    `background-attachment: fixed` jank of the previous approach.
 *
 * Cool off-white / soft-silver lines only — cyan stays reserved for interaction,
 * CTAs, ports, status, and the 5,000+ proof metric. Pure CSS (layered gradients
 * + masks). No canvas, WebGL, scroll listeners, animation, runtime fetch, or
 * global CSS. Decorative + aria-hidden.
 */
export function EditorialBlueprintField() {
  // Soft central reduction (protects the Hero reactor/headline + calms the
  // gallery reading column) intersected with an edge fade so the fixed field
  // never hard-cuts at the viewport frame. Mask alpha only attenuates grid —
  // it paints nothing, so the Hero is never tinted.
  const mask =
    "radial-gradient(ellipse 86% 66% at 50% 45%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.16) 22%, rgba(0,0,0,0.62) 50%, #000 78%), " +
    "linear-gradient(to bottom, transparent, #000 4%, #000 95%, transparent), " +
    "linear-gradient(to right, transparent, #000 3%, #000 97%, transparent)";

  const maskProps = {
    maskImage: mask,
    WebkitMaskImage: mask,
    maskComposite: "intersect" as const,
    WebkitMaskComposite: "source-in" as const,
  };

  // Mobile keeps the field visible but quieter (the wrapper opacity scales both
  // line layers down a touch below md); md+ shows the full editorial weight.
  return (
    <div
      aria-hidden="true"
      className="blueprint-field pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-[0.82] md:opacity-100"
    >
      {/* minor coordinate lines — disciplined 46px rhythm, cool ivory */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(var(--grid-line),var(--grid-minor-alpha)) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--grid-line),var(--grid-minor-alpha)) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          ...maskProps,
        }}
      />
      {/* major lines every 5 cells (230px) — architectural, ~2x more present */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(var(--grid-line),var(--grid-major-alpha)) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--grid-line),var(--grid-major-alpha)) 1px, transparent 1px)",
          backgroundSize: "230px 230px",
          ...maskProps,
        }}
      />
      {/* Ambient calibration nodes — sparse soft pulses (CSS-animated .bp-node;
          positions favour the open margins/corners so they read as blueprint
          calibration points, not noise behind the hero). The first five sit in
          mobile-safe open areas; the rest are hidden below md. */}
      <span
        className="bp-node"
        style={{ left: "7%", top: "14%", animationDelay: "0s" }}
      />
      <span
        className="bp-node"
        style={{ left: "92%", top: "11%", animationDelay: "1.7s" }}
      />
      <span
        className="bp-node"
        style={{ left: "50%", top: "8%", animationDelay: "3.2s" }}
      />
      <span
        className="bp-node"
        style={{ left: "9%", top: "88%", animationDelay: "5.1s" }}
      />
      <span
        className="bp-node"
        style={{ left: "90%", top: "90%", animationDelay: "2.4s" }}
      />
      <span
        className="bp-node"
        style={{ left: "5%", top: "48%", animationDelay: "4.3s" }}
      />
      <span
        className="bp-node"
        style={{ left: "95%", top: "42%", animationDelay: "0.9s" }}
      />
      <span
        className="bp-node"
        style={{ left: "6%", top: "70%", animationDelay: "6s" }}
      />
      <span
        className="bp-node"
        style={{ left: "94%", top: "24%", animationDelay: "3.8s" }}
      />
      <span
        className="bp-node"
        style={{ left: "30%", top: "92%", animationDelay: "1.2s" }}
      />
      <span
        className="bp-node"
        style={{ left: "71%", top: "86%", animationDelay: "4.8s" }}
      />
      <span
        className="bp-node"
        style={{ left: "12%", top: "30%", animationDelay: "2s" }}
      />
    </div>
  );
}
