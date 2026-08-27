import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "GlassChip",
  slug: "glass-chip",
  category: "glass-primitives",
  description:
    "The canonical laid-object capsule: a pill of regular-grade panel glass (bg-panel/60 · backdrop-blur-2xl · backdrop-saturate-150) finished with a hairline rim, specular inset shadows and dual gradient sheens. Actions and Rules compose inside it to build floating toolbars, transports and command strips. It is the reference implementation of the glass material on a capsule silhouette, and most laid objects in the system derive their surface treatment from it.",
  usage:
    "Compose GlassChip.Action items separated by GlassChip.Rule dividers as children of the root capsule.",
  tags: ["glass", "capsule", "laid-object", "floating", "toolbar"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Content laid out inside the capsule — typically Actions and Rules.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Classes merged onto the root capsule (positioning, width, material overrides).",
    },
    {
      name: "Action.glyph",
      type: "React.ReactNode",
      description:
        "Leading glyph rendered at 13px/400 — a text character or keycap such as ⌘, ⇧ or ⌫.",
    },
    {
      name: "Action.label",
      type: "React.ReactNode",
      description: "Label rendered at 13px/600 next to the glyph.",
    },
    {
      name: "Action.tone",
      type: '"default" | "destructive"',
      default: '"default"',
      description:
        "Destructive tone paints the action's text and hover/active washes red.",
    },
    {
      name: "Action.disabled",
      type: "boolean",
      default: "false",
      description:
        "Dims the action to 40% opacity and disables its pointer events and hover wash.",
    },
    {
      name: "Rule.className",
      type: "string",
      description: "Classes merged onto the 1px vertical divider.",
    },
    {
      name: "material",
      type: '"ultrathin" | "thin" | "regular" | "thick"',
      default: '"regular"',
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
  ],
  subComponents: ["Action", "Rule"],
  status: "stable",
  sourceRef: "Subframe GlassChip_35d1ebd9-91b2-4ea2-a4d5-eecf92af0945",
});
