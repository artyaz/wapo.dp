// Auto-generated demo loaders for Toggle.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "disabled": () => import("@/components/ui-demos/toggle/disabled"),
  "outline": () => import("@/components/ui-demos/toggle/outline"),
  "rtl": () => import("@/components/ui-demos/toggle/rtl"),
  "size": () => import("@/components/ui-demos/toggle/size"),
  "with-text": () => import("@/components/ui-demos/toggle/with-text"),
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
