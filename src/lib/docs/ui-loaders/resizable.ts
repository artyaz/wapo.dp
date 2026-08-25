// Auto-generated demo loaders for Resizable.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "handle": () => import("@/components/ui-demos/resizable/handle"),
  "rtl": () => import("@/components/ui-demos/resizable/rtl"),
  "vertical": () => import("@/components/ui-demos/resizable/vertical"),
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
