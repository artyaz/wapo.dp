import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "GlassDisplacement",
  slug: "glass-displacement",
  category: "glass-primitives",
  description:
    "The Chromium-tier liquid glass surface — a rounded shell whose backdrop edge bends through an SVG feDisplacementMap filter with per-channel chromatic aberration. This rebuild rides the GlassSurface runtime: the displacement map is generated at runtime for the element's exact size and radius and registered with the page-level filter host, so no filter defs are mounted by hand. On non-Chromium engines the same component degrades to the universal base material — the API and semantics never change.",
  usage:
    "Wrap content and size the shell from outside; intensity scales the displacement and radius picks the corner vocabulary.",
  tags: ["glass", "floating", "chromium", "displacement"],
  props: [
    {
      name: "radius",
      type: '"sm" | "md" | "lg" | "pill"',
      default: '"lg"',
      description:
        "Corner radius vocabulary (sm/md = 3px, lg = 8px, pill = capsule). Also drives the runtime displacement-map geometry.",
    },
    {
      name: "intensity",
      type: '"subtle" | "medium" | "strong"',
      default: '"medium"',
      description:
        "Displacement strength fork — scales the base B-channel map scale (5 / 12 / 20) on the Chromium tier.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Content rendered above the glass layers in a z-10 wrapper.",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the outer sizing shell (height/width go here).",
    },
    {
      name: "material",
      type: '"ultrathin" | "thin" | "regular" | "thick"',
      default: '"regular"',
      description:
        "Material thickness. Picks the whole shipped constant set for the level — refraction level, maxDisplacement, bezel width, in-filter frost, saturation, specular opacity and stretch allowance.",
    },
    {
      name: "stretchable",
      type: "boolean",
      default: "true",
      description:
        "Elastic pull. Grab and drag: the surface stretches one-sided toward the pointer at any angle, capped by the material's budget, and springs back on release.",
    },
    {
      name: "bounce",
      type: "number",
      default: "material default",
      description:
        "Release overshoot, 0 (dead stop) to 0.9 (very jelly). Defaults to the material's own mass — thicker glass wobbles less.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe GlassDisplacement_d49325d3-448a-46a4-99dc-15884e83bcf0",
});
