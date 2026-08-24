import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "GlassChip",
  slug: "glass-chip",
  category: "glass-primitives",
  description:
    "The canonical laid-object capsule: a pill of regular-grade panel glass (bg-panel/60 · backdrop-blur-2xl · backdrop-saturate-150) finished with a hairline rim, specular inset shadows and dual gradient sheens. Actions and Rules compose inside it to build floating toolbars, transports and command strips. It is the reference implementation of the glass material on a capsule silhouette, and most laid objects in the system derive their surface treatment from it.",
  usage:
    "Compose GlassChip.Action items separated by GlassChip.Rule dividers as children of the root capsule.",
  tags: ["glass", "capsule", "laid-object", "floating", "toolbar"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Content laid out inside the capsule — typically Actions and Rules.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Classes merged onto the root capsule (positioning, width, material overrides).",
    },
    {
      name: "Action.glyph",
      type: "React.ReactNode",
      description:
        "Leading glyph rendered at 13px/400 — a text character or keycap such as ⌘, ⇧ or ⌫.",
    },
    {
      name: "Action.label",
      type: "React.ReactNode",
      description: "Label rendered at 13px/600 next to the glyph.",
    },
    {
      name: "Action.tone",
      type: '"default" | "destructive"',
      default: '"default"',
      description:
        "Destructive tone paints the action's text and hover/active washes red.",
    },
    {
      name: "Action.disabled",
      type: "boolean",
      default: "false",
      description:
        "Dims the action to 40% opacity and disables its pointer events and hover wash.",
    },
    {
      name: "Rule.className",
      type: "string",
      description: "Classes merged onto the 1px vertical divider.",
    },
  ],
  subComponents: ["Action", "Rule"],
  status: "stable",
  sourceRef: "Subframe GlassChip_35d1ebd9-91b2-4ea2-a4d5-eecf92af0945",
});
