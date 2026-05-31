import type { Metadata } from "next";
import { ContactDirectLine } from "@/components/sections/ContactDirectLine";
import { InteriorBlueprintField } from "@/components/layout/InteriorBlueprintField";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Contact — Albaraa Alnahari | ALBARAA OS",
  description:
    "Get in touch with Albaraa Alnahari — email, LinkedIn, GitHub, and X. Open to opportunities and collaboration.",
};

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
