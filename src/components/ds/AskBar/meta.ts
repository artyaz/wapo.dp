import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "AskBar",
  slug: "ask-bar",
  category: "inputs",
  description:
    "The assistant input bar — a single row composing an embedded TextField, a voice-capture toggle and a primary submit action, with an optional status caption above. A bottom gradient fades the bar into the page background, so it reads as an overlay anchored to the foot of a copilot panel or record page. When recording is true, the capture toggle swaps to its destructive state.",
  usage:
    "Place at the bottom of a panel; pass placeholder for the prompt and statusText for grounding copy.",
  tags: ["assistant", "input", "prompt", "copilot", "bar"],
  props: [
    {
      name: "placeholder",
      type: "React.ReactNode",
      description: "Placeholder rendered inside the embedded TextField.Input.",
    },
    {
      name: "statusText",
      type: "React.ReactNode",
      description:
        "Optional caption rendered above the input row — grounding hints or status copy.",
    },
    {
      name: "recording",
      type: "boolean",
      default: "false",
      description:
        "Swaps the voice-capture toggle into its destructive recording state.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes merged onto the root.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe AskBar_5fc66882-b30a-461f-937f-85b3bf332b5b",
});
