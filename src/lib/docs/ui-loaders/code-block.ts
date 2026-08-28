// Auto-generated demo loaders for Code Block.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/code-block/basic"),
  "syntax-highlight": () => import("@/components/ui-demos/code-block/syntax-highlight"),
  "with-copy": () => import("@/components/ui-demos/code-block/with-copy"),
  "line-numbers": () => import("@/components/ui-demos/code-block/line-numbers"),
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
