// Auto-generated demo loaders for Aspect Ratio.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "portrait": () => import("@/components/ui-demos/aspect-ratio/portrait"),
  "rtl": () => import("@/components/ui-demos/aspect-ratio/rtl"),
  "square": () => import("@/components/ui-demos/aspect-ratio/square"),
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
