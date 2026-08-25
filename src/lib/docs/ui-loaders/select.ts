// Auto-generated demo loaders for Select.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "align-item-with-trigger": () => import("@/components/ui-demos/select/align-item-with-trigger"),
  "disabled": () => import("@/components/ui-demos/select/disabled"),
  "groups": () => import("@/components/ui-demos/select/groups"),
  "invalid": () => import("@/components/ui-demos/select/invalid"),
  "rtl": () => import("@/components/ui-demos/select/rtl"),
  "scrollable": () => import("@/components/ui-demos/select/scrollable"),
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
