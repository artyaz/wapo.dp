import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "CanvasNode",
  slug: "canvas-node",
  category: "code-editor",
  description:
    "A node-editor card: a fixed 220px panel with a grab-dots handle, title and StatusBadge in the header, body and footer slots, and input/output port dots centered on the left and right edges (hover turns a port brand-primary). Selected, danger and disabled variants restyle the border and surface, and the header badge tone tracks the node's statusTone.",
  usage:
    "Place on a canvas area and wire ports by aligning node centers — the ports sit at the vertical midpoint of each edge, so an edge drawn along the shared center line lands on both.",
  tags: ["node editor", "canvas", "graph", "ports", "card"],
  props: [
    {
      name: "variant",
      type: '"default" | "selected" | "danger" | "disabled"',
      default: '"default"',
      description:
        "Surface state: selected thickens the border to brand-primary with a 3% tint, danger outlines in destructive-500, disabled switches the border to a dashed neutral-300 hairline and steps the title down to neutral-600 while body/footer content keeps full contrast.",
    },
    {
      name: "title",
      type: "React.ReactNode",
      description:
        "Header label, 13px/600 body type with ellipsis overflow next to the grab handle.",
    },
    {
      name: "statusTone",
      type: '"live" | "idle" | "success" | "warning"',
      default: '"idle"',
      description:
        "Tone forwarded to the header StatusBadge (rendered without a label — dot only).",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Body content, laid out as a padded column between header and footer.",
    },
    {
      name: "footer",
      type: "React.ReactNode",
      description:
        "Footer content, right-aligned over a top hairline (metadata or actions).",
    },
    {
      name: "className",
      type: "string",
      description:
        "Extra classes merged onto the root; the 220px width can be overridden here.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe CanvasNode_9eb4b63f-0226-47e0-9909-db57ce2af67d",
});
