import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "DefaultPageLayout",
  slug: "default-page-layout",
  category: "layouts",
  description:
    "The base page scaffold for the document canvas. The root is a full-height, full-width centered stage (h-screen) that holds exactly one content column themed with the `bg-panel` surface token (white in light, near-black in dark); the column owns its own vertical scrolling and separates its children — typically a header band, the scrolling body, and a footer band — with a 16px gap. Every full page in the system is composed inside this layout, which is what gives Praxis pages their shared calm, single-column rhythm.",
  usage:
    "Compose the page as children of the layout — header band, body content, footer band — and let the column's gap and scrolling do the work; override the stage height via className when embedding.",
  tags: ["page", "scaffold", "scroll", "document", "layout"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Page sections rendered in the scrolling content column; each child is responsible for its own width (w-full) since the column aligns items to the start.",
    },
    {
      name: "className",
      type: "string",
      description:
        "Classes merged onto the full-height stage. Pass h-full to run the layout inside a fixed-height container instead of the viewport.",
    },
  ],
  status: "stable",
  sourceRef:
    "Subframe DefaultPageLayout_a57b1c43-310a-493f-b807-8cc88e2452cf",
});
