// Auto-generated demo loaders for Button.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "as-link": () => import("@/components/ui-demos/button/as-link"),
  "button-group": () => import("@/components/ui-demos/button/button-group"),
  "default": () => import("@/components/ui-demos/button/default"),
  "destructive": () => import("@/components/ui-demos/button/destructive"),
  "ghost": () => import("@/components/ui-demos/button/ghost"),
  "icon": () => import("@/components/ui-demos/button/icon"),
  "link": () => import("@/components/ui-demos/button/link"),
  "outline": () => import("@/components/ui-demos/button/outline"),
  "rounded": () => import("@/components/ui-demos/button/rounded"),
  "rtl": () => import("@/components/ui-demos/button/rtl"),
  "secondary": () => import("@/components/ui-demos/button/secondary"),
  "size": () => import("@/components/ui-demos/button/size"),
  "spinner": () => import("@/components/ui-demos/button/spinner"),
  "with-icon": () => import("@/components/ui-demos/button/with-icon"),
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
