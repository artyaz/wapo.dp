// Auto-generated demo loaders for Kbd.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "button": () => import("@/components/ui-demos/kbd/button"),
  "group": () => import("@/components/ui-demos/kbd/group"),
  "input-group": () => import("@/components/ui-demos/kbd/input-group"),
  "rtl": () => import("@/components/ui-demos/kbd/rtl"),
  "tooltip": () => import("@/components/ui-demos/kbd/tooltip"),
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
