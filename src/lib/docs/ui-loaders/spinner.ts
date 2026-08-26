// Auto-generated demo loaders for Spinner.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "badge": () => import("@/components/ui-demos/spinner/badge"),
  "button": () => import("@/components/ui-demos/spinner/button"),
  "customization": () => import("@/components/ui-demos/spinner/customization"),
  "empty": () => import("@/components/ui-demos/spinner/empty"),
  "input-group": () => import("@/components/ui-demos/spinner/input-group"),
  "rtl": () => import("@/components/ui-demos/spinner/rtl"),
  "size": () => import("@/components/ui-demos/spinner/size"),
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
