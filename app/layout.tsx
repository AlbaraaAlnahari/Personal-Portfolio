import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "@/styles/globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { RouteAwareAISystemStatus } from "@/components/environment/RouteAwareAISystemStatus";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { LANG_STORAGE_KEY, dirFor, normalizeLang } from "@/lib/i18n/config";
import {
  buildPageMetadata,
  SITE_URL,
  SITE_NAME,
  PROFILE_IMAGE,
} from "@/lib/i18n/serverMeta";
import { FaviconThemeSync } from "@/components/environment/FaviconThemeSync";
import { DocumentTitleSync } from "@/components/environment/DocumentTitleSync";

// Default/home metadata = the hybrid Arabic/English brand identity, localized
// from the `albaraa-language` cookie (Arabic when absent). Home is a client
// component (can't export metadata), so this layout default IS the Home result;
// interior routes provide their own localized title/description/OG via
// buildPageMetadata. Title, description, Open Graph, and Twitter all come from
// the shared localized source; the layout only adds site-wide fields.
export async function generateMetadata(): Promise<Metadata> {
  const base = await buildPageMetadata("/");
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    ...base,
    keywords: [
      "Albaraa Alnahari",
      "البراء النهاري",
      "software engineering",
      "AI products",
      "product thinking",
      "robotics",
      "portfolio",
    ],
    authors: [{ name: "Albaraa Alnahari", url: SITE_URL }],
    creator: "Albaraa Alnahari",
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e27" },
  ],
};

/**
 * Root Layout Component
 * Wraps entire application with global styles and structure
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Arabic-first: seed the document language/direction from the persisted
  // `albaraa-language` cookie (Arabic when absent) so the first server paint and
  // the first client render agree — no language flash, no hydration mismatch.
  const cookieStore = await cookies();
  const lang = normalizeLang(cookieStore.get(LANG_STORAGE_KEY)?.value);
  const dir = dirFor(lang);

  // Structured data (JSON-LD): Person + WebSite. Absolute URLs use SITE_URL
  // (the canonical origin, albaraa.sa). Helps search engines understand the
  // brand identity and improves rich-result eligibility.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Albaraa Alnahari",
        alternateName: [
          "البراء النهاري",
          "Albaraa Alnahari Space",
          "مساحة البراء النهاري",
        ],
        jobTitle: "Software Engineering Student",
        description:
          "Software engineering student building AI products and digital experiences shaped by product thinking and technical leadership.",
        image: `${SITE_URL}${PROFILE_IMAGE}`,
        url: SITE_URL,
        sameAs: [
          "https://www.linkedin.com/in/albaraa-alnahari",
          "https://github.com/AlbaraaAlnahari",
          "https://x.com/x_ff",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: ["مساحة البراء النهاري", "Albaraa Alnahari", "البراء النهاري"],
        url: SITE_URL,
        inLanguage: ["ar", "en"],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Theme-aware favicon. Rendered manually (not via the app/icon.svg
            convention) so it is the single icon link we fully control — the
            bootstrap below and FaviconThemeSync swap its href between the navy
            and warm variants. Navy is the SSR default (theme lives in
            localStorage, unknown server-side). apple-touch-icon and the web
            manifest still come from app/apple-icon.tsx and app/manifest.ts. */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon-navy.svg"
          suppressHydrationWarning
        />

        {/* Structured data — Person + WebSite (brand identity for search). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://cdn.vercel.com" />
      </head>
      <body className="bg-background-primary text-foreground-primary antialiased">
        {/* No-flash bootstrap — before first paint, applies the saved theme
            (localStorage 'albaraa-theme') to <html data-theme> AND points the
            favicon at the matching variant (/favicon-navy.svg | /favicon-warm.svg)
            so the tab icon is correct immediately, even before JS hydrates.
            Defaults to navy. FaviconThemeSync re-asserts this on theme toggle. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('albaraa-theme');t=(t==='warm'||t==='navy')?t:'navy';document.documentElement.dataset.theme=t;var ls=document.querySelectorAll('link[rel=icon]');for(var i=0;i<ls.length;i++){ls[i].setAttribute('type','image/svg+xml');ls[i].setAttribute('href','/favicon-'+t+'.svg');}}catch(e){document.documentElement.dataset.theme='navy';}})();",
          }}
        />
        {/* Language system — Arabic ⇄ English. The provider's initial language
            matches the server-rendered <html lang/dir> (seeded from the cookie
            above), so there is no flash or hydration mismatch. */}
        <LanguageProvider initialLang={lang}>
          {/* Tab favicon follows the active theme; tab title follows the active
              language. Both are headless (render null) and touch no visible UI. */}
          <FaviconThemeSync />
          <DocumentTitleSync />

          {/* Navigation */}
          <Navigation />

          {/* System Status Indicators — scoped to Home only */}
          <RouteAwareAISystemStatus />

          {/* Main content — top offset tracks the responsive --nav-height token so
              content always clears the fixed header (was a hardcoded 48px). */}
          <div className="relative min-h-screen pt-[var(--nav-height)]">
            {/* Background gradient (optional) */}
            <div className="fixed inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary opacity-50" />
              <div className="absolute inset-0 backdrop-blur-[100px] opacity-50" />
            </div>

            {/* Content — wrapped in the route-transition layer (premium page
                handoff: cyan scan veil + keyed opacity fade). */}
            <div className="relative z-10">
              <RouteTransition>{children}</RouteTransition>
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
