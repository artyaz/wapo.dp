// Auto-generated demo loaders for Context Menu.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/context-menu/basic"),
  "checkboxes": () => import("@/components/ui-demos/context-menu/checkboxes"),
  "destructive": () => import("@/components/ui-demos/context-menu/destructive"),
  "groups": () => import("@/components/ui-demos/context-menu/groups"),
  "icons": () => import("@/components/ui-demos/context-menu/icons"),
  "radio": () => import("@/components/ui-demos/context-menu/radio"),
  "rtl": () => import("@/components/ui-demos/context-menu/rtl"),
  "shortcuts": () => import("@/components/ui-demos/context-menu/shortcuts"),
  "sides": () => import("@/components/ui-demos/context-menu/sides"),
  "submenu": () => import("@/components/ui-demos/context-menu/submenu"),
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
