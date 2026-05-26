"use client";

import { useRef, useEffect, useMemo, type MutableRefObject } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// =====================================================
// REACTOR STATE
// =====================================================
export type ReactorState =
  | "boot"
  | "idle"
  | "active"
  | "reactorHover"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "contact"
  | "terminal";

const ACTIVATED_STATES = new Set<ReactorState>([
  "active", "reactorHover", "about", "projects",
  "experience", "skills", "contact", "terminal",
]);

type PointerState = { active: boolean; x: number; y: number };

// =====================================================
const MODEL_PATH = "/models/albaraa-intelligence-turbine-parts.glb";
useGLTF.preload(MODEL_PATH);

// =====================================================
// PART CLASSIFICATION CONSTANTS
// The turbine GLB exposes 17 numbered child nodes under ROOT.
// CORRECT classification (verified via inspection):
//  - hub  : the part with the LARGEST volume — the main wheel body
//  - panels: ALL other parts (16 in this asset) — small armor segments
//            arranged in concentric/radial pattern around the hub
//  Each panel's outward direction is computed relative to the HUB centroid
//  (not the world origin), because the wheel itself is offset in the GLB.
// =====================================================

// Panel radial offset by state — in model-local units.
// Wheel hub→panel mean distance ≈ 0.65 units, so visible motion needs
// offsets in the 0.05–0.10 range (≈8–15% radial travel).
const PANEL_OFFSET_BOOT_REST = 0.0;       // fully compact at boot start
const PANEL_OFFSET_IDLE = 0.06;           // operational rest — ~9% outward
const PANEL_OFFSET_ACTIVE = 0.10;         // active subsystem — additional ~6% outward

// Material override targets — tuned for premium dark obsidian graphite,
// readable but not washed-out grey. High roughness avoids chrome reflection;
// low envMap intensity keeps panels feeling like cool ceramic-metal armor.
const PANEL_MATERIAL = {
  color: "#0f1325",
  metalness: 0.72,
  roughness: 0.52,
  envMapIntensity: 0.6,
} as const;
const RING_MATERIAL = {
  color: "#171c30",
  metalness: 0.65,
  roughness: 0.46,
  envMapIntensity: 0.5,
} as const;

// =====================================================
// CANONICAL ORIENTATION
// =====================================================
const CANONICAL_ROT_Y = Math.PI * 0.13;
const CANONICAL_ROT_X = -0.04;
const CANONICAL_ROT_Z = 0;

// =====================================================
// MOTION
// =====================================================
const MAX_PARALLAX_RAD = (3 * Math.PI) / 180;
const IDLE_DRIFT_RAD = (0.5 * Math.PI) / 180; // minimal — tire spin is the identity
const PARALLAX_DAMPING = 0.035;
const FLOAT_AMP = 0.01;
const FLOAT_SPD = 0.4;

// Tire rotation
const TIRE_SPEED_IDLE = (2 * Math.PI) / 60;   // one full revolution per 60s
const TIRE_SPEED_ACTIVE = (2 * Math.PI) / 200; // slows dramatically on module select

// =====================================================
// COLOR
// =====================================================
const CYAN = new THREE.Color("#00d9ff");

function hexToColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

// =====================================================
// NEURON PARTICLE SYSTEM — luminous neural signals
// flowing around the core in 3D orbital paths
// =====================================================
const NEURON_COUNT = 50;

function NeuronField({
  reducedMotion,
  bootEaseRef,
  isActive,
  accentColorRef,
}: {
  reducedMotion: boolean;
  bootEaseRef: MutableRefObject<number>;
  isActive: boolean;
  accentColorRef: MutableRefObject<THREE.Color>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const smoothColor = useRef(new THREE.Color("#00d9ff"));

  // Generate neuron orbital parameters (stable across renders)
  const neuronData = useMemo(() => {
    const data: {
      radius: number;
      speed: number;
      phase: number;
      tiltX: number;
      tiltY: number;
      yOffset: number;
      size: number;
    }[] = [];
    for (let i = 0; i < NEURON_COUNT; i++) {
      const r = 0.18 + Math.random() * 0.25; // orbit radius 0.18..0.43
      data.push({
        radius: r,
        speed: (0.15 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        tiltX: (Math.random() - 0.5) * 1.2,  // tilted orbits
        tiltY: (Math.random() - 0.5) * 0.8,
        yOffset: (Math.random() - 0.5) * 0.35,
        size: 0.008 + Math.random() * 0.018,
      });
    }
    return data;
  }, []);

  // Create geometry with positions and sizes
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(NEURON_COUNT * 3);
    const sz = new Float32Array(NEURON_COUNT);
    for (let i = 0; i < NEURON_COUNT; i++) {
      sz[i] = neuronData[i].size;
    }
    return [pos, sz];
  }, [neuronData]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  // Shader material for glowing neurons
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color("#00d9ff") },
        uOpacity: { value: 0.0 },
        uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      },
      vertexShader: `
        attribute float size;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (280.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
          vAlpha = 1.0;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 1.8);
          gl_FragColor = vec4(uColor, glow * uOpacity * vAlpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (reducedMotion || !pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const be = bootEaseRef.current;

    // Color
    const targetC = isActive
      ? new THREE.Color("#00d9ff").lerp(accentColorRef.current, 0.5)
      : CYAN;
    smoothColor.current.lerp(targetC, 0.06);
    material.uniforms.uColor.value.copy(smoothColor.current);
    material.uniforms.uOpacity.value = (isActive ? 0.9 : 0.6) * be;

    // Update positions
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < NEURON_COUNT; i++) {
      const n = neuronData[i];
      const speedMult = isActive ? 1.6 : 1.0; // neurons speed up during activation
      const angle = t * n.speed * speedMult + n.phase;

      // Tilted elliptical orbit
      const x = Math.cos(angle) * n.radius;
      const y = Math.sin(angle) * n.radius * 0.7 + n.yOffset;
      const z = Math.sin(angle + n.tiltX) * n.radius * 0.5;

      // Apply tilt rotation
      const rx = x;
      const ry = y * Math.cos(n.tiltX) - z * Math.sin(n.tiltX);
      const rz = y * Math.sin(n.tiltX) + z * Math.cos(n.tiltX);

      posAttr.setXYZ(i, rx, ry + 0.06, rz + 0.06);
    }
    posAttr.needsUpdate = true;
  });

  if (reducedMotion) return null;

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// =====================================================
// CORE ENERGY AURA — vibrant color-responsive sphere
// =====================================================
function CoreAura({
  reducedMotion,
  bootEaseRef,
  isActive,
  accentColorRef,
}: {
  reducedMotion: boolean;
  bootEaseRef: MutableRefObject<number>;
  isActive: boolean;
  accentColorRef: MutableRefObject<THREE.Color>;
}) {
  const auraRef = useRef<THREE.Mesh>(null);
  const auraMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const innerMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const smoothColor = useRef(new THREE.Color("#00d9ff"));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const be = bootEaseRef.current;

    const target = isActive
      ? new THREE.Color("#00d9ff").lerp(accentColorRef.current, 0.35)
      : CYAN;
    smoothColor.current.lerp(target, 0.05);

    if (auraRef.current && auraMatRef.current) {
      const breath = Math.sin(t * (2 * Math.PI / 5));
      // Halved from prior values — aura now sits tight to the crystal
      const base = 0.08;
      const range = reducedMotion ? 0 : 0.03;
      const boost = isActive ? 0.07 : 0;
      auraMatRef.current.opacity = (base + breath * range + boost) * be;
      auraMatRef.current.color.copy(smoothColor.current);
      auraRef.current.scale.setScalar(1 + (reducedMotion ? 0 : breath * 0.03));
    }

    if (innerMatRef.current) {
      const breath2 = Math.sin(t * (2 * Math.PI / 4) + 1);
      const base = 0.14;
      const range = reducedMotion ? 0 : 0.05;
      const boost = isActive ? 0.08 : 0;
      innerMatRef.current.opacity = (base + breath2 * range + boost) * be;
      innerMatRef.current.color.copy(smoothColor.current);
    }
  });

  return (
    <group position={[0, 0.0, 0.0]}>
      {/* Outer aura — tightened from 0.45 → 0.30 and dimmed so the crystal
          itself dominates rather than a translucent HUD disc around it */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[0.30, 24, 24]} />
        <meshBasicMaterial
          ref={auraMatRef} color="#00d9ff"
          transparent opacity={0} depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Inner aura — tightened from 0.26 → 0.18 to hug the crystal */}
      <mesh>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshBasicMaterial
          ref={innerMatRef} color="#40e8ff"
          transparent opacity={0} depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// =====================================================
// APERTURE ENERGY SYSTEM — sweeping arcs + markers + shimmer
// =====================================================
function ApertureEnergySystem({
  reducedMotion,
  bootEaseRef,
  isActive,
  accentColorRef,
}: {
  reducedMotion: boolean;
  bootEaseRef: MutableRefObject<number>;
  isActive: boolean;
  accentColorRef: MutableRefObject<THREE.Color>;
}) {
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const shimmerMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const arc1Group = useRef<THREE.Group>(null);
  const arc1Mat = useRef<THREE.MeshBasicMaterial>(null);
  const arc2Group = useRef<THREE.Group>(null);
  const arc2Mat = useRef<THREE.MeshBasicMaterial>(null);
  const arc3Group = useRef<THREE.Group>(null);
  const arc3Mat = useRef<THREE.MeshBasicMaterial>(null);

  // Markers
  const m1Ref = useRef<THREE.Mesh>(null);
  const m1Mat = useRef<THREE.MeshBasicMaterial>(null);
  const m2Ref = useRef<THREE.Mesh>(null);
  const m2Mat = useRef<THREE.MeshBasicMaterial>(null);
  const m3Ref = useRef<THREE.Mesh>(null);
  const m3Mat = useRef<THREE.MeshBasicMaterial>(null);
  const m4Ref = useRef<THREE.Mesh>(null);
  const m4Mat = useRef<THREE.MeshBasicMaterial>(null);

  // Pulse
  const pulseRef = useRef<THREE.Mesh>(null);
  const pulseMat = useRef<THREE.MeshBasicMaterial>(null);
  const pulseTriggered = useRef(false);
  const pulseStart = useRef(0);

  const smoothColor = useRef(new THREE.Color("#00d9ff"));

  // Arc geometries
  const arc1Geo = useMemo(() => new THREE.RingGeometry(0.27, 0.30, 32, 1, 0, Math.PI * 0.6), []);
  const arc2Geo = useMemo(() => new THREE.RingGeometry(0.26, 0.285, 24, 1, 0, Math.PI * 0.4), []);
  const arc3Geo = useMemo(() => new THREE.RingGeometry(0.255, 0.275, 20, 1, 0, Math.PI * 0.25), []);

  const R = 0.29;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const be = bootEaseRef.current;

    const targetC = isActive
      ? new THREE.Color("#00d9ff").lerp(accentColorRef.current, 0.5)
      : CYAN;
    smoothColor.current.lerp(targetC, 0.06);

    // Base ring
    if (ringMatRef.current) {
      const breath = Math.sin(t * (2 * Math.PI / 5.5));
      ringMatRef.current.opacity = (0.3 + (reducedMotion ? 0 : breath * 0.1) + (isActive ? 0.2 : 0)) * be;
      ringMatRef.current.color.copy(smoothColor.current);
    }

    // Arc 1 — main sweep CW ~45s
    if (!reducedMotion && arc1Group.current && arc1Mat.current) {
      arc1Group.current.rotation.z = t * (isActive ? 0.03 : 2 * Math.PI / 45);
      const p = 0.35 + Math.sin(t * 0.6) * 0.12;
      arc1Mat.current.opacity = (p + (isActive ? 0.25 : 0)) * be;
      arc1Mat.current.color.copy(smoothColor.current);
    }

    // Arc 2 — CCW ~65s, offset
    if (!reducedMotion && arc2Group.current && arc2Mat.current) {
      arc2Group.current.rotation.z = t * (isActive ? -0.02 : -2 * Math.PI / 65) + 2.2;
      const p = 0.22 + Math.sin(t * 0.45 + 1.5) * 0.1;
      arc2Mat.current.opacity = (p + (isActive ? 0.18 : 0)) * be;
      arc2Mat.current.color.copy(smoothColor.current);
    }

    // Arc 3 — fast accent arc CW ~30s (new — adds energy)
    if (!reducedMotion && arc3Group.current && arc3Mat.current) {
      arc3Group.current.rotation.z = t * (isActive ? 0.04 : 2 * Math.PI / 30) + 4.0;
      const p = 0.18 + Math.sin(t * 0.9 + 3.0) * 0.08;
      arc3Mat.current.opacity = (p + (isActive ? 0.2 : 0)) * be;
      // This arc uses a brighter/whiter tint
      const arc3Color = smoothColor.current.clone().lerp(new THREE.Color("#ffffff"), 0.3);
      arc3Mat.current.color.copy(arc3Color);
    }

    // 4 markers
    if (!reducedMotion) {
      const markers = [
        { ref: m1Ref, mat: m1Mat, speed: 0.42, offset: 0 },
        { ref: m2Ref, mat: m2Mat, speed: -0.28, offset: 1.8 },
        { ref: m3Ref, mat: m3Mat, speed: 0.18, offset: 3.7 },
        { ref: m4Ref, mat: m4Mat, speed: -0.35, offset: 5.2 },
      ];
      for (const mk of markers) {
        if (mk.ref.current && mk.mat.current) {
          const ang = t * mk.speed + mk.offset;
          mk.ref.current.position.set(Math.cos(ang) * R, Math.sin(ang) * R, 0.015);
          mk.mat.current.color.copy(smoothColor.current);
          const idleOp = 0.5 + Math.sin(t * 1.8 + mk.offset) * 0.18;
          mk.mat.current.opacity = (isActive ? 0.9 : idleOp) * be;
        }
      }
    }

    // Pulse
    if (isActive && !pulseTriggered.current) {
      pulseTriggered.current = true;
      pulseStart.current = t;
    }
    if (!isActive) pulseTriggered.current = false;

    if (pulseRef.current && pulseMat.current) {
      if (pulseTriggered.current && t - pulseStart.current < 0.9 && !reducedMotion) {
        const p = (t - pulseStart.current) / 0.9;
        pulseRef.current.scale.setScalar(1 + p * 0.35);
        pulseMat.current.opacity = Math.sin(p * Math.PI) * 0.45 * be;
        pulseMat.current.color.copy(smoothColor.current);
        pulseRef.current.visible = true;
      } else {
        pulseRef.current.visible = false;
      }
    }

    // Shimmer
    if (shimmerMatRef.current) {
      const shimmer = Math.sin(t * 2.5) * 0.5 + 0.5;
      shimmerMatRef.current.opacity = (0.08 + shimmer * 0.1 + (isActive ? 0.08 : 0)) * be;
      shimmerMatRef.current.color.copy(smoothColor.current);
    }
  });

  return (
    // Aperture energy aligned with hub-centered wheel origin
    <group position={[0, 0, 0.08]}>
      {/* Base ring */}
      <mesh>
        <ringGeometry args={[0.275, 0.305, 64]} />
        <meshBasicMaterial ref={ringMatRef} color="#00d9ff" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Shimmer channel */}
      <mesh position={[0, 0, -0.005]}>
        <ringGeometry args={[0.235, 0.268, 48]} />
        <meshBasicMaterial ref={shimmerMatRef} color="#00d9ff" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Arc 1 */}
      {!reducedMotion && (
        <group ref={arc1Group}>
          <mesh geometry={arc1Geo}>
            <meshBasicMaterial ref={arc1Mat} color="#00d9ff" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Arc 2 */}
      {!reducedMotion && (
        <group ref={arc2Group}>
          <mesh geometry={arc2Geo} position={[0, 0, 0.002]}>
            <meshBasicMaterial ref={arc2Mat} color="#00d9ff" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Arc 3 — fast accent */}
      {!reducedMotion && (
        <group ref={arc3Group}>
          <mesh geometry={arc3Geo} position={[0, 0, 0.004]}>
            <meshBasicMaterial ref={arc3Mat} color="#00d9ff" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 4 markers */}
      {!reducedMotion && (
        <>
          <mesh ref={m1Ref}>
            <sphereGeometry args={[0.016, 8, 8]} />
            <meshBasicMaterial ref={m1Mat} color="#00d9ff" transparent opacity={0} depthWrite={false} />
          </mesh>
          <mesh ref={m2Ref}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial ref={m2Mat} color="#00d9ff" transparent opacity={0} depthWrite={false} />
          </mesh>
          <mesh ref={m3Ref}>
            <sphereGeometry args={[0.009, 8, 8]} />
            <meshBasicMaterial ref={m3Mat} color="#00d9ff" transparent opacity={0} depthWrite={false} />
          </mesh>
          <mesh ref={m4Ref}>
            <sphereGeometry args={[0.011, 8, 8]} />
            <meshBasicMaterial ref={m4Mat} color="#00d9ff" transparent opacity={0} depthWrite={false} />
          </mesh>
        </>
      )}

      {/* Pulse */}
      <mesh ref={pulseRef} visible={false}>
        <ringGeometry args={[0.24, 0.35, 64]} />
        <meshBasicMaterial ref={pulseMat} color="#60e8ff" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}


// =====================================================
// INTERNAL SEAM ENERGY — thin cyan emissive bars sitting INSIDE the
// turbine wheel, visible through the radial gaps between armor panels.
// Lives inside the modelRef so it rotates WITH the wheel — light streams
// out of the same gaps as the wheel turns.
// =====================================================
function InternalSeamEnergy({
  reducedMotion,
  bootEaseRef,
  isActive,
  accentColorRef,
}: {
  reducedMotion: boolean;
  bootEaseRef: MutableRefObject<number>;
  isActive: boolean;
  accentColorRef: MutableRefObject<THREE.Color>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRefs = useRef<Array<THREE.MeshBasicMaterial | null>>([]);
  const smoothColor = useRef(new THREE.Color("#00d9ff"));

  const SEAM_COUNT = 8;
  const SEAM_INNER_R = 0.32;
  const SEAM_OUTER_R = 0.66;
  const SEAM_LENGTH = SEAM_OUTER_R - SEAM_INNER_R;
  const SEAM_MID_R = (SEAM_INNER_R + SEAM_OUTER_R) / 2;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const be = bootEaseRef.current;

    // Seams stay cyan-dominant; accept a touch of accent in active state
    const target = isActive
      ? new THREE.Color("#00d9ff").lerp(accentColorRef.current, 0.18)
      : CYAN;
    smoothColor.current.lerp(target, 0.06);

    // Per-seam breathing — synchronized with the core
    const baseBreath = Math.sin(t * (2 * Math.PI / 5.5));
    for (let i = 0; i < matRefs.current.length; i++) {
      const mat = matRefs.current[i];
      if (!mat) continue;
      // Phase-offset per seam so they don't all pulse identically
      const phase = i * 0.4;
      const wiggle = Math.sin(t * 0.9 + phase);
      const baseOp = 0.4 + (reducedMotion ? 0 : baseBreath * 0.08);
      const idleOp = baseOp + (reducedMotion ? 0 : wiggle * 0.05);
      const activeBoost = isActive ? 0.25 : 0;
      mat.opacity = (idleOp + activeBoost) * be;
      mat.color.copy(smoothColor.current);
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: SEAM_COUNT }).map((_, i) => {
        const angle = (i / SEAM_COUNT) * Math.PI * 2;
        const x = Math.cos(angle) * SEAM_MID_R;
        const y = Math.sin(angle) * SEAM_MID_R;
        return (
          <mesh
            key={i}
            position={[x, y, 0.005]}
            rotation={[0, 0, angle]}
          >
            <planeGeometry args={[SEAM_LENGTH, 0.018]} />
            <meshBasicMaterial
              ref={(m) => {
                matRefs.current[i] = m;
              }}
              color="#00d9ff"
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// =====================================================
// FACETED INTELLIGENCE CRYSTAL CORE
// A faceted cyan crystal placed inside the turbine aperture.
// Replaces the dark metallic GLB hub with a luminous, dimensional
// intelligence source. Built from two layered icosahedra + a wireframe
// overlay + a violet back-halo for restrained secondary refraction.
// =====================================================
function FacetedIntelligenceCore({
  reducedMotion,
  bootEaseRef,
  isActive,
  accentColorRef,
}: {
  reducedMotion: boolean;
  bootEaseRef: MutableRefObject<number>;
  isActive: boolean;
  accentColorRef: MutableRefObject<THREE.Color>;
}) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const outerMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const innerMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const wireMatRef = useRef<THREE.LineBasicMaterial>(null);
  const haloMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const smoothColor = useRef(new THREE.Color("#00d9ff"));

  const outerGeo = useMemo(() => new THREE.IcosahedronGeometry(0.18, 0), []);
  const wireGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.18, 0)),
    []
  );
  const innerGeo = useMemo(() => new THREE.IcosahedronGeometry(0.105, 1), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const be = bootEaseRef.current;

    // Accent color blend — strict cyan dominance.
    // Even at full activation the crystal stays ~78% cyan so its facets
    // remain visible. The subsystem accent shows up secondarily in the
    // halo + inner sub-crystal, not by recoloring the primary crystal.
    const target = isActive
      ? new THREE.Color("#00d9ff").lerp(accentColorRef.current, 0.22)
      : CYAN;
    smoothColor.current.lerp(target, 0.05);

    if (reducedMotion) {
      if (outerRef.current) {
        outerRef.current.scale.setScalar(be);
        outerRef.current.rotation.set(0.4, 0.6, 0);
      }
      if (innerRef.current) innerRef.current.rotation.set(-0.5, 0.3, 0);
      if (wireRef.current) {
        wireRef.current.scale.setScalar(be * 1.005);
        wireRef.current.rotation.set(0.4, 0.6, 0);
      }
      if (outerMatRef.current)
        outerMatRef.current.emissiveIntensity = 2.4 * be;
      if (haloRef.current) haloRef.current.scale.setScalar(be * 1.6);
      return;
    }

    const breath = 1 + Math.sin(t * (2 * Math.PI / 5.5)) * 0.05;
    const hoverBoost = isActive ? 1.08 : 1.0;

    if (outerRef.current) {
      outerRef.current.scale.setScalar(breath * hoverBoost * be);
      // Slow independent micro-rotation — stabilized inside the spinning shell
      outerRef.current.rotation.y = t * 0.16;
      outerRef.current.rotation.x = Math.sin(t * 0.22) * 0.16;
    }
    if (wireRef.current) {
      wireRef.current.scale.setScalar(breath * hoverBoost * 1.006 * be);
      wireRef.current.rotation.y = t * 0.16;
      wireRef.current.rotation.x = Math.sin(t * 0.22) * 0.16;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.26;
      innerRef.current.rotation.x = -t * 0.18;
      innerRef.current.scale.setScalar(be);
    }
    if (haloRef.current) {
      haloRef.current.scale.setScalar(breath * 1.65 * be);
      haloRef.current.rotation.y = -t * 0.06;
    }

    if (outerMatRef.current) {
      // Crystal emissive stays cyan-dominant — never adopts full accent
      outerMatRef.current.emissive.copy(smoothColor.current);
      outerMatRef.current.color.copy(smoothColor.current);
      // Capped emissive intensity prevents amber/white blowout on Experience
      outerMatRef.current.emissiveIntensity =
        (1.9 + Math.sin(t * (2 * Math.PI / 5.5)) * 0.35 + (isActive ? 0.22 : 0)) *
        be;
    }
    if (innerMatRef.current) {
      // Inner sub-crystal stays ice-blue regardless of active state
      // (avoid lerping toward white which causes the blowout)
      const innerC = new THREE.Color("#7be8ff").lerp(
        smoothColor.current,
        0.35
      );
      innerMatRef.current.color.copy(innerC);
      innerMatRef.current.opacity = (0.75 + (isActive ? 0.06 : 0)) * be;
    }
    if (wireMatRef.current) {
      wireMatRef.current.opacity = (0.55 + (isActive ? 0.12 : 0)) * be;
    }
    if (haloMatRef.current) {
      // Back-halo accepts the secondary subsystem tint here — this is where
      // the active accent color shows up, not on the primary crystal
      const halo = isActive
        ? new THREE.Color("#b537f2").lerp(accentColorRef.current, 0.65)
        : new THREE.Color("#b537f2");
      haloMatRef.current.color.copy(halo);
      haloMatRef.current.opacity = (0.18 + (isActive ? 0.1 : 0)) * be;
    }
  });

  return (
    // Crystal sits where the hidden hub was — at the model origin, in front of it
    <group position={[0, 0, 0.12]}>
      {/* Outer faceted shell — cyan emissive crystal */}
      <mesh ref={outerRef} geometry={outerGeo}>
        <meshStandardMaterial
          ref={outerMatRef}
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={2.2}
          roughness={0.18}
          metalness={0.0}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Inner brighter sub-crystal — counter-rotates for shimmer */}
      <mesh ref={innerRef} geometry={innerGeo}>
        <meshBasicMaterial
          ref={innerMatRef}
          color="#7be8ff"
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* White-hot wireframe overlay catches facet lines */}
      <lineSegments ref={wireRef} geometry={wireGeo}>
        <lineBasicMaterial
          ref={wireMatRef}
          color="#ffffff"
          transparent
          opacity={0.55}
          linewidth={1}
        />
      </lineSegments>

      {/* Violet back-halo for restrained secondary refraction */}
      <mesh ref={haloRef}>
        <icosahedronGeometry args={[0.165, 2]} />
        <meshBasicMaterial
          ref={haloMatRef}
          color="#b537f2"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// =====================================================
// INTELLIGENCE ENGINE MODEL — with tire rotation + neurons
// =====================================================
export default function IntelligenceEngineModel({
  reactorState = "idle",
  reducedMotion = false,
  pointerRef,
  onModelLoaded,
  activeAccentColor,
}: {
  reactorState?: ReactorState;
  reducedMotion?: boolean;
  pointerRef?: MutableRefObject<PointerState>;
  onModelLoaded?: () => void;
  activeAccentColor?: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const coreFrontRef = useRef<THREE.PointLight>(null);
  const accentLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const platformLightRef = useRef<THREE.PointLight>(null);

  const smoothRotX = useRef(CANONICAL_ROT_X);
  const smoothRotY = useRef(CANONICAL_ROT_Y);
  const smoothScale = useRef(0.01);
  const coreIntensity = useRef(0);
  const bootProgress = useRef(0);
  const bootEaseRef = useRef(0);
  const tireAngle = useRef(0);
  const smoothTireSpeed = useRef(TIRE_SPEED_IDLE);

  const accentColorRef = useRef(new THREE.Color("#00d9ff"));
  const smoothAccentLight = useRef(new THREE.Color("#00d9ff"));

  // ───────────────────────────────────────────────────────────────
  // PANEL ANIMATION STATE
  // panelsRef.current = [{ mesh, dirX, dirY }] — one entry per outer panel
  // panelOffsetRef = current radial offset (lerped toward target)
  // sceneInstanceRef = tracks the specific cloned GLB instance so we can
  //   remove only it on reload without clobbering sibling JSX children
  //   (like InternalSeamEnergy)
  // ───────────────────────────────────────────────────────────────
  const panelsRef = useRef<Array<{ mesh: THREE.Mesh; dirX: number; dirY: number }>>([]);
  const panelOffsetRef = useRef(PANEL_OFFSET_BOOT_REST);
  const sceneInstanceRef = useRef<THREE.Object3D | null>(null);

  // DATA ARMOR — inner energy slots + engraved traces + micro identifiers,
  // each parented to its front-facing panel mesh so all three inherit:
  //   (1) tire rotation (via modelRef.rotation.z)
  //   (2) open/close radial motion (via panel.mesh.position)
  // depthTest:false + high renderOrder guarantees they paint on top of the
  // panel material regardless of z-position vs the panel face.
  const slotsRef = useRef<Array<{ mat: THREE.MeshBasicMaterial; angle: number }>>([]);
  const tracesRef = useRef<Array<{ mat: THREE.LineBasicMaterial; angle: number }>>([]);
  const idLabelsRef = useRef<Array<{ mat: THREE.MeshBasicMaterial }>>([]);
  const lastActiveStartRef = useRef<number>(-100);
  const wasActiveRef = useRef<boolean>(false);

  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    if (!scene || !modelRef.current) return;

    // 1) Clone the scene so material edits don't leak across remounts
    const cloned = scene.clone(true);

    // 2) Collect all numbered-mesh parts (`root.0` … `root.16`)
    type PartInfo = {
      mesh: THREE.Mesh;
      center: THREE.Vector3;
      size: THREE.Vector3;
      radialDist: number;
      angle: number;
      volume: number;
    };
    const parts: PartInfo[] = [];
    cloned.updateMatrixWorld(true);
    // Collect ALL meshes — the GLB loader does not preserve "root.X" names
    // through the cloning pipeline, so name-based filtering would skip every
    // mesh. Classification by volume/position below handles identification.
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const box = new THREE.Box3().setFromObject(child);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const radialDist = Math.hypot(center.x, center.y);
        const angle = Math.atan2(center.y, center.x);
        const volume = Math.max(0.0001, size.x * size.y * size.z);
        parts.push({ mesh: child, center, size, radialDist, angle, volume });
      }
    });

    // 3) Classify
    //    - HUB: the part with the LARGEST volume (main wheel body)
    //    - PANELS: ALL other parts (armor segments around the hub)
    const sortedByVolume = [...parts].sort((a, b) => b.volume - a.volume);
    const hub = sortedByVolume[0] ?? null;
    const panelCandidates = parts.filter((p) => p !== hub);

    // 4) Apply per-part treatment
    const panelMeshes = new Set(panelCandidates.map((p) => p.mesh));
    const hubMesh = hub?.mesh ?? null;

    parts.forEach((p) => {
      // Material override on every part
      if (p.mesh.material) {
        const cloned = (p.mesh.material as THREE.MeshStandardMaterial).clone();
        cloned.side = THREE.DoubleSide;
        const isPanel = panelMeshes.has(p.mesh);
        const target = isPanel ? PANEL_MATERIAL : RING_MATERIAL;
        cloned.color = new THREE.Color(target.color);
        cloned.metalness = target.metalness;
        cloned.roughness = target.roughness;
        cloned.envMapIntensity = target.envMapIntensity;
        cloned.needsUpdate = true;
        p.mesh.material = cloned;
      }

      // Hide the dark metallic hub — our procedural crystal replaces it
      if (hubMesh && p.mesh === hubMesh) {
        p.mesh.visible = false;
      }
    });

    // 5) Cache panel meshes + radial directions RELATIVE TO HUB CENTER
    //    (not world origin — the wheel is offset in the GLB).
    const hubCx = hub?.center.x ?? 0;
    const hubCy = hub?.center.y ?? 0;
    panelsRef.current = panelCandidates.map((p) => {
      const dx = p.center.x - hubCx;
      const dy = p.center.y - hubCy;
      const radial = Math.hypot(dx, dy);
      return {
        mesh: p.mesh,
        dirX: radial > 0 ? dx / radial : 0,
        dirY: radial > 0 ? dy / radial : 0,
      };
    });

    // 5b) DATA ARMOR — three layers per front-facing panel:
    //     (a) inner energy slot (luminous cyan slit)
    //     (b) two engraved data-trace lines on the panel face
    //     (c) micro identifier on 4 alternating panels (A-01 / A-03 / A-05 / A-07)
    //
    // CRITICAL FIX from prior pass: slots were embedded INSIDE the panel
    // volume (z=panel_center+0.014, but panel front face is at
    // panel_center+~0.024). They were occluded by the panel material.
    // Now: pushed clearly forward to panel_center+0.06, with depthTest:false
    // and high renderOrder so they cannot be hidden by the GLB geometry.
    slotsRef.current.length = 0;
    tracesRef.current.length = 0;
    idLabelsRef.current.length = 0;

    const SLOT_GEO = new THREE.PlaneGeometry(0.18, 0.035);
    const ID_GEO = new THREE.PlaneGeometry(0.16, 0.035);

    // Helper: build a small canvas texture for a manufacturing-mark identifier
    function makeIdTexture(label: string): THREE.CanvasTexture | null {
      if (typeof document === "undefined") return null;
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.clearRect(0, 0, 256, 64);
      ctx.font = "600 38px ui-monospace, monospace";
      ctx.fillStyle = "#7fa6c8";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, 128, 36);
      const tex = new THREE.CanvasTexture(canvas);
      tex.anisotropy = 4;
      tex.needsUpdate = true;
      return tex;
    }

    // Collect front-facing panels with their angles for ordered identifier assignment
    const frontPanels: Array<{
      p: typeof panelCandidates[number];
      angle: number;
      dirX: number;
      dirY: number;
    }> = [];
    for (const p of panelCandidates) {
      if (p.center.z <= 0) continue;
      const dx = p.center.x - hubCx;
      const dy = p.center.y - hubCy;
      const radial = Math.hypot(dx, dy);
      if (radial < 0.15) continue;
      const angle = Math.atan2(dy, dx);
      frontPanels.push({ p, angle, dirX: dx / radial, dirY: dy / radial });
    }
    // Order by angle so identifier assignment is deterministic + clockwise
    frontPanels.sort((a, b) => a.angle - b.angle);

    const ID_PANELS = new Set([0, 2, 4, 6]); // alternating → 4 of 8 get A-01/A-03/A-05/A-07
    const ID_LABELS = ["A-01", "A-03", "A-05", "A-07"];
    let idAssignIdx = 0;

    frontPanels.forEach(({ p, angle, dirX, dirY }, i) => {
      // ── (a) INNER ENERGY SLOT ──
      // Pushed well in front of the panel face (z + 0.06); depthTest:false
      // means it always renders on top regardless of z-order.
      const slotMat = new THREE.MeshBasicMaterial({
        color: "#5cf2ff",
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        side: THREE.FrontSide,
      });
      const slot = new THREE.Mesh(SLOT_GEO, slotMat);
      slot.renderOrder = 999;
      // Place at panel centroid, offset INWARD slightly along the radial
      // direction (toward hub) so the slot reads as "inner edge".
      slot.position.set(
        p.center.x - dirX * 0.08,
        p.center.y - dirY * 0.08,
        p.center.z + 0.06
      );
      slot.rotation.z = angle + Math.PI / 2;
      p.mesh.add(slot);
      slotsRef.current.push({ mat: slotMat, angle });

      // ── (b) ENGRAVED DATA-TRACE LINES ──
      // Two short angular line segments forming an L-shape or T-shape on
      // the panel face. Pattern varies per panel for organic feel.
      // Vertices are in PANEL-LOCAL coordinates (panel.mesh is at 0,0,0
      // with vertices baked at panel centroid) — so we add the centroid
      // offset to each vertex.
      // Trace patterns: 4 distinct L/T/step variations cycled per panel
      const PATTERNS = [
        // L-shape (horizontal + vertical leg)
        [[-0.08, -0.02], [0.05, -0.02], [0.05, -0.02], [0.05, 0.07]],
        // Step (two horizontals offset)
        [[-0.09, 0.02], [0.0, 0.02], [0.0, 0.02], [0.0, -0.04], [0.0, -0.04], [0.08, -0.04]],
        // T-shape (horizontal with center perpendicular)
        [[-0.08, 0.03], [0.08, 0.03], [0.0, 0.03], [0.0, -0.05]],
        // Y-branch
        [[-0.07, -0.04], [0.0, 0.0], [0.0, 0.0], [0.07, -0.04], [0.0, 0.0], [0.0, 0.06]],
      ];
      const pattern = PATTERNS[i % PATTERNS.length];
      const verts = new Float32Array(pattern.length * 3);
      for (let v = 0; v < pattern.length; v++) {
        // Position trace vertices on the panel face, slightly in front,
        // rotated to the panel's tangential frame.
        const lx = pattern[v][0]; // tangential offset
        const ly = pattern[v][1]; // radial offset
        // Apply tangential/radial → world XY rotation matching panel angle
        const tangX = -Math.sin(angle);
        const tangY = Math.cos(angle);
        const wx = p.center.x + tangX * lx + dirX * ly;
        const wy = p.center.y + tangY * lx + dirY * ly;
        const wz = p.center.z + 0.05;
        verts[v * 3] = wx;
        verts[v * 3 + 1] = wy;
        verts[v * 3 + 2] = wz;
      }
      const traceGeo = new THREE.BufferGeometry();
      traceGeo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      const traceMat = new THREE.LineBasicMaterial({
        color: "#6e92b8",
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        depthTest: false,
      });
      const traces = new THREE.LineSegments(traceGeo, traceMat);
      traces.renderOrder = 998;
      p.mesh.add(traces);
      tracesRef.current.push({ mat: traceMat, angle });

      // ── (c) MICRO IDENTIFIER (only on alternating panels) ──
      if (ID_PANELS.has(i) && idAssignIdx < ID_LABELS.length) {
        const tex = makeIdTexture(ID_LABELS[idAssignIdx]);
        idAssignIdx++;
        if (tex) {
          const idMat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 0.65,
            depthWrite: false,
            depthTest: false,
            side: THREE.FrontSide,
          });
          const idMesh = new THREE.Mesh(ID_GEO, idMat);
          idMesh.renderOrder = 997;
          // Place near outer edge of panel (offset OUTWARD along radial)
          idMesh.position.set(
            p.center.x + dirX * 0.12,
            p.center.y + dirY * 0.12,
            p.center.z + 0.05
          );
          idMesh.rotation.z = angle + Math.PI / 2;
          p.mesh.add(idMesh);
          idLabelsRef.current.push({ mat: idMat });
        }
      }
    });

    // 6) Mount into the scene, centered on the hub (or scene centroid as fallback)
    // Only remove the previously-loaded scene instance — preserve JSX children
    // (e.g. InternalSeamEnergy) that React mounted as siblings.
    if (sceneInstanceRef.current && modelRef.current.children.includes(sceneInstanceRef.current)) {
      modelRef.current.remove(sceneInstanceRef.current);
    }
    // Use the hub centroid as the wheel rotation center so tire-spin behaves naturally
    // and the procedural FacetedIntelligenceCore sits exactly where the hub was hidden.
    if (hub) {
      cloned.position.set(-hub.center.x, -hub.center.y, -hub.center.z);
    } else {
      // Fallback: center bounding box
      const overallBox = new THREE.Box3().setFromObject(cloned);
      const overallCenter = overallBox.getCenter(new THREE.Vector3());
      cloned.position.set(-overallCenter.x, -overallCenter.y, -overallCenter.z);
    }
    modelRef.current.add(cloned);
    sceneInstanceRef.current = cloned;

    onModelLoaded?.();
  }, [scene, onModelLoaded]);

  const isActive = ACTIVATED_STATES.has(reactorState);
  const isBoot = reactorState === "boot";

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // ── Accent color ──
    const targetAccent = activeAccentColor ? hexToColor(activeAccentColor) : CYAN;
    accentColorRef.current.lerp(targetAccent, 0.05);

    // ── Boot ──
    if (isBoot) {
      bootProgress.current = Math.min(bootProgress.current + 0.014, 1);
    } else {
      bootProgress.current = Math.min(bootProgress.current + 0.01, 1);
    }
    const be = 1 - Math.pow(1 - bootProgress.current, 3);
    bootEaseRef.current = be;

    // ── Reduced motion ──
    if (reducedMotion) {
      groupRef.current.rotation.set(CANONICAL_ROT_X, CANONICAL_ROT_Y, CANONICAL_ROT_Z);
      groupRef.current.position.y = 0;
      groupRef.current.scale.setScalar(be);
      if (coreLightRef.current) coreLightRef.current.intensity = 3.0;
      if (coreFrontRef.current) coreFrontRef.current.intensity = 1.8;
      if (rimLightRef.current) rimLightRef.current.intensity = 1.0;
      if (platformLightRef.current) platformLightRef.current.intensity = 1.0;
      if (accentLightRef.current) accentLightRef.current.intensity = isActive ? 0.8 : 0;
      // Data armor: stable visible state, no chase under reduced motion
      const stableSlotColor = isActive
        ? new THREE.Color("#5cf2ff").lerp(accentColorRef.current, 0.22)
        : new THREE.Color("#5cf2ff");
      for (const slot of slotsRef.current) {
        slot.mat.color.copy(stableSlotColor);
        slot.mat.opacity = (isActive ? 0.7 : 0.55) * be;
      }
      const stableTraceColor = isActive
        ? new THREE.Color("#6e92b8").lerp(accentColorRef.current, 0.15)
        : new THREE.Color("#6e92b8");
      for (const trace of tracesRef.current) {
        trace.mat.color.copy(stableTraceColor);
        trace.mat.opacity = (isActive ? 0.6 : 0.5) * be;
      }
      for (const id of idLabelsRef.current) {
        id.mat.opacity = (isActive ? 0.7 : 0.6) * be;
      }
      return;
    }

    // ── TIRE ROTATION — slow front-axis spin ──
    const targetSpeed = isActive ? TIRE_SPEED_ACTIVE : TIRE_SPEED_IDLE;
    smoothTireSpeed.current += (targetSpeed - smoothTireSpeed.current) * 0.03;
    tireAngle.current += smoothTireSpeed.current * delta;

    // Apply tire rotation to the model group (not the outer group that handles drift)
    if (modelRef.current) {
      // The model children are inside modelRef — rotate the modelRef on Z axis
      // This spins the entire GLB like a tire viewed from the front
      modelRef.current.rotation.z = tireAngle.current;
    }

    // ── PANEL OPEN / CLOSE — per-panel radial offset ──
    // Boot: panels start slightly compressed and ease to operational rest
    // Idle: panels at operational rest (slightly open from the wheel)
    // Active: panels push outward a controlled +4-8% on module selection
    let targetOffset: number;
    if (isBoot && bootProgress.current < 0.98) {
      // During boot, smoothly travel from BOOT_REST → IDLE as boot eases in
      targetOffset =
        PANEL_OFFSET_BOOT_REST +
        (PANEL_OFFSET_IDLE - PANEL_OFFSET_BOOT_REST) * be;
    } else if (isActive) {
      targetOffset = PANEL_OFFSET_ACTIVE;
    } else {
      targetOffset = PANEL_OFFSET_IDLE;
    }
    panelOffsetRef.current +=
      (targetOffset - panelOffsetRef.current) * 0.06;

    if (!reducedMotion || isBoot) {
      const offset = panelOffsetRef.current;
      for (const panel of panelsRef.current) {
        panel.mesh.position.set(
          panel.dirX * offset,
          panel.dirY * offset,
          0
        );
      }
    } else {
      // Reduced motion: hold panels at idle pose, no animation
      for (const panel of panelsRef.current) {
        panel.mesh.position.set(
          panel.dirX * PANEL_OFFSET_IDLE,
          panel.dirY * PANEL_OFFSET_IDLE,
          0
        );
      }
    }

    // ── DATA ARMOR — inner energy slots ──
    // Detect active-edge transition (off → on) to trigger a routing chase
    if (isActive && !wasActiveRef.current) {
      lastActiveStartRef.current = t;
    }
    wasActiveRef.current = isActive;

    if (slotsRef.current.length > 0) {
      // Idle: subtle synchronized cyan breathing on every slot
      const idleBreath = Math.sin(t * (2 * Math.PI / 5.5));
      const slotIdleBase = 0.55 + (reducedMotion ? 0 : idleBreath * 0.1);
      // Traces idle at a lower steel-grey opacity (etched appearance)
      const traceIdleBase = 0.5 + (reducedMotion ? 0 : idleBreath * 0.06);
      const idIdleBase = 0.6 + (reducedMotion ? 0 : idleBreath * 0.05);

      // Routing chase: ~850ms wave traveling around the wheel
      const WAVE_DURATION = 0.85;
      const WAVE_SIGMA = 0.55; // angular spread (radians) of the wave
      const sinceActivate = t - lastActiveStartRef.current;
      const inWave = isActive && !reducedMotion && sinceActivate < WAVE_DURATION;
      const waveT = inWave ? sinceActivate / WAVE_DURATION : 0;
      const waveAngle = -Math.PI / 2 + waveT * Math.PI * 1.4;
      const retainAccent = isActive && !inWave;

      const TRACE_BASE_COLOR = new THREE.Color("#6e92b8");

      for (let i = 0; i < slotsRef.current.length; i++) {
        const slot = slotsRef.current[i];
        // SLOT — bright cyan, optionally blended toward accent during wave
        let slotColor = new THREE.Color("#5cf2ff");
        let slotOp = slotIdleBase;
        // TRACE — cool steel base, briefly receives accent glow on wave
        let traceColor = TRACE_BASE_COLOR.clone();
        let traceOp = traceIdleBase;

        if (inWave) {
          let angDiff = slot.angle - waveAngle;
          angDiff = ((angDiff + Math.PI) % (2 * Math.PI)) - Math.PI;
          const waveBrightness = Math.exp(
            -(angDiff * angDiff) / (2 * WAVE_SIGMA * WAVE_SIGMA)
          );
          slotColor = new THREE.Color("#5cf2ff").lerp(
            accentColorRef.current,
            Math.min(0.8, waveBrightness * 0.9)
          );
          slotOp = slotIdleBase + waveBrightness * 0.45;
          traceColor = TRACE_BASE_COLOR.clone().lerp(
            accentColorRef.current,
            Math.min(0.7, waveBrightness * 0.85)
          );
          traceOp = traceIdleBase + waveBrightness * 0.45;
        } else if (retainAccent) {
          slotColor = new THREE.Color("#5cf2ff").lerp(
            accentColorRef.current,
            0.22
          );
          slotOp = slotIdleBase + 0.08;
          traceColor = TRACE_BASE_COLOR.clone().lerp(
            accentColorRef.current,
            0.15
          );
          traceOp = traceIdleBase + 0.05;
        }

        slot.mat.color.copy(slotColor);
        slot.mat.opacity = slotOp * be;

        // Apply matching trace styling if a trace exists for this index
        const trace = tracesRef.current[i];
        if (trace) {
          trace.mat.color.copy(traceColor);
          trace.mat.opacity = traceOp * be;
        }
      }

      // Identifiers: subtle constant visibility, brighten slightly on active
      for (const id of idLabelsRef.current) {
        id.mat.opacity = (isActive ? idIdleBase + 0.1 : idIdleBase) * be;
      }
    }

    // ── Gentle drift — minimal since tire provides primary motion ──
    const driftX = Math.sin(t * 0.1 + 0.5) * IDLE_DRIFT_RAD;
    const driftY = Math.cos(t * 0.08) * IDLE_DRIFT_RAD * 0.5;
    const floatY = Math.sin(t * FLOAT_SPD) * FLOAT_AMP;

    // ── Parallax ──
    let px = 0, py = 0;
    if (pointerRef?.current?.active) {
      px = -pointerRef.current.y * MAX_PARALLAX_RAD;
      py = pointerRef.current.x * MAX_PARALLAX_RAD;
    }

    const tRX = CANONICAL_ROT_X + driftX + px;
    const tRY = CANONICAL_ROT_Y + driftY + py;
    smoothRotX.current += (tRX - smoothRotX.current) * PARALLAX_DAMPING;
    smoothRotY.current += (tRY - smoothRotY.current) * PARALLAX_DAMPING;
    groupRef.current.rotation.set(smoothRotX.current, smoothRotY.current, CANONICAL_ROT_Z);
    groupRef.current.position.y = floatY;

    // ── Scale ──
    const tScale = isActive ? 1.02 : 1.0;
    smoothScale.current += (tScale - smoothScale.current) * 0.05;
    groupRef.current.scale.setScalar(smoothScale.current * be);

    // ── Core lights — boosted for more vivid presence ──
    const breathCycle = Math.sin(t * (2 * Math.PI / 5));
    const coreBreathe = 3.2 + breathCycle * 0.8; // stronger base
    const hoverBoost = isActive ? 1.5 : 0;       // stronger activation
    const targetI = (coreBreathe + hoverBoost) * be;
    coreIntensity.current += (targetI - coreIntensity.current) * 0.07;
    if (coreLightRef.current) coreLightRef.current.intensity = coreIntensity.current;

    if (coreFrontRef.current) {
      coreFrontRef.current.intensity = (1.8 + breathCycle * 0.4 + (isActive ? 0.8 : 0)) * be;
    }

    // ── Accent light — stronger module color presence ──
    if (accentLightRef.current) {
      const aTarget = isActive ? 1.4 : 0;
      const aCurr = accentLightRef.current.intensity;
      accentLightRef.current.intensity = aCurr + (aTarget - aCurr) * 0.07;
      smoothAccentLight.current.lerp(accentColorRef.current, 0.06);
      accentLightRef.current.color.copy(smoothAccentLight.current);
    }

    if (rimLightRef.current) {
      rimLightRef.current.intensity = (1.0 + (isActive ? 0.5 : 0)) * be;
    }
    if (platformLightRef.current) {
      platformLightRef.current.intensity = (1.0 + Math.sin(t * 0.8) * 0.2 + (isActive ? 0.6 : 0)) * be;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Model group — this rotates like a tire on Z axis */}
      <group ref={modelRef}>
        {/* Internal seam energy — sits INSIDE the wheel, between core and
            outer panels, rotates WITH the wheel so cyan light streams out
            of every radial gap as the turbine turns */}
        <InternalSeamEnergy
          reducedMotion={reducedMotion}
          bootEaseRef={bootEaseRef}
          isActive={isActive}
          accentColorRef={accentColorRef}
        />
      </group>

      {/* Energy layers — these do NOT tire-rotate, they stay front-facing */}
      {/* NEW: Faceted procedural crystal core (replaces the hidden metallic hub) */}
      <FacetedIntelligenceCore
        reducedMotion={reducedMotion}
        bootEaseRef={bootEaseRef}
        isActive={isActive}
        accentColorRef={accentColorRef}
      />
      <CoreAura
        reducedMotion={reducedMotion}
        bootEaseRef={bootEaseRef}
        isActive={isActive}
        accentColorRef={accentColorRef}
      />
      <ApertureEnergySystem
        reducedMotion={reducedMotion}
        bootEaseRef={bootEaseRef}
        isActive={isActive}
        accentColorRef={accentColorRef}
      />
      <NeuronField
        reducedMotion={reducedMotion}
        bootEaseRef={bootEaseRef}
        isActive={isActive}
        accentColorRef={accentColorRef}
      />
      {/* PlatformUnderglow removed — the new modular turbine has no pedestal,
          and a large half-disc glow underneath was reintroducing a platform
          silhouette. Engine now floats freely against the dark navy atmosphere. */}

      {/* Lights — boosted for vibrancy */}
      <pointLight ref={coreLightRef} color="#00d9ff" intensity={0} distance={6} decay={1.2} position={[0, 0, 0.2]} />
      <pointLight ref={coreFrontRef} color="#30e0ff" intensity={0} distance={5} decay={1.4} position={[0, 0, 0.8]} />
      <pointLight ref={accentLightRef} color="#00d9ff" intensity={0} distance={4} decay={1.6} position={[0, 0, 0.35]} />
      <pointLight ref={rimLightRef} color="#9040e0" intensity={0} distance={5} decay={1.4} position={[0, 0.05, -0.8]} />
      {/* platform light removed — turbine floats freely; no pedestal glow */}
    </group>
  );
}
