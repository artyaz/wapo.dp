import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "ThoughtHeader",
  slug: "thought-header",
  category: "ai-elements",
  description:
    "Execution & thought header for AI chat: a collapsible control bar with muted duration text (\"Worked for 3m 51s\") and a toggle chevron on a subtle bottom divider. Hides intermediate reasoning logs by default to keep responses clean — technical users expand it on demand to audit agent execution time and steps.",
  usage:
    "Place above the response body; render the reasoning log as children — it only shows when expanded. Controlled via open/onToggle or left uncontrolled with defaultOpen.",
  tags: ["chat", "disclosure", "collapsible", "reasoning", "ai", "header"],
  props: [
    {
      name: "label",
      type: "React.ReactNode",
      default: '"Worked for 3m 51s"',
      description: "Muted summary label shown next to the chevron.",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state of the disclosure.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Uncontrolled initial open state.",
    },
    {
      name: "onToggle",
      type: "(open: boolean) => void",
      description: "Called with the next open state on click.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Reasoning log content revealed when expanded.",
    },
  ],
  status: "stable",
  sourceRef: "ThoughtHeader_praxis-ai-elements-02",
});
