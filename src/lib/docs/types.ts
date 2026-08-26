/**
 * Documentation types shared by every component's meta.ts and the registry.
 */

export type CategoryId =
  | "glass-primitives"
  | "laid-objects"
  | "surfaces"
  | "inputs"
  | "indicators"
  | "data-display"
  | "data-visualization"
  | "code-editor"
  | "media"
  | "layouts"
  | "ai-elements";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "glass-primitives",
    name: "Glass Primitives",
    description:
      "The material system itself — surfaces, scrims, strategy negotiation and the token card that anchors every glass value in the system.",
  },
  {
    id: "laid-objects",
    name: "Laid Objects",
    description:
      "Floating glass families that lay over content: toolbars, transports and players elevated by refraction, never by cast shadows.",
  },
  {
    id: "surfaces",
    name: "Surfaces",
    description:
      "Containers and sheets — cards, panels, dialogs and drawers that structure content on the document canvas.",
  },
  {
    id: "inputs",
    name: "Inputs & Actions",
    description:
      "Controls the user types into and presses — buttons, fields, query bars and form sections.",
  },
  {
    id: "indicators",
    name: "Indicators",
    description:
      "Small status-carrying atoms — badges, method chips and labels that qualify surrounding content.",
  },
  {
    id: "data-display",
    description:
      "Read-oriented displays for structured records — events, diffs, timers, trees and entity metadata.",
    name: "Data Display",
  },
  {
    id: "data-visualization",
    name: "Data Visualization",
    description:
      "Charts and quantitative graphics — candles, sparklines, waveforms and the timeline machinery around them.",
  },
  {
    id: "code-editor",
    name: "Code & Editor",
    description:
      "The IDE surface family — file trees, code panes, inspectors, layer rows and terminal output.",
  },
  {
    id: "media",
    name: "Media",
    description:
      "Assets and tracks — cards, clips and headers for audio, video and timeline media.",
  },
  {
    id: "layouts",
    name: "Layouts",
    description:
      "Page-level scaffolds — default pages, dialog frames and drawer shells.",
  },
  {
    id: "ai-elements",
    name: "AI Elements",
    description:
      "The agent chat surface — user bubbles, thought headers, tool summaries, granular traces, payload inspectors, inline chips, response blocks and the jump-to-latest FAB that compose an auditable AI conversation.",
  },
];

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentMeta {
  /** PascalCase export name, e.g. "GlassChip" */
  name: string;
  /** URL slug, e.g. "glass-chip" */
  slug: string;
  category: CategoryId;
  /** 2–4 sentence description of intent and usage */
  description: string;
  /** composition notes for the demo */
  usage?: string;
  tags?: string[];
  props: PropDoc[];
  /** sub-components exposed via Object.assign */
  subComponents?: string[];
  status?: "stable" | "experimental";
  /** Subframe library reference */
  sourceRef?: string;
}

/** Standard shape every ds component folder exports from meta.ts. */
export function defineMeta(meta: ComponentMeta): ComponentMeta {
  return meta;
}
