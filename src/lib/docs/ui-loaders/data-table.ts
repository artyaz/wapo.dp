// Auto-generated demo loaders for Data Table.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "cell-formatting": () => import("@/components/ui-demos/data-table/cell-formatting"),
  "columns": () => import("@/components/ui-demos/data-table/columns"),
  "data-table": () => import("@/components/ui-demos/data-table/data-table"),
  "filtering": () => import("@/components/ui-demos/data-table/filtering"),
  "pagination": () => import("@/components/ui-demos/data-table/pagination"),
  "reusable-components": () => import("@/components/ui-demos/data-table/reusable-components"),
  "row-actions": () => import("@/components/ui-demos/data-table/row-actions"),
  "row-selection": () => import("@/components/ui-demos/data-table/row-selection"),
  "set-up-table-features": () => import("@/components/ui-demos/data-table/set-up-table-features"),
  "sorting": () => import("@/components/ui-demos/data-table/sorting"),
  "visibility": () => import("@/components/ui-demos/data-table/visibility"),
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
