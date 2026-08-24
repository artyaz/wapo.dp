import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "AtmosphereScrim",
  slug: "atmosphere-scrim",
  category: "glass-primitives",
  description:
    "A pure blur field: four stacked backdrop-blur layers (1, 4, 10 and 18px), each masked with an upward gradient so the defocus deepens smoothly toward the bottom edge. It carries no tint and renders no content of its own — it only grades whatever scrolls beneath it. Mount it inside a relatively positioned parent (it pins itself to inset-x-0 bottom-0 at h-28) and dock bars or chips on top of it.",
  usage:
    "Place inside a relative container; the scrim pins to the bottom edge and pointer events pass straight through it.",
  tags: ["glass", "scrim", "blur", "mask", "atmosphere"],
  props: [
    {
      name: "className",
      type: "string",
      description:
        "Classes merged onto the scrim wrapper — override height or stacking, never add a background.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe Atmosphere Scrim_e21ccf51-e972-46e9-a78b-f276a6619e51",
});
