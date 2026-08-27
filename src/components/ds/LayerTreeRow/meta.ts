import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "LayerTreeRow",
  slug: "layer-tree-row",
  category: "code-editor",
  description:
    "A single row of a design-tool layer tree (the Figma-style layers panel). Depth is drawn as rail columns with soft right borders, the node type is a 12px glyph — square outline for frames, circle for groups, dashed square for components, a tiny T for text — and the caret collapses for leaf rows. Visibility (○ / ●) and lock (🔒) indicators live on the right edge and surface on row hover or whenever locked, visible or selected is set.",
  usage:
    "Stack rows inside a panel to mirror a canvas's layer hierarchy; set depth, nodeType and leaf per layer, and let selected / visible / locked drive the row state.",
  tags: ["layers", "tree", "design tool", "panel", "row"],
  props: [
    {
      name: "name",
      type: "React.ReactNode",
      description:
        "Layer label, 13px/500 body type with ellipsis overflow.",
    },
    {
      name: "nodeType",
      type: '"frame" | "group" | "component" | "text"',
      default: '"frame"',
      description:
        "Glyph shape: rounded square (frame), circle (group), dashed square (component) or square with a 7px T (text).",
    },
    {
      name: "depth",
      type: '"0" | "1" | "2" | "3" | "4"',
      default: '"0"',
      description:
        "Indentation level; depth 0 rows carry an 8px start inset, each deeper level adds a rail column with a neutral-300/30 right border.",
    },
    {
      name: "expanded",
      type: "boolean",
      default: "false",
      description: "Shows the ▾ caret instead of ▸.",
    },
    {
      name: "selected",
      type: "boolean",
      default: "false",
      description:
        "Selected state: brand-primary left rail over a neutral-200 background that resists hover.",
    },
    {
      name: "visible",
      type: "boolean",
      default: "false",
      description:
        "Visibility indicator: true shows the filled ● dot, false the hollow ○. Also keeps the indicator column mounted when true.",
    },
    {
      name: "locked",
      type: "boolean",
      default: "false",
      description:
        "Shows the 🔒 lock indicator and keeps the indicator column mounted.",
    },
    {
      name: "leaf",
      type: "boolean",
      default: "false",
      description: "Hides the caret entirely for childless layers.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes merged onto the row root.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe LayerTreeRow_34f92f71-31ad-4af7-ae1a-208227925d6b",
});
