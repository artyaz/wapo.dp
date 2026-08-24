import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "Dialog",
  slug: "dialog",
  category: "surfaces",
  description:
    "A modal surface for focused, blocking decisions. The root renders a full-bleed 60% black scrim that centers whatever you place inside it, and Dialog.Content renders the floating panel — a white card with an 8px radius, hairline border, a two-layer shadow and a 90vh scroll cap. The panel is deliberately unstyled on the inside: heading, body copy and the action row are composed from the text styles and Button, so every confirmation in the system reads structurally the same.",
  usage:
    "Control it with open/onOpenChange state, then compose a single Dialog.Content — heading, body copy, action row — as the root's child.",
  tags: ["modal", "overlay", "scrim", "confirmation", "surface"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Content rendered inside the scrim; typically a single Dialog.Content panel.",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controls whether the scrim and its content are mounted.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description:
        "Called when the dialog asks to open or close (Escape key, outside interaction).",
    },
    {
      name: "className",
      type: "string",
      description: "Classes merged onto the full-bleed scrim container.",
    },
    {
      name: "Content.children",
      type: "React.ReactNode",
      description:
        "Panel content — heading, body copy and actions composed by the caller.",
    },
    {
      name: "Content.className",
      type: "string",
      description:
        "Classes merged onto the floating panel (width overrides, max-height).",
    },
  ],
  subComponents: ["Content"],
  status: "stable",
  sourceRef: "Subframe Dialog_ca59db17-43fb-4247-8094-3c55162e902d",
});
