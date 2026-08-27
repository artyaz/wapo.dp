import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "RelationshipGrid",
  slug: "relationship-grid",
  category: "data-display",
  description:
    "A related-records grid for entity detail pages: a sticky panel header with sortable ID / Title / Status / Priority / Updated columns, a monospace filter row, and the records linked to the open one — changes, incidents, problems, requests and tasks. The relationship map is modeled by the row affordances: ▸ expanders hint at parent-child depth, the brand-tinted checked row marks the current record, and an underlined parent link points up the hierarchy. Status is carried by StatusBadge from the indicators family. Below the sm breakpoint the grid narrows its leading columns and lets titles wrap instead of truncating.",
  usage:
    "Render as-is inside a record pane; the grid ships its own record set as authored, so it needs no props beyond className.",
  tags: ["table", "grid", "relationships", "entity", "records", "related"],
  props: [
    {
      name: "className",
      type: "string",
      description:
        "Extra classes merged onto the root grid via twClassNames (it fills its container width and clips overflow).",
    },
  ],
  status: "stable",
  sourceRef:
    "Subframe RelationshipGrid_c13b27b2-b204-43b6-9029-7a3a046e6c5d (composes StatusBadge_f2aeadf1-b5ee-4ae6-98c4-a2a82ada3083)",
});
