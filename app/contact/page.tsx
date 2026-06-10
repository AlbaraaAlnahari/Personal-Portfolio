import { buildPageMetadata } from "@/lib/i18n/serverMeta";
import { ContactDirectLine } from "@/components/sections/ContactDirectLine";
import { InteriorBlueprintField } from "@/components/layout/InteriorBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function generateMetadata() {
  return buildPageMetadata("/contact");
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <InteriorBlueprintField />
      <div className="relative z-10">
        <h1 className="sr-only">Contact Albaraa Alnahari — Direct Line</h1>
        <ContactDirectLine />
        <SiteFooter />
      </div>
    </main>
  );
}
