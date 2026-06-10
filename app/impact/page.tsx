import { buildPageMetadata } from "@/lib/i18n/serverMeta";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { OrganizationsLeadership } from "@/components/sections/OrganizationsLeadership";
import { OfficialPresence } from "@/components/sections/OfficialPresence";
import { InteriorBlueprintField } from "@/components/layout/InteriorBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function generateMetadata() {
  return buildPageMetadata("/impact");
}

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
