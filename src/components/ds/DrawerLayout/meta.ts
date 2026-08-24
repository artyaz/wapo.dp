import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "DrawerLayout",
  slug: "drawer-layout",
  category: "layouts",
  description:
    "The layout variant of the Drawer surface. It renders the same right-anchored scrim and full-height sheet as Drawer, but stacks children vertically with a generous 32px gap inside Drawer.Content — a title block, then detail sections, each visually independent. Control props (open, onOpenChange, direction, modal) are forwarded to the Drawer root, so the layout keeps the parent's drag-to-dismiss and side-anchoring behavior while structuring the sheet's interior.",
  usage:
    "Pass the Drawer control props (open, onOpenChange, direction) and compose children as stacked sections — title block first, then rows or detail groups.",
  tags: ["overlay", "scrim", "sheet", "drawer", "layout"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Content stacked in a vertical 32px-gap column inside the sheet.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Classes merged onto the full-bleed scrim container (inherited from Drawer).",
    },
    {
      name: "open",
      type: "boolean",
      description:
        "Inherited from Drawer — controls whether the scrim and sheet are mounted.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description:
        "Inherited from Drawer — called when the sheet asks to open or close (drag-to-dismiss, Escape key).",
    },
    {
      name: "direction",
      type: '"top" | "right" | "bottom" | "left"',
      description:
        "Inherited from Drawer root props — edge the sheet anchors to; the Subframe sheet is authored for direction=\"right\".",
    },
    {
      name: "modal",
      type: "boolean",
      description:
        "Inherited from Drawer root props — forwarded through to the underlying drawer root; pass false when embedding the layout non-modally.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe DrawerLayout_2f6803ed-5ed0-4934-b093-a1a46df2d1d1",
});
