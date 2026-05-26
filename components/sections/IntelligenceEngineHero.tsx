"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { IntelligenceReactorFallback } from "@/components/experimental/IntelligenceReactorFallback";
import type { ReactorState } from "@/components/experimental/IntelligenceEngineModel";
import {
  COMMAND_MODULES,
  DESKTOP_MODULE_POSITIONS,
  MODULE_SECTION_ANCHORS,
  getModuleAccentColor,
  type CommandModule,
} from "@/components/experimental/CommandModuleData";
import CommandModuleCard from "@/components/experimental/CommandModuleCard";
import ConnectorNetwork from "@/components/experimental/ConnectorNetwork";
import ModulePreviewPanel from "@/components/experimental/ModulePreviewPanel";
import MobileModuleGrid from "@/components/experimental/MobileModuleGrid";

const IntelligenceReactor3D = dynamic(
  () => import("@/components/experimental/IntelligenceReactor3D"),
  {
    ssr: false,
    loading: () => <IntelligenceReactorFallback animated={false} />,
  }
);

type PointerState = { active: boolean; x: number; y: number };

export function IntelligenceEngineHero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [reactorState, setReactorState] = useState<ReactorState>("boot");
  const [bootComplete, setBootComplete] = useState(false);
  const [activeModule, setActiveModule] = useState<ReactorState | null>(null);

  const pointerRef = useRef<PointerState>({ active: false, x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const reactorContainerRef = useRef<HTMLDivElement | null>(null);
  const bootTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMounted(true);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);

    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      if (bootTimerRef.current) clearTimeout(bootTimerRef.current);
      mobileTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true);
    bootTimerRef.current = setTimeout(() => {
      setReactorState("idle");
      setTimeout(() => setBootComplete(true), 250);
    }, 1500);
  }, []);

  const smoothScrollTo = useCallback(
    (elementId: string) => {
      const el = document.getElementById(elementId);
      el?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [reducedMotion]
  );

  // Module → section navigation. Modules with no mapped anchor
  // (e.g. the "coming online" TERMINAL) intentionally do nothing.
  const navigateToModule = useCallback(
    (id: string) => {
      const sectionId = MODULE_SECTION_ANCHORS[id];
      if (!sectionId) return;
      smoothScrollTo(sectionId);
    },
    [smoothScrollTo]
  );

  const handleModuleActivate = useCallback(
    (id: string) => {
      if (reactorState === "boot") return;
      const moduleState = id as ReactorState;
      setActiveModule(moduleState);
      setReactorState(moduleState);
    },
    [reactorState]
  );

  const handleModuleDeactivate = useCallback(() => {
    setActiveModule(null);
    setReactorState("idle");
  }, []);

  const handleModuleNavigate = useCallback(
    (id: string) => {
      navigateToModule(id);
    },
    [navigateToModule]
  );

  // Mobile: a tap pulses the reactor in the module's accent (so the grid
  // feels wired to the engine), then routes to the section. A "coming
  // online" module pulses the engine but never navigates.
  const handleMobileSelect = useCallback(
    (mod: CommandModule) => {
      if (reactorState === "boot") return;

      mobileTimersRef.current.forEach(clearTimeout);
      mobileTimersRef.current = [];

      setActiveModule(mod.id);
      setReactorState(mod.id);

      if (mod.comingSoon) {
        mobileTimersRef.current.push(
          setTimeout(
            () => {
              setActiveModule(null);
              setReactorState("idle");
            },
            reducedMotion ? 700 : 2200
          )
        );
        return;
      }

      mobileTimersRef.current.push(
        setTimeout(() => navigateToModule(mod.id), reducedMotion ? 0 : 220)
      );
      mobileTimersRef.current.push(
        setTimeout(
          () => {
            setActiveModule(null);
            setReactorState("idle");
          },
          reducedMotion ? 300 : 1100
        )
      );
    },
    [reactorState, reducedMotion, navigateToModule]
  );

  const useWebGL = mounted;

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      if (e.pointerType === "touch") return;
      const rect = sectionRef.current.getBoundingClientRect();
      pointerRef.current.x =
        ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -(
        ((e.clientY - rect.top) / rect.height) * 2 - 1
      );
    },
    []
  );

  const handlePointerEnter = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (e.pointerType === "touch") return;
      pointerRef.current.active = true;
    },
    []
  );

  const handlePointerLeave = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (e.pointerType === "touch") return;
      pointerRef.current.active = false;
    },
    []
  );

  const reveal = (delay: number) => ({
    opacity: bootComplete ? 1 : 0,
    transform: bootComplete ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion
      ? "none"
      : `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
  });

  // Reveal tied to mount (not the WebGL boot). Mobile identity must read
  // immediately — it should never wait for the reactor to finish booting.
  const textReveal = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion
      ? "none"
      : `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
  });

  const activeModuleData = activeModule
    ? COMMAND_MODULES.find((m) => m.id === activeModule) ?? null
    : null;

  const activeAccentColor = activeModule
    ? getModuleAccentColor(activeModule)
    : null;

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="relative flex flex-col overflow-hidden lg:min-h-[calc(100vh_-_var(--nav-height))]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #0f1435 0%, #080c22 55%, #040610 100%)",
      }}
    >
      {/* Atmospheric layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 55% 30%, rgba(0,217,255,0.05) 0%, transparent 50%), " +
            "radial-gradient(circle at 65% 55%, rgba(144,64,224,0.03) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════
          DESKTOP — split layout: copy left, reactor+modules right
          ══════════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-1 items-center justify-center w-full max-w-[1280px] mx-auto px-8 gap-6">
        {/* LEFT — Hero copy */}
        <div
          className="flex flex-col justify-center flex-shrink-0"
          style={{ width: "340px", maxWidth: "36%" }}
        >
          {/* Eyebrow */}
          <div style={reveal(0)} className="mb-5">
            <span
              className="text-[10px] font-mono tracking-[0.3em]"
              style={{ color: "rgba(0,217,255,0.55)" }}
            >
              ALBARAA OS / INTELLIGENCE ENGINE
            </span>
          </div>

          {/* Heading — identity-first wordmark + role */}
          <h1 style={{ ...reveal(80), margin: 0 }} className="mb-4">
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.1rem, 3vw, 2.95rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                color: "#f0f1f7",
                textShadow: "0 0 26px rgba(0,217,255,0.12)",
              }}
            >
              ALBARAA
            </span>
            <span
              style={{
                display: "block",
                marginTop: "0.6rem",
                fontSize: "clamp(1.2rem, 1.75vw, 1.55rem)",
                fontWeight: 600,
                lineHeight: 1.22,
                letterSpacing: "-0.01em",
                color: "#00d9ff",
              }}
            >
              {"AI Builder &"}
              <br />
              Software Engineer
            </span>
          </h1>

          {/* Supporting paragraph */}
          <p
            style={{
              ...reveal(160),
              fontSize: "0.84rem",
              color: "rgba(160,165,197,0.62)",
              lineHeight: 1.55,
              maxWidth: "300px",
            }}
            className="mb-6"
          >
            Software Engineering Student crafting AI-powered products and modern
            digital experiences.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3" style={reveal(280)}>
            <button
              className="px-5 py-2.5 rounded-lg font-medium text-sm outline-none ie-focus"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,217,255,0.18) 0%, rgba(0,217,255,0.06) 100%)",
                border: "1px solid rgba(0,217,255,0.3)",
                color: "#00d9ff",
                cursor: "pointer",
                transition: "all 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,217,255,0.6)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(0,217,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,217,255,0.3)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => smoothScrollTo("projects")}
            >
              Explore Projects
            </button>
            <a
              href="/resume/Albaraa-Alnahari-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-medium text-sm outline-none ie-focus"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(232,233,243,0.78)",
                cursor: "pointer",
                transition: "all 250ms ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              View Resume
            </a>
          </div>

          {/* Status */}
          <div style={reveal(350)} className="mt-6">
            <span
              className="text-[9px] font-mono tracking-[0.25em]"
              style={{ color: "rgba(0,217,255,0.35)" }}
            >
              SYSTEM ONLINE / OPEN TO OPPORTUNITIES
            </span>
          </div>

          {/* Preview panel — left column so the engine stays clear */}
          <div style={{ ...reveal(400), minHeight: "176px" }} className="mt-5">
            <ModulePreviewPanel
              module={activeModuleData}
              reducedMotion={reducedMotion}
              variant="desktop"
              onNavigate={
                activeModule && !activeModuleData?.comingSoon
                  ? () => navigateToModule(activeModule)
                  : undefined
              }
            />
          </div>
        </div>

        {/* RIGHT — Reactor + Modules */}
        <div
          ref={reactorContainerRef}
          className="relative flex-1"
          style={{
            maxWidth: "620px",
            aspectRatio: "1 / 1",
            minHeight: "480px",
          }}
        >
          <ConnectorNetwork
            activeModule={activeModule}
            reducedMotion={reducedMotion}
            cardsReady={bootComplete}
          />

          {/* WebGL reactor */}
          <div
            className="absolute"
            style={{
              top: "12%",
              left: "12%",
              right: "12%",
              bottom: "12%",
            }}
            onPointerEnter={(e) => {
              if (e.pointerType === "touch") return;
              if (!activeModule && reactorState !== "boot") {
                setReactorState("reactorHover");
              }
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "touch") return;
              if (reactorState === "reactorHover") {
                setReactorState("idle");
              }
            }}
          >
            {!modelLoaded && mounted && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div
                  className="w-20 h-20 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 70%)",
                    animation: reducedMotion
                      ? "none"
                      : "iePulse 2.5s ease-in-out infinite",
                  }}
                />
              </div>
            )}
            <Suspense
              fallback={<IntelligenceReactorFallback animated={false} />}
            >
              {useWebGL ? (
                <IntelligenceReactor3D
                  reducedMotion={reducedMotion}
                  pointerRef={pointerRef}
                  reactorState={reactorState}
                  onModelLoaded={handleModelLoaded}
                  isMobile={false}
                  activeAccentColor={activeAccentColor}
                />
              ) : (
                <IntelligenceReactorFallback animated={!reducedMotion} />
              )}
            </Suspense>
          </div>

          {/* Floating command modules */}
          {bootComplete &&
            COMMAND_MODULES.map((mod) => {
              const pos = DESKTOP_MODULE_POSITIONS[mod.id];
              if (!pos) return null;
              return (
                <CommandModuleCard
                  key={mod.id}
                  module={mod}
                  isSelected={activeModule === mod.id}
                  isAnySelected={!!activeModule}
                  reducedMotion={reducedMotion}
                  onActivate={handleModuleActivate}
                  onDeactivate={handleModuleDeactivate}
                  onNavigate={handleModuleNavigate}
                  style={{ top: pos.top, left: pos.left }}
                />
              );
            })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE / TABLET — vertical cinematic composition
          ══════════════════════════════════════════════ */}
      <div className="flex lg:hidden flex-col w-full px-5 pt-6 pb-10">
        {/* ── Identity — leads the mobile experience ── */}
        <div className="text-center">
          {/* Eyebrow */}
          <div style={textReveal(0)}>
            <span
              className="text-[9px] font-mono tracking-[0.28em]"
              style={{ color: "rgba(0,217,255,0.55)" }}
            >
              ALBARAA OS / INTELLIGENCE ENGINE
            </span>
          </div>

          {/* Name + role */}
          <h1 className="mt-3" style={{ ...textReveal(60), margin: 0 }}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.3rem, 12vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                color: "#f0f1f7",
                textShadow: "0 0 28px rgba(0,217,255,0.16)",
              }}
            >
              ALBARAA
            </span>
            <span
              style={{
                display: "block",
                marginTop: "0.55rem",
                fontSize: "clamp(1.05rem, 5.2vw, 1.35rem)",
                fontWeight: 600,
                lineHeight: 1.24,
                letterSpacing: "-0.01em",
                color: "#00d9ff",
              }}
            >
              {"AI Builder &"}
              <br />
              Software Engineer
            </span>
          </h1>

          {/* Supporting paragraph */}
          <p
            className="mt-3 mb-5 mx-auto"
            style={{
              ...textReveal(120),
              fontSize: "0.78rem",
              color: "rgba(160,165,197,0.6)",
              lineHeight: 1.5,
              maxWidth: "19rem",
            }}
          >
            Software Engineering Student crafting AI-powered products and modern
            digital experiences.
          </p>

          {/* CTAs */}
          <div
            className="flex items-center justify-center gap-3"
            style={textReveal(180)}
          >
            <button
              className="px-5 py-2.5 rounded-lg font-medium text-sm outline-none ie-focus"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,217,255,0.18), rgba(0,217,255,0.06))",
                border: "1px solid rgba(0,217,255,0.3)",
                color: "#00d9ff",
                cursor: "pointer",
              }}
              onClick={() => smoothScrollTo("projects")}
            >
              Explore Projects
            </button>
            <a
              href="/resume/Albaraa-Alnahari-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-medium text-sm outline-none ie-focus"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(232,233,243,0.78)",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              View Resume
            </a>
          </div>

          {/* Status */}
          <div className="mt-5" style={textReveal(240)}>
            <span
              className="text-[9px] font-mono tracking-[0.24em]"
              style={{ color: "rgba(0,217,255,0.4)" }}
            >
              SYSTEM ONLINE / AVAILABLE
            </span>
          </div>
        </div>

        {/* ── Reactor — premium focal visual below the identity ── */}
        <div
          className="relative mx-auto w-full"
          style={{
            ...textReveal(320),
            maxWidth: "min(360px, 86vw)",
            aspectRatio: "1 / 1",
            marginTop: "1.6rem",
          }}
        >
          {!modelLoaded && mounted && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className="w-14 h-14 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 70%)",
                  animation: reducedMotion
                    ? "none"
                    : "iePulse 2.5s ease-in-out infinite",
                }}
              />
            </div>
          )}
          <Suspense fallback={<IntelligenceReactorFallback animated={false} />}>
            {useWebGL ? (
              <IntelligenceReactor3D
                reducedMotion={reducedMotion}
                pointerRef={pointerRef}
                reactorState={reactorState}
                onModelLoaded={handleModelLoaded}
                isMobile={true}
                activeAccentColor={activeAccentColor}
              />
            ) : (
              <IntelligenceReactorFallback animated={!reducedMotion} />
            )}
          </Suspense>
        </div>

        {/* ── Neural module console (2 × 3) — full, readable navigation ── */}
        <div className="mt-5" style={textReveal(400)}>
          <MobileModuleGrid
            activeModule={activeModule}
            onSelect={handleMobileSelect}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>

      {/* SSR fallback — identity reads immediately, before hydration */}
      {!mounted && (
        <div className="flex flex-col flex-1 items-center justify-center w-full px-6 py-8">
          <span
            className="text-[9px] font-mono tracking-[0.28em] mb-3"
            style={{ color: "rgba(0,217,255,0.55)" }}
          >
            ALBARAA OS / INTELLIGENCE ENGINE
          </span>
          <h1 className="text-center" style={{ margin: 0 }}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.2rem, 11vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                color: "#f0f1f7",
              }}
            >
              ALBARAA
            </span>
            <span
              style={{
                display: "block",
                marginTop: "0.5rem",
                fontSize: "clamp(1.05rem, 5vw, 1.35rem)",
                fontWeight: 600,
                lineHeight: 1.24,
                color: "#00d9ff",
              }}
            >
              {"AI Builder &"}
              <br />
              Software Engineer
            </span>
          </h1>
          <div className="w-full max-w-[300px] aspect-square mt-6">
            <IntelligenceReactorFallback animated={false} />
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: bootComplete ? 1 : 0, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <span
          className="text-[9px] font-mono tracking-[0.2em]"
          style={{ color: "rgba(0,217,255,0.45)" }}
        >
          EXPLORE
        </span>
        <motion.div
          animate={
            reducedMotion
              ? {}
              : { y: [0, 6, 0], opacity: [0.4, 1, 0.4] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm"
          style={{ color: "rgba(0,217,255,0.7)" }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes iePulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
}
