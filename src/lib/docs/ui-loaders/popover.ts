// Auto-generated demo loaders for Popover.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "align": () => import("@/components/ui-demos/popover/align"),
  "basic": () => import("@/components/ui-demos/popover/basic"),
  "rtl": () => import("@/components/ui-demos/popover/rtl"),
  "with-form": () => import("@/components/ui-demos/popover/with-form"),
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
