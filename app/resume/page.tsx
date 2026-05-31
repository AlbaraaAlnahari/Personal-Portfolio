import type { Metadata } from "next";
import { ResumeInterface } from "@/components/sections/ResumeInterface";
import { InteriorBlueprintField } from "@/components/layout/InteriorBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Résumé — Albaraa Alnahari | ALBARAA OS",
  description:
    "Official career dossier of Albaraa Alnahari — verified credentials, capability signals, and direct access to the official résumé PDF.",
};

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
