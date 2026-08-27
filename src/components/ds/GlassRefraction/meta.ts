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
    {
      name: "intensity",
      type: '"subtle" | "medium" | "strong"',
      default: '"medium"',
      description:
        "Refraction fork — multiplies the level's refraction (0.55 / 1.0 / 1.6) and so the feDisplacementMap scale.",
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
    {
      name: "refraction",
      type: "Partial<RefractionParams>",
      default: "per material level",
      description:
        "Liquid Glass optics on the WebGL tier — thickness, bezel, ior, blur, specular, tint, shadow, the reference implementation's own control set. Retargets the live shader without rebuilding the GL context. Needs a backdrop image to be visible.",
    },
    {
      name: "frost",
      type: "{ blur?: number; saturate?: number }",
      default: "per material level (2..10px, 1.5)",
      description:
        "Universal base-tier optics. blur is the RIM radius of the progressive frost — three stacked backdrop-filter bands at 0.1x / 0.4x / 1x of it, so the centre stays legible while the edge goes soft — and saturate lands on the rim band only. Renders when neither the Chromium displacement tier nor a WebGL backdrop image is available, and is the only optical knob that bites on every tier's fallback.",
    },
    {
      name: "backdrop",
      type: "BackdropSpec",
      default: "auto-discovered",
      description:
        "{ imageUrl, element, base } — the image the WebGL shader refracts and the element whose box acts as its viewport. Left empty, the engine walks up to the nearest ancestor with a background-image; CSS gradients are not images and are not discoverable.",
    },
    {
      name: "finish",
      type: "GlassFinish",
      default: "sheen .5 · light 160 · rim .5 · tint per level",
      description:
        "The lighting on top of the material, on every tier — paint, not a filter, so no texture or engine negotiation is involved. sheen: dual specular gradient strength. lightAngle: rotates both gradients so the highlight can sit on any corner. rim: the crisp 1px highlights that read as corner lighting. tint: white overlay alpha. inner: the inset vignette. shadow: the outer drop shadow.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe GlassRefraction_8d1ff3b2-9061-40ba-9cf8-614f11abfc2a",
});
