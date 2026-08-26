// Auto-generated demo loaders for Alert Dialog.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/alert-dialog/basic"),
  "destructive": () => import("@/components/ui-demos/alert-dialog/destructive"),
  "media": () => import("@/components/ui-demos/alert-dialog/media"),
  "rtl": () => import("@/components/ui-demos/alert-dialog/rtl"),
  "small-with-media": () => import("@/components/ui-demos/alert-dialog/small-with-media"),
  "small": () => import("@/components/ui-demos/alert-dialog/small"),
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
