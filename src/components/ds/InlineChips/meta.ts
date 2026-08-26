import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "InlineChips",
  slug: "inline-chips",
  category: "ai-elements",
  description:
    "Inline semantic chips & badges for AI chat prose — three atoms that embed in flowing text without breaking line wrap: IntegrationAvatar (tiny dark square chip with a white brand glyph), CodePill (subtle grey container, light monospaced text, 2–4px radius, 2px 6px padding), and FileRef (filetype icon — blue TS badge, {} JSON symbol — followed by colored link text acting as a navigable code link).",
  usage:
    "Import the atoms directly or via the InlineChips namespace: <InlineChips.IntegrationAvatar glyph=\"S\" />, <InlineChips.CodePill>npm run build</InlineChips.CodePill>, <InlineChips.FileRef kind=\"ts\">index.ts</InlineChips.FileRef>.",
  tags: ["chat", "chip", "badge", "inline", "file", "ai"],
  props: [
    {
      name: "IntegrationAvatar",
      type: "component",
      description:
        "Tiny dark square chip with rounded corners and a white brand glyph; props: glyph (default \"S\"), size (default 16).",
    },
    {
      name: "CodePill",
      type: "component",
      description:
        "Grey monospaced pill for commands, paths and config keys embedded in prose.",
    },
    {
      name: "FileRef",
      type: "component",
      description:
        "Filetype icon + colored link text; kind: ts | tsx | json | md | css | generic; optional path caption.",
    },
  ],
  status: "stable",
  sourceRef: "InlineChips_praxis-ai-elements-06",
});
