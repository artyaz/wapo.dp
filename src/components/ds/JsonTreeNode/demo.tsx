"use client";

/**
 * Demo — a small record payload inspected as a JSON tree: the root object and
 * its "meta" branch are expanded, while the "tags" array stays collapsed
 * behind its badge. Fixed content, no state.
 */

import React from "react";
import { JsonTreeNode } from "@/components/ds/JsonTreeNode";

export default function Demo() {
  return (
    <div className="flex w-[420px] max-w-full flex-col items-start rounded-lg border border-solid border-default-border bg-panel px-3 py-3">
      <JsonTreeNode.JsonTreeNodeBranch
        keyName={'"rec_01"'}
        braceType="object"
        expanded={true}
        collapsedBadge="{…} 4 keys"
      >
        <JsonTreeNode.JsonTreeNodeLeaf
          keyName={'"id"'}
          valueType="string"
          value={'"rec_01"'}
        />
        <JsonTreeNode.JsonTreeNodeLeaf
          keyName={'"status"'}
          valueType="string"
          value={'"live"'}
        />
        <JsonTreeNode.JsonTreeNodeBranch
          keyName={'"meta"'}
          braceType="object"
          expanded={true}
          collapsedBadge="{…} 3 keys"
        >
          <JsonTreeNode.JsonTreeNodeLeaf
            keyName={'"created_at"'}
            valueType="string"
            value={'"2025-01-14T09:32:00Z"'}
          />
          <JsonTreeNode.JsonTreeNodeLeaf
            keyName={'"retention_days"'}
            valueType="number"
            value="90"
          />
          <JsonTreeNode.JsonTreeNodeBranch
            keyName={'"tags"'}
            braceType="array"
            expanded={false}
            collapsedBadge="[…] 2 items"
          >
            <JsonTreeNode.JsonTreeNodeLeaf
              isArrayItem={true}
              arrayIndex="[0]"
              valueType="string"
              value={'"production"'}
            />
            <JsonTreeNode.JsonTreeNodeLeaf
              isArrayItem={true}
              arrayIndex="[1]"
              valueType="string"
              value={'"eu-west-1"'}
            />
          </JsonTreeNode.JsonTreeNodeBranch>
        </JsonTreeNode.JsonTreeNodeBranch>
        <JsonTreeNode.JsonTreeNodeLeaf
          keyName={'"archived"'}
          valueType="boolean"
          value="false"
        />
      </JsonTreeNode.JsonTreeNodeBranch>
    </div>
  );
}

export const demoSource = `<JsonTreeNode.JsonTreeNodeBranch keyName={'"rec_01"'} braceType="object" expanded collapsedBadge="{…} 4 keys">
  <JsonTreeNode.JsonTreeNodeLeaf keyName={'"id"'} valueType="string" value={'"rec_01"'} />
  <JsonTreeNode.JsonTreeNodeLeaf keyName={'"status"'} valueType="string" value={'"live"'} />
  <JsonTreeNode.JsonTreeNodeBranch keyName={'"meta"'} braceType="object" expanded collapsedBadge="{…} 3 keys">
    <JsonTreeNode.JsonTreeNodeLeaf keyName={'"created_at"'} valueType="string" value={'"2025-01-14T09:32:00Z"'} />
    <JsonTreeNode.JsonTreeNodeLeaf keyName={'"retention_days"'} valueType="number" value="90" />
    <JsonTreeNode.JsonTreeNodeBranch keyName={'"tags"'} braceType="array" collapsedBadge="[…] 2 items">
      <JsonTreeNode.JsonTreeNodeLeaf isArrayItem arrayIndex="[0]" valueType="string" value={'"production"'} />
      <JsonTreeNode.JsonTreeNodeLeaf isArrayItem arrayIndex="[1]" valueType="string" value={'"eu-west-1"'} />
    </JsonTreeNode.JsonTreeNodeBranch>
  </JsonTreeNode.JsonTreeNodeBranch>
  <JsonTreeNode.JsonTreeNodeLeaf keyName={'"archived"'} valueType="boolean" value="false" />
</JsonTreeNode.JsonTreeNodeBranch>`;
