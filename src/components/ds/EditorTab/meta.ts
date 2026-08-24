import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "EditorTab",
  slug: "editor-tab",
  category: "code-editor",
  description:
    "A file tab for the IDE pane: a mono label with a 16px glyph square, an optional split indicator (⧉), a dirty dot that replaces the trailing slot, and hairline separators. The active tab lifts onto the panel background, drops its bottom border and gains a brand-primary rule along its top edge; inactive tabs sit quiet in neutral-500 over a shared bottom hairline. Compose tabs in a row above the pane they select.",
  usage:
    "Lay tabs in a flex row over a bordered content pane; pass a glyph (or use EditorTab.GlyphSquare directly) plus label, active and dirty state.",
  tags: ["editor", "tab", "file", "mono", "code-editor"],
  props: [
    {
      name: "label",
      type: "React.ReactNode",
      description: "Mono filename, clamped to 160px with an ellipsis.",
    },
    {
      name: "glyph",
      type: "React.ReactNode",
      description: "Content for the 16px glyph square (file-type mark).",
    },
    {
      name: "active",
      type: "boolean",
      default: "false",
      description:
        "Lifts the tab onto the panel surface with side hairlines and the top brand rule.",
    },
    {
      name: "dirty",
      type: "boolean",
      default: "false",
      description: "Shows the unsaved-changes dot in place of the trailing slot.",
    },
    {
      name: "split",
      type: "boolean",
      default: "false",
      description: "Shows the ⧉ split-view indicator after the label.",
    },
    {
      name: "trailing",
      type: "React.ReactNode",
      description: "Trailing slot (hidden while dirty), e.g. a close affordance.",
    },
    {
      name: "className",
      type: "string",
      description: "Class overrides for the root (fixed h-9).",
    },
    {
      name: "GlyphSquare.glyph",
      type: "React.ReactNode",
      description: "GlyphSquare sub-component: the mark rendered inside the square.",
    },
    {
      name: "GlyphSquare.className",
      type: "string",
      description: "GlyphSquare sub-component: class overrides for the square.",
    },
  ],
  subComponents: ["GlyphSquare"],
  status: "stable",
  sourceRef: "EditorTab_5c17f3ef-4a1d-418e-a45c-7117367eb8d9",
});
