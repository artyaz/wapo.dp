import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "MiniMap",
  slug: "mini-map",
  category: "laid-objects",
  description:
    "A pocket-sized document map rendered in liquid glass: a fixed 160×100 panel at the thin material level (28px blur, 135% saturation) with the canonical dual specular sheen and an optional 10px dot grid. ContentBlock footprints shadow the layout of the mapped surface, and a ViewportFrame with grab cursors marks the region currently in view. Float it beside editors, canvases and long documents wherever a spatial overview earns its place.",
  usage:
    "Compose ContentBlocks and one ViewportFrame as children, positioning them with percentage styles so the map mirrors the surface it summarizes.",
  tags: ["glass", "minimap", "viewport", "overview", "navigation"],
  props: [
    {
      name: "showGrid",
      type: "boolean",
      default: "false",
      description: "Reveals a faint 10px dot grid over the map panel.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "ContentBlocks and a ViewportFrame laid over the map.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Class overrides for the root panel; every sub-component accepts the same prop.",
    },
    {
      name: "ContentBlock.x",
      type: "React.ReactNode",
      description:
        "Geometry slot kept from the Subframe interface — not rendered; position blocks with style or className.",
    },
    {
      name: "ContentBlock.y",
      type: "React.ReactNode",
      description:
        "Geometry slot kept from the Subframe interface — not rendered; position blocks with style or className.",
    },
    {
      name: "ContentBlock.width",
      type: "React.ReactNode",
      description:
        "Geometry slot kept from the Subframe interface — not rendered; size blocks with style or className.",
    },
    {
      name: "ContentBlock.height",
      type: "React.ReactNode",
      description:
        "Geometry slot kept from the Subframe interface — not rendered; size blocks with style or className.",
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
  ],
  subComponents: ["ContentBlock", "ViewportFrame"],
  status: "stable",
  sourceRef: "Subframe MiniMap_4eeb08ac-61ca-4e1a-98ae-d37772820ef9",
});
