import { defineMeta } from "@/lib/docs/types";

export default defineMeta({
  name: "JsonTreeNode",
  slug: "json-tree-node",
  category: "code-editor",
  description:
    "A JSON inspector tree for structured payloads. Leaf rows render a key with its value tinted by JSON type — strings in success green, numbers in tabular ink, booleans and null in warning amber — while Branch rows own the braces, the ▸/▾ chevron and the hairline indent rail for nested levels. Collapsed branches swap their children for a quiet badge like “{…} 3 keys”, and array items trade their key for an index. Use it in API response viewers, record inspectors and settings trees.",
  usage:
    "Compose JsonTreeNodeBranch and JsonTreeNodeLeaf rows inside any panel — the root itself renders an authored sample tree, so custom payloads are built from the exported sub-components.",
  tags: ["json", "tree", "inspector", "debugger", "code"],
  props: [
    {
      name: "className",
      type: "string",
      description:
        "Merged into the root panel classes via twClassNames; every sub-component accepts the same prop.",
    },
    {
      name: "JsonTreeNodeLeaf.keyName",
      type: "React.ReactNode",
      description: "Key label rendered before the colon.",
    },
    {
      name: "JsonTreeNodeLeaf.valueType",
      type: '"string" | "number" | "boolean" | "null"',
      default: '"string"',
      description:
        "Selects the value's tint and type treatment: strings render in success green, numbers in tabular ink, booleans/null in warning amber.",
    },
    {
      name: "JsonTreeNodeLeaf.value",
      type: "React.ReactNode",
      description: "Value content; its color follows valueType.",
    },
    {
      name: "JsonTreeNodeLeaf.isArrayItem",
      type: "boolean",
      default: "false",
      description:
        "Array-element variant: hides the key and colon, shows the arrayIndex slot instead.",
    },
    {
      name: "JsonTreeNodeLeaf.arrayIndex",
      type: "React.ReactNode",
      description: 'Index label (e.g. "[0]") shown when isArrayItem is set.',
    },
    {
      name: "JsonTreeNodeBranch.keyName",
      type: "React.ReactNode",
      description: "Key label rendered before the colon.",
    },
    {
      name: "JsonTreeNodeBranch.braceType",
      type: '"object" | "array"',
      default: '"object"',
      description: "Brackets drawn around the nested level: { } for objects, [ ] for arrays.",
    },
    {
      name: "JsonTreeNodeBranch.expanded",
      type: "boolean",
      default: "false",
      description:
        "Shows the children and the closing bracket; when false the collapsedBadge summarizes the level instead.",
    },
    {
      name: "JsonTreeNodeBranch.collapsedBadge",
      type: "React.ReactNode",
      description: 'Collapsed summary such as "{…} 3 keys" or "[…] 2 items".',
    },
    {
      name: "JsonTreeNodeBranch.isArrayItem",
      type: "boolean",
      default: "false",
      description:
        "Array-element variant: hides the key and colon, shows the arrayIndex slot instead.",
    },
    {
      name: "JsonTreeNodeBranch.arrayIndex",
      type: "React.ReactNode",
      description: 'Index label (e.g. "[1]") shown when isArrayItem is set.',
    },
    {
      name: "JsonTreeNodeBranch.children",
      type: "React.ReactNode",
      description: "Nested Branch/Leaf rows rendered inside the indent rail when expanded.",
    },
  ],
  subComponents: ["JsonTreeNodeLeaf", "JsonTreeNodeBranch"],
  status: "stable",
  sourceRef: "Subframe JsonTreeNode_2f50f01e-e21c-494b-8e68-548b11b69da2",
});
