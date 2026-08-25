// Auto-generated demo loaders for Separator.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "list": () => import("@/components/ui-demos/separator/list"),
  "menu": () => import("@/components/ui-demos/separator/menu"),
  "rtl": () => import("@/components/ui-demos/separator/rtl"),
  "vertical": () => import("@/components/ui-demos/separator/vertical"),
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
