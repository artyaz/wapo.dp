import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "CrosshairTag",
  slug: "crosshair-tag",
  category: "data-visualization",
  description:
    "A self-contained chart inspection frame: a crisp 260×150 panel with hairline gridlines, a quiet alternating bar series, a full-height crosshair rule and a value tag anchored above it. Doctrine: don't put glass on the CrosshairTag chart frame or any in-flow/crisp surface — glass is for floating overlays only — so the frame stays plain bg-panel with a hairline border while the tag alone floats on 56px blur at the thickest material level, with its rotated pointer diamond tying it to the crosshair. Use it wherever a chart needs a point read-out (a price, latency or count) without building tooltip machinery.",
  usage:
    "Pass the reading through value, a unit or delta through glyph, and a timestamp; the frame, crosshair and tag compose themselves.",
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
      description: "Second line under the value, mono and muted.",
    },
    {
      name: "className",
      type: "string",
      description: "Class overrides for the root chart frame.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe CrosshairTag_d9e17d36-d397-4e67-9485-67b1b6a45090",
});
