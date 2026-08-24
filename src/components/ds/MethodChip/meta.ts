import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "MethodChip",
  slug: "method-chip",
  category: "indicators",
  description:
    "A small HTTP-verb badge that qualifies an endpoint row with its method — GET, POST, PUT, PATCH or DEL — set in tracked monospace caps. Each verb carries a weight-coded border tone (POST inverts to ink-filled), so method identity reads at a glance without dominating the line. Use it beside API paths, request logs and route tables wherever a request's verb is the status that matters.",
  usage:
    "Place one chip at the start of an endpoint row, followed by the path in code type; use disabled for unavailable routes.",
  tags: ["http", "api", "badge", "endpoint"],
  props: [
    {
      name: "method",
      type: '"get" | "post" | "put" | "delete" | "patch"',
      default: '"get"',
      description:
        "HTTP verb to render. delete renders as the compact label \"DEL\"; post fills the chip with ink and inverts its label.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Dims the chip to 40% opacity and disables pointer events.",
    },
    {
      name: "className",
      type: "string",
      description: "Merged into the root div classes via twClassNames.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe MethodChip_ae719e43-2f20-43a4-a03e-f5cd0fc3a04c",
});
