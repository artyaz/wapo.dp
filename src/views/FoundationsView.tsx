"use client";

import { PageShell } from "@/components/site/DocPage";
import { FoundationsIntroSection } from "./sections/foundations/FoundationsIntroSection";
import { ColorSection } from "./sections/foundations/ColorSection";
import { TypographySection } from "./sections/foundations/TypographySection";
import { GeometrySection } from "./sections/foundations/GeometrySection";

export function FoundationsView({ section }: { section?: string }) {
  // `section` currently only scrolls; all sections render on one calm page.
  void section;
  return (
    <PageShell
      eyebrow="Foundations"
      title="Foundations"
      description="The token layer everything is built from: a warm monochrome palette, three typefaces with strict roles, and the small set of radii, shadows and blur levels that keep every surface quiet."
      sections={[
        {
          id: "intro",
          title: "Design language",
          caption: "What the calm, monochrome doctrine means in practice.",
          el: <FoundationsIntroSection />,
        },
        {
          id: "color",
          title: "Color",
          caption:
            "One neutral ramp does the branding. Semantic color exists only where meaning demands it.",
          el: <ColorSection />,
        },
        {
          id: "typography",
          title: "Typography",
          caption:
            "Inter for interface, Source Serif 4 for reading, IBM Plex Mono for data and code.",
          el: <TypographySection />,
        },
        {
          id: "geometry",
          title: "Spacing, radius, elevation",
          caption:
            "A 4px base grid, two working radii, and shadows reserved for overlays.",
          el: <GeometrySection />,
        },
      ]}
    />
  );
}
