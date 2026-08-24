import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "EntityTabs",
  slug: "entity-tabs",
  category: "indicators",
  description:
    "A record-level tab strip for entity detail views — baseline-aligned labels with small tabular counts, riding a single hairline rule. The active tab carries the ink underline and full text weight, while inactive tabs stay neutral-500 and warm on hover; a trailing ▾ affordance signals overflow. Use it to switch between the facets of one entity (details, children, activity, audit) rather than for top-level navigation.",
  usage:
    "Drop EntityTabs at the top of a record pane; it draws its own bottom rule, so sit content directly beneath it.",
  tags: ["tabs", "navigation", "entity", "record"],
  props: [
    {
      name: "className",
      type: "string",
      description: "Merged into the root strip classes via twClassNames.",
    },
    {
      name: "TabItem.label",
      type: "React.ReactNode",
      description:
        "Tab label rendered in 13px/500 body type; hidden when unset.",
    },
    {
      name: "TabItem.count",
      type: "React.ReactNode",
      description:
        "Small tabular monospace count beside the label, lifted 1px off the baseline. Empty string renders nothing visible.",
    },
    {
      name: "TabItem.active",
      type: "boolean",
      default: "false",
      description:
        "Inks the tab: brand-primary bottom border and default-font label weight.",
    },
    {
      name: "TabItem.className",
      type: "string",
      description: "Merged into the individual tab classes via twClassNames.",
    },
  ],
  subComponents: ["TabItem"],
  status: "stable",
  sourceRef: "Subframe EntityTabs_fab3352b-d10e-406a-ae98-6b69b7284337",
});
