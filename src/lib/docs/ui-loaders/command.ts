// Auto-generated demo loaders for Command.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/command/basic"),
  "groups": () => import("@/components/ui-demos/command/groups"),
  "rtl": () => import("@/components/ui-demos/command/rtl"),
  "scrollable": () => import("@/components/ui-demos/command/scrollable"),
  "shortcuts": () => import("@/components/ui-demos/command/shortcuts"),
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
