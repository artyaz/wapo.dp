// Auto-generated demo loaders for Typography.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "accessibility-and-dark-mode": () => import("@/components/ui-demos/typography/accessibility-and-dark-mode"),
  "building-your-typeset": () => import("@/components/ui-demos/typography/building-your-typeset"),
  "custom-themes": () => import("@/components/ui-demos/typography/custom-themes"),
  "custom-typesets": () => import("@/components/ui-demos/typography/custom-typesets"),
  "opting-out": () => import("@/components/ui-demos/typography/opting-out"),
  "overrides": () => import("@/components/ui-demos/typography/overrides"),
  "responsive-table": () => import("@/components/ui-demos/typography/responsive-table"),
  "streaming-cursor": () => import("@/components/ui-demos/typography/streaming-cursor"),
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
