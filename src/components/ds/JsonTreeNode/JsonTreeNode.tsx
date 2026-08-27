"use client";

/**
 * JsonTreeNode — a JSON inspector tree. Leaf rows render typed key/value pairs
 * (string/number/boolean/null tints) and Branch rows own the braces, chevrons
 * and indent rail for nested levels.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface JsonTreeNodeLeafProps
  extends React.HTMLAttributes<HTMLDivElement> {
  keyName?: React.ReactNode;
  valueType?: "string" | "number" | "boolean" | "null";
  value?: React.ReactNode;
  isArrayItem?: boolean;
  arrayIndex?: React.ReactNode;
  className?: string;
}

const JsonTreeNodeLeaf = React.forwardRef<
  HTMLDivElement,
  JsonTreeNodeLeafProps
>(function JsonTreeNodeLeaf(
  {
    keyName,
    valueType = "string",
    value,
    isArrayItem = false,
    arrayIndex,
    className,
    ...otherProps
  }: JsonTreeNodeLeafProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/39fc64ef flex h-6 w-full cursor-pointer items-center gap-1 hover:bg-neutral-50",
        className
      )}
      dir="ltr"
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-4 flex-none items-center justify-center self-stretch" />
      <div
        className={SubframeUtils.twClassNames(
          "hidden min-w-0 items-center gap-1",
          {
            flex: isArrayItem,
          }
        )}
      >
        {arrayIndex ? (
          <span className="flex-none text-code font-code text-neutral-400 select-none">
            {arrayIndex}
          </span>
        ) : null}
      </div>
      <div
        className={SubframeUtils.twClassNames("flex min-w-0 items-center gap-1", {
          hidden: isArrayItem,
        })}
      >
        {keyName ? (
          <span className="truncate text-code font-code text-default-font select-none">
            {keyName}
          </span>
        ) : null}
        <span className="flex-none text-code font-code text-neutral-400 select-none">
          :
        </span>
      </div>
      <div
        className={SubframeUtils.twClassNames("flex min-w-0 items-center", {
          hidden:
            valueType === "null" ||
            valueType === "boolean" ||
            valueType === "number",
        })}
      >
        {value ? (
          <span className="truncate text-code font-code text-success-600 select-none">
            {value}
          </span>
        ) : null}
      </div>
      <div
        className={SubframeUtils.twClassNames("hidden min-w-0 items-center", {
          flex: valueType === "number",
        })}
      >
        {value ? (
          <span className="truncate text-code font-code text-default-font tabular-nums select-none">
            {value}
          </span>
        ) : null}
      </div>
      <div
        className={SubframeUtils.twClassNames("hidden min-w-0 items-center", {
          flex: valueType === "null" || valueType === "boolean",
        })}
      >
        {value ? (
          <span className="truncate text-code font-code text-warning-600 select-none">
            {value}
          </span>
        ) : null}
      </div>
    </div>
  );
});

export interface JsonTreeNodeBranchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  keyName?: React.ReactNode;
  braceType?: "object" | "array";
  expanded?: boolean;
  collapsedBadge?: React.ReactNode;
  isArrayItem?: boolean;
  arrayIndex?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const JsonTreeNodeBranch = React.forwardRef<
  HTMLDivElement,
  JsonTreeNodeBranchProps
>(function JsonTreeNodeBranch(
  {
    keyName,
    braceType = "object",
    expanded = false,
    collapsedBadge,
    isArrayItem = false,
    arrayIndex,
    children,
    className,
    ...otherProps
  }: JsonTreeNodeBranchProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/cfc8fab7 flex w-full flex-col items-start",
        className
      )}
      dir="ltr"
      ref={ref}
      {...otherProps}
    >
      <div className="flex h-6 w-full flex-none items-center gap-1 cursor-pointer hover:bg-neutral-50">
        <div className="flex w-4 flex-none items-center justify-center self-stretch">
          <span
            className={SubframeUtils.twClassNames(
              "hidden text-code font-code text-neutral-400 select-none",
              { inline: expanded }
            )}
          >
            ▾
          </span>
          <span
            className={SubframeUtils.twClassNames(
              "text-code font-code text-neutral-400 select-none",
              { hidden: expanded }
            )}
          >
            ▸
          </span>
        </div>
        <div
          className={SubframeUtils.twClassNames("hidden min-w-0 items-center gap-1", {
            flex: isArrayItem,
          })}
        >
          {arrayIndex ? (
            <span className="flex-none text-code font-code text-neutral-400 select-none">
              {arrayIndex}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames("flex min-w-0 items-center gap-1", {
            hidden: isArrayItem,
          })}
        >
          {keyName ? (
            <span className="truncate text-code font-code text-default-font select-none">
              {keyName}
            </span>
          ) : null}
          <span className="flex-none text-code font-code text-neutral-400 select-none">
            :
          </span>
        </div>
        <div
          className={SubframeUtils.twClassNames("hidden items-center", {
            flex: expanded,
          })}
        >
          <span
            className={SubframeUtils.twClassNames(
              "text-code font-code text-neutral-400 select-none",
              { hidden: braceType === "array" }
            )}
          >
            &#123;
          </span>
          <span
            className={SubframeUtils.twClassNames(
              "hidden text-code font-code text-neutral-400 select-none",
              { inline: braceType === "array" }
            )}
          >
            [
          </span>
        </div>
        <div
          className={SubframeUtils.twClassNames("flex items-center gap-1", {
            hidden: expanded,
          })}
        >
          {collapsedBadge ? (
            <span className="font-code text-[11px] font-[400] leading-[11px] text-neutral-400 select-none">
              {collapsedBadge}
            </span>
          ) : null}
        </div>
      </div>
      {children ? (
        <div
          className={SubframeUtils.twClassNames(
            "hidden w-full flex-col items-start border-s border-solid border-default-border ps-4 ms-[7px]",
            { flex: expanded }
          )}
        >
          {children}
        </div>
      ) : null}
      <div
        className={SubframeUtils.twClassNames(
          "hidden h-6 w-full flex-none items-center ps-5",
          { flex: expanded }
        )}
      >
        <span
          className={SubframeUtils.twClassNames(
            "text-code font-code text-neutral-400 select-none",
            { hidden: braceType === "array" }
          )}
        >
          &#125;
        </span>
        <span
          className={SubframeUtils.twClassNames(
            "hidden text-code font-code text-neutral-400 select-none",
            { inline: braceType === "array" }
          )}
        >
          ]
        </span>
      </div>
    </div>
  );
});

export interface JsonTreeNodeRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const JsonTreeNodeRoot = React.forwardRef<
  HTMLDivElement,
  JsonTreeNodeRootProps
>(function JsonTreeNodeRoot(
  { className, ...otherProps }: JsonTreeNodeRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full max-w-[420px] flex-col items-start rounded-lg border border-solid border-default-border bg-panel px-3 py-3",
        className
      )}
      dir="ltr"
      ref={ref}
      {...otherProps}
    >
      <JsonTreeNodeBranch
        keyName="data"
        braceType="object"
        expanded={true}
        collapsedBadge="{…} 3 keys"
      >
        <JsonTreeNodeLeaf
          keyName={'"status"'}
          valueType="string"
          value={'"ok"'}
          arrayIndex="0"
        />
        <JsonTreeNodeLeaf
          keyName={'"total"'}
          valueType="number"
          value="143"
          arrayIndex="0"
        />
        <JsonTreeNodeBranch
          keyName={'"ledger"'}
          braceType="object"
          expanded={false}
          collapsedBadge="{…} 5 keys"
          arrayIndex="[0]"
        >
          <JsonTreeNodeLeaf keyName="key" value="value" arrayIndex="0" />
        </JsonTreeNodeBranch>
        <JsonTreeNodeBranch
          keyName={'"entries"'}
          braceType="array"
          expanded={true}
          collapsedBadge="{…} 3 keys"
          arrayIndex="[0]"
        >
          <JsonTreeNodeBranch
            keyName=""
            braceType="object"
            expanded={true}
            collapsedBadge="{…} 3 keys"
            isArrayItem={true}
            arrayIndex="[0]"
          >
            <JsonTreeNodeLeaf
              keyName={'"settled"'}
              valueType="boolean"
              value="true"
              arrayIndex="0"
            />
            <JsonTreeNodeLeaf
              keyName={'"memo"'}
              valueType="null"
              value="null"
              arrayIndex="0"
            />
          </JsonTreeNodeBranch>
          <JsonTreeNodeBranch
            keyName=""
            braceType="object"
            expanded={false}
            collapsedBadge="{…} 2 keys"
            isArrayItem={true}
            arrayIndex="[1]"
          >
            <JsonTreeNodeLeaf keyName="key" value="value" arrayIndex="0" />
          </JsonTreeNodeBranch>
        </JsonTreeNodeBranch>
      </JsonTreeNodeBranch>
    </div>
  );
});

export const JsonTreeNode = Object.assign(JsonTreeNodeRoot, {
  JsonTreeNodeLeaf,
  JsonTreeNodeBranch,
});
