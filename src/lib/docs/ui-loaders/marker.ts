// Auto-generated demo loaders for Marker.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "accessibility": () => import("@/components/ui-demos/marker/accessibility"),
  "border": () => import("@/components/ui-demos/marker/border"),
  "links-and-buttons": () => import("@/components/ui-demos/marker/links-and-buttons"),
  "separator": () => import("@/components/ui-demos/marker/separator"),
  "shimmer": () => import("@/components/ui-demos/marker/shimmer"),
  "status": () => import("@/components/ui-demos/marker/status"),
  "variants": () => import("@/components/ui-demos/marker/variants"),
  "with-icon": () => import("@/components/ui-demos/marker/with-icon"),
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
