import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "TrackHeader",
  slug: "track-header",
  category: "media",
  description:
    "The fixed 180px label column for a timeline track: a type glyph tile (♪ audio / ▣ video / ¶ text), the track name, and M / S / L toggle squares that fill brand-primary when engaged, over a static twelve-bar level meter tinted through the neutral ramp. It docks to the left of a track lane and keeps the same panel surface as the lane body — a document, not a floating object.",
  usage:
    "Dock it left of a track lane row; the M/S/L squares are presentational, so wire their state from the editor.",
  tags: ["media", "timeline", "track", "label", "editor"],
  props: [
    {
      name: "trackName",
      type: "React.ReactNode",
      description: "Track label next to the type glyph tile.",
    },
    {
      name: "trackType",
      type: '"audio" | "video" | "text"',
      default: '"audio"',
      description: "Pick of the glyph tile: ♪ for audio, ▣ for video, ¶ for text.",
    },
    {
      name: "muted",
      type: "boolean",
      default: "false",
      description: "Fills the M square with brand-primary when engaged.",
    },
    {
      name: "solo",
      type: "boolean",
      default: "false",
      description: "Fills the S square with brand-primary when engaged.",
    },
    {
      name: "locked",
      type: "boolean",
      default: "false",
      description: "Fills the L square with brand-primary when engaged.",
    },
    {
      name: "className",
      type: "string",
      description: "Class overrides for the root (fixed w-[180px]).",
    },
  ],
  status: "stable",
  sourceRef: "TrackHeader_299fd65c-c68c-4153-9a8e-bc74c929ff67",
});
