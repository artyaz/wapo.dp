// Auto-generated demo loaders for Bubble.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "accessibility": () => import("@/components/ui-demos/bubble/accessibility"),
  "alignment": () => import("@/components/ui-demos/bubble/alignment"),
  "bubble-group": () => import("@/components/ui-demos/bubble/bubble-group"),
  "links-and-buttons": () => import("@/components/ui-demos/bubble/links-and-buttons"),
  "popover": () => import("@/components/ui-demos/bubble/popover"),
  "reactions": () => import("@/components/ui-demos/bubble/reactions"),
  "show-more-collapsible": () => import("@/components/ui-demos/bubble/show-more-collapsible"),
  "tooltip": () => import("@/components/ui-demos/bubble/tooltip"),
  "variants": () => import("@/components/ui-demos/bubble/variants"),
};

export async function loadVariant(variantSlug: string): Promise<any | null> {
  const loader = DEMO_LOADERS[variantSlug];
  if (!loader) return null;
  try {
    return await loader();
  } catch {
    return null;
  }
}
