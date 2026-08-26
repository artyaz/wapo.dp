// Auto-generated demo loaders for Avatar.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "avatar-group-count": () => import("@/components/ui-demos/avatar/avatar-group-count"),
  "avatar-group-with-icon": () => import("@/components/ui-demos/avatar/avatar-group-with-icon"),
  "avatar-group": () => import("@/components/ui-demos/avatar/avatar-group"),
  "badge-with-icon": () => import("@/components/ui-demos/avatar/badge-with-icon"),
  "badge": () => import("@/components/ui-demos/avatar/badge"),
  "basic": () => import("@/components/ui-demos/avatar/basic"),
  "dropdown": () => import("@/components/ui-demos/avatar/dropdown"),
  "rtl": () => import("@/components/ui-demos/avatar/rtl"),
  "sizes": () => import("@/components/ui-demos/avatar/sizes"),
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
