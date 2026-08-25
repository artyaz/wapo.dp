// Auto-generated demo loaders for Input.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "badge": () => import("@/components/ui-demos/input/badge"),
  "basic": () => import("@/components/ui-demos/input/basic"),
  "button-group": () => import("@/components/ui-demos/input/button-group"),
  "disabled": () => import("@/components/ui-demos/input/disabled"),
  "field-group": () => import("@/components/ui-demos/input/field-group"),
  "field": () => import("@/components/ui-demos/input/field"),
  "file": () => import("@/components/ui-demos/input/file"),
  "form": () => import("@/components/ui-demos/input/form"),
  "grid": () => import("@/components/ui-demos/input/grid"),
  "inline": () => import("@/components/ui-demos/input/inline"),
  "input-group": () => import("@/components/ui-demos/input/input-group"),
  "invalid": () => import("@/components/ui-demos/input/invalid"),
  "required": () => import("@/components/ui-demos/input/required"),
  "rtl": () => import("@/components/ui-demos/input/rtl"),
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
