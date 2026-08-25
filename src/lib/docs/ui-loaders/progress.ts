// Auto-generated demo loaders for Progress.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "controlled": () => import("@/components/ui-demos/progress/controlled"),
  "label": () => import("@/components/ui-demos/progress/label"),
  "rtl": () => import("@/components/ui-demos/progress/rtl"),
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
