// Auto-generated demo loaders for File Upload.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/file-upload/basic"),
  "dropzone": () => import("@/components/ui-demos/file-upload/dropzone"),
  "image-preview": () => import("@/components/ui-demos/file-upload/image-preview"),
  "restrictions": () => import("@/components/ui-demos/file-upload/restrictions"),
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
