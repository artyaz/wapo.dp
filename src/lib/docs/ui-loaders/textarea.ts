// Auto-generated demo loaders for Textarea.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "button": () => import("@/components/ui-demos/textarea/button"),
  "disabled": () => import("@/components/ui-demos/textarea/disabled"),
  "field": () => import("@/components/ui-demos/textarea/field"),
  "invalid": () => import("@/components/ui-demos/textarea/invalid"),
  "rtl": () => import("@/components/ui-demos/textarea/rtl"),
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
