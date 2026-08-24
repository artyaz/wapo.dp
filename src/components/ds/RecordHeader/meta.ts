import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "RecordHeader",
  slug: "record-header",
  category: "data-display",
  description:
    "A record page header: breadcrumb trail, large title, a bordered record-id chip and a quiet meta line, with secondary and primary actions aligned to the right. It establishes the identity block for entity pages such as incidents, runs and assets. The actions are plain Buttons driven entirely by the two action props.",
  usage:
    "Compose as the top strip of a detail view; pass record identifiers in recordId and status metadata in meta.",
  tags: ["header", "record", "breadcrumb", "entity", "detail-page"],
  props: [
    {
      name: "breadcrumb",
      type: "React.ReactNode",
      description:
        "Small uppercase trail above the title, e.g. \"Incidents / 2025 / Q3\".",
    },
    {
      name: "title",
      type: "React.ReactNode",
      description: "The record title, rendered in heading-1 style.",
    },
    {
      name: "recordId",
      type: "React.ReactNode",
      description:
        "Identifier rendered in a bordered monospace chip beside the title.",
    },
    {
      name: "meta",
      type: "React.ReactNode",
      description:
        "Quiet caption under the title — dates, severity, ownership or status metadata.",
    },
    {
      name: "primaryAction",
      type: "React.ReactNode",
      description: "Content of the primary (filled) action Button.",
    },
    {
      name: "secondaryAction",
      type: "React.ReactNode",
      description: "Content of the secondary (panel) action Button.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes merged onto the root.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe RecordHeader_b6e51ba9-e2c1-4b18-82c6-754ca60f5983",
});
