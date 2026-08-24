import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "PlayerBar",
  slug: "player-bar",
  category: "laid-objects",
  description:
    "A 576px-wide floating glass card for excerpt playback: a StatusBadge header row with a tabular position readout, a two-line Source Serif excerpt, hairline prev / next rings around the filled play button, and an outlined \"explain\" action. Like the rest of the laid-objects family it floats on panel/60 over 40px blur with the dual-gradient sheen and glass hairline, never a cast shadow.",
  usage:
    "Give it a position string, an excerpt and an explain label; the StatusBadge and control cluster are built in.",
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
      description: "Position readout next to the badge, in tracked tabular figures.",
    },
    {
      name: "excerpt",
      type: "React.ReactNode",
      description: "Two-line serif excerpt clamped with a stable 2.9em min-height.",
    },
    {
      name: "explainLabel",
      type: "React.ReactNode",
      description: "Label for the outlined explain action on the control row.",
    },
    {
      name: "error",
      type: "React.ReactNode",
      description: "Optional destructive error line under the control row.",
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
  ],
  status: "stable",
  sourceRef: "PlayerBar_f240b0b5-16a2-451a-8651-c102b2137e7e",
});
