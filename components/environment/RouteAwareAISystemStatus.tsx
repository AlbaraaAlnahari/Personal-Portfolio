"use client";

import { usePathname } from "next/navigation";
import { AISystemStatus } from "./AISystemStatus";

/**
 * Route-aware wrapper for the cockpit diagnostic overlays.
 * In the multi-page editorial architecture these belong to the cinematic Home
 * entry only — interior routes stay calm and clean. Renders the unchanged
 * AISystemStatus on "/" and nothing elsewhere. No visual/animation change.
 */
export function RouteAwareAISystemStatus() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <AISystemStatus />;
}
