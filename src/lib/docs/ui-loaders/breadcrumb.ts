// Auto-generated demo loaders for Breadcrumb.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/breadcrumb/basic"),
  "collapsed": () => import("@/components/ui-demos/breadcrumb/collapsed"),
  "custom-separator": () => import("@/components/ui-demos/breadcrumb/custom-separator"),
  "dropdown": () => import("@/components/ui-demos/breadcrumb/dropdown"),
  "link-component": () => import("@/components/ui-demos/breadcrumb/link-component"),
  "rtl": () => import("@/components/ui-demos/breadcrumb/rtl"),
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
