"use client";

import { useRef, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import IntelligenceEngineModel, {
  type ReactorState,
} from "./IntelligenceEngineModel";

type PointerState = { active: boolean; x: number; y: number };

// =====================================================
// CINEMATIC LIGHTING RIG
// Tuned for the dark graphite/cyan PBR model to be
// clearly visible against a dark navy background
// =====================================================
function CinematicLighting() {
  return (
    <>
      {/* Ambient — low cool fill so graphite reads premium, not washed */}
      <ambientLight intensity={0.22} color="#1a2138" />

      {/* Key light — cool steel-blue, restrained */}
      <directionalLight position={[3, 3.5, 5]} intensity={0.75} color="#a5b5d5" />

      {/* Cyan fill from front-left — motivated by the core */}
      <directionalLight position={[-2, 2.5, 4]} intensity={0.55} color="#4ec0e8" />

      {/* Upper rim — silhouette separation */}
      <directionalLight position={[0.5, 5, -1]} intensity={0.35} color="#7a92be" />

      {/* Violet accent kicker — back-left, very subtle */}
      <directionalLight position={[-3.5, 3, -3]} intensity={0.22} color="#7050c0" />

      {/* Cyan back-rim — reveals turbine outline */}
      <directionalLight position={[2, 0.5, -4]} intensity={0.28} color="#3e9cc0" />
    </>
  );
}

// =====================================================
// PUBLIC COMPONENT — Canvas wrapper with GLB model
// =====================================================
interface IntelligenceReactor3DProps {
  reducedMotion?: boolean;
  pointerRef?: MutableRefObject<PointerState>;
  reactorState?: ReactorState;
  onModelLoaded?: () => void;
  isMobile?: boolean;
  activeAccentColor?: string | null;
}

export default function IntelligenceReactor3D({
  reducedMotion = false,
  pointerRef,
  reactorState,
  onModelLoaded,
  isMobile = false,
  activeAccentColor,
}: IntelligenceReactor3DProps) {
  const localPointerRef = useRef<PointerState>({
    active: false,
    x: 0,
    y: 0,
  });
  const activePointerRef = pointerRef ?? localPointerRef;

  // Camera position: closer for hero presence
  // Mobile: slightly further back to ensure full silhouette fits
  const cameraZ = isMobile ? 3.4 : 3.2;
  const cameraY = isMobile ? 0.35 : 0.3;
  const fov = isMobile ? 40 : 36;

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          // Use LinearToneMapping (1) instead of ACESFilmic (4)
          // ACESFilmic was crushing the dark graphite panels into pure black
          toneMapping: 1, // LinearToneMapping
          toneMappingExposure: 1.05,
        }}
        camera={{
          position: [0.45, cameraY, cameraZ],
          fov: fov,
          near: 0.1,
          far: 50,
        }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0.0, 0);
        }}
      >
        <CinematicLighting />

        {/* Environment map — kept very subtle so dark graphite reads as
            engineered hardware, not chrome */}
        <Environment preset="night" environmentIntensity={0.08} />

        <IntelligenceEngineModel
          reactorState={reactorState ?? "idle"}
          reducedMotion={reducedMotion}
          pointerRef={activePointerRef}
          onModelLoaded={onModelLoaded}
          activeAccentColor={activeAccentColor}
        />
      </Canvas>
    </div>
  );
}
