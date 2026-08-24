import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "DialogLayout",
  slug: "dialog-layout",
  category: "layouts",
  description:
    "The layout variant of the Dialog surface. It renders the same scrim and floating panel pair as Dialog, but composes children as a horizontal row with a 24px gap inside Dialog.Content — a leading mark or summary block beside a title/body/actions column. Control props (open, onOpenChange, modal) are forwarded to the Dialog root, so it behaves exactly like its parent component while giving the panel's interior a two-column reading order.",
  usage:
    "Pass the Dialog control props (open, onOpenChange) and compose children left-to-right — a compact leading block, then the title/body/actions column.",
  tags: ["modal", "overlay", "scrim", "dialog", "layout"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Content arranged in a horizontal 24px-gap row inside the dialog panel.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Classes merged onto the full-bleed scrim container (inherited from Dialog).",
    },
    {
      name: "open",
      type: "boolean",
      description:
        "Inherited from Dialog — controls whether the scrim and panel are mounted.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description:
        "Inherited from Dialog — called when the dialog asks to open or close (Escape key, outside interaction).",
    },
    {
      name: "modal",
      type: "boolean",
      description:
        "Inherited from Dialog root props — forwarded through to the underlying dialog root; pass false when embedding the layout non-modally.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe DialogLayout_ff4920a8-df26-4012-934d-0a9edbf5e373",
});
