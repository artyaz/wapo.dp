// Auto-generated demo loaders for Empty.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "avatar-group": () => import("@/components/ui-demos/empty/avatar-group"),
  "avatar": () => import("@/components/ui-demos/empty/avatar"),
  "background": () => import("@/components/ui-demos/empty/background"),
  "inputgroup": () => import("@/components/ui-demos/empty/inputgroup"),
  "outline": () => import("@/components/ui-demos/empty/outline"),
  "rtl": () => import("@/components/ui-demos/empty/rtl"),
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
