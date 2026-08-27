"use client";

/**
 * TextField — the system's text input: a bordered field body (TextField root)
 * wrapping an unstyled TextField.Input or TextField TextArea, with a caption
 * label above, help text below, and optional leading/trailing affordances.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "placeholder" | "value"
  > {
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  placeholder?: React.ReactNode;
  value?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = "text", placeholder, value, className, ...otherProps }: InputProps,
  ref
) {
  return (
    <input
      className={SubframeUtils.twClassNames(
        "group/91effb74 h-full w-full border-none bg-transparent px-0 py-0 text-body font-body text-default-font outline-none placeholder:text-neutral-500",
        className
      )}
      placeholder={placeholder as string}
      value={value as string}
      ref={ref}
      // dir="auto" lets the value/placeholder resolve their own base
      // direction from the first strong character: Latin email addresses
      // keep terminal punctuation and '@' on the correct side inside RTL
      // pages, Arabic/Hebrew input mirrors fully — a consumer-passed dir
      // still wins via otherProps
      dir="auto"
      type={
        type === "search"
          ? "search"
          : type === "url"
          ? "url"
          : type === "tel"
          ? "tel"
          : type === "number"
          ? "number"
          : type === "email"
          ? "email"
          : type === "password"
          ? "password"
          : "text"
      }
      {...otherProps}
    />
  );
});

export interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "placeholder" | "value"
  > {
  placeholder?: React.ReactNode;
  value?: React.ReactNode;
  className?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { placeholder, value, className, ...otherProps }: TextAreaProps,
    ref
  ) {
    return (
      <textarea
        className={SubframeUtils.twClassNames(
          "h-full min-h-[120px] w-full text-body font-body text-default-font outline-none placeholder:text-neutral-500 resize-y",
          className
        )}
        placeholder={placeholder as string}
        value={value as string}
        ref={ref}
        // dir="auto" — free-text prose resolves its own base direction so
        // Latin paragraphs keep terminal punctuation on the correct line end
        // when wrapped inside RTL pages; Arabic content mirrors fully
        dir="auto"
        {...otherProps}
      />
    );
  }
);

export interface TextFieldRootProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const TextFieldRoot = React.forwardRef<HTMLLabelElement, TextFieldRootProps>(
  function TextFieldRoot(
    {
      label,
      helpText,
      error = false,
      disabled = false,
      leading,
      trailing,
      children,
      className,
      ...otherProps
    }: TextFieldRootProps,
    ref
  ) {
    return (
      <label
        className={SubframeUtils.twClassNames(
          "group/99bc1bab flex w-full flex-col items-start gap-1.5",
          { "opacity-40 pointer-events-none": disabled },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {label ? (
          <span
            className="text-caption font-caption text-neutral-500"
            // dir="auto" isolates the caption as a directional island so Latin
            // labels keep terminal punctuation on the correct side inside RTL
            // pages (and Arabic/Hebrew labels mirror fully); a consumer-passed
            // dir on the root still wins for the layout itself
            dir="auto"
          >
            {label}
          </span>
        ) : null}
        <div
          className={SubframeUtils.twClassNames(
            "flex w-full items-start gap-2 rounded-sm border-2 border-solid border-default-border bg-panel px-4 py-[13px] group-focus-within/99bc1bab:border-neutral-600",
            {
              "border-2 border-solid border-destructive-400 group-focus-within/99bc1bab:border-destructive-500":
                error,
            }
          )}
        >
          {leading ? (
            <div className="flex items-center text-neutral-500">{leading}</div>
          ) : null}
          {children ? (
            <div className="flex grow shrink-0 basis-0 items-center">
              {children}
            </div>
          ) : null}
          {trailing ? (
            <div className="flex items-center text-neutral-500">{trailing}</div>
          ) : null}
        </div>
        {helpText ? (
          <span
            className={SubframeUtils.twClassNames(
              "text-caption font-caption text-neutral-500",
              { "text-destructive-500": error }
            )}
            // dir="auto" isolates the help text as a directional island: Latin
            // copy keeps its trailing punctuation on the correct side inside
            // RTL pages (and vice versa) instead of the paragraph-level
            // direction flipping it to the opposite edge
            dir="auto"
          >
            {helpText}
          </span>
        ) : null}
      </label>
    );
  }
);

export const TextField = Object.assign(TextFieldRoot, {
  Input,
  TextArea,
});
