// Auto-generated demo loaders for Timeline.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/timeline/basic"),
  "with-icons": () => import("@/components/ui-demos/timeline/with-icons"),
  "alternating": () => import("@/components/ui-demos/timeline/alternating"),
  "compact": () => import("@/components/ui-demos/timeline/compact"),
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
