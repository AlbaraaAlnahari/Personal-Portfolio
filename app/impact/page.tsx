import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { OrganizationsLeadership } from "@/components/sections/OrganizationsLeadership";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Impact — Experience & Leadership | ALBARAA OS",
  description:
    "Applied professional experience and community leadership impact — product, robotics, and education roles, plus large-scale program and student-community leadership.",
};

export default function ImpactPage() {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">Impact — applied experience and leadership</h1>
      <ExperienceTimeline />
      <OrganizationsLeadership />
      <SiteFooter />
    </main>
  );
}
