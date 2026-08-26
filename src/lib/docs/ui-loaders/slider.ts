// Auto-generated demo loaders for Slider.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "controlled": () => import("@/components/ui-demos/slider/controlled"),
  "disabled": () => import("@/components/ui-demos/slider/disabled"),
  "multiple-thumbs": () => import("@/components/ui-demos/slider/multiple-thumbs"),
  "range": () => import("@/components/ui-demos/slider/range"),
  "rtl": () => import("@/components/ui-demos/slider/rtl"),
  "vertical": () => import("@/components/ui-demos/slider/vertical"),
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
