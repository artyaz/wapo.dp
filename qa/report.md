# Praxis DS — Automated Visual QA Report

Generated: 2026-08-26T22:23:03.600Z

## Pipeline
- 180 random pairs × 3 components (121 components, each in 4–5 pairs)
- Conditions: 76 dark / 104 light · 30 RTL · 24 no-scroll · 22 dense-content · 76 scenario hints
- Each pair rendered as a realistic page, screenshotted under its conditions, audited by vision model `agy-image`

## Overall
- Pairs evaluated: 181 (page-errors: 0, api-errors: 0)
- Total issues reported: 194 (blocker 1 / major 102 / minor 91)
- Components with attributed issues: 82 of 121
- Page-level (composition) issues (not attributed to components): 28

## Components ranked by issue count

| Component | Blocker | Major | Minor | Distinct patterns |
|---|---|---|---|---|
| ds:RelationshipGrid | 0 | 4 | 1 | 5 |
| ds:MaterialTokens | 0 | 5 | 0 | 5 |
| ds:MediaClip | 0 | 3 | 1 | 4 |
| ds:TimelineRuler | 0 | 1 | 3 | 4 |
| ui:dialog | 0 | 1 | 3 | 4 |
| ds:FileTreeRow | 0 | 2 | 2 | 4 |
| ds:CanvasNode | 0 | 2 | 2 | 4 |
| ui:data-table | 0 | 2 | 2 | 4 |
| ds:AssistantMessage | 1 | 1 | 2 | 4 |
| ds:StatTile | 0 | 1 | 2 | 3 |
| ui:command | 0 | 1 | 2 | 3 |
| ui:message-scroller | 0 | 2 | 1 | 3 |
| ui:questionnaire | 0 | 1 | 2 | 3 |
| ui:calendar | 0 | 2 | 1 | 3 |
| ds:DialogLayout | 0 | 2 | 1 | 3 |
| ui:checkbox | 0 | 1 | 2 | 3 |
| ui:sidebar | 0 | 3 | 0 | 3 |
| ui:context-menu | 0 | 1 | 2 | 3 |
| ui:drawer | 0 | 1 | 2 | 3 |
| ui:bubble | 0 | 1 | 2 | 3 |
| ui:input-otp | 0 | 2 | 1 | 3 |
| ds:ActivityEvent | 0 | 2 | 1 | 3 |
| ui:tooltip | 0 | 3 | 0 | 3 |
| ds:Dialog | 0 | 3 | 0 | 3 |
| ds:Drawer | 0 | 1 | 2 | 3 |
| ds:Sheet | 0 | 2 | 0 | 2 |
| ds:AskBar | 0 | 1 | 1 | 2 |
| ds:DefaultPageLayout | 0 | 2 | 0 | 2 |
| ui:avatar | 0 | 0 | 2 | 2 |
| ui:dropdown-menu | 0 | 1 | 1 | 2 |
| ds:Card | 0 | 1 | 1 | 2 |
| ds:LayerTreeRow | 0 | 0 | 2 | 2 |
| ds:QueryInput | 0 | 1 | 1 | 2 |
| ds:JumpToLatest | 0 | 1 | 1 | 2 |
| ds:CrosshairTag | 0 | 1 | 1 | 2 |
| ui:breadcrumb | 0 | 0 | 2 | 2 |
| ds:ThoughtHeader | 0 | 1 | 1 | 2 |
| ui:switch | 0 | 1 | 1 | 2 |
| ds:CodePane | 0 | 2 | 0 | 2 |
| ui:menubar | 0 | 2 | 0 | 2 |
| ds:TimeScrubber | 0 | 1 | 1 | 2 |
| ds:GlassRefraction | 0 | 0 | 2 | 2 |
| ui:kbd | 0 | 1 | 1 | 2 |
| ds:PlayerBar | 0 | 1 | 1 | 2 |
| ds:PayloadInspector | 0 | 2 | 0 | 2 |
| ui:combobox | 0 | 0 | 2 | 2 |
| ds:TrackHeader | 0 | 0 | 2 | 2 |
| ds:EntityTabs | 0 | 0 | 2 | 2 |
| ds:GlassMaterialProvider | 0 | 0 | 1 | 1 |
| ds:InlineChips | 0 | 1 | 0 | 1 |
| ui:input-group | 0 | 1 | 0 | 1 |
| ui:progress | 0 | 1 | 0 | 1 |
| ds:MiniMap | 0 | 0 | 1 | 1 |
| ds:PanelTile | 0 | 0 | 1 | 1 |
| ui:chart | 0 | 0 | 1 | 1 |
| ui:skeleton | 0 | 0 | 1 | 1 |
| ds:UserMessage | 0 | 0 | 1 | 1 |
| ds:TextField | 0 | 1 | 0 | 1 |
| ui:item | 0 | 0 | 1 | 1 |
| ds:JsonTreeNode | 0 | 1 | 0 | 1 |
| ui:slider | 0 | 1 | 0 | 1 |
| ui:aspect-ratio | 0 | 1 | 0 | 1 |
| ui:attachment | 0 | 0 | 1 | 1 |
| ui:toggle | 0 | 1 | 0 | 1 |
| ui:native-select | 0 | 1 | 0 | 1 |
| ds:ActionTraces | 0 | 1 | 0 | 1 |
| ds:RecordHeader | 0 | 0 | 1 | 1 |
| ui:hover-card | 0 | 0 | 1 | 1 |
| ds:FloatingToolbar | 0 | 1 | 0 | 1 |
| ui:collapsible | 0 | 0 | 1 | 1 |
| ui:table | 0 | 0 | 1 | 1 |
| ds:DiffRow | 0 | 1 | 0 | 1 |
| ui:radio-group | 0 | 0 | 1 | 1 |
| ds:GlassChip | 0 | 1 | 0 | 1 |
| ds:InspectorRow | 0 | 0 | 1 | 1 |
| ui:carousel | 0 | 1 | 0 | 1 |
| ui:typography | 0 | 1 | 0 | 1 |
| ui:toast | 0 | 0 | 1 | 1 |
| ds:CandleSeries | 0 | 1 | 0 | 1 |
| ui:message | 0 | 1 | 0 | 1 |
| ui:alert-dialog | 0 | 1 | 0 | 1 |
| ui:toggle-group | 0 | 0 | 1 | 1 |

Full per-component detail: `qa/by-component/*.json`. Per-pair raw results: `qa/results/*.json`.