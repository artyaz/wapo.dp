import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "CodePane",
  slug: "code-pane",
  category: "code-editor",
  description:
    "A bordered code reading surface. CodeLine rows pair a right-aligned line-number gutter with the line's content and can flag the current line with a faint brand wash and a semibold number. The root also mounts a HoverDocCard — a small panel with a function signature, a prose summary and a file reference — rendered below the snippet and docked to the pane's trailing edge, modeling the editor's hover-documentation moment without covering the code. Use it for read-only snippets, signatures and code excerpts.",
  usage:
    "Compose CodeLine rows as children of CodePane and set currentLine on the cursor's row; the HoverDocCard is rendered by the root in flow below the snippet (so it never overlaps the code) and can also be positioned standalone.",
  tags: ["code", "editor", "snippet", "hover-doc", "line-numbers"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "CodeLine rows forming the pane's code.",
    },
    {
      name: "className",
      type: "string",
      description: "Merged into the root div classes via twClassNames.",
    },
    {
      name: "CodeLine.lineNumber",
      type: "React.ReactNode",
      description: "Gutter number rendered right-aligned before the code.",
    },
    {
      name: "CodeLine.currentLine",
      type: "boolean",
      default: "false",
      description:
        "Flags the active row: faint brand-primary wash across the line and a semibold line number.",
    },
    {
      name: "CodeLine.children",
      type: "React.ReactNode",
      description: "The line's code content.",
    },
    {
      name: "CodeLine.className",
      type: "string",
      description: "Merged into the row's classes via twClassNames.",
    },
    {
      name: "HoverDocCard.className",
      type: "string",
      description:
        "Positioning overrides for the doc card; its content (the authored createLedgerEntry signature, summary and file reference) is fixed.",
    },
  ],
  subComponents: ["HoverDocCard", "CodeLine"],
  status: "stable",
  sourceRef: "Subframe CodePane_ba030f24-c529-41ec-844f-bfca372f877d",
});
