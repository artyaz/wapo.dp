import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "StatTile",
  slug: "stat-tile",
  category: "surfaces",
  description:
    "A compact metric surface: an uppercase caption label, a large tabular-numeral value set in the code face, an optional delta chip tinted by sign, a quiet footer note, and a sparkline slot. Tiles are designed to sit in an even row so values align on a shared baseline. Keep the content numeric and quiet — the tile is the surface, not the story.",
  usage:
    "Compose label, value, delta (with sign for semantic coloring), footer, and an optional sparkline; arrange several tiles in a grid row.",
  tags: ["stat", "metric", "surface", "tile"],
  props: [
    {
      name: "label",
      type: "React.ReactNode",
      description: "Uppercase caption label rendered above the value.",
    },
    {
      name: "value",
      type: "React.ReactNode",
      description:
        "Primary metric, rendered at 28px in the code face with tabular numerals.",
    },
    {
      name: "delta",
      type: "React.ReactNode",
      description: "Change chip rendered beside the value on the same baseline.",
    },
    {
      name: "sign",
      type: '"positive" | "negative" | "neutral"',
      default: '"neutral"',
      description:
        "Semantic coloring for value and delta: positive tints green, negative red and dims the value, neutral stays gray.",
    },
    {
      name: "footer",
      type: "React.ReactNode",
      description: "Quiet caption rendered beneath the value row.",
    },
    {
      name: "sparkline",
      type: "React.ReactNode",
      description: "Optional inline chart rendered at the bottom of the tile.",
    },
    {
      name: "className",
      type: "string",
      description: "Class override merged onto the root element.",
    },
  ],
  status: "stable",
  sourceRef:
    "https://app.subframe.com/f0db550203e6/library?component=StatTile_190884bb-276f-4fe1-be6e-cef8a0dbe563",
});
