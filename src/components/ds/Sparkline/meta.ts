import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "Sparkline",
  slug: "sparkline",
  category: "data-visualization",
  description:
    "A three-variant micro-chart row built from 2px flex bars: Neutral (flat oscillation, brand-primary final bar), Positive (rising stair, success-600 final bar) and Negative (falling stair, destructive-600 final bar), each under an uppercase caption and above its own hairline. Thirty bars per variant are baked in at author time, so the row is fully deterministic and stretches to any container width via justify-between. Use it for KPI footers, stat tiles and signal monitors where trend direction matters more than precision.",
  usage:
    "Give it a full-width parent and let the three flex-1 columns divide the space; the darker final bar of each variant marks the current sample.",
  tags: ["sparkline", "trend", "bars", "kpi", "deterministic"],
  props: [
    {
      name: "className",
      type: "string",
      description:
        "Class overrides for the root; all div props spread through. The row is w-full by default and splits into three equal columns.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe Sparkline_18add538-a207-4fc5-8f2c-a36ed3d74cbf",
});
