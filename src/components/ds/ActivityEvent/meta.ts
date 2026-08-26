import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "ActivityEvent",
  slug: "activity-event",
  category: "data-display",
  description:
    "A single entry in a vertical activity timeline: a 3px rail carries a marker — filled dot for comments, hairline ring for system events, @ glyph for email — beside a baseline row of author, subject and tabular monospace timestamp, followed by a body line. The rail's connector line runs down to the next event so consecutive rows read as one thread; isLast clears it. Body typography follows the variant: prose for comments, monospace for system events, caption for email.",
  usage:
    "Stack ActivityEvent rows in a padded column to narrate a record's history; give the final row isLast to end the rail.",
  tags: ["timeline", "activity", "event", "history", "feed"],
  props: [
    {
      name: "variant",
      type: '"comment" | "system" | "email"',
      default: '"comment"',
      description:
        "Marker and typography of the entry: comment renders a filled dot with author + body; system renders a hollow ring with a monospace body only (no author row); email renders an @ glyph with subject + caption body.",
    },
    {
      name: "author",
      type: "React.ReactNode",
      description:
        "Semibold 13px author label, baseline-aligned before the timestamp; hidden for the system and email variants.",
    },
    {
      name: "timestamp",
      type: "React.ReactNode",
      description:
        "Monospace 12px tabular timestamp after the author; hidden for the system variant.",
    },
    {
      name: "subject",
      type: "React.ReactNode",
      description:
        "Inline subject rendered in place of the author — only shown by the email variant.",
    },
    {
      name: "body",
      type: "React.ReactNode",
      description:
        "Entry content: body-medium prose for comments, a monospace system line for system events, caption text for email.",
    },
    {
      name: "isFirst",
      type: "boolean",
      default: "false",
      description:
        "Clears the upward connector stub so the timeline starts cleanly on this row's marker.",
    },
    {
      name: "isLast",
      type: "boolean",
      default: "false",
      description:
        "Clears the downward connector so the timeline terminates on this row.",
    },
    {
      name: "className",
      type: "string",
      description: "Extra classes merged onto the root row via twClassNames.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe ActivityEvent_f651fa19-69c4-411e-a5ec-d56e957b0388",
});
