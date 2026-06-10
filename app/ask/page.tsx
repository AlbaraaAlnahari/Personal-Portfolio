import { buildPageMetadata } from "@/lib/i18n/serverMeta";
import { AskAlbaraaClient } from "@/components/ask/AskAlbaraaClient";
import { InteriorBlueprintField } from "@/components/layout/InteriorBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function generateMetadata() {
  return buildPageMetadata("/ask");
}

export default function AskPage() {
  return (
    <main className="min-h-screen">
      <InteriorBlueprintField />
      <div className="relative z-10">
        <h1 className="sr-only">Ask Albaraa AI — personal intelligence interface</h1>
        <AskAlbaraaClient />
        <SiteFooter />
      </div>
    </main>
  );
}
