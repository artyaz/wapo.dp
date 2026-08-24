import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "MaterialTokens",
  slug: "material-tokens",
  category: "glass-primitives",
  description:
    "The live reference card for the material hierarchy: a neutral-100 panel holding a warm-gray test backdrop and one Swatch per level — ultrathin, thin, regular, thick — each captioned with its exact tint · blur · saturation values in monospace. The swatches are real glass over a busy backdrop, so the card doubles as documentation and as a proof surface for the token ramp. Use it wherever the material system itself needs to be explained or verified.",
  usage:
    "Render the card directly, or lift MaterialTokens.Swatch to compose individual level specimens elsewhere.",
  tags: ["glass", "material", "tokens", "reference", "documentation"],
  props: [
    {
      name: "className",
      type: "string",
      description: "Classes merged onto the root card.",
    },
    {
      name: "Swatch.level",
      type: '"ultrathin" | "thin" | "regular" | "thick"',
      default: '"thin"',
      description:
        "Material level from the token ramp — drives the swatch's tint, backdrop-blur and backdrop-saturate values.",
    },
    {
      name: "Swatch.className",
      type: "string",
      description: "Classes merged onto the swatch row.",
    },
  ],
  subComponents: ["Swatch"],
  status: "stable",
  sourceRef: "Subframe MaterialTokens_540f13d5-167e-4f0e-890c-5c49ddc165a6",
});
