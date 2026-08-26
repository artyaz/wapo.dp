// Auto-generated demo loaders for Accordion.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/accordion/basic"),
  "borders": () => import("@/components/ui-demos/accordion/borders"),
  "card": () => import("@/components/ui-demos/accordion/card"),
  "disabled": () => import("@/components/ui-demos/accordion/disabled"),
  "multiple": () => import("@/components/ui-demos/accordion/multiple"),
  "rtl": () => import("@/components/ui-demos/accordion/rtl"),
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
