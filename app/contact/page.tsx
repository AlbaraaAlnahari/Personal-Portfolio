import type { Metadata } from "next";
import { ContactTerminal } from "@/components/sections/ContactTerminal";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Contact — Albaraa Alnahari | ALBARAA OS",
  description:
    "Get in touch with Albaraa Alnahari — email, LinkedIn, GitHub, and X. Open to opportunities and collaboration.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">Contact Albaraa Alnahari</h1>
      <ContactTerminal />
      <SiteFooter />
    </main>
  );
}
