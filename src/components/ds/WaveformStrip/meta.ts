import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "WaveformStrip",
  slug: "waveform-strip",
  category: "data-visualization",
  description:
    "A deterministic waveform read-out: sixty fixed bars spread along a flex row, mirrored around a center hairline and tinted through the neutral ramp so loudness reads as density rather than color. The sample array is baked in at author time — no runtime sampling, no state, no motion — which keeps every render identical. The strip stretches to fill its container (h-full w-full), so give it a sized parent such as a track row, clip card or timeline lane.",
  usage:
    "Drop it into any sized container and label it with mono time codes; it composes cleanly into media and timeline rows.",
  tags: ["waveform", "audio", "timeline", "monochrome", "static"],
  props: [
    {
      name: "className",
      type: "string",
      description:
        "Class overrides for the root; the strip is h-full w-full by default, so size it from the parent or via className.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe WaveformStrip_64343a53-905e-4486-9714-302d2ec93132",
});
