// Auto-generated demo loaders for Sheet.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "no-close-button": () => import("@/components/ui-demos/sheet/no-close-button"),
  "rtl": () => import("@/components/ui-demos/sheet/rtl"),
  "side": () => import("@/components/ui-demos/sheet/side"),
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
