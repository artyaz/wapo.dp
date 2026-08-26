// Auto-generated demo loaders for Radio Group.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "choice-card": () => import("@/components/ui-demos/radio-group/choice-card"),
  "description": () => import("@/components/ui-demos/radio-group/description"),
  "disabled": () => import("@/components/ui-demos/radio-group/disabled"),
  "fieldset": () => import("@/components/ui-demos/radio-group/fieldset"),
  "invalid": () => import("@/components/ui-demos/radio-group/invalid"),
  "rtl": () => import("@/components/ui-demos/radio-group/rtl"),
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
