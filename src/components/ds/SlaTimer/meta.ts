import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "SlaTimer",
  slug: "sla-timer",
  category: "data-display",
  description:
    "A compact timecode chip for SLA countdowns and response clocks. A tone of neutral, warning or breach drives the status dot and timecode color, and tabular numerals keep digits from shifting as the clock ticks. Use it in toolbars, list rows and headers where remaining time carries operational meaning.",
  usage:
    "Pass a formatted timecode and switch tone as thresholds are crossed; showDot adds the status LED.",
  tags: ["timer", "sla", "timecode", "status", "countdown"],
  props: [
    {
      name: "tone",
      type: '"neutral" | "warning" | "breach"',
      default: '"neutral"',
      description:
        "Semantic state — recolors the dot and timecode as the SLA approaches or crosses its threshold.",
    },
    {
      name: "timecode",
      type: "React.ReactNode",
      description:
        "The displayed time value, e.g. \"00:04:32\"; rendered with tabular numerals.",
    },
    {
      name: "showDot",
      type: "boolean",
      default: "false",
      description: "Shows the status dot to the left of the timecode.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes merged onto the root.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe SlaTimer_7b8b064a-da9c-4d11-a807-f8ba7d037686",
});
