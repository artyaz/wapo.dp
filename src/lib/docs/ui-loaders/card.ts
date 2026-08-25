// Auto-generated demo loaders for Card.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "image": () => import("@/components/ui-demos/card/image"),
  "rtl": () => import("@/components/ui-demos/card/rtl"),
  "size": () => import("@/components/ui-demos/card/size"),
  "spacing": () => import("@/components/ui-demos/card/spacing"),
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
