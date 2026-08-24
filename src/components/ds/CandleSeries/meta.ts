import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "CandleSeries",
  slug: "candle-series",
  category: "data-visualization",
  description:
    "A compact candlestick price chart drawn entirely with divs: four hairline gridlines carry mono price labels (108.0 down to 103.5) over fourteen fixed OHLC candles — neutral 2px wicks behind success/destructive bodies — closed by a hairline and a fourteen-bar volume histogram beneath. The geometry is baked in at author time (196px wide, 165px tall), so every render is pixel-identical with no data plumbing. Use it inside quote cards, watchlist rows and market panels where a small, quiet price readout is wanted.",
  usage:
    "Place it in a sized parent (panel, card, watchlist row) and frame it with mono stats; it renders at its authored 196px width.",
  tags: ["chart", "candlestick", "ohlc", "price", "volume", "static"],
  props: [
    {
      name: "className",
      type: "string",
      description:
        "Class overrides for the root; all div props spread through, but the chart geometry stays at the authored 196px canvas.",
    },
  ],
  status: "stable",
  sourceRef:
    "Subframe CandleSeries_a5367f7b-d708-41cd-b766-f40c7dd606e7",
});
