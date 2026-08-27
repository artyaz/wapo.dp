import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "Dialog",
  slug: "dialog",
  category: "surfaces",
  description:
    "A modal surface for focused, blocking decisions. The root renders a full-bleed 60% black scrim that centers whatever you place inside it, and Dialog.Content renders the floating panel — a token-themed surface card (bg-panel, 8px radius, hairline border, a two-layer shadow and a 90vh scroll cap) that stays legible in both light and dark themes. The scrim renders inline exactly where the Dialog is composed — it is not portaled — so to blanket the whole viewport, mount the Dialog in a full-viewport (e.g. fixed) container, or keep it scoped to a region by composing it inside a clipped, positioned frame the way the embedded demo does. The panel is deliberately unstyled on the inside: heading, body copy and the action row are composed from the text styles and Button, so every confirmation in the system reads structurally the same.",
  usage:
    "Control it with open/onOpenChange state, then compose a single Dialog.Content — heading, body copy, action row — as the root's child. Pass modal={false} for the non-modal embedded idiom: non-modal dialogs don't steal focus on open and stay open when focus moves elsewhere (Escape and pointer-down-outside still dismiss), so several can coexist.",
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
      description:
        "Controls whether the scrim and its content are mounted; once the content unmounts the empty scrim stops painting entirely.",
    },
    {
      name: "modal",
      type: "boolean",
      description:
        "Radix modal flag (default true). With modal={false} the dialog traps neither scroll nor focus: it never auto-focuses its first control on open and ignores focus moving outside, so multiple non-modal dialogs can stay open at once. Escape and pointer-down-outside still dismiss.",
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
