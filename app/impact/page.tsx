import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { OrganizationsLeadership } from "@/components/sections/OrganizationsLeadership";
import { OfficialPresence } from "@/components/sections/OfficialPresence";
import { InteriorBlueprintField } from "@/components/layout/InteriorBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Impact — Experience & Leadership | ALBARAA OS",
  description:
    "Applied professional experience and community leadership impact — product, robotics, and education roles, large-scale program and student-community leadership, plus official presenting, talent recognition, and volunteering.",
};

export default function ImpactPage() {
  return (
    <main className="min-h-screen">
      <InteriorBlueprintField />
      <div className="relative z-10">
        <h1 className="sr-only">Impact — applied experience and leadership</h1>
        <ExperienceTimeline />
        <OrganizationsLeadership />
        <OfficialPresence />
        <SiteFooter />
      </div>
    </main>
  );
}
