import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "PlayerBar",
  slug: "player-bar",
  category: "laid-objects",
  description:
    "A 576px-wide floating glass card for excerpt playback: a StatusBadge header row with a tabular position readout, a two-line Source Serif excerpt, hairline prev / next rings around the filled play button, and an outlined \"explain\" action. Like the rest of the laid-objects family it floats on panel/60 over 40px blur with the dual-gradient sheen and glass hairline, never a cast shadow.",
  usage:
    "Give it a position string, an excerpt and an explain label; the StatusBadge and control cluster are built in. The position readout is always laid out LTR (dir=\"ltr\") so timecodes like 03:12 / 18:40 keep their order on RTL pages, and the prev/play/next rings keep the standard media order (dir=\"ltr\" cluster — playback timecodes run left-to-right, so the transport does not mirror); excerpt and error text slots use dir=\"auto\" bidi isolation, so English prose reads LTR and Arabic/Hebrew prose reads RTL regardless of page direction. The card is fluid (w-full up to max-width) and the control row wraps: its single-row minimum is ~313px (three rings 42/54/42 + gap + explain pill + 18px card padding); below that the explain pill wraps to a second row instead of clipping.",
  tags: ["glass", "floating", "player", "playback", "laid-object"],
  props: [
    {
      name: "tone",
      type: '"live" | "idle"',
      default: '"live"',
      description:
        "Declared playback tone (the badge currently renders the live state internally).",
    },
    {
      name: "position",
      type: "React.ReactNode",
      description:
        "Position readout next to the badge, in tracked tabular figures. Rendered with dir=\"ltr\" isolation so elapsed/total timecodes keep their visual order in RTL layouts.",
    },
    {
      name: "excerpt",
      type: "React.ReactNode",
      description:
        "Two-line serif excerpt clamped with a stable 2.9em min-height. Isolated with dir=\"auto\" so its paragraph direction follows the content's first strong character (LTR for English, RTL for Arabic).",
    },
    {
      name: "explainLabel",
      type: "React.ReactNode",
      description: "Label for the outlined explain action on the control row.",
    },
    {
      name: "error",
      type: "React.ReactNode",
      description:
        "Optional destructive error line under the control row. Isolated with dir=\"auto\" so punctuation stays on the correct side for LTR/RTL content.",
    },
    {
      name: "previousDisabled",
      type: "boolean",
      default: "false",
      description: "Dims the previous-track ring to 30% and drops its pointer cursor.",
    },
    {
      name: "nextDisabled",
      type: "boolean",
      default: "false",
      description: "Dims the next-track ring to 30% and drops its pointer cursor.",
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
        "The ONE optical knob that bites on EVERY tier. blur is the RIM radius of the progressive frost — sharp core, blur rising into the edge: masked backdrop-filter bands on the base tier, a masked rim blur inside the SVG filter chain, the shader’s progressive blur radius on WebGL. saturate lands on the rim band only.",
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
      default: "sheen .5 · light 160 · rim .5 · border .5 · tint per level",
      description:
        "The lighting on top of the material, on every tier — paint, not a filter, so no texture or engine negotiation is involved. sheen: dual specular gradient strength. lightAngle: rotates both gradients so the highlight can sit on any corner. rim: the crisp 1px highlights that read as corner lighting. border: the hairline 1px ring, white over near-black so it reads on light and dark. tint: white overlay alpha. inner: the inset vignette. shadow: the outer drop shadow, painted on the surface root so it is never clipped.",
    },
  ],
  status: "stable",
  sourceRef: "PlayerBar_f240b0b5-16a2-451a-8651-c102b2137e7e",
});
