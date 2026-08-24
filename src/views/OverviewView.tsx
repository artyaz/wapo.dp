"use client";

import { PageShell } from "@/components/site/DocPage";
import { HeroSection } from "./sections/overview/HeroSection";
import { PrinciplesSection } from "./sections/overview/PrinciplesSection";
import { DoctrineSection } from "./sections/overview/DoctrineSection";
import { MaterialTeaserSection } from "./sections/overview/MaterialTeaserSection";
import { ComponentsTeaserSection } from "./sections/overview/ComponentsTeaserSection";

export function OverviewView() {
  return (
    <div>
      <HeroSection />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <PageShell
          eyebrow="Overview"
          title="A calm system for serious work"
          description="Praxis is a monochrome design system built around one idea: the content is the canvas, and the interface should never compete with it. Everything below introduces the system's principles, its liquid glass materials, and the component library built on them."
          sections={[
            {
              id: "principles",
              title: "Principles",
              caption:
                "Five commitments that decide every token, component and pattern in the system.",
              el: <PrinciplesSection />,
            },
            {
              id: "materials",
              title: "Liquid glass",
              caption:
                "A material hierarchy that separates surfaces from content optically — by bending light, not by casting shadows.",
              el: <MaterialTeaserSection />,
            },
            {
              id: "components",
              title: "Components",
              caption:
                "Fifty components across ten families, from glass primitives to editors and charts.",
              el: <ComponentsTeaserSection />,
            },
            {
              id: "doctrine",
              title: "Doctrine",
              caption:
                "The written law of the system — what is allowed, what is forbidden, and why.",
              el: <DoctrineSection />,
            },
          ]}
        />
      </div>
    </div>
  );
}
