# Praxis — Design System

A calm, monochrome design-system documentation site built with liquid-glass materials. Praxis documents **58 production-ready components** — from primitives (Button, Card, TextField) through data-dense tooling surfaces (Sparkline, LayerTreeRow, InspectorRow) to a full **AI chat element family** (UserMessage, ThoughtHeader, PayloadInspector, JumpToLatest).

## Highlights

- **Liquid-glass material engine** — three-tier progressive strategy:
  1. SVG displacement maps (Chromium)
  2. WebGL refraction (Safari / Firefox)
  3. `backdrop-filter` fallback (everywhere else)
  Four material grades tune blur, saturation, tint, and displacement strength.
- **Monochrome language** — the brand scale is a warm neutral gray; semantic color is reserved for `success`, `warning`, and `destructive` only. No hue unless it carries meaning.
- **Three-role typography** — Inter for interface, Source Serif 4 for reading, IBM Plex Mono for data and code (`next/font`, zero layout shift).
- **AI chat surface family** — 8 components covering the full assistant transcript pattern: user message bubbles, collapsible execution/thought headers, aggregated tool summaries, granular action traces, a syntax-highlighted payload inspector, inline semantic chips (integration avatars, code pills, file-reference chips), the assistant response block, and a floating jump-to-latest button.
- **Verified at every width** — every component was screenshotted at wide / square / narrow aspect ratios and audited with a vision model; all blockers and majors are resolved.

## Getting started

```bash
bun install        # or npm install
bun run dev        # http://localhost:3000
```

Production build:

```bash
bun run build
bun run start
```

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, standalone output) |
| Styling | Tailwind CSS 4 (`@theme inline` tokens) |
| Language | TypeScript (strict) |
| State | zustand |
| Fonts | next/font — Inter, Source Serif 4, IBM Plex Mono |

## Project structure

```
src/
  app/                 # App shell, globals.css (design tokens), hash router entry
  components/
    ds/                # 58 design-system components
      <Name>/
        index.tsx      # the component
        meta.ts        # name, category, description
        demo.tsx       # live specimen + usage source
    site/              # docs-site chrome (AppShell, DemoStage, ComponentPreview…)
    ui/                # shadcn/ui primitives used by the docs shell
  lib/
    glass/             # glass engine: detection, displacement maps, surfaces
    docs/              # component registry
  views/               # site views (overview, components, tokens…)
```

## Component registry

58 components across categories including `ai-elements`, `inputs`, `data-display`, `layout`, `feedback`, `glass`, `media`, `tooling`, and `typography`. Each component ships with:

- A live, resizable specimen rendered on the docs stage
- Multiple variants where applicable
- Copyable usage source

## Design tokens

All tokens are defined once in `src/app/globals.css` and exposed to Tailwind via `@theme inline` — spacing, radii, elevation, the neutral brand ramp, glass material grades, and typography roles. Change a token, and the whole system follows.
