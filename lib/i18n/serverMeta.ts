import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LANG_STORAGE_KEY, normalizeLang } from "./config";
import { PAGE_META, type PageRoute } from "./pageMeta";

/**
 * Final site identity / SEO constants.
 *
 * SITE_URL is the canonical origin used by metadataBase, canonical/og URLs, and
 * JSON-LD. Set to the official domain albaraa-alnahari.sa. Change here in one
 * place if the origin ever moves.
 */
export const SITE_URL = "https://albaraa-alnahari.sa";
export const SITE_NAME = "Albaraa Alnahari Space";

/**
 * Final 1200×630 social/OG preview image — the brand portrait card (logo +
 * portrait + name + role), rendering the official albaraa-alnahari.sa domain.
 * Doubles as the structured-data Person image. Served from public/images/final/
 * and returns 200.
 */
export const OG_IMAGE = "/images/final/profile_pic_albaraa_alnahari_sa_clean.png";
/** Person/profile image used in structured data (same brand portrait card). */
export const PROFILE_IMAGE = "/images/final/profile_pic_albaraa_alnahari_sa_clean.png";

/**
 * Full localized metadata for a route — title, description, canonical, and the
 * Open Graph / Twitter blocks — derived from the persisted `albaraa-language`
 * cookie (Arabic when absent, matching the layout's <html lang/dir> seed). This
 * gives crawlers and link-preview unfurlers (WhatsApp, LinkedIn, X, Discord,
 * iMessage) the right localized title/description/image with no flash. Returns
 * metadata only; never affects visible page content.
 */
export async function buildPageMetadata(route: PageRoute): Promise<Metadata> {
  const store = await cookies();
  const lang = normalizeLang(store.get(LANG_STORAGE_KEY)?.value);
  const title = PAGE_META[route].title[lang];
  const description = PAGE_META[route].description[lang];
  const locale = lang === "ar" ? "ar_SA" : "en_US";

  return {
    title,
    description,
    alternates: { canonical: route },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale,
      alternateLocale: lang === "ar" ? ["en_US"] : ["ar_SA"],
      url: route,
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Albaraa Alnahari Space preview",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
