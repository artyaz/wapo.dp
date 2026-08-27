import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "FileTreeRow",
  slug: "file-tree-row",
  category: "code-editor",
  description:
    "A single row of an IDE file-tree sidebar. The row composes its own indentation: one 20px rail column per depth level, each drawn with a hairline inline-end border, so a stack of rows reads as a real explorer tree. Folders get a filled-square glyph and an expand caret (▾ expanded / ▸ collapsed — never both); files get a bordered 16px glyph slot carrying a monospace type mark (# for TypeScript, { } for JSON, ¶ for Markdown, ≡ for YAML), with git-status and unsaved dots docked to the trailing edge. All spacing uses logical properties, so the tree mirrors correctly in RTL.",
  usage:
    "Stack rows inside a sidebar column and drive them from a flattened tree array — set depth and nodeType per entry, and reflect selection, git state and dirty flags through the props.",
  tags: ["file tree", "explorer", "sidebar", "ide", "row"],
  props: [
    {
      name: "name",
      type: "React.ReactNode",
      description:
        "Row label. Files render it in the code text style; folders switch to the body font at 500 weight.",
    },
    {
      name: "nodeType",
      type: '"folder" | "ts" | "json" | "md" | "yml"',
      default: '"ts"',
      description:
        "Which glyph pair the row shows: folders render the square glyph and the expand caret (▸ collapsed, ▾ expanded); each file type renders its monospace type mark inside the bordered slot.",
    },
    {
      name: "depth",
      type: '"0" | "1" | "2" | "3" | "4"',
      default: '"0"',
      description:
        "Indentation level. Each level adds a 20px rail column with an inline-end border before the caret cell.",
    },
    {
      name: "expanded",
      type: "boolean",
      default: "false",
      description:
        "Shows the ▾ open-folder caret instead of ▸ (only folders render a caret; exactly one is shown at a time).",
    },
    {
      name: "selected",
      type: "boolean",
      default: "false",
      description:
        "Selected state: brand-primary/5 background tint plus an inset rounded brand-primary indicator bar at the row's leading edge (logical start, so it mirrors in RTL and never touches the container border).",
    },
    {
      name: "gitStatus",
      type: '"none" | "modified" | "added" | "deleted"',
      default: '"none"',
      description:
        "Trailing-edge status dot: warning for modified, success for added, destructive for deleted.",
    },
    {
      name: "dirty",
      type: "boolean",
      default: "false",
      description: "Shows the default-font unsaved-changes dot next to the git dot.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Drops the whole row to 40% opacity.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes merged onto the row root.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe FileTreeRow_780ea589-5882-4884-ac9f-6588187b84dd",
});
