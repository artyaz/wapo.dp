import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "MediaClip",
  slug: "media-clip",
  category: "media",
  description:
    "A timeline clip block that stretches to its lane and shows its kind — waveform for audio, filmstrip blocks for video, a ¶ + caption line for text. Audio/video clips keep the label and duration chips in a dedicated header row above the media body, so chip text never sits on the waveform or filmstrip and the label only truncates once the row is genuinely full; text clips inline ¶, label, caption and duration in one centered caption row, so no text ever stacks on text. The selected state adds a 2px brand border, an opaque background and col-resize rails along both edges; the locked state dims the clip to 60% under a 45° hatch. Drive selection from the editor state, not from inside the clip.",
  usage:
    "Position it into a timeline lane (it is h-full with a 140px floor) and drive kind/state from the sequence model.",
  tags: ["media", "timeline", "clip", "editor", "waveform"],
  props: [
    {
      name: "kind",
      type: '"audio" | "video" | "text"',
      default: '"audio"',
      description:
        "Clip body: waveform for audio, filmstrip blocks for video, a ¶ + caption line for text.",
    },
    {
      name: "state",
      type: '"default" | "selected" | "locked"',
      default: '"default"',
      description:
        "Interaction state — selected adds the brand border and resize rails, locked dims and hatches the clip.",
    },
    {
      name: "label",
      type: "React.ReactNode",
      description:
        "Clip name chip in the header row above the media body (rendered inline in the caption row for text clips); shares the row with the duration chip and truncates only when the row is full.",
    },
    {
      name: "duration",
      type: "React.ReactNode",
      description:
        "Tabular mono duration chip at the end of the header row (inline at the end of the caption row for text clips).",
    },
    {
      name: "caption",
      type: "React.ReactNode",
      description: "Caption line shown inside text-kind clips.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Class overrides for the root (h-full min-w-[140px]; position it from the lane).",
    },
  ],
  status: "stable",
  sourceRef: "MediaClip_7e3041e1-4731-435b-86a1-4e4e62007b5f",
});
