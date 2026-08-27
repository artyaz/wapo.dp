import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "JumpToLatest",
  slug: "jump-to-latest",
  category: "ai-elements",
  description:
    "Floating navigation button for the AI chat canvas — a small circular FAB with a dark background, subtle border and shadow, and a centered downward arrow (↓). Appears during long execution traces so users can jump immediately to the latest stream output instead of scrolling the audit trail.",
  usage:
    "Float it in a corner of the transcript container (absolute or fixed positioning is the parent's job); animate with the visible prop while streaming. A backdrop-matched scrim fades the content beneath the button automatically. For scrollable feeds, also reserve a bottom lane on the scroll content (e.g. pb-16) so the newest entry can scroll fully clear of the control.",
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
    {
      name: "scrim",
      type: "boolean",
      default: "true",
      description:
        "Render a soft radial scrim behind the button, sampled from the surface it floats over, so content fades as it approaches the FAB instead of running harshly underneath it. Set false for a plain button.",
    },
  ],
  status: "stable",
  sourceRef: "JumpToLatest_praxis-ai-elements-08",
});
