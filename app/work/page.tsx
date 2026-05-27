import type { Metadata } from "next";
import { ProjectsSystems } from "@/components/sections/ProjectsSystems";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Work — Selected Systems | ALBARAA OS",
  description:
    "Selected product work by Albaraa Alnahari — DocuPilot, TechPath, Sanadk, and Slide-Mind: AI-enabled and accessibility-focused software systems.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">Selected work — deployed product systems</h1>
      <ProjectsSystems />
      <SiteFooter />
    </main>
  );
}
