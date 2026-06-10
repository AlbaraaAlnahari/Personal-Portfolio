import { buildPageMetadata } from "@/lib/i18n/serverMeta";
import { ResumeInterface } from "@/components/sections/ResumeInterface";
import { InteriorBlueprintField } from "@/components/layout/InteriorBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function generateMetadata() {
  return buildPageMetadata("/resume");
}

export default function ResumePage() {
  return (
    <main className="min-h-screen">
      <InteriorBlueprintField />
      <div className="relative z-10">
        <h1 className="sr-only">Résumé — official career dossier</h1>
        <ResumeInterface />
        <SiteFooter />
      </div>
    </main>
  );
}
