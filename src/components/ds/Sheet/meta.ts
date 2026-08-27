import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "Sheet",
  slug: "sheet",
  category: "surfaces",
  description:
    "A bottom-anchored modal surface built on the Dialog primitive: the root paints a black scrim across its container — 34% in light theme, deepened to 60% in dark theme (matching the Dialog scrim) so the dimming stays visible over the near-black page; an ink-token scrim would invert to a near-white haze in dark theme. Sheet.Content docks to the bottom edge as a bordered, panel-colored sheet up to 544px wide and 88vh tall, scrolling internally when it grows past that. Reach for it when a decision or short form needs attention without leaving the page.",
  usage:
    "Render Sheet with controlled open / onOpenChange and compose the panel through Sheet.Content; remaining Dialog props (modal, defaultOpen, …) pass through the root. Keep alignment inside the sheet logical (justify-end / items-start / ps-* / pe-*): footer action rows built with justify-end are direction-aware and mirror to the trailing edge automatically in RTL, so never reach for physical left/right utilities.",
  tags: ["sheet", "dialog", "overlay", "surface"],
  props: [
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state of the sheet.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description:
        "Called when the sheet asks to open or close — Escape, dismissal, or close affordances.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Sheet.Content and any other dialog parts; the root renders only when children exist.",
    },
    {
      name: "className",
      type: "string",
      description: "Class override merged onto the scrim root element.",
    },
    {
      name: "Content.children",
      type: "React.ReactNode",
      description:
        "Panel content, laid out as a 16px-gapped column inside the bordered sheet.",
    },
    {
      name: "Content.className",
      type: "string",
      description: "Class override merged onto the bottom-docked panel element.",
    },
  ],
  subComponents: ["Content"],
  status: "stable",
  sourceRef:
    "https://app.subframe.com/f0db550203e6/library?component=Sheet_74e965be-a00c-4fe1-8323-66626512cf82",
});
