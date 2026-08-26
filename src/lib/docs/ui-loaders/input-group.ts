// Auto-generated demo loaders for Input Group.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "align": () => import("@/components/ui-demos/input-group/align"),
  "button": () => import("@/components/ui-demos/input-group/button"),
  "custom-input": () => import("@/components/ui-demos/input-group/custom-input"),
  "dropdown": () => import("@/components/ui-demos/input-group/dropdown"),
  "icon": () => import("@/components/ui-demos/input-group/icon"),
  "kbd": () => import("@/components/ui-demos/input-group/kbd"),
  "rtl": () => import("@/components/ui-demos/input-group/rtl"),
  "spinner": () => import("@/components/ui-demos/input-group/spinner"),
  "text": () => import("@/components/ui-demos/input-group/text"),
  "textarea": () => import("@/components/ui-demos/input-group/textarea"),
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
