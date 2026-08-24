"use client";

/**
 * Button — the core action control of the Praxis input family.
 * Emphasis is ink weight, not color: primary/secondary/ghost/danger share one
 * 3px-corner body, with an optional leading icon and inline loading spinner.
 */

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner({ className, ...otherProps }: SpinnerProps, ref) {
    return (
      <span
        className={SubframeUtils.twClassNames(
          "h-3 w-3 text-body-medium font-body-medium text-default-font inline-block animate-spin rounded-full border-[2px] border-solid border-transparent border-t-brand-primary-foreground",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {" "}
      </span>
    );
  }
);

export interface ButtonRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "small" | "medium" | "large";
  iconOnly?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  function ButtonRoot(
    {
      disabled = false,
      variant = "primary",
      size = "medium",
      iconOnly = false,
      loading = false,
      icon = null,
      children,
      className,
      type = "button",
      ...otherProps
    }: ButtonRootProps,
    ref
  ) {
    return (
      <button
        className={SubframeUtils.twClassNames(
          "group/d55c3903 flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[3px] border-2 border-solid border-brand-primary bg-brand-primary px-[18px] py-3 text-left w-fit hover:bg-neutral-800 hover:border-neutral-800 active:bg-neutral-700 active:border-neutral-700 focus-within:border-neutral-600 disabled:cursor-default disabled:opacity-40 disabled:pointer-events-none",
          {
            "px-0 py-0 aspect-square": iconOnly,
            "h-[46px] px-[22px] py-3.5": size === "large",
            "h-8 px-3.5 py-2.5": size === "small",
            "border-2 border-solid border-destructive-500 bg-panel hover:bg-destructive-50 hover:border-destructive-500 active:bg-destructive-100 active:border-destructive-600 focus-within:border-destructive-600":
              variant === "danger",
            "border-2 border-solid border-transparent bg-transparent hover:bg-transparent hover:border-transparent active:bg-neutral-100":
              variant === "ghost",
            "border-2 border-solid border-default-border bg-panel hover:bg-neutral-100 hover:border-default-border active:bg-neutral-200":
              variant === "secondary",
          },
          className
        )}
        ref={ref}
        type={type}
        disabled={disabled}
        {...otherProps}
      >
        <Spinner
          className={SubframeUtils.twClassNames(
            "hidden border-transparent border-t-brand-primary-foreground",
            {
              "inline-block": loading,
              "border-t-destructive-500": variant === "danger",
              "border-t-neutral-700": variant === "ghost",
              "border-t-default-font": variant === "secondary",
            }
          )}
        />
        {icon ? (
          <SubframeCore.IconWrapper
            className={SubframeUtils.twClassNames(
              "text-body-medium font-body-medium text-brand-primary-foreground",
              {
                "text-[19px] leading-[19px]": size === "large",
                "text-caption font-caption": size === "small",
                "text-destructive-500": variant === "danger",
                "text-neutral-500 group-hover/d55c3903:text-default-font":
                  variant === "ghost",
                "text-default-font": variant === "secondary",
              }
            )}
          >
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "whitespace-nowrap font-body text-[14px] font-[600] leading-[20px] text-brand-primary-foreground",
              {
                hidden: iconOnly,
                "text-[15px] leading-[22px] tracking-normal": size === "large",
                "text-[13px] leading-[19px] tracking-normal": size === "small",
                "text-destructive-500": variant === "danger",
                "text-neutral-500 group-hover/d55c3903:text-default-font":
                  variant === "ghost",
                "text-default-font": variant === "secondary",
              }
            )}
          >
            {children}
          </span>
        ) : null}
      </button>
    );
  }
);

export const Button = Object.assign(ButtonRoot, {
  Spinner,
});
