import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "AgentActivity",
  slug: "agent-activity",
  category: "ai-elements",
  description:
    "The single expanding object for agent execution transparency — one component, three levels. Level 1: the disclosure header (duration + chevron). Level 2: tool summary rows with semantic icons and indented micro-traces. Level 3: the command execution view — the exact code a tool ran, its exit status and captured output. Replaces ThoughtHeader, ToolSummaryRow, ActionTraces and ReasoningLog; each level appears only when applicable.",
  usage:
    "Render in the chat transcript above the response body. Pass structured steps via the steps prop, or compose with AgentActivity.Step / .Trace / .Command. Steps carrying a command reveal the level-3 code view on click.",
  tags: ["chat", "agent", "disclosure", "tools", "trace", "command", "ai"],
  props: [
    {
      name: "label",
      type: "React.ReactNode",
      default: '"Worked for 3m 51s"',
      description: "Level-1 header label shown next to the chevron.",
    },
    {
      name: "steps",
      type: "AgentStepData[]",
      description:
        "Structured level-2 steps: { kind, summary, traces, command }. A step with a command expands into the level-3 execution view.",
    },
    {
      name: "open / defaultOpen / onToggle",
      type: "boolean · boolean · (open: boolean) => void",
      default: "undefined · false · undefined",
      description: "Controlled or uncontrolled level-1 disclosure.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Composed alternative to steps: AgentActivity.Step rows (which accept AgentActivity.Trace lists and expand into AgentActivity.Command).",
    },
  ],
  status: "stable",
  sourceRef: "AgentActivity_praxis-ai-elements-merged",
});
