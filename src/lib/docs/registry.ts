/**
 * Static component registry + resilient dynamic meta/demo loaders for the
 * Praxis documentation site.
 *
 * The registry is the single index of every ported Subframe component
 * (47 components + 3 layouts = 50 entries, in the export's index order).
 * Sibling agents port each entry into `src/components/ds/<Name>/` with a
 * default `meta.ts` (defineMeta result) and a default `demo.tsx`
 * (component + named `demoSource` string).
 *
 * Loader specifiers are LITERAL per entry (never template strings) so the
 * bundler can statically split every meta/demo module — a dynamic
 * `import(\`@/components/ds/${name}/meta\`)` would not be bundled.
 */

import type { ComponentType } from "react";
import { CATEGORIES } from "@/lib/docs/types";
import type { CategoryId, ComponentMeta } from "@/lib/docs/types";

/** One entry of the static component index. */
export interface RegistryEntry {
  /** PascalCase export name, e.g. "GlassChip" — also the ds folder name. */
  name: string;
  /** Kebab-case URL slug, e.g. "glass-chip". */
  slug: string;
  /** Documentation category. */
  category: CategoryId;
}

/**
 * The static index of all ported components and layouts, derived from
 * `extracted/subframe-export/components/index.ts` (same order).
 *
 * Category conflicts resolved per the batch plan:
 * - JsonTreeNode → "code-editor" (data-display listing overridden)
 * - DiffRow → "data-display" (code-editor listing overridden)
 */
export const COMPONENT_REGISTRY: RegistryEntry[] = [
  { name: "GlassChip", slug: "glass-chip", category: "glass-primitives" },
  { name: "CrosshairTag", slug: "crosshair-tag", category: "data-visualization" },
  { name: "MiniMap", slug: "mini-map", category: "laid-objects" },
  { name: "PlayerBar", slug: "player-bar", category: "laid-objects" },
  { name: "TransportBar", slug: "transport-bar", category: "laid-objects" },
  { name: "FloatingToolbar", slug: "floating-toolbar", category: "laid-objects" },
  { name: "GlassDisplacement", slug: "glass-displacement", category: "glass-primitives" },
  { name: "GlassRefraction", slug: "glass-refraction", category: "glass-primitives" },
  { name: "MaterialTokens", slug: "material-tokens", category: "glass-primitives" },
  { name: "AtmosphereScrim", slug: "atmosphere-scrim", category: "glass-primitives" },
  { name: "GlassMaterialProvider", slug: "glass-material-provider", category: "glass-primitives" },
  { name: "StatTile", slug: "stat-tile", category: "surfaces" },
  { name: "QueryInput", slug: "query-input", category: "inputs" },
  { name: "AssetCard", slug: "asset-card", category: "media" },
  { name: "MediaClip", slug: "media-clip", category: "media" },
  { name: "TrackHeader", slug: "track-header", category: "media" },
  { name: "TimelineRuler", slug: "timeline-ruler", category: "data-visualization" },
  { name: "WaveformStrip", slug: "waveform-strip", category: "data-visualization" },
  { name: "PanelTile", slug: "panel-tile", category: "surfaces" },
  { name: "TimeScrubber", slug: "time-scrubber", category: "data-visualization" },
  { name: "CandleSeries", slug: "candle-series", category: "data-visualization" },
  { name: "Sparkline", slug: "sparkline", category: "data-visualization" },
  { name: "JsonTreeNode", slug: "json-tree-node", category: "code-editor" },
  { name: "TerminalLine", slug: "terminal-line", category: "code-editor" },
  { name: "MethodChip", slug: "method-chip", category: "indicators" },
  { name: "EntityTabs", slug: "entity-tabs", category: "indicators" },
  { name: "DiffRow", slug: "diff-row", category: "data-display" },
  { name: "ActivityEvent", slug: "activity-event", category: "data-display" },
  { name: "RelationshipGrid", slug: "relationship-grid", category: "data-display" },
  { name: "FormSection", slug: "form-section", category: "inputs" },
  { name: "SlaTimer", slug: "sla-timer", category: "data-display" },
  { name: "RecordHeader", slug: "record-header", category: "data-display" },
  { name: "EditorTab", slug: "editor-tab", category: "code-editor" },
  { name: "FileTreeRow", slug: "file-tree-row", category: "code-editor" },
  { name: "CodePane", slug: "code-pane", category: "code-editor" },
  { name: "InspectorRow", slug: "inspector-row", category: "code-editor" },
  { name: "LayerTreeRow", slug: "layer-tree-row", category: "code-editor" },
  { name: "CanvasNode", slug: "canvas-node", category: "code-editor" },
  { name: "AskBar", slug: "ask-bar", category: "inputs" },
  { name: "AgentActivity", slug: "agent-activity", category: "ai-elements" },
  { name: "Sheet", slug: "sheet", category: "surfaces" },
  { name: "Button", slug: "button", category: "inputs" },
  { name: "TextField", slug: "text-field", category: "inputs" },
  { name: "StatusBadge", slug: "status-badge", category: "indicators" },
  { name: "Card", slug: "card", category: "surfaces" },
  { name: "DefaultPageLayout", slug: "default-page-layout", category: "layouts" },
  { name: "DialogLayout", slug: "dialog-layout", category: "layouts" },
  { name: "DrawerLayout", slug: "drawer-layout", category: "layouts" },
  { name: "Dialog", slug: "dialog", category: "surfaces" },
  { name: "Drawer", slug: "drawer", category: "surfaces" },
  { name: "UserMessage", slug: "user-message", category: "ai-elements" },
  { name: "PayloadInspector", slug: "payload-inspector", category: "ai-elements" },
  { name: "InlineChips", slug: "inline-chips", category: "ai-elements" },
  { name: "AssistantMessage", slug: "assistant-message", category: "ai-elements" },
  { name: "JumpToLatest", slug: "jump-to-latest", category: "ai-elements" },
];

/** slug → registry entry lookup. */
const REGISTRY_BY_SLUG: ReadonlyMap<string, RegistryEntry> = new Map(
  COMPONENT_REGISTRY.map((entry) => [entry.slug, entry]),
);

/**
 * Component count per category. Every known CategoryId key is present
 * (zero-filled), even if a category is currently empty.
 */
export function getCategoryCounts(): Record<CategoryId, number> {
  const counts = {} as Record<CategoryId, number>;
  for (const category of CATEGORIES) {
    counts[category.id] = 0;
  }
  for (const entry of COMPONENT_REGISTRY) {
    counts[entry.category] += 1;
  }
  return counts;
}

/**
 * Literal dynamic-import specifiers, keyed by the PascalName of the registry
 * entry. One entry per component — never a template string — so every
 * meta module becomes its own statically analyzable chunk.
 */
const META_LOADERS: Record<string, () => Promise<{ default: ComponentMeta }>> = {
  GlassChip: () => import("@/components/ds/GlassChip/meta"),
  CrosshairTag: () => import("@/components/ds/CrosshairTag/meta"),
  MiniMap: () => import("@/components/ds/MiniMap/meta"),
  PlayerBar: () => import("@/components/ds/PlayerBar/meta"),
  TransportBar: () => import("@/components/ds/TransportBar/meta"),
  FloatingToolbar: () => import("@/components/ds/FloatingToolbar/meta"),
  GlassDisplacement: () => import("@/components/ds/GlassDisplacement/meta"),
  GlassRefraction: () => import("@/components/ds/GlassRefraction/meta"),
  MaterialTokens: () => import("@/components/ds/MaterialTokens/meta"),
  AtmosphereScrim: () => import("@/components/ds/AtmosphereScrim/meta"),
  GlassMaterialProvider: () => import("@/components/ds/GlassMaterialProvider/meta"),
  StatTile: () => import("@/components/ds/StatTile/meta"),
  QueryInput: () => import("@/components/ds/QueryInput/meta"),
  AssetCard: () => import("@/components/ds/AssetCard/meta"),
  MediaClip: () => import("@/components/ds/MediaClip/meta"),
  TrackHeader: () => import("@/components/ds/TrackHeader/meta"),
  TimelineRuler: () => import("@/components/ds/TimelineRuler/meta"),
  WaveformStrip: () => import("@/components/ds/WaveformStrip/meta"),
  PanelTile: () => import("@/components/ds/PanelTile/meta"),
  TimeScrubber: () => import("@/components/ds/TimeScrubber/meta"),
  CandleSeries: () => import("@/components/ds/CandleSeries/meta"),
  Sparkline: () => import("@/components/ds/Sparkline/meta"),
  JsonTreeNode: () => import("@/components/ds/JsonTreeNode/meta"),
  TerminalLine: () => import("@/components/ds/TerminalLine/meta"),
  MethodChip: () => import("@/components/ds/MethodChip/meta"),
  EntityTabs: () => import("@/components/ds/EntityTabs/meta"),
  DiffRow: () => import("@/components/ds/DiffRow/meta"),
  ActivityEvent: () => import("@/components/ds/ActivityEvent/meta"),
  RelationshipGrid: () => import("@/components/ds/RelationshipGrid/meta"),
  FormSection: () => import("@/components/ds/FormSection/meta"),
  SlaTimer: () => import("@/components/ds/SlaTimer/meta"),
  RecordHeader: () => import("@/components/ds/RecordHeader/meta"),
  EditorTab: () => import("@/components/ds/EditorTab/meta"),
  FileTreeRow: () => import("@/components/ds/FileTreeRow/meta"),
  CodePane: () => import("@/components/ds/CodePane/meta"),
  InspectorRow: () => import("@/components/ds/InspectorRow/meta"),
  LayerTreeRow: () => import("@/components/ds/LayerTreeRow/meta"),
  CanvasNode: () => import("@/components/ds/CanvasNode/meta"),
  AskBar: () => import("@/components/ds/AskBar/meta"),
  AgentActivity: () => import("@/components/ds/AgentActivity/meta"),
  Sheet: () => import("@/components/ds/Sheet/meta"),
  Button: () => import("@/components/ds/Button/meta"),
  TextField: () => import("@/components/ds/TextField/meta"),
  StatusBadge: () => import("@/components/ds/StatusBadge/meta"),
  Card: () => import("@/components/ds/Card/meta"),
  DefaultPageLayout: () => import("@/components/ds/DefaultPageLayout/meta"),
  DialogLayout: () => import("@/components/ds/DialogLayout/meta"),
  DrawerLayout: () => import("@/components/ds/DrawerLayout/meta"),
  Dialog: () => import("@/components/ds/Dialog/meta"),
  Drawer: () => import("@/components/ds/Drawer/meta"),
  UserMessage: () => import("@/components/ds/UserMessage/meta"),
  PayloadInspector: () => import("@/components/ds/PayloadInspector/meta"),
  InlineChips: () => import("@/components/ds/InlineChips/meta"),
  AssistantMessage: () => import("@/components/ds/AssistantMessage/meta"),
  JumpToLatest: () => import("@/components/ds/JumpToLatest/meta"),
};

/** Shape of a `demo.tsx` module: default demo component + source string. */
interface DemoModule {
  default: ComponentType;
  demoSource: string;
}

/**
 * Literal dynamic-import specifiers for demos, keyed by the PascalName of
 * the registry entry (same rule as META_LOADERS — no template strings).
 */
const DEMO_LOADERS: Record<string, () => Promise<DemoModule>> = {
  GlassChip: () => import("@/components/ds/GlassChip/demo"),
  CrosshairTag: () => import("@/components/ds/CrosshairTag/demo"),
  MiniMap: () => import("@/components/ds/MiniMap/demo"),
  PlayerBar: () => import("@/components/ds/PlayerBar/demo"),
  TransportBar: () => import("@/components/ds/TransportBar/demo"),
  FloatingToolbar: () => import("@/components/ds/FloatingToolbar/demo"),
  GlassDisplacement: () => import("@/components/ds/GlassDisplacement/demo"),
  GlassRefraction: () => import("@/components/ds/GlassRefraction/demo"),
  MaterialTokens: () => import("@/components/ds/MaterialTokens/demo"),
  AtmosphereScrim: () => import("@/components/ds/AtmosphereScrim/demo"),
  GlassMaterialProvider: () => import("@/components/ds/GlassMaterialProvider/demo"),
  StatTile: () => import("@/components/ds/StatTile/demo"),
  QueryInput: () => import("@/components/ds/QueryInput/demo"),
  AssetCard: () => import("@/components/ds/AssetCard/demo"),
  MediaClip: () => import("@/components/ds/MediaClip/demo"),
  TrackHeader: () => import("@/components/ds/TrackHeader/demo"),
  TimelineRuler: () => import("@/components/ds/TimelineRuler/demo"),
  WaveformStrip: () => import("@/components/ds/WaveformStrip/demo"),
  PanelTile: () => import("@/components/ds/PanelTile/demo"),
  TimeScrubber: () => import("@/components/ds/TimeScrubber/demo"),
  CandleSeries: () => import("@/components/ds/CandleSeries/demo"),
  Sparkline: () => import("@/components/ds/Sparkline/demo"),
  JsonTreeNode: () => import("@/components/ds/JsonTreeNode/demo"),
  TerminalLine: () => import("@/components/ds/TerminalLine/demo"),
  MethodChip: () => import("@/components/ds/MethodChip/demo"),
  EntityTabs: () => import("@/components/ds/EntityTabs/demo"),
  DiffRow: () => import("@/components/ds/DiffRow/demo"),
  ActivityEvent: () => import("@/components/ds/ActivityEvent/demo"),
  RelationshipGrid: () => import("@/components/ds/RelationshipGrid/demo"),
  FormSection: () => import("@/components/ds/FormSection/demo"),
  SlaTimer: () => import("@/components/ds/SlaTimer/demo"),
  RecordHeader: () => import("@/components/ds/RecordHeader/demo"),
  EditorTab: () => import("@/components/ds/EditorTab/demo"),
  FileTreeRow: () => import("@/components/ds/FileTreeRow/demo"),
  CodePane: () => import("@/components/ds/CodePane/demo"),
  InspectorRow: () => import("@/components/ds/InspectorRow/demo"),
  LayerTreeRow: () => import("@/components/ds/LayerTreeRow/demo"),
  CanvasNode: () => import("@/components/ds/CanvasNode/demo"),
  AskBar: () => import("@/components/ds/AskBar/demo"),
  AgentActivity: () => import("@/components/ds/AgentActivity/demo"),
  Sheet: () => import("@/components/ds/Sheet/demo"),
  Button: () => import("@/components/ds/Button/demo"),
  TextField: () => import("@/components/ds/TextField/demo"),
  StatusBadge: () => import("@/components/ds/StatusBadge/demo"),
  Card: () => import("@/components/ds/Card/demo"),
  DefaultPageLayout: () => import("@/components/ds/DefaultPageLayout/demo"),
  DialogLayout: () => import("@/components/ds/DialogLayout/demo"),
  DrawerLayout: () => import("@/components/ds/DrawerLayout/demo"),
  Dialog: () => import("@/components/ds/Dialog/demo"),
  Drawer: () => import("@/components/ds/Drawer/demo"),
  UserMessage: () => import("@/components/ds/UserMessage/demo"),
  PayloadInspector: () => import("@/components/ds/PayloadInspector/demo"),
  InlineChips: () => import("@/components/ds/InlineChips/demo"),
  AssistantMessage: () => import("@/components/ds/AssistantMessage/demo"),
  JumpToLatest: () => import("@/components/ds/JumpToLatest/demo"),
};

/**
 * Load the documentation metadata for a component slug.
 *
 * Returns null for unknown slugs, missing modules, or import failures —
 * sibling agents port components in parallel, so the registry must tolerate
 * a module that does not exist (yet).
 */
export async function loadComponentMeta(
  slug: string,
): Promise<ComponentMeta | null> {
  const entry = REGISTRY_BY_SLUG.get(slug);
  if (!entry) return null;
  const loader = META_LOADERS[entry.name];
  if (typeof loader !== "function") return null;
  try {
    const mod = await loader();
    return mod.default ?? null;
  } catch {
    return null;
  }
}

/**
 * Load the live demo for a component slug: the default-exported demo
 * component plus its `demoSource` usage string.
 *
 * Same resilience contract as `loadComponentMeta` — null on unknown slug,
 * missing module or import failure. A missing `demoSource` export degrades
 * to an empty string rather than failing the whole demo.
 */
export async function loadComponentDemo(
  slug: string,
): Promise<{ Demo: ComponentType; demoSource: string } | null> {
  const entry = REGISTRY_BY_SLUG.get(slug);
  if (!entry) return null;
  const loader = DEMO_LOADERS[entry.name];
  if (typeof loader !== "function") return null;
  try {
    const mod = await loader();
    const Demo = mod.default;
    if (!Demo) return null;
    return {
      Demo,
      demoSource: typeof mod.demoSource === "string" ? mod.demoSource : "",
    };
  } catch {
    return null;
  }
}
