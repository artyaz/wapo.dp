import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "Card",
  slug: "card",
  category: "surfaces",
  description:
    "The baseline content container of the document canvas: a bordered, panel-colored surface with 18px interior padding that stacks an optional header, free-form body, and a right-aligned footer row. The quiet variant dissolves the chrome for embedded layouts, while interactive adds hover and press feedback for clickable cards. Unlike the floating glass families, Card is opaque and flat — it structures content rather than hovering above it.",
  usage:
    "Compose header (title plus meta line), body content, and footer meta or actions through the three slots; the footer row is right-aligned with an 8px gap.",
  tags: ["card", "surface", "container", "panel"],
  props: [
    {
      name: "variant",
      type: '"default" | "quiet" | "interactive"',
      default: '"default"',
      description:
        "default renders the bordered panel; quiet removes border and background; interactive adds hover/press backgrounds for clickable cards.",
    },
    {
      name: "header",
      type: "React.ReactNode",
      description: "Slot rendered in a full-width column above the body.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Body content, stacked in a full-width column between header and footer.",
    },
    {
      name: "footer",
      type: "React.ReactNode",
      description:
        "Slot rendered in a right-aligned row at the bottom of the card.",
    },
    {
      name: "className",
      type: "string",
      description: "Class override merged onto the root element.",
    },
  ],
  status: "stable",
  sourceRef:
    "https://app.subframe.com/f0db550203e6/library?component=Card_719251f6-424f-4160-a649-15b01e8b3685",
});
