import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "TimelineRuler",
  slug: "timeline-ruler",
  category: "data-visualization",
  description:
    "A fully-authored time axis for timeline panes: 2880px wide at 24 px/s, spanning 00:00–02:00. Major ticks (12px, default ink) land every 10 seconds with mm:ss labels in tabular mono; minor ticks (6px, neutral-300) subdivide each 10-second span at 2-second intervals; eleven diamond ◆ markers flag event positions above the baseline. Every tick, label and marker is baked in at author time — nothing is computed at render — so the ruler is deterministic by construction and expects a horizontally panning viewport to reveal its full extent.",
  usage:
    "Mount it in the header lane of a timeline and pan it alongside the tracks it labels; width and tick geometry stay fixed.",
  tags: ["timeline", "ruler", "time-axis", "ticks", "monochrome", "static"],
  props: [
    {
      name: "className",
      type: "string",
      description:
        "Class overrides for the root; the ruler keeps its fixed w-[2880px] h-[34px] extent and authored tick geometry.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe TimelineRuler_6414b6c4-b304-46fb-bc2e-b2f57fc9d33e",
});
