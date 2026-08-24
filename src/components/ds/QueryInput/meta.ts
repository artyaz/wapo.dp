import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "QueryInput",
  slug: "query-input",
  category: "inputs",
  description:
    "A read-only query field for search and observability consoles. It documents two appearances of the same control: the focused state renders a syntax-highlighted expression with keywords, string literals and a live run affordance, while the resting state shows the dimmed placeholder with a muted run button. Use it wherever the query language itself is the primary input — metrics explorers, log filters, trace search.",
  usage:
    "Drop it into a console panel as-is; the two stacked lanes illustrate the focused and placeholder states of the field.",
  tags: ["query", "search", "input", "console", "monospace"],
  props: [
    {
      name: "className",
      type: "string",
      description:
        "Extra classes merged onto the root; the component is a static two-state specimen and takes no content props.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe QueryInput_1b079646-69b5-4745-8836-b882970ff24a",
});
