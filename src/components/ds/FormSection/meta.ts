import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "FormSection",
  slug: "form-section",
  category: "inputs",
  description:
    "The grouping primitive for forms: an uppercase caption label, an optional hint line, and a vertical stack of fields. It carries no chrome of its own — just spacing and typography — so long settings forms stay quiet and scannable instead of breaking into cards. Pair it with TextField rows for the standard Praxis form rhythm.",
  usage:
    "Give it a sectionLabel and hint, then compose TextField rows (or any controls) as its children.",
  tags: ["form", "layout", "grouping", "inputs"],
  props: [
    {
      name: "sectionLabel",
      type: "React.ReactNode",
      description:
        "Uppercase caption rendered above the group; the quiet section heading.",
    },
    {
      name: "hint",
      type: "React.ReactNode",
      description:
        "Secondary caption under the label — scope or consequence of the fields.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "The fields in the group, stacked with a 16px gap.",
    },
    {
      name: "className",
      type: "string",
      description: "Classes merged onto the section root.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe FormSection_40bc16a6-6da8-478b-80d2-8beeb5470044",
});
