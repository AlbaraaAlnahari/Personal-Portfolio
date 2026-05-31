import type { Metadata } from "next";
import { AskAlbaraaClient } from "@/components/ask/AskAlbaraaClient";
import { InteriorBlueprintField } from "@/components/layout/InteriorBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Ask Albaraa AI — Personal Intelligence | ALBARAA OS",
  description:
    "Ask Albaraa AI — an interactive personal archive assistant. Explore Albaraa Alnahari's projects, skills, experience, leadership, and contact channels, answered from verified résumé and portfolio data.",
};

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
