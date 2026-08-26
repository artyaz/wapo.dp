// Auto-generated demo loaders for Tabs.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "disabled": () => import("@/components/ui-demos/tabs/disabled"),
  "icons": () => import("@/components/ui-demos/tabs/icons"),
  "line": () => import("@/components/ui-demos/tabs/line"),
  "rtl": () => import("@/components/ui-demos/tabs/rtl"),
  "vertical": () => import("@/components/ui-demos/tabs/vertical"),
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
