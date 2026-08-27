import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "AssistantMessage",
  slug: "assistant-message",
  category: "ai-elements",
  description:
    "The agent's final response block — start-aligned structured markdown output with high-contrast theme-aware text, standard bullet points (•), and clean vertical spacing between lists and concluding remarks. Renders the deliverable natively on the chat canvas without boxy container borders, prioritizing scannability and contrast.",
  usage:
    "Compose with the sub-exports: AssistantMessage.Paragraph for prose, AssistantMessage.List for •-bulleted lists (or items prop), AssistantMessage.Quote for citations. The root renders on the canvas token with theme-aware ink and dir=\"auto\" direction detection.",
  tags: ["chat", "message", "markdown", "response", "ai"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "Response body — compose Paragraph / List / Quote blocks.",
    },
    {
      name: "AssistantMessage.Paragraph",
      type: "component",
      description: "A prose block: 14px/24px high-contrast theme-aware text.",
    },
    {
      name: "AssistantMessage.List",
      type: "component",
      description:
        "•-bulleted list with hanging indent; pass items={[]} or <li> children.",
    },
    {
      name: "AssistantMessage.Quote",
      type: "component",
      description:
        "Quiet indented strip for cited output; the accent strip sits on the inline-start edge so it mirrors in RTL.",
    },
  ],
  status: "stable",
  sourceRef: "AssistantMessage_praxis-ai-elements-07",
});
