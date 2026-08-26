// Auto-generated demo loaders for Table.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "actions": () => import("@/components/ui-demos/table/actions"),
  "footer": () => import("@/components/ui-demos/table/footer"),
  "rtl": () => import("@/components/ui-demos/table/rtl"),
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
