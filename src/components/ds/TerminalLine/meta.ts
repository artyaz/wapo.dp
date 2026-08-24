import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "TerminalLine",
  slug: "terminal-line",
  category: "code-editor",
  description:
    "A single monospace line of terminal output that changes anatomy with its variant: prompt renders the path in success green, a $ sigil and the command in ink; stdout and spinner show plain or in-progress text (spinner prefixes ⟳); success prefixes ✓ and tints the text green; stderr renders destructive red. Stack lines inside a panel to transcript a whole session — CLI consoles, deploy logs and build output.",
  usage:
    "Stack TerminalLine rows in a bordered panel; give prompts path and command, and every other variant its text.",
  tags: ["terminal", "cli", "console", "log", "output"],
  props: [
    {
      name: "variant",
      type: '"prompt" | "stdout" | "spinner" | "success" | "stderr"',
      default: '"prompt"',
      description:
        "Line anatomy: prompt shows path/$/command; spinner prefixes ⟳; success prefixes ✓; stdout and stderr are plain text in neutral and destructive tints.",
    },
    {
      name: "path",
      type: "React.ReactNode",
      description:
        "Working-directory label rendered in success green before the $ sigil (prompt variant only).",
    },
    {
      name: "command",
      type: "React.ReactNode",
      description: "Command text after the $ sigil (prompt variant only).",
    },
    {
      name: "text",
      type: "React.ReactNode",
      description: "Output text for the stdout, spinner, success and stderr variants.",
    },
    {
      name: "className",
      type: "string",
      description: "Merged into the root div classes via twClassNames.",
    },
  ],
  status: "stable",
  sourceRef: "Subframe TerminalLine_2f1a8c2e-cf50-4a35-844a-72906a835859",
});
