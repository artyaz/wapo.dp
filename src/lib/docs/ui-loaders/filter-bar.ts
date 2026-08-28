// Auto-generated demo loaders for Filter Bar.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/filter-bar/basic"),
  "query-builder": () => import("@/components/ui-demos/filter-bar/query-builder"),
  "sort-rules": () => import("@/components/ui-demos/filter-bar/sort-rules"),
  "saved-filters": () => import("@/components/ui-demos/filter-bar/saved-filters"),
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
