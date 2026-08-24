import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "MiniMap",
  slug: "mini-map",
  category: "laid-objects",
  description:
    "A pocket-sized document map rendered in liquid glass: a fixed 160×100 panel at the thin material level (28px blur, 135% saturation) with the canonical dual specular sheen and an optional 10px dot grid. ContentBlock footprints shadow the layout of the mapped surface, and a ViewportFrame with grab cursors marks the region currently in view. Float it beside editors, canvases and long documents wherever a spatial overview earns its place.",
  usage:
    "Compose ContentBlocks and one ViewportFrame as children, positioning them with percentage styles so the map mirrors the surface it summarizes.",
  tags: ["glass", "minimap", "viewport", "overview", "navigation"],
  props: [
    {
      name: "showGrid",
      type: "boolean",
      default: "false",
      description: "Reveals a faint 10px dot grid over the map panel.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "ContentBlocks and a ViewportFrame laid over the map.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Class overrides for the root panel; every sub-component accepts the same prop.",
    },
    {
      name: "ContentBlock.x",
      type: "React.ReactNode",
      description:
        "Geometry slot kept from the Subframe interface — not rendered; position blocks with style or className.",
    },
    {
      name: "ContentBlock.y",
      type: "React.ReactNode",
      description:
        "Geometry slot kept from the Subframe interface — not rendered; position blocks with style or className.",
    },
    {
      name: "ContentBlock.width",
      type: "React.ReactNode",
      description:
        "Geometry slot kept from the Subframe interface — not rendered; size blocks with style or className.",
    },
    {
      name: "ContentBlock.height",
      type: "React.ReactNode",
      description:
        "Geometry slot kept from the Subframe interface — not rendered; size blocks with style or className.",
    },
  ],
  subComponents: ["ContentBlock", "ViewportFrame"],
  status: "stable",
  sourceRef: "Subframe MiniMap_4eeb08ac-61ca-4e1a-98ae-d37772820ef9",
});
