import { buildPageMetadata } from "@/lib/i18n/serverMeta";
import { AboutModule } from "@/components/sections/AboutModule";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { InteriorBlueprintField } from "@/components/layout/InteriorBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function generateMetadata() {
  return buildPageMetadata("/about");
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <InteriorBlueprintField />
      <div className="relative z-10">
        <h1 className="sr-only">About Albaraa Alnahari — identity and capabilities</h1>
        <AboutModule />
        <SkillsMatrix />
        <SiteFooter />
      </div>
    </main>
  );
}
