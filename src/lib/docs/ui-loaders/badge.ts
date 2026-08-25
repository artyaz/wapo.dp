// Auto-generated demo loaders for Badge.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "custom-colors": () => import("@/components/ui-demos/badge/custom-colors"),
  "link": () => import("@/components/ui-demos/badge/link"),
  "rtl": () => import("@/components/ui-demos/badge/rtl"),
  "variants": () => import("@/components/ui-demos/badge/variants"),
  "with-icon": () => import("@/components/ui-demos/badge/with-icon"),
  "with-spinner": () => import("@/components/ui-demos/badge/with-spinner"),
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
