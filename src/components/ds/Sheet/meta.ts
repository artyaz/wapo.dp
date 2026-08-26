import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "Sheet",
  slug: "sheet",
  category: "surfaces",
  description:
    "A bottom-anchored modal surface built on the Dialog primitive: the root paints a 34%-ink scrim across its container and docks Sheet.Content to the bottom edge. The content panel is a bordered, panel-colored sheet up to 544px wide and 88vh tall, scrolling internally when it grows past that. Reach for it when a decision or short form needs attention without leaving the page.",
  usage:
    "Render Sheet with controlled open / onOpenChange and compose the panel through Sheet.Content; remaining Dialog props (modal, defaultOpen, …) pass through the root.",
  tags: ["sheet", "dialog", "overlay", "surface"],
  props: [
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state of the sheet.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description:
        "Called when the sheet asks to open or close — Escape, dismissal, or close affordances.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Sheet.Content and any other dialog parts; the root renders only when children exist.",
    },
    {
      name: "className",
      type: "string",
      description: "Class override merged onto the scrim root element.",
    },
    {
      name: "Content.children",
      type: "React.ReactNode",
      description:
        "Panel content, laid out as a 16px-gapped column inside the bordered sheet.",
    },
    {
      name: "Content.className",
      type: "string",
      description: "Class override merged onto the bottom-docked panel element.",
    },
  ],
  subComponents: ["Content"],
  status: "stable",
  sourceRef:
    "https://app.subframe.com/f0db550203e6/library?component=Sheet_74e965be-a00c-4fe1-8323-66626512cf82",
});
