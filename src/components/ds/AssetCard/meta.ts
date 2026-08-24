import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "AssetCard",
  slug: "asset-card",
  category: "media",
  description:
    "A media library card for browsing and dragging assets: an 88px preview well whose body swaps by kind — a WaveformStrip for audio, filmstrip blocks for video, a ¶ glyph for text — with a mono duration chip pinned to the corner, a hover-revealed drag-handle dot grid, and filename + quiet meta lines beneath. It stays a crisp panel surface (no glass) with a border lift on hover, so library grids read as documents rather than floating objects.",
  usage:
    "Compose into a grid or list inside a media browser; give it a filename, a duration timecode and a quiet format meta line.",
  tags: ["media", "asset", "library", "drag", "waveform", "card"],
  props: [
    {
      name: "kind",
      type: '"audio" | "video" | "text"',
      default: '"audio"',
      description:
        "Asset kind that picks the preview body: waveform for audio, filmstrip blocks for video, a ¶ glyph for text.",
    },
    {
      name: "title",
      type: "React.ReactNode",
      description:
        "Filename row under the preview, clamped to one line with an ellipsis.",
    },
    {
      name: "duration",
      type: "React.ReactNode",
      description:
        "Tabular mono timecode chip pinned to the bottom-right of the preview well.",
    },
    {
      name: "meta",
      type: "React.ReactNode",
      description:
        "Quiet secondary line under the title — format, sample rate or similar metadata.",
    },
    {
      name: "className",
      type: "string",
      description: "Class overrides for the root (the card is w-full).",
    },
  ],
  status: "stable",
  sourceRef: "AssetCard_edbd3739-f21c-4153-a7dc-b6526d4829da",
});
