// Auto-generated demo loaders for Mention Input.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/mention/basic"),
  "hashtag": () => import("@/components/ui-demos/mention/hashtag"),
  "popup": () => import("@/components/ui-demos/mention/popup"),
  "with-avatars": () => import("@/components/ui-demos/mention/with-avatars"),
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
