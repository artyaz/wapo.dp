import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "StatusBadge",
  slug: "status-badge",
  category: "indicators",
  description:
    "A minimal status atom: a 7px dot plus an uppercase, 0.14em-tracked micro label. The live tone pulses at a calm 1.6s cadence while idle, success and warning hold steady. Used inline next to titles and inside bars such as PlayerBar to qualify playback or service state.",
  usage:
    "Render inline next to a title or inside a bar; pass the label as children and pick a tone.",
  tags: ["status", "badge", "indicator", "dot"],
  props: [
    {
      name: "tone",
      type: '"live" | "idle" | "success" | "warning"',
      default: '"live"',
      description:
        "Semantic color of dot and label. Live pulses; the other tones are static.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Label text, rendered uppercase at 11px/700 with wide tracking.",
    },
  ],
  status: "stable",
  sourceRef: "StatusBadge_f2aeadf1-b5ee-4ae6-98c4-a2a82ada3083",
});
