import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "Drawer",
  slug: "drawer",
  category: "surfaces",
  description:
    "A side-sheet surface for secondary content that belongs to the page without interrupting it. The root renders a 40% black scrim anchored to the right edge, and Drawer.Content renders the sheet — full height, never wider than its container, with a hairline left border where it meets the page and internal scrolling when content grows past the panel. Because the sheet is plain, rows and metadata are composed from the text styles, which keeps detail panels quiet and scannable. The sheet is drag-dismissible in the direction it came from.",
  usage:
    "Control it with open/onOpenChange state (direction=\"right\" restores the Subframe side sheet), then fill a Drawer.Content with a heading and a few metadata rows.",
  tags: ["sheet", "overlay", "scrim", "side-panel", "surface"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Content rendered inside the scrim; typically a single Drawer.Content sheet.",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controls whether the scrim and the sheet are mounted.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description:
        "Called when the drawer asks to open or close (drag, Escape key).",
    },
    {
      name: "className",
      type: "string",
      description: "Classes merged onto the full-bleed scrim container.",
    },
    {
      name: "direction",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"bottom" (inherited)',
      description:
        "Inherited from the underlying sheet root: sets which edge the sheet enters from and the drag-to-dismiss direction. Pass \"right\" for the Subframe side sheet.",
    },
    {
      name: "Content.children",
      type: "React.ReactNode",
      description: "Sheet content — a heading plus rows composed by the caller.",
    },
    {
      name: "Content.className",
      type: "string",
      description: "Classes merged onto the sheet (width overrides).",
    },
  ],
  subComponents: ["Content"],
  status: "stable",
  sourceRef: "Subframe Drawer_1e71b2cb-8d72-4e67-b368-8805179e9444",
});
