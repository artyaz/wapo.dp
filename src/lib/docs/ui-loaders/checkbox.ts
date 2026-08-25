// Auto-generated demo loaders for Checkbox.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/checkbox/basic"),
  "checked-state": () => import("@/components/ui-demos/checkbox/checked-state"),
  "description": () => import("@/components/ui-demos/checkbox/description"),
  "disabled": () => import("@/components/ui-demos/checkbox/disabled"),
  "group": () => import("@/components/ui-demos/checkbox/group"),
  "invalid-state": () => import("@/components/ui-demos/checkbox/invalid-state"),
  "rtl": () => import("@/components/ui-demos/checkbox/rtl"),
  "table": () => import("@/components/ui-demos/checkbox/table"),
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
