import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "TextField",
  slug: "text-field",
  category: "inputs",
  description:
    "The core text input of the Praxis form system. The root renders the field anatomy — caption label, 2px-bordered body on panel glass, help text — while TextField.Input and TextField TextArea supply the unstyled control that goes inside. Focus feedback is ink weight, not glow: the border deepens to neutral-600 on focus-within, and the error state swaps the border and help text to the destructive ramp. Leading and trailing slots hold icons or affordances without disturbing the 13px vertical padding.",
  usage:
    "Compose TextField with a TextField.Input (or TextArea) child; add label, helpText and error to the root.",
  tags: ["input", "form", "field", "inputs"],
  props: [
    {
      name: "label",
      type: "React.ReactNode",
      description: "Caption rendered above the field body.",
    },
    {
      name: "helpText",
      type: "React.ReactNode",
      description:
        "Caption rendered below the field; turns destructive-500 when error is set.",
    },
    {
      name: "error",
      type: "boolean",
      default: "false",
      description:
        "Error state — border switches to the destructive ramp and help text turns red.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description:
        "Dims the whole field to 40% opacity and disables pointer events.",
    },
    {
      name: "leading",
      type: "React.ReactNode",
      description: "Affordance rendered inside the field, before the input.",
    },
    {
      name: "trailing",
      type: "React.ReactNode",
      description: "Affordance rendered inside the field, after the input.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "The control itself — typically TextField.Input.",
    },
    {
      name: "className",
      type: "string",
      description: "Classes merged onto the field root.",
    },
    {
      name: "Input.type",
      type: '"text" | "password" | "email" | "number" | "tel" | "url" | "search"',
      default: '"text"',
      description: "Input type; everything but the listed values falls back to text.",
    },
    {
      name: "Input.placeholder",
      type: "React.ReactNode",
      description: "Placeholder text rendered at neutral-500.",
    },
    {
      name: "Input.value",
      type: "React.ReactNode",
      description: "Input value (string in practice).",
    },
    {
      name: "Input.onChange",
      type: "(event: React.ChangeEvent<HTMLInputElement>) => void",
      description: "Change handler forwarded to the native input.",
    },
    {
      name: "TextArea.placeholder",
      type: "React.ReactNode",
      description: "Placeholder text for the multiline control.",
    },
    {
      name: "TextArea.value",
      type: "React.ReactNode",
      description: "Value for the multiline control (string in practice).",
    },
  ],
  subComponents: ["Input", "TextArea"],
  status: "stable",
  sourceRef: "Subframe Text Field_99bc1bab-36f8-4c60-b1a5-9fc47538e519",
});
