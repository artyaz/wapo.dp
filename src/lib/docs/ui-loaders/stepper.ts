// Auto-generated demo loaders for Stepper.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/stepper/basic"),
  "vertical": () => import("@/components/ui-demos/stepper/vertical"),
  "clickable": () => import("@/components/ui-demos/stepper/clickable"),
  "with-content": () => import("@/components/ui-demos/stepper/with-content"),
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
