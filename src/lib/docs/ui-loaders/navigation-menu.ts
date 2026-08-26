// Auto-generated demo loaders for Navigation Menu.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "link-component": () => import("@/components/ui-demos/navigation-menu/link-component"),
  "rtl": () => import("@/components/ui-demos/navigation-menu/rtl"),
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
