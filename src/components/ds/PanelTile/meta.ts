import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "PanelTile",
  slug: "panel-tile",
  category: "surfaces",
  description:
    "A windowed panel: a bordered, panel-colored frame with a compact 36px title bar carrying overflow, expand, and close affordances, over a padded body region. The focused variant raises a brand-primary rail along the top edge to mark the active pane. Use it for inspector panes, tool windows, and dashboard cells that read as documents rather than dialogs.",
  usage:
    "Pass a short title (it ellipsizes when cramped) and stack label/value rows or any content in the body; switch to the focused variant to indicate selection or activity. In RTL contexts, isolate inherently LTR technical values and identifiers (deploy ids like #4217, sizes like 18.2 GB) with dir=\"ltr\" or <bdi> so punctuation and units don't reorder — see the demo's Row pattern.",
  tags: ["panel", "window", "surface", "tile"],
  props: [
    {
      name: "variant",
      type: '"default" | "focused"',
      default: '"default"',
      description:
        "focused shows a 2px brand-primary rail along the top edge of the tile.",
    },
    {
      name: "title",
      type: "React.ReactNode",
      description:
        "Title-bar label; single line, ellipsized when it overflows the bar.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Panel body, padded 12px and clipped by the rounded frame.",
    },
    {
      name: "className",
      type: "string",
      description: "Class override merged onto the root element.",
    },
  ],
  status: "stable",
  sourceRef:
    "https://app.subframe.com/f0db550203e6/library?component=PanelTile_b6010ce9-9740-49ee-8e8b-51f01b52e86e",
});
