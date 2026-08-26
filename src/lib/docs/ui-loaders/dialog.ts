// Auto-generated demo loaders for Dialog.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "custom-close-button": () => import("@/components/ui-demos/dialog/custom-close-button"),
  "no-close-button": () => import("@/components/ui-demos/dialog/no-close-button"),
  "rtl": () => import("@/components/ui-demos/dialog/rtl"),
  "scrollable-content": () => import("@/components/ui-demos/dialog/scrollable-content"),
  "sticky-footer": () => import("@/components/ui-demos/dialog/sticky-footer"),
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
