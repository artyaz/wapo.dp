import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "UserMessage",
  slug: "user-message",
  category: "ai-elements",
  description:
    "The user's side of an AI chat thread: a right-aligned pill bubble in dark slate against the near-black canvas. The 18px radius flattens at the bottom-right corner to anchor the bubble to the user's edge, while a hard 78% width cap keeps prompts compact — visually differentiating user intent from the agent's left-anchored workspace.",
  usage:
    "Render inside a dark chat canvas column; pass the prompt text as children. Use density=\"compact\" for very short acknowledgements.",
  tags: ["chat", "message", "bubble", "user", "ai"],
  props: [
    {
      name: "density",
      type: '"regular" | "compact"',
      default: '"regular"',
      description:
        "Compact drops to 6px 12px padding and 13px text for short prompts.",
    },
    {
      name: "maxWidthClass",
      type: "string",
      default: '"max-w-[78%]"',
      description:
        "Tailwind max-width class applied to the bubble before text wraps.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Prompt text; whitespace is preserved, long words break.",
    },
  ],
  status: "stable",
  sourceRef: "UserMessage_praxis-ai-elements-01",
});
