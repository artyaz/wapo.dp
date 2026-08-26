// Auto-generated demo loaders for Button Group.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "accessibility": () => import("@/components/ui-demos/button-group/accessibility"),
  "dropdown-menu": () => import("@/components/ui-demos/button-group/dropdown-menu"),
  "input-group": () => import("@/components/ui-demos/button-group/input-group"),
  "input": () => import("@/components/ui-demos/button-group/input"),
  "nested": () => import("@/components/ui-demos/button-group/nested"),
  "orientation": () => import("@/components/ui-demos/button-group/orientation"),
  "popover": () => import("@/components/ui-demos/button-group/popover"),
  "rtl": () => import("@/components/ui-demos/button-group/rtl"),
  "select": () => import("@/components/ui-demos/button-group/select"),
  "separator": () => import("@/components/ui-demos/button-group/separator"),
  "size": () => import("@/components/ui-demos/button-group/size"),
  "split": () => import("@/components/ui-demos/button-group/split"),
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
