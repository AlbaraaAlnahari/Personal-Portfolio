import { ExperimentalHeroV2 } from "@/components/experimental/ExperimentalHeroV2";

export const metadata = {
  title: "Hero V2 / Intelligence Reactor — Experimental",
  description:
    "Isolated prototype preview of the Albaraa Intelligence Reactor. Not production.",
  // Keep this internal prototype out of search engines / social previews.
  robots: { index: false, follow: false },
};

export default function ExperimentalHeroV2Page() {
  return <ExperimentalHeroV2 />;
}
