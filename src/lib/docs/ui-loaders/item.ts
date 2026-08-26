// Auto-generated demo loaders for Item.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "avatar": () => import("@/components/ui-demos/item/avatar"),
  "dropdown": () => import("@/components/ui-demos/item/dropdown"),
  "group": () => import("@/components/ui-demos/item/group"),
  "header": () => import("@/components/ui-demos/item/header"),
  "icon": () => import("@/components/ui-demos/item/icon"),
  "image": () => import("@/components/ui-demos/item/image"),
  "link": () => import("@/components/ui-demos/item/link"),
  "rtl": () => import("@/components/ui-demos/item/rtl"),
  "size": () => import("@/components/ui-demos/item/size"),
  "variant": () => import("@/components/ui-demos/item/variant"),
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
