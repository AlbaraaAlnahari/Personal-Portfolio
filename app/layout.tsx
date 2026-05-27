import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { RouteAwareAISystemStatus } from "@/components/environment/RouteAwareAISystemStatus";

export const metadata: Metadata = {
  title: "Albaraa OS — AI Software Lab",
  description:
    "Albaraa OS is a futuristic AI software lab portfolio. Premium, cinematic, and powered by intelligent design.",
  keywords: [
    "portfolio",
    "AI",
    "software engineering",
    "full-stack",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Albaraa Alnahari", url: "https://albaraa.dev" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://albaraa.dev",
    title: "Albaraa OS — AI Software Lab",
    description:
      "A futuristic AI software lab portfolio experience",
    siteName: "Albaraa OS",
    images: [
      {
        url: "https://albaraa.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Albaraa OS",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albaraa OS — AI Software Lab",
    description:
      "A futuristic AI software lab portfolio experience",
    creator: "@albaraa",
    images: ["https://albaraa.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  verification: {
    google: "",
    yandex: "",
  },
};

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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

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
        {/* Navigation */}
        <Navigation />

        {/* System Status Indicators — scoped to Home only */}
        <RouteAwareAISystemStatus />

        {/* Main content */}
        <div className="relative min-h-screen pt-12">
          {/* Background gradient (optional) */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary opacity-50" />
            <div className="absolute inset-0 backdrop-blur-[100px] opacity-50" />
          </div>

          {/* Content */}
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
