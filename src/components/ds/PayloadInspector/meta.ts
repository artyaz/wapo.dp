import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "PayloadInspector",
  slug: "payload-inspector",
  category: "ai-elements",
  description:
    "Embedded code & payload inspector — a nested block-level code viewer for the AI chat thread. Dark rounded container, language identifier label (json) at the top left, padded monospaced body, and full syntax highlighting: magenta keys, cyan strings, white delimiters. Developers inspect raw payloads and configuration structures without leaving the conversation.",
  usage:
    "Render inside a chat transcript (e.g. nested under a ToolSummaryRow trace); pass the raw payload as the code prop and the language label.",
  tags: ["chat", "code", "json", "syntax", "inspector", "ai"],
  props: [
    {
      name: "language",
      type: "string",
      default: '"json"',
      description: "Language identifier rendered as the top-left label.",
    },
    {
      name: "code",
      type: "string",
      description: "Raw payload text — highlighted by JSON/JSONC heuristics.",
    },
    {
      name: "filename",
      type: "string",
      description: "Optional origin shown after the language label.",
    },
    {
      name: "maxHeightClass",
      type: "string",
      default: '"max-h-[320px]"',
      description: "Tailwind max-height class for the scrollable body.",
    },
  ],
  status: "stable",
  sourceRef: "PayloadInspector_praxis-ai-elements-05",
});
