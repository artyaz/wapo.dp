import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "DiffRow",
  slug: "diff-row",
  category: "data-display",
  description:
    "A unified-diff review card. The root is a clipped, bordered column and each DiffLine row carries paired old/new line-number gutters, a +/− marker column and the code itself. Row tint follows lineType — quiet ink for context, success wash for added, destructive wash for removed, a neutral band for hunk headers. Use it for code review panes, audit trails and anywhere a one-line change needs its surrounding lines to make sense.",
  usage:
    "Render DiffLine rows as children of DiffRow, numbering the old/new gutters per side and marking each row's lineType.",
  tags: ["diff", "code-review", "patch", "changelog", "audit"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "DiffLine rows stacked inside the framed column.",
    },
    {
      name: "className",
      type: "string",
      description: "Merged into the root div classes via twClassNames.",
    },
    {
      name: "DiffLine.lineType",
      type: '"context" | "added" | "removed" | "hunk-header"',
      default: '"context"',
      description:
        "Row semantics: added tints green with a + marker, removed tints red with a − marker, hunk-header renders a full-width neutral band without gutters.",
    },
    {
      name: "DiffLine.oldNumber",
      type: "React.ReactNode",
      description: "Left gutter number — the line's position in the old file.",
    },
    {
      name: "DiffLine.newNumber",
      type: "React.ReactNode",
      description: "Right gutter number — the line's position in the new file.",
    },
    {
      name: "DiffLine.code",
      type: "React.ReactNode",
      description: "The line's code content; tinted per lineType.",
    },
    {
      name: "DiffLine.className",
      type: "string",
      description: "Merged into the row's classes via twClassNames.",
    },
  ],
  subComponents: ["DiffLine"],
  status: "stable",
  sourceRef: "Subframe DiffRow_ff969327-625b-45f1-8c87-4c6fc22a4bfc",
});
