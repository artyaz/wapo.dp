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
  ],
  status: "stable",
  sourceRef: "TransportBar_4d642c3c-63eb-400a-89fb-2bb7a34ce32b",
});
