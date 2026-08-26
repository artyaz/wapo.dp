// Auto-generated demo loaders for Message.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "accessibility": () => import("@/components/ui-demos/message/accessibility"),
  "actions": () => import("@/components/ui-demos/message/actions"),
  "attachment": () => import("@/components/ui-demos/message/attachment"),
  "avatar": () => import("@/components/ui-demos/message/avatar"),
  "group": () => import("@/components/ui-demos/message/group"),
  "header-and-footer": () => import("@/components/ui-demos/message/header-and-footer"),
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
