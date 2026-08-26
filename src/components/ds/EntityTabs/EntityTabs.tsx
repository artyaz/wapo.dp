"use client";

/**
 * EntityTabs — record-level tab strip with counts.
 * A baseline-aligned tab row over a hairline rule; the active tab takes the
 * ink underline, counts render in small tabular monospace. Below the sm
 * breakpoint the tab gap tightens and the row scrolls horizontally rather
 * than clipping; the overflow affordance stays pinned after the last tab.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface TabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  count?: React.ReactNode;
  active?: boolean;
  className?: string;
}

const TabItem = React.forwardRef<HTMLDivElement, TabItemProps>(function TabItem(
  { label, count, active = false, className, ...otherProps }: TabItemProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/9a91bbbe flex cursor-pointer gap-1 rounded-none border-b-2 border-solid border-transparent py-2.5 items-baseline -mb-px text-neutral-500 hover:text-neutral-700",
        {
          "border-b-2 border-x-0 border-t-0 border-solid border-brand-primary text-default-font":
            active,
        },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {label ? (
        <span
          className={SubframeUtils.twClassNames(
            "whitespace-nowrap font-body text-[13px] font-[500] leading-[13px] text-neutral-500 select-none group-hover/9a91bbbe:text-neutral-700",
            { "text-default-font": active }
          )}
        >
          {label}
        </span>
      ) : null}
      {count ? (
        <span className="font-code text-[11px] font-[400] leading-[11px] text-neutral-500 select-none tabular-nums relative -top-1">
          {count}
        </span>
      ) : null}
    </div>
  );
});

export interface EntityTabsRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const EntityTabsRoot = React.forwardRef<HTMLDivElement, EntityTabsRootProps>(
  function EntityTabsRoot(
    { className, ...otherProps }: EntityTabsRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full items-end border-b border-solid border-default-border",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex min-w-0 flex-1 items-end gap-3 overflow-x-auto pb-px sm:gap-6">
          <TabItem label="Details" count="" active={true} />
          <TabItem label="Child Records" count="12" />
          <TabItem label="Activity" count="47" />
          <TabItem label="Audit" count="3" />
        </div>
        <div className="flex items-center py-2.5 -mb-px">
          <span className="font-body text-[13px] font-[400] leading-[13px] text-neutral-400 select-none cursor-pointer">
            ▾
          </span>
        </div>
      </div>
    );
  }
);

export const EntityTabs = Object.assign(EntityTabsRoot, {
  TabItem,
});
