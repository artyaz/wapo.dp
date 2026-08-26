// Auto-generated demo loaders for Skeleton.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "avatar": () => import("@/components/ui-demos/skeleton/avatar"),
  "card": () => import("@/components/ui-demos/skeleton/card"),
  "form": () => import("@/components/ui-demos/skeleton/form"),
  "rtl": () => import("@/components/ui-demos/skeleton/rtl"),
  "table": () => import("@/components/ui-demos/skeleton/table"),
  "text": () => import("@/components/ui-demos/skeleton/text"),
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
