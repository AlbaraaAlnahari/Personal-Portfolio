"use client";

import { CinematicLoadingScreen } from "@/components/sections/CinematicLoadingScreen";

/**
 * Loading Component (loading.tsx)
 * Displays during page transitions and initial load
 * Uses cinematic boot sequence
 */
export default function Loading() {
  return <CinematicLoadingScreen autoClose duration={3000} />;
}
