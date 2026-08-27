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
  ],
  status: "stable",
  sourceRef: "PlayerBar_f240b0b5-16a2-451a-8651-c102b2137e7e",
});
