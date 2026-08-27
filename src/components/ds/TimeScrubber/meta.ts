import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "TimeScrubber",
  slug: "time-scrubber",
  category: "data-visualization",
  description:
    "A time-range scrubber for metric panes: a quiet 48-bar backdrop (a fixed activity histogram in neutral-300) with the selected range shaded in brand-50, hairline brand-primary handles authored at 55% and 85% of the width, quiet hairline range tags pinned to those handles, and a 1H/1D/1W/1M range selector row held clearly below the plotting area. In this system brand ink is near-black over a near-white shade, so selection reads as weight rather than hue, per doctrine. The geometry is fixed — it is a static composition, not a draggable control — so consumers pair it with their own pointer handling and re-render it with new range labels.",
  usage:
    "Drop it under a chart and feed rangeStart/rangeEnd timecodes; the backdrop, selection window and tags compose themselves.",
  tags: ["scrubber", "time-range", "histogram", "timeline", "monochrome"],
  props: [
    {
      name: "activeRange",
      type: '"1-h" | "1-d" | "1-w" | "1-m"',
      default: '"1-d"',
      description:
        'Highlights the matching 1H/1W/1M pill. Source quirk: the 1D pill is hardcoded in its active state and never turns off, so "1-d" leaves exactly one lit pill.',
    },
    {
      name: "rangeStart",
      type: "React.ReactNode",
      description:
        "Hairline tag pinned to the right of the 55% handle (e.g. a range-start timecode); renders nothing when omitted — omit it when an adjacent header already states the range so the readout is not duplicated.",
    },
    {
      name: "rangeEnd",
      type: "React.ReactNode",
      description:
        "Hairline tag pinned to the left of the 85% handle (e.g. a range-end timecode); renders nothing when omitted — omit it when an adjacent header already states the range so the readout is not duplicated.",
    },
    {
      name: "className",
      type: "string",
      description: "Class overrides for the root panel.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe TimeScrubber_dc7534c2-5790-47a6-8284-3aa943ab0296",
});
