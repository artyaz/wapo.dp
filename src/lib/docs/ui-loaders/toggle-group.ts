// Auto-generated demo loaders for Toggle Group.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "custom": () => import("@/components/ui-demos/toggle-group/custom"),
  "disabled": () => import("@/components/ui-demos/toggle-group/disabled"),
  "outline": () => import("@/components/ui-demos/toggle-group/outline"),
  "rtl": () => import("@/components/ui-demos/toggle-group/rtl"),
  "size": () => import("@/components/ui-demos/toggle-group/size"),
  "spacing": () => import("@/components/ui-demos/toggle-group/spacing"),
  "vertical": () => import("@/components/ui-demos/toggle-group/vertical"),
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
