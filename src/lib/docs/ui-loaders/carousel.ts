// Auto-generated demo loaders for Carousel.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "api": () => import("@/components/ui-demos/carousel/api"),
  "events": () => import("@/components/ui-demos/carousel/events"),
  "options": () => import("@/components/ui-demos/carousel/options"),
  "orientation": () => import("@/components/ui-demos/carousel/orientation"),
  "plugins": () => import("@/components/ui-demos/carousel/plugins"),
  "rtl": () => import("@/components/ui-demos/carousel/rtl"),
  "spacing": () => import("@/components/ui-demos/carousel/spacing"),
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
