// Auto-generated demo loaders for Hover Card.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/hover-card/basic"),
  "positioning": () => import("@/components/ui-demos/hover-card/positioning"),
  "rtl": () => import("@/components/ui-demos/hover-card/rtl"),
  "sides": () => import("@/components/ui-demos/hover-card/sides"),
  "trigger-delays": () => import("@/components/ui-demos/hover-card/trigger-delays"),
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
