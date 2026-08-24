import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "GlassRefraction",
  slug: "glass-refraction",
  category: "glass-primitives",
  description:
    "A material specimen: the fixed h-[200px] demo stage with warm-gray radials, a glass lens on top, and a live caption reading `material <level> · <strategy>` in IBM Plex Mono. The rendered implementation tier ALWAYS comes from the runtime negotiation (Chromium → svg-displacement, Safari/Firefox → webgl-refraction, otherwise the backdrop-filter base) — the `strategy` prop is accepted purely for API parity with the Subframe source and is ignored. GlassSurface carries the material ramp, rim, dual sheen and specular shadow on every tier.",
  usage:
    "Use it to inspect and verify material levels; build real interfaces on GlassSurface directly.",
  tags: ["glass", "specimen", "materials", "refraction"],
  props: [
    {
      name: "strategy",
      type: '"svg-displacement" | "webgl-refraction" | "backdrop-filter"',
      description:
        "Accepted for API parity only — ignored. The rendered tier is always the runtime-negotiated strategy from the glass store.",
    },
    {
      name: "material",
      type: '"ultrathin" | "thin" | "regular" | "thick"',
      default: '"regular"',
      description:
        "Token ramp level (blur/saturate/tint/strength); inherits from the nearest GlassMaterialProvider when unset.",
    },
    {
      name: "shape",
      type: '"capsule" | "card" | "free"',
      default: '"capsule"',
      description:
        "Radius vocabulary applied to the lens — capsule (9999px), card (16px) or free (0px).",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Content rendered inside the glass lens above all layers.",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the specimen root (layout overrides go here).",
    },
  ],
  status: "stable",
  sourceRef: "Subframe GlassRefraction_8d1ff3b2-9061-40ba-9cf8-614f11abfc2a",
});
