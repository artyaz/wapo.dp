import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "TransportBar",
  slug: "transport-bar",
  category: "laid-objects",
  description:
    "A full playback transport in one floating glass pill — 76px tall, panel/60 over 40px blur at 150% saturation, sized to its content (w-fit) so it can hover centered over media. Skip controls and the record toggle are 42px hairline rings around the 54px brand-primary play button; time is set in tabular code figures so digits never shift. The record toggle turns destructive while armed, and focus-within deepens the border to neutral-600.",
  usage:
    "Drop it over any media surface and feed it time strings and a speed label; the internals are fixed composition.",
  tags: ["glass", "floating", "transport", "playback", "laid-object"],
  props: [
    {
      name: "currentTime",
      type: "React.ReactNode",
      description: "Elapsed time, rendered in code figures with tabular numerals.",
    },
    {
      name: "totalTime",
      type: "React.ReactNode",
      description: "Total duration, rendered dimmer after the “ / ” separator.",
    },
    {
      name: "speed",
      type: "React.ReactNode",
      description: "Playback-rate label inside the bordered speed selector.",
    },
    {
      name: "recording",
      type: "boolean",
      default: "false",
      description: "Arms the record toggle with destructive ring and glyph color.",
    },
    {
      name: "skipBackDisabled",
      type: "boolean",
      default: "false",
      description: "Dims the skip-back control to 30% and drops its pointer cursor.",
    },
    {
      name: "skipForwardDisabled",
      type: "boolean",
      default: "false",
      description: "Dims the skip-forward control to 30% and drops its pointer cursor.",
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
  status: "stable",
  sourceRef: "TransportBar_4d642c3c-63eb-400a-89fb-2bb7a34ce32b",
});
