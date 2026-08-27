import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "FloatingToolbar",
  slug: "floating-toolbar",
  category: "laid-objects",
  description:
    "A compact capsule of floating glass (panel/50, 28px blur, 135% saturation) that lays over content instead of sitting in the document flow. Actions are rounded-sm — members keep their own identity inside the capsule rather than inheriting the pill shape — and a hairline Rule separates action groups. Elevation comes from the dual-gradient sheen and glass hairline shadow, never a cast drop shadow.",
  usage:
    "Compose FloatingToolbar.Action children (optionally grouped around FloatingToolbar.Rule) as the toolbar's children.",
  tags: ["glass", "floating", "toolbar", "laid-object"],
  props: [
    { name: "children", type: "React.ReactNode", description: "Toolbar members — typically Actions and Rules." },
    {
      name: "Action.glyph",
      type: "React.ReactNode",
      description: "Leading glyph for the action (plain unicode text in Praxis demos).",
    },
    {
      name: "Action.label",
      type: "React.ReactNode",
      description: "Action label, set at 13px/600.",
    },
    {
      name: "Action.tone",
      type: '"default" | "destructive"',
      default: '"default"',
      description: "Destructive tone colors glyph, label and hover states with destructive-500.",
    },
    {
      name: "Action.disabled",
      type: "boolean",
      default: "false",
      description: "Dims the action to 40% opacity and removes its hover state.",
    },
    {
      name: "material",
      type: '"ultrathin" | "thin" | "regular" | "thick"',
      default: "inherited",
      description:
        "Material thickness. Picks the whole shipped constant set for the level — refraction level, maxDisplacement, bezel width, in-filter frost, saturation, specular opacity and stretch allowance.",
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
  subComponents: ["Action", "Rule"],
  status: "stable",
  sourceRef: "FloatingToolbar_dda8aa89-b150-4fea-850f-bf648f4f238c",
});
