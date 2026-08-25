// Auto-generated demo loaders for Switch.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "choice-card": () => import("@/components/ui-demos/switch/choice-card"),
  "description": () => import("@/components/ui-demos/switch/description"),
  "disabled": () => import("@/components/ui-demos/switch/disabled"),
  "invalid": () => import("@/components/ui-demos/switch/invalid"),
  "rtl": () => import("@/components/ui-demos/switch/rtl"),
  "size": () => import("@/components/ui-demos/switch/size"),
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
