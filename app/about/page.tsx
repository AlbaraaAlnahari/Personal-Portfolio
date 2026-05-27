import type { Metadata } from "next";
import { AboutModule } from "@/components/sections/AboutModule";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "About — Albaraa Alnahari | ALBARAA OS",
  description:
    "Albaraa Alnahari — Software Engineering student building AI-enabled products. Verified identity profile and the engineering capability matrix behind the work.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">About Albaraa Alnahari — identity and capabilities</h1>
      <AboutModule />
      <SkillsMatrix />
      <SiteFooter />
    </main>
  );
}
