// Auto-generated demo loaders for Attachment.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "accessibility": () => import("@/components/ui-demos/attachment/accessibility"),
  "group": () => import("@/components/ui-demos/attachment/group"),
  "image": () => import("@/components/ui-demos/attachment/image"),
  "sizes": () => import("@/components/ui-demos/attachment/sizes"),
  "states": () => import("@/components/ui-demos/attachment/states"),
  "trigger": () => import("@/components/ui-demos/attachment/trigger"),
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
