// Auto-generated demo loaders for Field.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "anatomy": () => import("@/components/ui-demos/field/anatomy"),
  "checkbox": () => import("@/components/ui-demos/field/checkbox"),
  "choice-card": () => import("@/components/ui-demos/field/choice-card"),
  "field-group": () => import("@/components/ui-demos/field/field-group"),
  "fieldset": () => import("@/components/ui-demos/field/fieldset"),
  "input": () => import("@/components/ui-demos/field/input"),
  "radio": () => import("@/components/ui-demos/field/radio"),
  "responsive-layout": () => import("@/components/ui-demos/field/responsive-layout"),
  "rtl": () => import("@/components/ui-demos/field/rtl"),
  "select": () => import("@/components/ui-demos/field/select"),
  "slider": () => import("@/components/ui-demos/field/slider"),
  "switch": () => import("@/components/ui-demos/field/switch"),
  "textarea": () => import("@/components/ui-demos/field/textarea"),
  "validation-and-errors": () => import("@/components/ui-demos/field/validation-and-errors"),
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
