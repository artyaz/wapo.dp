import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "ReasoningLog",
  slug: "reasoning-log",
  category: "data-display",
  description:
    "A quiet vertical trace of an agent's reasoning: each Beat pairs a semibold job line with a neutral-500 thought beneath it, stacked with a 10px rhythm. An inflight beat sweeps a monochrome shimmer across its job text while the step runs (disabled under prefers-reduced-motion), and showMoreLabel renders an underlined caption link for collapsed older steps. Use it for run logs, decision traces and other process narration where job names are skimmed first and thoughts read second.",
  usage:
    "Compose ReasoningLog.Beat children inside ReasoningLog; add showMoreLabel when the trace is an excerpt of a longer run.",
  tags: ["log", "reasoning", "trace", "agent", "process"],
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Trace steps — render one ReasoningLog.Beat per job, stacked with a 10px gap.",
    },
    {
      name: "showMoreLabel",
      type: "React.ReactNode",
      description:
        'Underlined caption link rendered under the steps, e.g. "Show 14 earlier steps".',
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes merged onto the root via twClassNames.",
    },
    {
      name: "Beat.job",
      type: "React.ReactNode",
      description:
        "Semibold 14px job title; carries the shimmer sweep while inflight is set.",
    },
    {
      name: "Beat.thought",
      type: "React.ReactNode",
      description:
        "Quiet 14px/21px neutral-500 line under the job — the reasoning itself.",
    },
    {
      name: "Beat.inflight",
      type: "boolean",
      default: "false",
      description:
        "Marks the step as running: job text becomes a clipped gradient swept by the shimmer-text keyframes; motion-reduce falls back to solid default-font text.",
    },
    {
      name: "Beat.className",
      type: "string",
      description: "Extra classes merged onto the beat via twClassNames.",
    },
  ],
  subComponents: ["Beat"],
  status: "stable",
  sourceRef: "Subframe ReasoningLog_3e2d1735-69f0-4675-bd89-0a3e0a80e094",
});
