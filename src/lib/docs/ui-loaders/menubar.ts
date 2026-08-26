// Auto-generated demo loaders for Menubar.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "checkbox": () => import("@/components/ui-demos/menubar/checkbox"),
  "radio": () => import("@/components/ui-demos/menubar/radio"),
  "rtl": () => import("@/components/ui-demos/menubar/rtl"),
  "submenu": () => import("@/components/ui-demos/menubar/submenu"),
  "with-icons": () => import("@/components/ui-demos/menubar/with-icons"),
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
