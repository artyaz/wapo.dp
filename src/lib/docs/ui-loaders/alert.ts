// Auto-generated demo loaders for Alert.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "action": () => import("@/components/ui-demos/alert/action"),
  "basic": () => import("@/components/ui-demos/alert/basic"),
  "custom-colors": () => import("@/components/ui-demos/alert/custom-colors"),
  "destructive": () => import("@/components/ui-demos/alert/destructive"),
  "rtl": () => import("@/components/ui-demos/alert/rtl"),
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
