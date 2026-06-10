"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { titleForPath } from "@/lib/i18n/pageMeta";

/**
 * DocumentTitleSync — keeps the browser-tab title in step with the active
 * LANGUAGE (Arabic ⇄ English). SSR already renders the correct localized title
 * from the language cookie (lib/i18n/serverMeta.ts), so on first paint /
 * hard refresh this matches and nothing flashes. Its job is the in-session
 * language TOGGLE, which changes React state without a navigation: when `lang`
 * (or the route) changes, set document.title to the localized title for the
 * current route. Routes we do not manage return null and are left untouched.
 * No visible content is affected.
 */
export function DocumentTitleSync() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  useEffect(() => {
    const title = titleForPath(pathname, lang);
    if (title && document.title !== title) {
      document.title = title;
    }
  }, [pathname, lang]);

  return null;
}
