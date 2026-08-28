// Auto-generated demo loaders for Kanban Board.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/kanban/basic"),
  "columns": () => import("@/components/ui-demos/kanban/columns"),
  "card-details": () => import("@/components/ui-demos/kanban/card-details"),
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
