// Auto-generated demo loaders for Dropdown Menu.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "avatar": () => import("@/components/ui-demos/dropdown-menu/avatar"),
  "basic": () => import("@/components/ui-demos/dropdown-menu/basic"),
  "checkboxes-icons": () => import("@/components/ui-demos/dropdown-menu/checkboxes-icons"),
  "checkboxes": () => import("@/components/ui-demos/dropdown-menu/checkboxes"),
  "complex": () => import("@/components/ui-demos/dropdown-menu/complex"),
  "destructive": () => import("@/components/ui-demos/dropdown-menu/destructive"),
  "icons": () => import("@/components/ui-demos/dropdown-menu/icons"),
  "radio-group": () => import("@/components/ui-demos/dropdown-menu/radio-group"),
  "radio-icons": () => import("@/components/ui-demos/dropdown-menu/radio-icons"),
  "rtl": () => import("@/components/ui-demos/dropdown-menu/rtl"),
  "shortcuts": () => import("@/components/ui-demos/dropdown-menu/shortcuts"),
  "submenu": () => import("@/components/ui-demos/dropdown-menu/submenu"),
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
