import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "FloatingToolbar",
  slug: "floating-toolbar",
  category: "laid-objects",
  description:
    "A compact capsule of floating glass (panel/50, 28px blur, 135% saturation) that lays over content instead of sitting in the document flow. Actions are rounded-sm — members keep their own identity inside the capsule rather than inheriting the pill shape — and a hairline Rule separates action groups. Elevation comes from the dual-gradient sheen and glass hairline shadow, never a cast drop shadow.",
  usage:
    "Compose FloatingToolbar.Action children (optionally grouped around FloatingToolbar.Rule) as the toolbar's children.",
  tags: ["glass", "floating", "toolbar", "laid-object"],
  props: [
    { name: "children", type: "React.ReactNode", description: "Toolbar members — typically Actions and Rules." },
    {
      name: "Action.glyph",
      type: "React.ReactNode",
      description: "Leading glyph for the action (plain unicode text in Praxis demos).",
    },
    {
      name: "Action.label",
      type: "React.ReactNode",
      description: "Action label, set at 13px/600.",
    },
    {
      name: "Action.tone",
      type: '"default" | "destructive"',
      default: '"default"',
      description: "Destructive tone colors glyph, label and hover states with destructive-500.",
    },
    {
      name: "Action.disabled",
      type: "boolean",
      default: "false",
      description: "Dims the action to 40% opacity and removes its hover state.",
    },
  ],
  subComponents: ["Action", "Rule"],
  status: "stable",
  sourceRef: "FloatingToolbar_dda8aa89-b150-4fea-850f-bf648f4f238c",
});
