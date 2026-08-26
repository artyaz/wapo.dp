import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "ActionTraces",
  slug: "action-traces",
  category: "ai-elements",
  description:
    "Granular action traces — the micro level of agent execution transparency. An indented vertical sub-list nested within tool summary rows, each line prefixed with a specialized contextual icon (wrench for design skills, terminal >_ for shell commands, connection node for API queries) showing exactly what the agent ran.",
  usage:
    "Pass structured items={[{ kind, label }]} or free-form children; render indented under a ToolSummaryRow via its traces prop.",
  tags: ["chat", "trace", "terminal", "audit", "ai", "agent"],
  props: [
    {
      name: "items",
      type: "Array<{ kind: 'skill' | 'command' | 'api'; label: React.ReactNode }>",
      description: "Structured trace items — kind selects the prefix icon.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Alternative to items: free-form trace content.",
    },
  ],
  status: "stable",
  sourceRef: "ActionTraces_praxis-ai-elements-04",
});
