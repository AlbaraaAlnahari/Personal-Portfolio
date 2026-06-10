/**
 * InteriorBlueprintField — fixed Dark Blueprint Coordinate Field for the
 * interior routes (Contact / About / Work / Impact / Résumé).
 *
 * A stationary "graph-paper" planning surface the page content scrolls over —
 * the same editorial blueprint language as the Home field, but tuned for
 * interior pages: slightly clearer minor/major lines and only a soft edge fade
 * (interior pages have no Hero reactor to protect, so there is no central
 * reduction mask). Pure CSS layered gradients — no canvas, animation, scroll
 * listeners, or runtime fetch. Decorative + aria-hidden + pointer-events-none.
 *
 * Layering: rendered as a `position: fixed` z-0 layer; each interior page wraps
 * its content in a `relative z-10` shell so all copy, cards, and CTAs sit above
 * it. The Home page keeps its own separate EditorialBlueprintField — this layer
 * is interior-only and never mounted on Home.
 */
export function InteriorBlueprintField() {
  // Soft four-edge fade so the fixed field never hard-cuts at the viewport
  // frame. No central hole — the grid reads evenly across interior pages.
  const mask =
    "linear-gradient(to bottom, transparent, #000 5%, #000 93%, transparent), " +
    "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)";
  const maskProps = {
    maskImage: mask,
    WebkitMaskImage: mask,
    maskComposite: "intersect" as const,
    WebkitMaskComposite: "source-in" as const,
  };

  return (
    <div
      aria-hidden="true"
      className="blueprint-field bp-quiet pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-80 md:opacity-100"
    >
      {/* minor coordinate lines — 46px rhythm, cool ivory (clearer than the
          previous faint interior grid, still refined) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(var(--grid-line),var(--grid-minor-alpha-i)) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--grid-line),var(--grid-minor-alpha-i)) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          ...maskProps,
        }}
      />
      {/* major lines every 5 cells (230px) — architectural anchor */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(var(--grid-line),var(--grid-major-alpha-i)) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--grid-line),var(--grid-major-alpha-i)) 1px, transparent 1px)",
          backgroundSize: "230px 230px",
          ...maskProps,
        }}
      />
      {/* Ambient calibration nodes — quieter on interior routes (the wrapper's
          .bp-quiet softens intensity); positioned in the open gutters/edges so
          they stay clear of cards and copy. Below md only the first five show. */}
      <span
        className="bp-node"
        style={{ left: "6%", top: "18%", animationDelay: "0s" }}
      />
      <span
        className="bp-node"
        style={{ left: "94%", top: "26%", animationDelay: "2.1s" }}
      />
      <span
        className="bp-node"
        style={{ left: "8%", top: "66%", animationDelay: "4s" }}
      />
      <span
        className="bp-node"
        style={{ left: "92%", top: "74%", animationDelay: "1.3s" }}
      />
      <span
        className="bp-node"
        style={{ left: "40%", top: "7%", animationDelay: "3.5s" }}
      />
      <span
        className="bp-node"
        style={{ left: "64%", top: "93%", animationDelay: "5.2s" }}
      />
    </div>
  );
}
