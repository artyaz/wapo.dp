import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "Button",
  slug: "button",
  category: "inputs",
  description:
    "The workhorse action control — emphasis is ink weight, not color. Primary is the single strongest action on a screen (one per view; if two compete, demote one), secondary is the supporting action beside it, ghost carries low-emphasis or repeated actions, and the danger tone marks recording/stop states rather than destructive confirmations. Keep labels to one or two words in sentence case, and size up to large (46px) for anything touched on mobile. Never round buttons — pills belong exclusively to the floating PlayerBar — and never tint actions with status hues; saturation means status, actions are monochrome ink.",
  usage:
    "Compose one primary with at most one or two secondary/ghost actions beside it, giving the primary the wider, final position.",
  tags: ["action", "press", "ink", "form"],
  props: [
    {
      name: "variant",
      type: '"primary" | "secondary" | "ghost" | "danger"',
      default: '"primary"',
      description:
        "Emphasis level. Primary is ink-filled; secondary is a panel surface with a line border; ghost has no fill or border; danger reads as a recording/stop state.",
    },
    {
      name: "size",
      type: '"small" | "medium" | "large"',
      default: '"medium"',
      description:
        "Control height and type ramp (32/40/46px). Large is the touch-target baseline for mobile.",
    },
    {
      name: "iconOnly",
      type: "boolean",
      default: "false",
      description:
        "Collapses the button to an aspect-square icon target with no padding or label.",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description:
        "Shows the inline Spinner in place of nothing — keep the label visible for long waits and use this only for short waits.",
    },
    {
      name: "icon",
      type: "React.ReactNode",
      default: "null",
      description:
        "Optional leading glyph rendered through the icon slot, inheriting the variant's ink color.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Dims the button to 40% opacity and blocks pointer events.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Label content — one or two words, sentence case, no trailing punctuation.",
    },
    {
      name: "onClick",
      type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
      description: "Press handler, forwarded to the native button element.",
    },
    {
      name: "type",
      type: '"button" | "submit" | "reset"',
      default: '"button"',
      description: "Native button type; defaults to \"button\" to avoid implicit submits.",
    },
    {
      name: "className",
      type: "string",
      description: "Merged into the root button classes via twClassNames.",
    },
  ],
  subComponents: ["Spinner"],
  status: "stable",
  sourceRef: "Subframe Button_d55c3903-57a4-4031-b553-08a523ac371e",
});
