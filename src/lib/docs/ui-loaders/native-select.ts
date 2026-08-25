// Auto-generated demo loaders for Native Select.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "disabled": () => import("@/components/ui-demos/native-select/disabled"),
  "groups": () => import("@/components/ui-demos/native-select/groups"),
  "invalid": () => import("@/components/ui-demos/native-select/invalid"),
  "rtl": () => import("@/components/ui-demos/native-select/rtl"),
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
