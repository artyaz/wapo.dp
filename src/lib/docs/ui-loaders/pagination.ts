// Auto-generated demo loaders for Pagination.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "icons-only": () => import("@/components/ui-demos/pagination/icons-only"),
  "rtl": () => import("@/components/ui-demos/pagination/rtl"),
  "simple": () => import("@/components/ui-demos/pagination/simple"),
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
