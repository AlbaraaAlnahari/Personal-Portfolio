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
} from "@/components/experimental/CommandModuleData";
import CommandModuleCard from "@/components/experimental/CommandModuleCard";
import ConnectorNetwork from "@/components/experimental/ConnectorNetwork";
import ModulePreviewPanel from "@/components/experimental/ModulePreviewPanel";
import MobileModuleDock from "@/components/experimental/MobileModuleDock";

const IntelligenceReactor3D = dynamic(
  () => import("@/components/experimental/IntelligenceReactor3D"),
  {
    ssr: false,
    loading: () => <IntelligenceReactorFallback animated={false} />,
  }
);

type PointerState = { active: boolean; x: number; y: number };

function scrollToSection(moduleId: string) {
  const sectionId = MODULE_SECTION_ANCHORS[moduleId];
  if (!sectionId) return;
  const el = document.getElementById(sectionId);
  el?.scrollIntoView({ behavior: "smooth" });
}

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
    };
  }, []);

  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true);
    bootTimerRef.current = setTimeout(() => {
      setReactorState("idle");
      setTimeout(() => setBootComplete(true), 250);
    }, 1500);
  }, []);

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

  const handleModuleNavigate = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  const handleMobileModuleSelect = useCallback(
    (id: ReactorState) => {
      if (reactorState === "boot") return;
      setActiveModule(id);
      setReactorState(id);
      setTimeout(() => {
        setActiveModule(null);
        setReactorState("idle");
      }, 3000);
    },
    [reactorState]
  );

  const handleMobileModuleDeselect = useCallback(() => {
    setActiveModule(null);
    setReactorState("idle");
  }, []);

  const handleMobileNavigate = useCallback(() => {
    if (activeModule) scrollToSection(activeModule);
  }, [activeModule]);

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
      className="relative flex flex-col overflow-hidden"
      style={{
        minHeight: "calc(100vh - var(--nav-height, 0px))",
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

          {/* Heading */}
          <h1
            style={{
              ...reveal(80),
              fontSize: "clamp(1.7rem, 2.8vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              fontWeight: 600,
              color: "#e8e9f3",
            }}
            className="mb-4"
          >
            Turning intelligence
            <br />
            <span style={{ color: "#00d9ff" }}>
              into systems people can use.
            </span>
          </h1>

          {/* Role */}
          <p
            style={{
              ...reveal(140),
              fontSize: "0.85rem",
              color: "rgba(160,165,197,0.72)",
              lineHeight: 1.5,
            }}
            className="mb-2"
          >
            Software Engineering Student · AI Builder · Full-Stack Developer
          </p>

          {/* Description */}
          <p
            style={{
              ...reveal(200),
              fontSize: "0.8rem",
              color: "rgba(160,165,197,0.48)",
              lineHeight: 1.5,
            }}
            className="mb-6"
          >
            Building AI-powered products and modern digital systems from idea
            to deployment.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3" style={reveal(280)}>
            <button
              className="px-5 py-2.5 rounded-lg font-medium text-sm"
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
              onClick={() => scrollToSection("projects")}
            >
              Explore Projects
            </button>
            <button
              className="px-5 py-2.5 rounded-lg font-medium text-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(232,233,243,0.78)",
                cursor: "pointer",
                transition: "all 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Albaraa_Alnahari_Resume.pdf";
                link.click();
              }}
            >
              View Resume
            </button>
          </div>

          {/* Status */}
          <div style={reveal(350)} className="mt-6">
            <span
              className="text-[9px] font-mono tracking-[0.25em]"
              style={{ color: "rgba(0,217,255,0.35)" }}
            >
              SYSTEM ONLINE / SIX MODULES CONNECTED
            </span>
          </div>

          {/* Preview panel — left column so the engine stays clear */}
          <div style={{ ...reveal(400), minHeight: "176px" }} className="mt-5">
            <ModulePreviewPanel
              module={activeModuleData}
              reducedMotion={reducedMotion}
              variant="desktop"
              onNavigate={activeModule ? () => scrollToSection(activeModule) : undefined}
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
      <div className="flex lg:hidden flex-col flex-1 w-full">
        <div className="h-12" />

        {/* Eyebrow */}
        <div className="px-5 text-center" style={reveal(0)}>
          <span
            className="text-[9px] font-mono tracking-[0.28em]"
            style={{ color: "rgba(0,217,255,0.55)" }}
          >
            ALBARAA OS / INTELLIGENCE ENGINE
          </span>
        </div>

        {/* Heading */}
        <h1
          className="px-5 text-center mt-2 mb-1"
          style={{
            ...reveal(60),
            fontSize: "clamp(1.35rem, 4.5vw, 1.8rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            fontWeight: 600,
            color: "#e8e9f3",
          }}
        >
          Turning intelligence
          <br />
          <span style={{ color: "#00d9ff" }}>
            into systems people can use.
          </span>
        </h1>

        {/* Reactor */}
        <div
          className="relative mx-auto w-full"
          style={{
            maxWidth: "min(340px, 80vw)",
            aspectRatio: "1 / 1",
            marginTop: "2px",
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
          <Suspense
            fallback={<IntelligenceReactorFallback animated={false} />}
          >
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

        {/* Status */}
        <div className="text-center -mt-1" style={reveal(100)}>
          <span
            className="text-[8px] font-mono tracking-[0.25em]"
            style={{ color: "rgba(0,217,255,0.38)" }}
          >
            CORE ONLINE / MODULES READY
          </span>
        </div>

        {/* Module Dock */}
        <div className="mt-2" style={reveal(150)}>
          <MobileModuleDock
            activeModule={activeModule}
            onSelect={handleMobileModuleSelect}
            onDeselect={handleMobileModuleDeselect}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Mobile preview panel */}
        <div className="px-4 mt-2">
          <ModulePreviewPanel
            module={activeModuleData}
            reducedMotion={reducedMotion}
            variant="mobile"
            onNavigate={handleMobileNavigate}
          />
        </div>

        {/* Role + Description + CTAs */}
        <div className="px-5 mt-3 text-center flex-shrink-0">
          <p
            style={{
              ...reveal(200),
              fontSize: "0.75rem",
              color: "rgba(160,165,197,0.68)",
              lineHeight: 1.4,
            }}
            className="mb-1"
          >
            Software Engineering Student · AI Builder · Full-Stack Developer
          </p>
          <p
            style={{
              ...reveal(240),
              fontSize: "0.7rem",
              color: "rgba(160,165,197,0.42)",
              lineHeight: 1.45,
            }}
            className="mb-4 max-w-xs mx-auto"
          >
            Building AI-powered products and modern digital systems from idea to
            deployment.
          </p>

          <div
            className="flex items-center justify-center gap-3"
            style={reveal(300)}
          >
            <button
              className="px-5 py-2.5 rounded-lg font-medium text-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,217,255,0.18), rgba(0,217,255,0.06))",
                border: "1px solid rgba(0,217,255,0.3)",
                color: "#00d9ff",
                cursor: "pointer",
              }}
              onClick={() => scrollToSection("projects")}
            >
              Explore Projects
            </button>
            <button
              className="px-5 py-2.5 rounded-lg font-medium text-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(232,233,243,0.78)",
                cursor: "pointer",
              }}
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Albaraa_Alnahari_Resume.pdf";
                link.click();
              }}
            >
              View Resume
            </button>
          </div>
        </div>

        <div className="h-12" />
      </div>

      {/* SSR fallback */}
      {!mounted && (
        <div className="flex flex-col flex-1 items-center justify-center w-full px-6">
          <div className="w-full max-w-[340px] aspect-square">
            <IntelligenceReactorFallback animated={false} />
          </div>
          <h1
            className="text-center mt-3 font-semibold"
            style={{
              fontSize: "1.45rem",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "#e8e9f3",
            }}
          >
            Turning intelligence
            <br />
            <span style={{ color: "#00d9ff" }}>
              into systems people can use.
            </span>
          </h1>
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
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
