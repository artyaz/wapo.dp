import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "InspectorRow",
  slug: "inspector-row",
  category: "code-editor",
  description:
    "A key/value row for IDE properties panels and settings inspectors. A fixed 96px caption label sits on the left; the right side is owned by one of five variant controls — a bordered text field, a −/+ number stepper with a tabular value between, a toggle pill, a color swatch with a monospace value, or a select box with a chevron. Rows carry their own bottom hairline, so a stack reads as one panel.",
  usage:
    "Stack rows in a bordered column to build an inspector; pick variant per property and pass value (and checked for toggles) to fill the control.",
  tags: ["inspector", "properties", "key-value", "settings", "row"],
  props: [
    {
      name: "label",
      type: "React.ReactNode",
      description:
        "Left-hand property label, clipped to a 96px caption column with ellipsis.",
    },
    {
      name: "variant",
      type: '"text" | "number" | "toggle" | "color" | "select"',
      default: '"text"',
      description:
        "Which value control the row renders on the right; exactly one is shown.",
    },
    {
      name: "value",
      type: "React.ReactNode",
      description:
        "Current value. Rendered by the number (between the steppers), color (monospace next to the swatch) and select (inside the box) variants; the text variant ignores it and renders an empty field.",
    },
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description:
        "Toggle state for the toggle variant: checked fills the pill with brand-primary and slides the knob right.",
    },
    {
      name: "color",
      type: "React.ReactNode",
      description:
        "Vestigial in the source export: declared on the interface but never rendered — the color variant's swatch is hardcoded to neutral-500 and only `value` shows.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Optional custom control, rendered inline to the left of the variant control.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes merged onto the row root.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe InspectorRow_4f1d3bcc-2dcd-4548-808a-084a52a7e046",
});
