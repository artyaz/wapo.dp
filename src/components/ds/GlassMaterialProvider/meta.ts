import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "GlassMaterialProvider",
  slug: "glass-material-provider",
  category: "glass-primitives",
  description:
    "The {strategy, level} context provider from the MaterialTokens spec, wired to the real runtime: it reads the negotiated strategy from the glass store (an explicit `strategy` prop overrides it) and exposes the pair through GlassMaterialContext. GlassSurface inherits the level when no material prop is passed, and useGlassMaterial() lets any consumer read both values. The provider contract is {strategy, level} — consumers own composition; the root renders as a plain invisible wrapper.",
  usage:
    "Wrap a region to set its default material level, then render GlassSurfaces without explicit material props.",
  tags: ["glass", "context", "materials", "provider"],
  props: [
    {
      name: "level",
      type: '"ultrathin" | "thin" | "regular" | "thick"',
      default: '"regular"',
      description:
        "Material level exposed to consumers through GlassMaterialContext.",
    },
    {
      name: "strategy",
      type: '"svg-displacement" | "webgl-refraction" | "backdrop-filter"',
      description:
        "Optional override; otherwise the runtime-negotiated strategy is exposed.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Composed inside the provider — consumers own composition.",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the plain wrapper root.",
    },
  ],
  subComponents: ["StrategyBadge"],
  status: "stable",
  sourceRef: "Subframe GlassMaterialProvider_a419419b-a7bd-4434-9783-108c97c85a4c",
});
