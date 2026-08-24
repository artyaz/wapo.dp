"use client";

import { PageShell } from "@/components/site/DocPage";
import { HierarchySection } from "./sections/materials/HierarchySection";
import { StrategySection } from "./sections/materials/StrategySection";
import { SpecularSection } from "./sections/materials/SpecularSection";
import { DisplacementSection } from "./sections/materials/DisplacementSection";
import { ConstraintsSection } from "./sections/materials/ConstraintsSection";
import { IntegrationSection } from "./sections/materials/IntegrationSection";

export function MaterialsView({ section }: { section?: string }) {
  void section;
  return (
    <PageShell
      eyebrow="Materials"
      title="Liquid Glass"
      description="The material system separates floating surfaces from the content beneath them optically — refraction, specular light and vibrancy instead of fills and drop shadows. Four thickness levels, three rendering strategies, one semantic contract."
      sections={[
        {
          id: "hierarchy",
          title: "Material hierarchy",
          caption:
            "UltraThin, Thin, Regular and Thick — an arithmetic ramp anchored on Regular, Apple HIG's material levels made concrete.",
          el: <HierarchySection />,
        },
        {
          id: "strategy",
          title: "Rendering strategies",
          caption:
            "SVG displacement on Chromium, WebGL refraction on Safari and Firefox, plain backdrop-filter as the universal base. Same semantics on every tier.",
          el: <StrategySection />,
        },
        {
          id: "specular",
          title: "Specular construction",
          caption:
            "The dual-gradient sheen, the 20% rim, and the shadow tokens that draw light instead of casting shade.",
          el: <SpecularSection />,
        },
        {
          id: "displacement",
          title: "Displacement maps",
          caption:
            "How the lens is encoded in an image, generated at runtime for every surface geometry.",
          el: <DisplacementSection />,
        },
        {
          id: "constraints",
          title: "Constraints & accessibility",
          caption:
            "Operational limits, WCAG results per material level, and the reduced-transparency escape hatch.",
          el: <ConstraintsSection />,
        },
        {
          id: "integration",
          title: "Integration",
          caption:
            "GlassSurface and the provider contract, the corrected liquidGL API facts, and the degradation philosophy.",
          el: <IntegrationSection />,
        },
      ]}
    />
  );
}
