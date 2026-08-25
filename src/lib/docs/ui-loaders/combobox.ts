// Auto-generated demo loaders for Combobox.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "auto-highlight": () => import("@/components/ui-demos/combobox/auto-highlight"),
  "basic": () => import("@/components/ui-demos/combobox/basic"),
  "clear-button": () => import("@/components/ui-demos/combobox/clear-button"),
  "custom-items": () => import("@/components/ui-demos/combobox/custom-items"),
  "disabled": () => import("@/components/ui-demos/combobox/disabled"),
  "groups": () => import("@/components/ui-demos/combobox/groups"),
  "input-group": () => import("@/components/ui-demos/combobox/input-group"),
  "invalid": () => import("@/components/ui-demos/combobox/invalid"),
  "multiple-selection": () => import("@/components/ui-demos/combobox/multiple-selection"),
  "multiple": () => import("@/components/ui-demos/combobox/multiple"),
  "popup": () => import("@/components/ui-demos/combobox/popup"),
  "rtl": () => import("@/components/ui-demos/combobox/rtl"),
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
