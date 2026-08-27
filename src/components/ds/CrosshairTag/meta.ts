import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "CrosshairTag",
  slug: "crosshair-tag",
  category: "data-visualization",
  description:
    "A self-contained chart inspection frame: a crisp 260×150 panel with hairline gridlines, a quiet alternating bar series, a full-height crosshair rule and a value tag anchored above it. Doctrine: don't put glass on the CrosshairTag chart frame or any in-flow/crisp surface — glass is for floating overlays only — so the frame stays plain bg-panel with a hairline border while the tag alone floats on 56px blur at the thickest material level, with its rotated pointer diamond tying it to the crosshair. Use it wherever a chart needs a point read-out (a price, latency or count) without building tooltip machinery.",
  usage:
    "Pass the reading through value, a unit or delta through glyph, and a timestamp; the frame, crosshair and tag compose themselves. The bar series and the crosshair anchor are fixed illustrative geometry — the default 62% anchor lands on the tall bar of the 260px frame — so pin the read-out to a real data point with crosshairPosition (a CSS left value: number = px, e.g. 161, or a string like '62%'), which moves the guideline and the tag together.",
  tags: ["chart", "crosshair", "glass", "overlay", "readout"],
  props: [
    {
      name: "value",
      type: "React.ReactNode",
      description:
        "Primary reading — bold mono with tabular numerals, e.g. 142.85.",
    },
    {
      name: "glyph",
      type: "React.ReactNode",
      description:
        "Small qualifier rendered beside the value (unit, currency or delta).",
    },
    {
      name: "timestamp",
      type: "React.ReactNode",
      description:
        "Second line under the value, mono and muted — kept on a single line (the tag grows to fit, never wraps mid-date).",
    },
    {
      name: "crosshairPosition",
      type: "string | number",
      description:
        "Horizontal anchor shared by the crosshair guideline and the glass value tag — any CSS left value (number = px, string used as-is, e.g. '62%' or '161px'). Defaults to the built-in 62% anchor, which sits on the tall bar of the fixed illustrative series in the 260px frame; pass a bar-center position to snap the read-out to a specific data bar.",
    },
    {
      name: "className",
      type: "string",
      description: "Class overrides for the root chart frame.",
    },
    {
      name: "material",
      type: '"ultrathin" | "thin" | "regular" | "thick"',
      default: '"thick"',
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
      default: "false",
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
  sourceRef: "Subframe CrosshairTag_d9e17d36-d397-4e67-9485-67b1b6a45090",
});
