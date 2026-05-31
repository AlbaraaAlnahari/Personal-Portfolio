"use client";

/**
 * Route-aware slot for the cockpit diagnostic overlays.
 *
 * Phase 1 (home identity closure): the four floating corner HUD labels (AI
 * WORKSPACE ACTIVE / NEURAL SYSTEMS STABLE / ENGINEERING LAYER LOADED /
 * DEVELOPER MODE SYNCED) are intentionally hidden. They collided with the
 * header (the top pair overlapped the ALBARAA lockup and the View PDF action)
 * and read as decorative AI-cockpit noise that fought the premium, calm
 * editorial direction. The overlay component (./AISystemStatus) is left intact
 * so it can be re-enabled deliberately later — re-wiring it is a one-line
 * change here.
 */
export function RouteAwareAISystemStatus() {
  return null;
}
