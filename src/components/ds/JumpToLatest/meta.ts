import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "JumpToLatest",
  slug: "jump-to-latest",
  category: "ai-elements",
  description:
    "Floating navigation button for the AI chat canvas — a small circular FAB with a dark background, subtle border and shadow, and a centered downward arrow (↓). Appears during long execution traces so users can jump immediately to the latest stream output instead of scrolling the audit trail.",
  usage:
    "Float it in a corner of the transcript container (absolute or fixed positioning is the parent's job); animate with the visible prop while streaming.",
  tags: ["chat", "fab", "navigation", "scroll", "ai"],
  props: [
    {
      name: "size",
      type: "number",
      default: "36",
      description: "Button diameter in px.",
    },
    {
      name: "label",
      type: "React.ReactNode",
      default: '"Jump to latest output"',
      description: "Accessible label; a string is also used as the tooltip.",
    },
    {
      name: "visible",
      type: "boolean",
      default: "true",
      description:
        "When false the button scales out and ignores pointer events — drive it from scroll/streaming state.",
    },
  ],
  status: "stable",
  sourceRef: "JumpToLatest_praxis-ai-elements-08",
});
