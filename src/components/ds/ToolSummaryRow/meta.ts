import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "ToolSummaryRow",
  slug: "tool-summary-row",
  category: "ai-elements",
  description:
    "Aggregated tool summary — the macro level of agent execution transparency. A block-level summary line with muted text and a semantic line icon (integration link, pencil edits, terminal, API node, wrench) that collapses multi-step autonomous actions into a single readable event, reducing visual noise during long workflows. Nest ActionTraces underneath for the micro level.",
  usage:
    "Render inside the chat transcript below a ThoughtHeader; pass the summary sentence as children and optional ActionTraces via the traces prop.",
  tags: ["chat", "tools", "summary", "trace", "ai", "agent"],
  props: [
    {
      name: "kind",
      type: '"integration" | "edits" | "command" | "api" | "skill"',
      default: '"integration"',
      description: "Semantic kind — selects the leading line icon.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Summary line content, e.g. \"Used Superblocks integration and ran a command\".",
    },
    {
      name: "traces",
      type: "React.ReactNode",
      description:
        "Nested micro-level traces (ActionTraces) rendered indented below the summary.",
    },
  ],
  status: "stable",
  sourceRef: "ToolSummaryRow_praxis-ai-elements-03",
});
