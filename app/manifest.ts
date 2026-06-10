import type { MetadataRoute } from "next";

// Web app manifest (replaces the previously hard-linked, non-existent
// /manifest.json). Served by Next at /manifest.webmanifest and auto-linked
// from <head>. Colors track the navy app surface.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALBARAA — AI Builder & Software Engineering Portfolio",
    short_name: "ALBARAA",
    description:
      "AI products, automation, and modern web experiences by Albaraa Alnahari.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e27",
    theme_color: "#0a0e27",
    icons: [
      {
        src: "/favicon-navy.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
