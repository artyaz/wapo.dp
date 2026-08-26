// Auto-generated demo loaders for Sidebar.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "changelog": () => import("@/components/ui-demos/sidebar/changelog"),
  "controlled-sidebar": () => import("@/components/ui-demos/sidebar/controlled-sidebar"),
  "sidebar": () => import("@/components/ui-demos/sidebar/sidebar"),
  "sidebarcontent": () => import("@/components/ui-demos/sidebar/sidebarcontent"),
  "sidebarfooter": () => import("@/components/ui-demos/sidebar/sidebarfooter"),
  "sidebargroup": () => import("@/components/ui-demos/sidebar/sidebargroup"),
  "sidebarheader": () => import("@/components/ui-demos/sidebar/sidebarheader"),
  "sidebarmenu": () => import("@/components/ui-demos/sidebar/sidebarmenu"),
  "sidebarmenuaction": () => import("@/components/ui-demos/sidebar/sidebarmenuaction"),
  "sidebarmenubadge": () => import("@/components/ui-demos/sidebar/sidebarmenubadge"),
  "sidebarmenubutton": () => import("@/components/ui-demos/sidebar/sidebarmenubutton"),
  "sidebarmenuskeleton": () => import("@/components/ui-demos/sidebar/sidebarmenuskeleton"),
  "sidebarmenusub": () => import("@/components/ui-demos/sidebar/sidebarmenusub"),
  "sidebarrail": () => import("@/components/ui-demos/sidebar/sidebarrail"),
  "sidebartrigger": () => import("@/components/ui-demos/sidebar/sidebartrigger"),
  "styling": () => import("@/components/ui-demos/sidebar/styling"),
  "usesidebar": () => import("@/components/ui-demos/sidebar/usesidebar"),
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
