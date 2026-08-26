// Auto-generated demo loaders for Collapsible.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/collapsible/basic"),
  "controlled-state": () => import("@/components/ui-demos/collapsible/controlled-state"),
  "file-tree": () => import("@/components/ui-demos/collapsible/file-tree"),
  "rtl": () => import("@/components/ui-demos/collapsible/rtl"),
  "settings-panel": () => import("@/components/ui-demos/collapsible/settings-panel"),
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
