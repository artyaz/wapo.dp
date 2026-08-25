// Auto-generated demo loaders for Drawer.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "custom-sizes": () => import("@/components/ui-demos/drawer/custom-sizes"),
  "nested": () => import("@/components/ui-demos/drawer/nested"),
  "non-modal": () => import("@/components/ui-demos/drawer/non-modal"),
  "position": () => import("@/components/ui-demos/drawer/position"),
  "responsive": () => import("@/components/ui-demos/drawer/responsive"),
  "snap-points": () => import("@/components/ui-demos/drawer/snap-points"),
  "swipe-handle": () => import("@/components/ui-demos/drawer/swipe-handle"),
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
