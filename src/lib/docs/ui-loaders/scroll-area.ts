// Auto-generated demo loaders for Scroll Area.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "horizontal": () => import("@/components/ui-demos/scroll-area/horizontal"),
  "rtl": () => import("@/components/ui-demos/scroll-area/rtl"),
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
