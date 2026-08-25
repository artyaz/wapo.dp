// Auto-generated demo loaders for Chart.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "accessibility": () => import("@/components/ui-demos/chart/accessibility"),
  "component": () => import("@/components/ui-demos/chart/component"),
  "legend": () => import("@/components/ui-demos/chart/legend"),
  "rtl": () => import("@/components/ui-demos/chart/rtl"),
  "theming": () => import("@/components/ui-demos/chart/theming"),
  "tooltip": () => import("@/components/ui-demos/chart/tooltip"),
  "your-first-chart": () => import("@/components/ui-demos/chart/your-first-chart"),
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
